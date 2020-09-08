import HighlightAbleIcon from "../../highlightAbleIcon";
import declareComponent from "../../../../../../lib/declareComponent";




export default declareComponent("wirtschaftsingenieure-icon", class WirtschaftsingenieureIcon extends HighlightAbleIcon {
  constructor() {
    super()

  }

  pug() {
    return require("./wirtschaftsingenieure.pug").default
  }
})
