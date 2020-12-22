import Text from "../text";
import "../textblob/textblob"
import TextBlob, { MediaQuerySize } from "./../textblob/textblob"
import { ElementList } from "extended-dom";
import {Theme} from "../../themeAble";
import "./../../../image/image"
import Image from "./../../../image/image";
import declareComponent from "../../../../lib/declareComponent";
import "./../../_icon/playButton/playButton"
import Button from "../../_button/button";




export default class Thumbnail extends Text {
  private textBlob = this.q("c-textblob") as TextBlob;
  private imgContainer = this.q("background-image")
  private img = this.imgContainer.childs("c-image") as Image

  constructor() {
    super();
    this.theme('dark');
  }

  background(src: string) {
    this.img.src(src)
  }

  note(): string
  note(note: string): void
  note(note?: string):any {
      return this.textBlob.note(note);
  }

  heading(): string
  heading(heading: string): void
  heading(heading?: string): any {
    return this.textBlob.heading(heading)
  }

  subheading(): string
  subheading(subheading: string): void
  subheading(subheading?: string): any {
    return this.textBlob.subheading(subheading)
  }

  content(): string
  content(content: string): void
  content(content?: string): any {
    return this.textBlob.content(content)
  }

  linktext(): string
  linktext(linktext: string): void
  linktext(linktext?: string): any {
    return this.textBlob.linktext(linktext)
  }

  linkhref(): string
  linkhref(linkhref: string): void
  linkhref(linkhref?: string): any {
    return this.textBlob.linkhref(linkhref)
  }

  hsize(): MediaQuerySize
  hsize(hsize: JSON | MediaQuerySize): void
  hsize(hsize?: JSON | MediaQuerySize): any {
    return this.textBlob.hsize(hsize)
  }

  hmobile(): MediaQuerySize
  hmobile(hmobile: JSON | MediaQuerySize): void
  hmobile(hmobile?: JSON | MediaQuerySize): any {
    return this.textBlob.hmobile(hmobile)
  }

  private videohref:string;
  private startIframe(){
    this.q("iframe").setAttribute("src", "https://www.youtube.com/embed/" +this.videohref.split("/watch?v=").splice(-1).pop() + "?autoplay=1&controls=0")
    this.textBlob.css({display:"none"})
    let textbox = this.q("text-box")
    let shader = this.q("background-shader");
    [textbox,shader].forEach((elmn) => elmn.anim({opacity:0},1000));
    setTimeout(() => [textbox,shader].forEach((elmn) => elmn.css({display:"none"})), 1000);
  }

  videolink(link?:string){
    let videoButton = this.q("video-button");
    let videoLink = videoButton.querySelector("c-button") as Button;
    if (link){
      videoButton.css({display:"block"});
      this.videohref = link;
      videoLink.click(this.startIframe.bind(this))
    }else return this.videohref;
  }

  theme():Theme
  theme(to:Theme):this
  theme(to?:Theme):any{
    this.textBlob.theme(to)
    return super.theme(to);
  }

  stl() {
    return super.stl() + require("./thumbnail.css").toString()
  }

  pug() {
    return require("./thumbnail.pug").default
  }
}

declareComponent("thumbnail", Thumbnail)
