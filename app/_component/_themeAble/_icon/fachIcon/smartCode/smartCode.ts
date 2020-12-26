import Icon from "../../icon";
import declareComponent from "../../../../../lib/declareComponent";




export default class SmartCodeIcon extends Icon {


  pug() {
    return require("./smartCode.pug").default
  }
}

declareComponent("smart-code-icon", SmartCodeIcon)
