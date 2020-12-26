import Icon from "../../icon";
import declareComponent from "../../../../../lib/declareComponent";




export default class TerminalIcon extends Icon {


  pug() {
    return require("./terminal.pug").default
  }
}

declareComponent("terminal-icon", TerminalIcon)
