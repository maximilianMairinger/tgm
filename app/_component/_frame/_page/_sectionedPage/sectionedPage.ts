import Page from "../page";
import * as domain from "./../../../../lib/domain"
import scrollTo from "animated-scroll-to";
import WaapiEasing from "waapi-easing";
import { ResourcesMap } from "../../../../lib/lazyLoad";
import LazySectionedPage from "./_lazySectionedPage/lazySectionedPage";
import PageSection from "../../_pageSection/pageSection";
import { EventListener } from "extended-dom";
import { Data, DataCollection } from "josm";

const padding = -70



export type SingleAlias = AliasData | string | string[]


export class AliasData extends Data<string[]> {
  constructor(alias: string | string[]) {
    super(alias instanceof Array ? alias : [alias])
  }

  public set(alias: string | string[]) {
    return super.set(alias instanceof Array ? alias : [alias])
  }
}


export class ScrollProgressAlias {
  public readonly progress: Data<number>
  public readonly aliases: AliasData
  constructor(progress: number | Data<number>, alias: SingleAlias) {
    this.progress = progress instanceof Data ? progress : new Data(progress)
    this.aliases = alias instanceof AliasData ? alias : new AliasData(alias)
  }
}





export class ScrollProgressAliasIndex<Root extends string = string> {
  public readonly root: Data<Root>
  public readonly scrollPorgressAliases: Readonly<ScrollProgressAlias[]>

  constructor(root: Root | Data<Root>, scrollProgressAlias: ScrollProgressAlias | Readonly<ScrollProgressAlias[]>) {
    this.root = root instanceof Data ? root : new Data(root)
    this.scrollPorgressAliases = scrollProgressAlias instanceof Array ? scrollProgressAlias : [scrollProgressAlias]
  }

  protected buildReverseAlias(aliasReverses: ReverseAliasIndex) {
    for (let alias of this.scrollPorgressAliases) {
      
      let aliasesLength = 0

      new DataCollection(alias.progress, alias.aliases, this.root).get((progress, aliases: string[], root) => {
        if (aliasesLength !== aliases.length)  {
          aliases.ea((alias) => {
            aliasReverses[alias] = new ScrollProgressAliasIndex.Reverse(progress, root)
          })
        }
        else {
          aliases.ea((alias) => {
            (aliasReverses[alias] as any).atScrollProgress = progress;
            (aliasReverses[alias] as any).root = root;
          })
        }
      })
      
    }
  }

  public static Reverse = class {
    constructor(public readonly atScrollProgress: number, public readonly root: string) {}
  }
}

export class SimpleAlias<Root extends string = string> {
  public readonly root: Data<Root>

  constructor(root: Root | Data<Root>, public readonly aliases: AliasData) {
    this.root = root instanceof Data ? root : new Data(root)
  }


  protected buildReverseAlias(aliasReverses: ReverseAliasIndex) {

    let aliasesLength = 0

    new DataCollection(this.aliases, this.root).get((aliases: string[], root) => {
      if (aliasesLength !== aliases.length) {
        aliases.ea((alias) => {
          aliasReverses[alias] = new SimpleAlias.Reverse(root)
        })
      }
      else {
        aliases.ea((alias) => {
          (aliasReverses[alias] as any).root = root
        })
      }
    })
  }

  
  public static Reverse = class {
    constructor(public readonly alias: string) {}
  }
}


export class AliasList extends Array<Alias> {
  constructor(...aliases: Alias[]) {
    super(...aliases)
  }
  public hasRoot(root: string) {
    return this.ea((alias) => {
      if (alias.root.get() === root) return alias
    })
  }

}

type ReverseAliasUnion = (InstanceType<(typeof ScrollProgressAliasIndex)["Reverse"]> | InstanceType<(typeof SimpleAlias)["Reverse"]>)
type ReverseAliasIndex = {[root: string]: ReverseAliasUnion}

export type Alias = ScrollProgressAliasIndex | SimpleAlias


type SectionIndex = {[name in Name]: HTMLElement | QuerySelector}
type Name = string
type FullSectionIndex = ResourcesMap | SectionIndex | Promise<ResourcesMap | SectionIndex>
export type QuerySelector = string
export default abstract class SectionedPage<T extends FullSectionIndex> extends Page {
  protected readonly sectionIndex: T extends Promise<any> ? Promise<ResourcesMap> : ResourcesMap
  public readonly sectionList: T extends Promise<any> ? Promise<DataCollection<string[][]>> : DataCollection<string[][]>
  private inScrollAnimation: Symbol

  constructor(sectionIndex: T, public domainLevel: number, protected setPage: (domain: string) => void, protected sectionChangeCallback?: (section: string) => void, private sectionAliasList: AliasList = new AliasList()) {
    super()
    //@ts-ignore

    if (sectionIndex instanceof Promise) {
      let resSectionIndex: Function
      this.sectionIndex = new Promise((r) => {resSectionIndex = r}) as any

      let resSectionList: Function
      this.sectionList = new Promise((r) => {resSectionList = r}) as any

      sectionIndex.then((sectionIndex) => {
        let r = this.prepSectionIndex(sectionIndex)
        resSectionIndex(r.sectionIndex)
        resSectionList(r.sectionList)
      })
      
    }
    else {
      let r = this.prepSectionIndex(sectionIndex)
      this.sectionIndex = r.sectionIndex as any
      this.sectionList = r.sectionList as any
    }
  }

  private prepSectionIndex(sectionIndex: any) {
    let map: ResourcesMap

    if (sectionIndex instanceof ResourcesMap) map = sectionIndex
    else {
      map = new ResourcesMap()
      for (let name in sectionIndex) {
        let elem: any
        if (!(sectionIndex[name] instanceof HTMLElement)) elem = this.q(sectionIndex[name] as any)
        else elem = sectionIndex[name]
  
        let prom = Promise.resolve(elem)
        //@ts-ignore
        prom.priorityThen = prom.then
        //@ts-ignore
        map.set(name, prom)
      }
    }

    let dataList: Data<string[]>[] = []
    map.forEach((val, key) => {
      let alias = this.sectionAliasList.hasRoot(key)
      if (alias) {
        if (alias instanceof SimpleAlias) {
          dataList.add(alias.aliases)
        }
        else if (alias instanceof ScrollProgressAliasIndex) {
          dataList.add(...(alias.scrollPorgressAliases as ScrollProgressAlias[]).Inner("aliases"))
        }
      }
      else dataList.add(new Data([key]))
    })

    


    return {sectionList: new DataCollection<string[][]>(...dataList), sectionIndex}
  }

  private mainIntersectionObserver: IntersectionObserver
  private currentlyActiveSectionName: string
  private intersectingIndex: Element[] = []
  async initialActivationCallback() {
    //@ts-ignore
    let sectionIndex: ResourcesMap = await this.sectionIndex


    this.domainSubscription = domain.get(this.domainLevel, (domain: string) => {
      return new Promise<boolean>(async (res) => {
        // todo



        //@ts-ignore
        let sectionIndex: ResourcesMap = await this.sectionIndex
              
        let scrollAnimation = this.inScrollAnimation = Symbol()
        this.currentlyActiveSectionName = domain
        if (this.sectionChangeCallback) this.sectionChangeCallback(domain)
        this.userInitedScrollEvent = false

        let elem = await sectionIndex.get(domain) as HTMLElement
        if (elem !== undefined) {
          res(true)
          await scrollTo(elem, {
            cancelOnUserAction: true,
            verticalOffset: padding,
            speed: 1150,
            elementToScroll: this.elementBody,
            easing: new WaapiEasing("ease").function

          })
          
          if (scrollAnimation === this.inScrollAnimation) {
            this.inScrollAnimation = undefined
            this.userInitedScrollEvent = true
          }
        }
        else {
          this.setPage(null)
          this.inScrollAnimation = undefined
          res(false)
        }
      })
     
    }, true, sectionIndex.entries().next().value[0])

    
    let currentlyActiveSectionElem = await sectionIndex.get(this.domainSubscription.domain) as any as PageSection

    let globalToken: Symbol
    this.mainIntersectionObserver = new IntersectionObserver(async (c) => {
      
      c.ea((q) => {
        if (q.isIntersecting) { 
          if (Math.abs(0 - q.boundingClientRect.y) > Math.abs(q.rootBounds.y - q.boundingClientRect.bottom)) {
            this.intersectingIndex.inject(q.target, 0)
          }
          else {
            this.intersectingIndex.add(q.target)
          }
        }
        else {
          
          try {
            this.intersectingIndex.rmV(q.target)
          }
          catch(e) {

          }
        }
      })

      let elem = this.intersectingIndex.first as LazySectionedPage

  
      if (!this.inScrollAnimation) {
        let myToken = Symbol("Token")
        globalToken = myToken
        sectionIndex.forEach(async (val, name) => {
          if ((await val) === elem) {
            if (myToken !== globalToken || this.currentlyActiveSectionName === name) return
            if (this.sectionChangeCallback) this.sectionChangeCallback(name)
            if (this.currentlyActiveSectionName !== undefined) domain.set(name, this.domainLevel, false)
            this.currentlyActiveSectionName = name
            if (currentlyActiveSectionElem !== elem) {
              currentlyActiveSectionElem.deactivate()
              elem.activate()
              currentlyActiveSectionElem = elem
            }
          }
        })
      }
    }, {
      threshold: 0,
      rootMargin: "-33.333%"
    })



    this.elementBody.on("scroll", () => {
      if (currentlyActiveSectionElem.scrollProgressCallback) currentlyActiveSectionElem.scrollProgressCallback(this.elementBody.scrollTop - currentlyActiveSectionElem.offsetTop)
    })

    if (currentlyActiveSectionElem === undefined) return false
    currentlyActiveSectionElem.activate()
  }

  private customIntersectionObserver: Map<HTMLElement, EventListener> = new Map

  public async addIntersectionListener(obsElem: HTMLElement, cb: (section: PageSection) => void, threshold: number = .5) {

    let lastHit: PageSection
    let sectionIndex = await this.sectionIndex as any

    let f = async () => {
      let obs = obsElem.getBoundingClientRect();
      let ajustedHeight = obs.height * threshold
      let upperHit = obs.top + ajustedHeight
      let lowerHit = obs.bottom - ajustedHeight
      sectionIndex.forEach(async (e: any) => {
        let elem = await e as PageSection
        let el = elem.getBoundingClientRect()

        
        if (el.top <= upperHit && el.bottom >= lowerHit) {
          if (lastHit !== elem) {
            cb(elem)
            lastHit = elem
          }
        }
      })
    }
    this.customIntersectionObserver.set(obsElem, new EventListener(this.elementBody, "scroll", f, this.active))
    f()
  }

  public removeIntersectionListener(obsElem: HTMLElement) {
    this.customIntersectionObserver.get(obsElem).deactivate()
    this.customIntersectionObserver.delete(obsElem)
  }

  


  private domainSubscription: domain.DomainSubscription

  protected async activationCallback(active: boolean) {
    //@ts-ignore
    let sectionIndex: ResourcesMap = await this.sectionIndex
    this.domainSubscription.vate(active)

    if (active) {
      let init = this.domainSubscription.domain

      if (sectionIndex.get(init) === undefined) {
        return false
      }
      else {
        sectionIndex.get(init).priorityThen((e) => {
          e.scrollIntoView(true);
          this.elementBody.scrollBy(0, padding)
        })
          

      }
      sectionIndex.forEach(async (elem: any) => {
        elem = await elem
        this.mainIntersectionObserver.observe(elem)
      })
    }
    else {
      this.intersectingIndex.clear()
      sectionIndex.forEach(async (elem: any) => {
        elem = await elem
        this.mainIntersectionObserver.unobserve(elem)
      })
      delete this.currentlyActiveSectionName
    }
  }


  stl() {
    return super.stl() + require("./sectionedPage.css").toString()
  }
}
