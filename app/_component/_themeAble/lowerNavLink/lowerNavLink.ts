import ThemAble, { Theme } from "../themeAble"
import declareComponent from "../../../lib/declareComponent"
import { ElementList } from "extended-dom"
import "./../../_button/button"
import Button from "./../../_button/button"
import Icon from "../_icon/icon"
import lang from "./../../../lib/lang"
import { Data } from "josm"

const iconIndex = {
  abendschule: () => import("./../_icon/bioMed/bioMed"),
  tagesschule: () => import("./../_icon/bioMed/bioMed"),
  versuchsanstalt: () => import("./../_icon/bioMed/bioMed"),
}


export default class LowerNavLink extends ThemAble {
  private buttonElem = this.q("c-button") as Button
  private textElem = this.q("text-container")
  private iconContainer = this.q("icon-container")

  /**
   * @param link href; this will be used as pointer for the icon Index & language
   * @param domainLevel domainLevel the link referes to
   * @param content override language interpolation from link
   * @param icon override icon interpolation from link
   */
  constructor(link: keyof typeof iconIndex, domainLevel?: number, content?: keyof typeof iconIndex | Data<keyof typeof iconIndex>, icon?: keyof typeof iconIndex)
  constructor(link: string, domainLevel?: number, content?: string, icon?: keyof typeof iconIndex)
  constructor(link: string, domainLevel: number = 0, content?: string | Data<string>, icon?: keyof typeof iconIndex) { 
    super()

    this.content(content)
    this.icon(icon)

    this.buttonElem.link(link, domainLevel)
  }



  public link(): string
  public link(link: keyof typeof iconIndex, domainLevel?: number): void
  public link(link: string, domainLevel?: number): void
  public link(link?: string, domainLevel?: number): any {
    if (this.content() === undefined) {
      this.content(lang.links[link])
    }
    else if (this.icon() === undefined) {
      this.icon(link)
    }
  }

  public href(): string
  public href(href: string, domainLevel?: number): void
  public href(href?: string, domainLevel?: number): any {
    return this.buttonElem.link(href, domainLevel)
  }

  public content(): string
  public content(content: string | Data<string>): void
  public content(content: string | Data<string>): void
  public content(content?: string | Data<string>): any {
    return this.textElem.text(content)
  }


  private currentIconName: string

  public icon(): string
  public icon(icon: string): void
  public icon(icon?: string): any {
    if (icon !== undefined) {
      let ic = iconIndex[icon]
      if (ic === undefined) console.warn("Unknown Icon: \"" + icon + "\".")
      else {
        this.currentIconName = icon
        this.iconContainer.html(iconIndex[icon]().default)
      }
      
    }
    else return this.currentIconName
  }


  

  stl() {
    return require("./lowerNavLink.css").toString()
  }
  pug() {
    return require("./lowerNavLink.pug").default
  }
}


declareComponent("lower-nav-link", LowerNavLink)