import ThemeAble, { Theme } from "../../_themeAble/themeAble";

export default abstract class Frame extends ThemeAble<HTMLElement> {
  public readonly active: boolean = false;
  public readonly initiallyActivated = false
  constructor(theme?: Theme) {
    super(undefined, theme)
  }
  public async activate(): Promise<boolean> {
    let res = true

    if (this.initialActivationCallback && !this.initiallyActivated) {
      let acRes = await this.initialActivationCallback();
      (this as any).initiallyActivated = true
      if (acRes === undefined) acRes = true
      if (!acRes) res = false
    }
    
    let acRes = await this.vate(true)
    if (!acRes) res = false


    return res
  }
  public deactivate(): Promise<boolean> {
    return this.vate(false)
  }
  
  public async vate(activate: boolean): Promise<boolean> {
    (this as any).active = activate

    let res = true
    
    if (this.activationCallback) {
      let acRes = await this.activationCallback(activate)
      if (acRes === undefined) acRes = true
      if (!acRes) res = false
    }
    return res
  }
  stl() {
    return require("./frame.css").toString()
  }
  
  protected minimalContentFullPaint?(active: boolean): void | Promise<void>
  protected fullContentFullPaint?(active: boolean): void | Promise<void>
  protected completePaint?(active: boolean): void | Promise<void>
  protected activationCallback?(active: boolean): boolean | void | Promise<boolean | void>
  protected initialActivationCallback?(): boolean | void | Promise<boolean | void>
  protected constructionCallback?(): boolean | void | Promise<boolean | void>
  public userInitedScrollEvent = true
  public addIntersectionListener?(root: HTMLElement, cb: Function, threshold?: number, rootMargin?: string): void
  public removeIntersectionListener?(root: HTMLElement): void
}