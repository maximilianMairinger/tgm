import Icon from "../../icon";
import declareComponent from "../../../../../lib/declareComponent";




export default class LabIcon extends Icon {


  pug() {
    return require("./lab.pug").default
  }
}

declareComponent("lab-icon", LabIcon)
