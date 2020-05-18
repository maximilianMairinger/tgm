import Card from "../card"
import declareComponent from "../../../../lib/declareComponent"
import Icon from "./../../_icon/icon"
import { Data } from "josm"
import Button from "./../../../_button/button"
import "./../../../_button/button"




export default class IconCard extends Card {
  private iconContainer = this.q("icon-container")
  private contentContainer = this.q("content-container")
  private button = this.q("c-button") as Button
  constructor(icon: Icon, content: string | Data<string>, link: string = "versuchsanstalt") {
    super()
    this.icon(icon)
    this.content(content)
    this.button.link(link)

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

