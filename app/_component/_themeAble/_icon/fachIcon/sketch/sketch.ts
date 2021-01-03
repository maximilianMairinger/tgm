import Icon from "../../icon";
import declareComponent from "../../../../../lib/declareComponent";




export default class SketchIcon extends Icon {


  pug() {
    return require("./sketch.pug").default
  }
}

declareComponent("sketch-icon", SketchIcon)
