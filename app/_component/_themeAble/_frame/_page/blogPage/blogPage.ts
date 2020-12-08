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
  url: 'https://dev.tgmrebrand.xyz',
  key: '062f128c326e0312972d41f705',
  version: 'v2'
});

export default class BlogPage extends Page {
  private domainSubscription: domain.DomainSubscription


  private blogLoaded = false;
  private async setBlog(query: string): Promise<boolean> {
    if(this.blogLoaded) {
      this.elementBody.removeChilds()
    }


    let blogData: any
    try {
      blogData = await api.posts.read(query, {formats: ['html', 'plaintext']})
    }
    catch(e) {
      return false
    }
    

    let blog = new Blog();
    blog.blogtitle(blogData.title);
    blog.date(blogData.published_at);
    blog.image(blogData.feature_image);
    blog.htmlcontent(blogData.html);
    blog.css({"order": 1});
    this.elementBody.append(blog);

    let preview = true

    if (preview) {
      let blogData: any
      try {
        blogData = await api.posts.browse({limit: 6})
      }
      catch(e) {
        console.error("Unable to load recommended blogs")
      }
      
      let suggestions = new BlogSuggestions();
      const domainCommon = [...domain.domainIndex].rmI(domain.domainIndex.length - 1).join(domain.dirString) + domain.dirString
      suggestions.blogs(blogData.filter(blog => blog.slug != query).map((blog) => {
        let blogCard: blogCardInfo = {
          heading: blog.title,
          date: blog.published_at,
          content: blog.excerpt,
          thumbnail: blog.feature_image,
          link: domainCommon + blog.slug
        }
        return blogCard;
      }));
      suggestions.css("order", 2);
      this.elementBody.append(suggestions)
    }

    this.blogLoaded = true;
  }

  private setBlogFromUrl(url: string) {
    let id = url.split(domain.dirString).last
    return this.setBlog(id)
  }

  protected async activationCallback(active: boolean) {
    if (active) {
      this.domainSubscription = domain.get(this.domainLevel, this.setBlogFromUrl.bind(this), false)
      return await this.setBlogFromUrl(this.domainSubscription.domain)
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