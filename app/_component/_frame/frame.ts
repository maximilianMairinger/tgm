import Component from "./../component";

export default abstract class Frame extends Component {
  protected active: boolean = false;
  constructor(body?: HTMLElement) {
    super(body);
  }
  public activate(): boolean | void | Promise<boolean | void> {
    return this.vate(true)
  }
  public deactivate(): boolean | void | Promise<boolean | void> {
    return this.vate(false)
  }
  public vate(activate: boolean): boolean | void | Promise<boolean | void> {
    this.active = activate;
    return this.activationCallback(activate)
  }
  stl() {
    return require("./frame.css").toString()
  }
  protected abstract activationCallback(active: boolean): boolean | void | Promise<boolean | void>
}