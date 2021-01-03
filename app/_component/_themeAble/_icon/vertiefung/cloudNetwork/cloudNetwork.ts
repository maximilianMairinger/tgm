import Icon from "../../icon";
import declareComponent from "../../../../../lib/declareComponent";




export default class CloudNetworkIcon extends Icon {
  constructor() {
    super()

  }

  pug() {
    return require("./cloudNetwork.pug").default
  }
}

declareComponent("cloud-network-icon", CloudNetworkIcon)
