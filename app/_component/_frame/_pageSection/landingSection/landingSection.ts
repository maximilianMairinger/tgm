import { declareComponent } from "../../../../lib/declareComponent"
import PageSection from "../pageSection"
import "./../../../_themeAble/_text/textblob/textblob"
import TextBlob from "./../../../_themeAble/_text/textblob/textblob"
import IconCard from "../../../_themeAble/_card/iconCard/iconCard";
import BioMedIcon from "../../../_themeAble/_icon/bioMed/bioMed";



export default declareComponent("landing-section", class Landing extends PageSection {
  private cardContainer = this.q("card-container")
  constructor() {
    super()
    
    this.cardContainer.apd(
      new IconCard(new BioMedIcon, "Biomedizin"), 
      new IconCard(new BioMedIcon, "Biomedizin"), 
      new IconCard(new BioMedIcon, "Biomedizin"), 
      new IconCard(new BioMedIcon, "Biomedizin"), 
      new IconCard(new BioMedIcon, "Biomedizin"), 
      new IconCard(new BioMedIcon, "Biomedizin"), 
      new IconCard(new BioMedIcon, "Biomedizin"))
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
