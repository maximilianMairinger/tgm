import Text from "../text";
import declareComponent from "../../../../lib/declareComponent";
import {Theme} from "../../themeAble";


export type MediaQuerySize = { min: number, max: number }

export default class Textblob extends Text {
  private hsizeScale = { max: 45, min: 30 };
  private hmobileScale = { max: 45, min: 30 };
  private mediaQuery: MediaQueryList;
  private textbox = this.q("text-box");


  private mediaQueryMatches: boolean;
  mobileQueryFunc(mediaQuery: MediaQueryList) {
    if (!mediaQuery.matches) {
      if (this.mediaQueryMatches || this.mediaQueryMatches === undefined) {
        this.mediaQueryMatches = false;
        this.textbox.css({ "fontSize": `max(27px, calc(${this.hsizeScale.min}px + (${this.hsizeScale.max} - ${this.hsizeScale.min}) * ((100vw - 768px) / (1600 - 768))))` });
      }
      
    }
      
    else {
      if (!this.mediaQueryMatches) {
        this.mediaQueryMatches = true;
        this.textbox.css({ "fontSize": `max(27px, calc(${this.hmobileScale.min}px + (${this.hmobileScale.max} - ${this.hmobileScale.min}) * ((100vw - 300px) / (768 - 300))))` });
      }
    }
      
  }

  constructor() {
    super();
    this.mediaQuery = window.matchMedia('(max-width: 768px)');
    this.mediaQuery.addListener(this.mobileQueryFunc.bind(this));
  }

  heading(): string
  heading(heading: string): void
  heading(heading?: string) {
    if (heading) this.q("heading-text").text(heading);
    else return this.q("heading-text").text();
  }

  subheading(): string
  subheading(subheading: string): void
  subheading(subheading?: string) {
    if (subheading) this.q("subheading-text").text(subheading);
    else return this.q("subheading-text").text();
  }


  hsize(): MediaQuerySize
  hsize(hsize: JSON | MediaQuerySize): void
  hsize(hsize?: JSON | MediaQuerySize) {
    if (hsize) {
      this.hsizeScale = this.parseJSONProp(hsize)
      this.mediaQueryMatches = undefined;
      this.mobileQueryFunc(this.mediaQuery);
    } 
    else return this.hsizeScale;
  }

  hmobile(): MediaQuerySize
  hmobile(hmobile: MediaQuerySize | JSON): void
  hmobile(hmobile?: MediaQuerySize | JSON) {
    if (hmobile) {
      this.hmobileScale = this.parseJSONProp(hmobile)
      this.mediaQueryMatches = undefined;
      this.mobileQueryFunc(this.mediaQuery);
    } else return this.hmobileScale;
  }

  private _hscale: number
  private subheadingElem = this.q("subheading-text")
  hscale(): number
  hscale(hscale: number): void
  hscale(hscale?: number): any {
    if (hscale) {
      this._hscale = hscale
      this.subheadingElem.css({ "fontSize": `max(${hscale}em, 25px)` });
    }
    else return this._hscale
  }

  note(): string
  note(note: string): void
  note(note?: string) {
    if (note) {
      let notebox = ce("note-box");
      let notetext = ce("note-text");
      notetext.text(note);
      let connector = ce("connector-box");
      let hr = ce("HR");
      connector.append(hr);
      notebox.append(notetext);
      notebox.append(connector);
      notebox.append(ce("spacing-box"));
      this.q("text-blob").prepend(notebox)
    } else return this.q("note-text").text();
  }

  content(): string
  content(content: string): void
  content(content?: string): any {
    return this.q("content-text").text(content)
  }

  linktext(): string
  linktext(linktext: string): void
  linktext(linktext?: string): any {
    return this.link.html(linktext)
  }

  private link = this.q("a.link") as unknown as HTMLAnchorElement
  private linkHref: string
  linkhref(): string
  linkhref(linkhref: string): void
  linkhref(linkhref?: string) {
    if (linkhref) this.linkHref = this.link.href = linkhref;
    else return this.linkHref
  }

  stl() {
    return require("./textblob.css").toString()
  }

  pug() {
    return require("./textblob.pug").default
  }

}


declareComponent("textblob", Textblob)