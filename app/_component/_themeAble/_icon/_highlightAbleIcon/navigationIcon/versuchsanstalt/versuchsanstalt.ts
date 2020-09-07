import HighlightAbleIcon from "../../highlightAbleIcon";
import declareComponent from "../../../../../../lib/declareComponent";




export default declareComponent("versuchsanstalt-icon", class VersuchsanstaltIcon extends HighlightAbleIcon {
  constructor() {
    super()

  }

  pug() {
    return require("./versuchsanstalt.pug").default
  }
})
