import declareComponent from "../../../../lib/declareComponent";
import Card from "../card";
import "../../link/link"
import {Theme} from "../../themeAble";
import Icon, { iconIndex } from "../../_icon/icon";
import Link from "../../link/link"

export default declareComponent("vertiefungs-card", class VertiefungsCard extends Card {
    private headingElem = this.q("vertiefungs-title")
    private contentElem = this.q("vertiefungs-text")
    private iconContainer = this.q("vertiefungs-img")
    private linkElem = this.q("c-link") as Link;

    constructor(heading?: string, content?: string, icon?: string | (() => any) | Icon, link?: string){
        super(false, false);
        this.heading(heading)
        this.content(content)
        this.icon(icon)
        this.link(link)
    }

    theme():Theme
    theme(to:Theme):this
    theme(to?:Theme):any{
        return super.theme(to);
    }

    async icon(to?: string | (() => any) | Icon) {
        if (to) {
            let _Icon: any
            if (to instanceof Icon) _Icon = to
            else {
                let f: any
                if (to instanceof Function) f = to
                else f = iconIndex.vertiefung[to]
                _Icon = new (await f()).default
            }
            this.iconContainer.emptyNodes()
            this.iconContainer.apd(_Icon)
        }
        
    }

    content(to?: string) {
        return this.contentElem.html(to)
    }

    heading(to?: string) {
        return this.headingElem.html(to)
    }

    link(link?: string){
        return this.linkElem.link(link)
    }


    stl(){
        return super.stl() + require('./vertiefungsCard.css').toString();
    }

    pug(){
        return require('./vertiefungsCard.pug').default;
    }
})
