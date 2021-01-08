import { declareComponent } from "../../../../../../../lib/declareComponent"
import LazySectionedPage from "../lazySectionedPage"
import { ImportanceMap, Import } from "../../../../../../../lib/lazyLoad"
import WrapperSection from "../../../../_pageSection/wrapperSection/wrapperSection"
import Thumbnail from "../../../../../_text/_thumbnail/thumbnail";
import InformationenSection from "../../../../../_text/_sectionTextblob/informationenSection/projekteInformationSection/projekteInformationSection";
import ProjekteSection from "../../../../_pageSection/schuelerprojekteSection/schuelerprojekteSection";
import {Project} from "../../../../../_text/tabletBlob/tabletBlob";
import Footer from "../../../../_pageSection/footer/footer"


export default declareComponent("kt-projekte", class KtProjekte extends LazySectionedPage {
  constructor(baseLink: string, sectionChangeCallback?: (section: string) => void) {
    
    super(new ImportanceMap<() => Promise<any>, any>(
      {
        key: new Import("", 1, (thumbnail: typeof Thumbnail) => {
          let e = new thumbnail();
          e.note("die")
          e.heading("Projekte");
          e.subheading("der KT");
          e.background('ktProj.png');
          return new WrapperSection(e, 'dark') as any;
        }), val: () => import(/* webpackChunkName: "thumbnail" */"../../../../../_text/_thumbnail/thumbnail")
      },
      {
        key: new Import("info", 1, (Information: typeof Element) =>
        {
          let info = new (Information as typeof InformationenSection)();
          info.content("SchülerInnen setzen im Zuge der Diplomarbeit Projekte in verschiedensten Bereichen um. Dabei arbeiten sie oft in Kooperation mit renommierten Unternehmen aus der Industrie und können erste Erfahrungen für das Berufsleben sammeln.")
          return new WrapperSection(info);
        }
        ), val: () => import(/* webpackChunkName: "info" */"../../../../../_text/_sectionTextblob/informationenSection/projekteInformationSection/projekteInformationSection")
      },
      {
        key: new Import("projekte", 1, (projekte: typeof ProjekteSection) => {
          let projectData = [
            {
              heading:"Biologisch abbaubare Kaffeekapseln",
              note:"Anwendung von Biopolymeren für biologisch abbaubare Kaffeekapseln. In Kooperation mit Gabriel Chemie GmbH, Industriestraße 1, 2352 Gumpoldskirchen.",
              team:[
                "Samantha Onderka",
                "Katharina Schleinzer"
              ],
              thumbnail:"nespresso",
              title: "Projektziel",
              content: 
`Zeil des Projekts war ist die Anwendung eines Biopolymers für die Herstellung von Kaffeekapseln, 
sowie die Beurteilung der Kompostierfähigkeit. Dabei wurde ein Biokunststoff entwickelt, welcher 
als Alternative zu herkömmlichen Aluminiumverpackungen verwendet werden kann. Diese wurden sowohl
auf ihre mechanische Stabilität als auch auf ihre Kompostierbarkeit geprüft.
<c-image src="kapselnKompostierbarkeit" class="illustration"></c-image>
`
            },
            {
              heading:"Nachhaltigkeit von Post-Consumer-Rezyklaten",
              note:"Bewertung der Nachhaltigkeit von Post-Consumer-Rezyklaten. In Kooperation mit Gabriel-Chemie Gesellschaft m.b.H., Industriestraße 1, 2352 Gumpoldskirchen.",
              team:[
                "Semanur Demir",
                "Armin Marhosevic"
              ],
              thumbnail:"PCR_Mahlgut",
              title: "Projektziel",
              content: 
`Das EU-Kreislaufwirtschaftspaket fordert bis 2025 eine Recyclingquote von 50 % von Kunststoffverpackungen. Ziele sind die Umwelt zu schützen und Ressourcen zu schonen. In diesem Projekt sollte die technische Eignung von Post-Consumer-Rezyklaten (PCR) und deren Wirtschaftlichkeit untersucht werden.
<h3>Realisierung</h3>
Unterschiedliche PCR’s wurden verarbeitet und mittels Zugprüfung, Dichtebestimmung, MFRund OIT-Prüfung charakterisiert. Auch wurden Sensoriktests (Geruch und Geschmack) mit den PCR‘s durchgeführt, um deren Eignung für Lebensmittelverpackungen zu untersuchen.
<h3>Ergebnisse</h3>
Die mechanischen Eigenschaften der Post-Consumer-Rezyklate erreichten die Werte vom Neumaterial. Die Thermische Stabilisierung und auch die sensorischen Eigenschaften von PCR‘s erwiesen sich jedoch als schlechter und zeigen ein deutliches Verbesserungspotential.
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