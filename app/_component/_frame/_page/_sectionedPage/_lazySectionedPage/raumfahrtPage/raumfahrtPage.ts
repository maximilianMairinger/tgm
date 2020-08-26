import { declareComponent } from "../../../../../../lib/declareComponent"
import LazySectionedPage from "../lazySectionedPage"
import { set } from "../../../../../../lib/domain"
import { ImportanceMap, Import } from "../../../../../../lib/lazyLoad"
import TestSection1 from "../../../../_pageSection/testSection1/testSection1"
import TestSection2 from "../../../../_pageSection/testSection2/testSection2"


export default declareComponent("raumfahrt-page", class RaumfahrtPage extends LazySectionedPage {
  constructor(setPage: (domain: string) => void, domainLevel: number, sectionChangeCallback?: (section: string) => void) {
    
    super(new ImportanceMap<() => Promise<any>, any>(
      {
        key: new Import("section1", 1, (Section1: typeof TestSection1) => 
          new Section1()
        ), val: () => import(/* webpackChunkName: "testSection1" */"../../../../_pageSection/testSection1/testSection1")
      },
      {
        key: new Import("section2", 1, (Section2: typeof TestSection2) => 
          new Section2()  
        ), val: () => import(/* webpackChunkName: "testSection2" */"../../../../_pageSection/testSection2/testSection2")
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