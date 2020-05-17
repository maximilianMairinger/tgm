import { declareComponent } from "../../../../../../lib/declareComponent"
import LazySectionedPage from "../lazySectionedPage"
import { ImportanceMap, Import } from "../../../../../../lib/lazyLoad"
import VersuchanstaltSection from "../../../../_pageSection/versuchsanstaltSection/versuchsanstaltSection"


export default declareComponent("home-page", class Homepage extends LazySectionedPage {
  constructor(setPage: (domain: string) => void, sectionChangeCallback?: (section: string) => void, domainLevel = 1) {
    
    super(new ImportanceMap<() => Promise<any>, any>(
      {
        key: new Import("versuchsanstalt", 1, (_VersuchsanstaltSection: typeof VersuchanstaltSection) =>
          new _VersuchsanstaltSection()
        ), val: () => import(/* webpackChunkName: "VersuchsanstaltSection" */"../../../../_pageSection/versuchsanstaltSection/versuchsanstaltSection")
      },
    ), domainLevel, setPage, sectionChangeCallback)
  }

  stl() {
    return super.stl() + require("./homepage.css").toString()
  }
  pug() {
    return require("./homepage.pug").default
  }

}) 
