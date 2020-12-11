import "../../../_text/imageTextblob/imageTextblob";
import "../../../_icon/bigNewsTriangle/bigNewsTriangle"
import "../../../_card/_infoCard/newsCard/newsCard"
import PageSection from "../pageSection"
import NewsCard from "../../../_card/_infoCard/newsCard/newsCard";
import { Theme } from "../../../themeAble";



export default class extends PageSection {
  private cardContainer = this.q("card-container")
  private imageTextblob = this.q("c-image-textblob")
  constructor(content: {
    text: {
      note: string,
      heading: string,
      subheading: string,
      content: string,

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
    super("dark")
    
    for (let card of content.cards) {
      let cardElem = new NewsCard()
      this.cardContainer.apd(cardElem)
      for (const k in card) {
        cardElem[k](card[k])
      }
      cardElem.theme(this.theme())
    }

    for (const k in content.text) {
      this.imageTextblob[k](content.text[k])
    }


    

  }

  theme(): Theme
  theme(to: Theme): this
  theme(to?: Theme): any {
    if (to !== undefined) {
      //@ts-ignore
      this.imageTextblob.childs(1, true).Inner("theme", [to])
    }
    return super.theme()
  }

  childThemeAbles() {
    return ["c-big-news-triangle-icon", "c-image-textblob"]
  }
  
  stl() {
    return super.stl() + require("./triangleNews.css").toString()
  }
  pug() {
    return require("./triangleNews.pug").default
  }
};