import { declareComponent } from "../../../../lib/declareComponent"
import PageSection from "../pageSection"


export default declareComponent("landing-section", class Landing extends PageSection {
  
  constructor() {
    super()
    
  }

  protected activationCallback(active: boolean) {
  
  }
  stl() {
    return super.stl() + require("./landingSection.css").toString()
  }
  pug() {
    return require("./landingSection.pug").default
  }
});
