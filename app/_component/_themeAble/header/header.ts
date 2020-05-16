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


  private linksUpdated = false
  private currentLinkContents: string[]
  private currentLinkElems: ElementList<Link>
  private lastAnimationWrapper: HTMLElement
  private lastSelectedElem: Link
  private fadeInAnim: Promise<void>
  private inFadeInAnim: boolean = false

  private latestFadeRequest: Symbol
  public async updateLinks(linkContents: string[], domainLevel: number) {
    // await this.updateSectionProm
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

    if (this.currentLinkElems) {
      window.off("resize", this.resizeFn)
      // let currentX = this.underlineElem.css("translateX")
      // const baseDuration = 500
      // let del = this.currentLinkElems.indexOf(this.lastSelectedElem) * (linkAnimationOffset / 2) - 100
      // let duration = del + baseDuration
      // underlineFadeAnim = Promise.all([
      //   this.underlineElem.anim({opacity: 0}, duration),
      //   this.underlineElem.anim({marginLeft: 20}, duration).then(() => this.underlineElem.css({marginLeft: 0})),
      //   delay(del).then(() => this.underlineElem.anim({translateX: currentX + 15}, baseDuration))
      // ])
      
      
    }
    

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
      underlineFadeAnim,
      fadoutProm,
      delay(fadoutProm ? (200 + (((lastLength * linkAnimationOffset) / 2) - currentLength * linkAnimationOffset)) : 0).then(async () => {
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
  private updateSectionProm: Promise<void>
  public async updateSelectedLink(newSelected: string) {
    // let res: Function
    // this.updateSectionProm = new Promise((r) => {
    //   res = r
    // })


    // let index = this.currentLinkContents.indexOf(newSelected)
    // let elem = this.currentLinkElems[index]
    
    // if (this.inFadeInAnim || this.linksUpdated) {
    //   let updateLinkToken = this.updateLinkAnimationToken = Symbol()
    //   this.linksUpdated = false
    //   console.log("set")
    //   this.lastSelectedElem = elem
    //   elem.css({fontWeight: "bold"})
    //   while (this.inFadeInAnim) {
    //     await this.fadeInAnim
    //     await delay(0)
    //   }

    //   if (updateLinkToken !== this.updateLinkAnimationToken) return
      

    //   let bounds = elem.getBoundingClientRect()
    //   this.underlineElem.css({translateX: bounds.left, width: bounds.width})
    //   window.on("resize", this.resizeFn)
    //   await this.underlineElem.anim({opacity: 1}, 700)

    // }
    // else {
    //   let index = this.currentLinkContents.indexOf(newSelected)
    //   let elem = this.currentLinkElems[index]
    //   let bounds = elem.getBoundingClientRect()
      
    //   if (this.lastSelectedElem) {
    //     this.lastSelectedElem.css({fontWeight: "normal"})
    //   }

    //   this.lastSelectedElem = elem
    //   elem.css({fontWeight: "bold"})
    //   await this.underlineElem.anim({translateX: bounds.left, width: bounds.width}, 500)
    // }
    


    
    // res()
  }

  

  stl() {
    return require("./header.css").toString()
  }
  pug() {
    return require("./header.pug").default
  }
})

const totalUnderlineOverflow = 5
