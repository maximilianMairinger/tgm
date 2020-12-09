import Frame from "./../frame";
import LoadingIndecator from "../../../_indecator/loadingIndecator/loadingIndecator";
import * as domain from "../../../../lib/domain";
import lazyLoad, { ImportanceMap, Import, ResourcesMap, PriorityPromise } from "../../../../lib/lazyLoad";
import SectionedPage from "../_page/_sectionedPage/sectionedPage";
import delay from "delay";
import { Theme } from "../../../_themeAble/themeAble";
import PageSection from "../_pageSection/pageSection";
import { EventListener } from "extended-dom";
import Page from "../_page/page";



/** Function that count occurrences of a substring in a string;
 * @param {String} string               The string
 * @param {String} subString            The sub string to search for
 * @param {Boolean} [allowOverlapping]  Optional. (Default:false)
 *
 * @author Vitim.us https://gist.github.com/victornpb/7736865
 * @see Unit Test https://jsfiddle.net/Victornpb/5axuh96u/
 * @see http://stackoverflow.com/questions/4009756/how-to-count-string-occurrence-in-string/7924240#7924240
 */
function occurrences(string: string, subString: string, allowOverlapping = false) {

  string += "";
  subString += "";
  if (subString.length <= 0) return (string.length + 1);

  var n = 0,
      pos = 0,
      step = allowOverlapping ? 1 : subString.length;

  while (true) {
      pos = string.indexOf(subString, pos);
      if (pos >= 0) {
          ++n;
          pos += step;
      } else break;
  }
  return n;
}






export default abstract class Manager<ManagementElementName extends string> extends Frame {
  private resLoaded: Function;

  protected busySwaping: boolean = false;
  public currentPage: Page;

  protected body: HTMLElement;

  private wantedFrame: Page;


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
        let y = this.currentPage.elementBody.scrollTop
        onUserScroll(y, this.currentPage.userInitedScrollEvent)
        onScroll(y)
      }, false)
    }
    else {
      if (onUserScroll) this.scrollEventListener = new EventListener(this, "scroll", () => {
        //@ts-ignore
        onUserScroll(this.currentPage.elementBody.scrollTop, this.currentPage.userInitedScrollEvent)
      }, false)
      else if (onScroll) this.scrollEventListener = new EventListener(this, "scroll", () => {
        //@ts-ignore
        onScroll(this.currentPage.elementBody.scrollTop)
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
    if (this.currentPage) {
      if (this.currentPage.addIntersectionListener) this.currentPage.addIntersectionListener(root, cb, threshold)
      else {
        cb(this.currentPage)
      }
    }
  }
  public removeIntersectionListener(root: HTMLElement) {
    this.intersectionListenerIndex.delete(root)
    if (this.currentPage) {
      if (this.currentPage.removeIntersectionListener) this.currentPage.removeIntersectionListener(root)
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
  private async swapFrame(to: Page, domainFragment: string): Promise<void | boolean> {
    if (to === undefined) {
      throw new Error("Unknown frame");
    }
    

    if (this.busySwaping) {
      return true;
    }
    this.busySwaping = true;

    this.loadingElem.remove();

    this.wantedFrame = to;
    let from = this.currentPage;

    
    

    if (from === to) {
      //Focus even when it is already the active frame
      if (!this.preserveFocus) to.focus()
      if (!await to.navigate(domainFragment)) {  
        to.hide()
        await to.deactivate()
        this.busySwaping = false
        return false
      }
      this.busySwaping = false
      return true
    }
    

    
    let activationsPromises = []
    let activationProm: any

    to.show();
    if (!this.preserveFocus) to.focus();
    
    if (from !== undefined) activationsPromises.add(from.deactivate())
    if (this.active) activationsPromises.add(activationProm = to.activate(domainFragment))
    await Promise.all(activationsPromises)

    let activationResult: boolean = await activationProm

    

    

    if (!activationResult) {  
      to.hide()
      await to.deactivate()
      this.busySwaping = false
      return false
    }
    

    this.currentPage = to;

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
      
      let y = (this.currentPage as any).elementBody.scrollTop
      this.onUserScroll(y, this.currentPage.userInitedScrollEvent)
      this.onScroll(y)
    }
    else {

      if (this.onUserScroll) {
        this.onUserScroll((this.currentPage as any).elementBody.scrollTop, this.currentPage.userInitedScrollEvent)
      }
      else if (this.onScroll) this.onScroll((this.currentPage as any).elementBody.scrollTop)
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
    else {
      this.intersectionListenerIndex.forEach(({cb}) => {
        cb(to)
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
        await this.swapFrame(this.wantedFrame, domainFragment);
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

  private async setElem(fullDomain: ManagementElementName) {
    let to: any = fullDomain
    let nextPageToken = Symbol("nextPageToken")
    this.nextPageToken = nextPageToken;

    
    let accepted = false
    let pageProm = this.managedElementMap.get(to, 1)
    while(!accepted) {
      let nthTry = 1
      
      
      while(pageProm === undefined) {
        if (to === "") {
          to = this.notFoundElementName
          pageProm = this.managedElementMap.get(to, nthTry)
          break
        }
        to = to.substr(0, to.lastIndexOf("/")) as any
        pageProm = this.managedElementMap.get(to, nthTry)
      }

      let domFrag = fullDomain.splice(0, to.length)
      if (domFrag.startsWith("/")) domFrag = domFrag.substring(1)
      const domainFragment = domFrag
      const domainLevel = to === "" ? 0 : (occurrences(to, "/") + 1 + this.domainLevel)

      while(pageProm !== undefined) {
        nthTry++

        let suc: boolean = await pageProm.priorityThen(async (page: Page | SectionedPage<any>) => {
          if (nextPageToken === this.nextPageToken) {
            page.domainLevel = domainLevel
            return await this.swapFrame(page, domainFragment === "" ? page.defaultDomain : domainFragment);
          }
          return false
        });
  
        if (suc) {
          if (this.currentManagedElementName !== to) {
            this.currentManagedElementName = to;
            let page = this.currentPage;
            (async () => {
              if (this.pageChangeCallback) {
                try {
                  if ((page as SectionedPage<any>).sectionList) {
                    (await (page as SectionedPage<any>).sectionList).tunnel(e => e.filter(s => s !== "")).get((sectionListNested) => {
                      this.pageChangeCallback(to, sectionListNested, page.domainLevel)
                    })
                  }
                  else this.pageChangeCallback(to, [], page.domainLevel)
                }
                catch(e) {}
              }
            })()
          }
          
          accepted = true
          break
        }
        else {
          pageProm = this.managedElementMap.get(to, nthTry)
        }
      }
    }
  }

  protected async activationCallback(active: boolean) {
    await this.firstFrameLoaded
    if (this.currentPage.active !== active) this.currentPage.vate(active)
  }
  stl() {
    return super.stl() + require('./manager.css').toString();
  }
}