import Icon from "../../icon";
import declareComponent from "../../../../../lib/declareComponent";




export default class HandIdeaIcon extends Icon {


  pug() {
    return require("./handIdea.pug").default
  }
}

declareComponent("hand-idea-icon", HandIdeaIcon)
