import HighlightAbleIcon from "../../highlightAbleIcon";
import declareComponent from "../../../../../../lib/declareComponent";




export default declareComponent("kunststofftechnik-icon", class KunststofftechnikIcon extends HighlightAbleIcon {
  constructor() {
    super()

  }


  pug() {
    return require("./kunststofftechnik.pug").default
  }
})
