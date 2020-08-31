import Text from "../text";
import declareComponent from "../../../../lib/declareComponent";
import "../textblob/textblob"
import TextBlob, { MediaQuerySize } from "./../textblob/textblob"
import { ElementList } from "extended-dom";
import {Theme} from "../../themeAble";


type Stellvertreter = {name: string, email: string}[]

type Alignment = "left" | "right"

export default class ImageTextblob extends Text {
  private textBlob = this.q("c-textblob") as TextBlob
  private _alignment: Alignment;
  private imageTextBlob = this.q("image-text-blob")

  constructor(aligment: Alignment = "right") {
    super()
    this.alignment(aligment)
  }

  alignment(): Alignment
  alignment(alignment: Alignment): this
  alignment(alignment?: Alignment) {
    if (alignment) {
      if (this._alignment !== alignment) {
        this.imageTextBlob.removeClass(this._alignment).addClass(alignment)
        this._alignment = alignment
      }
      
      return this
    } else return this._alignment
  }

  note(): string
  note(note: string): this
  note(note?: string) {
    return this.q("note-text").text(note)
  }

  private imgElem: HTMLElement
  image(): string
  image(image: null): this
  image(image: string): this
  image(image?: string | null): any {
    if (image === null) {
      if (this.imgElem) this.q("image-container").remove()
      return this
    }
    else {
      if (!this.imgElem) this.imageTextBlob.apd(ce("image-container").apd(this.imgElem = ce("image-box")))
      return this.imgElem.css("backgroundImage", image)
    }
  }

  addresse(): string
  addresse(addresse: string): this
  addresse(addresse?: string) {
    return this.q(".addresse").text(addresse);
  }

  email(): string
  email(email: string): this
  email(email?: string) {
    return this.q(".email").text(email)
  }

  tel(): string
  tel(tel: string): this
  tel(tel?: string) {
    return this.q(".tel").text(tel);
  }

  private _stellverterter: Stellvertreter
  stellvertreter(): Stellvertreter
  stellvertreter(stellvertreter: JSON | Stellvertreter): void
  stellvertreter(stellvertreter?: JSON | Stellvertreter) {
    let infoGrid = this.q("info-grid");
    if (stellvertreter) {
      this._stellverterter = this.parseJSONProp(stellvertreter);

      infoGrid.append(ce("stellvertreter-text").addClass("bold").text("Stellverteter"));
      for (let i = 0; i < this._stellverterter.length; i++) {
        let stellvertreterData = this._stellverterter[i];
        infoGrid.append(ce("info-text").text(stellvertreterData.name));
        infoGrid.append(ce("info-text").text(stellvertreterData.email));
      }
    } else return this._stellverterter
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
  theme(to:Theme):void
  theme(to?:Theme):any{
    this.textBlob.theme(to)
    return super.theme(to);
  }

  stl() {
    return super.stl() + require("./imageTextblob.css").toString()
  }

  pug() {
    return require("./imageTextblob.pug").default
  }

}


declareComponent("image-textblob", ImageTextblob)