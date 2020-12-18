import PageSection from "../pageSection"
import "../../../_card/selectionCard/selectionCard"
import "../../../_card/_infoCard/unterrichtSystemeCard/unterrichtSystemeCard"
import SelectionCard from "../../../_card/selectionCard/selectionCard"
import UnterrichtSystemeCard from "../../../_card/_infoCard/unterrichtSystemeCard/unterrichtSystemeCard"
import declareComponent from "../../../../../lib/declareComponent"
import "../../../vertiefungsContainer/vertiefungsContainer"
import VertiefungsContainer, {VertiefungsCardContent} from "../../../vertiefungsContainer/vertiefungsContainer";
import Textblob, {MediaQuerySize} from "../../../_text/textblob/textblob";



export default class AusmachtSection extends PageSection {
  private heading = this.q("c-textblob.heading")
  private cardContainer = this.q("card-container")
  private vertiefungSection = this.q("vertiefung-section")
  constructor(content: {
    heading: {
      heading: string,
      subheading?: string,
      hsize?: {max: number, min: number}
    },
    selection?: {
      note?: string,
      heading: string,
      selection: {
        icon: string,
        title: string,
        content: string,
        link: string
      }[],
      stundentafel?: string
    },
    cards: {
      heading: string,
      note: string, 
      thumbnail: string,
      href: string, 
      contentTitle: string,
      content: string
    }[],
    vertiefung?: {
      text: {
        note: string,
        heading: string,
        subheading: string,
        hsize:MediaQuerySize,
        content: string
      }
      cards: VertiefungsCardContent[]
    }
  }) {
    super()

    for (let k in content.heading) {
      this.heading[k](content.heading[k])
    }

    if (content.selection) {
      let selBox = new SelectionCard()
      selBox.background("none")
      
      for (let k in content.selection) {
        selBox[k](content.selection[k])
      }
      
      this.cardContainer.apd(selBox)
    }

    let boxAr = []
    for (let card of content.cards) {
      let box = new UnterrichtSystemeCard()
      for (let k in card) {
        box[k](card[k])
      }
      boxAr.add(box)
    }

    this.cardContainer.prepend(...boxAr.reverse())
    if (content.vertiefung) {
      let vertiefungBlob = new Textblob();
      const txt = content.vertiefung.text
      for(let vertiefung in txt){
        vertiefungBlob[vertiefung](txt[vertiefung])
      }
      this.vertiefungSection.apd(vertiefungBlob)
      
      let vertiefungsContainer = new VertiefungsContainer();
      vertiefungsContainer.cards(content.vertiefung.cards);
      this.vertiefungSection.apd(vertiefungsContainer)
    }
    

    

    

  }

  stl() {
    return super.stl() + require("./ausmachtSection.css").toString()
  }
  pug() {
    return require("./ausmachtSection.pug").default
  }
}

declareComponent("ausmacht-section", AusmachtSection)
