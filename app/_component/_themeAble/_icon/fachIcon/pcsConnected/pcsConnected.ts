import Icon from "../../icon";
import declareComponent from "../../../../../lib/declareComponent";




export default class PcsConnectedIcon extends Icon {

  pug() {
    return require("./pcsConnected.pug").default
  }
}

declareComponent("pcs-connected-icon", PcsConnectedIcon)
