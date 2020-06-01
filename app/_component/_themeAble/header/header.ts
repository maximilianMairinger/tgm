import ThemAble, { Theme } from "../themeAble"
import declareComponent from "../../../lib/declareComponent"
import "../_icon/tgmLogo/tgmLogo"
import "../../_button/button"
import Link from "../link/link"
import { ElementList } from "extended-dom"
import { lang } from "../../../lib/lang"
import delay from "delay"
import { domainIndex } from "./../../../lib/domain"
import "./../_icon/arrow/arrow"
import ArrowIcon from "./../_icon/arrow/arrow"


const linkAnimationOffset = 170
const linkFadeInDuration = 800


export default declareComponent("header", class Header extends ThemAble {
  private pathDisplayElem = this.q("path-display")
  private linkContainerElem = this.q("right-content")
  private underlineElem = this.q("slidy-underline")
  private tgmLogoIcon = this.q("c-tgm-logo")
  private backLinkComponents: ElementList<ThemAble> = new ElementList()

  constructor() { 
    super()
    
    
  }



  public updatePage(linkContents: string[], domainLevel: number) {
    return Promise.all([
      this.updateLinks(linkContents, domainLevel),
      this.updatePathDisplay(domainLevel)
    ])
  }

  public async updatePathDisplay (domainLevel: number) {
    if (!this.pathDisplayElem.childs(1, true).empty) {
      await this.pathDisplayElem.anim({opacity: 0, translateX: 5}, 500)
    }
    else {
      this.pathDisplayElem.css({opacity: 0})
    }
    this.pathDisplayElem.removeChilds()
    this.pathDisplayElem.css({translateX: -5})
    for (let i = 0; i < domainLevel; i++) {
      const domainFragment = domainIndex[i]

      this.pathDisplayElem.apd(new ArrowIcon(), new Link(lang.links[domainFragment], domainFragment, i))

    }
    await this.pathDisplayElem.anim({opacity: 1, translateX: .1}, 500)
    
  }



  private linksUpdated = false
  private currentLinkContents: string[]
  private currentLinkElems: ElementList<Link>
  private lastAnimationWrapper: HTMLElement
  private lastSelectedElem: Link
  private fadeInAnim: Promise<void>
  private inFadeInAnim: boolean = false

  private latestFadeRequest: Symbol
  public async updateLinks(linkContents: string[], domainLevel: number) {
    let lastLinkElems = this.currentLinkElems

    this.currentLinkContents = linkContents.clone()
    this.currentLinkElems = new ElementList()
    linkContents.ea((s) => {
      this.currentLinkElems.add(new Link(lang.links[s], s, domainLevel))
    })

    let fadeReq = this.latestFadeRequest = Symbol()
    if (this.inFadeInAnim) {
      await this.fadeInAnim
      if (fadeReq !== this.latestFadeRequest) {
        return
      }
    }

    this.linksUpdated = true
    this.inFadeInAnim = true
    let res: Function
    this.fadeInAnim = new Promise((r) => {
      res = r
    })
    
    let underlineFadeAnim: any

    let fadoutProm: Promise<any>
    let animationWrapper = ce("link-animation-wrapper")
    let lastAnimationWrapper = this.lastAnimationWrapper
    this.linkContainerElem.apd(animationWrapper)
    let lastLength: number

    if (lastLinkElems) {
      window.off("resize", this.resizeFn)
      let currentX = this.underlineElem.css("translateX")
      const baseDuration = 500
      let del = lastLinkElems.indexOf(this.lastSelectedElem) * (linkAnimationOffset / 2)
      let duration = del + baseDuration
      underlineFadeAnim = Promise.all([
        this.underlineElem.anim({opacity: 0}, duration),
        this.underlineElem.anim({marginLeft: 17}, duration).then(() => this.underlineElem.css({marginLeft: 0})),
        delay(del).then(() => this.underlineElem.anim({translateX: currentX + 3}, baseDuration))
      ])



      lastLength = lastLinkElems.length
      fadoutProm =  Promise.all([
        lastAnimationWrapper.anim({translateX: 17}, (linkFadeInDuration + (lastLength-1) * linkAnimationOffset) / 2),
        lastLinkElems.anim({opacity: 0, translateX: 3}, (linkFadeInDuration) / 2, linkAnimationOffset / 2)
      ]).then(() => {
        lastAnimationWrapper.remove()
      })
      
    }
    else lastLength = 0

    

    this.lastAnimationWrapper = animationWrapper


    let currentLength = this.currentLinkElems.length
    animationWrapper.apd(...this.currentLinkElems)
    
    await Promise.all([
      underlineFadeAnim,
      fadoutProm,
      delay(fadoutProm ? (400 + (((lastLength * linkAnimationOffset) / 2) - currentLength * linkAnimationOffset)) : 0).then(async () => {
        if (fadeReq !== this.latestFadeRequest) {
          animationWrapper.remove()
          return
        }

        return Promise.all([
          animationWrapper.anim({translateX: 0.1}, linkFadeInDuration + (currentLength-1) * linkAnimationOffset),
          this.currentLinkElems.anim({opacity: 1, translateX: .1}, linkFadeInDuration, linkAnimationOffset)
        ])
      })
    ])

    
    this.inFadeInAnim = false
    res()
  }

  public theme(): Theme
  public theme(to: Theme): void
  public theme(to?: Theme): any {
    this.currentLinkElems.Inner("theme", [to])
    return super.theme(to)
  }

  private resizeFn = () => {
    let bounds = this.lastSelectedElem.getBoundingClientRect()
    this.underlineElem.css({translateX: bounds.left, width: bounds.width})
  }

  private updateLinkAnimationToken: Symbol
  public async updateSelectedLink(newSelected: string) {



    


    let index = this.currentLinkContents.indexOf(newSelected)
    let elem = this.currentLinkElems[index]
    
    if (this.inFadeInAnim || this.linksUpdated) {
      let updateLinkToken = this.updateLinkAnimationToken = Symbol()  
      this.linksUpdated = false

      if (this.lastSelectedElem) this.lastSelectedElem.css({fontWeight: "normal"})

      this.lastSelectedElem = elem
      elem.css({fontWeight: "bold"})

      while (this.inFadeInAnim) {
        await this.fadeInAnim
      }

      if (updateLinkToken !== this.updateLinkAnimationToken) return

      let bounds = elem.getBoundingClientRect()
      this.underlineElem.css({translateX: bounds.left, width: bounds.width})
      window.on("resize", this.resizeFn)
      await this.underlineElem.anim({opacity: 1}, 700)

    }
    else {
      let index = this.currentLinkContents.indexOf(newSelected)
      let elem = this.currentLinkElems[index]
      let bounds = elem.getBoundingClientRect()
      
      if (this.lastSelectedElem) this.lastSelectedElem.css({fontWeight: "normal"})

      this.lastSelectedElem = elem
      elem.css({fontWeight: "bold"})
      await this.underlineElem.anim({translateX: bounds.left, width: bounds.width}, 500)
    }
  
  }

  

  stl() {
    return require("./header.css").toString()
  }
  pug() {
    return require("./header.pug").default
  }
})

// const totalUnderlineOverflow = 5
