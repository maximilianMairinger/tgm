import IconCard from "./../../../_card/iconCard/iconCard"
import Thumbnail from "../thumbnail";
import CardCarousel from "../../../../cardCarousel/cardCarousel";

export default abstract class CardThumbnail extends Thumbnail {
  constructor(...cards: IconCard[]) {
    super()
    this.apd(new CardCarousel(cards, true))
  }

  stl() {
      return super.stl() + require("./cardThumbnail.css").toString();
  }
  pug() {
    return super.pug() + require("./cardThumbnail.pug").default
  }
}