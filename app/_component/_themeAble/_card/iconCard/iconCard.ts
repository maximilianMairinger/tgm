import Card from "../card"
import declareComponent from "../../../../lib/declareComponent"
import Icon, { iconIndex } from "./../../_icon/icon"
import { Data, DataSubscription } from "josm"
import Button from "./../../../_button/button"
import "./../../../_button/button"
import HighlightAbleIcon from "../../_icon/_highlightAbleIcon/highlightAbleIcon"
import * as domain from "../../../../lib/domain"
import delay from "delay"
import { currentLang } from "./../../../../lib/lang"


const descAvailCls = "description-available"

export default class IconCard extends Card {
  private iconContainer = this.q("icon-container")
  private headingContainer = this.q("heading-container > span") as HTMLElement
  private button = this.q("c-button") as Button
  private descContainer = this.q("desc-container")
  constructor(icon: Icon | keyof typeof iconIndex, heading: string | Data<string>, description: string | Data<string> = "", link: string = "") {
    super()
    this.button.preventFocus = true
    this.icon(icon)
    this.heading(heading)
    this.description(description)

    currentLang.get((lang) => {
      this.headingContainer.lang = lang
    })
    
    this.button.click(async () => {
      this.addClass("clicked")
      this.anim({opacity: 0, scale: 1.2}, 400).then(() => {this.css({opacity: 1, scale: 1})})

      domain.set(link)      
      
      
      delay(400).then(() => {
        this.removeClass("clicked")
        
      })
    })

    // if (icon instanceof HighlightAbleIcon) {
    //   this.on("mouseover", () => {
    //     icon.highlight()
    //   })
    //   this.on("mouseout", () => {
    //     icon.downlight()
    //   })
    // }
    

  }

  private enableWrapAll() {
    this.headingContainer.css("wordBreak", "break-all")
  }
  private disableWrapAll() {
    this.headingContainer.css("wordBreak", "normal")
  }

  private setWordBreakListenerFunction(to: string) {
    if (to.includes(" ")) {
      this.disableWrapAll()
      if (this.headingContainer.offsetWidth >= 225) this.enableWrapAll()
    }
    else this.enableWrapAll()
  }

  private setWordBreakListener = new DataSubscription(new Data(""), this.setWordBreakListenerFunction.bind(this), true, false)

  heading(): string
  heading(to: string | Data<string>): void
  heading(to?: string | Data<string>): any {
    if (to !== undefined) {
      this.headingContainer.text(to)
      if (to instanceof Data) this.setWordBreakListener.data(to)
      else this.setWordBreakListenerFunction(to)
    }
    else return this.headingContainer.text()
  }

  private updateDescAnim(desc: string) {
    if (desc !== "") this.addClass(descAvailCls)
    else this.removeClass(descAvailCls)
  }

  private subs = new DataSubscription(new Data(""), this.updateDescAnim.bind(this), false)
  description(): string
  description(to: string | Data<string>): void
  description(to?: string | Data<string>): any {
    if (to instanceof Data) this.subs.data(to).activate(true)
    else {
      this.subs.deactivate()
      this.updateDescAnim(to)
    }
    return this.descContainer.text(to)
  }

  icon(): Icon
  icon(to: Icon | keyof typeof iconIndex): Promise<void>
  icon(to?: Icon | keyof typeof iconIndex): any {
    if (to) {
      return (async () => {
        if (!(to instanceof Icon)) to = new (await iconIndex[to]() as any).default
        let first = this.iconContainer.childs(1, true).empty
        if (!first) await this.iconContainer.anim({opacity: 0})
        this.iconContainer.removeChilds()
        this.iconContainer.apd(to)
        if (!first) await this.iconContainer.anim({opacity: 1})
      })()
      
    }
    else this.iconContainer.childs()
  }


  stl() {
    return super.stl() + require("./iconCard.css").toString()
  }
  pug() {
    return require("./iconCard.pug").default
  }
}


declareComponent("icon-card", IconCard)

