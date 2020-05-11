import Frame from "./../frame";
import LoadingIndecator from "../../_indecator/loadingIndecator/loadingIndecator";
import * as domain from "../../../lib/domain";
import lazyLoad, { ImportanceMap, Import, ResourcesMap } from "../../../lib/lazyLoad";


export class UnknownFrameException<ManagementElementName extends string> extends Error {
  constructor(frame: ManagementElementName) {
    super("Unable to resolve frame \"" + frame + "\".")
  }
}



export default abstract class Manager<ManagementElementName extends string> extends Frame {
  private resFirstFrameSet: Function;
  private firstFrameSet: Promise<any>;

  protected busySwaping: boolean = false;
  protected currentFrame: Frame;

  protected body: HTMLElement;

  private wantedFrame: Frame;


  private loadingElem: any;




  private managedElementMap: ResourcesMap
  constructor(importanceMap: ImportanceMap<() => Promise<any>, any>, private domainLevel: number, private pushDomain: boolean = true,  public blurCallback?: Function, public preserveFocus?: boolean) {
    super();
    this.firstFrameSet = new Promise((res) => {
      this.resFirstFrameSet = res;
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


    let initElemName = domain.get(domainLevel, "", this.setElem.bind(this))
    setTimeout(() => {
      this.managedElementMap = load(initElemName)
      this.setElem(initElemName as ManagementElementName)
    }, 0)
    

    
  }
  /**
   * Swaps to given Frame
   * @param to frame to be swaped to
   */
  private swapFrame(to: Frame): void {
    console.log("hello")
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

    if (this.active) to.activate();
    to.css("zIndex", "100")
    let showAnim = to.anim([{opacity: 0, scale: 1.05, offset: 0}, {opacity: 1, scale: 1}]);
    let finalFunction = () => {
      to.css("zIndex", "0")
      this.busySwaping = false;
      if (this.wantedFrame !== to) this.swapFrame(this.wantedFrame);
    }

    this.currentFrame = to;
    this.resFirstFrameSet();

    if (from === undefined) {
      showAnim.then(finalFunction);
    }
    else {
      showAnim.then(() => {
        from.hide()
        from.deactivate();
      }).then(finalFunction);

    }
  }

  private currentManagedElementName: ManagementElementName
  private nextPageName: ManagementElementName

  public element(): ManagementElementName
  public element(to: ManagementElementName): void
  public element(to?: ManagementElementName) {
    if (to) domain.set(this.domainLevel, to, this.pushDomain)
    else return this.currentManagedElementName
  }

  private setElem(to: ManagementElementName) {
    this.nextPageName = to;
    try {
      this.managedElementMap.get(to).then((mod) => {
        if (to === this.nextPageName) {
          this.swapFrame(mod);
          this.currentManagedElementName = to;
        }
      });
    }
    catch(e) {
      throw new UnknownFrameException(to)
    }
  }

  protected async activationCallback(active: boolean) {
    await this.firstFrameSet;
    //@ts-ignore
    if (this.currentFrame.active !== active)
      this.currentFrame.vate(active);
  }
  stl() {
    return require('./manager.css').toString();
  }
}