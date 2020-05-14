import Frame from "./../frame";
import LoadingIndecator from "../../_indecator/loadingIndecator/loadingIndecator";
import * as domain from "../../../lib/domain";
import lazyLoad, { ImportanceMap, Import, ResourcesMap } from "../../../lib/lazyLoad";
import SectionedPage from "../_page/_sectionedPage/sectionedPage";


export default abstract class Manager<ManagementElementName extends string> extends Frame {
  private resLoaded: Function;

  protected busySwaping: boolean = false;
  public currentFrame: Frame;

  protected body: HTMLElement;

  private wantedFrame: Frame;


  private loadingElem: any;
  private firstFrameLoaded: Promise<void>




  private managedElementMap: ResourcesMap

  constructor(private importanceMap: ImportanceMap<() => Promise<any>, any>, private domainLevel: number, private pageChangeCallback?: (page: string, sectiones: string[]) => void, private notFoundElementName: ManagementElementName = "404" as any, private pushDomainDefault: boolean = true, public blurCallback?: Function, public preserveFocus?: boolean) {
    super();
    this.firstFrameLoaded = new Promise((res) => {
      this.resLoaded = res
    })

    this.body = ce("manager-body");
    this.loadingElem = new LoadingIndecator();
    
    this.body.apd(this.loadingElem)
    this.sra(this.body);

    this.on("keydown", (e) => {
      if (e.code === "Escape") {
        this.blur();
        if (this.blurCallback !== undefined) this.blurCallback(e);
      }
    });

    
  }

  private domainSubscription: domain.DomainSubscription
  async loadedCallback() {
    const load = lazyLoad(this.importanceMap, e => {
      this.body.apd(e)
    })

    this.domainSubscription = domain.get(this.domainLevel, async (to: any) => {await this.setElem(to)}, false, "")
    let initElemName = this.domainSubscription.domain
    let pageProm: any
    
    try {
      pageProm = this.importanceMap.getByString(initElemName)
    }
    catch(e) {}
    
    while(pageProm === undefined) {
      if (initElemName === "") {
        initElemName = this.notFoundElementName
        break
      }
      initElemName = initElemName.substr(0, initElemName.lastIndexOf("/")) as any
      try {
        pageProm = this.importanceMap.getByString(initElemName)
      }
      catch(e) {}
    }
    this.managedElementMap = load(initElemName)
    if (this.managedElementMap.get(this.notFoundElementName) === undefined) console.error("404 elementName: \"" + this.notFoundElementName + "\" is not found in given importanceMap", this.importanceMap)
    await this.setElem(initElemName as ManagementElementName)
    this.resLoaded();
    await this.managedElementMap.fullyLoaded
  }

  /**
   * Swaps to given Frame
   * @param to frame to be swaped to
   */
  private async swapFrame(to: Frame): Promise<void | {wrapped: Promise<void>} | boolean> {
    if (to === undefined) {
      throw new Error();
    }

    this.loadingElem.remove();

    this.wantedFrame = to;
    let from = this.currentFrame;
    if (this.busySwaping) return;
    this.busySwaping = true;
    //Focus even when it is already the active frame
    if (!this.preserveFocus) to.focus();
    if (from === to) {
      this.busySwaping = false;
      return;
    }
    to.show();
    if (!this.preserveFocus) to.focus();

    let activationResult: boolean
    if (from !== undefined) from.deactivate()
    if (this.active) activationResult = await to.activate();
    
    if (!activationResult) {  
      to.hide()


      return {
        wrapped: (async () => {
          this.busySwaping = false
          await this.setElem(this.notFoundElementName)
          if (from !== undefined) {
            from.hide()
            
          }
          
          
        })()
      }
    }
    
    to.css("zIndex", 100)
    let showAnim = to.anim([{opacity: 0, scale: 1.05, offset: 0}, {opacity: 1, scale: 1}]);
    let finalFunction = () => {
      to.css("zIndex", 0)
      this.busySwaping = false;
      if (this.wantedFrame !== to) this.swapFrame(this.wantedFrame);
    }

    this.currentFrame = to;

    if (from === undefined) {
      showAnim.then(finalFunction);
    }
    else {
      showAnim.then(() => {
        from.hide()
      }).then(finalFunction);

    }

    return activationResult
  }

  private currentManagedElementName: ManagementElementName
  private nextPageToken: Symbol

  public element(): ManagementElementName
  public element(to: ManagementElementName, push?: boolean): void
  public element(to?: ManagementElementName, push: boolean = this.pushDomainDefault) {
    if (to === null) {
      if (this.managedElementMap.get(this.currentManagedElementName) === undefined) this.setElem(this.notFoundElementName)
    }
    else {
      if (to) domain.set(to, this.domainLevel, push)
      else return this.currentManagedElementName
    }
  }

  private async setElem(to: ManagementElementName) {
    let nextPageToken = Symbol("nextPageToken")
    this.nextPageToken = nextPageToken;

    let pageProm = this.managedElementMap.get(to)
    while(pageProm === undefined) {
      if (to === "") {
        to = this.notFoundElementName
        break
      }
      to = to.substr(0, to.lastIndexOf("/")) as any
      pageProm = this.managedElementMap.get(to)
    } 

    let ensureLoad: {wrapped: Promise<void>} | void | boolean
    if (this.currentManagedElementName !== to) {
      await pageProm.priorityThen(async (frame: Frame | SectionedPage<any>) => {
        if (nextPageToken === this.nextPageToken) {
          this.currentManagedElementName = to;
          (async () => {
            if (this.pageChangeCallback) {
              if ((frame as SectionedPage<any>).sectionIndex) this.pageChangeCallback(to, [...(await (frame as SectionedPage<any>).sectionIndex).keys()])
              else this.pageChangeCallback(to, [])
            }
          })()
          ensureLoad = await this.swapFrame(frame);
          
          
        }
      })
  
      if (ensureLoad instanceof Object) await ensureLoad.wrapped
    }
    
  }

  protected async activationCallback(active: boolean) {
    await this.firstFrameLoaded
    if (this.currentFrame.active !== active) this.currentFrame.vate(active)
  }
  stl() {
    return super.stl() + require('./manager.css').toString();
  }
}