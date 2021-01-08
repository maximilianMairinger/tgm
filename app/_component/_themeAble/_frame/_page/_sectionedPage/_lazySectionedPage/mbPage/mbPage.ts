import { declareComponent } from "../../../../../../../lib/declareComponent"
import LazySectionedPage from "../lazySectionedPage"
import { set } from "../../../../../../../lib/domain"
import { ImportanceMap, Import } from "../../../../../../../lib/lazyLoad"
import TestSection1 from "../../../../_pageSection/testSection1/testSection1"
import TestSection2 from "../../../../_pageSection/testSection2/testSection2"
import Thumbnail from "../../../../../_text/_thumbnail/_cardThumbnail/cardThumbnail"
import WrapperSection from "../../../../_pageSection/wrapperSection/wrapperSection"
import Info from "../../../../../_text/_sectionTextblob/ausbildungSection/ausbildungSection"
import AusmachtSection from "../../../../_pageSection/ausmachtSection/rtAusmachtSection/rtAusmachtSection"
import ImageTextblob from "../../../../../_text/imageTextblob/imageTextblob"
import Footer from "../../../../_pageSection/footer/footer"
import DarkNewsSection from "../../../../_pageSection/triangleNews/elektrotechnikTriangleNews/elektrotechnikTriangleNews"


export default class MbPage extends LazySectionedPage {
  constructor(baseLink: string, sectionChangeCallback?: (section: string) => void) {
    
    super(new ImportanceMap<() => Promise<any>, any>(
      {
        key: new Import("", 1, (_Thumbnail: typeof Thumbnail) => {
          let e = new _Thumbnail(baseLink)
          e.heading("Maschinenbau")
          e.subheading("der Tagesschule")
          e.note("abteilung");
          e.background("mbLanding2.png")
          e.videolink("https://www.youtube.com/watch?v=XIB-3K20Vaw")
          
          return new WrapperSection(e, "dark") as any
        }), val: () => import(/* webpackChunkName: "thumbnail" */"../../../../../_text/_thumbnail/_cardThumbnail/cardThumbnail")
      },
      {
        key: new Import("info", 1, (_Info: typeof Info) => {
          let info = new _Info()

          info.heading("Technische Ausbildung");
          info.subheading("am Puls der Zeit");
          info.note("bei uns");
          info.hsize({max:68, min:40});
          info.hmobile({max:40, min:30});
          info.content(`
          Moderner Maschinenbau ist geprägt durch Robotik, Design/ Konstruktion, digitales Prototyping, Augmented Reality, intelligente Bauteile, Automatisierung, Entwicklung und Prototypenbau. Maschinenbau schafft Neues, wie Roboter, Werkzeuge, Maschinen und Systeme, entwickelt und baut die Produkte.
          <br>
          Es gibt kein haptisches, reales Produkt an dem der Maschinenbau nicht beteiligt ist! Er bietet dir eine solide Grundlage, um die Zukunft aktiv mitgestalten zu können. Die Werkstoffe (Metalle, Kunststoffe, Holz, Papier, Keramik, Biomaterialien, ..) mit denen du deine Projekte und Ideen umsetzen wirst, sind so vielfältig wie deine Ausbildung im Maschinenbau selbst. Leichtbau ist angesagt! Willst du später vielleicht einmal etwas im Bereich "Robotik" machen, dann ist diese Ausbildung des Maschinenbaus die genau richtige Basis dafür. Wenn du zum Beispiel auf der FH-Technikum Wien nachliest, geben sie als Voraussetzung für das Masterstudium "Mechatronik/Robotik" einen Bachelor in Maschinenbau, Elektronik, Kommunikationssystemen, Automatisierung oder Fahrzeugtechnik an.
          `)

          return new WrapperSection(info) as any
        }), val: () => import(/* webpackChunkName: "sectionTextblob" */"../../../../../_text/_sectionTextblob/ausbildungSection/ausbildungSection")
      },
      {
        key: new Import("highlights", 1, (_AusmachtSection: typeof AusmachtSection) => 
          new _AusmachtSection(baseLink + "highlights/")
        ), val: () => import(/* webpackChunkName: "ausmachtSection" */"../../../../_pageSection/ausmachtSection/mbAusmachtSection/mbAusmachtSection")
      },
      // {
      //   key: new Import("news", 1, (_DarkNewsSection: typeof DarkNewsSection) => 
      //     new _DarkNewsSection()
      //   ), val: () => import(/* webpackChunkName: "elektrotechnikNews" */"../../../../_pageSection/triangleNews/biomedTriangleNews/biomedTriangleNews")
      // },
      {
        key: new Import("kontakt", 1, (_ImageTextblob: typeof ImageTextblob) => {
          let imageTextBlob = new _ImageTextblob('right');

          imageTextBlob.heading("Kontakt");
          imageTextBlob.subheading("zur Maschinenbau");
          imageTextBlob.content("Demnächst in der Nähe? Komm uns besuchen, wir freuen uns auf dich! Wir ermöglichen dir als SchnupperschülerIn in die Welt der Biomedizin einzutauchen.")
          // imageTextBlob.linktext("Einen Besuch planen")
          imageTextBlob.linkhref("tagesschule/elektrotechnik")
          imageTextBlob.address("Wexstraße 19-23, 1200 Wien / 6. Stock");
          imageTextBlob.email("office-hmb@tgm.ac.at");
          imageTextBlob.tel("+43 1 33126 261");
          imageTextBlob.image('mbContact');
          return new WrapperSection(imageTextBlob) as any
        }), val: () => import(/* webpackChunkName: "imageTextblob" */"../../../../../_text/imageTextblob/imageTextblob")
      },
      {
        key: new Import("footer", 1, (_Footer: typeof Footer) => 
          new _Footer(baseLink + "kontakt/")
        ), val: () => import(/* webpackChunkName: "footer" */"../../../../_pageSection/footer/footer")
      }
    
    ), sectionChangeCallback, undefined, {
      footer: "kontakt"
    })

  }

  pug() {
    return ""
  }

}

declareComponent("mb-page", MbPage)
