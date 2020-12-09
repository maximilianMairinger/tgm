import declareComponent from "../../../../lib/declareComponent";
import Card from "../card";
import "../../link/link"
import {Theme} from "../../themeAble";
import { iconIndex } from "../../_icon/icon";

export default declareComponent("vertiefungs-card", class VertiefungsCard extends Card {
    private headingElem = this.q("vertiefungs-title")
    private contentElem = this.q("vertiefungs-text")
    private iconContainer = this.q("vertiefungs-img")
    constructor(heading: string, content: string, icon: string){
        super(false, false);
        this.heading(heading)
        this.content(content)
        this.icon(icon)
    }

    theme():Theme
    theme(to:Theme):this
    theme(to?:Theme):any{
        return super.theme(to);
    }

    async icon(to?: string) {
        if (to) {
            let ic = new (await iconIndex.vertiefung[to]()).default
            this.iconContainer.emptyNodes()
            this.iconContainer.apd(ic)
        }
        
    }

    content(to?: string) {
        return this.contentElem.html(to)
    }

    heading(to?: string) {
        return this.headingElem.html(to)
    }


    stl(){
        return super.stl() + require('./vertiefungsCard.css').toString();
    }

    pug(){
        return require('./vertiefungsCard.pug').default;
    }
})
