import HighlightAbleIcon from "../../highlightAbleIcon";
import declareComponent from "../../../../../../lib/declareComponent";




export default declareComponent("elektrotechnik-icon", class Elektrotechnik extends HighlightAbleIcon {
  constructor() {
    super()

  }


  pug() {
    return require("./elektrotechnik.pug").default
  }
})
