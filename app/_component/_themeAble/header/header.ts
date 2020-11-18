import ThemeAble, { Theme } from "../themeAble"
import declareComponent from "../../../lib/declareComponent"
import "../_icon/tgmLogo/tgmLogo"
import "../../_themeAble/_button/button"
import Link from "../link/link"
import { ElementList } from "extended-dom"
import { lang } from "../../../lib/lang"
import delay from "delay"
import { domainIndex } from "./../../../lib/domain"
import "./../_icon/arrow/arrow"
import ArrowIcon from "./../_icon/arrow/arrow"
import Icon from "../_icon/icon"
import SlidyUnderline from "./../slidyUnderline/slidyUnderline"
import keyIndex from "key-index"


const linkAnimationOffset = 170
const linkFadeInDuration = 800

const notTopClassName = "blurry"

const slidyLineStretchFactor = .7
const slidyLineStretchOffset = slidyLineStretchFactor / 2
const slidyLineStretchDuration = slidyLineStretchFactor * 1000



const pathDisplayLinkIndex = keyIndex((i: number) => 
  [new ArrowIcon, new Link("", "", undefined, true, false, false)] as [arrow: ArrowIcon, link: Link]
)

const linksIndex = keyIndex((toggle: boolean) => keyIndex((i: number) => 
  new Link("", "", undefined, true, false, false)
))

export default class Header extends ThemeAble {
  private pathDisplayElem = this.q("path-display")
  private linkContainerElem = this.q("right-content")
  private leftContent = this.q("left-content")
  private underlineElem = new SlidyUnderline
  private background = this.q("blurry-background")
  private tgmLogoIcon = this.q("c-tgm-logo") as Icon
  // private backLinkComponents: ElementList<ThemAble> = new ElementList()

  constructor(public linksShownChangeCallback?: (linksShown: boolean, init: boolean, func: any) => void) { 
    super()
    this.linkContainerElem.apd(this.underlineElem)
    
    window.on("resize", this.resizeHandler.bind(this))
  }


  theme(): Theme
  theme(to: Theme): this
  theme(to?: Theme): any {
    this.tgmLogoIcon.theme(to)

    if (!this.dontChangeDisplayTheme) this.updateThemeOfPathDisplay(to)
    if (!this.dontChangeLinksTheme) {
      this.updateThemeOfLinks(to)
      this.updateUnderlineTheme(to)
    }

    return super.theme(to)
  }

  private updateThemeOfPathDisplay(to: Theme) {
    this.currentPathDisplayElems.Inner("theme", [to])
  }

  private updateUnderlineTheme(to: Theme) {
    console.log("--------------------------------", to)
    this.underlineElem.theme(to)
  }

  private updateThemeOfLinks(to: Theme) {
    this.currentLinkElems.Inner("theme", [to])
  }


  private isLinkContainerCurrentlyHidden: boolean
  private initialResize = true
  private resizeHandler(q: {width: number}) {
    if (this.currentLinkElems) {
      
      let linksLeft: number = !this.currentLinkElems.empty ? this.currentLinkElems.first.getBoundingClientRect().left : q.width - 200
      let logo = this.pathDisplayElem.getBoundingClientRect()

      let margin = 100 + (this.isLinkContainerCurrentlyHidden ? 80 : 0)
      if (linksLeft < logo.right + margin) {
        if (!this.isLinkContainerCurrentlyHidden) {
          this.isLinkContainerCurrentlyHidden = true
          let func: "css" | "anim" = this.initialResize ? "css" : "anim"
          this.linkContainerElem[func as any]({opacity: 0})
          this.leftContent[func as any]({left: "8vw"})
          if (this.linksShownChangeCallback) this.linksShownChangeCallback(false, this.initialResize, func)
          this.initialResize = false
        }
      }
      else {
        if (this.isLinkContainerCurrentlyHidden || this.isLinkContainerCurrentlyHidden === undefined) {
          this.isLinkContainerCurrentlyHidden = false
          let func: "css" | "anim" = this.initialResize ? "css" : "anim"
          this.linkContainerElem[func as any]({opacity: 1})
          this.leftContent[func as any]({left: 100})
          if (this.linksShownChangeCallback) this.linksShownChangeCallback(true, this.initialResize, func)
          this.initialResize = false
        }
      }
    }
  }


  public onTop() {
    this.css("pointerEvents", "none")
    this.background.removeClass(notTopClassName)
  }

  public notTop() {
    this.css("pointerEvents", "all")
    this.background.addClass(notTopClassName)
  }



  public updatePage(linkContents: string[], domainLevel: number) {
    return Promise.all([
      this.updateLinks(linkContents, domainLevel),
      this.updatePathDisplay(domainLevel)
    ])
  }

  private currentPathDisplayElems = []
  private dontChangeDisplayTheme = false 
  public async updatePathDisplay (domainLevel: number) {
    this.dontChangeDisplayTheme = true
    if (!this.currentPathDisplayElems.empty) {
      await this.pathDisplayElem.anim({opacity: 0, translateX: 5}, 500)
    }
    else {
      this.pathDisplayElem.css({opacity: 0})
    }
    this.pathDisplayElem.removeChilds()
    this.pathDisplayElem.css({translateX: -5})
    for (let i = 0; i < domainLevel; i++) {
      const elems = pathDisplayLinkIndex(i)
      const linkElem: Link = elems[1]
      linkElem.domainLevel = i
      linkElem.content(lang.links[domainIndex[i]])
      linkElem.link(domainIndex[i])
      this.currentPathDisplayElems.add(...elems)
    }
    this.updateThemeOfPathDisplay(super.theme())
    this.dontChangeDisplayTheme = false
    this.pathDisplayElem.apd(...this.currentPathDisplayElems)
    await this.pathDisplayElem.anim({opacity: 1, translateX: .1}, 500)
    
  }



  private linksUpdated = false
  private currentLinkContents: string[]
  private currentLinkElems: ElementList<Link>
  private lastAnimationWrapper: HTMLElement
  private lastSelectedElem: Link
  private fadeInAnim: Promise<void>
  private inFadeInAnim: boolean = false
  private dontChangeLinksTheme = false

  private linkNamespaceToggleBool = false

  private latestFadeRequest: Symbol
  public async updateLinks(linkContents: string[], domainLevel: number) {
    let lastLinkElems = this.currentLinkElems
    this.currentLinkContents = linkContents.clone()
    this.currentLinkElems = new ElementList()
    this.dontChangeLinksTheme = true

    const elementIndex = linksIndex(this.linkNamespaceToggleBool)
    linkContents.ea((s, i) => {
      const elem = elementIndex(i)
      elem.content(lang.links[s])
      elem.domainLevel = domainLevel
      elem.link(s)

      this.currentLinkElems.add(elem)
    })

    this.linkNamespaceToggleBool = !this.linkNamespaceToggleBool

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
    
    this.resizeHandler({width: this.clientWidth})
    if (this.currentLinkElems.empty) return
    
    
    await Promise.all([
      underlineFadeAnim,
      fadoutProm,
      delay(fadoutProm ? (400 + (((lastLength * linkAnimationOffset) / 2) - currentLength * linkAnimationOffset)) : 0).then(async () => {
        this.updateThemeOfLinks(super.theme())
        this.dontChangeLinksTheme = false

        if (fadeReq !== this.latestFadeRequest) {
          animationWrapper.remove()
          return
        }

        return Promise.all([
          animationWrapper.anim({translateX: .1}, linkFadeInDuration + (currentLength-1) * linkAnimationOffset),
          this.currentLinkElems.anim({opacity: 1, translateX: .1}, linkFadeInDuration, linkAnimationOffset)
        ])
      })
    ])

    this.inFadeInAnim = false
    res()


    
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
      console.log("now")
      this.updateUnderlineTheme(super.theme())
      await this.underlineElem.anim({opacity: 1}, 700)

    }
    else {
      let index = this.currentLinkContents.indexOf(newSelected)
      let elem = this.currentLinkElems[index]
      let thisBounds = elem.getBoundingClientRect()
      let lastBounds = this.lastSelectedElem.getBoundingClientRect()
      
      if (this.lastSelectedElem) this.lastSelectedElem.css({fontWeight: "normal"})

      this.lastSelectedElem = elem
      elem.css({fontWeight: "bold"})

      if (thisBounds.left < lastBounds.left) {
        let width = (lastBounds.right - thisBounds.left) * slidyLineStretchFactor
        await this.underlineElem.anim([
          {translateX: thisBounds.left, width, offset: 1 - slidyLineStretchOffset}, 
          {translateX: thisBounds.left, width: thisBounds.width}
        ], slidyLineStretchDuration)  
      }
      else {
        let width = (thisBounds.right - lastBounds.left) * slidyLineStretchFactor
        await this.underlineElem.anim([
          {translateX: lastBounds.left, width, offset: slidyLineStretchOffset}, 
          {translateX: thisBounds.left, width: thisBounds.width}
        ], slidyLineStretchDuration)
      }
    }
  
  }

  

  stl() {
    return super.stl() + require("./header.css").toString()
  }
  pug() {
    return require("./header.pug").default
  }
}
declareComponent("header", Header)
