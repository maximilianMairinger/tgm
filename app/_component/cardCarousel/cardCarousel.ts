import Component from "../component"
import declareComponent from "../../lib/declareComponent"
import Card from "../_themeAble/_card/iconCard/iconCard"

export default class CardCarousel extends Component {

  constructor(cards: Card[], wrap: boolean = true) {
    super()
    this.wrap(wrap)
    
    this.elementBody.append(...cards)
    this.elementBody.on("scroll", (e) => {
      console.log(e)
    })


    let mobile: boolean
    window.on("resize", (r) => {
      let currMobile = r.width < 1000
      if (currMobile) {
        if (!mobile || mobile === undefined) {
          // to mobile switch
          console.log("")
          onScroll()
          
          this.elementBody.on("scroll", onScroll)
        }
      }
      else if (mobile || mobile === undefined) {
        this.elementBody.off("scroll", onScroll)
        this.elementBody.apd(...cards)
      }

      mobile = currMobile
    })


    let lastCard = cards.last
    let onScroll = () => {
      if (this.elementBody.scrollWidth - this.elementBody.width() - lastCard.width() < this.elementBody.scrollLeft) {

        console.log("onscroll 1")

      }
      else if (this.elementBody.width() > this.elementBody.scrollLeft) {
        console.log("onscroll 2")
        // let beforeWidth = this.cardContainer.scrollWidth
        // this.cardContainer.prepend(...elems)
        // let afterWidth = this.cardContainer.scrollWidth
        // this.cardContainer.scrollBy(afterWidth - beforeWidth, 0)

      }
    }
  }

  private _wrap: boolean
  wrap(): boolean
  wrap(to?: boolean): this
  wrap(to?: boolean) {
    if (to !== undefined) {
      if (to !== this._wrap) {
        this._wrap = to
        if (to) {
          this.addClass("wrap")
        }
        else {
          this.removeClass("wrap")
        }
      }
      return this
    }
    return this._wrap
  }

  stl() {
    return require("./cardCarousel.css").toString()
  }

  pug() {
    return require("./cardCarousel.pug").default
  }

}

declareComponent("card-carousel", CardCarousel)
