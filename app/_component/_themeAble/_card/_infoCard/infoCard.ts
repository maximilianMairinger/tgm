import declareComponent from "../../../../lib/declareComponent";
import Card from "../card";
import Link from "../../link/link"
import {Theme} from "../../themeAble";
import Textblob from "../../_text/textblob/textblob";
import "../../../_themeAble/_icon/zertificateMan/zertificateMan"
import FastAverageColor from 'fast-average-color';
import Image from "../../../image/image"
import "../../../image/image"


export default abstract class InfoCard extends Card {

    protected textblob = this.q("c-textblob") as Textblob;
    private _link = this.q("c-link") as Link;
    private customColor = false;

    constructor(){
        super(false, false);
        var ua = navigator.userAgent.toLowerCase();
        if (ua.indexOf('safari') != -1) {
            if (ua.indexOf('chrome') > -1) {
                // Chrome
            } else {
                this.q("c-image").css({height: "100%", top:"2px"})
            }
        }

    }

    theme():Theme
    theme(to:Theme):this
    theme(to?:Theme):any{
        this.textblob.theme(to);
        this._link.theme(to)
        return super.theme(to);
    }

    heading():string
    heading(heading:string):void
    heading(heading?:string):any {
        return this.textblob.heading(heading);
    }

    note():string
    note(note:string):void
    note(note?:string){
        if(note !== undefined)
            this.q("note-text").text(note)
        else return this.q("note-text").text()
    }

    private img = this.q("c-image") as Image
    thumbnail(url:string):void
    thumbnail(url:string){
        if (url === null) url = "blog_default"
        this.img.src(url)
        if (!this.customColor) {
            
            let averageColor = new FastAverageColor();
            this.img.src().then((src) => {
                averageColor.getColorAsync(src).then(color => {
                    let rgba = "rgba(".concat(color.value[0].toString(), ",", color.value[1].toString(), ",", color.value[2].toString(), ", 0.5)");
                    this.headingbackground(rgba, false);
                });
            })
        }
    }

    headingbackground():string
    headingbackground(color:string, custom?:boolean):void
    headingbackground(color?:string, custom:boolean=true){
        if(color !== undefined) {
            this.q("heading-background").css({'background': color});
            this.customColor = custom;
        }
        else return this.q("heading-background").css('background');
    }

    contenttitle():string
    contenttitle(title:string):void
    contenttitle(title?:string){
        if(title !== undefined)
            this.q("content-title").text(title);
        else return this.q("content-title").text();
    }

    content():string
    content(content:string):void
    content(content?:string){
        if(content !== undefined)
            this.q("content-text").text(content)
        else return this.q("content-text").text();
    }

    href():string
    href(href:string):void
    href(href?:string):any{
        return this._link.link(href);
    }

    /**
     * InfoCard#href(href: string) alias
     * @param href Url
     */
    link():string
    link(href:string):void
    link(href?:string):any{
        return this.href(href);
    }

    stl(){
        return super.stl() + require('./infoCard.css').toString();
    }

    pug(){
        return require('./infoCard.pug').default;
    }
}

declareComponent("info-card", InfoCard)
