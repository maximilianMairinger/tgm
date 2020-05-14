import declareComponent from "../../../lib/declareComponent"
import getBaseUrl from "get-base-url"
import ThemAble from "../themeAble";


export default declareComponent("link", class Link extends ThemAble {
  private aElem = this.q("a") as unknown as HTMLAnchorElement
  private slotElem = this.sr.querySelector("slot")
  constructor(content: string, link?: string) {
    super(false)
    
    this.content(content)
    if (link) this.link(link)

    this.on("click", (e) => {
      this.cbs.Call(e)
    })

    this.on("keydown", (e) => {
      if (e.key === " " || e.key === "Enter") this.cbs.call(e)
    })

    this.aElem.on("click", (e) => {
      if (getBaseUrl(this.content()) === location.origin) e.preventDefault()
    })

  }

  link(): string
  link(to?: string): void
  link(to?: string): any {
    if (to) this.aElem.href = to
    else return this.aElem.href
  }

  private cbs: ((e: Event) => void)[] = []

  public addActivationListener(listener: (e: Event) => void) {
    this.cbs.add(listener)
  }
  public removeActivationListener(listener: (e: Event) => void) {
    this.cbs.rmV(listener)
  }

  content(): string
  content(to?: string): void
  content(to?: string): any {
    return this.slotElem.text(to)
  }

  stl() {
    return require("./link.css").toString()
  }
  pug() {
    return require("./link.pug").default
  }
}) 