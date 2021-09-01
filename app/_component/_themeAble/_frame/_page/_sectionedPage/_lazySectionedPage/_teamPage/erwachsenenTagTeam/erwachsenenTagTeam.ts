import { declareComponent } from "../../../../../../../../lib/declareComponent"
import TeamPage from "../teamPage"
import { ImportanceMap, Import } from "../../../../../../../../lib/lazyLoad"
import WrapperSection from "../../../../../_pageSection/wrapperSection/wrapperSection"
import Thumbnail from "../../../../../../_text/_thumbnail/thumbnail";
import TeamSection from "../../../../../../_text/_sectionTextblob/teamSection/teamSection";
import ImageTextblob from "../../../../../../_text/imageTextblob/imageTextblob"
import Footer from "../../../../../_pageSection/footer/footer"

export default declareComponent("erwachsenen-tag-team", class ErwachsenenTagTeam extends TeamPage {
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
                    teamSection.subheading("der Erwachsenenbildung");
                    teamSection.content("Unsere Lehrkräfte gewährleisten durch neueste pädagogische Methodiken und individuelle Betreuung die bestmögliche Entwicklung der SchülerInnen. Unser Lehrkörper rekrutiert aus den erfahrensten Mitgliedern der Wissenschaft und Industrie.")
                    return new WrapperSection(teamSection);
                }
            ), val: () => import(/* webpackChunkName: "teamSection" */"../../../../../../_text/_sectionTextblob/teamSection/teamSection")
        },
        {
            key: new Import("angerer", 1, (leitung: typeof Element) =>
                {
                    let leitungImageTextblob = new (leitung as typeof ImageTextblob)();
                    leitungImageTextblob.note("Abteilungsvorstand");
                    leitungImageTextblob.heading("DI Angerer BEd");
                    leitungImageTextblob.subheading("Georg");
                    leitungImageTextblob.content("Ich stehe Ihnen gerne am Dienstag von 9:50 bis 10:40 in meiner Sprechstunde zu Verfügung.")
                    leitungImageTextblob.address("Wexstraße 19-23, 1200 Wien / 5. Stock");
                    leitungImageTextblob.email("avhwi@tgm.ac.at");
                    leitungImageTextblob.info("Mobil", "0664 80126262");
                    leitungImageTextblob.tel("33126 – 262");
                    leitungImageTextblob.image('avAngerer');
                    return new WrapperSection(leitungImageTextblob);
                }
            ), val: () => import(/* webpackChunkName: "leitung" */"../../../../../../_text/imageTextblob/imageTextblob")
        },
        {
            key: new Import("deininger", 1, (leitung: typeof Element) =>
                {
                    let leitungImageTextblob = new (leitung as typeof ImageTextblob)();
                    leitungImageTextblob.note("Abteilungsvorstand");
                    leitungImageTextblob.alignment("left")
                    leitungImageTextblob.heading("DI Deininger");
                    leitungImageTextblob.subheading("Thomas");
                    // leitungImageTextblob.content("Erreichbar von Montag bis Freitag zwischen 8:00 und 11:00 Uhr. ")
                    leitungImageTextblob.address("Wexstraße 19-23, 1200 Wien / 3. Stock / H326");
                    leitungImageTextblob.email("tdeininger@tgm.ac.at");
                    leitungImageTextblob.tel("+43 (1) 33 126 / 230");
                    leitungImageTextblob.image('avdeininger');
                    return new WrapperSection(leitungImageTextblob);
                }
            ), val: () => import(/* webpackChunkName: "leitung" */"../../../../../../_text/imageTextblob/imageTextblob")
        },
        {
            key: new Import("wess", 1, (leitung: typeof Element) =>
                {
                    let leitungImageTextblob = new (leitung as typeof ImageTextblob)();
                    leitungImageTextblob.note("Abteilungsvorstand");
                    leitungImageTextblob.heading("Dr. DI Wess");
                    leitungImageTextblob.subheading("Bernhard");
                    leitungImageTextblob.content("Ich stehe Ihnen gerne am Donnerstag von 9:50 bis 10:40 in meiner Sprechstunde zu Verfügung.")
                    leitungImageTextblob.address("Wexstraße 19-21, 1200 Wien / 12. Stock / H1226");
                    leitungImageTextblob.email("avhbg@tgm.ac.at");
                    leitungImageTextblob.tel("01 33 126 320");
                    leitungImageTextblob.image('avWess2');
                    return new WrapperSection(leitungImageTextblob);
                }
            ), val: () => import(/* webpackChunkName: "leitung" */"../../../../../../_text/imageTextblob/imageTextblob")
        },
        {
          key: new Import("footer", 1, (_Footer: typeof Footer) => 
            new _Footer(baseLink + "wess/")
          ), val: () => import(/* webpackChunkName: "footer" */"../../../../../_pageSection/footer/footer")
        }
    ), sectionChangeCallback, undefined, {
        footer: "wess"
    })

      this.elementBody.append(ce("circle-feature"))

  }


  pug() {
    return "";
  }

}) 