import Frame from "./../frame";
import LoadingIndecator from "../../../_indecator/loadingIndecator/loadingIndecator";
import * as domain from "../../../../lib/domain";
import lazyLoad, { ImportanceMap, Import, ResourcesMap, PriorityPromise } from "../../../../lib/lazyLoad";
import SectionedPage from "../_page/_sectionedPage/sectionedPage";
import delay from "delay";
import { Theme } from "../../../_themeAble/themeAble";
import PageSection from "../_pageSection/pageSection";
import { EventListener } from "extended-dom";


export default abstract class Manager<ManagementElementName extends string> extends Frame {
  private resLoaded: Function;

  protected busySwaping: boolean = false;
  public currentFrame: Frame;

  protected body: HTMLElement;

  private wantedFrame: Frame;


  private loadingElem: any;
  private firstFrameLoaded: Promise<void>




  private managedElementMap: ResourcesMap

  constructor(private importanceMap: ImportanceMap<() => Promise<any>, any>, public domainLevel: number, private pageChangeCallback?: (page: string, sectiones: string[], domainLevel: number) => void, private notFoundElementName: ManagementElementName = "404" as any, private pushDomainDefault: boolean = true, public onScrollBarWidthChange?: (scrollBarWidth: number) => void, private onUserScroll?: (scrollProgress: number, userInited: boolean) => void, private onScroll?: (scrollProgress: number) => void, public blurCallback?: Function, public preserveFocus?: boolean) {
    super(null);
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


    if (onUserScroll && onScroll) {
      this.scrollEventListener = new EventListener(this, "scroll", () => {
        //@ts-ignore
        let y = this.currentFrame.elementBody.scrollTop
        onUserScroll(y, this.currentFrame.userInitedScrollEvent)
        onScroll(y)
      }, false)
    }
    else {
      if (onUserScroll) this.scrollEventListener = new EventListener(this, "scroll", () => {
        //@ts-ignore
        onUserScroll(this.currentFrame.elementBody.scrollTop, this.currentFrame.userInitedScrollEvent)
      }, false)
      else if (onScroll) this.scrollEventListener = new EventListener(this, "scroll", () => {
        //@ts-ignore
        onScroll(this.currentFrame.elementBody.scrollTop)
      }, false)
    }
  }

  private scrollEventListener: EventListener

  private domainSubscription: domain.DomainSubscription
  async loadedCallback() {
    const {load, resourcesMap} = lazyLoad(this.importanceMap, e => {
      this.body.apd(e)
    })
    this.managedElementMap = resourcesMap

    this.domainSubscription = domain.get(this.domainLevel, async (to: any) => {await this.setElem(to)}, false, "")
    let initElemName = this.domainSubscription.domain

    // if (this.managedElementMap.get(this.notFoundElementName) === undefined) console.error("404 elementName: \"" + this.notFoundElementName + "\" is not found in given importanceMap", this.importanceMap)
    let setFirstPageProm = this.setElem(initElemName as ManagementElementName)
    load()
    await setFirstPageProm
    this.resLoaded();
    await this.managedElementMap.fullyLoaded
  }

  private lastScrollbarWidth: number


  private intersectionListenerIndex: Map<HTMLElement, {cb: (elem: Frame) => void, threshold?: number}> = new Map

  public addIntersectionListener(root: HTMLElement, cb: (elem: Frame) => void, threshold?: number) {
    this.intersectionListenerIndex.set(root, {cb, threshold})
    if (this.currentFrame) {
      if (this.currentFrame.addIntersectionListener) this.currentFrame.addIntersectionListener(root, cb, threshold)
      else {
        cb(this.currentFrame)
      }
    }
  }
  public removeIntersectionListener(root: HTMLElement) {
    this.intersectionListenerIndex.delete(root)
    if (this.currentFrame) {
      if (this.currentFrame.removeIntersectionListener) this.currentFrame.removeIntersectionListener(root)
    }
  }

  private lastThemeIntersection: Map<HTMLElement, Theme> = new Map
  public addThemeIntersectionListener(root: HTMLElement, cb: (theme: Theme) => void) {
    this.addIntersectionListener(root, (q) => {
      let theme: Theme = q.theme()
      if (!theme) theme = "light"
      if (theme !== this.lastThemeIntersection.get(root)) {
        cb(theme)
        this.lastThemeIntersection.set(root, theme)
      }
    })
  }

  public removeThemeIntersectionListener(root: Frame) {
    this.removeIntersectionListener(root)
  }


  /**
   * Swaps to given Frame
   * @param to frame to be swaped to
   */
  private async swapFrame(to: Frame): Promise<void | boolean> {
    if (to === undefined) {
      throw new Error();
    }

    this.loadingElem.remove();

    this.wantedFrame = to;
    let from = this.currentFrame;
    

    if (from === to) {
      //Focus even when it is already the active frame
      if (!this.preserveFocus) to.focus();
      this.busySwaping = false;
      return true;
    }
    

    
    let activationsPromises = []
    let activationProm: any

    to.show();
    if (!this.preserveFocus) to.focus();
    
    if (from !== undefined) activationsPromises.add(from.deactivate())
    if (this.active) activationsPromises.add(activationProm = to.activate())
    await Promise.all(activationsPromises)

    let activationResult: boolean = await activationProm

    if (this.busySwaping) {
      
      return activationProm;
    }
    this.busySwaping = true;

    

    if (!activationResult) {  
      to.hide()
      await to.deactivate()
      this.busySwaping = false
      return false
    }
    

    this.currentFrame = to;

    if (this.onScrollBarWidthChange) {
      //@ts-ignore
      let scrollBarWidth = this.elementBody.clientWidth - to.elementBody.clientWidth
      
      if (scrollBarWidth !== this.lastScrollbarWidth) {
        this.onScrollBarWidthChange(scrollBarWidth)
        this.lastScrollbarWidth = scrollBarWidth
      }
    }
    
    this.scrollEventListener.target((to as any).elementBody).activate()

    if (this.onUserScroll && this.onScroll) {
      
      let y = (this.currentFrame as any).elementBody.scrollTop
      this.onUserScroll(y, this.currentFrame.userInitedScrollEvent)
      this.onScroll(y)
    }
    else {

      if (this.onUserScroll) {
        this.onUserScroll((this.currentFrame as any).elementBody.scrollTop, this.currentFrame.userInitedScrollEvent)
      }
      else if (this.onScroll) this.onScroll((this.currentFrame as any).elementBody.scrollTop)
    }

    if (from !== undefined) if (from.removeIntersectionListener) {
      this.intersectionListenerIndex.forEach((q, elem) => {
        from.removeIntersectionListener(elem)
      })
    }
    if (to.addIntersectionListener) {
      this.intersectionListenerIndex.forEach(({cb, threshold}, elem) => {
        to.addIntersectionListener(elem, cb, threshold)
      })
    }

    let showAnim = from !== undefined ? to.anim([{zIndex: 100, opacity: 0, translateX: -5, scale: 1.005, offset: 0}, {opacity: 1, translateX: 0, scale: 1}], 400) : to.anim([{offset: 0, opacity: 0}, {opacity: 1}], 400);


    (async () => {
      if (from === undefined) {
        await showAnim
      }
      else {

        // let fromAnim = from.anim([{offset: 0, translateX: 0}, {translateX: 10}], 3000)
        await Promise.all([showAnim])
  
        from.css({opacity: 0, display: "none"})
  
      }
  
  
      to.css("zIndex", 0)
      this.busySwaping = false;
      if (this.wantedFrame !== to) {
        await this.swapFrame(this.wantedFrame);
        return
      }
    })()

    return true
  }

  private currentManagedElementName: ManagementElementName
  private nextPageToken: Symbol

  public element(): ManagementElementName
  public element(to: ManagementElementName, push?: boolean): void
  public element(to?: ManagementElementName, push: boolean = this.pushDomainDefault) {
    if (to === null) {
      // FIXME: Do we need this check here?
      if (this.managedElementMap.get(this.domainSubscription.domain) === undefined) return this.setElem(this.notFoundElementName)
    }
    else {
      if (to) domain.set(to, this.domainLevel, push)
      else return this.currentManagedElementName
    }
  }

  private async setElem(to: ManagementElementName) {
    let nextPageToken = Symbol("nextPageToken")
    this.nextPageToken = nextPageToken;

    
    
    let accepted = false
    while(!accepted) {
      let nthTry = 1
      let pageProm = this.managedElementMap.get(to, nthTry)
      while(pageProm === undefined) {
        if (to === "") {
          to = this.notFoundElementName
          break
        }
        to = to.substr(0, to.lastIndexOf("/")) as any
        pageProm = this.managedElementMap.get(to, nthTry)
      } 

      while(pageProm !== undefined) {
        nthTry++

        if (this.currentManagedElementName !== to) {
          let suc: boolean = await pageProm.priorityThen(async (frame: Frame | SectionedPage<any>) => {
            if (nextPageToken === this.nextPageToken) {
              return await this.swapFrame(frame);
            }
            return false
          });
    
    
          
    
          if (suc) {
            this.currentManagedElementName = to;
            let frame = this.currentFrame;
            (async () => {
              if (this.pageChangeCallback) {
                let domainLevel = frame.domainLevel || this.domainLevel
                try {
                  if ((frame as SectionedPage<any>).sectionList) {
                    (await (frame as SectionedPage<any>).sectionList).get((sectionListNested) => {
                      this.pageChangeCallback(to, sectionListNested, domainLevel)
                    })
                  }
                  else this.pageChangeCallback(to, [], domainLevel)
                }
                catch(e) {}
              }
            })()
            accepted = true
            break
          }
          else {
            pageProm = this.managedElementMap.get(to, nthTry)
          }
        }
        else {
          accepted = true
          break
        }
      }
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