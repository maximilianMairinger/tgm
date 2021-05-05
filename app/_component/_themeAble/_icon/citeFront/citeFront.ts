import Icon from "../icon";
import declareComponent from "../../../../lib/declareComponent";




export default declareComponent("cite-front-icon", class CiteFrontIcon extends Icon {
  constructor() {
    super()

  }

  pug() {
    return require("./citeFront.pug").default
  }
})
