import Icon from "../../icon";
import declareComponent from "../../../../../lib/declareComponent";




export default class PenIcon extends Icon {


  pug() {
    return require("./pen.pug").default
  }
}

declareComponent("pen-icon", PenIcon)
