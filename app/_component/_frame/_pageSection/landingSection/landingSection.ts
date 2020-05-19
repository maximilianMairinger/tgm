import { declareComponent } from "../../../../lib/declareComponent"
import PageSection from "../pageSection"
import "./../../../_themeAble/_text/textblob/textblob"
import TextBlob from "./../../../_themeAble/_text/textblob/textblob"
import IconCard from "../../../_themeAble/_card/iconCard/iconCard";
import BioMedIcon from "../../../_themeAble/_icon/bioMed/bioMed";
import { ElementList } from "extended-dom";



export default declareComponent("landing-section", class Landing extends PageSection {
  private cardContainer = this.q("card-container")
  constructor() {
    super()

    let initerLs = [
      () => new IconCard(new BioMedIcon, "Biomedizin1"), 
      () => new IconCard(new BioMedIcon, "Biomedizin2"), 
      () => new IconCard(new BioMedIcon, "Biomedizin3"), 
      () => new IconCard(new BioMedIcon, "Biomedizin4"), 
      () => new IconCard(new BioMedIcon, "Biomedizin5"), 
      () => new IconCard(new BioMedIcon, "Biomedizin6"), 
      () => new IconCard(new BioMedIcon, "Biomedizin7")
    ]

    let elems = new ElementList(...initerLs.Call())
    
    this.cardContainer.apd(...elems);


    let ordered = new ElementList(...elems)


    let mobile: boolean
    window.on("resize", (r) => {
      let currMobile = r.width < 1000
      if (currMobile) {
        if (!mobile || mobile === undefined) {
          // to desktop switch
        }
      }
      else if (mobile || mobile === undefined) {

        // to mobile switch
        this.cardContainer.emptyNodes()

        ordered.set(elems)
        this.cardContainer.apd(...elems)
      }

      mobile = currMobile
    })

    let nextIndex = 0
    this.cardContainer.on("scroll", () => {
      
      if (this.cardContainer.scrollWidth - this.cardContainer.width() - ordered.last.width() < this.cardContainer.scrollLeft) {
        if (mobile) {
          let elem = initerLs[nextIndex - Math.floor(nextIndex / initerLs.length) * initerLs.length]()
          this.cardContainer.apd(elem)
          ordered.add(elem)
          console.log("apd")
          nextIndex++
        }
      }
    })
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
