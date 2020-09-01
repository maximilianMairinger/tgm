import { declareComponent } from "../../../../lib/declareComponent"
import PageSection from "../pageSection"
import { Theme } from "../../../_themeAble/themeAble"
import NewsSectionBackground from "../../../_themeAble/newsSectionBackground/newsSectionBackground"


export default declareComponent("dark-news-section", class extends PageSection {
  public theme: Theme = "dark"
  private newsSectionBackground = new NewsSectionBackground().theme("dark")

  constructor() {
    super()
    this.elementBody.apd(this.newsSectionBackground)
    
  }

  stl() {
    return super.stl() + require("./darkNewsSection.css").toString()
  }
  pug() {
    return require("./darkNewsSection.pug").default
  }
});