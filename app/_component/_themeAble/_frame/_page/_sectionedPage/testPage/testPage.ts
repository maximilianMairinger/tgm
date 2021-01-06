import { declareComponent } from "../../../../../../lib/declareComponent"
import SectionedPage from "../sectionedPage"
import { set } from "../../../../../../lib/domain"
import { ResourcesMap } from "../../../../../../lib/lazyLoad"


export default declareComponent("test-page", class TestPage extends SectionedPage {
  constructor(sectionChangeCallback?: (section: string) => void) {
    super({
      tagesschule: ".a",
      abendschule: ".b",
      versuchsanstalt: ".c",
      neues: ".d",
      kontakt: ".e",
    }, sectionChangeCallback);


    this.sectionIndex.forEach((elem, name) => {
      elem.then((e) => {
        e.on("click", () => {
          set(name, 1)
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