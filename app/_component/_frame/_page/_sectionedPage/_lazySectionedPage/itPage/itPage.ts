import { declareComponent } from "../../../../../../lib/declareComponent"
import LazySectionedPage from "../lazySectionedPage"
import { set } from "../../../../../../lib/domain"
import { ImportanceMap, Import } from "../../../../../../lib/lazyLoad"
import TestSection1 from "../../../../_pageSection/testSection1/testSection1"
import TestSection2 from "../../../../_pageSection/testSection2/testSection2"


export default declareComponent("it-page", class itPage extends LazySectionedPage {
  constructor(private setPageCb: (domain: string) => void, domainLevel = 1) {
    
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
    
    ), domainLevel)


    this.sectionIndex.then((sectionIndex) => {
      sectionIndex.forEach((elem, name) => {
        elem.then((e) => {
          e.on("click", () => {
            set(domainLevel, name)
          })
        })
      })
    })
  }

  protected activationCallback(active: boolean) {
    return super.activationCallback(active)
  }
  stl() {
    return super.stl() + require("./itPage.css").toString()
  }
  pug() {
    return require("./itPage.pug").default
  }

}) 