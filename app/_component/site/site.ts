import Component from "../component"
import declareComponent from "./../../lib/declareComponent"
import PageManager from "../_frame/_manager/pageManager/pageManager";

export default declareComponent("site", class extends Component {
  
  constructor() { 
    super();
    let pageManager = new PageManager()
    this.apd(pageManager)
    pageManager.activate()
  }

  

  stl() {
    return require("./site.css").toString()
  }
  pug() {
    return require("./site.pug").default
  }
})
