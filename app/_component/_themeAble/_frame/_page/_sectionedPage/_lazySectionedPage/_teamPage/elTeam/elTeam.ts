import { declareComponent } from "../../../../../../../../lib/declareComponent"
import TeamPage from "../teamPage"
import { ImportanceMap, Import } from "../../../../../../../../lib/lazyLoad"
import WrapperSection from "../../../../../_pageSection/wrapperSection/wrapperSection"
import Thumbnail from "../../../../../../_text/_thumbnail/thumbnail";
import TeamSection from "../../../../../../_text/_sectionTextblob/teamSection/teamSection";
import ImageTextblob from "../../../../../../_text/imageTextblob/imageTextblob"
import Footer from "../../../../../_pageSection/footer/footer"

export default declareComponent("elektronik-team", class ElektronikTeam extends TeamPage {
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
                    teamSection.subheading("der EL");
                    teamSection.note("das")
                    teamSection.content("Die Lehrkräfte der Höheren Lehranstalt für Elektronik ermöglichen dank ihrer Erfahrung individuelle Förderung zur optimalen Entwicklung der Schülerinnen und Schüler.")
                    return new WrapperSection(teamSection);
                }
            ), val: () => import(/* webpackChunkName: "teamSection" */"../../../../../../_text/_sectionTextblob/teamSection/teamSection")
        },
        {
            key: new Import("leitung", 1, (leitung: typeof Element) =>
                {
                    let leitungImageTextblob = new (leitung as typeof ImageTextblob)();
                    leitungImageTextblob.note("Abteilungsvorstand");
                    leitungImageTextblob.heading("DI Dr. Wess");
                    leitungImageTextblob.subheading("Bernhard");
                    leitungImageTextblob.content("Ich stehe Ihnen gerne am Dienstag von 9:50 bis 10:40 in meiner Sprechstunde zu Verfügung.")
                    leitungImageTextblob.address("Wexstraße 19-21, 1200 Wien / 12. Stock / H1226");
                    leitungImageTextblob.email("bernhard.wess@tgm.ac.at");
                    leitungImageTextblob.tel("01 33 126 320");
                    leitungImageTextblob.image('url("/res/img/avwess.png")');
                    leitungImageTextblob.stellvertreter([{"name":"Mag. Elisabeth Völk", "email":"evoelk@tgm.ac.at"}])
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
                    schuelerImageTextblob.heading("Tauber");
                    schuelerImageTextblob.subheading("Tobias");
                    schuelerImageTextblob.content("Ich darf euch dieses Jahr als Abteilungssprecher vertreten, bei Anliegen bitte einfach melden!")
                    schuelerImageTextblob.address("Wexstraße 19-23, 1200 Wien / 12. Stock");
                    schuelerImageTextblob.email("ttauberk@student.tgm.ac.at");
                    // schuelerImageTextblob.tel("+43 ‭650 7311330‬");
                    schuelerImageTextblob.image('url("/res/img/team_2.jpg")');
                    schuelerImageTextblob.stellvertreter([{"name":"Benjamin Thurn und Taxis", "email":"bthurn@student.tgm.ac.at"}])
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