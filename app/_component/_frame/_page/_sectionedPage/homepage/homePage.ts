import { declareComponent } from "../../../../../lib/declareComponent"
import SectionedPage from "../sectionedPage"
import { set } from "../../../../../lib/domain"
import { ResourcesMap } from "../../../../../lib/lazyLoad"


export default declareComponent("home-page", class HomePage extends SectionedPage<{[name: string]: string}> {
  constructor(setPage: (page: string) => void, sectionChangeCallback?: (section: string) => void, domainLevel = 0) {
    super({
      tagesschule: ".a",
      abendschule: ".b",
      versuchsanstalt: ".c",
      neues: ".d",
      kontakt: ".e",
    }, domainLevel, setPage, sectionChangeCallback);


    this.sectionIndex.forEach((elem, name) => {
      elem.then((e) => {
        e.on("click", () => {
          set(name, domainLevel)
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