import Icon from "../icon";
import declareComponent from "../../../../lib/declareComponent";




export default declareComponent("cite-back-icon", class citeBackIcon extends Icon {
  constructor() {
    super()

  }

  pug() {
    return require("./citeBack.pug").default
  }
})
