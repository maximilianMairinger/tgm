import ThemAble, { Theme } from "../themeAble"
import declareComponent from "../../../lib/declareComponent"
import { ElementList } from "extended-dom"



export default declareComponent("lower-nav", class LowerNav extends ThemAble {
  private currentLinkElems: ElementList<ThemAble>
  private backgroundContainer = this.q("background-container")
  private backgrounds = this.backgroundContainer.childs()
  private linkConteiner = this.q("link-container")

  constructor() { 
    super()

  }
  

  private enableToken: Symbol
  public async enable(init: boolean, func: "css" | "anim" = init ? "css" : "anim") {
    this.enableToken = Symbol()
    this.backgrounds.show()
    await this.backgrounds[func as any]({opacity: 1})
  }
  public async disable(init: boolean, func: "css" | "anim" = init ? "css" : "anim") {
    let token = this.enableToken = Symbol()
    let r = this.backgrounds[func as any]({opacity: 0})
    if (!init) await r.then(() => {if (token === this.enableToken) this.backgrounds.hide()})
  }



  public async updatePage(linkContents: string[], domainLevel: number) {
    console.log(linkContents, domainLevel)
    this.currentLinkElems = new ElementList()
    linkContents.ea((e) => {

    })

    this.linkConteiner.apd(this.currentLinkElems)
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
