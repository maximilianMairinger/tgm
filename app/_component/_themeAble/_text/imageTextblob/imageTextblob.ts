import Text from "../text";
import declareComponent from "../../../../lib/declareComponent";
import "../textblob/textblob"
import TextBlob, { MediaQuerySize } from "./../textblob/textblob"
import { ElementList } from "extended-dom";
import {Theme} from "../../themeAble";
import { Data } from "josm";
import delay from "delay";
import Image from "../../../image/image";


type Stellvertreter = {name: string, email: string}[]

type Alignment = "left" | "right"

export default class ImageTextblob extends Text {
  private textBlob = this.q("c-textblob") as TextBlob
  private _alignment: Alignment;
  private imageTextBlob = this.q("image-text-blob")
  private infoGrid = this.q("info-grid");

  constructor(aligment: Alignment = "right") {
    super()
    this.alignment(aligment)
  }

  contentwidth(to: number | null) {
    this.textBlob.contentwidth(to)
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

  private imgElem: Image
  image(image: null): this
  image(image: string): this
  image(image: string | null): any {
    if (image === null) {
      if (this.imgElem) this.q("image-container").remove()
      return this
    }
    else {
      this.imageTextBlob.apd(ce("image-container").apd(this.imgElem = new Image(image)))
    }
  }

  mobileSwitchAt(to: number | string) {
    this.textBlob.mobileSwitchAt(to)
  }



  private infoIndex: {[infoName in string]: HTMLElement} = {}
  public info(infoName: string, info: string | Data<string> | null): this
  public info(infoName: string): string
  public info(infoName: string, info?: string | Data<string>): any {
    if (info !== undefined) {
      if (this.infoIndex[infoName]) {
        if (info === null) {
          let hideElems = new ElementList(this.infoIndex[infoName], this.infoIndex[infoName].previousSibling as HTMLElement)
          hideElems.anim({opacity: 0}).then(() => hideElems.remove());
          delete this.infoIndex[infoName];

        }
        else {
          this.infoIndex[infoName].text(info as string)
        }
      }
      else {
        if (info !== null) this.infoGrid.apd(ce("info-text").addClass("heading").text(infoName), this.infoIndex[infoName] = ce("info-text").text(info as string))
      }

      if (Object.keys(this.infoIndex).length > 0) this.hrLower.show().anim({opacity: 1})
      else this.hrLower.anim({opacity: 0}).then(() => this.hrLower.hide())

      return this
    }
    else return this.infoIndex[infoName] ? this.infoIndex[infoName].text() : ""
  }

  private hrLower = this.q("hr.lower")

  address(): string
  address(addresse: string): this
  address(addresse?: string): any {
    return this.info("Adresse", addresse)
  }

  email(): string
  email(email: string): this
  email(email?: string): any {
    return this.info("Email", email)
  }

  tel(): string
  tel(tel: string): this
  tel(tel?: string): any {
    return this.info("Tel", tel)
  }

   stellvertreterAlias(stellverterterAlias:string){
    this.stellvertreterAliasName = stellverterterAlias;
  }


  private stellvertreterAliasName = "Stellvertreter"
  private _stellverterter: Stellvertreter
  stellvertreter(): Stellvertreter
  stellvertreter(stellvertreter: JSON | Stellvertreter): void
  stellvertreter(stellvertreter?: JSON | Stellvertreter) {
    
    if (stellvertreter) {
      this._stellverterter = this.parseJSONProp(stellvertreter);

      this.infoGrid.append(ce("stellvertreter-text").addClass("heading").text(this.stellvertreterAliasName));
      for (let i = 0; i < this._stellverterter.length; i++) {
        let stellvertreterData = this._stellverterter[i];
        this.infoGrid.append(ce("info-text").text(stellvertreterData.name));
        this.infoGrid.append(ce("info-text").text(stellvertreterData.email));
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
    if (content !== undefined) {
      if (content !== "") {
        this.q("connector-box.bottom").css("display", "block")
      }
    }
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
    return require("./imageTextblob.css").toString()
  }

  pug() {
    return require("./imageTextblob.pug").default
  }

}


declareComponent("image-textblob", ImageTextblob)