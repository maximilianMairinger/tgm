import Icon from "../icon";


const hightlightClassString = "highlight"

export default abstract class HighlightAbleIcon extends Icon {
  public highlight() {
    this.addClass(hightlightClassString)
  }

  public downlight() {
    this.removeClass(hightlightClassString)
  }

  stl() {
    return super.stl() + require("./highlightAbleIcon.css").toString()
  }
}
