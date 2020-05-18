import Card from "../card"
import declareComponent from "../../../../lib/declareComponent"




export default class IconCard extends Card {
  constructor() {
    super()      
  }

  stl() {
    return super.stl() + require("./iconCard.css").toString()
  }
  pug() {
    return require("./iconCard.pug").default
  }
  
}


declareComponent("icon-card", IconCard)

