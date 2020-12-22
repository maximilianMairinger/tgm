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
          e.background("biomedLanding.png")
          e.videolink("https://www.youtube.com/watch?v=dQw4w9WgXcQ")
          
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
          Das Ausbildungsziel an dieser Lehranstalt ist die Entwicklung eines soliden Verständnisses der Wechselwirkung von Technik und Medizin, das durch inhaltliche und organisatorische Vernetzung der Unterrichtsgegenstände „Biologie, Medizin und Gesundheitswesen“, „Biomedizinische Signal-Verarbeitung“, „Medizinische Gerätetechnik“, „Gesundheitsmechatronik“ und „Medizin- und Gesundheitsinformatik“ vermittelt wird.
          <br><br>
          Die Absolventen/innen der Höheren Lehranstalt für Biomedizin- und Gesundheitstechnik können ingenieurmäßige Tätigkeiten auf den Gebieten Diagnose und Therapie, Bildverarbeitung, Prothesen- und Implantattechnik sowie in Rehabilitations-, Sportgeräte- und Wellnesstechnik ausführen. Dabei steht die Planung, Entwicklung und Realisierung medizintechnischer Geräte, der Entwurf und Implementierung von Softwarelösungen auf den Gebieten der Biologie, Medizin und des Gesundheitswesens, die Auswahl, Analyse, messtechnische Überprüfung bzw. der Test  der Komponenten, Module und Systeme im Vordergrund.
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
          imageTextBlob.subheading("mit der Biomedizin");
          imageTextBlob.content("Demnächst in der Nähe? Komm uns besuchen, wir freuen uns auf dich! Wir ermöglichen dir als SchnupperschülerIn in die Welt der Biomedizin einzutauchen.")
          // imageTextBlob.linktext("Einen Besuch planen")
          imageTextBlob.linkhref("tagesschule/elektrotechnik")
          imageTextBlob.address("Wexstraße 19-23, 1200 Wien / 12. Stock");
          imageTextBlob.email("office-hbg@tgm.ac.at");
          imageTextBlob.tel("01 33 126 321");
          imageTextBlob.image('url("/res/img/biomedKontakt.png")');
          return new WrapperSection(imageTextBlob) as any
        }), val: () => import(/* webpackChunkName: "imageTextblob" */"../../../../../_text/imageTextblob/imageTextblob")
      },
      {
        key: new Import("footer", 1, (_Footer: typeof Footer) => 
          new _Footer()
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
