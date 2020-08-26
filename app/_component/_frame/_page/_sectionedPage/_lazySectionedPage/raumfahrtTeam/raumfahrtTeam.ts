import { declareComponent } from "../../../../../../lib/declareComponent"
import LazySectionedPage from "../lazySectionedPage"
import { set } from "../../../../../../lib/domain"
import { ImportanceMap, Import } from "../../../../../../lib/lazyLoad"
import WrapperSection from "../../../../_pageSection/wrapperSection/wrapperSection"
import TeamLeitungThumbnail from "../../../../../_themeAble/_text/_thumbnail/teamLeitungThumbnail/teamLeitungThumbnail";
import TeamJobsSection from "../../../../../_themeAble/_text/_sectionTextblob/teamJobsSection/teamJobsSection";
import ImageTextblob from "../../../../../_themeAble/_text/imageTextblob/imageTextblob"

export default declareComponent("raumfahrt-team", class RaumfahrtTeam extends LazySectionedPage {
  constructor(setPage: (domain: string) => void, domainLevel: number, sectionChangeCallback?: (section: string) => void) {
    
    super(new ImportanceMap<() => Promise<any>, any>(
        {
        key: new Import("thumbnail", 1, (Thumbnail: typeof Element) =>
        {
          let thumbnail = new (Thumbnail as typeof TeamLeitungThumbnail)();
          thumbnail.note("mit");
          thumbnail.heading("Teamgeist");
          thumbnail.subheading("in die Zukunft");
          return new WrapperSection(thumbnail, 'dark');
        }
        ), val: () => import(/* webpackChunkName: "thumbnail" */"../../../../../_themeAble/_text/_thumbnail/teamLeitungThumbnail/teamLeitungThumbnail")
        },
        {
            key: new Import("teamJobs", 1, (TeamJobs: typeof Element) =>
                {
                    let teamJobs = new (TeamJobs as typeof TeamJobsSection)();
                    teamJobs.subheading("der RT Abteilung");
                    teamJobs.content("We are a bunch of talented and passionate people who hate beige walls and dull parties. If this is your case you can always send us your information!\n" +
                        "\n" +
                        "Derzeit suchen wir nach einem LehrerInnen im bereich Softwareentwicklung, Fotographie, Graphic Design und Web-Entwicklung bestmöglichst mit Praxiserfahrung.")
                    return new WrapperSection(teamJobs);
                }
            ), val: () => import(/* webpackChunkName: "teamJobs" */"../../../../../_themeAble/_text/_sectionTextblob/teamJobsSection/teamJobsSection")
        },
        {
            key: new Import("leitung", 1, (leitung: typeof Element) =>
                {
                    let leitungImageTextblob = new (leitung as typeof ImageTextblob)();
                    leitungImageTextblob.note("Abteilungvorstand");
                    leitungImageTextblob.heading("Cassidy");
                    leitungImageTextblob.subheading("Chris");
                    leitungImageTextblob.content("Erreichbar von Montag bis Freitag zwischen 8:00 und 11:00 Uhr. ")
                    leitungImageTextblob.addresse("Wexstraße 123 / 20. Stock / H2028");
                    leitungImageTextblob.email("abt-adminhrt@tgm.ac.at");
                    leitungImageTextblob.tel("+43 1 33126 291");
                    leitungImageTextblob.image('url("/res/img/team_1.png")');
                    leitungImageTextblob.stellvertreter([{"name":"Shane Kimbrough", "email":"skimbrough@tgm.ac.at"}, {"name":"Jim Outton", "email":"joutton@tgm.ac.at"}])
                    return new WrapperSection(leitungImageTextblob);
                }
            ), val: () => import(/* webpackChunkName: "leitung" */"../../../../../_themeAble/_text/imageTextblob/imageTextblob")
        },
        {
            key: new Import("schueler", 1, (schueler: typeof Element) =>
                {
                    let schuelerImageTextblob = new (schueler as typeof ImageTextblob)();
                    schuelerImageTextblob.aligntype('left');
                    schuelerImageTextblob.note("schülervertretung");
                    schuelerImageTextblob.heading("Jones");
                    schuelerImageTextblob.subheading("Lucas");
                    schuelerImageTextblob.content("Erreichbar von Montag bis Freitag zwischen 8:00 und 11:00 Uhr. ")
                    schuelerImageTextblob.addresse("Wexstraße 123 / 11. Stock");
                    schuelerImageTextblob.email("ljonest@student.tgm.ac.at");
                    schuelerImageTextblob.tel("+43 1 33126 291");
                    schuelerImageTextblob.image('url("/res/img/team_2.jpg")');
                    schuelerImageTextblob.stellvertreter([{"name":"Emanuel Knight", "email":"eknight@student.tgm.ac.at"}, {"name":"Thomas Engine", "email":"jborenski@student.tgm.ac.at"}])
                    return new WrapperSection(schuelerImageTextblob);
                }
            ), val: () => import(/* webpackChunkName: "schueler" */"../../../../../_themeAble/_text/imageTextblob/imageTextblob")
        }
    ), domainLevel, setPage, sectionChangeCallback, undefined, {
        thumbnail: "teamJobs",
      })

  }



  pug() {
    return ""
  }

}) 