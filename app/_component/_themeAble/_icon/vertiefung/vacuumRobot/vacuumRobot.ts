import Icon from "../../icon";
import declareComponent from "../../../../../lib/declareComponent";




export default class VacuumRobotIcon extends Icon {
  constructor() {
    super()

  }

  pug() {
    return require("./vacuumRobot.pug").default
  }
}

declareComponent("vacuum-robot-icon", VacuumRobotIcon)
