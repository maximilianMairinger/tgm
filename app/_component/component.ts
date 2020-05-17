import interpolateHTMLWithLang from "../lib/interpolateHTMLWithLang";
import "../global"

export default abstract class Component<T extends HTMLElement | HTMLAnchorElement | false | never = HTMLElement> extends HTMLElement {
  protected sr: ShadowRoot;
  protected elementBody: T extends (HTMLElement | HTMLAnchorElement) ? T : T extends false ? ShadowRoot : HTMLElement


  constructor(elementBodyExtention?: T) {
    super();
    this.sr = this.attachShadow({mode: "open"});

    
    if (elementBodyExtention !== false) {
      //@ts-ignore
      let realElementBody = this.elementBody = ce("component-body")
      if (elementBodyExtention !== undefined) {
        //@ts-ignore
        this.elementBody = elementBodyExtention
        //@ts-ignore
        realElementBody.apd(elementBodyExtention)
      }


      this.sr.html("<!--General styles--><style>" + require('./component.css').toString() + "</style><!--Main styles--><style>" + this.stl() + "</style>")
      this.sr.append(realElementBody)
      this.elementBody.innerHTML = interpolateHTMLWithLang(this.pug())
    }
    else {
      //@ts-ignore
      this.elementBody = this.sr
      this.sr.html("<!--General styles--><style>" + require('./component.css').toString() + "</style><!--Main styles--><style>" + this.stl() + "</style>" + interpolateHTMLWithLang(this.pug()))
    }
  }

  protected attributeChangedCallback(attrName: string, oldVal: string, newVal: string) {
    this[attrName](newVal)
  }

  public abstract stl(): string;
  public abstract pug(): string;
  /**
   * Appends to ShadowRoot
   */
  public sra(...elems: HTMLElement[]): void {
    elems.ea((e) => {
      this.sr.append(e);
    });
  }

  public q(qs?: string) {
    return this.elementBody.childs(qs)
  }
  public apd(...elems: Element[]) {
    this.elementBody.append(...elems)
    return this
  }
}


/*
import Element from "../element"

export default class Example extends Element {

  constructor() {
    super()


  }

  stl() {
    return require("./example.css").toString()
  }
  pug() {
    return require("./example.pug").default
  }
}

window.customElements.define('c-example', Example);

*/
