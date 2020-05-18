import { declareComponent } from "../../../../lib/declareComponent"
import Page from "../page"
import "../../../_themeAble/_text/textblob/textblob"
import "../../../_themeAble/_text/imageTextblob/imageTextblob"
import "../../../_themeAble/_text/_thumbnail/schuelerprojekteThumbnail/schuelerprojekteThumbnail"


export default declareComponent("georgs-sandbox", class extends Page {
  constructor() {
    super()
    
  }

  protected activationCallback(active: boolean): void {
    
  }
  stl() {
    return super.stl() + require("./georgsSanbox.css").toString()
  }
  pug() {
    return require("./georgsSanbox.pug").default
  }

}) 