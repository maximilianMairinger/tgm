import { declareComponent } from "../../../../../../../../lib/declareComponent"
import TeamPage from "../teamPage"
import { ImportanceMap, Import } from "../../../../../../../../lib/lazyLoad"
import WrapperSection from "../../../../../_pageSection/wrapperSection/wrapperSection"
import Thumbnail from "../../../../../../_text/_thumbnail/thumbnail";
import TeamSection from "../../../../../../_text/_sectionTextblob/teamSection/teamSection";
import ImageTextblob from "../../../../../../_text/imageTextblob/imageTextblob"
import Footer from "../../../../../_pageSection/footer/footer"

export default declareComponent("bg-team", class BgTeam extends TeamPage {
  constructor(baseLink: string, sectionChangeCallback?: (section: string) => void) {
    
    super(new ImportanceMap<() => Promise<any>, any>(
        {
            key: new Import("", 1, (thumbnail: typeof Thumbnail) => {
                let e = new thumbnail();
                e.note("mit");
                e.heading("Teamgeist");
                e.subheading("in die Zukunft");
                e.background("abendTeam")
                return new WrapperSection(e, 'dark') as any
            }), val: () => import(/* webpackChunkName: "thumbnail" */"../../../../../../_text/_thumbnail/thumbnail")
        },
        {
            key: new Import("info", 1, (Team: typeof Element) =>
                {
                    let teamSection = new (Team as typeof TeamSection)();
                    teamSection.subheading("der HLB");
                    teamSection.content("Die Lehrkräfte der Abendschule gewährleisten durch neueste pädagogische Methodiken und individuelle Betreuung die bestmögliche Entwicklung der SchülerInnen. Unser Lehrkörper rekrutiert aus den erfahrensten Mitgliedern der Wissenschaft und Industrie.")
                    return new WrapperSection(teamSection);
                }
            ), val: () => import(/* webpackChunkName: "teamSection" */"../../../../../../_text/_sectionTextblob/teamSection/teamSection")
        },
        {
            key: new Import("leitung", 1, (leitung: typeof Element) =>
                {
                    let leitungImageTextblob = new (leitung as typeof ImageTextblob)();
                    leitungImageTextblob.note("Abteilungsvorstand");
                    leitungImageTextblob.heading("Ing. Dipl.-Ing. Dvořak");
                    leitungImageTextblob.subheading("Andreas F.");
                    leitungImageTextblob.content("Ich stehe Ihnen gerne außerhalb meiner Unterrichtszeit nach Terminvereinbarung zur Verfügung.")
                    leitungImageTextblob.address("Wexstraße 19-21, 1200 Wien / 5. Stock / H526");
                    leitungImageTextblob.email("avhlb@tgm.ac.at");
                    leitungImageTextblob.tel("01 33 126 250");
                    leitungImageTextblob.image('unknownMan');
                    // leitungImageTextblob.stellvertreter([{"name":"DI Dr. Josef Kollmitzer", "email":"jkollmitzer@tgm.ac.at"}])
                    return new WrapperSection(leitungImageTextblob);
                }
            ), val: () => import(/* webpackChunkName: "leitung" */"../../../../../../_text/imageTextblob/imageTextblob")
        },
        {
            key: new Import("studierenden", 1, (schueler: typeof Element) =>
                {
                    let schuelerImageTextblob = new (schueler as typeof ImageTextblob)();
                    schuelerImageTextblob.alignment('left');
                    schuelerImageTextblob.note("schülervertretung");
                    schuelerImageTextblob.heading("Langsenlehner");
                    schuelerImageTextblob.subheading("Markus");
                    schuelerImageTextblob.content("Ich darf euch dieses Jahr als Studierendenvertretung vertreten, bei Anliegen bitte einfach melden!")
                    schuelerImageTextblob.email("mlangsenlehner@student.tgm.ac.at");
                    schuelerImageTextblob.tel("N/A");
                    schuelerImageTextblob.image('team_2.jpg');
                    schuelerImageTextblob.stellvertreter([{name: "Juric Verner", email: "vjuric@student.tgm.ac.at"}])
                    return new WrapperSection(schuelerImageTextblob);
                }
            ), val: () => import(/* webpackChunkName: "imageTextblob" */"../../../../../../_text/imageTextblob/imageTextblob")
        },
        {
          key: new Import("footer", 1, (_Footer: typeof Footer) => 
            new _Footer(baseLink + "studierenden/")
          ), val: () => import(/* webpackChunkName: "footer" */"../../../../../_pageSection/footer/footer")
        }
    ), sectionChangeCallback, undefined, {
        footer: "studierenden"
    })

      this.elementBody.append(ce("circle-feature"))

  }


  pug() {
    return "";
  }

}) 