import Icon from "../../icon";
import declareComponent from "../../../../../lib/declareComponent";




export default class DeliveryCarIcon extends Icon {


  pug() {
    return require("./deliveryCar.pug").default
  }
}

declareComponent("delivery-car-icon", DeliveryCarIcon)
