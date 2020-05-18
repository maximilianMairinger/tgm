import ThemeAble from "../themeAble"

export default abstract class Card extends ThemeAble {
    constructor() {
      super()      
    }

    stl() {
      return require("./card.css").toString()
    }
  
  }

