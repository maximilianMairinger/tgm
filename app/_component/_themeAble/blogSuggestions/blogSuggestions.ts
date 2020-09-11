import ThemeAble, { Theme } from "../themeAble"
import declareComponent from "../../../lib/declareComponent"
import "../../_button/button"
import BlogCard from "../_card/unterrichtSystemeCard/blogCard/blogCard"
import {ElementList} from "extended-dom";


export type blogCardInfo = {heading:string, date:Date, content:string, link:string}

export default declareComponent("blog-suggestions", class CookieNote extends ThemeAble {

    private blogCards = this.q("c-blog-card") as BlogCard;

    constructor() {
        super(false)
    }

    theme(): Theme
    theme(to: Theme): this
    theme(to?: Theme): any {
        return super.theme(to)
    }

    stl() {
        return super.stl() + require("./blogSuggestions.css").toString()
    }
    pug() {
        return require("./blogSuggestions.pug").default
    }
})

