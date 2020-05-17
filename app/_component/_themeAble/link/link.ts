import declareComponent from "../../../lib/declareComponent"
import ThemAble from "../themeAble";
import { Data } from "josm"
import * as domain from "./../../../lib/domain"




export default class Link extends ThemAble {
  private aElem = this.q("a") as unknown as HTMLAnchorElement
  private slotElem = this.sr.querySelector("slot")
  constructor(content: string | Data<string>, link?: string, public domainLevel: number = 0) {
    super(false)
    
    this.content(content)
    if (link) this.link(link)


    let ev = (e: Event) => {
      let link = this.link()
      if (link) {
        if (this.isLinkOnOrigin) {
          e.preventDefault()
          domain.set(link, this.domainLevel)
        }
      }
      
      this.cbs.Call(e)
    }

    this.aElem.on("click", ev)
    this.aElem.on("keydown", (e) => {
      // enter is covered with click
      if (e.key === " ") ev(e)
    })

  }

  private isLinkOnOrigin: boolean
  private _link: string

  link(): string
  link(to?: string): void
  link(to?: string): any {
    if (to) {
      let link = domain.linkMeta(to)
      this._link = link.link
      this.aElem.href = link.href
      this.isLinkOnOrigin = link.isOnOrigin
      this.addClass("active")
    }
    else if (to === null) {
      this.removeClass("active")
      delete this._link
      delete this.aElem.href
      delete this.isLinkOnOrigin
    }
    else return this._link
  }

  private cbs: ((e: Event) => void)[] = []

  public addActivationListener(listener: (e: Event) => void) {
    this.cbs.add(listener)
  }
  public removeActivationListener(listener: (e: Event) => void) {
    this.cbs.rmV(listener)
  }

  content(): string
  content(to?: string | Data<string>): void
  content(to?: string | Data<string>): any {
    return this.slotElem.text(to)
  }

  stl() {
    return require("./link.css").toString()
  }
  pug() {
    return require("./link.pug").default
  }
}

declareComponent("link", Link)