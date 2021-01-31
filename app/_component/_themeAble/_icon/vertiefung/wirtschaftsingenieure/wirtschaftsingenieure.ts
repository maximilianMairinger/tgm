import Icon from "../../icon";
import declareComponent from "../../../../../lib/declareComponent";




export default class WirtschaftsingenieureIcon extends Icon {
  constructor() {
    super()

  }

  pug() {
    return require("./wirtschaftsingenieure.pug").default
  }
}

declareComponent("wirtschaftsingenieure-vertiefung-icon", WirtschaftsingenieureIcon)
