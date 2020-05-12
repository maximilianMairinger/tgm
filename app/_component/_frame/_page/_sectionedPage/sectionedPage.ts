import Page from "../page";
import * as domain from "./../../../../lib/domain"
import scrollTo from "animated-scroll-to";
import WaapiEasing from "waapi-easing";

const padding = -70

console.log("wqwe")

type QuerySelector = string
export default abstract class SectionedPage extends Page {
  public readonly sectionIndex: {[name: string]: HTMLElement}
  private inScrollAnimation = false
  constructor(sectionIndex: {[name: string]: HTMLElement | QuerySelector}, private domainLevel: number) {
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

    
    

    
    

  }


  private domainFunc = (e) => {
    this.inScrollAnimation = true
    scrollTo(this.sectionIndex[e] as HTMLElement, {
      cancelOnUserAction: true,
      verticalOffset: padding,
      speed: 1150,
      elementToScroll: this.elementBody,
      easing: new WaapiEasing("ease").function

    }).then(() => {
      this.inScrollAnimation = false
    })
  }

  protected activationCallback(active: boolean) {
    if (active) {
      let init = domain.get(this.domainLevel, this.domainFunc, true)
  
      if (init === "") init = Object.keys(this.sectionIndex).first
      if (this.sectionIndex[init] === undefined) {
        return false
      }
      else {
        setTimeout(() => {
          (this.sectionIndex[init] as HTMLElement).scrollIntoView(true);
          this.elementBody.scrollBy(0, padding)
        }, 0)
      }
    }
    else {
      domain.got(this.domainFunc)
    }
  }


  stl() {
    return super.stl() + require("./sectionedPage.css").toString()
  }
}