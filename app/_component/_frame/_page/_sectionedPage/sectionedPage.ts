import Page from "../page";
import * as domain from "./../../../../lib/domain"
import scrollTo from "animated-scroll-to";
import WaapiEasing from "waapi-easing";
import { ResourcesMap } from "../../../../lib/lazyLoad";
import LazySectionedPage from "./_lazySectionedPage/lazySectionedPage";
import PageSection from "../../_pageSection/pageSection";
import { EventListener, ScrollData } from "extended-dom";
import { Data, DataCollection, DataSubscription } from "josm";
import { constructIndex } from "key-index"

const padding = -70

const windowMargin = -0.33334
const windowParginStr = (windowMargin * 100) + "%"


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
  public readonly scrollProgressAliases: Readonly<ScrollProgressAlias[]>
  public readonly aliases: DataCollection<string[][]>

  constructor(root: Root | Data<Root>, scrollProgressAlias: ScrollProgressAlias | Readonly<ScrollProgressAlias[]>) {
    this.root = root instanceof Data ? root : new Data(root)
    this.scrollProgressAliases = scrollProgressAlias instanceof Array ? scrollProgressAlias : [scrollProgressAlias]
    this.aliases = new DataCollection(...(this.scrollProgressAliases as ScrollProgressAlias[]).Inner("aliases")) as DataCollection<string[][]>
  }

  protected buildReverseAlias(aliasReverses: ReverseAliasIndex) {
    for (let alias of this.scrollProgressAliases) {
      
      let aliasesLength = 0

      new DataCollection(alias.progress, alias.aliases, this.root).get((progress, aliases: string[], root) => {
        if (aliasesLength !== aliases.length)  {
          aliases.ea((alias) => {
            aliasReverses[alias] = new ScrollProgressAliasIndex.Reverse(progress, root)
          })
        }
        else {
          aliases.ea((alias) => {
            (aliasReverses[alias] as any).progress = progress;
            (aliasReverses[alias] as any).root = root;
          })
        }
      })
      
    }
  }

  public static Reverse = class {
    constructor(public readonly progress: number, public readonly root: string) {}
  }
}

export class SimpleAlias<Root extends string = string> {
  public readonly root: Data<Root>
  public readonly aliases: AliasData

  constructor(root: Root | Data<Root>, aliases: AliasData | string | string[]) {
    this.root = root instanceof Data ? root : new Data(root)
    this.aliases = aliases instanceof AliasData ? aliases : new AliasData(aliases)
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
    constructor(public readonly root: string) {}
  }
}


export class AliasList {
  public readonly reverseIndex: ReverseAliasIndex = {}
  public aliases: Readonly<Alias[]>
  constructor(...aliases: Readonly<Alias[]>) {
    this.aliases = aliases;

    (aliases as Alias[]).ea((alias) => {
      (alias as Alias & {buildReverseAlias(aliasReverses: ReverseAliasIndex): void}).buildReverseAlias(this.reverseIndex)
    })
  }
  public getAllAliasesByRoot(root: string) {
    return (this.aliases as Alias[]).ea((alias) => {
      if (alias.root.get() === root) return alias
    })
  }
  public aliasify(root: string) {
    let data: Data<string[]> = new Data([root])
    let al = this.getAllAliasesByRoot(root)
    if (al !== undefined) al.aliases.get((...a) => {
      let q: string[] = []
      a.ea((e) => {
        q.add(e.first)
      })
      data.set(q)
    })
    return data
  }

  public getRootOfAlias(alias: string) {
    return this.reverseIndex[alias] ? this.reverseIndex[alias].root : alias
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
  public readonly sectionList: T extends Promise<any> ? Promise<Data<string[]>> : Data<string[]>
  private inScrollAnimation: Data<Symbol> = new Data()

  constructor(sectionIndex: T, public domainLevel: number, protected setPage: (domain: string) => void, protected sectionChangeCallback?: (section: string) => void, protected readonly sectionAliasList: AliasList = new AliasList(), protected readonly mergeIndex: {[part in string]: string} = {}) {
    super()

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
      let mer = this.merge(key)
      if (mer !== "") dataList.add(this.sectionAliasList.aliasify(mer))
    })

    let sectionList: Data<string[]> = new Data()
    new DataCollection(...dataList).get((...dataList) => {
      sectionList.set((dataList as any).flat().distinct())
    })

    return {sectionList, sectionIndex}
  }

  private merge(name: string) {
    return this.mergeIndex[name] ? this.mergeIndex[name] : name
  }

  private lastSectionName: string
  private activateSectionName(name: string) {
    if (name === "") name = this.defaultDomain
    if (this.sectionChangeCallback && this.lastSectionName !== name) this.sectionChangeCallback(name)
    this.lastSectionName = name
  }
  
  private activateSectionNameWithDomain(name: string) {
    this.activateSectionName(name)
    domain.set(name, this.domainLevel, false)
  }

  private defaultDomain: string
  private firstDomain: string
  private mainIntersectionObserver: IntersectionObserver
  private currentlyActiveSectionRootName: string
  private intersectingIndex: Element[] = []
  async initialActivationCallback() {
    let sectionIndex = await this.sectionIndex as ResourcesMap

    let entries = sectionIndex.entries()
    this.firstDomain = this.defaultDomain = entries.next().value[0]
    if (this.defaultDomain === "") this.defaultDomain = entries.next().value[0]
    this.domainSubscription = domain.get(this.domainLevel, (domainFragment: string) => {
      return new Promise<boolean>(async (res) => {

        let verticalOffset = padding
        
        if (this.sectionAliasList.reverseIndex[domainFragment] !== undefined) {
          let reverseAlias = this.sectionAliasList.reverseIndex[domainFragment]
          let originalDomain = domainFragment
          if (reverseAlias instanceof SimpleAlias.Reverse) {
            domainFragment = reverseAlias.root
          }
          else if (reverseAlias instanceof ScrollProgressAliasIndex.Reverse) {
            domainFragment = reverseAlias.root
            verticalOffset += reverseAlias.progress - padding
          }
          this.activateSectionName(originalDomain)
        }

        else {
          this.currentlyActiveSectionRootName = this.sectionAliasList.getRootOfAlias(domainFragment)
          this.activateSectionName(this.sectionAliasList.aliasify(this.merge(domainFragment)).get().first)
        }

        


        let scrollAnimation
        this.inScrollAnimation.set(scrollAnimation = Symbol())
        this.userInitedScrollEvent = false

        let elem = await sectionIndex.get(domainFragment) as HTMLElement
        if (elem !== undefined) {
          res(true)
          await scrollTo(elem, {
            cancelOnUserAction: true,
            verticalOffset,
            speed: 1150,
            elementToScroll: this.elementBody,
            easing: new WaapiEasing("ease").function
          })
          
          if (scrollAnimation === this.inScrollAnimation.get()) {
            this.inScrollAnimation.set(undefined)
            this.userInitedScrollEvent = true
          }
        }
        else {
          this.setPage(null)
          this.inScrollAnimation.set(undefined)
          res(false)
        }
      })
     
    }, true, this.firstDomain)


    
    let currentlyActiveSectionElem = await sectionIndex.get(this.sectionAliasList.getRootOfAlias(this.domainSubscription.domain)) as any as PageSection
    let globalToken: Symbol
    let aliasSubscriptions: DataSubscription<unknown[]>[] = []
    let localSegmentScrollDataIndex = constructIndex((pageSectionElement: PageSection) => this.elementBody.scrollData().tunnel(prog => prog - pageSectionElement.offsetTop))

    // ----------->

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

      let elem = this.intersectingIndex.first as PageSection


      if (!this.inScrollAnimation.get()) {
        let myToken = globalToken = Symbol("Token")

        sectionIndex.forEach(async (val, root) => {
          if ((await val) === elem) {
            if (myToken !== globalToken || this.currentlyActiveSectionRootName === root) return
            this.currentlyActiveSectionRootName = root


            if (currentlyActiveSectionElem !== elem) {
              if (currentlyActiveSectionElem !== undefined) currentlyActiveSectionElem.deactivate()
              elem.activate()
              currentlyActiveSectionElem = elem
            }

            aliasSubscriptions.Inner("deactivate", [])
            aliasSubscriptions.clear()


            root = this.merge(root)

            let alias = this.sectionAliasList.getAllAliasesByRoot(root)
            if (alias) {

              if (alias instanceof SimpleAlias) {
                let sub = new DataSubscription(alias.aliases.tunnel(aliases => aliases.first), this.activateSectionNameWithDomain.bind(this), false)
                aliasSubscriptions.add(this.inScrollAnimation.get((is) => {
                  if (is) sub.activate()
                  else sub.deactivate()
                }))
                aliasSubscriptions.add(sub)
              }
              else if (alias instanceof ScrollProgressAliasIndex) {
                let currentlyTheSmallestWantedProgressTemp = Infinity
                let currentlyTheSmallestWantedProgress = new Data(currentlyTheSmallestWantedProgressTemp)
                
                aliasSubscriptions.add(new DataCollection(...(alias.scrollProgressAliases as ScrollProgressAlias[]).Inner("progress")).get((...wantedProgresses) => {
                  currentlyTheSmallestWantedProgressTemp = Infinity

                  wantedProgresses.ea((wantedProgress) => {
                    if (wantedProgress < currentlyTheSmallestWantedProgressTemp) currentlyTheSmallestWantedProgressTemp = wantedProgress
                  })

                  currentlyTheSmallestWantedProgress.set(currentlyTheSmallestWantedProgressTemp)
                }))

                let lastActiveName: Data<string> = new Data()

                for (let i = 0; i < alias.scrollProgressAliases.length; i++) {
                  const q = alias.scrollProgressAliases[i] as ScrollProgressAlias
                  let nextProg: Data<number> = alias.scrollProgressAliases[i + 1] as any
                  if (nextProg === undefined) nextProg = new Data(Infinity)
                  else nextProg = (nextProg as any).progress

                  let isSmallest = false
                  
                  aliasSubscriptions.add(new DataCollection(currentlyTheSmallestWantedProgress, q.progress).get((smallestProg, thisProg) => {
                    isSmallest = smallestProg === thisProg
                  }))

                  
                  let nameData = q.aliases.tunnel(aliases => aliases.first)

                  let sub = new DataSubscription(new DataCollection(nameData, q.progress, nextProg, localSegmentScrollDataIndex(elem)) as any, (name: string, wantedProgress, nextProg, currentProgress) => {
                    if (isSmallest) {
                      wantedProgress = -Infinity
                    }
                    
                    if (wantedProgress <= currentProgress && nextProg > currentProgress) {
                      lastActiveName.set(name)
                      this.activateSectionNameWithDomain(name)
                    }
                  })
                  
                  
                  aliasSubscriptions.add(sub)

                  aliasSubscriptions.add(new DataCollection(lastActiveName, nameData, this.inScrollAnimation).get((currentName, name, inScrollAnimation) => {
                    let deactivate = currentName === name || inScrollAnimation
                    if (deactivate) sub.deactivate()
                    else sub.activate()
                  }))
                }

              }

            }
            else this.activateSectionNameWithDomain(root)

            
            
          }
        })
      }
    }, {
      threshold: 0,
      rootMargin: windowParginStr
    })

    sectionIndex.forEach(async (section: Promise<PageSection>) => {
      let sec = await section

      if (sec) sec.getLocalScrollProgressData = () => localSegmentScrollDataIndex(sec) as ScrollData
    })

    if (currentlyActiveSectionElem === undefined) return false
    else currentlyActiveSectionElem.activate()
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
      let init = this.sectionAliasList.getRootOfAlias(this.domainSubscription.domain)
      let sec = sectionIndex.get(init)
      if (sec === undefined) return false
    
      sec.priorityThen((e: PageSection) => {
        e.scrollIntoView(true)
        let verticalOffset = padding
        let ali = this.sectionAliasList.reverseIndex[this.domainSubscription.domain]
        if (ali) if (ali instanceof ScrollProgressAliasIndex.Reverse) verticalOffset += ali.progress - padding
        this.elementBody.scrollBy(0, verticalOffset)
      })
          

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
      delete this.currentlyActiveSectionRootName
    }
  }


  stl() {
    return super.stl() + require("./sectionedPage.css").toString()
  }
}
