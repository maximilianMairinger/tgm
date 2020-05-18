import Card from "../card"
import declareComponent from "../../../../lib/declareComponent"
import Icon from "./../../_icon/icon"
import { Data } from "josm"




export default class IconCard extends Card {
  private iconContainer = this.q("icon-container")
  private contentContainer = this.q("content-container")
  constructor(icon: Icon, content: string | Data<string>) {
    super()
    this.icon(icon)
    this.content(content)

  }

  content(): string
  content(to: string | Data<string>): void
  content(to?: string | Data<string>): any {
    this.contentContainer.text(to)
  }

  icon(): Icon
  icon(to: Icon): Promise<void>
  icon(to?: Icon): any {
    if (to) {
      return (async () => {
        let first = this.contentContainer.childs(1, true).empty
        if (!first) await this.contentContainer.anim({opacity: 0})
        this.contentContainer.removeChilds()
        this.contentContainer.apd(to)
        if (!first) await this.contentContainer.anim({opacity: 1})
      })()
      
    }
    else this.contentContainer.childs()
  }


  stl() {
    return super.stl() + require("./iconCard.css").toString()
  }
  pug() {
    return require("./iconCard.pug").default
  }
  
}


declareComponent("icon-card", IconCard)

