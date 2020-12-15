import IconCard from "./../../../_card/iconCard/iconCard"
import Thumbnail from "../thumbnail";
import Card from "../../../_card/iconCard/iconCard"
import declareComponent from "../../../../../lib/declareComponent";

export default class CardThumbnail extends Thumbnail {
  private cardContainer = this.q("card-container")
  constructor(card: ConstructorParameters<typeof Card>, ...cards: ConstructorParameters<typeof Card>[])
  constructor(abteilung: string)
  constructor(card_abteilung: string | ConstructorParameters<typeof Card>, ...cards: ConstructorParameters<typeof Card>[]) {
    super()

    if (typeof card_abteilung === "string") cards.add(
      ["anmelden", "Anmelden"],
      ["sprechstunden", "Sprechstunde", undefined, "neilo.webuntis.com/WebUntis/?school=tgm#/basic/officehours"],
      ["projekte", "Projekte", undefined, "tagesschule/" + card_abteilung + "/projekte"],
      ["team", "Team", undefined, "tagesschule/" + card_abteilung + "/team"]
    )
    
    this.cardContainer.apd(...cards.map(args => args instanceof Card ? args : new Card(...args)))

    this.hsize({max:70, min:35});
    this.hmobile({max:55, min:35});
  }

  stl() {
      return super.stl() + require("./cardThumbnail.css").toString();
  }
  pug() {
    return super.pug() + require("./cardThumbnail.pug").default
  }
}

declareComponent("card-thumbnail", CardThumbnail)
