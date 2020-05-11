import { declareComponent } from "../../../../../lib/declareComponent"
import SectionedPage from "../sectionedPage"


export default declareComponent("home-page", class HomePage extends SectionedPage {
  constructor(private setPageCb: (domain: string) => void) {
    super({
      section1: ""
    })
  }

  protected activationCallback(active: boolean): void {
    
  }
  stl() {
    return require("./homePage.css").toString()
  }
  pug() {
    return require("./homePage.pug").default
  }

}) 