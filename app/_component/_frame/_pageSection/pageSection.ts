import Frame from "../frame";
import { ScrollData } from "extended-dom"


export default abstract class PageSection extends Frame {
  constructor() {
    super()
    
  }

  public getLocalScrollProgressData(): ScrollData {
    console.warn("getLocalScrollProgress is not implemented by wrapper.")
    return new ScrollData
  }

  stl() {
    return super.stl() + require("./pageSection.css").toString()
  }
}