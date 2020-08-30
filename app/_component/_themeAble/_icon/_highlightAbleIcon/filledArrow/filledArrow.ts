import HighlightableIcon from "../highlightAbleIcon";
import declareComponent from "../../../../../lib/declareComponent";




export default declareComponent("filled-arrow-icon", class FilledArrowIcon extends HighlightableIcon {
  constructor() {
    super()

  }

  pug() {
    return require("./filledArrow.pug").default
  }
  stl() {
    return super.stl() + require("./filledArrow.css").toString()
  }
})
