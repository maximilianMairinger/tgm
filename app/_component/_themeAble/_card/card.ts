import ThemeAble from "../themeAble"

export default abstract class Card extends ThemeAble {

  constructor(elementBodyExtention?: HTMLElement | false) {
    super(elementBodyExtention);
  }

  stl() {
    return require("./card.css").toString()
  }
  
}

