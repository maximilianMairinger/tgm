import { declareComponent } from "../../../../../../../../lib/declareComponent"
import TeamPage from "../teamPage"
import { ImportanceMap, Import } from "../../../../../../../../lib/lazyLoad"
import WrapperSection from "../../../../../_pageSection/wrapperSection/wrapperSection"
import Thumbnail from "../../../../../../_text/_thumbnail/thumbnail";
import TeamSection from "../../../../../../_text/_sectionTextblob/teamSection/teamSection";
import ImageTextblob from "../../../../../../_text/imageTextblob/imageTextblob"

export default declareComponent("kt-team", class KtTeam extends TeamPage {
  constructor(sectionChangeCallback?: (section: string) => void) {
    
    super(new ImportanceMap<() => Promise<any>, any>(
        {
            key: new Import("", 1, (thumbnail: typeof Thumbnail) => {
                let e = new thumbnail();
                e.note("mit");
                e.heading("Teamgeist");
                e.subheading("in die Zukunft");
                e.background("ktTeam.png")
                return new WrapperSection(e, 'dark') as any
            }), val: () => import(/* webpackChunkName: "thumbnail" */"../../../../../../_text/_thumbnail/thumbnail")
        },
        {
            key: new Import("info", 1, (Team: typeof Element) =>
                {
                    let teamSection = new (Team as typeof TeamSection)();
                    teamSection.subheading("der KT");
                    teamSection.note("das")
                    teamSection.content("Die Lehrkräfte der Höheren Lehranstalt für Kunststofftechnik ermöglichen dank Erfahrung mit viel Engagement individuelle Förderung zur optimalen Entwicklung der Schülerinnen und Schüler.")
                    return new WrapperSection(teamSection);
                }
            ), val: () => import(/* webpackChunkName: "teamSection" */"../../../../../../_text/_sectionTextblob/teamSection/teamSection")
        },
        {
            key: new Import("leitung", 1, (leitung: typeof Element) =>
                {
                    let leitungImageTextblob = new (leitung as typeof ImageTextblob)();
                    leitungImageTextblob.note("Abteilungsvorstand");
                    leitungImageTextblob.heading("Reitinger");
                    leitungImageTextblob.subheading("Klemens");
                    leitungImageTextblob.content("Ich stehe Ihnen gerne am Montag von 13:20 bis 14:10 in meiner Sprechstunde zur Verfügung.")
                    leitungImageTextblob.address("Wexstraße 19-23, 1200 Wien / 10. Stock");
                    leitungImageTextblob.email("avhkt@tgm.ac.at");
                    leitungImageTextblob.tel("0 33 126 / 300");
                    leitungImageTextblob.image('url("/res/img/avreitinger.png")');
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
                    schuelerImageTextblob.heading("Orhan");
                    schuelerImageTextblob.subheading("Deniz");
                    schuelerImageTextblob.content("Ich darf euch dieses Jahr als Abteilungssprecher vertreten, bei Anliegen bitte einfach melden!")
                    schuelerImageTextblob.address("Wexstraße 19-23, 1200 Wien / 10. Stock");
                    schuelerImageTextblob.email("dorhan@student.tgm.ac.at");
                    // schuelerImageTextblob.tel("+43 ‭650 7311330‬");
                    schuelerImageTextblob.image('url("/res/img/team_2.jpg")');
                    schuelerImageTextblob.stellvertreter([{"name":"Sebastian Fuchs", "email":"sfuchs@student.tgm.ac.at "}])
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