import Icon from "../../icon";
import declareComponent from "../../../../../lib/declareComponent";




export default class LawIcon extends Icon {


  pug() {
    return require("./law.pug").default
  }
}

declareComponent("law-icon", LawIcon)
