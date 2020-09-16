import Component from "../component";

export default abstract class ThemeAble extends Component<false | HTMLElement> {
  private themeStyleElement = ce("style")
  constructor(componentBodyExtension?: HTMLElement | false) {
    super(componentBodyExtension)

    this.themeStyleElement.html(themeIndex[this._theme])
    if (!(this.elementBody instanceof ShadowRoot)) this.shadowRoot.insertBefore(this.themeStyleElement, this.elementBody)
    else this.shadowRoot.append(this.themeStyleElement)
  }

  private _theme: Theme = "light"
  
  theme(): Theme
  theme(to: Theme): this
  theme(to?: Theme): any {
    if (to) {
      if (this._theme !== to) {
        if (this.currentlyActiveTheme) this.themeStyleElement.html(themeIndex[to])
        this._theme = to
      }
      return this
    }
    else return this._theme
  }

  public passiveTheme() {
    if (this.currentlyActiveTheme) {
      this.currentlyActiveTheme = false
      this.themeStyleElement.html("")
    }
    return this
  }
  protected currentlyActiveTheme = true

  public activeTheme() {
    if (!this.currentlyActiveTheme) {
      this.currentlyActiveTheme = true
      this.themeStyleElement.html(themeIndex[this._theme])
    }
    return this
  }

  stl() {
    return require("./themeAble.css").toString()
  }

}

export type Theme = keyof typeof themeIndex

const themeIndex = {
  light: require("./light-theme.css"),
  dark: require("./dark-theme.css"),
  blue: require("./blue-theme.css"),
}


export function negateTheme(theme: Theme): Theme {
  return (
    theme === "dark" ?  "light" : 
    theme === "light" ? "dark" :
    theme === "blue" ? "light" :
    "light"
  )
    
}
