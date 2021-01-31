import declareComponent from "../../../../../../../../lib/declareComponent"
import AbendschulPage from "../abendschulPage"
import "../../../../../../link/link"

export default class AbendVorbereitungsPage extends AbendschulPage {
  constructor(baseLink: string, sectionChangeCallback?: (section: string) => void) {
    super(baseLink, {
      note: "der",
      heading: "Werkmeisterlehrgang",
      subheading: "der Abendschule"
    }, () => import(/* webpackChunkName: "ausmachtSection" */"../../../../../_pageSection/ausmachtSection/_abendAusmachtSection/abendWerkmeisterAusmachtSection/abendWerkmeisterAusmachtSection"), sectionChangeCallback, 
    `Kein Problem - Arbeit und Lernen ist miteinander zu vereinbaren! Mit einer Ausbildung in der Höheren Lehranstalt für Berufstätige am TGM können Sie wie gewohnt Ihrem Beruf nachgehen und am Abend gemeinsam mit Gleichgesinnten lernen und Ihre beruflichen Zukunftsperspektiven erweitern. Unterstützt werden Sie dabei durch klare Unterrichtskonzepte mit Flexibilität, Blended Learning Szenarien, Verknüpfung von Theorie und Praxis, erfahrene und engagierte Lehrende, Expertinnen und Experten aus Wirtschaft und Industrie... <br>
    Ihr nächster Karriereschritt ist für Sie bei uns äußerst gut plan- und organisierbar!<br>
    <c-link link="/${baseLink}info/werkmeister-lehrgang-abend">Zum Lehrgang</c-link>`
    )
  }
}

declareComponent("abend-vorbereitungs-page", AbendVorbereitungsPage)
