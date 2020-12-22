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
import "../../../_themeAble/_icon/pruefung/pruefung"


type ErwachsenenCardOption = {icon: string, title: string, content: string, link: string, heading: string, info:string, extraIcon:string, extraTitle:string, extraContent:string}
const SELECTED_CLASS: string = "selected" ;
export default declareComponent("erwachsenen-card", class ErwachsenenCard extends Card {

    private textblob = this.q("c-textblob") as Textblob;
    private _options: ErwachsenenCardOption[];

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

    private clickHandler(){
        if(this[1].hasClass(SELECTED_CLASS)){
            window.location.href = this[2].link ? this[2].link : "/";
        }else{
            this[0].selected.removeClass(SELECTED_CLASS)
            this[0].selected = this[1]
            this[0].selected.addClass(SELECTED_CLASS)
            this[0].overview(this[2])
        }
    }

    private selected:Element;
    selection():ErwachsenenCardOption[]
    selection(options:ErwachsenenCardOption[]| JSON):void
    selection(options?:ErwachsenenCardOption[] | JSON){
        if(options){
            this._options = this.parseJSONProp(options) as ErwachsenenCardOption[];
            let container = this.q("selection-container");
            for (let conf of this._options) {
                let box = ce("selection-box");
                let content = ce("selection-content");
                let icon = ce("icon-container");
                /*
                (async () => {
                    icon.append(new (await iconIndex.fach[conf.icon]() as any).default)
                })()
                 */
                let infocontainer = ce("info-container");
                let textcontainer = ce("text-container");
                let button = new Button();
                button.click(this.clickHandler.bind([this, box, conf]))

                if(this._options.first == conf) {
                    this.selected = box;
                    this.selected.addClass(SELECTED_CLASS)
                    this.overview(conf)
                }

                //add Components
                textcontainer.append(ce("heading-text").text(conf.title));
                textcontainer.append(ce("content-text").text(conf.content));
                infocontainer.append(textcontainer);
                content.append(icon);
                content.append(infocontainer);
                box.append(ce("selection-background"));
                box.append(content);
                box.append(button);
                container.append(box);
            }
        }else return this._options
    }

    private overviewHeading=this.q("overview-heading");
    private overviewInfo=this.q("overview-box > overview-content");
    private overviewIcon=this.q("overview-img-box");
    private overviewTitle=this.q("overview-title");
    private overviewContent=this.q("overview-content-box overview-content");
    private overviewLink=this.q("overview-box c-link") as Link;

    overview(options:ErwachsenenCardOption){
        this.overviewHeading.text(options.heading);
        this.overviewInfo.text(options.info);
        //todo
        //this.overviewIcon.removeChilds();
        //this.overviewIcon.apd(ce(options.extraIcon));
        this.overviewTitle.text(options.extraTitle);
        this.overviewContent.text(options.extraContent);
        this.overviewLink.link(options.link);
        this.overviewLink.text("Mehr erfahren")
    }

    stl(){
        return super.stl() + require('./erwachsenenCard.css').toString();
    }

    pug(){
        return require('./erwachsenenCard.pug').default;
    }
})
