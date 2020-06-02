import ThemAble, { Theme } from "../themeAble"
import declareComponent from "../../../lib/declareComponent"
import { ElementList } from "extended-dom"



export default declareComponent("lower-nav", class LowerNav extends ThemAble {
  private currentLinkElems: ElementList<ThemAble>

  constructor() { 
    super()
    
    
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
