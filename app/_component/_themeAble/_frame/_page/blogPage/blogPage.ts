import {declareComponent} from "../../../../../lib/declareComponent"
import Page from "../page"
import * as domain from "./../../../../../lib/domain"
import Blog from "../../../../_themeAble/_text/blogPost/blogPost"
import BlogSuggestions, {blogCardInfo} from "../../../blogSuggestions/blogSuggestions";
import GhostContentAPI, {PostOrPage} from '@tryghost/content-api'
import {lang} from "../../../../../lib/lang"
import {Data} from "josm";
import {api} from "../../../../../lib/api";


export default class BlogPage extends Page {


  constructor() {
    super("light")
  }

  private blogLoaded = false;

  private async setBlog(query: string) {
    if (this.blogLoaded) {
      this.elementBody.removeChilds()
    }

    let blogData: Required<PostOrPage> = {
      title: "My Title",
      published_at: new Date().toISOString(),
      feature_image: "https://picsum.photos/seed/picsum/500/300",
      html: `<h2>lel</h2><p>My Content</p><p>lelellelel ll el elle le le l</p>`,
    } as any


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
      } catch (e) {
        console.error("Unable to load recommended blogs")
      }

      let suggestions = new BlogSuggestions();
      const domainCommon = [...domain.domainIndex].rmI(domain.domainIndex.length - 1).join(domain.dirString) + domain.dirString
      suggestions.blogs(blogData.filter(blog => blog.slug != query).map((blog) => {
        return {
          heading: blog.title,
          date: blog.published_at,
          content: blog.excerpt,
          thumbnail: blog.feature_image,
          link: domainCommon + blog.slug
        } as blogCardInfo
      }));
      suggestions.css("order", 2);
      this.elementBody.append(suggestions)
    }

    this.blogLoaded = true;
  }

  private setBlogFromUrl(id: string) {
    this.domainLevel = this.domainFrag.length

    return this.setBlog(id)
  }

  private cache: { [slug in string]: PostOrPage } = {}
  private domainFrag: string
  private splitDomain: string[]

  async tryNavigationCallback(domainFragment: string) {

    this.splitDomain = domainFragment.split(domain.dirString)
    this.domainFrag = this.splitDomain.last
    if (this.cache[this.domainFrag]) return true
    let blogData: PostOrPage
    try {
      blogData = await api.posts.read({slug: this.domainFrag}, {formats: ['html', 'plaintext']})
    } catch (e) {
      return true
    }
    this.cache[this.domainFrag] = blogData
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