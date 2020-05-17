import { declareComponent } from "../../../../lib/declareComponent"
import PageSection from "../pageSection"


export default declareComponent("landing-section", class Landing extends PageSection {
  
  constructor() {
    super()
    
  }

  protected activationCallback(active: boolean) {
  
  }
  stl() {
    return super.stl() + require("./testSection1.css").toString()
  }
  pug() {
    return require("./testSection1.pug").default
  }
});
