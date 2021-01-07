import { declareComponent } from "../../../../../lib/declareComponent"
import PageSection from "../pageSection"
import "./../../../../_themeAble/_text/textblob/textblob"
import IconCard from "../../../../_themeAble/_card/iconCard/iconCard";
import BioMedIcon from "../../../../_themeAble/_icon/_highlightAbleIcon/abteilungsIcon/bioMed/bioMed";
import ElektronikIcon from "../../../../_themeAble/_icon/_highlightAbleIcon/abteilungsIcon/elektronik/elektronik";
import ElektrotechnikIcon from "../../../../_themeAble/_icon/_highlightAbleIcon/abteilungsIcon/elektrotechnik/elektrotechnik";
import ItIcon from "../../../../_themeAble/_icon/_highlightAbleIcon/abteilungsIcon/it/it";
import KunststofftechnikIcon from "../../../../_themeAble/_icon/_highlightAbleIcon/abteilungsIcon/kunststofftechnik/kunststofftechnik";
import MaschinenbauIcon from "../../../../_themeAble/_icon/_highlightAbleIcon/abteilungsIcon/maschinenbau/maschinenbau";
import WirtschaftsingenieureIcon from "../../../../_themeAble/_icon/_highlightAbleIcon/abteilungsIcon/wirtschaftsingenieure/wirtschaftsingenieure";
import delay from "delay";
import lang from "../../../../../lib/lang";
import CardCarousel from "../../../../cardCarousel/cardCarousel";
import "./../../../../image/image"
import "./../../../_button/button"


export default declareComponent("landing-section", class Landing extends PageSection {
  private cardWrapper = this.q("card-wrapper")
  
  private mainHeaderElem = this.q("text-container > textblob-animation-wrapper")
  private tagesschuleHeaderElem = this.q("tagesschule-container > c-textblob")
  constructor() {
    super()

    let abt = lang.abteilungen

    let cards = [
      new IconCard(new BioMedIcon, abt.Biomedizien, lang.AbteilungsShorts.Biomedizien, "tagesschule/biomedizin"),
      new IconCard(new ElektronikIcon, abt.Elektronik, lang.AbteilungsShorts.Elektronik, "tagesschule/elektronik"),
      new IconCard(new ElektrotechnikIcon, abt.Elektrotechnik, lang.AbteilungsShorts.Elektrotechnik, "tagesschule/elektrotechnik"),
      new IconCard(new ItIcon, abt.Informationstechnologie, lang.AbteilungsShorts.Informationstechnologie, "tagesschule/informationstechnologie"),
      new IconCard(new KunststofftechnikIcon, abt.Kunststofftechnik, lang.AbteilungsShorts.Kunststofftechnik, "https://www2.tgm.ac.at/tagesschule/hkt"),
      new IconCard(new MaschinenbauIcon, abt.Maschinenbau, lang.AbteilungsShorts.Maschinenbau, "https://www2.tgm.ac.at/tagesschule/hmb"),
      new IconCard(new WirtschaftsingenieureIcon, abt.Wirtschaftsingenieure, lang.AbteilungsShorts.Wirtschaftsingenieure, "tagesschule/wirtschaftsingenieure")
    ]


    

    this.cardWrapper.apd(new CardCarousel(cards))

    

    







    this.getLocalScrollProgressData().scrollTrigger(175, 25)
      .on("forward", () => {
        let token = this.scrollProgAnimToken = Symbol()
        this.mainHeaderElem.anim({translateY: 20, opacity: 0, scale: .97}, 400).then(() => {if (token === this.scrollProgAnimToken) this.mainHeaderElem.hide().css({translateY: -20})})
        delay(140).then(() => {if (token === this.scrollProgAnimToken) this.tagesschuleHeaderElem.show().anim({opacity: 1, translateY: .1, scale: 1}, 550)})
      })
      .on("backward", () => {
        let token = this.scrollProgAnimToken = Symbol()
        this.tagesschuleHeaderElem.anim({opacity: 0, translateY: 20, scale: .97}, 400).then(() => {if (token === this.scrollProgAnimToken) this.tagesschuleHeaderElem.hide().css({translateY: -20})})
        delay(140).then(() => {if (token === this.scrollProgAnimToken) this.mainHeaderElem.show().anim({translateY: .1, opacity: 1, scale: 1}, 550)})
      })
  }
  private scrollProgAnimToken: Symbol

  


  protected activationCallback(active: boolean) {

  }
  stl() {
    return super.stl() + require("./landingSection.css").toString()
  }
  pug() {
    return require("./landingSection.pug").default
  }
});
