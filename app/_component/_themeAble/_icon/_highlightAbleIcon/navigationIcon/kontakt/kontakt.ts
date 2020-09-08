import HighlightAbleIcon from "../../highlightAbleIcon";
import declareComponent from "../../../../../../lib/declareComponent";




export default declareComponent("kontakt-icon", class KontaktIcon extends HighlightAbleIcon {
  constructor() {
    super()

  }

  pug() {
    return require("./kontakt.pug").default
  }
})
