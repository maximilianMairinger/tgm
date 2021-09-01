import { declareComponent } from "../../../../../../../lib/declareComponent"
import LazySectionedPage from "../lazySectionedPage"
import { set } from "../../../../../../../lib/domain"
import { ImportanceMap, Import } from "../../../../../../../lib/lazyLoad"
import TestSection1 from "../../../../_pageSection/testSection1/testSection1"
import TestSection2 from "../../../../_pageSection/testSection2/testSection2"
import Thumbnail from "../../../../../_text/_thumbnail/_cardThumbnail/cardThumbnail"
import WrapperSection from "../../../../_pageSection/wrapperSection/wrapperSection"
import Info from "../../../../../_text/_sectionTextblob/ausbildungSection/ausbildungSection"
import AusmachtSection from "../../../../_pageSection/ausmachtSection/_abendAusmachtSection/abendVorbereitungsAusmachtSection/abendVorbereitungsAusmachtSection"
import ImageTextblob from "../../../../../_text/imageTextblob/imageTextblob"
import Footer from "../../../../_pageSection/footer/footer"
import NewsSection from "../../../../_pageSection/triangleNews/triangleNews"


export default abstract class TagPage extends LazySectionedPage {
  constructor(baseLink: string, heading: {heading: string, subheading: string, note: string}, getAusmachtSectionFunc: () => any, sectionChangeCallback?: (section: string) => void, infoText?: string) {
    
    super(new ImportanceMap<() => Promise<any>, any>(
      {
        key: new Import("", 1, (_Thumbnail: typeof Thumbnail) => {
          let e = new _Thumbnail(
            ["anmelden", "Anmelden", undefined, "https://anmeldung.tgm.ac.at/anmeldung/"],
            ["projekte", "Projekte", undefined, baseLink + "projekte"],
            ["team", "Team", undefined, baseLink + "team"]
          )
          for (let h in heading) {
            e[h](heading[h])
          }
          
          e.background("abendschuleVorbereitung2")
          
          
          return new WrapperSection(e, "dark") as any
        }), val: () => import(/* webpackChunkName: "thumbnail" */"../../../../../_text/_thumbnail/_cardThumbnail/cardThumbnail")
      },
      {
        key: new Import("allgemeines", 1, (_Info: typeof Info) => {
          let info = new _Info()

          info.note("jetzt");
          info.heading("Nutzen Sie die Gelegenheit");
          info.subheading("Bilden Sie sich weiter")
          info.hsize({max:68, min:40});
          info.hmobile({max:40, min:30});
          if (!infoText) info.content("Mit einer Ausbildung in der Höheren Lehranstalt für Berufstätige am TGM können Sie Ihre beruflichen Zukunftsperspektiven erweitern. Unterstützt werden Sie dabei durch klare Unterrichtskonzepte mit Flexibilität, Blended Learning Szenarien, Verknüpfung von Theorie und Praxis, erfahrene und engagierte Lehrende, Expertinnen und Experten aus Wirtschaft und Industrie... Ihr nächster Karriereschritt ist für Sie bei uns äußerst gut plan- und organisierbar!")
          else info.content(infoText)

          return new WrapperSection(info) as any
        }), val: () => import(/* webpackChunkName: "sectionTextblob" */"../../../../../_text/_sectionTextblob/ausbildungSection/ausbildungSection")
      },
      {
        key: new Import("info", 1, (_AusmachtSection: typeof AusmachtSection) => 
          new _AusmachtSection(baseLink + "info/")
        ), val: getAusmachtSectionFunc
      },
      // {
      //   key: new Import("news", 1, (_DarkNewsSection: typeof NewsSection) => 
      //     new _DarkNewsSection({
      //       text: {
      //         note: "Termine und",
      //         heading: "Aktuelles",
      //         subheading: "aus der IT",
      //         content: `In unseren Blogartikeln berichten wir über Events, Wettbewerbe und außergewöhnliche Leistungen. Sie können uns auf <c-link link="https://instagram.com/tgmhit/">Instagram</c-link> oder <c-link link="https://facebook.com/tgmhit/">Facebook</c-link> Seite folgen, um am Laufenden zu bleiben.`
      //       }
      //     }, true, ["hit"])
      //   ), val: () => import(/* webpackChunkName: "news" */"../../../../_pageSection/triangleNews/triangleNews")
      // },
      {
        key: new Import("kontakt", 1, (_ImageTextblob: typeof ImageTextblob) => {
          let imageTextBlob = new _ImageTextblob('right');

          imageTextBlob.heading("Kontakt");
          imageTextBlob.subheading("zu Ihrem Ansprechpartner");
          imageTextBlob.content(`Wir stehen Ihnen gerne außerhalb der Unterrichtszeiten nach Terminvereinbarung für ein persönliches Gespräch zur Verfügung. Bitte besuchen Sie die <c-link link="./team">Teamseite</c-link>, um Ihren Ansprechpartner zu finden.`)
          // imageTextBlob.linktext("Einen Besuch planen")
          // imageTextBlob.linkhref("tagesschule/informationstechnologie")
          // imageTextBlob.address("Wexstraße 19-21, 1200 Wien / 5. Stock / H525");
          // imageTextBlob.email("office-hlb@tgm.ac.at");
          // imageTextBlob.tel("01 33 126 251");
          imageTextBlob.image('contactAbendschule');
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
