import ThemeAble from "../themeAble"

export default abstract class Card extends ThemeAble {

  constructor(enableCardHoverEffect = true, componentBodyExtention?: HTMLElement | false) {
    super(componentBodyExtention)
    if (enableCardHoverEffect) this.elementBody.addClass("card-hover-effect-enabled")
  }

  stl() {
    return require("./card.css").toString()
  }
  
}

