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
import News from "../../../../_pageSection/triangleNews/triangleNews"


export default class WIPage extends LazySectionedPage {
  constructor(baseLink: string, sectionChangeCallback?: (section: string) => void) {
    
    super(new ImportanceMap<() => Promise<any>, any>(
      {
        key: new Import("", 1, (_Thumbnail: typeof Thumbnail) => {
          let e = new _Thumbnail(baseLink)
          e.heading("Wirtschaftsingenieure")
          e.subheading("der Tagesschule")
          e.note("abteilung");
          e.background("stockMan.png")
          e.videolink("https://www.youtube.com/watch?v=ZjlZZGAfH5k")
          
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
          new _AusmachtSection(baseLink + "highlights/")
        ), val: () => import(/* webpackChunkName: "ausmachtSection" */"../../../../_pageSection/ausmachtSection/wiAusmachtSection/wiAusmachtSection")
      },
      // {
      //   key: new Import("news", 1, (_News: typeof News) => 
      //     new _News({
      //       text: {
      //         note: "Termine und",
      //         heading: "Aktuelles",
      //         subheading: "aus der WI",
      //         content: `Folge uns auf <c-link link="https://de-de.facebook.com/tgmhwi">Instagram</c-link> und <c-link link="https://www.instagram.com/tgm_wirtschaftsingenieure">Facebook</c-link>, so bist DU über unsere neuesten Aktivitäten immer up to date.`
      //       },
      //       cards: [
      //         {heading: "Samstag", note: "18.04.20", thumbnail: "/res/img/het-blog-rad.png", href: "/", contentTitle: "Elektro-Fahrrad", content: "Das Elektrofahrrad der ET-Abteilung wurde offiziell zugelassen und ist im Handel verfügbar."},
      //         {heading: "Montag", note: "20.04.20", thumbnail: "/res/img/het-blog-wind.png", href: "/", contentTitle: "Zukunft des Strom", content: "Am 20.12.2020 findet ein Vortrag zur Zukunft von erneuerbareren Energiegewinnungsmethoden statt."},
      //         {heading: "Donnerstag", note: "16.04.20", thumbnail: "/res/img/ball.jpg", href: "/", contentTitle: "TGM-Ball", content: "Der 100. TGM-Ball findet kommenden Donnerstag statt, jetzt Tickets sichern!"},
      //         {heading: "Samstag", note: "18.04.20", thumbnail: "/res/img/het-blog-rad.png", href: "/", contentTitle: "Elektro-Fahrrad", content: "Das Elektrofahrrad der ET-Abteilung wurde offiziell zugelassen und ist im Handel verfügbar."},
      //         {heading: "Montag", note: "20.04.20", thumbnail: "/res/img/het-blog-wind.png", href: "/", contentTitle: "Zukunft des Strom", content: "Am 20.12.2020 findet ein Vortrag zur Zukunft von erneuerbareren Energiegewinnungsmethoden statt."},
      //         {heading: "Donnerstag", note: "16.04.20", thumbnail: "/res/img/ball.jpg", href: "/", contentTitle: "TGM-Ball", content: "Der 100. TGM-Ball findet kommenden Donnerstag statt, jetzt Tickets sichern!"}
      //       ]
      //     })
      //   ), val: () => import(/* webpackChunkName: "news" */"../../../../_pageSection/triangleNews/triangleNews")
      // },
      {
        key: new Import("kontakt", 1, (_ImageTextblob: typeof ImageTextblob) => {
          let imageTextBlob = new _ImageTextblob('right');

          imageTextBlob.heading("Kontakt");
          imageTextBlob.subheading("zur WI");
          imageTextBlob.content(`DU würdest dir gerne selbst ein Bild von unserer Abteilung machen und einen oder vielleicht sogar alle drei Schwerpunkte kennenlernen? Dann melde dich für einen Schnuppertag an – tauche ein in die Welt der Technik, Wirtschaft und Informatik! Hier findest du das Anmeldeformular`)
          // imageTextBlob.linktext("Einen Besuch planen")
          imageTextBlob.linkhref("/")
          imageTextBlob.address("Wexstraße 19-23, 1200 Wien / 5. Stock");
          imageTextBlob.email("georg.angerer@tgm.ac.at");
          imageTextBlob.tel("0664 80126262");
          imageTextBlob.image('url("/res/img/wiKontakt.png")');
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

declareComponent("wi-page", WIPage)