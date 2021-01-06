import Icon from "../../icon";
import declareComponent from "../../../../../lib/declareComponent";




export default class EnvironmentIcon extends Icon {


  pug() {
    return require("./environment.pug").default
  }
}

declareComponent("environment-icon", EnvironmentIcon)
