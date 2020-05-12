import Frame from "./../frame";
import LoadingIndecator from "../../_indecator/loadingIndecator/loadingIndecator";
import * as domain from "../../../lib/domain";
import lazyLoad, { ImportanceMap, Import, ResourcesMap } from "../../../lib/lazyLoad";


// TODO: load only when inited


export default abstract class Manager<ManagementElementName extends string> extends Frame {
  private resLoaded: Function;

  protected busySwaping: boolean = false;
  public currentFrame: Frame;

  protected body: HTMLElement;

  private wantedFrame: Frame;


  private loadingElem: any;
  private loaded: Promise<void>




  private managedElementMap: ResourcesMap

  constructor(importanceMap: ImportanceMap<() => Promise<any>, any>, private domainLevel: number, private notFoundElementName: ManagementElementName = "404" as any, private pushDomainDefault: boolean = true,  public blurCallback?: Function, public preserveFocus?: boolean) {
    super();
    this.loaded = new Promise((res) => {
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


    const load = lazyLoad(importanceMap, e => {
      this.body.apd(e)
    })

    let initElemName = domain.get(domainLevel, this.setElem.bind(this))
    setTimeout(async () => {
      let pageProm: any
      
      try {
        pageProm = importanceMap.getByString(initElemName)
      }
      catch(e) {

      }
      
      while(pageProm === undefined) {
        try {
          initElemName = initElemName.substr(0, initElemName.lastIndexOf("/")) as any
        }
        catch(e) {

        }
        pageProm = importanceMap.getByString(initElemName)
      }
      this.managedElementMap = load(initElemName)
      if (this.managedElementMap.get(notFoundElementName) === undefined) console.error("404 elementName: \"" + notFoundElementName + "\" is not found in given importanceMap", importanceMap)
      await this.setElem(initElemName as ManagementElementName)
      this.resLoaded();
    }, 0)
    

    
  }
  /**
   * Swaps to given Frame
   * @param to frame to be swaped to
   */
  private async swapFrame(to: Frame): Promise<boolean | void> {
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
    if (this.active) activationResult = await to.activate();
    
    if (!activationResult) {  
      to.hide()
      await this.setElem(this.notFoundElementName)
      if (from !== undefined) {
        from.hide()
        from.deactivate()
      }
      
      this.busySwaping = false
      
      return
    }
    
    to.css("zIndex", "100")
    let showAnim = to.anim([{opacity: 0, scale: 1.05, offset: 0}, {opacity: 1, scale: 1}]);
    let finalFunction = () => {
      to.css("zIndex", "0")
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
        from.deactivate();
      }).then(finalFunction);

    }

    return activationResult
  }

  private currentManagedElementName: ManagementElementName
  private nextPageToken: Symbol

  public element(): ManagementElementName
  public element(to: ManagementElementName, push?: boolean): void
  public element(to?: ManagementElementName, push: boolean = this.pushDomainDefault) {
    if (to) domain.set(this.domainLevel, to, push)
    else return this.currentManagedElementName
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

    await pageProm.then(async (mod) => {
      if (nextPageToken === this.nextPageToken) {
        this.currentManagedElementName = to
        await this.swapFrame(mod)
      }
    })
  }

  protected async activationCallback(active: boolean) {
    await this.loaded
    if (this.currentFrame.active !== active) this.currentFrame.vate(active)
  }
  stl() {
    return super.stl() + require('./manager.css').toString();
  }
}