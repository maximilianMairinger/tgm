import HighlightAbleIcon from "../../highlightAbleIcon";
import declareComponent from "../../../../../../lib/declareComponent";




export default declareComponent("team-icon", class TeamIcon extends HighlightAbleIcon {
  constructor() {
    super()

  }

  pug() {
    return require("./team.pug").default
  }
})
