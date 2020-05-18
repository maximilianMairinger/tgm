
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

    subheading(): string
    subheading(to: string): void
    subheading(to?: string) {
      if (to) this.q("subheading").text(to)
      else return this.q("subheading").text()
    }

    cardtitle(): string
    cardtitle(to: string):void
    cardtitle(to?: string) {
        if(to) this.q("card-title").text(to)
        else return this.q("card-title").text()
    }

    skewcardcolor(): string
    skewcardcolor(to: string): void
    skewcardcolor(to?: string) {
        if(to)this.q("skew-card").setAttribute("style","background-color: "+ to);
        else return this.q("skew-card").getAttribute("style");
    }

    image():string
    image(to: string): void
    image(to?: string) {
        if(to) this.q("img-container").setAttribute("style","background-image: url('" + to + "')");
        else return this.q("img-container").getAttribute("style");
    }

    texttitle(): string
    texttitle(to: string):void
    texttitle(to?: string) {
        if(to)this.q("text-title").text(to)
        else return this.q("text-title").text()
    }

    textcontent():string
    textcontent(to: string):void
    textcontent(to?: string) {
        if(to)this.q("text-content").text(to)
        else return this.q("text-content").text();
    }

    textmore():string
    textmore(to: string):void
    textmore(to?: string) {
        if(to)this.q("text-more").text(to)
        else return this.q("text-more").text()
    }
 
    stl() {
      return super.stl() + require("./newscard.css").toString()
    }
    pug() {
      return super.pug() + require("./newscard.pug").default
    }
  }
)
