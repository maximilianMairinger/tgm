import { declareComponent } from "../../../../../lib/declareComponent"
import SectionedPage from "../sectionedPage"
import { set } from "../../../../../lib/domain"


export default declareComponent("home-page", class HomePage extends SectionedPage {
  constructor(private setPageCb: (domain: string) => void) {
    super({
      section1: ".a",
      section2: ".b",
      section3: ".c",
      section4: ".d",
      section5: ".e",
    }, 0)


    for (let name in this.sectionIndex) {
      this.sectionIndex[name].on("click", () => {
        set(0, name)
      })
    }
  }

  protected activationCallback(active: boolean): void {
    
  }
  stl() {
    return super.stl() + require("./homePage.css").toString()
  }
  pug() {
    return require("./homePage.pug").default
  }

}) 