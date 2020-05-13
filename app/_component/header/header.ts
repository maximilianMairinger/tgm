import Component from "../component"
import declareComponent from "./../../lib/declareComponent"


export default declareComponent("site", class Header extends Component {
  
  constructor() { 
    super()
    
  }

  

  stl() {
    return require("./header.css").toString()
  }
  pug() {
    return require("./header.pug").default
  }
})
