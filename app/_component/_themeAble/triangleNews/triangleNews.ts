import Component from "../../component"
import ThemeAble, { Theme } from "../themeAble"
import declareComponent from "../../../lib/declareComponent"
import "../_icon/bigNewsTriangle/bigNewsTriangle"
import BigNewsTriangle from "../_icon/bigNewsTriangle/bigNewsTriangle"
import "../_text/imageTextblob/imageTextblob"
import ImageTextblob from "../_text/imageTextblob/imageTextblob"
import "../_card/_infoCard/newsCard/newsCard"
import Card from "../_card/_infoCard/newsCard/newsCard"
import { ElementList } from "extended-dom"

export default class TriangleNews extends ThemeAble {

  private bigNewsTriangle = this.q("c-big-news-triangle-icon") as BigNewsTriangle
  private imageTextblob = this.q("c-image-textblob") as ImageTextblob
  private cards = this.q("c-news-card") as ElementList<Card>
  
  constructor() {
    super() 
    
  }

  theme(): Theme
  theme(to: Theme): this
  theme(to?: Theme): any {
    this.bigNewsTriangle.theme(to)
    this.imageTextblob.theme(to)
    this.cards.Inner("theme", [to])
    return super.theme(to)
  }

  public pug(): string {
    return require("./triangleNews.pug").default
  }
  public stl(): string {
    return super.stl() + require("./triangleNews.css").toString()
  }
}

declareComponent("triangle-news", TriangleNews)
