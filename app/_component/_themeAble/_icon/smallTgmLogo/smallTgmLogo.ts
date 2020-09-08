import Icon from "../icon";
import declareComponent from "../../../../lib/declareComponent";




export default declareComponent("tgm-logo", class SmallTgmLogo extends Icon {
  constructor() {
    super()

  }

  pug() {
    return require("./smallTgmLogo.pug").default
  }
})
