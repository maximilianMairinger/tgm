import { declareComponent } from "../../../../../../../lib/declareComponent"
import LazySectionedPage from "../lazySectionedPage"
import { ImportanceMap, Import } from "../../../../../../../lib/lazyLoad"
import WrapperSection from "../../../../_pageSection/wrapperSection/wrapperSection"
import Thumbnail from "../../../../../_text/_thumbnail/thumbnail";
import InformationenSection from "../../../../../_text/_sectionTextblob/informationenSection/projekteInformationSection/projekteInformationSection";
import ProjekteSection from "../../../../_pageSection/schuelerprojekteSection/schuelerprojekteSection";
import {Project} from "../../../../../_text/tabletBlob/tabletBlob";
import Footer from "../../../../_pageSection/footer/footer"


export default declareComponent("el-projekte", class ItProjekte extends LazySectionedPage {
  constructor(baseLink: string, sectionChangeCallback?: (section: string) => void) {
    
    super(new ImportanceMap<() => Promise<any>, any>(
      {
        key: new Import("", 1, (thumbnail: typeof Thumbnail) => {
          let e = new thumbnail();
          e.note("die")
          e.heading("Projekte");
          e.subheading("der HEL");
          e.background('wiProject.png');
          return new WrapperSection(e, 'dark') as any;
        }), val: () => import(/* webpackChunkName: "thumbnail" */"../../../../../_text/_thumbnail/thumbnail")
      },
      {
        key: new Import("info", 1, (Information: typeof Element) =>
        {
          let info = new (Information as typeof InformationenSection)();
          info.content("SchülerInnen setzen im Zuge der Diplomarbeit Projekte in verschiedensten Bereichen um. Dabei arbeiten sie oft in Kooperation mit renommierten Unternehmen aus der Industrie und können erste Erfahrungen für das Berufsleben sammeln. Unsere SchülerInnen stellen in Videos ihre Diplomprojekte vor.")
          info.linktext("Mehr erfahren")
          info.linkhref("/tagesschule/elektronik/projekte/diplomprojekte-der-hel")
          return new WrapperSection(info);
        }
        ), val: () => import(/* webpackChunkName: "info" */"../../../../../_text/_sectionTextblob/informationenSection/projekteInformationSection/projekteInformationSection")
      },
      {
        key: new Import("projekte", 1, (projekte: typeof ProjekteSection) => {
          let projectData = [
            {
              heading:"Solarautonomes Golfcart",
              note:"Weltweit erstes solarautonomes Golfcart mit Unterstützung des TGM",
              thumbnail: "solarautonomesGolfcart",
              team:["DI Reinhard Haiden", "reinhard.haiden@tgm.ac.at"],
              title: "Solarautonomes Golfcart",
              content: `
              Wie nah am Puls der Wirtschaft Diplomprojekte sein können, zeigt die Zusammenarbeit zwischen einem italienischen Industrieunternehmen, einem Designbüro aus Wien, einer Schlosserei  und drei Diplomprojektteams an der Abteilung für Elektronik und Technische Informatik: In einer dreijährigen Projektzusammenarbeit wurde ein Golfcart konstruiert, das nach zehn Stunden Sonneneinstrahlung eine Stunde fahren kann, also nur solar und vollkommen autonmon von äußeren Energiequellen betrieben werden kann. Damit wurde technisches Neuland betreten: Es gab keine Modelle, an denen sich das TGM-Team orientieren konnte.
              <br>
              Das Team meisterte eine Reihe von Herausforderungen innovativ:
              <ul>
                <li>die Integration einer Vielzahl von Einzelsystemen in ein Gesamtkonzept nach dem Vorbild des modernen Automobilbaus</li>
                <li>die richtige Auswahl an Komponenten, um die gewünschte Autonomie zu erreichen, etwa durch den Einbau eines fast 2 m2 großen Solarpanels</li>
                <li>Vermeidung von Getriebeverlusten durch elektrisch direkt angetriebene Räder</li>
                <li>energieeffiziente Balancertechnologie zum Laden der Bleiakkus</li>
                <li>Maßnahmen zur Energierückgewinnung und elektronischer Fahrwerksunterstützung</li>
              </ul>

              <h3>Maturaaufgaben</h3>
              Mehrere Maturagruppen waren über einige Schuljahre hinweg an diesem Projekt beteiligt:

              <ul>
                <li>2015/16: Elektronisches Differenzial und Fahrwerksregelung wurden entwickelt</li>
                <li>2016/17: Entwicklung des BUS-Systems, der Laderegler und Akkubalancer</li>
                <li>2017/18: Zentrales Energiemanagement wurde entwickelt, das während des Betriebes auf einem Tablet alle Energie- und Fahrdaten auf einen Blick darstellt, Wegfahrsperre</li>
                <li>2019/2020: Solarladeeinheit und Energiemanagement wurde verbessert wodurch sich die Reichweite des Carts ca. auf zwei Stunden verdoppelte</li>
              </ul>

              <h3>Zum gemeinsamen Projekterfolg beigetragen haben</h3>

              <ul>
                <li>Das Industriedesignbüro <c-link link="https://www.dform.at">www.dform.at</c-link>, der Batterienhersteller enppex GmbH (<c-link link="https://www.enppex.at">www.enppex.at</c-link>), die Schlosserei Koiner sowie das italienische Industrieunternehmen Marcegaglia</li>
                <li>Die Finanzierung, Organisation und Integration des Projektes erfolgte durch den Betreuer Prof. Haiden</li>
                <li>Zur Demonstration des Echtbetriebes wurden die Mitglieder von zwei Maturajahrgängen für drei Tage zum Feldtest nach Italien eingeladen</li>
              </ul>

              <h3>Technische Eckdaten</h3>
              <b>Ladekapazität:</b> 200 kg (2 Personen)<br>
              <b>Fahrzeit:</b> 12 Stunden Sonne ergibt 2 Stunden fahren oder 1 Nacht an der Steckdose 4 Stunden Fahrzeit<br>
              <b>Reichweite:</b> rd. 80 km nach vollständiger Ladung<br>
              <b>Höchstgeschwindigkeit:</b> 43 km/h elektronisch auf 25km/h abgeregelt<br>

              <br>

              <c-link link="https://youtu.be/rdlwIdOpYzo">Zum Imagefilm</c-link>
              `
            },
            {
              heading:"Gestengesteuerte Flugdrohne",
              note:`In der vorliegenden Arbeit wird für eine handelsübliche Flugdrohne eine intuitive Gestensteuerung entwickelt. Die Drohne soll im Freizeitbereich eingesetzt werden.`,
              thumbnail: "gestengesteuerteDrohne",
              team:["Prof Di Norbert Jordan", "njordan@tgm.ac.at"],
              title: "Gestengesteuerte Flugdrohne",
              content: `Um die Gestensteuerung zu realisieren, wurden Bewegungssensoren eingesetzt. Diese Sensorik wird am Handschuh des Betreibers befestigt. Zwei Microcontroller übernehmen die Bewegungsdaten der beiden Bewegungssensoren und leiten diese über W-LAN an das zentrale Betriebssystem Robot Operating System weiter. Das Robot Operating System (ROS) ist ein Software-Framework für Roboter und Drohnen.
              <br>
              <br>
              <c-image src="gestengesteuerteDrohneHands"></c-image>
              <br>
              <br>
              Durch das Robot Operating System werden die Bewegungsdaten in Flugbefehle umgewandelt und in Echtzeit ebenfalls via W-LAN an die Drohne übermittelt.
              `
            },
            {
              heading:"Advanced e-Longboard",
              note:"In der vorliegenden Arbeit wird ein elektrisches Longboard entwickelt.",
              thumbnail: "funkLongboard",
              team:[],
              title: "Funkgesteuertes Longboard",
              content: `Mit dem elektrischen Longboard sollen kurze bis mittlere Distanzen zurückgelegt werden. Es werden effiziente bürstenlose Motoren verwendet, da sie effizienter sind und geringe Materialabnützungen aufweisen. Um die Motoren anzutreiben benötigt man Steuerungshardware. Dazu wird ein Open-Source Projekt integriert. Der Controller ist leistungsfähig, programmierbar, und effizient im Betrieb programmierbar. Die Kommunikation zwischen dem Longboard und Fernbedienung erfolgt durch NRF24 Modul im Frequenzband von 2.4GHz. Ein integriertes OLED Display zeigt alle wichtigen Daten, wie z.B. Geschwindigkeit und Akkustatus an.`
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