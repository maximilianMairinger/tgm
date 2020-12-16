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

  

  async minimalContentFullPaint() {
    if (this.initialDomainFragment) {

    }
    else this.importanceMap.whiteList(this.importanceMap.entries().next().value.first)
    this.importanceMap.whiteList(this.initialDomainFragment ?  : )
    if () this.resourceMap.
  }

  private initialDomainFragment: string
  async navigationCallback(domainFragment: string) {
    let e = await super.navigationCallback(domainFragment)
    this.initialDomainFragment = domainFragment
    return e
  }

  async fullContentFullPaint() {
    this.importanceMap.whiteListAll()
    await this.resourceMap.fullyLoaded  
  }

  async initialActivationCallback(a) {
    let init = this.sectionAliasList.getRootOfAlias(domain.get(this.domainLevel))
    await this.resourceMap.get(init)
    
    return await super.initialActivationCallback(a)
  }

  stl() {
    return super.stl() + require("./lazySectionedPage.css").toString()
  }
}
