import declareComponent from "../../../../../../../../lib/declareComponent"
import AbendschulPage from "../erwachsenenTagesschulPage"

export default class AbendAufbauPage extends AbendschulPage {
  constructor(baseLink: string, sectionChangeCallback?: (section: string) => void) {
    super(baseLink, {
      note: "der",
      heading: "Aufbaulehrgang",
      subheading: "der Tagesschule"
    }, () => import(/* webpackChunkName: "ausmachtSection" */"../../../../../_pageSection/ausmachtSection/_tagAusmachtSection/tagAufbauAusmachtSection/tagAufbauAusmachtSection"), sectionChangeCallback)
  }
}

declareComponent("tag-aufbau-page", AbendAufbauPage)
