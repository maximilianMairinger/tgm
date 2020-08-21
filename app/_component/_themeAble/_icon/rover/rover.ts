import Icon from "../icon";
import declareComponent from "../../../../lib/declareComponent";




export default declareComponent("rover-icon", class roverIcon extends Icon {
  constructor() {
    super()

  }

  pug() {
    return require("./rover.pug").default
  }
})
