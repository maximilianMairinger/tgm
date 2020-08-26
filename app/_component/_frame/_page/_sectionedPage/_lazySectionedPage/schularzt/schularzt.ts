import { declareComponent } from "../../../../../../lib/declareComponent"
import LazySectionedPage from "../lazySectionedPage"
import { set } from "../../../../../../lib/domain"
import { ImportanceMap, Import } from "../../../../../../lib/lazyLoad"
import WrapperSection from "../../../../_pageSection/wrapperSection/wrapperSection"
import ParameterThumbnail from "../../../../../_themeAble/_text/_thumbnail/parameterThumbnail/parameterThumbnail";
import TeamJobsSection from "../../../../../_themeAble/_text/_sectionTextblob/teamJobsSection/teamJobsSection";
import ImageTextblob from "../../../../../_themeAble/_text/imageTextblob/imageTextblob"

export default declareComponent("schularzt", class Schularzt extends LazySectionedPage {
  constructor(setPage: (domain: string) => void, domainLevel: number, sectionChangeCallback?: (section: string) => void) {
    
    super(new ImportanceMap<() => Promise<any>, any>(
        {
        key: new Import("thumbnail", 1, (Thumbnail: typeof Element) =>
        {
          let thumbnail = new (Thumbnail as typeof ParameterThumbnail)();
          thumbnail.note("Gesundheit");
          thumbnail.heading("Schulärztliche Dienste");
          thumbnail.subheading("Wohlwollen unserer SchülerInnen");
          thumbnail.background('url("/res/img/schularzt.png")');
          return new WrapperSection(thumbnail, 'dark');
        }
        ), val: () => import(/* webpackChunkName: "thumbnail" */"../../../../../_themeAble/_text/_thumbnail/parameterThumbnail/parameterThumbnail")
        },
        {
            key: new Import("tasks", 1, (TeamJobs: typeof Element) =>
                {
                    let teamJobs = new (TeamJobs as typeof TeamJobsSection)();
                    teamJobs.heading("Unsere Tätigkeiten");
                    teamJobs.subheading("umfasst");
                    teamJobs.content("\n" +
                        "    die Versorgung der Schüler und Schülerinnen bei akuten Zwischenfällen oder Erkrankungen\n" +
                        "    (auch psychische Ausnahmesituationen),\n" +
                        "    Versorgung bei chronischen Krankheiten\n" +
                        "    (auch psychische und Abhängigkeitserkrankungen),\n" +
                        "    Entscheidung, inwiefern einem Schüler oder einer Schülerin die Belastungen der Ausbildung am TGM zuzumuten sind (zB BSP, Werkstätten),\n" +
                        "    \"Routineuntersuchungen\" insbesondere für die Schulveranstaltungen,\n" +
                        "    in besonderen Situationen (Diabetes mellitus, Epilepsie, körperliche Behinderung oder schwereren Anpassungsstörungen) wird gemeinsam mit der Leitung der Schulveranstaltung entschieden, wie und ob man ein Teilnahme ermöglichen könnte.\n")
                    return new WrapperSection(teamJobs);
                }
            ), val: () => import(/* webpackChunkName: "teamJobs" */"../../../../../_themeAble/_text/_sectionTextblob/teamJobsSection/teamJobsSection")
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
                    schularzt.aligntype('left');
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
        schularzt2: "schularzt",
        thumbnail: "tasks"
    })

  }



  pug() {
    return ""
  }

}) 