import declareComponent from "../../../../../../../../lib/declareComponent"
import AbendschulPage from "../abendschulPage"

export default class AbendAufbauPage extends AbendschulPage {
  constructor(baseLink: string, sectionChangeCallback?: (section: string) => void) {
    super(baseLink, {
      note: "der",
      heading: "Aufbaulehrgang",
      subheading: "der Abendschule"
    }, () => import(/* webpackChunkName: "ausmachtSection" */"../../../../../_pageSection/ausmachtSection/_abendAusmachtSection/abendAufbauAusmachtSection/abendAufbauAusmachtSection"), sectionChangeCallback)
  }
}

declareComponent("abend-aufbau-page", AbendAufbauPage)
