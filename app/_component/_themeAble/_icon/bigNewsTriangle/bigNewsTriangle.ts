import Icon from "../icon";
import declareComponent from "../../../../lib/declareComponent";




export default declareComponent("big-news-triangle-icon", class CpuIcon extends Icon {
  constructor() {
    super()

  }

  stl() {
    return super.stl() + require("./bigNewsTriangle.css").toString()
  }

  pug() {
    return require("./bigNewsTriangle.pug").default
  }
})
