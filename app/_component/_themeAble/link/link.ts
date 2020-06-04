import declareComponent from "../../../lib/declareComponent"
import ThemeAble from "../themeAble";
import { Data } from "josm"
import * as domain from "./../../../lib/domain"
import delay from "delay"




export default class Link extends ThemeAble {
  private aElem = this.q("a") as unknown as HTMLAnchorElement
  private slotElem = this.sr.querySelector("slot")
  private slidyWrapper = this.q("slidy-underline-wrapper")
  private slidy = this.slidyWrapper.childs()
  constructor(content: string | Data<string>, link?: string, public domainLevel: number = 0, public push: boolean = true, underline: boolean = true) {
    super(false)
    
    this.content(content)
    if (link) this.link(link)


    let ev = (e: Event) => {
      let link = this.link()
      if (link) {
        if (this.isLinkOnOrigin) {
          e.preventDefault()
          domain.set(link, this.domainLevel, this.push)
        }
      }
      
      this.cbs.Call(e)
    }


    let updateLinkF = () => {
      let meta = domain.linkMeta(this.link(), this.domainLevel)
      this.aElem.href = meta.href
    }

    this.aElem.on("mouseenter", updateLinkF)
    this.aElem.on("focus", updateLinkF)

    this.aElem.on("click", ev)
    this.aElem.on("keydown", (e) => {
      // enter is covered with click
      if (e.key === " ") ev(e)
    })


    if (underline) {
      let inAnimation = false
      let wannaCloose = false
      let wantToAnim = false


      let mouseOver = () => {
        if (inAnimation) {
          wantToAnim = true
          wannaCloose = false
          return
        }
        inAnimation = true

        let handled = false
        delay(250).then(() => {
          if (wannaCloose) {
            this.slidyWrapper.anim({width: "0%", left: "100%"}).then(() => {
              this.slidyWrapper.css({left: "0%", width: "100%"})
              this.slidy.css({width: 0})
            }).then(() => {
              inAnimation = false
              if (wantToAnim) {
                wantToAnim = false
                mouseOver()
              }
            })
            wannaCloose = false
            handled = true
          }
          
        })
        delay(300).then(() => {

          if (wannaCloose && !handled) {
            this.slidy.anim({width: "0%", left: "100%"}).then(() => this.slidy.css({left: "0%"})).then(() => {
              inAnimation = false
              if (wantToAnim) {
                wantToAnim = false
                mouseOver()
              }
            })
            wannaCloose = false
          }
          else {
            if (!handled) inAnimation = false
          }
        })
        this.slidy.anim({width: "100%"}, 300)
      }

      let mouseOut = () => {
        wantToAnim = false
        if (!inAnimation) {
          inAnimation = true
          this.slidy.anim({width: "0%", left: "100%"}).then(() => this.slidy.css({left: "0%"})).then(() => {
            inAnimation = false
            if (wantToAnim) {
              wantToAnim = false
              mouseOver()
            }
            if (wannaCloose) {
              wannaCloose = false
              mouseOut()
            }
          })
          wannaCloose = false
        }
        else wannaCloose = true
        
      }

      this.aElem.on("mouseover", mouseOver)
      this.aElem.on("mouseleave", mouseOut)
    }

  }

  private isLinkOnOrigin: boolean
  private _link: string

  link(): string
  link(to?: string): void
  link(to?: string): any {
    if (to) {
      let link = domain.linkMeta(to, this.domainLevel)
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
    return super.stl() + require("./link.css").toString()
  }
  pug() {
    return require("./link.pug").default
  }
}

declareComponent("link", Link)