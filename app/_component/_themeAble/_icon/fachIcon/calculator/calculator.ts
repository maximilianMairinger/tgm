import Icon from "../../icon";
import declareComponent from "../../../../../lib/declareComponent";




export default class CalculatorIcon extends Icon {


  pug() {
    return require("./calculator.pug").default
  }
}

declareComponent("calculator-icon", CalculatorIcon)
