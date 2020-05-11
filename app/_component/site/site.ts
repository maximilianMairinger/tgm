import Component from "../component"
import declareComponent from "./../../lib/declareComponent"
import PageManager from "../_frame/_manager/pageManager/pageManager";

export default declareComponent("site", class extends Component {
  
  constructor() { 
    super();
    this.apd(new PageManager())
  }

  

  stl() {
    return require("./site.css").toString()
  }
  pug() {
    return require("./site.pug").default
  }
})
