import { declareComponent } from "../../../../../../../lib/declareComponent"
import LazySectionedPage from "../lazySectionedPage"
import { ImportanceMap, Import } from "../../../../../../../lib/lazyLoad"
import WrapperSection from "../../../../_pageSection/wrapperSection/wrapperSection"
import Thumbnail from "../../../../../_text/_thumbnail/thumbnail";
import InformationenSection from "../../../../../_text/_sectionTextblob/informationenSection/projekteInformationSection/projekteInformationSection";
import ProjekteSection from "../../../../_pageSection/schuelerprojekteSection/schuelerprojekteSection";
import {Project} from "../../../../../_text/tabletBlob/tabletBlob";
import Footer from "../../../../_pageSection/footer/footer"


export default declareComponent("it-projekte", class ItProjekte extends LazySectionedPage {
  constructor(baseLink: string, sectionChangeCallback?: (section: string) => void) {
    
    super(new ImportanceMap<() => Promise<any>, any>(
      {
        key: new Import("", 1, (thumbnail: typeof Thumbnail) => {
          let e = new thumbnail();
          e.note("die")
          e.heading("Projekte");
          e.subheading("der IT Abteilung");
          e.background('itProj.png');
          return new WrapperSection(e, 'dark') as any;
        }), val: () => import(/* webpackChunkName: "thumbnail" */"../../../../../_text/_thumbnail/thumbnail")
      },
      {
        key: new Import("info", 1, (Information: typeof Element) =>
        {
          let info = new (Information as typeof InformationenSection)();
          info.content("Im 5. Jahrgang haben die Schülerinnen und Schüler die Möglichkeit Praxisluft zu schnuppern und ihr Wissen aus den fachtheoretischen und fachpraktischen Gegenständen im Rahmen einer Diplomarbeit umzusetzen. Die Diplomarbeiten werden fast ausschließlich mit externen Firmen durchgeführt wobei die Schülerinnen und Schüler in Projektteams zusammenarbeiten. Da die Ausbildung der Wirtschaftsingenieure sehr breit gefächert ist, sind Themen aus dem Bereich des Maschinenbaus, der Logistik, der IT, der Elektrotechnik, ja sogar aus dem medizinischen Bereich möglich.")
          return new WrapperSection(info);
        }
        ), val: () => import(/* webpackChunkName: "info" */"../../../../../_text/_sectionTextblob/informationenSection/projekteInformationSection/projekteInformationSection")
      },
      {
        key: new Import("footer", 1, (_Footer: typeof Footer) => 
          new _Footer(baseLink + "info/")
        ), val: () => import(/* webpackChunkName: "footer" */"../../../../_pageSection/footer/footer")
      }

    ), sectionChangeCallback, undefined, {
      footer: "info"
    })

  }

  pug() {
    return ""
  }

}) 