import Icon from "../icon";
import declareComponent from "../../../../lib/declareComponent";




export default declareComponent("satellite-icon", class satellitetIcon extends Icon {
  constructor() {
    super()

  }

  pug() {
    return require("./satellite.pug").default
  }
})
