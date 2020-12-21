import Icon from "../../icon";
import declareComponent from "../../../../../lib/declareComponent";




export default class ShortWavesIcon extends Icon {


  pug() {
    return require("./shortWaves.pug").default
  }
}

declareComponent("short-waves-icon", ShortWavesIcon)
