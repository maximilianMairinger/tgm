import { declareComponent } from "../../../../../../lib/declareComponent"
import LazySectionedPage from "../lazySectionedPage"
import { set } from "../../../../../../lib/domain"
import { ImportanceMap, Import } from "../../../../../../lib/lazyLoad"
import TestSection1 from "../../../../_pageSection/testSection1/testSection1"
import TestSection2 from "../../../../_pageSection/testSection2/testSection2"
import Thumbnail from "../../../../../_themeAble/_text/_thumbnail/thumbnail"
import WrapperSection from "../../../../_pageSection/wrapperSection/wrapperSection"
import Info from "../../../../../_themeAble/_text/_sectionTextblob/sectionTextblob"
import AusmachtSection from "../../../../_pageSection/ausmachtSection/ausmachtSection"


export default declareComponent("raumfahrt-page", class RaumfahrtPage extends LazySectionedPage {
  constructor(setPage: (domain: string) => void, domainLevel: number, sectionChangeCallback?: (section: string) => void) {
    
    super(new ImportanceMap<() => Promise<any>, any>(
      {
        key: new Import("", 1, (_Thumbnail: typeof Thumbnail) => 
          new WrapperSection(new _Thumbnail(), "dark") as any
        ), val: () => import(/* webpackChunkName: "thumbnail" */"../../../../../_themeAble/_text/_thumbnail/raumfahrtThumbnail/raumfahrtThumbnail")
      },
      {
        key: new Import("info", 1, (_Info: typeof Info) => {
          let info = new _Info()

          info.heading("Technische Ausbildung");
          info.subheading("am Puls der Zeit");
          info.note("unsere");
          info.hsize({max:68, min:40});
          info.hmobile({max:40, min:30});
          info.content("In der Abteilung für Raumfahrttechnik erhalten SchülerInnen eine fundierte Ausbildung in den wichtigsten Aerospace-Themenbereichen. Unser rigoroser Lehrplan ermöglicht AbsolventInnen den Einstieg in die Industrie und öffnet Türen für eine tertiäre Ausbildung.")

          return new WrapperSection(info) as any
        }), val: () => import(/* webpackChunkName: "sectionTextblob" */"../../../../../_themeAble/_text/_sectionTextblob/sectionTextblob")
      },
      {
        key: new Import("highlights", 1, (_AusmachtSection: typeof AusmachtSection) => 
          new _AusmachtSection()
        ), val: () => import(/* webpackChunkName: "ausmachtSection" */"../../../../_pageSection/ausmachtSection/ausmachtSection")
      },
    
    ), domainLevel, setPage, sectionChangeCallback)

  }

  stl() {
    return super.stl() + require("./raumfahrtPage.css").toString()
  }
  pug() {
    return require("./raumfahrtPage.pug").default
  }

}) 