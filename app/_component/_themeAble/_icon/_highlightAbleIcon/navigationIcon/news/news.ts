import HighlightAbleIcon from "../../highlightAbleIcon";
import declareComponent from "../../../../../../lib/declareComponent";




export default declareComponent("news-icon", class NewsIcon extends HighlightAbleIcon {
  constructor() {
    super()

  }

  pug() {
    return require("./news.pug").default
  }
})
