import Component from "../component"
import declareComponent from "./../../lib/declareComponent"
import PageManager from "../_frame/_manager/pageManager/pageManager";
import Header from "./../header/header"

export default declareComponent("site", class extends Component {
  
  constructor() { 
    super()
    let pageManager = new PageManager((page, sections, domainLevel) => {
      console.log("page", page, sections, domainLevel)
      header.updateLinks(sections, domainLevel)
    }, (section) => {
      header.updateSelectedLink(section)
    })
    pageManager.loadedCallback()
    this.apd(pageManager)
    pageManager.activate()
    let header = new Header()
    this.apd(header)
  }

  

  stl() {
    return require("./site.css").toString()
  }
  pug() {
    return require("./site.pug").default
  }
})
