import declareComponent from "../../../../../../../../lib/declareComponent"
import AbendschulPage from "../erwachsenenTagesschulPage"

export default class AbendKollegPage extends AbendschulPage {
  constructor(baseLink: string, sectionChangeCallback?: (section: string) => void) {
    super(baseLink, {
      note: "das",
      heading: "Kolleg",
      subheading: "der Tagesschule"
    }, () => import(/* webpackChunkName: "ausmachtSection" */"../../../../../_pageSection/ausmachtSection/_tagAusmachtSection/tagKollegAusmachtSection/tagKollegAusmachtSection"), sectionChangeCallback)
  }
}

declareComponent("tag-kolleg-page", AbendKollegPage)
