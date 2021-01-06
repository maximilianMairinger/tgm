import Icon from "../../icon";
import declareComponent from "../../../../../lib/declareComponent";




export default class ChainIcon extends Icon {


  pug() {
    return require("./chain.pug").default
  }
}

declareComponent("chain-icon", ChainIcon)
