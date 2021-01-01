import Component from "../component"
import declareComponent from "./../../lib/declareComponent"
import { InstanceRecord } from "../../lib/record"
const _record = new InstanceRecord(() => console.warn("img load without init proxy"))
export const record = _record as Omit<typeof _record, "add">

export default class Image extends Component {
  public readonly ready: Promise<void>
  constructor(src?: string, forceLoad?: boolean) {
    super(ce("img") as any)
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
      if (!src.startsWith("/")) src = "/res/img/" + src;
      (this.elementBody as any as HTMLImageElement).src = src
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