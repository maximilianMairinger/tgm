import Icon from "../icon";
import declareComponent from "../../../../lib/declareComponent";




export default class CalendarIcon extends Icon {
  constructor() {
    super()

  }

  pug() {
    return require("./calendar.pug").default
  }
}

declareComponent("calendar-icon", CalendarIcon)
