import declareComponent from "../../../../../../../../lib/declareComponent"
import AbendschulPage from "../abendschulPage"

export default class AbendKollegPage extends AbendschulPage {
  constructor(baseLink: string, sectionChangeCallback?: (section: string) => void) {
    super(baseLink, {
      note: "das",
      heading: "Kolleg",
      subheading: "der Abendschule"
    }, () => import(/* webpackChunkName: "ausmachtSection" */"../../../../../_pageSection/ausmachtSection/_abendAusmachtSection/abendKollegAusmachtSection/abendKollegAusmachtSection"), sectionChangeCallback)
  }
}

declareComponent("abend-kolleg-page", AbendKollegPage)
