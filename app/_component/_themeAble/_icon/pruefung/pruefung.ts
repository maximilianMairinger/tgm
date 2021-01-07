import Icon from "../icon";
import declareComponent from "../../../../lib/declareComponent";




export default class PruefungIcon extends Icon {

  private certificatElm= this.q("svg text");

  constructor() {
    super()
  }

  certificat(certificat:string){
    let lines:string[] = certificat.split("\n")
    let innerHTML:string[] = [];
    for(let i = 0; i < lines.length; i++) {
      let line = '<tspan x="0" y="'+ (i * 17) +'">'+ lines[i] +'</tspan>';
      innerHTML.push(line);
    }
    this.certificatElm.innerHTML= innerHTML.join("");
  }

  pug() {
    return require("./pruefung.pug").default
  }
}
declareComponent("pruefung-icon", PruefungIcon)
