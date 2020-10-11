import { declareComponent } from "../../../../../lib/declareComponent"
import Page from "../page"
import * as domain from "./../../../../../lib/domain"
import Blog from "../../../../_themeAble/_text/blogPost/blogPost"
import BlogSuggestions, {blogCardInfo} from "../../../blogSuggestions/blogSuggestions";
import GhostContentAPI from '@tryghost/content-api'
import BlogCard from "../../../_card/_infoCard/blogCard/blogCard";


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

  private blogLoaded = false;
  private async setBlog(blogSlug: string) {
    console.log("setBlog", blogSlug)
    if(this.blogLoaded)
      this.elementBody.childNodes.forEach(child => child.remove());

    api.posts.read({slug: blogSlug}, {formats: ['html', 'plaintext']}).then((blogData) => {
      let blog = new Blog();
      console.log(blogData.title);
      blog.blogtitle(blogData.title);
      blog.date(blogData.published_at);
      blog.image(blogData.feature_image);
      blog.htmlcontent(blogData.html);
      blog.css({"order": 1});
      this.elementBody.append(blog);
    }).catch((err) => {
      console.warn("Unable to load blog", err.message);
      let error = ce("error-message");
      error.text("404 Not Found");
      this.elementBody.append(error);
    });
    api.posts.browse({limit:6}).then((blogData) => {
      let suggestions = new BlogSuggestions();
      suggestions.blogs(blogData.filter(blog => blog.slug != blogSlug)
          .map((blog) => {
        let blogCard:blogCardInfo = {
          heading: blog.title,
          date: blog.published_at,
          content: blog.excerpt,
          thumbnail: blog.feature_image,
          link: blog.url
        }
        return blogCard;
      }));
      suggestions.css({"order": 2});
      this.elementBody.append(suggestions)
    }).catch((err) => {
      console.error(err);
    })
    this.blogLoaded = true;
  }

  

  protected activationCallback(active: boolean): void {
    if (active) {
      this.domainSubscription = domain.get(this.domainLevel, async (to: string) => {
        await this.setBlog(to)
      }, true)
      let initBlogId = this.domainSubscription.domain
      this.setBlog(initBlogId)
    }
    else this.domainSubscription.deactivate()


    
  }
  stl() {
    return super.stl() + require("./blogPage.css").toString()
  }
  pug() {
    return require("./blogPage.pug").default
  }

}

declareComponent("blog-page", BlogPage)