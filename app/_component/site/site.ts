import Component from "../component"
import declareComponent from "./../../lib/declareComponent"
import PageManager from "../_frame/_manager/pageManager/pageManager";
import Header from "./../header/header"

export default declareComponent("site", class extends Component {
  
  constructor() { 
    super()
    let pageManager = new PageManager((page, sections) => {
      console.log("page", page, sections)
    }, (section) => {
      console.log("section", section)
    })
    this.apd(pageManager)
    pageManager.activate()
    // let header = new Header()
    // header
  }

  

  stl() {
    return require("./site.css").toString()
  }
  pug() {
    return require("./site.pug").default
  }
})
