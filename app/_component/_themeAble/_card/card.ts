import ThemeAble from "../themeAble"

export default abstract class Card extends ThemeAble {

  constructor(enableCardHoverEffect = true, componentBodyExtention?: HTMLElement | false) {
    super(componentBodyExtention)
    if (componentBodyExtention !== undefined) this.addClass("no-body")
    if (enableCardHoverEffect) this.addClass("card-hover-effect-enabled")
  }

  stl() {
    return require("./card.css").toString()
  }
  
}

