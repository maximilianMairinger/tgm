import Icon from "../../icon";
import declareComponent from "../../../../../lib/declareComponent";




export default class BetriebsinformatikIcon extends Icon {
  constructor() {
    super()

  }

  pug() {
    return require("./betriebsinformatik.pug").default
  }
}

declareComponent("betriebs-informatik-icon", BetriebsinformatikIcon)
