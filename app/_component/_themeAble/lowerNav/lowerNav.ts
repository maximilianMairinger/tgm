import ThemAble, { Theme } from "../themeAble"
import declareComponent from "../../../lib/declareComponent"
import { ElementList } from "extended-dom"
import LowerNavLink from "./../lowerNavLink/lowerNavLink"


export default declareComponent("lower-nav", class LowerNav extends ThemAble {
  private currentLinkElems: ElementList<ThemAble>
  private backgroundContainer = this.q("background-container")
  private linkContainer = this.q("link-container")
  private layers = this.backgroundContainer.childs(1, true).add(this.linkContainer) as any

  constructor() { 
    super()

  }
  

  private enableToken: Symbol
  public async enable(init: boolean, func: "css" | "anim" = init ? "css" : "anim") {
    this.enableToken = Symbol()
    this.layers.show()
    this.linkContainer.css({display: "flex"})
    await this.layers[func]({opacity: 1})
  }
  public async disable(init: boolean, func: "css" | "anim" = init ? "css" : "anim") {
    let token = this.enableToken = Symbol()
    let r = this.layers[func]({opacity: 0})
    if (!init) await r.then(() => {if (token === this.enableToken) this.layers.hide()})
  }



  public async updatePage(linkContents: string[], domainLevel: number) {
    console.log(linkContents, domainLevel)
    this.currentLinkElems = new ElementList()
    linkContents.ea((e) => {
      this.currentLinkElems.add(new LowerNavLink(e as any))
    })

    this.linkContainer.html(this.currentLinkElems)
  }

  public async updateSelectedLink(activeLink: string) {
    console.log(activeLink)
  }
  

  stl() {
    return require("./lowerNav.css").toString()
  }
  pug() {
    return require("./lowerNav.pug").default
  }
})
