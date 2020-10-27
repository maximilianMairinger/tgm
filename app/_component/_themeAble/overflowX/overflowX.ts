import ThemeAble, { Theme } from "../themeAble"
import declareComponent from "../../../lib/declareComponent"
import "../../_themeAble/_button/button"
import {ElementList} from "extended-dom";
import Button from "../../_themeAble/_button/button";
import "../_icon/arrow/arrow"


class OverflowX extends ThemeAble {

    private lastScrollLeft = 0;
    private nextArrow = this.q("next-button");
    private nextButton = this.q("next-button c-button") as Button;
    private nextAvailable = false;
    private previousArrow = this.q("previous-button");
    private previousButton = this.q("previous-button c-button") as Button;
    private previousAvailable = false;
    private updating:boolean;
    private overflowContainer = this.q("overflow-x-container");
    private static readonly SCROLL_PERCENT= 0.33;

    private next() {
        this.overflowContainer.scrollLeft += this.overflowContainer.width() * OverflowX.SCROLL_PERCENT;
        this.lastScrollLeft = this.overflowContainer.scrollLeft;
        this.update(true)
    }

    private previous(){
        this.overflowContainer.scrollLeft -= this.overflowContainer.width() * OverflowX.SCROLL_PERCENT;
        this.lastScrollLeft = this.overflowContainer.scrollLeft
        this.update(false)
    }

    private scrollUpdate() {
        let scrollLeft = this.lastScrollLeft;
        this.lastScrollLeft = this.overflowContainer.scrollLeft;
        if (this.lastScrollLeft > scrollLeft)
            this.update(true);
        else if (this.lastScrollLeft < scrollLeft)
            this.update(false);
    }

    private update(shift = null){
        if(shift != null)
            if(shift){
                // @ts-ignore
                if(!this.previousAvailable) {
                    this.previousArrow.css({"display": "flex"});
                    this.previousAvailable = true;
                }
                this.nextAvailable = this.overflowContainer.scrollLeft < this.overflowContainer.scrollWidth - this.overflowContainer.width();
                if(!this.nextAvailable)
                    this.nextArrow.css({"display":"none"});

            }else {
                // @ts-ignore
                if(!this.nextAvailable) {
                    this.nextArrow.css({"display": "flex"});
                    this.nextAvailable = true
                }
                this.previousAvailable = this.overflowContainer.scrollLeft > 0;
                if(!this.previousAvailable)
                    this.previousArrow.css({"display":"none"});

            }
        else {
            this.nextAvailable = true;
            this.lastScrollLeft = this.overflowContainer.scrollLeft;
            this.nextArrow.css({"display":"flex"});
            this.previousArrow.css({"display":"none"});
        }
        this.updating=false;
    }

    constructor(public onChange?: (activate: boolean) => void) {
        super(false)
        let children = []
        this.childNodes.forEach(child => {
            children.add(child)
        })
        this.removeChilds();
        children.forEach(child => this.overflowContainer.appendChild(child))
        this.nextButton.click(this.next.bind(this));
        this.previousButton.click(this.previous.bind(this));
        this.overflowContainer.addEventListener("scroll", this.scrollUpdate.bind(this))
        if(this.overflowContainer.scrollWidth == this.overflowContainer.width()) {
            this.update();
        }
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
        this.elementBody.append(...nodes);
    }

    stl() {
        return super.stl() + require("./overflowX.css").toString()
    }
    pug() {
        return require("./overflowX.pug").default
    }
}

export default declareComponent("overflow-x", OverflowX);