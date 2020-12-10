import { ElementList } from "extended-dom";
import { declareComponent } from "../../../../../lib/declareComponent"

import "../../../_text/imageTextblob/imageTextblob";
import "../../../_icon/bigNewsTriangle/bigNewsTriangle"
import "./../../../_card/_infoCard/newsCard/newsCard"
import PageSection from "../pageSection"



export default declareComponent("dark-news-section", class extends PageSection {
  
  constructor() {
    super("dark")
    
  }

  childThemeAbles() {
    return ["c-big-news-triangle-icon", "c-image-textblob", "c-news-card"]
  }
  
  stl() {
    return super.stl() + require("./darkNewsSection.css").toString()
  }
  pug() {
    return require("./darkNewsSection.pug").default
  }
});