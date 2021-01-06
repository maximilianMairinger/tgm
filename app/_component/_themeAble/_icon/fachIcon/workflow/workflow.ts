import Icon from "../../icon";
import declareComponent from "../../../../../lib/declareComponent";




export default class WorkflowIcon extends Icon {


  pug() {
    return require("./workflow.pug").default
  }
}

declareComponent("workflow-icon", WorkflowIcon)
