import { declareComponent } from "../../../../lib/declareComponent"
import Page from "../page"
import "../../../_card/newscard/newscard";
import "../../../footleiste/footleiste"

export default declareComponent("daniels-sandbox", class extends Page {
  constructor() {
    super()
  }

  protected activationCallback(active: boolean): void {
    
  }
  stl() {
    return require("./danielsSandbox.css").toString()
  }
  pug() {
    return require("./danielsSandbox.pug").default
  }

}) 