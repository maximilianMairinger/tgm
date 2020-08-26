import Frame from "../frame";
import { ScrollData } from "extended-dom"


export default abstract class PageSection extends Frame {
  constructor() {
    super()
    
  }
  public localScrollProgressData?: ScrollData
  public getLocalScrollProgressData(): ScrollData {
    if (this.localScrollProgressData) return this.localScrollProgressData
    return this.localScrollProgressData = new ScrollData
  }

  stl() {
    return super.stl() + require("./pageSection.css").toString()
  }
}