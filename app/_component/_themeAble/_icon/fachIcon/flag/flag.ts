import Icon from "../../icon";
import declareComponent from "../../../../../lib/declareComponent";




export default class FlagIcon extends Icon {


  pug() {
    return require("./flag.pug").default
  }
}

declareComponent("flag-icon", FlagIcon)
