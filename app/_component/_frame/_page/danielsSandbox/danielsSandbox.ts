import { declareComponent } from "../../../../lib/declareComponent"
import Page from "../page"


export default declareComponent("daniels-sandbox", class extends Page {
  constructor() {
    super()
    
  }

  protected activationCallback(active: boolean): void {
    
  }
  stl() {
    return super.stl() + require("./danielsSandbox.css").toString()
  }
  pug() {
    return require("./danielsSandbox.pug").default
  }

}) 