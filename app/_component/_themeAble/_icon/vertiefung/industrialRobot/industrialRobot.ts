import Icon from "../../icon";
import declareComponent from "../../../../../lib/declareComponent";




export default class IndustrialRobotIcon extends Icon {
  constructor() {
    super()

  }

  pug() {
    return require("./industrialRobot.pug").default
  }
}

declareComponent("industrial-robot-icon", IndustrialRobotIcon)
