import { declareComponent } from "../../../../../../../lib/declareComponent"
import LazySectionedPage from "../lazySectionedPage"
import { set } from "../../../../../../../lib/domain"
import { ImportanceMap, Import } from "../../../../../../../lib/lazyLoad"
import TestSection1 from "../../../../_pageSection/testSection1/testSection1"
import TestSection2 from "../../../../_pageSection/testSection2/testSection2"
import Thumbnail from "../../../../../_text/_thumbnail/_cardThumbnail/cardThumbnail"
import WrapperSection from "../../../../_pageSection/wrapperSection/wrapperSection"
import Info from "../../../../../_text/_sectionTextblob/ausbildungSection/ausbildungSection"
import AusmachtSection from "../../../../_pageSection/ausmachtSection/elAusmachtSection/elAusmachtSection"
import ImageTextblob from "../../../../../_text/imageTextblob/imageTextblob"
import Footer from "../../../../_pageSection/footer/footer"
import DarkNewsSection from "../../../../_pageSection/triangleNews/elektrotechnikTriangleNews/elektrotechnikTriangleNews"


export default class KunststoffPage extends LazySectionedPage {
  constructor(baseLink: string, sectionChangeCallback?: (section: string) => void) {
    
    super(new ImportanceMap<() => Promise<any>, any>(
      {
        key: new Import("", 1, (_Thumbnail: typeof Thumbnail) => {
          let e = new _Thumbnail(baseLink)
          e.heading("Kunststofftechnik")
          e.subheading("der Tagesschule")
          e.note("abteilung");
          e.videolink("https://www.youtube.com/watch?v=7CPDqPgWjxM", "Einblick in die HKT")
          
          e.background("ktLanding.png")
          
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
          info.content(`Als weltweit erste und einzige HTL Ausbildung für Kunststofftechnik im Osten Österreichs begleiten wir am TGM seit 1963 angehende Ingenieurinnen und Ingenieure auf ihrem Weg in die Industrie.<br><br>Kunststoff ist ein moderner Werkstoff, der unser Leben in vielfältiger Weise verbessert, sei es durch Artikel des täglichen Lebens oder durch hochtechnische Erzeugnisse wie Teile im Automobil- und Flugzeugbau.<br>Wir lehren aber nicht nur moderne Technologien zur Herstellung, sondern vor allem auch wichtige Recyclingmethoden, um eine Kreislaufwirtschaft sicherzustellen. Österreich gilt als Pioniernation in der Kunststofftechnik und beheimatet zahlreiche GlobalPlayer, die mit unseren Absolventinnen und Absolventen zu Weltmarktführern in der Materialherstellung, im Kunststoffmaschinenbau und in Produktsparten, wie der Verpackungs- und Medizintechnik, geworden sind. Einen Einblick in die unzähligen Einsatzgebiet für Kunststoffe kann man <c-link link="https://www.plasticseurope.org/de/about-plastics/what-are-plastics/innovative-material">hier</c-link> finden.`)


          return new WrapperSection(info) as any
        }), val: () => import(/* webpackChunkName: "sectionTextblob" */"../../../../../_text/_sectionTextblob/ausbildungSection/ausbildungSection")
      },
      {
        key: new Import("highlights", 1, (_AusmachtSection: typeof AusmachtSection) => 
          new _AusmachtSection(baseLink + "highlights/")
        ), val: () => import(/* webpackChunkName: "ausmachtSectionElektonik" */"../../../../_pageSection/ausmachtSection/ktAusmachtSection/ktAusmachtSection")
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
          imageTextBlob.subheading("zur Kunststofftechnik");
          imageTextBlob.content("Demnächst in der Nähe? Komm uns besuchen, wir freuen uns auf dich! Wir ermöglichen dir als SchnupperschülerIn in die Welt der Kunststofftechnik einzutauchen.")
          // imageTextBlob.linktext("Einen Besuch planen")
          imageTextBlob.linkhref("tagesschule/Kunststofftechnik")
          imageTextBlob.address("Wexstraße 19-23, 1200 Wien / 10. Stock");
          imageTextBlob.email("office-hkt@tgm.ac.at");
          imageTextBlob.tel("01 33 126 / 300");
          imageTextBlob.image('ktContact');
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

declareComponent("kunststoff-page", KunststoffPage)
