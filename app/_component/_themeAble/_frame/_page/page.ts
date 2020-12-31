import { Theme } from "../../themeAble";
import Frame from "../frame";


export default abstract class Page extends Frame {
  public domainLevel?: number
  public readonly defaultDomain: string = ""
  constructor(theme: Theme = null) {
    super(theme)

  }
  public async navigate(domainFragment?: string) {
    let res = true
    if (this.navigationCallback) {
      let acRes = await this.navigationCallback(domainFragment)
      if (acRes === undefined) acRes = true
      if (!acRes) res = false
    }
    
    return res
  }
  public async vate(activate: boolean) {
    
    
    
    return super.vate(activate)
  }
  /**
   * @return resolve Promise as soon as you know if the navigation will be successful or not. Dont wait for swap animation etc
   */
  protected navigationCallback?(domainFragment: string): boolean | void | Promise<boolean | void>
  protected initialActivationCallback?(): boolean | void | Promise<boolean | void>
  stl() {
    return super.stl() + require("./page.css").toString()
  }
}