import { declareComponent } from "../../../../../lib/declareComponent"
import Page from "../page"


export default declareComponent("404-page", class extends Page {
  constructor() {
    super()
    
  }

  protected activationCallback(active: boolean): void {
    
  }
  stl() {
    return super.stl() + require("./404.css").toString()
  }
  pug() {
    return require("./404.pug").default
  }

}) 