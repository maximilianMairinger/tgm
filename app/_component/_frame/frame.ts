import Component from "./../component";

export default abstract class Frame extends Component {
  public readonly active: boolean = false;
  public readonly initiallyActivated = false
  constructor(body?: HTMLElement) {
    super(body);
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
}