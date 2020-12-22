import { declareComponent } from "../../../../../../../lib/declareComponent"
import LazySectionedPage from "../lazySectionedPage"
import { set } from "../../../../../../../lib/domain"
import { ImportanceMap, Import } from "../../../../../../../lib/lazyLoad"
import TestSection1 from "../../../../_pageSection/testSection1/testSection1"
import TestSection2 from "../../../../_pageSection/testSection2/testSection2"
import Thumbnail from "../../../../../_text/_thumbnail/_cardThumbnail/cardThumbnail"
import WrapperSection from "../../../../_pageSection/wrapperSection/wrapperSection"
import Info from "../../../../../_text/_sectionTextblob/ausbildungSection/ausbildungSection"
import AusmachtSection from "../../../../_pageSection/ausmachtSection/ausmachtSectionRaumfahrt/ausmachtSectionRaumfahrt"
import ImageTextblob from "../../../../../_text/imageTextblob/imageTextblob"
import Footer from "../../../../_pageSection/footer/footer"
import DarkNewsSection from "../../../../_pageSection/triangleNews/elektrotechnikTriangleNews/elektrotechnikTriangleNews"


export default declareComponent("et-page", class EtPage extends LazySectionedPage {
  constructor(sectionChangeCallback?: (section: string) => void) {
    
    super(new ImportanceMap<() => Promise<any>, any>(
      {
        key: new Import("", 1, (_Thumbnail: typeof Thumbnail) => {
          let e = new _Thumbnail("elektrotechnik")
          e.heading("Elektrotechnik")
          e.subheading("der Tagesschule")
          e.note("abteilung");
          e.background("het_main.jpg")
          
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
          info.content("Die Abteilung Elektrotechnik bietet eine besonders umfassende technische Ausbildung. Grundsätzlich beschäftigt sie sich mit allen Bereichen, die mit elektrischem Strom zu tun haben. Dadurch ergeben sich viele Berufsfelder, etwa Antriebstechnik, Automation und Informatik in denen unsere Absolventen kompetent sind.")

          return new WrapperSection(info) as any
        }), val: () => import(/* webpackChunkName: "sectionTextblob" */"../../../../../_text/_sectionTextblob/ausbildungSection/ausbildungSection")
      },
      {
        key: new Import("highlights", 1, (_AusmachtSection: typeof AusmachtSection) => 
          new _AusmachtSection()
        ), val: () => import(/* webpackChunkName: "ausmachtSection" */"../../../../_pageSection/ausmachtSection/ausmachtSectionElektrotechnik/ausmachtSectionElektrotechnik")
      },
      {
        key: new Import("news", 1, (_DarkNewsSection: typeof DarkNewsSection) => 
          new _DarkNewsSection()
        ), val: () => import(/* webpackChunkName: "elektrotechnikNews" */"../../../../_pageSection/triangleNews/elektrotechnikTriangleNews/elektrotechnikTriangleNews")
      },
      {
        key: new Import("kontakt", 1, (_ImageTextblob: typeof ImageTextblob) => {
          let imageTextBlob = new _ImageTextblob('right');

          imageTextBlob.heading("Kontakt");
          imageTextBlob.subheading("zur Elektrotechnik");
          imageTextBlob.content("Demnächst in der Nähe? Komm uns besuchen, wir freuen uns auf dich! Wir ermöglichen dir als SchnupperschülerIn in die Welt der Elektrotechnik einzutauchen.")
          imageTextBlob.linktext("Einen Besuch planen")
          imageTextBlob.linkhref("tagesschule/elektrotechnik")
          imageTextBlob.address("Wexstraße 19-23, 1200 Wien / 3. Stock");
          imageTextBlob.email("tdeininger@tgm.ac.at");
          imageTextBlob.tel("+43 (1) 33 126 / 231");
          imageTextBlob.image('url("/res/img/elektrotechnik_kotakt.png")');
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

}) 