import Text from "../text";
import declareComponent from "../../../../lib/declareComponent";
import "../textblob/textblob"
import TextBlob, { MediaQuerySize } from "./../textblob/textblob"
import { ElementList } from "extended-dom";
import {Theme} from "../../themeAble";


type Stellvertreter = {name: string, email: string}[]

export default declareComponent("image-textblob", class ImageTextblob extends Text {
  private textBlob = this.q("c-textblob") as TextBlob
  private type = "right";

  constructor() {
    super();
  }

  aligntype(): string
  aligntype(aligntype: string): void
  aligntype(aligntype?: string) {
    if (aligntype) {
      let imageTextBlob = this.q("image-text-blob");
      imageTextBlob.removeClass(this.type);
      this.type = aligntype;
      imageTextBlob.addClass(this.type);
    } else return this.type;
  }

  note(): string
  note(note: string): void
  note(note?: string) {
    if (note) this.q("note-text").text(note);
    else return this.q("note-text").text();
  }

  image(): string
  image(image: string): void
  image(image?: string) {
    if (image) this.q("image-box").css({ background: image + " no-repeat" });
    else return this.q("image-box").css("background");
  }

  addresse(): string
  addresse(addresse: string): void
  addresse(addresse?: string) {
    if (addresse) this.q(".addresse").text(addresse);
    else return this.q(".addresse").text();
  }

  email(): string
  email(email: string): void
  email(email?: string) {
    if (email) this.q(".email").text(email);
    else return this.q(".email").text();
  }

  tel(): string
  tel(tel: string): void
  tel(tel?: string) {
    if (tel) this.q(".tel").text(tel);
    else return this.q(".tel").text();
  }

  private _stellverterter: Stellvertreter
  stellvertreter(): Stellvertreter
  stellvertreter(stellvertreter: JSON | Stellvertreter): void
  stellvertreter(stellvertreter?: JSON | Stellvertreter) {
    let infoGrid = this.q("info-grid");
    if (stellvertreter) {
      this._stellverterter = this.parseJSONProp(stellvertreter)

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
)