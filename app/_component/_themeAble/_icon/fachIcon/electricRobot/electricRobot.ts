import Icon from "../../icon";
import declareComponent from "../../../../../lib/declareComponent";




export default class ElectricRobotIcon extends Icon {


  pug() {
    return require("./electricRobot.pug").default
  }
}

declareComponent("electric-robot-icon", ElectricRobotIcon)
