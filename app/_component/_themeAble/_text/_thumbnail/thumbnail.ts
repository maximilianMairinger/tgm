import Text from "../text";
import "../textblob/textblob"
import TextBlob, { MediaQuerySize } from "./../textblob/textblob"
import { ElementList } from "extended-dom";
import {Theme} from "../../themeAble";
import "./../../../image/image"
import Image from "./../../../image/image";
import declareComponent from "../../../../lib/declareComponent";




export default class Thumbnail extends Text {
  private textBlob = this.q("c-textblob") as TextBlob;
  private imgContainer = this.q("background-image")
  private img = this.imgContainer.childs("c-image") as Image

  constructor() {
    super();
    this.theme('dark');
  }

  background(src: string, alignX?: "left" | "right" | "center", alignY?: "top" | "bot" | "center") {
    this.img.src(src)
    
    if (alignX) this.alignImageX(alignX)
    if (alignY) this.alignImageY(alignY)
  }

  alignImageY(to: "top" | "bot" | "center") {
    if (to === "top") {
      this.imgContainer.css({alignItems: "start"})
    }
    else if (to === "bot") {
      this.imgContainer.css({alignItems: "end"})
    }
    else if (to === "center") {
      this.imgContainer.css({alignItems: "center"})
    }
  }

  alignImageX(to: "left" | "right" | "center") {
    if (to === "left") {
      this.imgContainer.css({justifyContent: "start"})
    }
    else if (to === "right") {
      this.imgContainer.css({justifyContent: "end"})
    }
    else if (to === "center") {
      this.imgContainer.css({justifyContent: "center"})
    }
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
