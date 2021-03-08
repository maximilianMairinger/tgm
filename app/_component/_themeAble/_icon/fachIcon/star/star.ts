import Icon from "../../icon";
import declareComponent from "../../../../../lib/declareComponent";




export default class StarIcon extends Icon {


  pug() {
    return require("./star.pug").default
  }
}

declareComponent("star-icon", StarIcon)
