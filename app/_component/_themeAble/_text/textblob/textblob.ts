import Text from "../text";
import declareComponent from "../../../../lib/declareComponent";
import ThemeAble, {Theme} from "../../themeAble";
import "./../../link/link"
import Link from "./../../link/link"
import delay from "delay";


export type MediaQuerySize = { min: number, max: number }

export default class Textblob extends Text {
  private hsizeScale = { max: 45, min: 30 };
  private hmobileScale = { max: 45, min: 30 };
  private mediaQuery: MediaQueryList;
  private textbox = this.q("text-box");
  private minSize = 27;


  private mediaQueryMatches: boolean;
  mobileQueryFunc(mediaQuery: MediaQueryList) {
    if (!mediaQuery.matches) {
      if (this.mediaQueryMatches || this.mediaQueryMatches === undefined) {
        this.mediaQueryMatches = false;
        this.textbox.css({ "fontSize": `max(${this.minSize}px, calc(${this.hsizeScale.min}px + (${this.hsizeScale.max} - ${this.hsizeScale.min}) * ((100vw - 768px) / (1600 - 768))))` });
      }

    }

    else {
      if (!this.mediaQueryMatches) {
        this.mediaQueryMatches = true;
        this.textbox.css({ "fontSize": `max(${this.minSize}px, calc(${this.hmobileScale.min}px + (${this.hmobileScale.max} - ${this.hmobileScale.min}) * ((100vw - 300px) / (768 - 300))))` });
      }
    }

  }

  constructor() {
    super();
    this.mediaQuery = window.matchMedia('(max-width: 768px)');
    this.mediaQuery.addListener(this.mobileQueryFunc.bind(this));
  }

  private explicitWidth = false
  contentwidth(to: number | null) {
    if (to !== null) {
      this.contentElem.css({maxWidth: `calc(15vw + ${to}px)`})
      this.explicitWidth = true
    }
    else this.explicitWidth = false
  }

  theme(): Theme
  theme(to: Theme): this
  theme(to?: Theme): any {
    this.linkElem.theme(to)
    this.themeAblesInContent.Inner("theme", [to])
    return super.theme(to)
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
      this.hsizeScale = this.parseJSONProp(hsize);
      this.mediaQueryMatches = undefined;
      this.mobileQueryFunc(this.mediaQuery);
    }
    else return this.hsizeScale;
  }

  hminsize(): number
  hminsize(minSize:number):void
  hminsize(minSize?:number){
    if(minSize){
      this.minSize = minSize;
      this.mediaQueryMatches = undefined;
      this.mobileQueryFunc(this.mediaQuery);
    }else return this.minSize;
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
    if (hscale !== undefined) {
      this._hscale = hscale
      this.subheadingElem.css({ "fontSize": `max(${hscale}em, 25px)` });
    }
    else return this._hscale
  }

  private created:boolean = false;

  note(): string
  note(note: string): void
  note(note?: string) {
    if (note !== undefined) {
      if(!this.created) {
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
        this.created = true;
      }else{
        this.q("note-text").text(note);
      }
    } else return this.q("note-text").text();
  }

  private contentElem = this.q("content-text")
  private themeAblesInContent: ThemeAble[] = []
  content(): string
  content(content: string): this
  content(content?: string): any {
    if (content !== undefined) {
      if (!this.explicitWidth) this.contentElem.css({maxWidth: `calc(15vw + ${content.length / 3}px)`})
      
      this.contentElem.html(content)
      this.themeAblesInContent.clear()
      this.contentElem.childs(1, true).ea((e) => {
        if (e instanceof ThemeAble) {
          e.theme(this.theme())
          this.themeAblesInContent.add(e)
        }
      })
      return this
    }
    else return this.contentElem.html()
    
  }

  async mobileSwitchAt(to: number | string) {
    const elem = this.q("style")[1]
    let sheet: CSSStyleSheet = elem.sheet
    while(!sheet) {
      sheet = elem.sheet
      await delay(0)
    }
    const rules = sheet.cssRules
    const media = (rules[rules.length-1] as any).media
    if (typeof to === "number") media.mediaText = `(max-width: ${to}px)`
    else media.mediaText = to
  }

  linktext(): string
  linktext(linktext: string): void
  linktext(linktext?: string): any {
    if (linktext) {
      this.linkElem.css({marginTop: 14, display:"block"});
    }
    return this.linkElem.content(linktext)
  }

  private linkElem = this.q("c-link.link") as unknown as Link
  private linkHref: string
  linkhref(): string
  linkhref(linkhref: string): void
  linkhref(linkhref?: string) {
    if (linkhref) {
      this.linkHref = linkhref;
      this.linkElem.link(linkhref)
    }
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