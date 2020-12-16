import Icon from "../../icon";
import declareComponent from "../../../../../lib/declareComponent";




export default class HeartBeatIcon extends Icon {
  pug() {
    return require("./heartBeat.pug").default
  }
}

declareComponent("heart-beat-icon", HeartBeatIcon)
