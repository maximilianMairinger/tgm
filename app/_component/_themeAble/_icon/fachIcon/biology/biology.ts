import Icon from "../../icon";
import declareComponent from "../../../../../lib/declareComponent";




export default class BiologyIcon extends Icon {


  pug() {
    return require("./biology.pug").default
  }
}

declareComponent("biology-icon", BiologyIcon)
