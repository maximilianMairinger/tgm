import IconCard from "./../../../_card/iconCard/iconCard"
import Thumbnail from "../thumbnail";
import Card from "../../../_card/iconCard/iconCard"
import declareComponent from "../../../../../lib/declareComponent";

export default class CardThumbnail extends Thumbnail {
  private cardContainer = this.q("card-container")
  constructor(card: ConstructorParameters<typeof Card>, ...cards: ConstructorParameters<typeof Card>[])
  constructor(abteilung: string)
  constructor(card_baseLink: string | ConstructorParameters<typeof Card>, ...cards: ConstructorParameters<typeof Card>[]) {
    super()

    if (typeof card_baseLink === "string") cards.add(
      ["anmelden", "Anmelden", undefined, "https://anmeldung.tgm.ac.at/anmeldung/"],
      ["sprechstunden", "Sprechstunde", undefined, "neilo.webuntis.com/WebUntis/?school=tgm#/basic/officehours"],
      ["projekte", "Projekte", undefined, card_baseLink + "projekte"],
      ["team", "Team", undefined, card_baseLink + "team"]
    )
    
    this.cardContainer.apd(...cards.map(args => args instanceof Card ? args : new Card(...args)))
  }

  protected startIframe() {
    super.startIframe();
    this.cardContainer.anim({translateY: "-25%"}, 1000)
  }

  stl() {
      return super.stl() + require("./cardThumbnail.css").toString();
  }
  pug() {
    return super.pug() + require("./cardThumbnail.pug").default
  }
}

declareComponent("card-thumbnail", CardThumbnail)
