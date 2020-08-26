import { declareComponent } from "../../../../lib/declareComponent"
import Page from "../page"
import { Data } from "josm"
import "./../../../_themeAble/_icon/filledArrow/filledArrow"
import delay from "delay"
import "./../../../_themeAble/link/link"
import { ElementList } from "extended-dom"
import TextBlob from "./../../../_themeAble/_text/textblob/textblob"




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