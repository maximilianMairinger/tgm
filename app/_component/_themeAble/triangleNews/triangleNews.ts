import Component from "../../component"
import ThemeAble, { Theme } from "../themeAble"
import declareComponent from "../../../lib/declareComponent"
import "../_icon/bigNewsTriangle/bigNewsTriangle"
import BigNewsTriangle from "../_icon/bigNewsTriangle/bigNewsTriangle"

export default class TriangleNews extends ThemeAble {

  private bigNewsTriangle = new BigNewsTriangle()
  constructor() {
    super() 
    this.elementBody.apd(this.bigNewsTriangle)
    
  }
  theme(): Theme
  theme(to: Theme): this
  theme(to?: Theme): any {
    this.bigNewsTriangle.theme(to)
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
