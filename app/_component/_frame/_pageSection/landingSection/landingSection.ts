import { declareComponent } from "../../../../lib/declareComponent"
import PageSection from "../pageSection"
import "./../../../_themeAble/_text/textblob/textblob"
import TextBlob from "./../../../_themeAble/_text/textblob/textblob"
import IconCard from "../../../_themeAble/_card/iconCard/iconCard";
import BioMedIcon from "../../../_themeAble/_icon/_highlightAbleIcon/bioMed/bioMed";
import { ElementList } from "extended-dom";
import scrollTo from "animated-scroll-to"
import * as animationFrameDelta from "animation-frame-delta"
import delay from "delay";
animationFrameDelta.ignoreUnsubscriptionError()

// TODO pagemanager propergate scroll position, so that the header underline can fade in / out in site

export default declareComponent("landing-section", class Landing extends PageSection {
  private cardContainer = this.q("card-container")
  
  private mainHeaderElem = this.q("text-container > c-textblob")
  private tagesschuleHeaderElem = this.q("tagesschule-container > c-textblob")
  private iconCards: ElementList<HTMLElement>
  constructor() {
    super()

    let initerLs = [
      () => new IconCard(new BioMedIcon, "Biomedizin1"), 
      () => new IconCard(new BioMedIcon, "Biomedizin2"), 
      () => new IconCard(new BioMedIcon, "Biomedizin3"), 
      () => new IconCard(new BioMedIcon, "Biomedizin4"), 
      () => new IconCard(new BioMedIcon, "Biomedizin5"), 
      () => new IconCard(new BioMedIcon, "Biomedizin6"), 
      () => new IconCard(new BioMedIcon, "Biomedizin7")
    ]

    let elems = this.iconCards = new ElementList(...initerLs.Call().replace((card) => ce("icon-card-wrapper").apd(card)))
    
    this.cardContainer.apd(...elems);

    let speed = 0
    const fullSpeed = 1
    let inifiniteScroll = (delta: number) => {
      this.cardContainer.scrollLeft += speed * delta
    }

    this.cardContainer.on("mouseenter", stopAnimation)
    this.cardContainer.on("mouseleave", () => {accelerate(500)})
    this.cardContainer.on("touchstart", stopAnimation)
    this.cardContainer.on("touchend", () => {accelerate(0)})

    function stopAnimation() {
      speed = 0
      accelerationToken = Symbol()
    }
    
    

    let accelerationToken: Symbol
    
    function accelerate(timeout: number, accelearationDuration = 300) {
      let token = accelerationToken = Symbol()
      setTimeout(() => {
        if (token === accelerationToken) {
          animationFrameDelta.subscribe((timeLeft) => {
            if (token === accelerationToken) {
              speed = fullSpeed * (timeLeft / accelearationDuration)
            }
          }, accelearationDuration)
        }
      }, timeout)
    }
    

    let mobile: boolean
    window.on("resize", (r) => {
      let currMobile = r.width < 1000
      if (currMobile) {
        if (!mobile || mobile === undefined) {
          // to mobile switch

          f()
          accelerate(230)
          animationFrameDelta.subscribe(inifiniteScroll)
          

          
          this.cardContainer.on("scroll", f)
        }
      }
      else if (mobile || mobile === undefined) {
        this.cardContainer.off("scroll", f)
        
        animationFrameDelta.unsubscribe(inifiniteScroll)
        // to desktop switch
        this.cardContainer.emptyNodes()

        this.cardContainer.apd(...elems)
      }

      mobile = currMobile
    })

    // let nextIndex = 0
    //initerLs[nextIndex - Math.floor(nextIndex / initerLs.length) * initerLs.length]()

    let lastElem = elems.last

    

    let f = () => {
      if (this.cardContainer.scrollWidth - this.cardContainer.width() - lastElem.width() < this.cardContainer.scrollLeft) {


        let elems = initerLs.Call()
        this.cardContainer.apd(...elems)
        lastElem = elems.last

      }
      else if (this.cardContainer.width() > this.cardContainer.scrollLeft) {
        let beforeWidth = this.cardContainer.scrollWidth
        let elems = initerLs.Call()
        this.cardContainer.prepend(...elems)
        let afterWidth = this.cardContainer.scrollWidth
        this.cardContainer.scrollBy(afterWidth - beforeWidth, 0)

      }
    }












    
  }

  initialActivationCallback() {
    delay(170).then(() => this.iconCards.anim({opacity: 1, translateY: .1}, 500, 60))
  }

  private currentlyShowingTagesschuleHeader = false
  private scrollProgAnimToken: Symbol
  scrollProgressCallback(e: number) {
    if (e > 200) {
      if (!this.currentlyShowingTagesschuleHeader) {
        let token = this.scrollProgAnimToken = Symbol()
        this.mainHeaderElem.anim({translateY: 20, opacity: 0, scale: .97}, 400).then(() => {if (token === this.scrollProgAnimToken) this.mainHeaderElem.hide().css({translateY: -20})})
        delay(140).then(() => {if (token === this.scrollProgAnimToken) this.tagesschuleHeaderElem.show().anim({opacity: 1, translateY: .1, scale: 1}, 550)})
        this.currentlyShowingTagesschuleHeader = true
      }
    }
    else if (e < 150) {
      if (this.currentlyShowingTagesschuleHeader) {
        let token = this.scrollProgAnimToken = Symbol()
        this.tagesschuleHeaderElem.anim({opacity: 0, translateY: 20, scale: .97}, 400).then(() => {if (token === this.scrollProgAnimToken) this.tagesschuleHeaderElem.hide().css({translateY: -20})})
        delay(140).then(() => {if (token === this.scrollProgAnimToken) this.mainHeaderElem.show().anim({translateY: .1, opacity: 1, scale: 1}, 550)})
        this.currentlyShowingTagesschuleHeader = false
      }
    }
  }

  protected activationCallback(active: boolean) {
    console.log("landing", active)
  }
  stl() {
    return super.stl() + require("./landingSection.css").toString()
  }
  pug() {
    return require("./landingSection.pug").default
  }
});
