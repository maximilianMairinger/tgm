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


export default class WIPage extends LazySectionedPage {
  constructor(sectionChangeCallback?: (section: string) => void) {
    
    super(new ImportanceMap<() => Promise<any>, any>(
      {
        key: new Import("", 1, (_Thumbnail: typeof Thumbnail) => {
          let e = new _Thumbnail()
          e.heading("Wirtschaftsingenieure")
          e.subheading("der Tagesschule")
          e.note("abteilung");
          e.background("stockMan.png")
          
          return new WrapperSection(e, "dark") as any
        }), val: () => import(/* webpackChunkName: "thumbnail" */"../../../../../_text/_thumbnail/_cardThumbnail/cardThumbnail")
      },
      {
        key: new Import("info", 1, (_Info: typeof Info) => {
          let info = new _Info()

          info.content(`Wirtschaftsingenieure sind echte Allrounder, da sie durch ihre fundierte technische und wirtschaftliche Ausbildung nicht nur Spezialisten sind, sondern auch Abläufe an den wesentlichen Schnittstellen im Unternehmen gestalten. Entscheidest DU dich für unsere Abteilung dann entscheidest du dich für eine sehr breit gefächerte Ausbildung, die so vielfältig ist wie das LEBEN selbst.
          <br><br>
          Als Wirtschaftsingenieur bzw. Wirtschaftsingenieurin bekommst du neben Fachtheorie und Fachpraxis wichtige <c-link link="tagesschule/wirtschaftsingenieure/info/softskills">Softskills</c-link> vermittelt, die dich nach der Ausbildung für Managementposition qualifizieren. Wir unterstützen unsere Absolventen auch noch nach der bestandenen Reife- und Diplomprüfung. 
          Aus diesem Grund arbeiten wir stets an <c-link link="tagesschule/wirtschaftsingenieure/info/kooperationen">Kooperationsvereinbarungen</c-link> mit verschiedenen Fachhochschulen. Das bedeutet für DICH, dass dir einige Inhalte deiner Ausbildung angerechnet werden, und dein Studium dadurch kürzer wird.
          `)

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
          imageTextBlob.address("Wexstraße 19-23 / 3. Stock");
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

  stl() {
    return super.stl() + require("./wiPage.css").toString()
  }
  pug() {
    return require("./wiPage.pug").default
  }

}

declareComponent("wirtschafts-ingenieure-page", WIPage)