import "../../../_text/imageTextblob/imageTextblob";
import "../../../_icon/bigNewsTriangle/bigNewsTriangle"
import "../../../_card/_infoCard/newsCard/newsCard"
import PageSection from "../pageSection"
import NewsCard, {WEEKDAYS} from "../../../_card/_infoCard/newsCard/newsCard";
import { Theme } from "../../../themeAble";
import declareComponent from "../../../../../lib/declareComponent";
import OverflowX from "../../../overflowX/overflowX";
import Button from "../../../_button/button";
import * as domain from "../../../../../lib/domain";



export default class TriangleNews extends PageSection {
  private cardContainer = this.q("card-container")
  private overflowX;
  private imageTextblob = this.q("c-image-textblob")


  constructor(content: {
    text: {
      note: string,
      heading: string,
      subheading: string,
      content: string
    },
    cards: {
      heading: string,
      note: string,
      thumbnail: string,
      href: string,
      contenttitle: string,
      content: string
    }[]
  })
  constructor(content: {
    text: {
      note: string,
      heading: string,
      subheading: string,
      content: string
    }
  }, api: true, tags: string[])
  constructor(content: {
    text: {
      note: string,
      heading: string,
      subheading: string,
      content: string
    },
    cards?: {
      heading: string,
      note: string,
      thumbnail: string,
      href: string,
      contenttitle: string,
      content: string
    }[]
  }, api = false, tags?:string[]) {
    super("dark")
    this.overflowX = new OverflowX(new Button(), new Button(), api, tags ? tags.add("news") : ['news'], NewsCard.apiParser)
    this.overflowX.padding(false, 25)
    this.overflowX.theme(this.theme())
    this.cardContainer.append(this.overflowX)
    if(!api || !tags) {
      for (let card of content.cards) {
        let cardElem = new NewsCard()
        for (const k in card) {
          cardElem[k](card[k])
        }
        this.overflowX.append(cardElem)
      }
    }




    for (const k in content.text) {
      this.imageTextblob[k](content.text[k])
    }


    

  }


  //todo: doesnt work with news cards
  theme(): Theme
  theme(to: Theme): this
  theme(to?: Theme): any {
    if (to !== undefined) {
      //@ts-ignore
      this.imageTextblob.childs(1, true).Inner("theme", [to])
      this.overflowX.theme(to)
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

declareComponent("triangle-news", TriangleNews)