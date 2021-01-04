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
  constructor(sectionChangeCallback?: (section: string) => void) {
    
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
        key: new Import("footer", 1, (_Footer: typeof Footer) => 
          new _Footer()
        ), val: () => import(/* webpackChunkName: "footer" */"../../../../_pageSection/footer/footer")
      }
      // {
      //   key: new Import("projekte", 1, (projekte: typeof ProjekteSection) => {
      //       let projectData:Project[] = [{
      //           heading:"Power Kite",
      //           note:"Stromerzeugung mittels kitessurfen",
      //           // logo:"/res/img/projektLogoBeispiel3.png",
      //           team: [
      //             "Lukas Buza",
      //             "Lukas Gassner",
      //             "Matteo Ingegneri",
      //             "Mario Lang"
      //           ],
      //           thumbnail:"/res/img/kitesurf.jpg",
      //           title: "Diplomarbeit der 5AHET (2018/19)",
      //           content:
      //               "Das Ziel dieser Diplomarbeit war die Fertigung eines Funktionsprototyps zur Stromerzeugung mittels eines Kites, wie man es vom Kitesurfen her kennt. Durch das Ausfahren eines Kites sollte über eine Welle ein Gleichstrommotor als Generator betrieben und die erzeugte Energie in einem Akku gespeichert werden. Weiters wurde als Ziel gesetzt, das Maturaprojekt mit einem so geringen Budget wie möglich durchzuführen. Daher wurden für dieses Projekt möglichst viele Teile wiederverwendet, welche in der Abteilung keine anderweitige Anwendung mehr fanden."
      //               +
      //               "<img src='/res/img/kiteprinzip.png'></img>"
      //               +
      //               "Als Basis des Prototyps wurde eine Europalette gewählt. Auf dieser wurden sowohl die mechanischen als auch die elektrischen Komponenten befestigt. Zur Leistungswandlung wurde eine 150W Gleichstrommaschine gewählt. Für die zweite, kleinere Maschine, welche für das Funktionsprinzip notwendig war, wurde ein Bohrmaschinenmotor verwendet."
      //               + "<br><br>" +
      //               "Nachdem die mechanischen Komponenten auf der Palette angebracht worden waren, wurde eine elektrische Schaltung zum Messen von Spannung und Strom entworfen. In einem von der Schule zur Verfügung gestellten Akkumulator sollte die erzeugte elektrische Energie gespeichert werden. Zur Ansteuerung der beiden elektrischen Maschinen wurden zusätzlich zwei HBrücken benötigt. Diese sollten mittels Mikrocontroller angesteuert werden. Die elektrischen Bauteile wurden anschließend in einer angefertigten Holzbox verschaltet. Diese diente auch als Steuerpult, welches zwei Potentiometer zur Steuerung der Gleichstrommaschinen über den Arduino sowie einen Schalter zum Ein- und Ausschalten des PowerKites beinhaltet. Für den Arduino wurde ein Programm zur Steuerung der beiden Maschinen sowie eine Ausgabe der gemessenen Größen erstellt. Der fertige Prototyp wurde zuerst am Gelände des TGM und später auf der Donauinsel einem Funktionstest unterworfen und es konnte tatsächlich elektrische Energie erzeugt werden. Allerdings wurde dabei das Kite-Segel manuell gesteuert, was im Falle einer kommerziellen Stromerzeugung natürlich automatisiert erfolgen müsste."
      //         },
      //           {
      //             heading:"ELFASNO",
      //             note:"Elektrisches Fahrrad für Schneebetrieb.",
      //             team:[
      //               "Jan Dworschak",
      //               "Christian Wiedenhofer",
      //               "Michael Beierl"
      //             ],
      //             thumbnail:"/res/img/schneerad.png",
      //             title: "Diplomarbeit der 5AHET (2016/17)",
      //             content:
      //                 "Das Primärziel dieses Projekts war es ein elektrisch betriebenes Fahrrad für den Schneebetrieb zu konstruieren und zu realisieren. Das Elektrofahrrad sollte dabei größere Steigungen bewältigen können, eine gewisse Geschwindigkeit erreichen und mit möglichst geringen Verlusten im Schnee fahren können. Das Antriebskonzept sollte dem eines „Pedelec-Mobils“ ähneln. Dabei fährt man, im Gegensatz zu einem Moped nicht rein elektrisch, sondern tritt mit seinen Füßen im mit. Das war eine wichtige Rahmenbedingung, die man einhalten musste."
      //                 + "<br><br>" +
      //                 "Es sollte ein möglichst detailgetreues OpenModelica Modell erstellt werden, um alle Teile richtig auslegen zu können und so auch abzuschätzen, wie das Gefährt mit unterschiedlichen Bedingungen fertig werden könne. Ebenso galt es abzuwägen und zu entscheiden , welches Antriebs - bz w. Fortbewegungskonzept gewählt werden sollte - herkömmliche Schneeräder, Fat Tyres oder eine Ski/Schneeraupenkombination."
      //                 + "<br>" +
      //                 "Es sollte ein Vehikel geschaffen werden, welches auf einem Fahrrad basiert, sich möglichst wendig verhält und eine gute Steigfähigkeit aufweist, um zum Beispiel Rettungskräfte nach Lawinen oder Personen in verschneiten Gebieten zu unterstützen."
      //                 + "<br>" +
      //                 "Ein wichtiges Ziel ist es, eine wirtschaftliche Alternative zu lauten, umweltbelastenden Schneemobilen beziehungsweise MotoCross-Motorrädern zu finden und somit die Pisten und Schneegebiete angenehmer und idyllischer zu machen."
      //                 + "<br>" +
      //                 "Zusätzlich zum umwelttechnischen Aspekt hat das Team sich überlegt, dass das ELFASNO auch im winterlichen Hilfseinsatz eine Rolle spielen könnte."
      //                 + "<br><br>" +
      //                 "Es wurde der Prototyp eines leistungsstarken, mobilen Fahrzeuges gebaut, welches bei entsprechender Weiterentwicklung Einsatzkräften auf der ganzen Welt in Schneegebieten beziehungsweise nach Lawinen- oder Murenabgängen eine hilfreiche Unterstützung sein kann."
      //           }] as Project[];
      //     return new projekte(projectData)
      //   }
      //   ), val: () => import(/* webpackChunkName: "projekte" */"../../../../_pageSection/schuelerprojekteSection/schuelerprojekteSection")
      // },

    ), sectionChangeCallback, undefined)

  }

  pug() {
    return ""
  }

}) 