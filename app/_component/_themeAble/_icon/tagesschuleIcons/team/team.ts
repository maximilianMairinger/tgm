import Icon from "../../icon";
import declareComponent from "../../../../../lib/declareComponent";




export default declareComponent("team-icon", class TeamIcon extends Icon {
  constructor() {
    super()

  }

  pug() {
    return require("./team.pug").default
  }
})
