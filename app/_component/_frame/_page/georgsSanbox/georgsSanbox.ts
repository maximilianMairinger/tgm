import { declareComponent } from "../../../../lib/declareComponent"
import Page from "../page"


export default declareComponent("georgs-sandbox", class extends Page {
  constructor() {
    super()
    
  }

  protected activationCallback(active: boolean): void {
    
  }
  stl() {
    return require("./georgsSanbox.css").toString()
  }
  pug() {
    return require("./georgsSanbox.pug").default
  }

}) 