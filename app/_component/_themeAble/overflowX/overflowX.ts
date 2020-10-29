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
    private static readonly SCROLL_PERCENT = 0.66;

    private next(){
        let scrollZwi = this.overflowContainer.scrollWidth > this.overflowContainer.scrollLeft + this.overflowContainer.width() + (this.overflowContainer.width() * OverflowX.SCROLL_PERCENT) ?
            this.overflowContainer.width() * OverflowX.SCROLL_PERCENT :
            this.overflowContainer.scrollWidth - (this.overflowContainer.scrollLeft + this.overflowContainer.width());
        let scrollTo = this.overflowContainer.scrollLeft + scrollZwi;
        //@ts-ignore
        this.overflowContainer.scroll({x: scrollTo}, {easing: new Easing("easeOut").function, speed: {begin: scrollZwi * 1.5}})
    }

    private previous() {
        let scrollZwi = this.overflowContainer.scrollLeft > this.overflowContainer.width() ?
            this.overflowContainer.width() * OverflowX.SCROLL_PERCENT :
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
                    this.previousArrow.css({"display": "flex"});
                    this.previousAvailable = true;
                }
                this.nextAvailable = this.overflowContainer.scrollLeft < this.overflowContainer.scrollWidth - this.overflowContainer.width() - 10;
                if (!this.nextAvailable)
                    this.nextArrow.css({"display": "none"});

            } else {
                if (!this.nextAvailable) {
                    this.nextArrow.css({"display": "flex"});
                    this.nextAvailable = true
                }
                this.previousAvailable = this.overflowContainer.scrollLeft > 0;
                if (!this.previousAvailable)
                    this.previousArrow.css({"display": "none"})

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
        children.forEach(child => this.overflowContainer.appendChild(child))
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

    gradient(gradient:boolean, percent=15) {
        if(gradient) {
            this.q("next-button").css({"borderRadius": "8px"});
            this.q("previous-button").css({"borderRadius": "8px"});
            let maskimage = "linear-gradient(to right, transparent, rgba(0,0,0,1) "+ percent +"%, rgba(0,0,0,1) "+ (100-percent) +"%,transparent)";
            this.overflowContainer.css({"maskImage":maskimage});
            //@ts-ignore
            this.overflowContainer.css({"WebkitMaskImage": maskimage});
            let filler = ce("filler-element");
            filler.css({"display": "block", "flex": "0 0 calc(" + percent + "% - var(--spacing))", "alignSelf": "stretch", "order": "42069"});
            //@ts-ignore
            this.overflowContainer.prepend(filler)
            filler = ce("filler-element");
            filler.css({"display": "block", "flex": "0 0 calc(" + percent + "% - var(--spacing) * 2)", "alignSelf": "stretch"});
            //@ts-ignore
            this.overflowContainer.prepend(filler);
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
        this.overflowContainer.append(...nodes);
    }

    stl() {
        return super.stl() + require("./overflowX.css").toString()
    }

    pug() {
        return require("./overflowX.pug").default
    }
}

declareComponent("overflow-x", OverflowX);