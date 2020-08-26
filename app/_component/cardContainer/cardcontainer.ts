import Component from "../component";
import declareComponent from "./../../lib/declareComponent"
import Nc from "../_themeAble/_card/newscard/newscard"
import { json } from "body-parser";


export default declareComponent("cardcontainer", class extends Component {

    constructor() {
        super()

        for(let x = 0; x < 15; x++) {
            let c = new Nc();
            c.subheading("Datum.Datum")
            c.cardtitle("HalliHalloBobo")
            c.skewcardcolor("cyan")
            c.image("https://lh3.googleusercontent.com/proxy/wavua_gHnon84QvVMta_yvxKgMhsylr3OT97UZN4zpVSzU7sNAuypkz8KgFaxRub-C_ZmB_bUviVgUYrpJ9yJGJQ-MZEvkZldk6Yi17Poyniymw-4sM")
            c.texttitle("Üüüberschrift")
            c.textcontent("s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop pub")
            c.textmore("Mehr erfahren")
            this.q("right-panel").appendChild(c)
        }
        let ph = ce("placeholder")
        this.q("right-panel").appendChild(ph)
    }

    stl() {
        return require("./cardcontainer.css").toString()
      }

    pug() {
        return require("./cardcontainer.pug").default
    }

})