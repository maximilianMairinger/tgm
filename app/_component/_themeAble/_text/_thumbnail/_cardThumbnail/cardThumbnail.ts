import IconCard from "./../../../_card/iconCard/iconCard"
import Thumbnail from "../thumbnail";

export default abstract class CardThumbnail extends Thumbnail {
  private cardContainer = this.q("card-container")
  constructor(...cards: IconCard[]) {
    super()
    this.cardContainer.apd(...cards)
  }

  stl() {
      return super.stl() + require("./cardThumbnail.css").toString();
  }
  pug() {
    return super.pug() + require("./cardThumbnail.pug").default
  }
}