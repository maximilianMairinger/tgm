import ThemeAble, { Theme } from "../../_themeAble/themeAble";

export default abstract class Frame extends ThemeAble<HTMLElement> {
  public readonly active: boolean = false;
  public readonly initiallyActivated = false
  public domainLevel?: number
  constructor(theme?: Theme) {
    super(undefined, theme)
  }
  public activate(): Promise<boolean> {
    return this.vate(true)
  }
  public deactivate(): Promise<boolean> {
    return this.vate(false)
  }
  
  public async vate(activate: boolean): Promise<boolean> {
    (this as any).active = activate

    let res = true
    if (activate && this.initialActivationCallback && !this.initiallyActivated) {
      let acRes = await this.initialActivationCallback();
      (this as any).initiallyActivated = true
      if (acRes === undefined) acRes = true
      if (!acRes) res = false
    }
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
  
  protected activationCallback?(active: boolean): boolean | void | Promise<boolean | void>
  protected initialActivationCallback?(): boolean | void | Promise<boolean | void>
  protected loadedCallback?(): boolean | void | Promise<boolean | void>
  public userInitedScrollEvent = true
  public addIntersectionListener?(root: HTMLElement, cb: Function, threshold?: number, rootMargin?: string): void
  public removeIntersectionListener?(root: HTMLElement): void
}