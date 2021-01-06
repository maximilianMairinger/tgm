import { declareComponent } from "../../../../../../../lib/declareComponent"
import LazySectionedPage from "../lazySectionedPage"
import { set } from "../../../../../../../lib/domain"
import { ImportanceMap, Import } from "../../../../../../../lib/lazyLoad"
import TestSection1 from "../../../../_pageSection/testSection1/testSection1"
import TestSection2 from "../../../../_pageSection/testSection2/testSection2"
import Thumbnail from "../../../../../_text/_thumbnail/_cardThumbnail/cardThumbnail"
import WrapperSection from "../../../../_pageSection/wrapperSection/wrapperSection"
import Info from "../../../../../_text/_sectionTextblob/ausbildungSection/ausbildungSection"
import AusmachtSection from "../../../../_pageSection/ausmachtSection/itAusmachtSection/itAusmachtSection"
import ImageTextblob from "../../../../../_text/imageTextblob/imageTextblob"
import Footer from "../../../../_pageSection/footer/footer"
import DarkNewsSection from "../../../../_pageSection/triangleNews/itTriangleNews/itTriangleNews"


export default declareComponent("it-page", class ItPage extends LazySectionedPage {
  constructor(baseLink: string, sectionChangeCallback?: (section: string) => void) {
    
    super(new ImportanceMap<() => Promise<any>, any>(
      {
        key: new Import("", 1, (_Thumbnail: typeof Thumbnail) => {
          let e = new _Thumbnail(baseLink)
          e.heading("Informationstechnologie")
          e.subheading("der Tagesschule")
          e.note("abteilung");
          e.background("itMain.png")
          e.videolink("https://www.youtube.com/watch?v=93aXzeeolkY")
          
          
          return new WrapperSection(e, "dark") as any
        }), val: () => import(/* webpackChunkName: "thumbnail" */"../../../../../_text/_thumbnail/_cardThumbnail/cardThumbnail")
      },
      {
        key: new Import("info", 1, (_Info: typeof Info) => {
          let info = new _Info()

          info.note("Unsere");
          info.heading("Individualisierte IT-Ausbildung");
          info.subheading("technisch, pädagogisch und didaktisch");
          info.hsize({max:68, min:40});
          info.hmobile({max:40, min:30});
          info.content("Die Informationstechnologie ist mit der Digitalisierung der treibende Faktor unserer Zeit. Unsere Ausbildung gibt dir ein umfassendes technisches Verständnis für die Digitalisierung und ermöglicht dir damit, in jeder Branche, in jedem Unternehmen und in nahezu jeder Berufsrolle einzusteigen. Dafür setzten wir in Pädagogik und Didaktik auf Individualisierung und unterstützen dich mit dem Lernbüro auf deinem persönlichen Weg in die IT. Ganz egal ob IT-Security, Big-Data, Game- & App-Development, Sichere Webentwicklung oder Digital Media-Art & Design.")

          return new WrapperSection(info) as any
        }), val: () => import(/* webpackChunkName: "sectionTextblob" */"../../../../../_text/_sectionTextblob/ausbildungSection/ausbildungSection")
      },
      {
        key: new Import("highlights", 1, (_AusmachtSection: typeof AusmachtSection) => 
          new _AusmachtSection(baseLink + "highlights/")
        ), val: () => import(/* webpackChunkName: "ausmachtSection" */"../../../../_pageSection/ausmachtSection/itAusmachtSection/itAusmachtSection")
      },
      // {
      //   key: new Import("news", 1, (_DarkNewsSection: typeof DarkNewsSection) => 
      //     new _DarkNewsSection(baseLink + "highlights/")
      //   ), val: () => import(/* webpackChunkName: "elektrotechnikNews" */"../../../../_pageSection/triangleNews/itTriangleNews/itTriangleNews")
      // },
      {
        key: new Import("kontakt", 1, (_ImageTextblob: typeof ImageTextblob) => {
          let imageTextBlob = new _ImageTextblob('right');

          imageTextBlob.heading("Kontakt");
          imageTextBlob.subheading("zur IT");
          imageTextBlob.content("Demnächst in der Nähe? Komm uns besuchen, wir freuen uns auf dich! Wir ermöglichen dir als SchnupperschülerIn in die Welt der Informationstechnologie einzutauchen.")
          // imageTextBlob.linktext("Einen Besuch planen")
          // imageTextBlob.linkhref("tagesschule/informationstechnologie")
          imageTextBlob.address("Wexstraße 19-23, 1200 Wien / 9. Stock");
          imageTextBlob.email("office-hit@tgm.ac.at");
          imageTextBlob.tel("+43 1 33126 291");
          imageTextBlob.image('itContact');
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