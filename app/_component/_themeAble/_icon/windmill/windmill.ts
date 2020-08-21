import Icon from "../icon";
import declareComponent from "../../../../lib/declareComponent";

export default declareComponent("windmill-icon", class WindmillIcon extends Icon {
  constructor() {
    super()

  }

  pug() {
    return require("./windmill.pug").default
  }
})
