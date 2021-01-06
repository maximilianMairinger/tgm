import HighlightAbleIcon from "../../highlightAbleIcon";
import declareComponent from "../../../../../../lib/declareComponent";




export default declareComponent("erwachsenenschule-icon", class ErwachsenenschuleIcon extends HighlightAbleIcon {
  constructor() {
    super()

  }

  pug() {
    return require("./erwachsenenschule.pug").default
  }
})
