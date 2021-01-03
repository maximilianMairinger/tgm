import Icon from "../../icon";
import declareComponent from "../../../../../lib/declareComponent";




export default class FilterIcon extends Icon {


  pug() {
    return require("./filter.pug").default
  }
}

declareComponent("filter-icon", FilterIcon)
