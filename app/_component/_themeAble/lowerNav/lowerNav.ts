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
  public enable(init: boolean, func: "css" | "anim" = init ? "css" : "anim") {
    console.log("en")
    this.enableToken = Symbol()
    this.backgrounds.show()
    this.backgrounds[func as any]({opacity: 1})
  }
  public disable(init: boolean, func: "css" | "anim" = init ? "css" : "anim") {
    let token = this.enableToken = Symbol()
    let r = this.backgrounds[func as any]({opacity: 0})
    if (!init) r.then(() => {if (token === this.enableToken) this.backgrounds.hide()})
  }

  public theme(): Theme
  public theme(to: Theme): void
  public theme(to?: Theme): any {
    this.currentLinkElems.Inner("theme", [to])
    return super.theme(to)
  }
  

  stl() {
    return require("./lowerNav.css").toString()
  }
  pug() {
    return require("./lowerNav.pug").default
  }
})

// const totalUnderlineOverflow = 5
