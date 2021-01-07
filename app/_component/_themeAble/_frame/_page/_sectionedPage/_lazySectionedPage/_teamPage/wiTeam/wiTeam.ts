import { declareComponent } from "../../../../../../../../lib/declareComponent"
import TeamPage from "../teamPage"
import { ImportanceMap, Import } from "../../../../../../../../lib/lazyLoad"
import WrapperSection from "../../../../../_pageSection/wrapperSection/wrapperSection"
import Thumbnail from "../../../../../../_text/_thumbnail/thumbnail";
import TeamSection from "../../../../../../_text/_sectionTextblob/teamSection/teamSection";
import ImageTextblob from "../../../../../../_text/imageTextblob/imageTextblob"
import Footer from "../../../../../_pageSection/footer/footer"

export default declareComponent("wirtschaftsingenieure-team", class WiTeam extends TeamPage {
  constructor(baseLink: string, sectionChangeCallback?: (section: string) => void) {
    
    super(new ImportanceMap<() => Promise<any>, any>(
        {
            key: new Import("", 1, (thumbnail: typeof Thumbnail) => {
                let e = new thumbnail();
                e.note("mit");
                e.heading("Teamgeist");
                e.subheading("in die Zukunft");
                e.background("landingTeamLeitung.jpg")
                return new WrapperSection(e, 'dark') as any
            }), val: () => import(/* webpackChunkName: "thumbnail" */"../../../../../../_text/_thumbnail/thumbnail")
        },
        {
            key: new Import("info", 1, (Team: typeof Element) =>
                {
                    let teamSection = new (Team as typeof TeamSection)();
                    teamSection.subheading("der WI");
                    teamSection.note("das")
                    teamSection.content("Die Lehrkräfte der Höheren Lehranstalt für Wirtschaftsingenieure ermöglichen dank Erfahrung mit viel Engagement individuelle Förderung zur optimalen Entwicklung der Schülerinnen und Schüler.")
                    return new WrapperSection(teamSection);
                }
            ), val: () => import(/* webpackChunkName: "teamSection" */"../../../../../../_text/_sectionTextblob/teamSection/teamSection")
        },
        {
            key: new Import("leitung", 1, (leitung: typeof Element) =>
                {
                    let leitungImageTextblob = new (leitung as typeof ImageTextblob)();
                    leitungImageTextblob.note("Abteilungsvorstand");
                    leitungImageTextblob.heading("DI Angerer");
                    leitungImageTextblob.subheading("Georg");
                    // leitungImageTextblob.content("Erreichbar von Montag bis Freitag zwischen 8:00 und 11:00 Uhr. ")
                    leitungImageTextblob.address("Wexstraße 19-23, 1200 Wien / 5. Stock");
                    leitungImageTextblob.email("georg.angerer@tgm.ac.at");
                    leitungImageTextblob.tel("0664 80126262");
                    leitungImageTextblob.image('unknownMan');
                    // leitungImageTextblob.stellvertreter([{"name":"Stefan Hertl", "email":"shertl@tgm.ac.at"}])
                    return new WrapperSection(leitungImageTextblob);
                }
            ), val: () => import(/* webpackChunkName: "leitung" */"../../../../../../_text/imageTextblob/imageTextblob")
        },
        {
            key: new Import("schueler", 1, (schueler: typeof Element) =>
                {
                    let schuelerImageTextblob = new (schueler as typeof ImageTextblob)();
                    schuelerImageTextblob.alignment('left');
                    schuelerImageTextblob.note("schülervertretung");
                    schuelerImageTextblob.heading("Kaan");
                    schuelerImageTextblob.subheading("Yigitbilek");
                    schuelerImageTextblob.content("Ich darf euch dieses Jahr als Abteilungssprecher vertreten, bei Anliegen bitte einfach melden!")
                    schuelerImageTextblob.address("Wexstraße 19-23, 1200 Wien / 11. Stock");
                    schuelerImageTextblob.email("kyigitbilek@student.tgm.ac.at");
                    // schuelerImageTextblob.tel("+43 ‭650 7311330‬");
                    schuelerImageTextblob.image('team_2');
                    schuelerImageTextblob.stellvertreter([{"name":"Jakob Masching", "email":"jmasching@student.tgm.ac.at "}])
                    return new WrapperSection(schuelerImageTextblob);
                }
            ), val: () => import(/* webpackChunkName: "imageTextblob" */"../../../../../../_text/imageTextblob/imageTextblob")
        },
        {
          key: new Import("footer", 1, (_Footer: typeof Footer) => 
            new _Footer(baseLink + "schueler/")
          ), val: () => import(/* webpackChunkName: "footer" */"../../../../../_pageSection/footer/footer")
        }
    ), sectionChangeCallback, undefined, {
        footer: "schueler"
    })

      this.elementBody.append(ce("circle-feature"))

  }


  pug() {
    return "";
  }

}) 