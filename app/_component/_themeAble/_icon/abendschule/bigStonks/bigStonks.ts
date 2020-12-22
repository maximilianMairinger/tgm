import Icon from "../../icon";
import declareComponent from "../../../../../lib/declareComponent";




export default class BigStonksIcon extends Icon {
  constructor() {
    super()

  }

  pug() {
    return require("./bigStonks.pug").default
  }
}

declareComponent("big-stonks-icon", BigStonksIcon)
