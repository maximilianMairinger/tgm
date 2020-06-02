import ThemAble, { Theme } from "../themeAble"
import declareComponent from "../../../lib/declareComponent"
import { ElementList } from "extended-dom"



export default declareComponent("lower-nav", class LowerNav extends ThemAble {
  private currentLinkElems: ElementList<ThemAble>
  private backgroundContainer = this.q("background-container")
  private backgrounds = this.backgroundContainer.childs()

  constructor() { 
    super()
    
    console.log(this.backgrounds)
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

  public theme(): Theme
  public theme(to: Theme): void
  public theme(to?: Theme): any {
    this.currentLinkElems.Inner("theme", [to])
    return super.theme(to)
  }


  public async updatePage(linkContents: string[], domainLevel: number) {

  }

  public async updateSelectedLink(activeLink: string) {

  }
  

  stl() {
    return require("./lowerNav.css").toString()
  }
  pug() {
    return require("./lowerNav.pug").default
  }
})

// const totalUnderlineOverflow = 5
