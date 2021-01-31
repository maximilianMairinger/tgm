import declareComponent from "../../../../../../../../lib/declareComponent"
import AbendschulPage from "../abendschulPage"

export default class AbendVorbereitungsPage extends AbendschulPage {
  constructor(baseLink: string, sectionChangeCallback?: (section: string) => void) {
    super(baseLink, {
      note: "der",
      heading: "Werkmeisterlehrgang",
      subheading: "der Abendschule"
    }, () => import(/* webpackChunkName: "ausmachtSection" */"../../../../../_pageSection/ausmachtSection/_abendAusmachtSection/abendVorbereitungsAusmachtSection/abendVorbereitungsAusmachtSection"), sectionChangeCallback)
  }
}

declareComponent("abend-vorbereitungs-page", AbendVorbereitungsPage)
