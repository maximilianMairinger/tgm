import Icon from "../../icon";
import declareComponent from "../../../../../lib/declareComponent";




export default class MicroscopeIcon extends Icon {


  pug() {
    return require("./microscope.pug").default
  }
}

declareComponent("microscope-icon", MicroscopeIcon)
