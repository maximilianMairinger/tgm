import Icon from "../icon";
import declareComponent from "../../../../lib/declareComponent";




export default declareComponent("tools-icon", class TollsIcon extends Icon {
  constructor() {
    super()

  }

  pug() {
    return require("./tools.pug").default
  }
})
