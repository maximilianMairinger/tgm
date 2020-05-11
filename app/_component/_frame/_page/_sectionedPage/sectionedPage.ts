import Page from "../page";
import * as domain from "./../../../../lib/domain"




type QuerySelector = string
export default abstract class SectionedPage extends Page {
  public readonly sectionIndex: {[name: string]: HTMLElement}
  constructor(sectionIndex: {[name: string]: HTMLElement | QuerySelector}, level: number) {
    super()
    this.sectionIndex = sectionIndex as any

    let intersectingIndex: Element[] = []
    let observer = new IntersectionObserver((c) => {
    
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

      console.log(intersectingIndex)
      
      for (let name in sectionIndex) {
        if (sectionIndex[name] === elem) {
          domain.set(level, name, false)
        }
      }
    }, {
      threshold: 0,
      rootMargin: "-33.333%"
      
    })

    console.log("ww")


    for (let name in sectionIndex) {
      if (!(sectionIndex[name] instanceof HTMLElement)) (sectionIndex[name] as any) = this.q(sectionIndex[name] as string)
      observer.observe(sectionIndex[name] as HTMLElement)
    }

    
    

    

  }
}