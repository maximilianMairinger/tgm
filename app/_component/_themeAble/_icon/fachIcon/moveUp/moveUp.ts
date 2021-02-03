import Icon from "../../icon";
import declareComponent from "../../../../../lib/declareComponent";




export default class MoveUpIcon extends Icon {


  pug() {
    return require("./moveUp.pug").default
  }
}

declareComponent("move-up-icon", MoveUpIcon)
