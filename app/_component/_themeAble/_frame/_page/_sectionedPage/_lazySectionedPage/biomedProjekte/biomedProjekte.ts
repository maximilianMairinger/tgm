import { declareComponent } from "../../../../../../../lib/declareComponent"
import LazySectionedPage from "../lazySectionedPage"
import { set } from "../../../../../../../lib/domain"
import { ImportanceMap, Import } from "../../../../../../../lib/lazyLoad"
import WrapperSection from "../../../../_pageSection/wrapperSection/wrapperSection"
import Thumbnail from "../../../../../_text/_thumbnail/thumbnail";
import InformationenSection from "../../../../../_text/_sectionTextblob/informationenSection/informationenSection";
import ProjekteSection from "../../../../_pageSection/schuelerprojekteSection/schuelerprojekteSection";
import {Project} from "../../../../../_text/tabletBlob/tabletBlob";


export default declareComponent("biomed-projekte", class RaumfahrtProjekte extends LazySectionedPage {
  constructor(sectionChangeCallback?: (section: string) => void) {
    
    super(new ImportanceMap<() => Promise<any>, any>(
      {
        key: new Import("", 1, (thumbnail: typeof Thumbnail) => {
          let e = new thumbnail();
          e.note("Bemerkenswerte")
          e.heading("Diplomarbeiten");
          e.subheading("der Biomedizin");
          e.background("biomedProj.png")
          return new WrapperSection(e, 'dark') as any;
        }), val: () => import(/* webpackChunkName: "thumbnail" */"../../../../../_text/_thumbnail/thumbnail")
      },
      {
        key: new Import("info", 1, (Information: typeof Element) =>
        {
          let info = new (Information as typeof InformationenSection)();
          info.content("SchülerInnen setzen im Zuge der Diplomarbeit Projekte in Bereichen wie etwa Diagnose und Therapie oder Prothesen- und Implantattechnik um. Dabei arbeiten sie oft in Kooperation mit renommierten Unternehmen aus der Industrie und können erste Erfahrungen für das Berufsleben sammeln.")
          return new WrapperSection(info);
        }
        ), val: () => import(/* webpackChunkName: "info" */"../../../../../_text/_sectionTextblob/informationenSection/informationenSection")
      },
      {
        key: new Import("projekte", 1, (projekte: typeof ProjekteSection) => {
          let projectData = [{
            heading:"Delta-1 Launch Vehicle",
            note:"Rakete zum ökonomischen Starten von Satelliten in den niedrigen Orbit",
            logo:"/res/img/projektLogoBeispiel3.png",
            team:[
              "Sabine Vollfrau",
              "Maximillian Meiringer",
              "Saphael Rschlage",
              "Feorg Gelber",
              "Moritz Meier"
            ],
            thumbnail:"/res/img/projektBeispiel3.png",
            title: "Das Problem",
            content: "Große Aerospace Unternehmen bieten keine ökonomischen Lösungen für kleinere wissenschaftliche Projekte, die eine Notwendigkeit für Satelliten im niedrigen Orbit haben. So kann zwar bei Missionen ein kleiner Satellit relativ billig mitgeschickt werden, Priorität ist aber jedenfalls die eigentliche Mission und eine individuelle Positionierung des Satelliten kann nicht garantiert werden.\n" +
                "\n" +
                "Schüler der 5. Klasse RT haben ein ökonomisches Launch Vehicle mit einer Kapazität von bis zu 500kg konzeptioniert, welches in Einzelausführung durch einen vergleichbar niedrigen Kostenpunkt, ein individuelles Deployment von Satelliten für kleinere wissenschaftliche Unternehmungen, als auch kommerzielle Applikationen bietet.",
          },
            {
              heading:"LabAuth",
              note:"Educard basierte Anwesenheitserfassung im Labor & Lernbüro.",
              logo:"/res/img/projektLogoBeispiel.png",
              team:[
                "Sabine Vollfrau",
                "Maximillian Meiringer",
                "Saphael Rschlage",
                "Garid Foldmann",
                "Feorg Gelber",
                "Moritz Meier"
              ],
              thumbnail:"/res/img/projektBeispiel.png",
              title: "Das Problem",
              content: "Die Anwesenheitserfassung im Labor oder Lernbüro hat sich im Laufe der Jahre als ein bescheiden herausgestellt. Manche Lehrer haben eine leere Liste durch die Klasse gegeben in welche die Schüler (nach Unterbrechen ihrer Arbeit) sich eingetragen hatten, welche anschließend vom Lehrer händisch in eine zentrale digitale Liste übertragen würde. Andere riefen schlicht jeden der ca. 100 Namen der Schüler die sich in dem Raum befinden könnten auf nur um die 20 ebenfalls in besagte liste zu schrieben.\n" +
                  "\n" +
                  "Das war nicht nur Unpraktisch, sondern auch Unverlässlich, da man ohne es zu wissen ausgelassen wurde wenn man zum Zeitpunkt der Answesenheitserfassung gerade nicht im Raum war. Zusätzlich kam es vor, dass Lehrer die Erfassung gar vergaßen und diese dan in Retrospektive oder garnicht Nachtrugen.",
            },
            {
              heading:"Phobos",
              note:"Eine neue Art der Datenübertragung",
              logo:"/res/img/projektLogoBeispiel2.png",
              team:[
                "Feorg Gelber",
                "Johann Mandel",
                "Rlorian Fitter"
              ],
              thumbnail:"/res/img/projektBeispiel2.png",
              title: "Das Problem",
              content: "Zu dem jetzigen Zeitpunkt gibt es einige Produkte auf dem Markt, welche ein kabellose Datenübertragung zwischen zwei Geräten ermöglichen. Für so gut wie alle benötigt man aber eine konstante Internetverbindung. Darüber hinaus leiden einige dieser Programme an geringer Übertragungsgeschwindigkeit und mangelnder Sicherheit. Aus diesem Grund wird eine Smartphone App als auch eine Desktop-Version der Applikation benötigt. Das Programm soll für eine kabellose und Internet unabhängige Datenübertragung verwendet werden."
            },
            {
              heading:"Delta-2 Launch Vehicle",
              note:"Rakete zum ökonomischen Starten von Satelliten in den niedrigen Orbit",
              logo:"/res/img/projektLogoBeispiel3.png",
              team:[
                "Sabine Vollfrau",
                "Maximillian Meiringer",
                "Saphael Rschlage",
                "Feorg Gelber",
                "Moritz Meier"
              ],
              thumbnail:"/res/img/projektBeispiel3.png",
              title: "Das Problem",
              content: "Große Aerospace Unternehmen bieten keine ökonomischen Lösungen für kleinere wissenschaftliche Projekte, die eine Notwendigkeit für Satelliten im niedrigen Orbit haben. So kann zwar bei Missionen ein kleiner Satellit relativ billig mitgeschickt werden, Priorität ist aber jedenfalls die eigentliche Mission und eine individuelle Positionierung des Satelliten kann nicht garantiert werden.\n" +
                  "\n" +
                  "Schüler der 5. Klasse RT haben ein ökonomisches Launch Vehicle mit einer Kapazität von bis zu 500kg konzeptioniert, welches in Einzelausführung durch einen vergleichbar niedrigen Kostenpunkt, ein individuelles Deployment von Satelliten für kleinere wissenschaftliche Unternehmungen, als auch kommerzielle Applikationen bietet.",
            },
            {
              heading:"LabAuth 2",
              note:"Educard basierte Anwesenheitserfassung im Labor & Lernbüro.",
              logo:"/res/img/projektLogoBeispiel.png",
              team:[
                "Sabine Vollfrau",
                "Maximillian Meiringer",
                "Saphael Rschlage",
                "Garid Foldmann",
                "Feorg Gelber",
                "Moritz Meier"
              ],
              thumbnail:"/res/img/projektBeispiel.png",
              title: "Das Problem",
              content: "Die Anwesenheitserfassung im Labor oder Lernbüro hat sich im Laufe der Jahre als ein bescheiden herausgestellt. Manche Lehrer haben eine leere Liste durch die Klasse gegeben in welche die Schüler (nach Unterbrechen ihrer Arbeit) sich eingetragen hatten, welche anschließend vom Lehrer händisch in eine zentrale digitale Liste übertragen würde. Andere riefen schlicht jeden der ca. 100 Namen der Schüler die sich in dem Raum befinden könnten auf nur um die 20 ebenfalls in besagte liste zu schrieben.\n" +
                  "\n" +
                  "Das war nicht nur Unpraktisch, sondern auch Unverlässlich, da man ohne es zu wissen ausgelassen wurde wenn man zum Zeitpunkt der Answesenheitserfassung gerade nicht im Raum war. Zusätzlich kam es vor, dass Lehrer die Erfassung gar vergaßen und diese dan in Retrospektive oder garnicht Nachtrugen.",
            },
            {
              heading:"Phobos 2",
              note:"Eine neue Art der Datenübertragung",
              logo:"/res/img/projektLogoBeispiel2.png",
              team:[
                "Feorg Gelber",
                "Johann Mandel",
                "Rlorian Fitter"
              ],
              thumbnail:"/res/img/projektBeispiel2.png",
              title: "Das Problem",
              content: "Zu dem jetzigen Zeitpunkt gibt es einige Produkte auf dem Markt, welche ein kabellose Datenübertragung zwischen zwei Geräten ermöglichen. Für so gut wie alle benötigt man aber eine konstante Internetverbindung. Darüber hinaus leiden einige dieser Programme an geringer Übertragungsgeschwindigkeit und mangelnder Sicherheit. Aus diesem Grund wird eine Smartphone App als auch eine Desktop-Version der Applikation benötigt. Das Programm soll für eine kabellose und Internet unabhängige Datenübertragung verwendet werden."
            },
            {
              heading:"Delta-3 Launch Vehicle",
              note:"Rakete zum ökonomischen Starten von Satelliten in den niedrigen Orbit",
              logo:"/res/img/projektLogoBeispiel3.png",
              team:[
                "Sabine Vollfrau",
                "Maximillian Meiringer",
                "Saphael Rschlage",
                "Feorg Gelber",
                "Moritz Meier"
              ],
              thumbnail:"/res/img/projektBeispiel3.png",
              title: "Das Problem",
              content: "Große Aerospace Unternehmen bieten keine ökonomischen Lösungen für kleinere wissenschaftliche Projekte, die eine Notwendigkeit für Satelliten im niedrigen Orbit haben. So kann zwar bei Missionen ein kleiner Satellit relativ billig mitgeschickt werden, Priorität ist aber jedenfalls die eigentliche Mission und eine individuelle Positionierung des Satelliten kann nicht garantiert werden.\n" +
                  "\n" +
                  "Schüler der 5. Klasse RT haben ein ökonomisches Launch Vehicle mit einer Kapazität von bis zu 500kg konzeptioniert, welches in Einzelausführung durch einen vergleichbar niedrigen Kostenpunkt, ein individuelles Deployment von Satelliten für kleinere wissenschaftliche Unternehmungen, als auch kommerzielle Applikationen bietet.",
            },
            {
              heading:"LabAuth 3",
              note:"Educard basierte Anwesenheitserfassung im Labor & Lernbüro.",
              logo:"/res/img/projektLogoBeispiel.png",
              team:[
                "Sabine Vollfrau",
                "Maximillian Meiringer",
                "Saphael Rschlage",
                "Garid Foldmann",
                "Feorg Gelber",
                "Moritz Meier"
              ],
              thumbnail:"/res/img/projektBeispiel.png",
              title: "Das Problem",
              content: "Die Anwesenheitserfassung im Labor oder Lernbüro hat sich im Laufe der Jahre als ein bescheiden herausgestellt. Manche Lehrer haben eine leere Liste durch die Klasse gegeben in welche die Schüler (nach Unterbrechen ihrer Arbeit) sich eingetragen hatten, welche anschließend vom Lehrer händisch in eine zentrale digitale Liste übertragen würde. Andere riefen schlicht jeden der ca. 100 Namen der Schüler die sich in dem Raum befinden könnten auf nur um die 20 ebenfalls in besagte liste zu schrieben.\n" +
                  "\n" +
                  "Das war nicht nur Unpraktisch, sondern auch Unverlässlich, da man ohne es zu wissen ausgelassen wurde wenn man zum Zeitpunkt der Answesenheitserfassung gerade nicht im Raum war. Zusätzlich kam es vor, dass Lehrer die Erfassung gar vergaßen und diese dan in Retrospektive oder garnicht Nachtrugen.",
            },
            {
              heading:"Phobos 3",
              note:"Eine neue Art der Datenübertragung",
              logo:"/res/img/projektLogoBeispiel2.png",
              team:[
                "Feorg Gelber",
                "Johann Mandel",
                "Rlorian Fitter"
              ],
              thumbnail:"/res/img/projektBeispiel2.png",
              title: "Das Problem",
              content: "Zu dem jetzigen Zeitpunkt gibt es einige Produkte auf dem Markt, welche ein kabellose Datenübertragung zwischen zwei Geräten ermöglichen. Für so gut wie alle benötigt man aber eine konstante Internetverbindung. Darüber hinaus leiden einige dieser Programme an geringer Übertragungsgeschwindigkeit und mangelnder Sicherheit. Aus diesem Grund wird eine Smartphone App als auch eine Desktop-Version der Applikation benötigt. Das Programm soll für eine kabellose und Internet unabhängige Datenübertragung verwendet werden."
            }
          ] as Project[];

          return new projekte(projectData)
            }
        ), val: () => import(/* webpackChunkName: "projekte" */"../../../../_pageSection/schuelerprojekteSection/schuelerprojekteSection")
      },

    ), sectionChangeCallback, undefined)

  }

  pug() {
    return ""
  }

}) 