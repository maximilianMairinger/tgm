import { Theme } from "../../themeAble";
import Frame from "../frame";


export default abstract class Page extends Frame {
  public domainLevel?: number
  public readonly defaultDomain: string = ""
  constructor(theme: Theme = null) {
    super(theme)

  }
  public async activate(domainFragment?: string): Promise<boolean> {
    let res = true

    if (this.initialActivationCallback && !this.initiallyActivated) {
      let acRes = await this.initialActivationCallback(domainFragment);
      (this as any).initiallyActivated = true
      if (acRes === undefined) acRes = true
      if (!acRes) res = false
    }
    let acRes = await this.vate(true)
    if (acRes === undefined) acRes = true
    if (!acRes) res = false

    if (this.navigationCallback) {
      let acRes = await this.navigationCallback(domainFragment)
      if (acRes === undefined) acRes = true
      if (!acRes) res = false
    }

    return res
  }
  public async navigate(domainFragment: string) {
    let res = true
    if (this.navigationCallback) {
      let acRes = await this.navigationCallback(domainFragment)
      if (acRes === undefined) acRes = true
      if (!acRes) res = false
    }
    
    return res
  }
  protected navigationCallback?(domainFragment: string): boolean | void | Promise<boolean | void>
  protected initialActivationCallback?(domainFragment?: string): boolean | void | Promise<boolean | void>
  stl() {
    return super.stl() + require("./page.css").toString()
  }
}