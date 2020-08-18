import { declareComponent } from "../../../../lib/declareComponent"
import Page from "../page"
import { Data } from "josm"
import "./../../../_themeAble/_icon/filledArrow/filledArrow"

const vienna = {
  path: {
    a: "M615.92 444.096C605.612 446.797 602.559 429.951 589.935 424.01C580.73 419.678 572.468 423.815 563.949 416.331C514.557 372.942 546.607 414.492 488.68 365.281C447.656 333.672 424.219 290.269 402.853 275.801C329.1 213.798 273.864 90.6327 273.864 90.6327C270.042 84.2414 272.138 82.3926 275.722 84.1927C282.101 87.4055 285.297 98.5394 291.161 98.4371C296.475 98.3444 286.861 83.9984 299.338 83.7807C309.426 83.6047 307.847 78.5304 307.709 70.6489C307.55 61.5115 315.792 52.1199 315.014 45.3809C312.6 35.3613 304.429 28.6711 307.709 23.3011C326.867 -8.09633 332.337 28.2152 345.312 15.9968C346.967 14.4217 352.864 4.08628 367.711 4.34994C381.648 4.59624 399.178 8.01912 399.073 21.3667C398.76 61.3026 445.346 115.396 454.629 115.234C475.987 114.861 454.32 77.8525 480.459 77.3964C501.518 77.029 497.728 82.8149 504.11 82.7036C521.644 82.3977 513.289 87.4723 513.773 115.234C513.85 119.599 518.171 140.789 526.318 143.17C539.965 147.158 567.389 133.456 567.702 151.366C567.782 155.992 569.839 168.358 567.701 175.512C566.447 179.588 562.367 176.766 559.23 182.097C555.239 188.185 560.289 192.818 566.133 193.385C589.797 193.385 578.753 212.819 574.918 226.311C566.467 256.031 556.32 295.946 560.368 328.224C562.054 337.944 549.504 334.809 551.701 342.648C554.211 352.996 575.667 335.436 574.917 359.581C575.039 378.082 589.93 383.443 604.275 383.193C611.078 383.074 620.143 382.55 620.404 397.522C620.665 412.495 629.361 439.618 615.92 444.096Z",
    b: "M39.6803 160.145C41.7076 148.595 44.3816 142.013 54.7392 151.365C59.8727 155.999 65.552 159.883 72.4536 164.587C77.1548 168.037 79.0422 179.69 87.368 178.437C89.9525 178.527 95.7384 178.322 94.8979 184.029C94.4313 187.204 94.2157 186.37 92.013 190.683C89.3551 195.887 94.9656 198.73 101.24 199.357C112.534 199.984 113.703 199.93 122.193 195.575C124.06 194.273 120.977 189.029 122.193 185.54C123.528 181.713 129.15 182.59 132.786 178.014C134.426 175.951 133.784 168.719 135.683 166.095C140.449 159.52 151.214 166.653 157.017 160.135C164.256 152.008 163.506 142.246 163.606 134.108C163.739 127.31 167.684 119.997 179.92 119.683C186.43 119.219 190.273 120.31 198.745 119.683C206.902 119.369 214.605 111.677 220.706 109.648C226.11 107.851 235.791 109.298 238.903 106.826C242.051 104.327 238.347 97.9184 242.355 96.087C249.644 92.7554 261.452 92.6156 264.27 96.087C272.034 105.65 304.696 194.44 371.798 259.089C454.34 338.612 435.418 344.172 518.751 397.909C584.963 433.117 543.841 442.689 523.231 417.612C501.726 392.356 462.299 391.64 443.482 425.672C426.457 456.123 394.198 414.925 392.406 467.766C392.406 485.013 395.991 496.426 264.269 451.645C237.452 440.856 243.897 480.132 209.098 478.731C190.93 477.998 170.123 449.781 148.995 446.488C141.274 445.285 130.952 458.36 121.424 459.21C108.54 460.356 96.2831 450.368 85.9002 456.029C75.2422 461.842 65.7526 479.347 54.6176 473.518C48.7858 469.808 57.2687 463.449 60.9803 459.21C79.0078 442.789 40.8316 400.923 18.5627 378.664C-29.6558 338.885 30.693 359.682 35.9159 314.426C36.9341 305.601 40.1252 290.323 37.4845 278.363C34.7624 266.037 19.8504 256.374 15.5287 244.184C11.3893 232.524 17.8483 218.346 18.5684 207.495C20.5315 177.864 38.739 175.197 39.6803 160.145Z"
  },
  offset: {
    x: 257,
    y: 285
  }
}


const scrollPositionAnimationStart = 100

const tgmPosition = {
  x: -280,
  y: 0,
}


export default declareComponent("maxs-sandbox", class extends Page {
  private mapElem = this.q("svg g#map")
  private allSvg = this.q("svg g#all")
  private mapPointer = this.q("map-pointer")
  private mapPointerWrapper = this.q("map-pointer-wrapper")
  private mapPointerCenter = this.q("map-pointer-center")
  private mapPaths = this.mapElem.childs()

  constructor() {
    super()
    this.mapPaths.css({fillOpacity: 1, fill: "unset"})

    setTimeout(() => {
      this.elementBody.scrollTop = 900
    }, 100)

    let guide = this.elementBody.scrollData()
    let mapOptions = {start: new Data(scrollPositionAnimationStart), end: new Data(scrollPositionAnimationStart + 700)}


    this.mapPaths[0].anim({d: vienna.path.a, translateY: vienna.offset.y, translateX: vienna.offset.x}, mapOptions, guide)
    this.mapPaths[1].anim({d: vienna.path.b, translateY: vienna.offset.y, translateX: vienna.offset.x}, mapOptions, guide)

    this.mapPointerWrapper.anim({opacity: 1, translateY: .1}, {start: scrollPositionAnimationStart + 650, end: scrollPositionAnimationStart + 770}, guide)


    let scale = 1.5
    
    let ajustedScale = scale - 1
    let trans = 50 * ajustedScale
    let transStr = "-" + trans + "%"

    const arrowWidthHalf = 38.025 / 2
    const arrowHeightHalf = 39.6 / 2

    const posUnscaled = {
      x: tgmPosition.x,
      y: tgmPosition.y
    }


    const posScaled = {
      x: (tgmPosition.x + arrowWidthHalf) * scale,
      y: (tgmPosition.y + arrowHeightHalf) * scale
    }

    
    

    
    this.mapPointer.css({translateX: tgmPosition.x, translateY: tgmPosition.y})

    let mobile: boolean
    let midDesk: boolean
    let inMapPointerAnim = false
    window.on("resize", (q) => {
      if (q.width < 1300) {
        if (q.width < 978) {
          let ddX = (q.width / 978)
          let x = (posScaled.x * ddX)

          if (!mobile) {
            mobile = true
            
            
            let lastWidth = q.width
            const mapPointerAnim = async (o: {translateX: number, translateY: number}, short: boolean = false) => {
              await this.mapPointer.anim(o, short ? 50 : undefined)
              let nowWidth = window.innerWidth
              if (nowWidth !== lastWidth) {
                lastWidth = nowWidth


                let ddX = nowWidth / 978
                let x = (posScaled.x * ddX)
                await mapPointerAnim({translateX: x, translateY: posScaled.y}, true)
              }

              
            }
            inMapPointerAnim = true
            mapPointerAnim({translateX: x, translateY: posScaled.y}, ).then(() => {
              inMapPointerAnim = false
            })



            this.mapPointerCenter.anim({left: 120, width: "100%"})
            this.mapElem.anim({scale, translateX: transStr, translateY: transStr})
            console.log("mob")
          }
          else {
            if (!inMapPointerAnim) {
              this.mapPointer.css({translateX: x})
            }
          }

          
        }
        else {
          if (mobile || mobile === undefined) {
            mobile = false
  
            this.mapPointerCenter.anim({left: 257, width: 623.41})
            this.mapPointer.anim({translateX: posUnscaled.x, translateY: posUnscaled.y})
            this.mapElem.anim({scale: 1, translateX: 0.1, translateY: 0.1})
            console.log("des")
          }
        }


        if (!midDesk) {
          midDesk = true
          this.mapPointerCenter.anim({translateX: -120})
          this.allSvg.anim({translateX: -120})
        }
      }
      else {
        if (midDesk || midDesk === undefined) {
          midDesk = false
          this.mapPointerCenter.anim({translateX: .1})
          this.allSvg.anim({translateX: .1})
        }
      }
      
    })



    

    




  }

  protected activationCallback(active: boolean): void {
    
  }
  stl() {
    return super.stl() + require("./maxsSandbox.css").toString()
  }
  pug() {
    return require("./maxsSandbox.pug").default
  }

}) 