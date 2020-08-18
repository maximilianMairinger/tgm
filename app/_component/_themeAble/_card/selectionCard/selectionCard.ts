import declareComponent from "../../../../lib/declareComponent";
import Card from "../card";
import "../../link/link"
import Link from "../../link/link"
import {Theme} from "../../themeAble";
import Textblob from "../../_text/textblob/textblob";
import "../../../_button/button"
import Button from "../../../_button/button"
import "../../../_themeAble/_icon/tie/tie"
import "../../../_themeAble/_icon/cpu/cpu"
import "../../../_themeAble/_icon/tools/tools"
import "../../../_themeAble/_icon/windmill/windmill"

type SelectionOptions = {icon: string, title: string, content: string, link: string}[]
export default declareComponent("selection-card", class SelectionCard extends Card {

    private textblob = this.q("c-textblob") as Textblob;
    private _options:SelectionOptions;

    constructor(){
        super(false);
    }

    theme():Theme
    theme(to:Theme):void
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
            for(let i = 0; i < this._options.length; i++){
                let box = ce("selection-box");
                let content = ce("selection-content");
                let icon = ce("icon-container");
                icon.append(ce("c-" + this._options[i].icon +"-icon"));
                let infocontainer = ce("info-container");
                let link = ce("link-container");
                link.append(new Link("Mehr", this._options[i].link));
                let textcontainer = ce("text-container");
                textcontainer.append(ce("heading-text").text(this._options[i].title));
                textcontainer.append(ce("content-text").text(this._options[i].content));
                infocontainer.append(link);
                infocontainer.append(textcontainer);
                content.append(icon);
                content.append(infocontainer);
                let button = new Button();
                button.link(this._options[i].link);
                box.append(ce("selection-background"));
                box.append(content);
                box.append(button);
                container.append(box);
            }
        }else return this._options
    }

    stl(){
        return super.stl() + require('./selectionCard.css').toString();
    }

    pug(){
        return require('./selectionCard.pug').default;
    }
})
