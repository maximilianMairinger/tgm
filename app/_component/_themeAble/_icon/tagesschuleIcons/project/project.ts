import Icon from "../../icon";
import declareComponent from "../../../../../lib/declareComponent";




export default declareComponent("project-icon", class ProjectIcon extends Icon {
  constructor() {
    super()

  }

  pug() {
    return require("./project.pug").default
  }
})
