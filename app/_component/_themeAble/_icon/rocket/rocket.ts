import Icon from "../icon";
import declareComponent from "../../../../lib/declareComponent";




export default declareComponent("rocket-icon", class RocketIcon extends Icon {
  constructor() {
    super()

  }

  pug() {
    return require("./rocket.pug").default
  }
})
