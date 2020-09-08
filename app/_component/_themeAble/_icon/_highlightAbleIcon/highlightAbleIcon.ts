import Icon from "../icon";


const highlightStrengthPrefix = "highlight-"
const hightlightClassString = "highlight"

export default abstract class HighlightAbleIcon extends Icon {
  constructor(highlightStrength: "strong" | "weak" | null = "weak") {
    super()
    if (highlightStrength !== null) {
      this.addClass(highlightStrengthPrefix + highlightStrength)
    }
  }
  public highlight() {
    return this.addClass(hightlightClassString)
    
  }
  public downlight() {
    return this.removeClass(hightlightClassString)
  }

  stl() {
    return super.stl() + require("./highlightAbleIcon.css").toString()
  }
}
