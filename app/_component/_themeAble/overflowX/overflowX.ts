import ThemeAble, {Theme} from "../themeAble"
import declareComponent from "../../../lib/declareComponent"
import "../../_themeAble/_button/button"
import Button from "../../_themeAble/_button/button";
import "../_icon/arrow/arrow"
import {Easing} from "waapi-easing";

export default class OverflowX extends ThemeAble {

    private lastScrollLeft = 0;
    private nextArrow = this.q("next-button");
    private nextButton: Button;
    private nextAvailable = false;
    private previousArrow = this.q("previous-button");
    private previousButton: Button;
    private previousAvailable = false;
    private updating: boolean;
    private overflowContainer = this.q("overflow-x-container");
    private scrollPercent = 0.66;

    private next(){
        let scrollZwi = this.overflowContainer.scrollWidth > this.overflowContainer.scrollLeft + this.overflowContainer.width() + (this.overflowContainer.width() * this.scrollPercent) ?
            this.overflowContainer.width() * this.scrollPercent :
            this.overflowContainer.scrollWidth - (this.overflowContainer.scrollLeft + this.overflowContainer.width());
        let scrollTo = this.overflowContainer.scrollLeft + scrollZwi;
        //@ts-ignore
        this.overflowContainer.scroll({x: scrollTo}, {easing: new Easing("easeOut").function, speed: {begin: scrollZwi * 1.5}})
    }

    private previous() {
        let scrollZwi = this.overflowContainer.scrollLeft > this.overflowContainer.width() ?
            this.overflowContainer.width() * this.scrollPercent :
            this.overflowContainer.scrollLeft;
        let scrollTo = this.overflowContainer.scrollLeft - scrollZwi;
        //@ts-ignore
        this.overflowContainer.scroll({x: scrollTo}, {easing: new Easing("easeOut").function, speed: {begin: scrollZwi * 1.5}})
    }

    private scrollUpdate() {
        let scrollLeft = this.lastScrollLeft;
        this.lastScrollLeft = this.overflowContainer.scrollLeft;
        if (this.lastScrollLeft > scrollLeft)
            this.update(true);
        else if (this.lastScrollLeft < scrollLeft)
            this.update(false);
    }

    private update(shift = null) {
        if (shift != null)
            if (shift) {
                if (!this.previousAvailable) {
                    this.previousArrow.css({"display": "flex", "opacity": 0});
                    this.previousArrow.anim({opacity: 1}, 500)
                    this.previousAvailable = true;
                }
                this.nextAvailable = this.overflowContainer.scrollLeft < this.overflowContainer.scrollWidth - this.overflowContainer.width() - 10;
                if (!this.nextAvailable) {
                    this.nextArrow.css({"opacity": 1});
                    this.nextArrow.anim({opacity:0}, 500).then(() => this.nextArriw.css({"display":"none"}));
                }

            } else {
                if (!this.nextAvailable) {
                    this.nextArrow.css({"display": "flex", "opacity": 0});
                    this.nextArrow.anim({opacity: 1}, 500)
                    this.nextAvailable = true
                }
                this.previousAvailable = this.overflowContainer.scrollLeft > 0;
                if (!this.previousAvailable) {
                    this.previousArrow.css({"opacity": 1});
                    this.previousArrow.anim({opacity:0}, 500).then(() => this.previousArrow.css({"display":"none"}));
                }

            }
        else {
            this.nextAvailable = true;
            if (this.overflowContainer.width() < this.overflowContainer.scrollWidth)
                this.nextArrow.css({"display": "flex"});
        }
        this.updating = false;
    }

    constructor(next?: Button, previous?: Button) {
        super(false)
        let children = []
        this.childNodes.forEach(child => {
            children.add(child)
        })
        this.removeChilds();
        this.overflowContainer.apd(children);
        if (!next)
            this.nextButton = this.q("next-button c-button") as Button;
        else this.nextButton = next
        this.nextButton.click(this.next.bind(this));

        if (!previous)
            this.previousButton = this.q("previous-button c-button") as Button;
        else this.previousButton = previous;
        this.previousButton.click(this.previous.bind(this));

        this.overflowContainer.addEventListener("scroll", this.scrollUpdate.bind(this))
        let pid = setInterval(() => {
            if (this.overflowContainer.scrollWidth != undefined) {
                this.update();
                clearInterval(pid);
            }
        }, 32);
    }



    setNextButton(button: Button, container?:Element) {
        button.click(this.next.bind(this));
        this.nextArrow.css({"display": "none"})
        this.nextButton.disable();
        this.nextButton = button;
        if(container)
            this.nextArrow = container
        else
            this.nextArrow = button as Element;
        this.update(true)
    }

    setPreviousButton(button: Button, container?:Element) {
        button.click(this.previous.bind(this));
        this.previousArrow.css({"display": "none"})
        this.previousButton.disable();
        this.previousButton = button;
        if(container)
            this.previousArrow = container
        else
            this.previousArrow = button as Element;
        this.update(false)
    }

    private hasGradient = false;
    gradient(gradient:boolean | string, percent=15, fancy = false){
        if(gradient) {
            this.hasGradient = true;
            let actualPercent = (percent / ((100 + (percent * 2)) / 100) );
            //let maskimageHard = "linear-gradient(to right, transparent, transparent "+ transformedPercent +"%, rgba(0,0,0,1) "+ transformedPercent +"%, rgba(0,0,0,1) "+ (100-transformedPercent) +"%,transparent " + (100-transformedPercent) +"%)";
            let maskimageSoft = "linear-gradient(to right, transparent, rgba(0,0,0,1) "+ actualPercent +"%, rgba(0,0,0,1) "+ (100-actualPercent) +"%,transparent)";
            this.q("next-button").css({"borderRadius": "8px", "right": "calc(" + actualPercent + "% - 25px)"});
            this.q("previous-button").css({"borderRadius": "8px", "left": "calc(" + actualPercent + "% - 25px)"});
            if(gradient == "fancy" || fancy) {
                this.q("navigation-container").css({"opacity": 1})
                let windowLeft= ce("window-viewer");
                let windowRight= ce("window-viewer");
                windowLeft.css({"width": actualPercent + "%","left" :"0"})
                windowRight.css({"width": actualPercent + "%","right":"0"})
                this.apd(windowLeft);
                this.apd(windowRight);
                this.overflowContainer.css({"maskImage": maskimageSoft});
                //@ts-ignore
                this.overflowContainer.css({"WebkitMaskImage": maskimageSoft});
                this.addEventListener("mouseout", () => {
                    windowLeft.css({"opacity": 1})
                    windowRight.css({"opacity": 1})
                });
                this.addEventListener("mouseover", () => {
                    windowLeft.css({"opacity": 0})
                    windowRight.css({"opacity": 0})
                });
                let filler = ce("filler-element");
                filler.css({"flex": "0 0 calc(" + actualPercent + "% + 15px)", "order": "42069"});
                //@ts-ignore
                this.overflowContainer.prepend(filler)
                filler = ce("filler-element");
                filler.css({"flex": "0 0 calc(" + actualPercent + "% - var(--spacing) + 1px)"});
                //@ts-ignore
                this.overflowContainer.prepend(filler)
            }else{
                this.overflowContainer.css({"maskImage": maskimageSoft});
                let filler = ce("filler-element");
                filler.css({"display": "block", "flex": "0 0 calc(" + actualPercent + "%)", "alignSelf": "stretch", "order": "42069"});
                //@ts-ignore
                this.overflowContainer.prepend(filler)
                filler = ce("filler-element");
                filler.css({"display": "block", "flex": "0 0 calc(" + actualPercent + "% - var(--spacing))", "alignSelf": "stretch"});
                //@ts-ignore
                this.overflowContainer.prepend(filler)
            }
        }else
            return this.hasGradient;
    }

    theme(): Theme
    theme(to: Theme): this
    theme(to?: Theme): any {
        return super.theme(to)
    }

    appendChild<T extends Node>(newChild: T): T {
        return this.overflowContainer.appendChild(newChild);
    }

    append(...nodes) {
        this.overflowContainer.append(...nodes);
    }

    prepend(...nodes) {
        if(this.hasGradient)
            //@ts-ignore
            nodes.reverse().forEach(node => this.overflowContainer.insertAfter(node, this.q("filler-elemen:nth-child(2)") as Node));
        else
            this.overflowContainer.prepend(...nodes)
    }


    stl() {
        return super.stl() + require("./overflowX.css").toString()
    }

    pug() {
        return require("./overflowX.pug").default
    }
}

declareComponent("overflow-x", OverflowX);