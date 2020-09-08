import HighlightAbleIcon from "../../highlightAbleIcon";
import declareComponent from "../../../../../../lib/declareComponent";




export default declareComponent("elektronik-icon", class Elektronik extends HighlightAbleIcon {
  constructor() {
    super()

  }

  pug() {
    return require("./elektronik.pug").default
  }
})
