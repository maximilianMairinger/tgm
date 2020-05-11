import { declareComponent } from "../../../../lib/declareComponent"
import Page from "../page"


export default declareComponent("home-page", class HomePage extends Page {
  constructor(private setPageCb: (domain: string) => void) {
    super()
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