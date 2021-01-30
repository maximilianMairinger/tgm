import Icon from "../../icon";
import declareComponent from "../../../../../lib/declareComponent";




export default class CertificateIcon extends Icon {


  pug() {
    return require("./certificate.pug").default
  }
}

declareComponent("certificate-icon", CertificateIcon)
