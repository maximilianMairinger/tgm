import Icon from "../../icon";
import declareComponent from "../../../../../lib/declareComponent";




export default class AutomationGearIcon extends Icon {
  constructor() {
    super()

  }

  pug() {
    return require("./automationGear.pug").default
  }
}

declareComponent("automation-gear-icon", AutomationGearIcon)
