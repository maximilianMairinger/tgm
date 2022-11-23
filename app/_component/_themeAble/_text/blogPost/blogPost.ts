import Text from "../text";
import declareComponent from "../../../../lib/declareComponent";
import "../textblob/textblob"
import TextBlob, { MediaQuerySize } from "./../textblob/textblob"
import { ElementList } from "extended-dom";
import {Theme} from "../../themeAble";
import { Data } from "josm";
import delay from "delay";
import local from "../../../../lib/formatTime"


export default class BlogPost extends Text {
  
  private textblob = this.q("c-textblob") as TextBlob;

  constructor() {
    super()
  }

  theme():Theme
  theme(to:Theme):this
  theme(to?:Theme):any{
    return super.theme(to);
  }

  blogtitle():string
  blogtitle(title:string):void
  blogtitle(title?:string):any {
    return this.textblob.heading(title);
  }

  date(): string
  date(date: Date | Date[]/*[from: Date, until: Date]*/ | string): void
  date(date?: Date | Date[]/*[from: Date, until: Date]*/ | string){
    if(date) {
      this.q("blog-date").text(local.formatDate(date));
    }
    else return this.q("blog-date").text();
  }

  image():string
  image(image:string):void
  image(image?:string){
    if(image) {
      this.q("blog-image").css({display:"block"});
      this.q("blog-image img").setAttribute('src', image);
    }
    else return this.q("blog-image img").getAttribute('src');
  }

  htmlcontent():string
  htmlcontent(html:string):void
  htmlcontent(html?:string){
    if(html) {
      html = html
      // @ts-ignore
          .replaceAll("<a href", "<c-link link")
          .replaceAll("<\/a>", "<\/c-link>");
      let parser = new DOMParser();
      let htmlDOM = parser.parseFromString(html, 'text/html');
      htmlDOM.querySelectorAll(".kg-gallery-image").forEach((img) => {
        let ratio = parseInt(img.childs().getAttribute("width"), 10) / parseInt(img.childs().getAttribute("height"), 10);
        img.css({"flex": ratio + "1 0"});
      });
      console.log(htmlDOM)
      this.q("blog-html").innerHTML = (htmlDOM.firstChild as HTMLElement).innerHTML;
    }
    else return this.q("blog-html").innerHTML;
  }

  stl() {
    return require("./blogPost.css").toString()
  }

  pug() {
    return require("./blogPost.pug").default
  }

}


declareComponent("blog-post", BlogPost)