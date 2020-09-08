import Icon from "../icon";
import declareComponent from "../../../../lib/declareComponent";




export default declareComponent("cpu-icon", class CpuIcon extends Icon {
  constructor() {
    super()

  }

  pug() {
    return require("./cpu.pug").default
  }
})
