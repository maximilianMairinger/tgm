import Component from "../component"
import declareComponent from "./../../lib/declareComponent"
import PageManager from "../_frame/_manager/pageManager/pageManager";
import Header from "./../_themeAble/header/header"
import LowerNav from "./../_themeAble/lowerNav/lowerNav"


const topLimit = 0

export default declareComponent("site", class extends Component {
  
  constructor() { 
    super()


    let lowerNav = new LowerNav()
    let currentlyShowingLowerNav: boolean
    let header = new Header((hide, init, func) => {
      
      if (hide) {
        currentlyShowingLowerNav = false
        lowerNav[func]({opacity: 0, translateY: 10})
      }
      else {
        currentlyShowingLowerNav = true
        lowerNav[func]({opacity: 1, translateY: .1})
      }
      
    })
    

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


    
    this.apd(header, lowerNav)
  }

  

  stl() {
    return require("./site.css").toString()
  }
  pug() {
    return require("./site.pug").default
  }
})
