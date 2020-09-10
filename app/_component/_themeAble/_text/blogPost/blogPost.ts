import Text from "../text";
import declareComponent from "../../../../lib/declareComponent";
import "../textblob/textblob"
import TextBlob, { MediaQuerySize } from "./../textblob/textblob"
import { ElementList } from "extended-dom";
import {Theme} from "../../themeAble";
import { Data } from "josm";
import delay from "delay";

export default class BlogPost extends Text {

  constructor() {
    super()
  }



  theme():Theme
  theme(to:Theme):this
  theme(to?:Theme):any{
    return super.theme(to);
  }

  stl() {
    return super.stl() + require("./blogPost.css").toString()
  }

  pug() {
    return require("./blogPost.pug").default
  }

}


declareComponent("blog-post", BlogPost)