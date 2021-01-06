import Icon from "../../icon";
import declareComponent from "../../../../../lib/declareComponent";




export default declareComponent("tagesschule-anmelden-icon", class TagesschuleAnmaeldenIcon extends Icon {
  constructor() {
    super()

  }

  pug() {
    return require("./anmelden.pug").default
  }
})
