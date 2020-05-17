import Icon from "../icon";
import declareComponent from "../../../../lib/declareComponent";




export default declareComponent("tgm-logo", class TgmLogo extends Icon {
  constructor() {
    super()

  }

  stl() {
    return super.stl() + require("./tgmLogo.css").toString()
  }
  pug() {
    return require("./tgmLogo.pug").default
  }
})
