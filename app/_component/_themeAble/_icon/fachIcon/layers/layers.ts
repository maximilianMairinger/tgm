import Icon from "../../icon";
import declareComponent from "../../../../../lib/declareComponent";




export default class LayersIcon extends Icon {


  pug() {
    return require("./layers.pug").default
  }
}

declareComponent("layers-icon", LayersIcon)
