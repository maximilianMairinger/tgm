import Icon from "../../icon";
import declareComponent from "../../../../../lib/declareComponent";




export default class SmallStonksIcon extends Icon {
  constructor() {
    super()

  }

  pug() {
    return require("./smallStonks.pug").default
  }
}

declareComponent("small-stonks-icon", SmallStonksIcon)
