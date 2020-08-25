import { declareComponent } from "../../../../../../lib/declareComponent"
import LazySectionedPage from "../lazySectionedPage"
import { set } from "../../../../../../lib/domain"
import { ImportanceMap, Import } from "../../../../../../lib/lazyLoad"
import WrapperSection from "../../../../_pageSection/wrapperSection/wrapperSection"
import ParameterThumbnail from "../../../../../_themeAble/_text/_thumbnail/parameterThumbnail/parameterThumbnail";
import InformationenSection from "../../../../../_themeAble/_text/_sectionTextblob/informationenSection/informationenSection";
import ProjekteSection from "../../../../_pageSection/schuelerprojekteSection/schuelerprojekteSection";


export default declareComponent("raumfahrt-projekte", class RaumfahrtProjekte extends LazySectionedPage {
  constructor(setPage: (domain: string) => void, domainLevel: number, sectionChangeCallback?: (section: string) => void) {
    
    super(new ImportanceMap<() => Promise<any>, any>(
      {
        key: new Import("thumbnail", 1, (wrapper: typeof WrapperSection) =>
        {
          let thumbnail = new ParameterThumbnail();
          thumbnail.note("Bemerkenswerte")
          thumbnail.heading("Diplomprojekte");
          thumbnail.subheading("der RT Abteilung");
          thumbnail.background('url(/res/img/Raumfahrt_Project.jpg)');
          return new wrapper(thumbnail, 'dark');
        }
        ), val: () => import(/* webpackChunkName: "thumbnail" */"../../../../_pageSection/wrapperSection/wrapperSection")
      },
      {
        key: new Import("info", 1, (wrapper: typeof WrapperSection) =>
        {
          let info = new InformationenSection();
          info.content("Schüler und Schülerinnen arbeiten in Kooperation mit internationalen Aerospace Unternehmen um nachhaltige Projekte in den Bereichen der Weltraumforschung, Robotik und Biologie umzusetzen. So sammeln sie wertvolle Erfahrungen und entwickeln ein Resume, ")
          return new wrapper(info);
        }
        ), val: () => import(/* webpackChunkName: "info" */"../../../../_pageSection/wrapperSection/wrapperSection")
      },
      {
        key: new Import("projekte", 1, (projekte: typeof ProjekteSection) =>
            new projekte()
        ), val: () => import(/* webpackChunkName: "projekte" */"../../../../_pageSection/schuelerprojekteSection/schuelerprojekteSection")
      },

    ), domainLevel, setPage, sectionChangeCallback)

  }

  pug() {
    return ""
  }

}) 