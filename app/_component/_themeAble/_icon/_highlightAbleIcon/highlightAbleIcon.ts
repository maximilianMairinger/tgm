import Icon from "../icon";


const hightlightClassString = "highlight"

export default abstract class HighlightAbleIcon extends Icon {
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
