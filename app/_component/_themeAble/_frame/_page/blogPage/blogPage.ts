import { declareComponent } from "../../../../../lib/declareComponent"
import Page from "../page"
import * as domain from "./../../../../../lib/domain"
import Blog from "../../../../_themeAble/_text/blogPost/blogPost"
import GhostContentAPI from '@tryghost/content-api'


// change after deployment to root url
//@ts-ignore
const api = new GhostContentAPI({
  url: ' https://dev.tgmrebrand.xyz',
  key: '062f128c326e0312972d41f705',
  version: 'v2'
});

export default class BlogPage extends Page {
  private input = this.q("input") as any as HTMLInputElement
  private domainSubscription: domain.DomainSubscription
  constructor(private setPageCb: (domain: string) => void, public domainLevel: number) {
    super()
  }

  protected async loadedCallback() {
    this.domainSubscription = domain.get(this.domainLevel, async (to: string) => {
      await this.setBlog(to)
    }, true)
    let initBlogId = this.domainSubscription.domain
    await this.setBlog(initBlogId)
  }

  private blogLoaded = false;
  private async setBlog(blogSlug: string) {
    console.log("setBlog", blogSlug)
    if(this.blogLoaded)
      this.q("c-blog-post").remove();

    api.posts.read({slug: blogSlug}, {formats: ['html', 'plaintext']}).then((blogData) => {
      let blog = new Blog();
      console.log(blogData.title);
      blog.blogtitle(blogData.title);
      blog.date(blogData['published_at']);
      blog.image(blogData['feature_image']);
      blog.htmlcontent(blogData.html);
      this.elementBody.append(blog);
    }).catch((err) => {
      console.error(err);
    });
    this.blogLoaded = true;
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