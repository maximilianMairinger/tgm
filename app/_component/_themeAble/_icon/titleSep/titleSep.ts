import Icon from "../icon";
import declareComponent from "../../../../lib/declareComponent";




export default declareComponent("title-sep-icon", class TitleSepIcon extends Icon {
  constructor() {
    super()

  }

  pug() {
    return require("./titleSep.pug").default
  }


  stl() {
    return super.stl() + require("./titleSep.css").toString()
  }
})
