import Icon from "../../icon";
import declareComponent from "../../../../../lib/declareComponent";




export default class NfcChipIcon extends Icon {


  pug() {
    return require("./nfcChip.pug").default
  }
}

declareComponent("nfc-chip-icon", NfcChipIcon)
