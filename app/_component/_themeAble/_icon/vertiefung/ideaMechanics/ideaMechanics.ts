import Icon from "../../icon";
import declareComponent from "../../../../../lib/declareComponent";




export default class IdeaMechanicsIcon extends Icon {
  constructor() {
    super()

  }

  pug() {
    return require("./ideaMechanics.pug").default
  }
}

declareComponent("idea-mechanics-icon", IdeaMechanicsIcon)
