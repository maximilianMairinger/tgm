import Icon from "../../icon";
import declareComponent from "../../../../../lib/declareComponent";




export default class ProsthesisIcon extends Icon {
pug() {
    return require("./prosthesis.pug").default
  }
}

declareComponent("prosthesis-icon", ProsthesisIcon)
