import Icon from "../../icon";
import declareComponent from "../../../../../lib/declareComponent";




export default class AttachedIcon extends Icon {


  pug() {
    return require("./attached.pug").default
  }
}

declareComponent("attached-icon", AttachedIcon)
