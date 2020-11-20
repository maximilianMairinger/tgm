import declareComponent from "../../../lib/declareComponent"
import ThemeAble, { Theme } from "../themeAble";
import { Data } from "josm"
import * as domain from "./../../../lib/domain"
import delay from "delay"
import ExternalLinkIcon from "../../_themeAble/_icon/externalLink/externalLink"
import { Prim } from "extended-dom";

function openInNewTab(href) {
  Object.assign(document.createElement('a'), {
    target: '_blank',
    href,
  }).click();
}


export default class Link extends ThemeAble {
  private aElem = this.q("a") as unknown as HTMLAnchorElement
  private slotElem = this.sr.querySelector("slot")
  private slidyWrapper = this.q("slidy-underline-wrapper")
  private slidy = this.slidyWrapper.childs()
  private externalIcon = new ExternalLinkIcon()

  constructor(content: string | Data<string>, link?: string, public domainLevel: number = 0, public push: boolean = true, underline: boolean = true, textChangeAnim = true) {
    super(false)



    
    this.content(content, textChangeAnim)
    if (link) this.link(link)


    let ev = async (e: Event, dontSetLocation = false) => {
      let link = this.link()
      let meta = domain.linkMeta(link, this.domainLevel)
      if (link) this.cbs.Call(e)

      if (onClickAnimationInit) {
        onClickAnimationInit()
        if (meta.isOnOrigin) await delay(300)
        else {
          fetch(meta.href)
          await delay(500)
        }
      }

      // click event Handle
      
      if (link) {
        
        if (!dontSetLocation) {
          if (meta.isOnOrigin) domain.set(link, this.domainLevel, this.push)
          else openInNewTab(link)
        }
      }
    }

    this.aElem.on("mouseup", (e) => {
      if (e.button === 0) ev(e)
      else if (e.button === 1) ev(e, true)
    })
    this.aElem.on("click", (e) => {
      e.preventDefault()
    })

    this.aElem.on("keydown", (e) => {
      if (e.key === " " || e.key === "Enter") ev(e)
    })
    

    this.aElem.on("mousedown", () => {
      this.addClass("pressed")
    })
    this.aElem.on("mouseleave", () => {
      if (click) return
      this.removeClass("pressed")
    })
    this.aElem.on("mouseup", () => {
      if (click) return
      this.removeClass("pressed")
    })


    this.aElem.on("mouseenter", this.updateHref.bind(this))
    this.aElem.on("focus", this.updateHref.bind(this))

    
    let click: () => void

    let onClickAnimationInit: Function
    
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
          if (wannaCloose && !click) {
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
          if (!click) {
            if (!handled) {
              if (wannaCloose) {
                this.slidy.anim({width: "0%", left: "100%"}).then(() => this.slidy.css({left: "0%"})).then(() => {
                  inAnimation = false
                  if (wantToAnim) {
                    wantToAnim = false
                    mouseOver()
                  }
                })
                wannaCloose = false
              }
              else inAnimation = false
            }
            
          }
          else {
            clickF().then(click)
          }
        })
        this.slidy.anim({width: "100%"}, 300)
      }

      let mouseOut = () => {
        if (!click) {
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
      }

      this.aElem.on("mouseover", mouseOver)
      this.aElem.on("mouseleave", mouseOut)
      

      let clickF = (async () => {
        let oldSlidy = this.slidy
        if (oldSlidy.width() === 0) oldSlidy.css({width: "100%", height: 0})
        //@ts-ignore
        // this.aElem.css({mixBlendMode: "exclusion"})
        this.slidyWrapper.css({height: "calc(100% + .2em)", top: 0, bottom: "unset"})
        await Promise.all([
          oldSlidy.anim({height: "100%"}, 350),
          oldSlidy.anim({borderRadius: 0}, 100),
          this.slidyWrapper.anim({borderRadius: 0}, 100),
          delay(150).then(() => this.slidyWrapper.anim({height: 0}, 450))
        ])

        this.slidyWrapper.css({height: 2, bottom: "-.2em", top: "unset"})
        //@ts-ignore
        // this.aElem.css({mixBlendMode: "normal"})

        this.slidy = ce("slidy-underline")
        this.slidyWrapper.html(this.slidy)
        this.removeClass("pressed")

        inAnimation = false
        wannaCloose = false
        wannaCloose = false
        click = undefined
      })


      onClickAnimationInit = () => {
        
        if (!inAnimation) {
          inAnimation = true
          return clickF()
        }
        else {
          return new Promise((res) => {
            click = res
          })
          
        }
      }
    }

  }

  theme(): Theme
  theme(to: Theme): this
  theme(to?: Theme): any {
    this.externalIcon.theme(to)
    return super.theme(to)
  }

  private updateHref() {
    if (!this.link()) return
    let meta = domain.linkMeta(this.link(), this.domainLevel)
    if (!meta.isOnOrigin) this.aElem.apd(this.externalIcon)
    else this.externalIcon.remove()
    this.aElem.href = meta.href
  }

  private _link: string

  link(): string
  link(to?: string): void
  link(to?: string): any {
    if (to) {
      this._link = to
      this.updateHref()
      this.addClass("active")
    }
    else if (to === null) {
      this._link = null
      this.removeClass("active")
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
  content(to?: string | Data<string>, textChangeAnim?: boolean): void
  content(to?: Prim | Data<Prim, Prim>, textChangeAnim?: boolean): any {
    return this.slotElem.text(to, textChangeAnim)
  }

  stl() {
    return super.stl() + require("./link.css").toString()
  }
  pug() {
    return require("./link.pug").default
  }
}

declareComponent("link", Link)
