import Icon from "../../icon";
import declareComponent from "../../../../../lib/declareComponent";




export default class MediaCodeIcon extends Icon {
  pug() {
    return require("./mediaCode.pug").default
  }
}

declareComponent("media-code-icon", MediaCodeIcon)
