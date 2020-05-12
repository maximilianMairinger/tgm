import SectionedPage, { QuerySelector } from "../sectionedPage";
import lazyLoad, { ImportanceMap, ResourcesMap } from "../../../../../lib/lazyLoad";
import LoadingIndecator from "../../../../_indecator/loadingIndecator/loadingIndecator";
import * as domain from "../../../../../lib/domain";

export default abstract class PageSection extends SectionedPage<Promise<any>> {

  private loadMe: (initalKey?: string) => ResourcesMap
  private resResourceMap: Function

  constructor(sectionIndex: ImportanceMap<() => Promise<any>, any>, domainLevel: number) {

    

    

    let res: Function
    super(new Promise((r) => {
      res = r
    }), domainLevel)
    this.resResourceMap = res

    this.loadMe = lazyLoad(sectionIndex, e => {
      this.apd(e)
      e.anim({opacity: 1})
    })


  }
  async initialActivationCallback() {
    let init = domain.get(this.domainLevel)
    let resourceMap = this.loadMe()
    this.resResourceMap(resourceMap)
    await resourceMap.get(init)
    
    super.initialActivationCallback()
  }
  // stl() {
  //   return super.stl() + require("./lazySectionedPage.css").toString()
  // }
}