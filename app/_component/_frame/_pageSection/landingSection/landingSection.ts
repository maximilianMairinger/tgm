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



    let mobile: boolean
    window.on("resize", (r) => {
      let currMobile = r.width < 1000
      if (currMobile) {
        if (!mobile || mobile === undefined) {
          // to mobile switch
          this.cardContainer.on("scroll", f)
        }
      }
      else if (mobile || mobile === undefined) {
        this.cardContainer.off("scroll", f)
        // to desktop switch
        this.cardContainer.emptyNodes()

        this.cardContainer.apd(...elems)
      }

      mobile = currMobile
    })

    // let nextIndex = 0
    //initerLs[nextIndex - Math.floor(nextIndex / initerLs.length) * initerLs.length]()

    let lastElem = elems.last
    let f = () => {
      if (this.cardContainer.scrollWidth - this.cardContainer.width() - lastElem.width() < this.cardContainer.scrollLeft) {
      

        let elems = initerLs.Call()
        this.cardContainer.apd(...elems)
        lastElem = elems.last
        console.log("apd")

      }
      else if (this.cardContainer.width() > this.cardContainer.scrollLeft) {
        let beforeWidth = this.cardContainer.scrollWidth
        let elems = initerLs.Call()
        this.cardContainer.prepend(...elems)
        let afterWidth = this.cardContainer.scrollWidth
        this.cardContainer.scrollBy(afterWidth - beforeWidth, 0)

        console.log("prep")
      }
    }

    
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
