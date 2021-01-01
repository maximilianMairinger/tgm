import { declareComponent } from "../../../../../lib/declareComponent"
import Page from "../page"
import * as domain from "./../../../../../lib/domain"
import Blog from "../../../../_themeAble/_text/blogPost/blogPost"
import BlogSuggestions, {blogCardInfo} from "../../../blogSuggestions/blogSuggestions";
import GhostContentAPI, { PostOrPage, ReadFunction } from '@tryghost/content-api'
import { lang } from "../../../../../lib/lang"
import BlogCard from "../../../_card/_infoCard/blogCard/blogCard";
import { Data } from "josm";


//todo: change after deployment to root url
const api = new GhostContentAPI({
  url: 'https://dev.tgmrebrand.xyz',
  key: '062f128c326e0312972d41f705',
  version: 'v3'
});

export default class BlogPage extends Page {
  

  constructor() {
    super("light")
  }

  private blogLoaded = false;
  private async setBlog(query: string) {
    if(this.blogLoaded) {
      this.elementBody.removeChilds()
    }


    let blogData: PostOrPage = this.cache[query]
    
    

    lang.links[query] = new Data(blogData.title)

    
    let blog = new Blog();
    blog.blogtitle(blogData.title);
    if (blogData.published_at) blog.date(blogData.published_at);
    blog.image(blogData.feature_image);
    blog.htmlcontent(blogData.html);
    blog.css({"order": 1});
    this.elementBody.append(blog);

    let preview = false

    //deativates suggestions
    if (false) {
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
    let split = url.split(domain.dirString)
    this.domainLevel = split.length
    let id = split.last
    

    return this.setBlog(id)
  }

  private cache: {[slug in string]: PostOrPage} = {}
  private domainFrag: string
  async tryNavigationCallback(domainFragment: string) {
    domainFragment = domainFragment.split(domain.dirString).last
    this.domainFrag = domainFragment
    if (this.cache[domainFragment]) return true
    let blogData: PostOrPage
    try {
      blogData = await api.posts.read({slug: domainFragment}, {formats: ['html', 'plaintext']})
    }
    catch(e) {
      return false
    }
    this.cache[domainFragment] = blogData
    return true
  }
  navigationCallback() {
    return this.setBlogFromUrl(this.domainFrag)
  }

  stl() {
    return super.stl() + require("./blogPage.css").toString()
  }
  pug() {
    return require("./blogPage.pug").default
  }

}

declareComponent("blog-page", BlogPage)