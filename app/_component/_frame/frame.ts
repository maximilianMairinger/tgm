import Component from "./../component";

export default abstract class Frame extends Component {
  protected active: boolean = false;
  constructor(body?: HTMLElement) {
    super(body);
  }
  public activate(): void {
    this.vate(true)
  }
  public deactivate(): void {
    this.vate(false)
  }
  public vate(activate: boolean) {
    this.active = activate;
    this.activationCallback(activate);
  }
  protected abstract activationCallback(active: boolean): void;
}