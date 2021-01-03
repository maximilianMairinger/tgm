import Icon from "../../icon";
import declareComponent from "../../../../../lib/declareComponent";




export default class CloudDataBaseIcon extends Icon {


  pug() {
    return require("./cloudDataBase.pug").default
  }
}

declareComponent("cloud-data-base-icon", CloudDataBaseIcon)
