import { declareComponent } from "../../../../../../../lib/declareComponent"
import LazySectionedPage from "../lazySectionedPage"
import { set } from "../../../../../../../lib/domain"
import { ImportanceMap, Import } from "../../../../../../../lib/lazyLoad"
import TestSection1 from "../../../../_pageSection/testSection1/testSection1"
import TestSection2 from "../../../../_pageSection/testSection2/testSection2"
import Thumbnail from "../../../../../_text/_thumbnail/_cardThumbnail/cardThumbnail"
import WrapperSection from "../../../../_pageSection/wrapperSection/wrapperSection"
import Info from "../../../../../_text/_sectionTextblob/ausbildungSection/ausbildungSection"
import AusmachtSection from "../../../../_pageSection/ausmachtSection/etAusmachtSection/etAusmachtSection"
import ImageTextblob from "../../../../../_text/imageTextblob/imageTextblob"
import Footer from "../../../../_pageSection/footer/footer"
import DarkNewsSection from "../../../../_pageSection/triangleNews/triangleNews"



export default class ElektronikPage extends LazySectionedPage {
  constructor(baseLink: string, sectionChangeCallback?: (section: string) => void) {
    
    super(new ImportanceMap<() => Promise<any>, any>(
      {
        key: new Import("", 1, (_Thumbnail: typeof Thumbnail) => {
          let e = new _Thumbnail(baseLink)
          e.heading("Elektronik & Technische Informatik")
          e.subheading("der Tagesschule")
          e.note("abteilung");
          e.videolink("https://www.youtube.com/watch?v=FYY0FSMk70s", "Einblick in die HEL")
          e.background("elektronikLanding.png")
          
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
          info.content("Ohne elektronische Geräte ist unser tägliches Leben praktisch nicht mehr vorstellbar. Die Elektronik hat in den letzten Jahrzehnten eine besonders rasante Entwicklung erfahren. Der Entwurf, die Fertigung, der Vertrieb, die Inbetriebnahme und Wartung elektronischer Schaltungen bzw. Geräte, insbesondere der angeführten Elektronikbranchen, stellen einen wesentlichen Wirtschaftsfaktor unseres Landes dar.")

          return new WrapperSection(info) as any
        }), val: () => import(/* webpackChunkName: "sectionTextblob" */"../../../../../_text/_sectionTextblob/ausbildungSection/ausbildungSection")
      },
      {
        key: new Import("highlights", 1, (_AusmachtSection: typeof AusmachtSection) => 
          new _AusmachtSection(baseLink + "highlights/")
        ), val: () => import(/* webpackChunkName: "ausmachtSectionElektonik" */"../../../../_pageSection/ausmachtSection/elAusmachtSection/elAusmachtSection")
      },
      {
        key: new Import("news", 1, (_DarkNewsSection: typeof DarkNewsSection) => 
          new _DarkNewsSection({
            text: {
              note: "Termine und",
              heading: "Aktuelles",
              subheading: "aus der ET",
              content: `In unseren Blogartikeln berichten wir über Events, Wettbewerbe und außergewöhnliche Leistungen.`
            },
          }, true, ["hel"])
        ), val: () => import(/* webpackChunkName: "news" */"../../../../_pageSection/triangleNews/triangleNews")
      },
      {
        key: new Import("kontakt", 1, (_ImageTextblob: typeof ImageTextblob) => {
          let imageTextBlob = new _ImageTextblob('right');

          imageTextBlob.heading("Kontakt");
          imageTextBlob.subheading("zur Elektronik");
          imageTextBlob.content("Demnächst in der Nähe? Komm uns besuchen, wir freuen uns auf dich! Wir ermöglichen dir als SchnupperschülerIn in die Welt der Elektrotechnik einzutauchen.")
          // imageTextBlob.linktext("Einen Besuch planen")
          imageTextBlob.linkhref("tagesschule/Elektronik")
          imageTextBlob.address("Wexstraße 19-23, 1200 Wien / 12. Stock");
          imageTextBlob.email("office-hel@tgm.ac.at");
          imageTextBlob.tel("01 33 126 320");
          imageTextBlob.image('elContact');
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

declareComponent("elektronik-page", ElektronikPage)
