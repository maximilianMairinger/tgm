import Component from "../component"
import declareComponent from "./../../lib/declareComponent"
import "./../_themeAble/_icon/tgmLogo/tgmLogo"
import "./../_button/button"
import Link from "./../_themeAble/link/link"
import { ElementList } from "extended-dom"
import { lang } from "./../../lib/lang/lang"

console.log(lang.links.tagesschule.get(console.log))


export default declareComponent("header", class Header extends Component {
  private pathDisplayElem = this.q("path-display")
  private linkContainerElem = this.q("right-content")

  constructor() { 
    super()
    
    
  }

  private currentLinkContents: string[]
  private currentLinkElems: ElementList<Link>
  public updateLinks(linkContents: string[], domainLevel: number) {
    this.currentLinkContents = linkContents.clone()
    this.linkContainerElem.removeChilds()
    this.currentLinkElems = new ElementList()
    linkContents.ea((s) => {
      this.currentLinkElems.add(new Link(lang.links[s], s, domainLevel))
    })
    this.linkContainerElem.apd(...this.currentLinkElems)
  }

  public updateSelectedLink(newSelected: string) {
    
  }

  

  stl() {
    return require("./header.css").toString()
  }
  pug() {
    return require("./header.pug").default
  }
})
