import Page from "../page";
import * as domain from "./../../../../lib/domain"
import scrollTo from "animated-scroll-to";
import WaapiEasing from "waapi-easing";
import { ResourcesMap } from "../../../../lib/lazyLoad";
import PageSection from "./_lazySectionedPage/lazySectionedPage";

const padding = -70


type SectionIndex = {[name in Name]: HTMLElement | QuerySelector}
type Name = string
type FullSectionIndex = ResourcesMap | SectionIndex | Promise<ResourcesMap | SectionIndex>
export type QuerySelector = string
export default abstract class SectionedPage<T extends FullSectionIndex> extends Page {
  public readonly sectionIndex: T extends Promise<any> ? Promise<ResourcesMap> : ResourcesMap
  private inScrollAnimation = false
  constructor(sectionIndex: T, protected domainLevel: number) {
    super()
    //@ts-ignore
    this.sectionIndex = sectionIndex instanceof Promise ? sectionIndex.then((sectionIndex) => this.prepSectionIndex(sectionIndex)) : this.prepSectionIndex(sectionIndex)

  }

  private prepSectionIndex(sectionIndex: any): ResourcesMap {
    if (sectionIndex instanceof Map) return sectionIndex

    let map = new Map()
    for (let name in sectionIndex) {
      let elem: any
      if (!(sectionIndex[name] instanceof HTMLElement)) elem = this.q(sectionIndex[name] as any)
      else elem = sectionIndex[name]

      let prom = Promise.resolve(elem)
      //@ts-ignore
      prom.priorityThen = prom.then
      map.set(name, prom)
    }

    return map
  }

  private observer: IntersectionObserver
  async initialActivationCallback() {
    //@ts-ignore
    let sectionIndex: ResourcesMap = await this.sectionIndex

    


    let intersectingIndex: Element[] = []
    let globalToken: Symbol
    this.observer = new IntersectionObserver(async (c) => {
      if (!this.inScrollAnimation) {
        c.ea((q) => {
          if (q.isIntersecting) { 
            if (Math.abs(0 - q.boundingClientRect.y) > Math.abs(q.rootBounds.y - q.boundingClientRect.bottom)) {
              intersectingIndex.inject(q.target, 0)
            }
            else {
              intersectingIndex.add(q.target)
            }
          }
          else {
            
            try {
              intersectingIndex.rmV(q.target)
            }
            catch(e) {
  
            }
          }
        })
  
        let elem = intersectingIndex.first as PageSection
  
        
        let myToken = Symbol("Token")
        globalToken = myToken
        sectionIndex.forEach(async (val, name) => {
          if ((await val) === elem) {
            if (myToken !== globalToken) return
            domain.set(this.domainLevel, name, false)
          }
        })
      }
    }, {
      threshold: 0,
      rootMargin: "-33.333%"
    })
  }


  private domainFunc = async (e) => {
    this.inScrollAnimation = true
    scrollTo(await (await this.sectionIndex as any).get(e) as HTMLElement, {
      cancelOnUserAction: true,
      verticalOffset: padding,
      speed: 1150,
      elementToScroll: this.elementBody,
      easing: new WaapiEasing("ease").function

    }).then(() => {
      this.inScrollAnimation = false
    })
  }

  protected async activationCallback(active: boolean) {
    //@ts-ignore
    let sectionIndex: ResourcesMap = await this.sectionIndex
    if (active) {
      sectionIndex.forEach(async (elem) => {
        this.observer.observe(await elem)
      })



      let init = domain.get(this.domainLevel, this.domainFunc, true)
      if (init === "") init = sectionIndex.entries().next().value[0]
      if (sectionIndex.get(init) === undefined) {
        return false
      }
      else {
        // setTimeout(async () => {
          sectionIndex.get(init).priorityThen((e) => {
            e.scrollIntoView(true);
            this.elementBody.scrollBy(0, padding)
          })
          
        // }, 0)
      }
    }
    else {
      sectionIndex.forEach(async (elem) => {
        this.observer.unobserve(await elem)
      })
      domain.got(this.domainFunc)
    }
  }


  stl() {
    return super.stl() + require("./sectionedPage.css").toString()
  }
}