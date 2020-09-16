import HighlightAbleIcon from "../../highlightAbleIcon";
import declareComponent from "../../../../../../lib/declareComponent";




export default declareComponent("tagesschule-anmelden-icon", class TagesschuleAnmaeldenIcon extends HighlightAbleIcon {
  constructor() {
    super()

  }

  pug() {
    return require("./anmelden.pug").default
  }
})
