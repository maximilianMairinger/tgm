
import Card from "./../card";
import declareComponent from "../../../lib/declareComponent";

export default declareComponent("newscard", class extends Card {
    constructor() {
      super()      
    }

    setLightTheme() {
        super.setLightTheme()
        //..
    }

    setDarkTheme() {
        super.setDarkTheme();
    }

    setDate(to: string) {this.q("date").innerHTML = to}
    setCardTitle(to: string) {this.q("card-title").innerHTML = to}
    setSkewCardColor(hex: string) {this.q("skew-card").setAttribute("background-color",hex)}
    setImage(url: string) {this.q("img-container").setAttribute("background-image", "url("+url+")")}
    setTextTitle(to: string) {this.q("text-title").innerHTML = to};
    setTextContent(to: string) {this.q("text-content").innerHTML = to}
    setTextMore(to: string, click: Function) {
        this.q("text-more").innerHTML = to;
        this.q("text-more").on("click",click())
    }

    stl() {
      return super.stl() + require("./newscard.css").toString()
    }
    pug() {
      return super.pug() + require("./newscard.pug").default
    }
  }
)
