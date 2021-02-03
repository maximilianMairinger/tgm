import Icon from "../../icon";
import declareComponent from "../../../../../lib/declareComponent";




export default class SuperCertificateIcon extends Icon {


  pug() {
    return require("./superCertificate.pug").default
  }
}

declareComponent("super-certificate-icon", SuperCertificateIcon)
