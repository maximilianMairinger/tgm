import Frame from "../frame";


export default abstract class PageSection extends Frame {
  constructor() {
    super()

  }

  public scrollProgressCallback?(relativeProgress: number): void

  stl() {
    return super.stl() + require("./pageSection.css").toString()
  }
}