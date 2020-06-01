import Component from "../component"
import declareComponent from "./../../lib/declareComponent"
import PageManager from "../_frame/_manager/pageManager/pageManager";
import Header from "./../_themeAble/header/header"


const topLimit = 0

export default declareComponent("site", class extends Component {
  
  constructor() { 
    super()
    let header = new Header()

    let lastScrollProg = 0

    let pageManager = new PageManager((page, sections, domainLevel) => {
      header.updatePage(sections, domainLevel)
    }, (section) => {
      header.updateSelectedLink(section)
    }, (scrollBarWidth) => {
      header.css({width: `calc(100% - ${scrollBarWidth}px)`})
    }, (prog) => {
      if (lastScrollProg > topLimit) {
        if (prog <= topLimit) {
          header.onTop()
        }
      }
      else if (prog > topLimit) {
        header.notTop()
      }

      lastScrollProg = prog
    })
    
    pageManager.loadedCallback()
    this.apd(pageManager)
    pageManager.activate()


    
    this.apd(header)
  }

  

  stl() {
    return require("./site.css").toString()
  }
  pug() {
    return require("./site.pug").default
  }
})
