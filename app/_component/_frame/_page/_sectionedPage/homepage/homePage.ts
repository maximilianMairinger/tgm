import { declareComponent } from "../../../../../lib/declareComponent"
import SectionedPage from "../sectionedPage"
import { set } from "../../../../../lib/domain"
import { ResourcesMap } from "../../../../../lib/lazyLoad"


export default declareComponent("home-page", class HomePage extends SectionedPage<{[name: string]: string}> {
  constructor(private setPageCb: (domain: string) => void, domainLevel = 0) {
    super({
      section1: ".a",
      section2: ".b",
      section3: ".c",
      section4: ".d",
      section5: ".e",
    }, domainLevel);


    this.sectionIndex.forEach((elem, name) => {
      elem.then((e) => {
        e.on("click", () => {
          set(domainLevel, name)
        })
      })
    })

  }

  protected activationCallback(active: boolean) {
    return super.activationCallback(active)
  }
  stl() {
    return super.stl() + require("./homePage.css").toString()
  }
  pug() {
    return require("./homePage.pug").default
  }

}) 