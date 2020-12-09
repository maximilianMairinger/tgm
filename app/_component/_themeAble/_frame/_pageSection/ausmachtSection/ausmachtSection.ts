import PageSection from "../pageSection"
import "../../../_card/selectionCard/selectionCard"
import "../../../_card/_infoCard/unterrichtSystemeCard/unterrichtSystemeCard"
import SelectionCard from "../../../_card/selectionCard/selectionCard"
import UnterrichtSystemeCard from "../../../_card/_infoCard/unterrichtSystemeCard/unterrichtSystemeCard"
import declareComponent from "../../../../../lib/declareComponent"



export default class AusmachtSection extends PageSection {
  private heading = this.q("c-textblob.heading")
  private cardContainer = this.q("card-container")
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
      }[]
    },
    cards: {
      heading: string,
      note: string, 
      thumbnail: string,
      href: string, 
      contentTitle: string,
      content: string
    }[]
  }) {
    super()

    for (let k in content.heading) {
      this.heading[k](content.heading[k])
    }

    if (content.selection) {
      let selBox = new SelectionCard()
      
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

    this.cardContainer.apd(...boxAr)


  }

  stl() {
    return super.stl() + require("./ausmachtSection.css").toString()
  }
  pug() {
    return require("./ausmachtSection.pug").default
  }
}

declareComponent("ausmacht-section", AusmachtSection)
