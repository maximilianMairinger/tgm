import Icon from "../icon";
import declareComponent from "../../../../lib/declareComponent";




export default declareComponent("tie-icon", class TieIcon extends Icon {
  constructor() {
    super()

  }

  pug() {
    return require("./tie.pug").default
  }
})
