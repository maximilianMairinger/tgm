import ThemeAble, { Theme } from "../themeAble"
import declareComponent from "../../../lib/declareComponent"
import "../../_button/button"
import BlogCard from "../_card/_infoCard/blogCard/blogCard"
import {ElementList} from "extended-dom";


export type blogCardInfo = {heading:string, thumbnail:string, date:Date, content:string, link:string}

export default declareComponent("blog-suggestions", class CookieNote extends ThemeAble {

    private blogCardInfos:blogCardInfo[];

    constructor() {
        super(false)
    }

    theme(): Theme
    theme(to: Theme): this
    theme(to?: Theme): any {
        return super.theme(to)
    }

    blogs():blogCardInfo[]
    blogs(blogCardInfos:blogCardInfo[]):void
    blogs(blogCardInfos?:blogCardInfo[]){
        if(blogCardInfos){
            blogCardInfos = this.parseJSONProp(blogCardInfos);
            console.log(blogCardInfos);
            this.blogCardInfos = blogCardInfos;
            let suggestions = ce("blog-suggestions");
            blogCardInfos.forEach(blogCardInfo => suggestions.append(this.createBlogCard(blogCardInfo)));
            suggestions.append(ce("suggestions-filler"))
            this.q("blog-suggestions-box").append(suggestions);

        }else return this.blogCardInfos;
    }

    createBlogCard(blogCardInfo:blogCardInfo):BlogCard{
        let blogcard = new BlogCard();
        blogcard.heading(blogCardInfo.heading);
        blogcard.note(blogCardInfo.date);
        blogcard.headingbackground("#F5B3AD");
        blogcard.thumbnail(blogCardInfo.thumbnail);
        blogcard.content(blogCardInfo.content)
        blogcard.href(blogCardInfo.link)
        return blogcard
    }

    stl() {
        return super.stl() + require("./blogSuggestions.css").toString()
    }
    pug() {
        return require("./blogSuggestions.pug").default
    }
})

