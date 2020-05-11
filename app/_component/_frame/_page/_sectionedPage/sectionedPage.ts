import Page from "../page";
import * as domain from "./../../../../lib/domain"
import scrollTo from "animated-scroll-to";
import WaapiEasing from "waapi-easing";

type QuerySelector = string
export default abstract class SectionedPage extends Page {
  public readonly sectionIndex: {[name: string]: HTMLElement}
  private inScrollAnimation = false
  constructor(sectionIndex: {[name: string]: HTMLElement | QuerySelector}, domainLevel: number) {
    super()
    this.sectionIndex = sectionIndex as any

    let intersectingIndex: Element[] = []
    let observer = new IntersectionObserver((c) => {
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
  
        let elem = intersectingIndex.first
  
        
        for (let name in sectionIndex) {
          if (sectionIndex[name] === elem) {
            domain.set(domainLevel, name, false)
          }
        }
      }
    }, {
      threshold: 0,
      rootMargin: "-33.333%"
    })



    for (let name in sectionIndex) {
      if (!(sectionIndex[name] instanceof HTMLElement)) (sectionIndex[name] as any) = this.q(sectionIndex[name] as string)
      observer.observe(sectionIndex[name] as HTMLElement)
    }

    
    

    domain.get(domainLevel, (e) => {
      this.inScrollAnimation = true
      scrollTo(sectionIndex[e] as HTMLElement, {
        cancelOnUserAction: true,
        verticalOffset: -50,
        speed: 1150,
        elementToScroll: this.elementBody,
        easing: new WaapiEasing("ease").function

      }).then(() => {
        this.inScrollAnimation = false
      })
    }, true)

  }


  stl() {
    return require("./sectionedPage.css").toString()
  }
}