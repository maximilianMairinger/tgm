import ThemeAble, { Theme } from "../../_themeAble/themeAble";

export default abstract class Frame extends ThemeAble<HTMLElement> {
  public readonly active: boolean = false;
  public readonly initiallyActivated = false
  constructor(theme?: Theme) {
    super(undefined, theme)
  }
  public activate(domainFragment: string) {
    return this.vate(true, domainFragment)
  }
  public deactivate() {
    return this.vate(false)
  }
  
  public vate(activate: false, domainFragment?: string)
  public vate(activate: true, domainFragment: string)
  public vate(activate: boolean, domainFragment?: string) {
    (this as any).active = activate
    if (this.initialActivationCallback && activate && !this.initiallyActivated) {
      (this as any).initiallyActivated = true
      this.initialActivationCallback(domainFragment)
    }

    if (this.activationCallback) return this.activationCallback(activate, domainFragment)
  }
  
  stl() {
    return require("./frame.css").toString()
  }
  protected minimalContentPaint?(domainFragment?: string): void | Promise<void>
  protected fullContentPaint?(domainFragment?: string): void | Promise<void>
  protected completePaint?(domainFragment?: string): void | Promise<void>

  protected activationCallback?(active: true, domainFragment: string): void
  protected activationCallback?(active: false): void
  protected activationCallback?(active: boolean, domainFragment?: string): void
  protected initialActivationCallback?(domainFragment: string): void
  public userInitedScrollEvent = true
  public addIntersectionListener?(root: HTMLElement, cb: Function, threshold?: number, rootMargin?: string): void
  public removeIntersectionListener?(root: HTMLElement): void
}