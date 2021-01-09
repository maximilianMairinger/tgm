import Icon from "../icon";
import declareComponent from "../../../../lib/declareComponent";




export default class MailIcon extends Icon {
  constructor() {
    super()

  }

  pug() {
    return require("./mail.pug").default
  }
}

declareComponent("mail-icon", MailIcon)
