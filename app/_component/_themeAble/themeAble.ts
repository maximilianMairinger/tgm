import Component from "../component";

export default abstract class ThemeAble<T extends false | HTMLElement = false | HTMLElement> extends Component<T> {
  private themeStyleElement: HTMLStyleElement = ce("style")

  constructor(componentBodyExtension?: HTMLElement | false, theme?: Theme | null) {
    super(componentBodyExtension as any)

    if (theme === undefined) theme = "light"
    if (theme) this.setTheme(theme)
    
    
    

    this.themeStyleElement.html(themeIndex[this._theme])
    if (!(this.elementBody instanceof ShadowRoot)) this.shadowRoot.insertBefore(this.themeStyleElement, this.elementBody)
    else this.shadowRoot.append(this.themeStyleElement)
  }

  private _theme: Theme

  private setTheme(to: Theme) {
    if (this._theme !== to) {
      if (this.currentlyActiveTheme) this.themeStyleElement.html(themeIndex[to])
      this._theme = to
    }
    return this
  }
  
  theme(): Theme
  theme(to: Theme): this
  theme(to?: Theme): any {
    if (to) {
      return this.setTheme(to)
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
  protected currentlyActiveTheme: boolean = true

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
