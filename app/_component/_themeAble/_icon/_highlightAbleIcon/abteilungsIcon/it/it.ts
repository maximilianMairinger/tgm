import Icon from "../../highlightAbleIcon";
import declareComponent from "../../../../../../lib/declareComponent";




export default declareComponent("it-icon", class CpuIcon extends Icon {
  constructor() {
    super()

  }

  pug() {
    return require("./it.pug").default
  }
})
