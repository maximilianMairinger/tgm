import Component from "../component"

export default abstract class Card extends Component {
    constructor() {
      super()      
    }

    setLightTheme() {

    }

    setDarkTheme() {

    }

    stl() {
      return require("./card.css").toString()
    }
    pug() {
      return require("./card.pug").default
    }
  
  }

