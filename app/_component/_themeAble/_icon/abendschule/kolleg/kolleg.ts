import Icon from "../../icon";
import declareComponent from "../../../../../lib/declareComponent";




export default class KollegIcon extends Icon {
  constructor() {
    super()

  }

  pug() {
    return require("./kolleg.pug").default
  }
}

declareComponent("kolleg-icon", KollegIcon)
