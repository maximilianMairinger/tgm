import declareComponent from "../../../../lib/declareComponent";
import Card from "../card";
import "../../link/link"
import Link from "../../link/link"
import {Theme} from "../../themeAble";
import Textblob from "../../_text/textblob/textblob";
import "../../../_themeAble/_button/button"
import Button from "../../_button/button"
import "../../../_themeAble/_icon/_highlightAbleIcon/abteilungsIcon/wirtschaftsingenieure/wirtschaftsingenieure"
import "../../../_themeAble/_icon/cpu/cpu"
import "../../../_themeAble/_icon/tie/tie"
import "../../../_themeAble/_icon/tools/tools"
import "../../../_themeAble/_icon/windmill/windmill"
import "../../../_themeAble/_icon/rocket/rocket"
import "../../../_themeAble/_icon/satellite/satellite"
import "../../../_themeAble/_icon/rover/rover"
import "../../../_themeAble/_icon/space-aids/space-aids"
import { iconIndex } from "../../_icon/icon";
import "../../_text/textblob/textblob"


type SelectionOptions = {icon: string, title: string, content: string, link: string}[]
export default declareComponent("selection-card", class SelectionCard extends Card {

    private textblob = this.q("c-textblob") as Textblob;
    private _options: SelectionOptions;
    private stundentafelLink = this.q("c-link") as Link;

    constructor() {
        super(false, false)
    }

    theme():Theme
    theme(to:Theme):this
    theme(to?:Theme):any{
        this.textblob.theme(to);
        return super.theme(to);
    }

    heading():string
    heading(heading:string):void
    heading(heading?:string):any{
        return this.textblob.heading(heading);
    }

    note():string
    note(note:string):void
    note(note?:string):any{
        if(note){
            this.q('note-text').text(note);
        }else {
            return this.q('note-text').text();
        }
    }

    selection():SelectionOptions
    selection(options:SelectionOptions | JSON):void
    selection(options?:SelectionOptions | JSON){
        if(options){
            this._options = this.parseJSONProp(options);
            let container = this.q("selection-container");
            for (let conf of this._options) {
                let box = ce("selection-box");
                let content = ce("selection-content");
                let icon = ce("icon-container");
                (async () => {
                    icon.append(new (await iconIndex.fach[conf.icon]() as any).default)
                })()
                let infocontainer = ce("info-container");
                let link = ce("link-container");
                link.append(new Link("Mehr", conf.link));
                let textcontainer = ce("text-container");
                textcontainer.append(ce("heading-text").text(conf.title));
                textcontainer.append(ce("content-text").text(conf.content));
                infocontainer.append(link);
                infocontainer.append(textcontainer);
                content.append(icon);
                content.append(infocontainer);
                let button = new Button();
                button.link(conf.link);
                box.append(ce("selection-background"));
                box.append(content);
                box.append(button);
                container.append(box);
            }
        }else return this._options
    }

    //quick-fix
    background():string
    background(has:string):void
    background(has?:string){
        console.log("test");
        if(has == 'none') {
            console.log("no background");
            this.q("image-container").css({'display': 'none'});
            this.q("content-box").css({'maxWidth':'100%'});
        }else return this.q("image-container").css('display');
    }

    stundentafel(link?:string){
        if(link) {
            this.stundentafelLink.css({"display":"block"})
            this.stundentafelLink.link(link)
        } else return this.stundentafelLink.link();
    }

    stl(){
        return super.stl() + require('./selectionCard.css').toString();
    }

    pug(){
        return require('./selectionCard.pug').default;
    }
})
