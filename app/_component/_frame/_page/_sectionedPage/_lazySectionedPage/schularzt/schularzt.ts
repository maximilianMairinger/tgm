import { declareComponent } from "../../../../../../lib/declareComponent"
import LazySectionedPage from "../lazySectionedPage"
import { set } from "../../../../../../lib/domain"
import { ImportanceMap, Import } from "../../../../../../lib/lazyLoad"
import WrapperSection from "../../../../_pageSection/wrapperSection/wrapperSection"
import ParameterThumbnail from "../../../../../_themeAble/_text/_thumbnail/parameterThumbnail/parameterThumbnail";
import TeamSection from "../../../../../_themeAble/_text/_sectionTextblob/teamSection/teamSection";
import ImageTextblob from "../../../../../_themeAble/_text/imageTextblob/imageTextblob"

export default declareComponent("schularzt", class Schularzt extends LazySectionedPage {
  constructor(setPage: (domain: string) => void, domainLevel: number, sectionChangeCallback?: (section: string) => void) {
    
    super(new ImportanceMap<() => Promise<any>, any>(
        {
        key: new Import("", 1, (Thumbnail: typeof Element) =>
        {
          let thumbnail = new (Thumbnail as typeof ParameterThumbnail)();
          thumbnail.note("der");
          thumbnail.heading("Schulärztliche Dienst");
          thumbnail.subheading("für unsere Gesundheit");
          thumbnail.background('url("/res/img/schularzt.png")');
          return new WrapperSection(thumbnail, 'dark');
        }
        ), val: () => import(/* webpackChunkName: "thumbnail" */"../../../../../_themeAble/_text/_thumbnail/parameterThumbnail/parameterThumbnail")
        },
        {
            key: new Import("auftrag", 1, (_TeamSection: typeof Element) =>
                {
                    let teamSection = new (_TeamSection as typeof TeamSection)();
                    teamSection.heading("Auftrag");
                    teamSection.note("unserem")
                    teamSection.subheading("verpflichtet");
                    teamSection.hsize({max:100, min:40});
                    teamSection.content(`Wir kümmern uns um die Versorgung der SchülerInnen bei akuten Zwischenfällen oder Erkrankungen (auch psychische Ausnahmesituationen), sowie die Versorgung bei chronischen Krankheiten (auch psychische und Abhängigkeitserkrankungen). Wir treffen Entscheidung, inwiefern einem Schüler oder einer Schülerin die Belastungen der Ausbildung am TGM zuzumuten sind (zB BSP, Werkstätten). Außerdem führen wir ”Routine-untersuchungen" insbesondere für Schulveranstaltungen durch.`)
                    return new WrapperSection(teamSection);
                }
            ), val: () => import(/* webpackChunkName: "teamSection" */"../../../../../_themeAble/_text/_sectionTextblob/teamSection/teamSection")
        },
        {
            key: new Import("schularzt", 1, (Schularzt: typeof Element) =>
                {
                    let schularzt = new (Schularzt as typeof ImageTextblob)();
                    schularzt.note("Schularzt");
                    schularzt.heading("Dr. Hafner");
                    schularzt.subheading("Gerhard");
                    schularzt.content("Erreichbar von Montag bis Freitag zwischen 8:00 und 16:00 Uhr. ")
                    schularzt.addresse("Wexstraße 123 / 1. Stock / T133");
                    schularzt.email("g.hafner@ergomobil.at  ");
                    schularzt.tel("+43 1 337 69 123");
                    schularzt.image('url("/res/img/student_1.jpg")');
                    return new WrapperSection(schularzt);
                }
            ), val: () => import(/* webpackChunkName: "leitung" */"../../../../../_themeAble/_text/imageTextblob/imageTextblob")
        },
        {
            key: new Import("schularzt2", 1, (Schularzt: typeof Element) =>
                {
                    let schularzt = new (Schularzt as typeof ImageTextblob)();
                    schularzt.alignment('left');
                    schularzt.note("Schularzt");
                    schularzt.heading("Dr. Kripser");
                    schularzt.subheading("Florian");
                    schularzt.content("Erreichbar von Montag bis Freitag zwischen 8:00 und 13:00 Uhr. ")
                    schularzt.addresse("Wexstraße 123 / 1. Stock / T133");
                    schularzt.email("fkrisper@tgm.ac.at");
                    schularzt.tel("+43 1 33126 291");
                    schularzt.image('url("/res/img/student_2.jpg")');
                    return new WrapperSection(schularzt);
                }
            ), val: () => import(/* webpackChunkName: "leitung" */"../../../../../_themeAble/_text/imageTextblob/imageTextblob")
        },
    ), domainLevel, setPage, sectionChangeCallback, undefined, {
        schularzt2: "schularzt"
    })

  }



  pug() {
    return ""
  }

}) 