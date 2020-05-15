import Text from "./../text";
import declareComponent from "../../../lib/declareComponent";
import "./../textblob/textblob"
import { ElementList } from "extended-dom";


export default declareComponent("image-textblob", class Textblob extends Text {

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

  stellvertreter(): ElementList
  stellvertreter(stellvertreter: string)
  stellvertreter(stellvertreter?: string) {
    let infoGrid = this.q("info-grid");
    if (stellvertreter) {
      console.log(stellvertreter);
      let stellvertreterAry = stellvertreter.split(", ");
      if (stellvertreterAry[0].includes(",")) stellvertreterAry = stellvertreter.split(",");
      console.log(stellvertreterAry);
      infoGrid.append(ce("stellvertreter-text").addClass("bold").text("Stellverteter"));
      for (let i = 0; i < stellvertreterAry.length; i++) {
        let stellvertreterData = stellvertreterAry[i].split("/");
        infoGrid.append(ce("info-text").text(stellvertreterData[0]));
        infoGrid.append(ce("info-text").text(stellvertreterData[1]));
      }
    } else return infoGrid.childs("stellvertreter-text ~ info-tex")
  }

  heading(): string
  heading(heading: string): void
  heading(heading?: string) {
    if (heading) this.q("c-textblob").setAttribute("heading", heading);
    else return this.q("c-textblob").getAttribute("heading");
  }

  subheading(): string
  subheading(subheading: string): void
  subheading(subheading?: string) {
    if (subheading) this.q("c-textblob").setAttribute("subheading", subheading);
    else return this.q("c-textblob").getAttribute("subheading");
  }

  content(): string
  content(content: string): void
  content(content?: string) {
    if (content) this.q("c-textblob").setAttribute("content", content);
    else return this.q("c-textblob").getAttribute("content");
  }

  linktext(): string
  linktext(linktext: string): void
  linktext(linktext?: string) {
    if (linktext) this.q("c-textblob").setAttribute("linktext", linktext);
    else return this.q("c-textblob").getAttribute("linktext");
  }

  linkhref(): string
  linkhref(linkhref: string): void
  linkhref(linkhref?: string) {
    if (linkhref) this.q("c-textblob").setAttribute("linkhref", linkhref);
    else return this.q("c-textblob").getAttribute("linkhref");
  }

  hsize(): string
  hsize(hsize: string): void
  hsize(hsize?: string) {
    if (hsize) this.q("c-textblob").setAttribute("hsize", hsize);
    else return this.q("c-textblob").getAttribute("hsize");
  }

  hmobile(): string
  hmobile(hmobile: string): void
  hmobile(hmobile?: string) {
    if (hmobile) this.q("c-textblob").setAttribute("hmobile", hmobile);
    else return this.q("c-textblob").getAttribute("hmobile");
  }

  stl() {
    return require("./imageTextblob.css").toString()
  }

  pug() {
    return require("./imageTextblob.pug").default
  }

}
)