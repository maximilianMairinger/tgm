import { declareComponent } from "../../../../../../../../lib/declareComponent"
import TeamPage from "../teamPage"
import { ImportanceMap, Import } from "../../../../../../../../lib/lazyLoad"
import WrapperSection from "../../../../../_pageSection/wrapperSection/wrapperSection"
import Thumbnail from "../../../../../../_text/_thumbnail/thumbnail";
import TeamSection from "../../../../../../_text/_sectionTextblob/teamSection/teamSection";
import ImageTextblob from "../../../../../../_text/imageTextblob/imageTextblob"

export default declareComponent("it-team", class ItTeam extends TeamPage {
  constructor(sectionChangeCallback?: (section: string) => void) {
    
    super(new ImportanceMap<() => Promise<any>, any>(
        {
            key: new Import("", 1, (thumbnail: typeof Thumbnail) => {
                let e = new thumbnail();
                e.note("mit");
                e.heading("Teamgeist");
                e.subheading("in die Zukunft");
                e.background("itTeam.png")
                return new WrapperSection(e, 'dark') as any
            }), val: () => import(/* webpackChunkName: "thumbnail" */"../../../../../../_text/_thumbnail/thumbnail")
        },
        {
            key: new Import("info", 1, (Team: typeof Element) =>
                {
                    let teamSection = new (Team as typeof TeamSection)();
                    teamSection.subheading("der IT");
                    teamSection.content("Die Lehrkräfte unserer Abteilung gewährleisten durch neueste pädagogische Methodik und individuelle Betreuung die bestmögliche Entwicklung der SchülerInnen. Besonders im neuen Unterrichtssystem Lernbüro, nehmen die ProfessorInnen eine gänzlich neue Position ein und unterstützen die SchülerInnen beim selbstständigen Lernen.")
                    return new WrapperSection(teamSection);
                }
            ), val: () => import(/* webpackChunkName: "teamSection" */"../../../../../../_text/_sectionTextblob/teamSection/teamSection")
        },
        {
            key: new Import("leitung", 1, (leitung: typeof Element) =>
                {
                    let leitungImageTextblob = new (leitung as typeof ImageTextblob)();
                    leitungImageTextblob.note("Abteilungsvorstand");
                    leitungImageTextblob.heading("Dr. Koppensteiner");
                    leitungImageTextblob.subheading("Gottfried");
                    // leitungImageTextblob.content("Erreichbar von Montag bis Freitag zwischen 8:00 und 11:00 Uhr. ")
                    leitungImageTextblob.address("Wexstraße 19-23, 1200 Wien / 9. Stock / H330");
                    leitungImageTextblob.email("avhit@tgm.ac.at");
                    leitungImageTextblob.tel("+43 (0)1 33 126 / 290");
                    leitungImageTextblob.image('url("/res/img/avKoppensteiner.jpg")');
                    leitungImageTextblob.stellvertreter([{name:"Christoph Brein", email:"cbrein@tgm.ac.at"}])
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
                    schuelerImageTextblob.heading("Gartner");
                    schuelerImageTextblob.subheading("Simon");
                    schuelerImageTextblob.content("Ich darf euch dieses Jahr als Abteilungssprecher vertreten, bei Anliegen bitte einfach melden!")
                    schuelerImageTextblob.address("Wexstraße 19-23, 1200 Wien / 9. Stock");
                    schuelerImageTextblob.email("sgartner@student.tgm.ac.at");
                    schuelerImageTextblob.tel("‭+43 699 13117916‬‬");
                    schuelerImageTextblob.image('url("/res/img/team_2.jpg")');
                    schuelerImageTextblob.stellvertreter([{name:"Klara Hermann", email:"khermann@student.tgm.ac.at"}])
                    return new WrapperSection(schuelerImageTextblob);
                }
            ), val: () => import(/* webpackChunkName: "imageTextblob" */"../../../../../../_text/imageTextblob/imageTextblob")
        },
        {
          key: new Import("footer", 1, (_Footer: any) => 
            new _Footer()
          ), val: () => import(/* webpackChunkName: "footer" */"../../../../../_pageSection/footer/footer")
        }
    ), sectionChangeCallback, undefined)

      this.elementBody.append(ce("circle-feature"))

  }


  pug() {
    return "";
  }

}) 