import { declareComponent } from "../../../../../lib/declareComponent"
import Page from "../page"
import "./../../../../_themeAble/_icon/_highlightAbleIcon/filledArrow/filledArrow"
import "./../../../../_themeAble/link/link"




export default declareComponent("maxs-sandbox", class extends Page {
  

  constructor() {
    super()
    





  }

  protected activationCallback(active: boolean): void {
    
  }
  stl() {
    return super.stl() + require("./maxsSandbox.css").toString()
  }
  pug() {
    return require("./maxsSandbox.pug").default
  }

}) 