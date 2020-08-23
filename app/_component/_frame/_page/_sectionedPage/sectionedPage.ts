import Page from "../page";
import * as domain from "./../../../../lib/domain"
import scrollTo from "animated-scroll-to";
import WaapiEasing from "waapi-easing";
import { ResourcesMap } from "../../../../lib/lazyLoad";
import LazySectionedPage from "./_lazySectionedPage/lazySectionedPage";
import PageSection from "../../_pageSection/pageSection";
import { EventListener } from "extended-dom";

const padding = -70


type SectionIndex = {[name in Name]: HTMLElement | QuerySelector}
type Name = string
type FullSectionIndex = ResourcesMap | SectionIndex | Promise<ResourcesMap | SectionIndex>
export type QuerySelector = string
export default abstract class SectionedPage<T extends FullSectionIndex> extends Page {
  public readonly sectionIndex: T extends Promise<any> ? Promise<ResourcesMap> : ResourcesMap
  private inScrollAnimation: Symbol
  constructor(sectionIndex: T, public domainLevel: number, protected setPage: (domain: string) => void, protected sectionChangeCallback?: (section: string) => void) {
    super()
    //@ts-ignore
    this.sectionIndex = sectionIndex instanceof Promise ? sectionIndex.then((sectionIndex) => this.prepSectionIndex(sectionIndex)) : this.prepSectionIndex(sectionIndex)
  }

  private prepSectionIndex(sectionIndex: any): ResourcesMap {
    if (sectionIndex instanceof ResourcesMap) return sectionIndex

    let map = new ResourcesMap()
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

    return map
  }

  private mainIntersectionObserver: IntersectionObserver
  private currentlyActiveSectionName: string
  private intersectingIndex: Element[] = []
  async initialActivationCallback() {
    //@ts-ignore
    let sectionIndex: ResourcesMap = await this.sectionIndex


    this.domainSubscription = domain.get(this.domainLevel, (domain: string) => {
      return new Promise<boolean>(async (res) => {
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
     
    }, false, sectionIndex.entries().next().value[0])

    
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
