import SectionedPage, { QuerySelector, AliasList } from "../sectionedPage";
import lazyLoad, { ImportanceMap, ResourcesMap } from "../../../../../../lib/lazyLoad";
import LoadingIndecator from "../../../../../_indecator/loadingIndecator/loadingIndecator";
import * as domain from "../../../../../../lib/domain";

export default abstract class LazySectionedPage extends SectionedPage {

  private resourceMap: ResourcesMap

  private loadingIndecator: HTMLElement
  private importanceMap: ImportanceMap<any, any>

  constructor(sectionIndex: ImportanceMap<() => Promise<any>, any>, sectionChangeCallback?: (section: string) => void, sectionAliasList?: AliasList, mergeIndex?: {[part in string]: string}) {
    const { resourcesMap, importanceMap } = lazyLoad(sectionIndex, e => {
      this.elementBody.insertBefore(e, this.loadingIndecator)
      e.anim({opacity: 1})
    })
    super(resourcesMap, sectionChangeCallback, sectionAliasList, mergeIndex)
    
    this.elementBody.apd(this.loadingIndecator = ce("loading-indecator"))
    resourcesMap.fullyLoaded.then(() => {
      this.loadingIndecator.remove()
    })

    this.importanceMap = importanceMap
    this.resourceMap = resourcesMap
  }

  

  async minimalContentPaint(domainFragment: string = this.importanceMap.entries().next().value.first) {
    console.log("min")
    this.importanceMap.whiteListAll()
    await this.importanceMap.getByString(domainFragment).val
    this.importanceMap.whiteList() // clear white list
  }
  


  async fullContentPaint() {
    console.log("fully")
    this.importanceMap.whiteListAll()
    await this.resourceMap.fullyLoaded  
  }

  stl() {
    return super.stl() + require("./lazySectionedPage.css").toString()
  }
}
