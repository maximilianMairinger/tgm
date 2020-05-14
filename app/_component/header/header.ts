import Component from "../component"
import declareComponent from "./../../lib/declareComponent"
import "./../_themeAble/_icon/tgmLogo/tgmLogo"
import "./../_button/button"


export default declareComponent("header", class Header extends Component {
  
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
