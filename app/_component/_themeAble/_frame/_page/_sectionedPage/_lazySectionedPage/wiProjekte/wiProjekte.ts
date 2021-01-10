import { declareComponent } from "../../../../../../../lib/declareComponent"
import LazySectionedPage from "../lazySectionedPage"
import { ImportanceMap, Import } from "../../../../../../../lib/lazyLoad"
import WrapperSection from "../../../../_pageSection/wrapperSection/wrapperSection"
import Thumbnail from "../../../../../_text/_thumbnail/thumbnail";
import InformationenSection from "../../../../../_text/_sectionTextblob/informationenSection/projekteInformationSection/projekteInformationSection";
import ProjekteSection from "../../../../_pageSection/schuelerprojekteSection/schuelerprojekteSection";
import {Project} from "../../../../../_text/tabletBlob/tabletBlob";
import Footer from "../../../../_pageSection/footer/footer"


export default declareComponent("wirtschaftsingenieure-projekte", class RaumfahrtProjekte extends LazySectionedPage {
  constructor(baseLink: string, sectionChangeCallback?: (section: string) => void) {
    
    super(new ImportanceMap<() => Promise<any>, any>(
      {
        key: new Import("", 1, (thumbnail: typeof Thumbnail) => {
          let e = new thumbnail();
          e.note("Bemerkenswerte")
          e.heading("Diplomarbeiten");
          e.subheading("der WI");
          e.background('wiProject.png');
          return new WrapperSection(e, 'dark') as any;
        }), val: () => import(/* webpackChunkName: "thumbnail" */"../../../../../_text/_thumbnail/thumbnail")
      },
      {
        key: new Import("info", 1, (Information: typeof Element) =>
        {
          let info = new (Information as typeof InformationenSection)();
          info.content("Im 5. Jahrgang haben die Schülerinnen und Schüler die Möglichkeit Praxisluft zu schnuppern und ihr Wissen aus den fachtheoretischen und fachpraktischen Gegenständen im Rahmen einer Diplomarbeit umzusetzen. Die Diplomarbeiten werden fast ausschließlich mit externen Firmen durchgeführt wobei die Schülerinnen und Schüler in Projektteams zusammenarbeiten. Da die Ausbildung der Wirtschaftsingenieure sehr breit gefächert ist, sind Themen aus dem Bereich des Maschinenbaus, der Logistik, der IT, der Elektrotechnik, ja sogar aus dem medizinischen Bereich möglich.")
          return new WrapperSection(info);
        }
        ), val: () => import(/* webpackChunkName: "info" */"../../../../../_text/_sectionTextblob/informationenSection/projekteInformationSection/projekteInformationSection")
      },
      {
        key: new Import("projekte", 1, (projekte: typeof ProjekteSection) => {
          let projectData = [
            {
              heading:"Thermischer Transportbehälter - cbb",
              note:`Entwicklung eines mobilen, thermischen Transportbehälters für Fahrräder`,
              team:[

              ],
              thumbnail:"cbb2",
              title: "Die clima bike box",
              content: 
`Der online-Handel boomt und macht auch nicht vor Speisen und Getränken halt. Von AmazonFresh bis Z-Catering liefern Firmen Nahrungsmittel aus. Beliebtes Tarnsport­mittel ist hier innerstädtisch das Fahrrad. Fahrradzustelldienste werben mit ökologisch abbaubarer Verpackung und Öko-Strom für Server und Büro, aber keiner verfügt über eine mobile beheizbare Thermobox, die über die kinetische Energie des Fahrrades betrieben wird und die transportierten Nahrungsmittel wärmt bzw. kühlt.
<br><br>
Hier setzt diese Diplomarbeit an, die sich die Aufgabe gestellt hat, eine derartige Transportbox zu entwickeln und zu vermarkten. Nach ausführlichen Recherchen zum Stand der Technik und dem wirtschaftlichen Umfeld wurde mittels eines strukturierten Ideenfindungs- und Auswahlprozesses ein Designkonzept aus­gewählt: eine Thermobox aus EPP mit einer isolierten Kühlkammer und einer mittels einer Heizfolie beheizbaren Wärmekammer. Die Energiegewinnung erfolgt primär durch einen Nabendynamo, der jedoch bei Stillstand des Fahrrades durch einen integrierten Akku unterstützt wird. Die Box selbst kann mittels eines Schienensystems auf jedes herkömmliche Fahrrad montiert werden.
<br><br>
Doch die Frage ist: Gibt es für eine derartige Technologie überhaupt einen Markt? Die wirtschaftliche Analyse ergab für die Hauptzielgruppe – die Radfahrlieferdienste – ein Marktvolumen von annähernd 7500 Stück mit hohem Wachstumspotenzial. Auf diese Zielgruppe hat sich auch das erstellte Marketingkonzept mit einem angestrebten Verkaufspreis von 235€ fokussiert.
`
            },
            {
              heading:"Smarte Fassadenbegrünung",
              note:"Smarte Fassadenbegrünung mit IoT Technologien",
              team:[

              ],
              thumbnail:"smartFasade",
              title: "Projektziel",
              content: 
`Im Rahmen des Projektes wurde zunächst eine Marktanalyse durchgeführt, um unterschiedliche Anbieter von Begrünungsvarianten vergleichen zu können. Auf dieser Basis wurde anschließend ein Online-Fragenbogen entwickelt, der sowohl an Unternehmen als auch an Einzelkunden gerichtet wurde.
<br><br>
Aufgrund dieser Vorarbeiten konnte aus unterschiedlichen Konstruktionsvorschlägen die bestmögliche Lösung ausgewählt werden. Aufbauend auf der Konstruktion wurde das gewählte Modell im Kooperationsunternehmen „Gebrüder Haas“ produziert und als Prototyp an der Außenfassade montiert.
<c-image src="iotFasade"></c-image>
Der zweite Teil der Arbeit bestand in der Implementierung eines IoT Systems für die Fassadenbegrünung, das zunächst für die Erhebung und Analyse von Daten eingesetzt werden sollte. Dabei wurde eine Reporting-Lösung mit R, OpenHAB und Grafana entwickelt, die nicht nur eigene Sensordaten darstellen konnte, sondern auch die Einbindung externer Wetterdaten und die automatische Ansteuerung weiterer IoT – Geräte ermöglichte.
`
            }
          ] as Project[];

          return new projekte(projectData)
        }), val: () => import(/* webpackChunkName: "projekte" */"../../../../_pageSection/schuelerprojekteSection/schuelerprojekteSection")
      },
      {
        key: new Import("footer", 1, (_Footer: typeof Footer) => 
          new _Footer(baseLink + "projekte/")
        ), val: () => import(/* webpackChunkName: "footer" */"../../../../_pageSection/footer/footer")
      }


    ), sectionChangeCallback, undefined, {
      footer: "projekte"
    })

  }

  pug() {
    return ""
  }

}) 