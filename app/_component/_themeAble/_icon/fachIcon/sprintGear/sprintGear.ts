import Icon from "../../icon";
import declareComponent from "../../../../../lib/declareComponent";




export default class SprintGearIcon extends Icon {
  pug() {
    return require("./sprintGear.pug").default
  }
}

declareComponent("sprint-gear-icon", SprintGearIcon)
