import Icon from "../../icon";
import declareComponent from "../../../../../lib/declareComponent";




export default declareComponent("bio-med-icon", class BioMedIcon extends Icon {
  constructor() {
    super()

  }

  stl() {
    return super.stl() + require("./bioMed.css").toString()
  }

  pug() {
    return require("./bioMed.pug").default
  }
})
