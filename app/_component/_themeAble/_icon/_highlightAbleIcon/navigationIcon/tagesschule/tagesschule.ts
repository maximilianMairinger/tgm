import HighlightAbleIcon from "../../highlightAbleIcon";
import declareComponent from "../../../../../../lib/declareComponent";




export default declareComponent("tagesschule-icon", class TagesschuleIcon extends HighlightAbleIcon {
  constructor() {
    super()

  }

  pug() {
    return require("./tagesschule.pug").default
  }
})
