import { declareComponent } from "../../../../../lib/declareComponent"
import PageSection from "../pageSection"
import FooterElem from "../../../../footleiste/footleiste"




export default declareComponent("footer", class Footer extends PageSection {
  constructor(baseLink: string) {
    super()

    this.elementBody.apd(new FooterElem(baseLink))
  }

  stl() {
    return super.stl() + require("./footer.css").toString()
  }

  pug(){
    return "";
  }
});