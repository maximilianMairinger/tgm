import Manager from "../manager";
import {ImportanceMap, Import} from "../../../../lib/lazyLoad"
import HomePage from "../../_page/_sectionedPage/homepage/homePage";
import _404Page from "../../_page/404/404";
import MaxsSandbox from "../../_page/maxsSandbox/maxsSandbox";
import GeorgsSandbox from "../../_page/georgsSanbox/georgsSanbox";
import DanielsSandbox from "../../_page/danielsSandbox/danielsSandbox";
import ItPage from "../../_page/_sectionedPage/_lazySectionedPage/itPage/itPage";
import Homepage from "../../_page/_sectionedPage/_lazySectionedPage/homepage/homepage";
import { declareComponent } from "../../../../lib/declareComponent"

export type PageName = ""

export default declareComponent("page-manager", class PageManager extends Manager<PageName> {
  constructor() {
    super(new ImportanceMap<() => Promise<any>, any>(

      {
        key: new Import("", 10, (homePage: typeof HomePage) => 
          new homePage(this.element)
        ), val: () => import(/* webpackChunkName: "homePage" */"../../_page/_sectionedPage/homepage/homePage")
      },
      {
        key: new Import("404", 0, (__404Page: typeof _404Page) => 
          new __404Page(this.element)
        ), val: () => import(/* webpackChunkName: "404Page" */"../../_page/404/404")
      },
      {
        key: new Import("georgsSandbox", 0, (georgsSandbox: typeof GeorgsSandbox) => 
          new georgsSandbox()
        ), val: () => import(/* webpackChunkName: "georgsSandbox" */"../../_page/georgsSanbox/georgsSanbox")
      },
      {
        key: new Import("maxsSandbox", 0, (maxsSandbox: typeof MaxsSandbox) => 
          new maxsSandbox()
        ), val: () => import(/* webpackChunkName: "maxsSandbox" */"../../_page/maxsSandbox/maxsSandbox")
      },
      {
        key: new Import("test/123", 0, (maxsSandbox: typeof MaxsSandbox) => 
          new maxsSandbox()
        ), val: () => import(/* webpackChunkName: "maxsSandbox" */"../../_page/maxsSandbox/maxsSandbox")
      },
      {
        key: new Import("danielsSandbox", 0, (danielsSandbox: typeof DanielsSandbox) => 
          new danielsSandbox()
        ), val: () => import(/* webpackChunkName: "danielsSandbox" */"../../_page/danielsSandbox/danielsSandbox")
      },
      {
        key: new Import("tagesschule/it", 20, (itPage: typeof ItPage) => 
          new itPage(this.element, 2)
        ), val: () => import(/* webpackChunkName: "itPage" */"../../_page/_sectionedPage/_lazySectionedPage/itPage/itPage")
      },
      {
        key: new Import("homepage", 20, (homepage: typeof Homepage) =>
            new Homepage(this.element, 1)
        ), val: () => import(/* webpackChunkName: "homepage" */"../../_page/_sectionedPage/_lazySectionedPage/homepage/homepage")
      }
    ), 0)



  


  }


  stl() {
    return super.stl() + require("./pageManager.css").toString()
  }
  pug() {
    return ""
  }
})
 