import { declareComponent } from "../../../../../../lib/declareComponent"
import LazySectionedPage from "../lazySectionedPage"
import { set } from "../../../../../../lib/domain"
import { ImportanceMap, Import } from "../../../../../../lib/lazyLoad"
import VersuchanstaltSection from "../../../../_pageSection/versuchsanstaltSection/versuchsanstaltSection"


export default declareComponent("homepage", class homepage extends LazySectionedPage {
  constructor(private setPageCb: (domain: string) => void, domainLevel = 1) {
    
    super(new ImportanceMap<() => Promise<any>, any>(
      {
        key: new Import("section1", 1, (Section1: typeof VersuchanstaltSection) =>
          new Section1()
        ), val: () => import(/* webpackChunkName: "VersuchsanstaltSection" */"../../../../_pageSection/versuchsanstaltSection/versuchsanstaltSection")
      },
    ), domainLevel)
  }

  stl() {
    return super.stl() + require("./homepage.css").toString()
  }
  pug() {
    return require("./homepage.pug").default
  }

}) 