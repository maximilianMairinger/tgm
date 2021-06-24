import declareComponent from "../../../../lib/declareComponent";
import Card from "../card";
import "../../link/link"
import Link from "../../link/link"
import {Theme} from "../../themeAble";
import Textblob from "../../_text/textblob/textblob";
import "../../../_themeAble/_button/button"
import Button from "../../_button/button"
// import "../../../_themeAble/_icon/_highlightAbleIcon/abteilungsIcon/wirtschaftsingenieure/wirtschaftsingenieure"
// import "../../../_themeAble/_icon/cpu/cpu"
// import "../../../_themeAble/_icon/tie/tie"
// import "../../../_themeAble/_icon/tools/tools"
// import "../../../_themeAble/_icon/windmill/windmill"
// import "../../../_themeAble/_icon/rocket/rocket"
// import "../../../_themeAble/_icon/satellite/satellite"
// import "../../../_themeAble/_icon/rover/rover"
// import "../../../_themeAble/_icon/space-aids/space-aids"
import "../../../_themeAble/_icon/arrow/arrow"
import { iconIndex } from "../../_icon/icon";
import "../../_text/textblob/textblob"
import animateScrollTo from "animated-scroll-to";
import WaapiEasing from "waapi-easing";

const scrollAnimationSpeed = 1150
const easing = new WaapiEasing("ease").function

type SelectionOptions = {icon: string, title: string, content: string, link: string}[]
export default declareComponent("selection-card", class SelectionCard extends Card {

    private textblob = this.q("c-textblob") as Textblob;
    private _options: SelectionOptions;
    private stundentafelLink = this.q("c-link") as Link;
    private leftArrow = this.q("c-arrow-icon.left") as HTMLElement
    private rightArrow = this.q("c-arrow-icon.right") as HTMLElement
    private container = this.q("selection-container");

    constructor() {
        super(false, false)


        const go = (dir: number) => {
            animateScrollTo([this.container.width() * dir, null], {
                cancelOnUserAction: true,
                speed: scrollAnimationSpeed,
                elementToScroll: this.container,
                easing
            })
        }

        const constrArrow = (arrowElem: HTMLElement, dir: number) => {
            arrowElem.tabIndex = 0
            
            arrowElem.on("click", () => {go(dir)})
            arrowElem.on("keydown", (e) => {
                if (e.key === "Enter" || e.key === " ") go(dir)
            })

            arrowElem.on("keydown", (e) => {
                console.log(e.key)
                if (e.key === "ArrowLeft") go(-1)
                else if (e.key === "ArrowRight") go(1)
            })
        }

        constrArrow(this.leftArrow, -1)
        constrArrow(this.rightArrow, 1)


        let leftHas = true
        this.leftArrow.addClass("disabled")
        let rightHas = false
        this.container.on("scroll", () => {
            if (this.container.scrollLeft <= 5) {
                this.leftArrow.addClass("disabled")
                this.leftArrow.blur()
                leftHas = true
                if (rightHas) {
                    this.rightArrow.removeClass("disabled")
                    rightHas = false
                }
            }
            else if (this.container.scrollLeft + this.container.width() >= this.container.scrollWidth - 5) {
                this.rightArrow.addClass("disabled")
                this.rightArrow.blur()
                rightHas = true
                if (leftHas) {
                    this.leftArrow.removeClass("disabled")
                    leftHas = false
                }
            }
            else {
                if (leftHas) {
                    this.leftArrow.removeClass("disabled")
                    leftHas = false
                }
                if (rightHas) {
                    this.rightArrow.removeClass("disabled")
                    rightHas = false
                }
            }
        })

        
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
            let container = this.container
            for (let i = 0; i < this._options.length; i++) {
                let blockEndPointer = i + 4
                if (blockEndPointer > this._options.length) blockEndPointer = this._options.length
                let contentFace = ce("selection-face");
                container.apd(contentFace)
                for (; i < blockEndPointer; i++) {
                    const conf = this._options[i]
                    let box = ce("selection-box");
                    contentFace.apd(box)
                    let content = ce("selection-content");
                    let icon = ce("icon-container");
                    (async () => {
                        icon.append(new (await iconIndex.fach[conf.icon]() as any).default)
                    })()
                    let infocontainer = ce("info-container");
                    
                    if (conf.link) {
                        let link = ce("link-container");
                        link.append(new Link("Mehr", conf.link));
                        infocontainer.append(link);
                    }
                    
                    let textcontainer = ce("text-container");
                    textcontainer.append(ce("heading-text").text(conf.title));
                    textcontainer.append(ce("content-text").text(conf.content));
                    infocontainer.append(textcontainer);
                    content.append(icon);
                    content.append(infocontainer);
                    let button = new Button();
                    button.link(conf.link);
                    box.append(ce("selection-background"));
                    box.append(content);
                    box.append(button);
                }
                i--
            }
            if (container.children.length > 1) {
                this.leftArrow.show()
                this.rightArrow.show()
            }
            else {
                this.leftArrow.hide()
                this.rightArrow.hide()
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
