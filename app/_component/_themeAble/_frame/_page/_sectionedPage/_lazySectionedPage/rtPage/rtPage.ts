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
import NewsSection from "../../../../_pageSection/triangleNews/triangleNews"


export default declareComponent("rt-page", class RtPage extends LazySectionedPage {
  constructor(baseLink: string, sectionChangeCallback?: (section: string) => void) {
    
    super(new ImportanceMap<() => Promise<any>, any>(
      {
        key: new Import("", 1, (_Thumbnail: typeof Thumbnail) => {
          let e = new _Thumbnail(baseLink)
          e.heading("Raumfahrttechnik")
          e.subheading("der Tagesschule")
          e.note("abteilung");
          e.background("rocket.png")
          
          return new WrapperSection(e, "dark") as any
        }), val: () => import(/* webpackChunkName: "thumbnail" */"../../../../../_text/_thumbnail/_cardThumbnail/cardThumbnail")
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
        }), val: () => import(/* webpackChunkName: "sectionTextblob" */"../../../../../_text/_sectionTextblob/ausbildungSection/ausbildungSection")
      },
      {
        key: new Import("highlights", 1, (_AusmachtSection: typeof AusmachtSection) => 
          new _AusmachtSection(baseLink + "highlights/")
        ), val: () => import(/* webpackChunkName: "ausmachtSectionRaumfahrt" */"../../../../_pageSection/ausmachtSection/rtAusmachtSection/rtAusmachtSection")
      },
      {
        key: new Import("news", 1, (_NewsSection: typeof NewsSection) => 
          new _NewsSection({
            text: {
              note: "Termine und",
              heading: "Aktuelles",
              subheading: "aus der RT",
              content: `Bei rund 3000 Schülern geschieht ständig etwas. Bleiben Sie informiert, indem Sie unserer <c-link link="https://instagram.com/tgmhit/">Instagram</c-link> oder <c-link link="https://facebook.com/tgmhtl/">Facebook</c-link> Seite folgen.`
            }
          }, true, ["rt"])
        ), val: () => import(/* webpackChunkName: "raumfahrtNews" */"../../../../_pageSection/triangleNews/triangleNews")
      },
      {
        key: new Import("kontakt", 1, (_ImageTextblob: typeof ImageTextblob) => {
          let imageTextBlob = new _ImageTextblob('right');

          imageTextBlob.heading("Kontakt");
          imageTextBlob.subheading("zur Raumfahrttechnik");
          imageTextBlob.content("Demnächst in der Nähe? Komm uns besuchen, wir freuen uns auf dich. Wir ermöglichen dir als SchnupperschülerIn in die Welt der Raumfahrt einzutauchen.")
          // imageTextBlob.linktext("Einen Besuch planen")
          imageTextBlob.linkhref("tagesschule/raumfahrt")
          imageTextBlob.address("Wexstraße 19-23, 1200 Wien / 100. Stock");
          imageTextBlob.email("avhrt@tgm.ac.at");
          imageTextBlob.tel("+43 1 33126 291");
          imageTextBlob.image('computersRaumfahrt');
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

}) 