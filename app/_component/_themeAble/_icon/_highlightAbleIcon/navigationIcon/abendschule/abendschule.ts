import HighlightAbleIcon from "../../highlightAbleIcon";
import declareComponent from "../../../../../../lib/declareComponent";




export default declareComponent("abendschule-icon", class AbendschuleIcon extends HighlightAbleIcon {
  constructor() {
    super()

  }

  pug() {
    return require("./abendschule.pug").default
  }
})
