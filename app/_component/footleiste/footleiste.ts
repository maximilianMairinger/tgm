import Component from "../component"
import declareComponent from "./../../lib/declareComponent"


export default declareComponent("footleiste", class extends Component {

    constructor() {
        super()
    }

    stl() {
        return require("./footleiste.css").toString()
      }

    pug() {
        return require("./footleiste.pug").default
    }

})