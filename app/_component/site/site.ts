import Component from "../component"
import declareComponent from "./../../lib/declareComponent"
import PageManager from "../_frame/_manager/pageManager/pageManager";
import Header from "./../_themeAble/header/header"
import LowerNav from "./../_themeAble/lowerNav/lowerNav"
import { ElementList } from "extended-dom";


const topLimit = 0
const scrollTrendActivationCount = 10

export default declareComponent("site", class extends Component {
  
  constructor() { 
    super()


    let lowerNav = new LowerNav()
    let currentlyShowingLowerNav: boolean


    let header = new Header(async (hide, init, func) => {
      if (hide) {
        
        currentlyShowingLowerNav = false

        await lowerNav.disable(init, func)

      }
      else {
        currentlyShowingLowerNav = true

        lowerNav.updatePage(currentSectons, currentDomainLevel)
        await lowerNav.enable(init, func)
        if (currentSection !== undefined) lowerNav.updateSelectedLink(currentSection)

      }
      
    })

    let navs = new ElementList<Element>(header, lowerNav)
    

    let lastScrollProg = 0

    let currentDomainLevel = 0
    let currentSectons: string[]
    let currentSection: string

    let scrollTrendUpCounter = 0
    let scrollTrendDownCounter = 0

    let pageManager = new PageManager((page, sections, domainLevel) => {
      currentDomainLevel = domainLevel
      currentSectons = sections
      if (currentlyShowingLowerNav) lowerNav.updatePage(sections, domainLevel)
      header.updatePage(sections, domainLevel)
    }, (section) => {
      currentSection = section
      if (currentlyShowingLowerNav) lowerNav.updateSelectedLink(section)
      header.updateSelectedLink(section)
    }, (scrollBarWidth) => {
      navs.css({width: `calc(100% - ${scrollBarWidth}px)`})
    }, (prog) => {
      if (lastScrollProg > topLimit) {
        if (prog <= topLimit) {
          header.onTop()
        }
      }
      else if (prog > topLimit) {
        header.notTop()
      }

      if (currentlyShowingLowerNav) {
        if (prog > lastScrollProg) {
        
          scrollTrendUpCounter = 0
          scrollTrendDownCounter++
          if (scrollTrendDownCounter >= scrollTrendActivationCount) {
            lowerNav.minimize()
          }
        }
        else {
          scrollTrendDownCounter = 0
          scrollTrendUpCounter++
          if (scrollTrendUpCounter >= scrollTrendActivationCount) {
            lowerNav.maximize()
          }
        }
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
