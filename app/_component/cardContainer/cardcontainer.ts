import Component from "../component";
import declareComponent from "./../../lib/declareComponent"
import { json } from "body-parser";


export default declareComponent("cardcontainer", class extends Component {

    constructor() {
        super()
    }

    elements(): string
    elements(to: string): void
    elements(to?: string) {
        if(to) {
            let j = JSON.parse(to);
            log(j)
        }
        return "";
    }

    stl() {
        return require("./cardcontainer.css").toString()
      }

    pug() {
        return require("./cardcontainer.pug").default
    }

})