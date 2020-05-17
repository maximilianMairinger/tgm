import { declareComponent } from "../../../../../lib/declareComponent"
import SectionedPage from "../sectionedPage"
import { set } from "../../../../../lib/domain"
import { ResourcesMap } from "../../../../../lib/lazyLoad"


export default declareComponent("test-page", class TestPage extends SectionedPage<{[name: string]: string}> {
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


  stl() {
    return super.stl() + require("./testPage.css").toString()
  }
  pug() {
    return require("./testPage.pug").default
  }

}) 