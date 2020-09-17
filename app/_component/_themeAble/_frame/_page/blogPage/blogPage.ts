import { declareComponent } from "../../../../../lib/declareComponent"
import Page from "../page"
import * as domain from "./../../../../../lib/domain"


export default class BlogPage extends Page {
  private input = this.q("input") as any as HTMLInputElement
  private domainSubscription: domain.DomainSubscription
  constructor(private setPageCb: (domain: string) => void, public domainLevel: number) {
    super()
    this.input.on("change", () => {
      domain.set(this.input.value, 1)
    })
    
    
  }

  protected async loadedCallback() {
    this.domainSubscription = domain.get(this.domainLevel, async (to: string) => {
      await this.setBlog(to)
    }, true)
    let initBlogId = this.domainSubscription.domain
    await this.setBlog(initBlogId)
  }

  private async setBlog(blogId: string) {
    console.log("setBlog", blogId)
  }

  

  protected activationCallback(active: boolean): void {
    this.domainSubscription.vate(active)
  }
  stl() {
    return super.stl() + require("./blogPage.css").toString()
  }
  pug() {
    return require("./blogPage.pug").default
  }

}

declareComponent("blog-page", BlogPage)