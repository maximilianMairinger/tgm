import Icon from "../icon";
import declareComponent from "../../../../lib/declareComponent";




export default declareComponent("title-deco-icon", class TitleDecoIcon extends Icon {
  constructor() {
    super()

  }

  pug() {
    return require("./titleDeco.pug").default
  }
})
