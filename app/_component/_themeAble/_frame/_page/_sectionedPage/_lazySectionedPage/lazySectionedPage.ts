import SectionedPage, { QuerySelector, AliasList } from "../sectionedPage";
import lazyLoad, { ImportanceMap, ResourcesMap } from "../../../../../../lib/lazyLoad";
import LoadingIndecator from "../../../../../_indecator/loadingIndecator/loadingIndecator";
import * as domain from "../../../../../../lib/domain";

export default abstract class LazySectionedPage extends SectionedPage<Promise<any>> {

  private loadMe: (initalKey?: string) => ResourcesMap
  private resResourceMap: Function
  private resourceMap: ResourcesMap

  private loadingIndecator: HTMLElement

  constructor(sectionIndex: ImportanceMap<() => Promise<any>, any>, sectionChangeCallback?: (section: string) => void, sectionAliasList?: AliasList, mergeIndex?: {[part in string]: string}) {
    let res: Function
    super(new Promise((r) => {
      res = r
    }), sectionChangeCallback, sectionAliasList, mergeIndex)
    this.resResourceMap = res

    

    this.elementBody.apd(this.loadingIndecator = ce("loading-indecator"))

    let w = lazyLoad(sectionIndex, e => {
      this.elementBody.insertBefore(e, this.loadingIndecator)
      e.anim({opacity: 1})
    })
    this.resourceMap = w.resourcesMap
    this.loadMe = w.load
  }

  

  async loadedCallback() {
    
    this.resourceMap = this.loadMe()
    this.resResourceMap(this.resourceMap)
    this.resourceMap.fullyLoaded.then(() => {
      this.loadingIndecator.remove()
    })
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
