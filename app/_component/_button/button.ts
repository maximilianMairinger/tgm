import Component from "../component";
import { Tel } from "extended-dom";
import declareComponent from "../../lib/declareComponent";
import * as domain from "./../../lib/domain"


const pressedClass = "pressed";


export default class Button extends Component<HTMLAnchorElement> {
  private doesFocusOnHover: boolean;
  private mouseOverListener: Tel;
  private mouseOutListener: Tel;
  private callbacks: ((e: MouseEvent | KeyboardEvent) => void)[] = [];

  private preferedTabIndex: number
  private _hotKey: string
  constructor(protected readonly enabled: boolean = false, focusOnHover: boolean = false, public tabIndex: number = 0, public obtainDefault: boolean = false, public preventFocus = false, blurOnMouseOut: boolean = false, hotkey?: string) {
    super(ce("a") as any as HTMLAnchorElement);

    if (enabled) this.enableForce(true)
    else this.enableForce(true)

    this.preferedTabIndex = this.tabIndex

    let alreadyPressed = false;

    this.elementBody.on("click", (e) => {
      /*if (e.which === 1)*/ this.click(e);
    });
    this.elementBody.on("mousedown", (e) => {
      if (e.which === 1) this.addClass(pressedClass)
    })
    this.elementBody.on("mouseup", () => {
      this.removeClass(pressedClass);
    });
    this.elementBody.on("mouseout", () => {
      this.removeClass(pressedClass);
    })
    this.elementBody.on("keydown", (e) => {
      if (e.key === " ") if (!alreadyPressed) {
        alreadyPressed = true;
        this.click(e)
      }
    });
    this.elementBody.on("keyup", ({key}) => {
      if (key === " " || key === "Enter"){
        alreadyPressed = false;
        this.removeClass(pressedClass);
      }
    });
    this.elementBody.on("blur", () => {
      alreadyPressed = false;
    });

    this.mouseOverListener = this.elementBody.ls("mouseover", () => {
      this.focus();
    }, false)
    this.mouseOutListener = this.elementBody.ls("mouseout", () => {
      this.blur();
    }, false)

    this.focusOnHover(focusOnHover);
    this.blurOnMouseOut(blurOnMouseOut);
    this.hotkey(hotkey)
  }
  private enableForce(prevFocus: boolean) {
    //@ts-ignore
    this.enabled = true
    this.tabIndex = this.preferedTabIndex
    this.addClass("enabled");
    if (!prevFocus) this.focus()
  }
  public enable(prevFocus: boolean = true) {
    if (this.enabled) return
    this.enableForce(prevFocus)
  }
  private disableForce(prevBlur: boolean) {
    //@ts-ignore
    this.enabled = false
    this.tabIndex = undefined
    this.removeClass("enabled");
    if (!prevBlur) this.blur()
  }
  public disable(prevBlur: boolean = false) {
    if (!this.enabled) return
    this.disableForce(prevBlur)
  }

  private _link: string
  private linkFn: any
  public link(): string
  public link(to: string): void
  public link(to?: string) {

    if (to !== undefined) {
      if (to !== null) {
        let link = domain.linkMeta(to)
        this.elementBody.href = link.href
        this._link = link.link
        this.linkFn = this.addActivationCallback((e) => {
          if (link.isOnOrigin) {
            if (e) e.preventDefault()
            domain.set(to)
          }
          
        })
      }
      else {
        this.removeActivationCallback(this.linkFn)
      }
      
    }
    else return this._link
  }

  public blurOnMouseOut(to: boolean) {
    if (to) this.mouseOutListener.enable();
    else this.mouseOutListener.disable();
  }
  public addActivationCallback<CB extends (e?: MouseEvent | KeyboardEvent) => void>(cb: CB): CB {
    this.callbacks.add(cb);
    if (!this.enabled) this.enable()
    return cb
  }
  public removeActivationCallback<CB extends (e?: MouseEvent | KeyboardEvent) => void>(cb: CB): CB {
    this.callbacks.removeV(cb);
    if (this.callbacks.empty && this.enabled) this.disable()
    return cb
  }

  public focusOnHover(): boolean
  public focusOnHover(to: boolean): void
  public focusOnHover(to?: boolean) {
    if (to !== undefined) {
      this.doesFocusOnHover = to;
      if (to) {
        this.mouseOverListener.enable();
        this.mouseOutListener.enable();
      }
      else {
        this.mouseOverListener.disable();
        this.mouseOutListener.disable();
      }
    }
    else return this.doesFocusOnHover;
  }

  public click(e?: MouseEvent | KeyboardEvent) {
    if (e !== undefined && !this.obtainDefault) e.preventDefault();
    if (this.enabled) {
      if (!this.preventFocus) this.focus();
      this.callbacks.forEach(f => {f.call(this, e);});
    }
  }
  private hotKeyListener: (e: KeyboardEvent) => void

  public hotkey(): string
  public hotkey(to: string): void
  public hotkey(to?: string) {
    if (to !== undefined) {
      if (to === null) {
        if (this._hotKey !== undefined) {
          document.off("keydown", this.hotKeyListener)
          delete this.hotKeyListener
        }
      }
      else if (this._hotKey === undefined) {
        this.hotKeyListener = (e) => {
          if (this.offsetParent !== null) if (e.key === this._hotKey) this.click()
        }
        document.on("keydown", this.hotKeyListener)
      }
      this._hotKey = to
    }
    else {
      return this._hotKey
    }
  }

  stl() {
    return require('./button.css').toString();
  }
  pug() {
    return require("./button.pug").default
  }
}

declareComponent("button", Button)


