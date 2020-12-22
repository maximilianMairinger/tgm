import Icon from "../../icon";
import declareComponent from "../../../../../lib/declareComponent";




export default class GraphNetworkIcon extends Icon {


  pug() {
    return require("./graphNetwork.pug").default
  }
}

declareComponent("graph-network-icon", GraphNetworkIcon)
