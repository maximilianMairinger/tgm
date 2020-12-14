import Component from "../component"
import declareComponent from "./../../lib/declareComponent"


export default class Image extends Component {
  public readonly ready: Promise<void>
  constructor(src?: string) {
    super(ce("img") as any)
    this.ready = new Promise((res) => {
      (this.elementBody as any as HTMLImageElement).onload = () => {
        this.elementBody.anim({opacity: 1})
        res()
      }
    })
    
    if (src) this.src(src)
    
  }


  src(src: string) {
    if (!src.startsWith("/")) src = "/res/img/" + src;
    (this.elementBody as any as HTMLImageElement).src = src
  }


  stl() {
    return require("./image.css").toString()
  }

  pug() {
    return require("./image.pug").default
  }

}

declareComponent("image", Image)