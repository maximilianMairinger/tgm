import Icon from "../../icon";
import declareComponent from "../../../../../lib/declareComponent";




export default class SunElectricityIcon extends Icon {
  pug() {
    return require("./sunElectricity.pug").default
  }
}

declareComponent("sun-electricity-icon", SunElectricityIcon)
