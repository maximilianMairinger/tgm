import { declareComponent } from "../../../../../../../lib/declareComponent"
import LazySectionedPage from "../lazySectionedPage"
import { ImportanceMap, Import } from "../../../../../../../lib/lazyLoad"
import WrapperSection from "../../../../_pageSection/wrapperSection/wrapperSection"
import Thumbnail from "../../../../../_text/_thumbnail/thumbnail";
import InformationenSection from "../../../../../_text/_sectionTextblob/informationenSection/projekteInformationSection/projekteInformationSection";
import ProjekteSection from "../../../../_pageSection/schuelerprojekteSection/schuelerprojekteSection";
import {Project} from "../../../../../_text/tabletBlob/tabletBlob";
import Footer from "../../../../_pageSection/footer/footer"


export default declareComponent("bg-projekte", class RaumfahrtProjekte extends LazySectionedPage {
  constructor(baseLink: string, sectionChangeCallback?: (section: string) => void) {
    
    super(new ImportanceMap<() => Promise<any>, any>(
      {
        key: new Import("", 1, (thumbnail: typeof Thumbnail) => {
          let e = new thumbnail();
          e.note("die")
          e.heading("Projekte");
          e.subheading("der HBG");
          e.background("biomedProj.png")
          return new WrapperSection(e, 'dark') as any;
        }), val: () => import(/* webpackChunkName: "thumbnail" */"../../../../../_text/_thumbnail/thumbnail")
      },
      {
        key: new Import("info", 1, (Information: typeof Element) =>
        {
          let info = new (Information as typeof InformationenSection)();
          info.content("SchülerInnen setzen im Zuge der Diplomarbeit Projekte in Bereichen wie etwa Diagnose und Therapie oder Prothesen- und Implantattechnik um. Dabei arbeiten sie oft in Kooperation mit renommierten Unternehmen aus der Industrie und können erste Erfahrungen für das Berufsleben sammeln. Unsere SchülerInnen stellen in Videos ihre Diplomprojekte vor.")
          info.linktext("Mehr erfahren")
          info.linkhref("/tagesschule/biomedizin/projekte/diplomprojekte-der-hbg")
          return new WrapperSection(info) as any;
        }
        ), val: () => import(/* webpackChunkName: "info" */"../../../../../_text/_sectionTextblob/informationenSection/projekteInformationSection/projekteInformationSection")
      },
      {
        key: new Import("projekte", 1, (projekte: typeof ProjekteSection) => {
          let projectData = [
            {
              heading:"Kniedämpfungsanalyse",
              note:`Mit Beschleunigungssensoren werden die Vibrationen oberhalb und unterhalb des Knies gemessen. Im Vergleich kann auf die aktive und passive Dämpfung durch Muskulatur und Gelenksknorpel geschlossen werden. Das erlaubt einen quantitativen Vergleich von Bewegungsstrategien im Sport und in der Rehabilitation.`,
              team:[],
              thumbnail: "bg_DA_1",
              title: "Kniedämpfungsanalyse",
              content: `
              Das Knie dämpft Erschütterungen beim Gehen, Laufen und Springen. Um diese Funktion zu Messen werden zwei Beschleunigungssensoren am Bein oberhalb und unterhalb des Knies befestigt. Während der Mensch sich nun bewegt, werden die Geschwindigkeitsprofile dieser beiden Sensoren durch eine Software berechnet und verglichen. Dadurch kann der Dämpfungsanteil des Knies bestimmt werden.
              <br>
              Bisher haben die Schülerinnen die passiven Dämpfungseigenschaften durch Messungen sehr nahe am Knie bestimmt (die Schülerin am Bild ganz rechts trägt die Sensoren am linken Bein). Das betrifft die Funktion der Gelenksknorpel und von Innen- und Außen- Meniskus. Im Weiteren sollen aber auch die aktiven Dämpfungseigenschaften der Kniestrecker gemessen werden. Das wird dadurch geschehen, dass die Sensoren kniefern an Hüfte und Sprunggelenk angebracht werden. 
              <br>
              Mit diesem Messsystem ist es nun möglich die aktiven und passiven Dämpfungen im Knie bei verschiedenen Fortbewegungs- und Sportarten zu messen. Das eröffnet die Möglichkeit unterschiedliche Bewegungsstrategien auf ihre Auswirkung auf die Kniedämpfung zu vergleichen, sowohl im Sport als auch bei der Rehabilitation.`
            },
            {
              heading:"Elektrophorese",
              note:"Beeinflussung von Zellkulturen durch elektronischen Strom",
              thumbnail:"bg_DA_2",
              team:[],
              title: "Elektrophorese",
              content: `Die Elektrophorese wird bei der Analyse von Nukleinsäuren oder Proteinen verwendet. Dabei transportiert der elektrische Strom die verschiedenen Moleküle einer Probe, je nach ihrer Beweglichkeit, in einer vorgegebenen Zeit verschieden weit. Dafür werden eine sehr konstante Spanungsquelle, eine Elektrophoresekammer und ein Kontrollgerät zur Überwachung benötigt. Diese einzelnen Komponenten präsentieren unsere Schülerinnen im Bild von links nach rechts. Jedes Einzelteil wurde von den Schülerinnen unter tatkräftiger Mithilfe der Werkstättenlehrer selbst gefertigt. Dieses Gerät wird dann in Zukunft im Zellkulturlabor zur Analyse in den Laborübungen genutzt werden.`
            },
            {
              heading:"BloodFlowMonitoring",
              note:`Das entwickelte Gerät misst indirekt den Blutfluss zum Gehirn, um Ursachen für spontane Migräneanfälle zu untersuchen.
              <br>
              Dazu werden auf beiden Ohrläppchen Leuchtdioden montiert, deren Licht vom zirkulierenden Blut absorbiert wird. Die Stärke des durchgelassenen Lichtanteiles wird gemessen. Es konnte der Nachweis erbracht werden, dass die Schwankungsamplitude mit zunehmender Durchblutung des Kopfes steigt. Diese kontaktlose Methode erlaubt, Durchblutungsänderungen am Kopf auch im Seitenvergleich zu bestimmen. 
              `,
              thumbnail:"bg_DA_3",
              team:[],
              title: "BloodFlowMonitoring",
              content: `Unsere Schüler versuchen technische Hilfsmittel für Menschen zu entwickeln, die an spontanen Migräneanfällen leiden. Als eine der möglichen Ursachen wird eine veränderte Durchblutung des Gehirns vermutet. Wenn so eine Veränderung der Durchblutung frühzeitig durch einfache Messungen erkannt werde kann, sollte es möglich sein, durch geeignete Übungen dem drohenden Migräneanfall entgegen zu wirken.
              <br>
              Die Messungen werden synchron an beiden Ohrläppchen mittels kontaktloser Durchleuchtung mit Dioden gemacht (rechter Schüler im Bild hat die Ohrenklipse angelegt). Bisher werden solche Pulsoximeter zur Bestimmung der Pulsrate und der Sauerstoffsättigung im Blut verwendet. Unsere Schüler konnten aber bisher schon zeigen, dass die Amplitude der Durchleuchtungsstärke sensibel ist auf die Blutdurchflussänderungen der Kopfarterien im Seitenvergleich. Weitere Versuche mit Körperschallmikrofonen direkt an den Arterien könnten noch genauere Ergebnisse über die Gehirndurchblutung liefern.
              <br>
              Mit dieser, vergleichsweise einfachen und kontaktlosen Methode ist es möglich die Durchblutung im Kopfbereich ab zu schätzen. Ob das auch für die Durchblutung direkt im Gehirn anwendbar ist, werden weitere Tests zeigen.  
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