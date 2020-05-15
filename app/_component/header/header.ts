import Component from "../component"
import declareComponent from "./../../lib/declareComponent"
import "./../_themeAble/_icon/tgmLogo/tgmLogo"
import "./../_button/button"
import Link from "./../_themeAble/link/link"
import { ElementList } from "extended-dom"
import { lang } from "./../../lib/lang/lang"
import delay from "delay"

console.log(lang.links.tagesschule.get(console.log))

const linkAnimationOffset = 170
const linkFadeInDuration = 800


export default declareComponent("header", class Header extends Component {
  private pathDisplayElem = this.q("path-display")
  private linkContainerElem = this.q("right-content")

  constructor() { 
    super()
    
    
  }

  private currentLinkContents: string[]
  private currentLinkElems: ElementList<Link>
  private lastAnimationWrapper: HTMLElement
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

  public updateSelectedLink(newSelected: string) {
    
  }

  

  stl() {
    return require("./header.css").toString()
  }
  pug() {
    return require("./header.pug").default
  }
})
