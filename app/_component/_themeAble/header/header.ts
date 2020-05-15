import ThemAble, { Theme } from "../themeAble"
import declareComponent from "../../../lib/declareComponent"
import "../_icon/tgmLogo/tgmLogo"
import "../../_button/button"
import Link from "../link/link"
import { ElementList } from "extended-dom"
import { lang } from "../../../lib/lang/lang"
import delay from "delay"


const linkAnimationOffset = 170
const linkFadeInDuration = 800


export default declareComponent("header", class Header extends ThemAble {
  private pathDisplayElem = this.q("path-display")
  private linkContainerElem = this.q("right-content")
  private underlineElem = this.q("slidy-underline")

  constructor() { 
    super()
    
    
  }


  private currentLinkContents: string[]
  private currentLinkElems: ElementList<Link>
  private lastAnimationWrapper: HTMLElement
  private lastSelectedElem: Element
  public async updateLinks(linkContents: string[], domainLevel: number) {
    let fadoutProm: Promise<any>
    let animationWrapper = ce("link-animation-wrapper")
    let lastAnimationWrapper = this.lastAnimationWrapper
    this.linkContainerElem.apd(animationWrapper)
    let lastLength: number
    if (this.currentLinkElems) {
      lastLength = this.currentLinkElems.length
      fadoutProm =  Promise.all([
        lastAnimationWrapper.anim({translateX: 17}, (linkFadeInDuration + (lastLength-1) * linkAnimationOffset) / 2),
        this.currentLinkElems.anim({opacity: 0, translateX: 3}, (linkFadeInDuration) / 2, linkAnimationOffset / 2)
      ]).then(() => {
        lastAnimationWrapper.remove()
      })
    }
    else lastLength = 0

    this.lastAnimationWrapper = animationWrapper
    this.currentLinkContents = linkContents.clone()
    this.currentLinkElems = new ElementList()
    let currentLength = this.currentLinkElems.length

    linkContents.ea((s) => {
      this.currentLinkElems.add(new Link(lang.links[s], s, domainLevel))
    })
    animationWrapper.apd(...this.currentLinkElems)
    
    await Promise.all([
      fadoutProm,
      delay(fadoutProm ? (200 + (((lastLength * linkAnimationOffset) / 2) - currentLength * linkAnimationOffset)) : 0).then(() => Promise.all([
        animationWrapper.anim({translateX: 0.1}, linkFadeInDuration + (currentLength-1) * linkAnimationOffset),
        this.currentLinkElems.anim({opacity: 1, translateX: .1}, linkFadeInDuration, linkAnimationOffset)
      ]))
    ])

    
    
  }

  public theme(): Theme
  public theme(to: Theme)
  public theme(to?: Theme): any {
    this.currentLinkElems.Inner("theme", [to])
    return super.theme(to)
  }

  public async updateSelectedLink(newSelected: string) {
    let index = this.currentLinkContents.indexOf(newSelected)
    let elem = this.currentLinkElems[index]
    let bounds = elem.getBoundingClientRect()
    
    if (this.lastSelectedElem) {
      this.lastSelectedElem.css({fontWeight: "normal"})
    }

    this.lastSelectedElem = elem
    elem.css({fontWeight: "bold"})
    await this.underlineElem.anim({left: bounds.left, width: bounds.width}, 500)
    
    
  }

  

  stl() {
    return require("./header.css").toString()
  }
  pug() {
    return require("./header.pug").default
  }
})

const totalUnderlineOverflow = 5
