import ThemeAble, { Theme } from "../themeAble"
import declareComponent from "../../../lib/declareComponent"
import "../../_themeAble/_button/button"
import {ElementList} from "extended-dom";
import Button from "../../_themeAble/_button/button";


class OverflowX extends ThemeAble {

    constructor(public onChange?: (activate: boolean) => void) {
        super(false)
        let children = []
        this.childNodes.forEach(child => {
            children.add(child)
        })
        this.removeChilds();
        children.forEach(child => this.elementBody.appendChild(child))
    }

    theme(): Theme
    theme(to: Theme): this
    theme(to?: Theme): any {
        return super.theme(to)
    }

    appendChild<T extends Node>(newChild: T): T {
        return this.elementBody.appendChild(newChild);
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