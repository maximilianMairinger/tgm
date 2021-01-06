import Icon from "../../icon";
import declareComponent from "../../../../../lib/declareComponent";




export default declareComponent("sprechstunden-icon", class SprechstundenIcon extends Icon {
  constructor() {
    super()

  }

  pug() {
    return require("./sprechstunden.pug").default
  }
})
