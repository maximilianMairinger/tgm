import { declareComponent } from "../../../../../../../lib/declareComponent"
import LazySectionedPage from "../lazySectionedPage"
import { set } from "../../../../../../../lib/domain"
import { ImportanceMap, Import } from "../../../../../../../lib/lazyLoad"
import TestSection1 from "../../../../_pageSection/testSection1/testSection1"
import TestSection2 from "../../../../_pageSection/testSection2/testSection2"
import Thumbnail from "../../../../../../_themeAble/_text/_thumbnail/thumbnail"
import WrapperSection from "../../../../_pageSection/wrapperSection/wrapperSection"
import Info from "../../../../../../_themeAble/_text/_sectionTextblob/ausbildungSection/ausbildungSection"
import AusmachtSection from "../../../../_pageSection/ausmachtSection/ausmachtSection"
import ImageTextblob from "../../../../../../_themeAble/_text/imageTextblob/imageTextblob"
import Footer from "../../../../_pageSection/footer/footer"
import DarkNewsSection from "../../../../_pageSection/darkNewsSection/darkNewsSection"


export default declareComponent("raumfahrt-page", class RaumfahrtPage extends LazySectionedPage {
  constructor(sectionChangeCallback?: (section: string) => void) {
    
    super(new ImportanceMap<() => Promise<any>, any>(
      {
        key: new Import("", 1, (_Thumbnail: typeof Thumbnail) => 
          new WrapperSection(new _Thumbnail(), "dark") as any
        ), val: () => import(/* webpackChunkName: "thumbnail" */"../../../../../../_themeAble/_text/_thumbnail/_cardThumbnail/raumfahrtThumbnail/raumfahrtThumbnail")
      },
      {
        key: new Import("info", 1, (_Info: typeof Info) => {
          let info = new _Info()

          info.heading("Technische Ausbildung");
          info.subheading("am Puls der Zeit");
          info.note("unsere");
          info.hsize({max:68, min:40});
          info.hmobile({max:40, min:30});
          info.content("In der Abteilung für Raumfahrttechnik erhalten SchülerInnen eine fundierte Ausbildung in den wichtigsten Aerospace-Themenbereichen. Unser rigoroser Lehrplan ermöglicht AbsolventInnen den Einstieg in die Industrie und öffnet Türen für eine tertiäre Ausbildung.")

          return new WrapperSection(info) as any
        }), val: () => import(/* webpackChunkName: "sectionTextblob" */"../../../../../../_themeAble/_text/_sectionTextblob/ausbildungSection/ausbildungSection")
      },
      {
        key: new Import("highlights", 1, (_AusmachtSection: typeof AusmachtSection) => 
          new _AusmachtSection()
        ), val: () => import(/* webpackChunkName: "ausmachtSection" */"../../../../_pageSection/ausmachtSection/ausmachtSection")
      },
      {
        key: new Import("news", 1, (_DarkNewsSection: typeof DarkNewsSection) => 
          new _DarkNewsSection()
        ), val: () => import(/* webpackChunkName: "darkNewsSection" */"../../../../_pageSection/darkNewsSection/darkNewsSection")
      },
      {
        key: new Import("kontakt", 1, (_ImageTextblob: typeof ImageTextblob) => {
          let imageTextBlob = new _ImageTextblob('right');

          imageTextBlob.heading("Kontakt");
          imageTextBlob.subheading("zur Raumfahrttechnik");
          imageTextBlob.content("Demnächst in der Nähe? Komm uns besuchen, wir freuen uns auf dich. Wir ermöglichen dir als SchnupperschülerIn in die Welt der Raumfahrt einzutauchen.")
          imageTextBlob.linktext("Einen Besuch planen")
          imageTextBlob.linkhref("tagesschule/raumfahrt")
          imageTextBlob.address("Wexstraße 123 / 100. Stock");
          imageTextBlob.email("avhrt@tgm.ac.at");
          imageTextBlob.tel("+43 1 33126 291");
          imageTextBlob.image('url("/res/img/computersRaumfahrt.jpg")');
          return new WrapperSection(imageTextBlob) as any
        }), val: () => import(/* webpackChunkName: "imageTextblob" */"../../../../../../_themeAble/_text/imageTextblob/imageTextblob")
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

  stl() {
    return super.stl() + require("./raumfahrtPage.css").toString()
  }
  pug() {
    return require("./raumfahrtPage.pug").default
  }

}) 