import Icon from "../icon";
import declareComponent from "../../../../lib/declareComponent";



export default class BigNewsTriangleIcon extends Icon {
  constructor() {
    super()

  }

  stl() {
    return super.stl() + require("./bigNewsTriangle.css").toString()
  }

  pug() {
    return require("./bigNewsTriangle.pug").default
  }
}

declareComponent("big-news-triangle-icon", BigNewsTriangleIcon)
