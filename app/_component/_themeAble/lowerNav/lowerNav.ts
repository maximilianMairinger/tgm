import ThemeAble, { Theme } from "../themeAble"
import declareComponent from "../../../lib/declareComponent"
import { ElementList } from "extended-dom"
import LowerNavLink from "./../lowerNavLink/lowerNavLink"
import delay from "delay"


export default declareComponent("lower-nav", class LowerNav extends ThemeAble {
  private currentLinkWrapperElems: ElementList
  private currentLinkElems: ElementList<LowerNavLink>
  private backgroundContainer = this.q("background-container")
  private linkContainer = this.q("link-container")
  private layers = this.backgroundContainer.childs(1, true).add(this.linkContainer) as any
  private slidy: Element

  constructor(public linkPressedCb?: Function) { 
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


  public linkContents: string[]
  public async updatePage(linkContents: string[], domainLevel?: number) {
    this.linkContents = linkContents
    this.currentLinkWrapperElems = new ElementList()
    this.currentLinkElems = new ElementList()
    linkContents.ea((e, i) => {
      let link = new LowerNavLink(e as any, domainLevel)
      link.addActivationCallback(() => {
        if (this.linkPressedCb) this.linkPressedCb()
        this.maximize()
      })
      this.currentLinkElems.add(link)
      this.currentLinkWrapperElems.add(ce("link-container").apd(link))
    })

    this.currentLinkWrapperElems.first.prepend(this.slidy = ce("active-slidy"))

    this.linkContainer.html(this.currentLinkWrapperElems)
  }

  private lastHighlightElem: LowerNavLink
  private initialUpdate = true
  public async updateSelectedLink(activeLink: string) {
    let index = this.linkContents.indexOf(activeLink)
    let x = 100 * index
    if (this.lastHighlightElem) this.lastHighlightElem.downlight()
    this.lastHighlightElem = this.currentLinkElems[index]
    this.lastHighlightElem.highlight()

    if (this.initialUpdate) {
      this.slidy.css({translateX: x + "%", display: "block"})
      this.slidy.anim({opacity: 1})
      this.initialUpdate = false
    }
    else this.slidy.anim({translateX: x + "%"}, 600)
    

    
  }

  private minimized = false
  public minimize() {
    if (!this.minimized) {
      this.minimized = true
      this.layers.anim({translateY: 22})
    }
  }

  
  public maximize() {
    if (this.minimized) {
      this.minimized = false
      this.layers.anim({translateY: .1})
    }
  }

  stl() {
    return require("./lowerNav.css").toString()
  }
  pug() {
    return require("./lowerNav.pug").default
  }
})
