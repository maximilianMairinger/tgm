import Page from "../page";

type QuerySelector = string
export default abstract class SectionedPage extends Page {
  constructor(public sectionIndex: {[name: string]: HTMLElement | QuerySelector}) {
    super()

  }
}