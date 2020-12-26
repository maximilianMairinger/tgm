import Icon from "../icon";
import declareComponent from "../../../../lib/declareComponent";




export default class ArrowIcon extends Icon {
  constructor() {
    super()

  }

  pug() {
    return require("./playButton.pug").default
  }
}

declareComponent("play-button-icon", ArrowIcon)