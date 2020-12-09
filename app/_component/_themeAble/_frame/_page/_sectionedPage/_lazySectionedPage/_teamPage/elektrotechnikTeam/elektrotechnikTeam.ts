import { declareComponent } from "../../../../../../../../lib/declareComponent"
import TeamPage from "../teamPage"
import { ImportanceMap, Import } from "../../../../../../../../lib/lazyLoad"
import WrapperSection from "../../../../../_pageSection/wrapperSection/wrapperSection"
import TeamLeitungThumbnail from "../../../../../../_text/_thumbnail/teamLeitungThumbnail/teamLeitungThumbnail";
import TeamSection from "../../../../../../_text/_sectionTextblob/teamSection/teamSection";
import ImageTextblob from "../../../../../../_text/imageTextblob/imageTextblob"

export default declareComponent("raumfahrt-team", class RaumfahrtTeam extends TeamPage {
  constructor(sectionChangeCallback?: (section: string) => void) {
    
    super(new ImportanceMap<() => Promise<any>, any>(
        {
        key: new Import("", 1, (Thumbnail: typeof Element) =>
        {
          let thumbnail = new (Thumbnail as typeof TeamLeitungThumbnail)();
          thumbnail.note("mit");
          thumbnail.heading("Teamgeist");
          thumbnail.subheading("in die Zukunft");
          return new WrapperSection(thumbnail, 'dark');
        }
        ), val: () => import(/* webpackChunkName: "thumbnail" */"../../../../../../_text/_thumbnail/teamLeitungThumbnail/teamLeitungThumbnail")
        },
        {
            key: new Import("info", 1, (Team: typeof Element) =>
                {
                    let teamSection = new (Team as typeof TeamSection)();
                    teamSection.subheading("der ET");
                    teamSection.note("das")
                    teamSection.content("Die Lehrkräfte unserer Abteilung gewährleisten durch neueste pädagogische Methodik und individuelle Betreuung die bestmögliche Entwicklung der SchülerInnen. Besonders im neuen Unterrichtssystem Lernbüro, nehmen die ProfessorInnen eine gänzlich neue Position ein und unterstützen die SchülerInnen bei dem selbstständigen")
                    return new WrapperSection(teamSection);
                }
            ), val: () => import(/* webpackChunkName: "teamSection" */"../../../../../../_text/_sectionTextblob/teamSection/teamSection")
        },
        {
            key: new Import("leitung", 1, (leitung: typeof Element) =>
                {
                    let leitungImageTextblob = new (leitung as typeof ImageTextblob)();
                    leitungImageTextblob.note("Abteilungvorstand");
                    leitungImageTextblob.heading("Deininger");
                    leitungImageTextblob.subheading("Thomas");
                    // leitungImageTextblob.content("Erreichbar von Montag bis Freitag zwischen 8:00 und 11:00 Uhr. ")
                    leitungImageTextblob.address("Wexstraße 19-23 / 3. Stock / H330");
                    leitungImageTextblob.email("tdeininger@tgm.ac.at");
                    leitungImageTextblob.tel("+43 (1) 33 126 / 230");
                    leitungImageTextblob.image('url("/res/img/team_1.png")');
                    leitungImageTextblob.stellvertreter([{"name":"Stefan Hertl", "email":"shertl@tgm.ac.at"}])
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
                    schuelerImageTextblob.heading("Tacho");
                    schuelerImageTextblob.subheading("Marc-Luis");
                    schuelerImageTextblob.content("Ich darf euch dieses Jahr als Abteilungssprecher vertreten, bei Anliegen bitte einfach melden!")
                    schuelerImageTextblob.address("Wexstraße 123 / 11. Stock");
                    schuelerImageTextblob.email("mtacho@student.tgm.ac.at");
                    schuelerImageTextblob.tel("+43 ‭650 7311330‬");
                    schuelerImageTextblob.image('url("/res/img/team_2.jpg")');
                    schuelerImageTextblob.stellvertreter([{"name":"Martin Polak", "email":"mpolak@student.tgm.ac.at"}])
                    return new WrapperSection(schuelerImageTextblob);
                }
            ), val: () => import(/* webpackChunkName: "imageTextblob" */"../../../../../../_text/imageTextblob/imageTextblob")
        }
    ), sectionChangeCallback, undefined)

      this.elementBody.append(ce("circle-feature"))

  }

  stl(){
      return super.stl() + require("./elektrotechnikTeam.css").toString();
  }

  pug() {
    return "";
  }

}) 