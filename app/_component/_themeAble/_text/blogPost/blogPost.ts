import Text from "../text";
import declareComponent from "../../../../lib/declareComponent";
import "../textblob/textblob"
import TextBlob, { MediaQuerySize } from "./../textblob/textblob"
import { ElementList } from "extended-dom";
import {Theme} from "../../themeAble";
import { Data } from "josm";
import delay from "delay";
import DateTimeFormat = Intl.DateTimeFormat;

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

  date():string
  date(date:Date):void
  date(date?:Date){
    if(date) {
      let moment = require('moment');
      this.q("blog-date").text(moment(date).format("DD.MM.YYYY"));
    }
    else return this.q("blog-date").text();
  }

  image():string
  image(image:string):void
  image(image?:string){
    if(image) this.q("blog-image img").setAttribute('src', image);
    else return this.q("blog-image img").getAttribute('src');
  }

  htmlcontent():string
  htmlcontent(html:string):void
  htmlcontent(html?:string){
    if(html) this.q("blog-html").innerHTML = html;
    else return this.q("blog-html").innerHTML;
  }

  stl() {
    return super.stl() + require("./blogPost.css").toString()
  }

  pug() {
    return require("./blogPost.pug").default
  }

}


declareComponent("blog-post", BlogPost)