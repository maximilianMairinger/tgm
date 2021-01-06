import Component from "../component"
import declareComponent from "./../../lib/declareComponent"
import { InstanceRecord } from "../../lib/record"
import { ElementList } from "extended-dom"
const _record = new InstanceRecord(() => console.warn("img load without init proxy"))
export const record = _record as Omit<typeof _record, "add">
const unionSymbol = "@"
const typePrefix = "image/"

const formats = [
  "avif",
  "webp",
  "jpg"
]

const res = "3K"


const whenPossibleFormats = formats.slice(0, -1)
const fallbackFormat = formats.last

export default class Image extends Component {
  public readonly ready: Promise<void>
  private elems = new ElementList<HTMLElement & {setSource: (to: string) => string}>()
  private img: HTMLImageElement & {setSource: (to: string) => string}
  constructor(src?: string, forceLoad?: boolean) {
    super(ce("picture"))

    for (let format of whenPossibleFormats) {
      const elem = ce("source") as HTMLSourceElement & {setSource: (to: string) => string}
      elem.type = typePrefix + format
      elem.setSource = (to: string) => elem.srcset = to + format
      this.elems.add(elem)  
    }

    this.img = ce("img") as HTMLImageElement & {setSource: (to: string) => string}
    this.img.setSource = (to) => this.img.src = to + fallbackFormat
    this.elems.add(this.img as any)


    
    this.ready = new Promise((res) => {
      (this.elementBody as any as HTMLImageElement).onload = () => {
        this.elementBody.anim({opacity: 1})
        res()
      }
    })
    
    if (src) this.src(src, forceLoad)
  }


  src(src: string, forceLoad: boolean = false) {
    if (forceLoad) {
      const pointIndex = src.indexOf(".")
      if (pointIndex !== -1) src = src.slice(0, pointIndex)
      if (!src.startsWith("/")) src = "/res/img/" + src
      this.elems.Inner("setSource", [src + unionSymbol + res + "."])
    }
    else {
      _record.add(() => {
        this.src(src, true)
      })
    }
    
  }


  stl() {
    return require("./image.css").toString()
  }

  pug() {
    return require("./image.pug").default
  }

}

declareComponent("image", Image)