import HighlightAbleIcon from "../../highlightAbleIcon";
import declareComponent from "../../../../../../lib/declareComponent";




export default declareComponent("highlights-icon", class HighlightsIcon extends HighlightAbleIcon {
  constructor() {
    super()

  }

  pug() {
    return require("./highlights.pug").default
  }
})
