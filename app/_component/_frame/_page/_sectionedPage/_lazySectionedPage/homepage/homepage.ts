import { declareComponent } from "../../../../../../lib/declareComponent"
import LazySectionedPage from "../lazySectionedPage"
import { ImportanceMap, Import } from "../../../../../../lib/lazyLoad"
import VersuchanstaltSection from "../../../../_pageSection/versuchsanstaltSection/versuchsanstaltSection"


export default declareComponent("homepage", class homepage extends LazySectionedPage {
  constructor(setPage: (domain: string) => void, sectionChangeCallback?: (section: string) => void, domainLevel = 1) {
    
    super(new ImportanceMap<() => Promise<any>, any>(
      {
        key: new Import("section1", 1, (_VersuchsanstaltSection: typeof VersuchanstaltSection) =>
          new _VersuchsanstaltSection()
        ), val: () => import(/* webpackChunkName: "VersuchsanstaltSection" */"../../../../_pageSection/versuchsanstaltSection/versuchsanstaltSection")
      },
    ), domainLevel, setPage)
  }

  stl() {
    return super.stl() + require("./homepage.css").toString()
  }
  pug() {
    return require("./homepage.pug").default
  }

}) 
