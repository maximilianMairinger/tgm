import declareComponent from "../../../../../../../../lib/declareComponent"
import AbendschulPage from "../abendschulPage"

export default class AbendVorbereitungsPage extends AbendschulPage {
  constructor(baseLink: string, sectionChangeCallback?: (section: string) => void) {
    super(baseLink, () => import(/* webpackChunkName: "ausmachtSection" */"../../../../../_pageSection/ausmachtSection/_abendAusmachtSection/abendAufbauAusmachtSection/abendAufbauAusmachtSection"), sectionChangeCallback)
  }
}

declareComponent("abend-vorbereitungs-page", AbendVorbereitungsPage)
