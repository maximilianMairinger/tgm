import Frame from "../frame";


export default abstract class PageSection extends Frame {
  constructor() {
    super()

  }
  stl() {
    return super.stl() + require("./pageSection.css").toString()
  }
}