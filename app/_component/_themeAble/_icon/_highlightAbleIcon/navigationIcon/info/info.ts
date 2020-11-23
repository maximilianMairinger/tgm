import HighlightAbleIcon from "../../highlightAbleIcon";
import declareComponent from "../../../../../../lib/declareComponent";




export default declareComponent("info-icon", class InfoIcon extends HighlightAbleIcon {
  constructor() {
    super()

  }

  pug() {
    return require("./info.pug").default
  }
})
