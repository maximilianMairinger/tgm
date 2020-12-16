import Icon from "../../icon";
import declareComponent from "../../../../../lib/declareComponent";




export default class HeartSmartWatchIcon extends Icon {


  pug() {
    return require("./heartSmartWatch.pug").default
  }
}

declareComponent("heart-smart-watch-icon", HeartSmartWatchIcon)
