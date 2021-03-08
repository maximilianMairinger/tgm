import Icon from "../../icon";
import declareComponent from "../../../../../lib/declareComponent";




export default class AddUserIcon extends Icon {


  pug() {
    return require("./addUser.pug").default
  }
}

declareComponent("add-user-icon", AddUserIcon)
