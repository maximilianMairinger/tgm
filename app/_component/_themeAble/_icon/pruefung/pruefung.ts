import Icon from "../icon";
import declareComponent from "../../../../lib/declareComponent";




export default declareComponent("pruefung-icon", class CpuIcon extends Icon {
  constructor() {
    super()
  }

  pug() {
    return require("./pruefung.pug").default
  }
})
