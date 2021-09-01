import declareComponent from "../../../../../../../../lib/declareComponent"
import AbendschulPage from "../tagesschulPage"

export default class AbendVorbereitungsPage extends AbendschulPage {
  constructor(baseLink: string, sectionChangeCallback?: (section: string) => void) {
    super(baseLink, {
      note: "der",
      heading: "Vorbereitungslehrgang",
      subheading: "der Tagesschule"
    }, () => import(/* webpackChunkName: "ausmachtSection" */"../../../../../_pageSection/ausmachtSection/_tagAusmachtSection/tagVorbereitungsAusmachtSection/tagVorbereitungsAusmachtSection"), sectionChangeCallback)
  }
}

declareComponent("tag-vorbereitungs-page", AbendVorbereitungsPage)
