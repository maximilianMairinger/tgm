import Component from "../component";

export type Theme = "dark" | "light"

export default abstract class ThemeAble extends Component<false | HTMLElement> {
  private themeStyleElement = ce("style")
  constructor(elementBodyExtention?: HTMLElement | false) {
    super(elementBodyExtention)

    this.themeStyleElement.html(themeIndex[this._theme])
    this.apd(this.themeStyleElement)
  }

  private _theme: Theme = "light"
  
  theme(): Theme
  theme(to: Theme): void
  theme(to?: Theme): any {
    if (to) {
      if (this._theme !== to) {
        this.themeStyleElement.html(themeIndex[to])
        this._theme = to
      }
    }
    else return this._theme
  }

  stl() {
    return require("./themeAble.css").toString()
  }

}

const themeIndex: {[theme in Theme]: string} = {
  light: require("./light-theme.css").toString(),
  dark: require("./dark-theme.css").toString()
}


export function negateTheme(theme: Theme): Theme {
  return (
    theme === "dark" ?  "light" : 
    theme === "light" ? "dark" :
    "light"
  )
    
}
