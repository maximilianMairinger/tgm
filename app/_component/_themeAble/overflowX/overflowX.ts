import ThemeAble, { Theme } from "../themeAble"
import declareComponent from "../../../lib/declareComponent"
import "../../_themeAble/_button/button"
import {ElementList} from "extended-dom";
import Button from "../../_themeAble/_button/button";
import "../_icon/arrow/arrow"


export default class OverflowX extends ThemeAble {

    private lastScrollLeft = 0;
    private nextArrow = this.q("next-button");
    private nextButton:Button;
    private nextAvailable = false;
    private previousArrow = this.q("previous-button");
    private previousButton:Button;
    private previousAvailable = false;
    private updating:boolean;
    private overflowContainer = this.q("overflow-x-container");
    private static readonly SCROLL_PERCENT= 0.66;

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
                    this.previousArrow.css({"display":"none"})

            }
        else {
            this.nextAvailable = true;
            if(this.overflowContainer.width() < this.overflowContainer.scrollWidth)
                this.nextArrow.css({"display":"flex"});
        }
        this.updating=false;
    }

    constructor(next:Button=null, previous:Button=null) {
        super(false)
        let children = []
        this.childNodes.forEach(child => {
            children.add(child)
        })
        this.removeChilds();
        children.forEach(child => this.overflowContainer.appendChild(child))
        if(!next)
            this.nextButton = this.q("next-button c-button") as Button;
       else this.nextButton = next
        this.nextButton.click(this.next.bind(this));

        if (!previous)
            this.previousButton = this.q("previous-button c-button") as Button;
        else this.previousButton = previous;
        this.previousButton.click(this.previous.bind(this));

        this.overflowContainer.addEventListener("scroll", this.scrollUpdate.bind(this))
        let pid = setInterval(() => {
            if(this.overflowContainer.scrollWidth != undefined) {
                this.update();
                clearInterval(pid);
            }
        }, 32);
    }

    setNextButton(button:Button){
        button.click(this.next.bind(this));
        this.nextArrow.css({"display":"none"})
        this.nextButton.disable();
        this.nextButton = button;
        this.nextArrow = button;
        this.update(true)
    }

    setPreviousButton(button:Button){
        button.click(this.previous.bind(this));
        this.previousArrow.css({"display":"none"})
        this.previousButton.disable();
        this.previousButton = button;
        this.previousArrow = button;
        this.update(false)
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

declareComponent("overflow-x", OverflowX);