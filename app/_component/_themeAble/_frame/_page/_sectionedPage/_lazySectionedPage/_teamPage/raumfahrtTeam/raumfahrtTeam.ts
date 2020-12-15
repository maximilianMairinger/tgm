import { declareComponent } from "../../../../../../../../lib/declareComponent"
import TeamPage from "../teamPage"
import { ImportanceMap, Import } from "../../../../../../../../lib/lazyLoad"
import WrapperSection from "../../../../../_pageSection/wrapperSection/wrapperSection"
import Thumbnail from "../../../../../../_text/_thumbnail/thumbnail";
import TeamSection from "../../../../../../_text/_sectionTextblob/teamSection/teamSection";
import ImageTextblob from "../../../../../../_text/imageTextblob/imageTextblob"

export default declareComponent("raumfahrt-team", class RaumfahrtTeam extends TeamPage {
  constructor(sectionChangeCallback?: (section: string) => void) {
    
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
                    teamSection.subheading("der RT Abteilung");
                    teamSection.content("We are a bunch of talented and passionate people who hate beige walls and dull parties. If this is your case you can always send us your information!\n" +
                        "\n" +
                        "Derzeit suchen wir nach einem LehrerInnen im bereich Softwareentwicklung, Fotographie, Graphic Design und Web-Entwicklung bestmöglichst mit Praxiserfahrung.")
                    return new WrapperSection(teamSection);
                }
            ), val: () => import(/* webpackChunkName: "teamSection" */"../../../../../../_text/_sectionTextblob/teamSection/teamSection")
        },
        {
            key: new Import("leitung", 1, (leitung: typeof Element) =>
                {
                    let leitungImageTextblob = new (leitung as typeof ImageTextblob)();
                    leitungImageTextblob.note("Abteilungvorstand");
                    leitungImageTextblob.heading("Cassidy");
                    leitungImageTextblob.subheading("Chris");
                    leitungImageTextblob.content("Erreichbar von Montag bis Freitag zwischen 8:00 und 11:00 Uhr. ")
                    leitungImageTextblob.address("Wexstraße 123 / 20. Stock / H2028");
                    leitungImageTextblob.email("abt-adminhrt@tgm.ac.at");
                    leitungImageTextblob.tel("+43 1 33126 291");
                    leitungImageTextblob.image('url("/res/img/team_1.png")');
                    leitungImageTextblob.stellvertreter([{"name":"Shane Kimbrough", "email":"skimbrough@tgm.ac.at"}, {"name":"Jim Outton", "email":"joutton@tgm.ac.at"}])
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
                    schuelerImageTextblob.heading("Jones");
                    schuelerImageTextblob.subheading("Lucas");
                    schuelerImageTextblob.content("Erreichbar von Montag bis Freitag zwischen 8:00 und 11:00 Uhr. ")
                    schuelerImageTextblob.address("Wexstraße 123 / 11. Stock");
                    schuelerImageTextblob.email("ljonest@student.tgm.ac.at");
                    schuelerImageTextblob.tel("+43 1 33126 291");
                    schuelerImageTextblob.image('url("/res/img/team_2.jpg")');
                    schuelerImageTextblob.stellvertreter([{"name":"Emanuel Knight", "email":"eknight@student.tgm.ac.at"}, {"name":"Thomas Engine", "email":"jborenski@student.tgm.ac.at"}])
                    return new WrapperSection(schuelerImageTextblob);
                }
            ), val: () => import(/* webpackChunkName: "imageTextblob" */"../../../../../../_text/imageTextblob/imageTextblob")
        }
    ), sectionChangeCallback, undefined)

      this.elementBody.append(ce("circle-feature"))

  }

  stl(){
      return super.stl() + require("./raumfahrtTeam.css").toString();
  }

  pug() {
    return "";
  }

}) 