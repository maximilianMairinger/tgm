import HighlightAbleIcon from "../../highlightAbleIcon";
import declareComponent from "../../../../../../lib/declareComponent";




export default declareComponent("sprechstunden-icon", class SprechstundenIcon extends HighlightAbleIcon {
  constructor() {
    super()

  }

  pug() {
    return require("./sprechstunden.pug").default
  }
})
