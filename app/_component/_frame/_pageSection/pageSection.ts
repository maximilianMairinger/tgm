import Frame from "../frame";


export default abstract class PageSection extends Frame {
  constructor() {
    super()
    
  }

  public scrollProgressCallback?(relativeProgressTopScreen: number, relativeProgressBottomScreen: number): void

  stl() {
    return super.stl() + require("./pageSection.css").toString()
  }
}