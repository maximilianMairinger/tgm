import Icon from "../icon";
import declareComponent from "../../../../lib/declareComponent";




export default declareComponent("cite-icon", class citeIcon extends Icon {
  constructor() {
    super()

  }

  pug() {
    return require("./cite.pug").default
  }
})
