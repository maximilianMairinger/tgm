import Component from "../component"
import "./../_button/button"
import declareComponent from "./../../lib/declareComponent"

export default declareComponent("site", class extends Component {
  
  constructor() {
    super();
  }

  test123() {

  }

  stl() {
    return require("./site.css").toString()
  }
  pug() {
    return require("./site.pug").default
  }
})
