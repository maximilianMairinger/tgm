import { declareComponent } from "../../../../../../../lib/declareComponent"
import LazySectionedPage from "../lazySectionedPage"
import { set } from "../../../../../../../lib/domain"
import { ImportanceMap, Import } from "../../../../../../../lib/lazyLoad"
import WrapperSection from "../../../../_pageSection/wrapperSection/wrapperSection"
import ParameterThumbnail from "../../../../../_text/_thumbnail/parameterThumbnail/parameterThumbnail";
import InformationenSection from "../../../../../_text/_sectionTextblob/informationenSection/informationenSection";
import ProjekteSection from "../../../../_pageSection/schuelerprojekteSection/schuelerprojekteSection";


export default declareComponent("elektrotechnik-projekte", class RaumfahrtProjekte extends LazySectionedPage {
  constructor(sectionChangeCallback?: (section: string) => void) {
    
    super(new ImportanceMap<() => Promise<any>, any>(
      {
        key: new Import("", 1, (Thumbnail: typeof Element) =>
        {
          let thumbnail = new (Thumbnail as typeof ParameterThumbnail)();
          thumbnail.note("Bemerkenswerte")
          thumbnail.heading("Diplomprojekte");
          thumbnail.subheading("der ET");
          thumbnail.background('url(/res/img/elProj.jpg)');
          return new WrapperSection(thumbnail, 'dark');
        }
        ), val: () => import(/* webpackChunkName: "thumbnail" */"../../../../../_text/_thumbnail/parameterThumbnail/parameterThumbnail")
      },
      {
        key: new Import("info", 1, (Information: typeof Element) =>
        {
          let info = new (Information as typeof InformationenSection)();
          info.content("SchülerInnen arbeiten in Kooperation mit Unternehmen aus der Privatwirtschaft an innovativen Projekten. Im Zuge des Diplomprojekts demonstrieren die zukünftigen Elektrotechniker im 5. Jahrgang die erlernten Fähigkeiten.")
          return new WrapperSection(info);
        }
        ), val: () => import(/* webpackChunkName: "info" */"../../../../../_text/_sectionTextblob/informationenSection/informationenSection")
      },
      {
        key: new Import("projekte", 1, (projekte: typeof ProjekteSection) =>
            new projekte()
        ), val: () => import(/* webpackChunkName: "projekte" */"../../../../_pageSection/schuelerprojekteSection/schuelerprojekteSection")
      },

    ), sectionChangeCallback, undefined)

  }

  pug() {
    return ""
  }

}) 