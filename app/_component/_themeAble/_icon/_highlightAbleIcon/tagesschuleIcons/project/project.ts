import HighlightAbleIcon from "../../highlightAbleIcon";
import declareComponent from "../../../../../../lib/declareComponent";




export default declareComponent("project-icon", class ProjectIcon extends HighlightAbleIcon {
  constructor() {
    super()

  }

  pug() {
    return require("./project.pug").default
  }
})
