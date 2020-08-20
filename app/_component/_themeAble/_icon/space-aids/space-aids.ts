import Icon from "../icon";
import declareComponent from "../../../../lib/declareComponent";




export default declareComponent("space-aids-icon", class SpaceAidsIcon extends Icon {
  constructor() {
    super()

  }

  pug() {
    return require("./space-aids.pug").default
  }
})
