import Icon from "../../icon";
import declareComponent from "../../../../../lib/declareComponent";




export default class FactoryIcon extends Icon {


  pug() {
    return require("./factory.pug").default
  }
}

declareComponent("factory-icon", FactoryIcon)
