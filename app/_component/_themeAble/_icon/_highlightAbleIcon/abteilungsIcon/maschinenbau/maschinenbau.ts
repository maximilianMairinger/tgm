import HighlightAbleIcon from "../../highlightAbleIcon";
import declareComponent from "../../../../../../lib/declareComponent";




export default declareComponent("maschinenbau-icon", class MaschinenbauIcon extends HighlightAbleIcon {
  constructor() {
    super()

  }


  pug() {
    return require("./maschinenbau.pug").default
  }
})
