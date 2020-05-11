import Manager from "../manager";
import {ImportanceMap, Import} from "../../../../lib/lazyLoad"
import HomePage from "../../_page/_sectionedPage/homepage/homePage";
import _404Page from "../../_page/404/404";
import MaxsSandbox from "../../_page/maxsSandbox/maxsSandbox";
import GeorgsSandbox from "../../_page/georgsSanbox/georgsSanbox";
import DanielsSandbox from "../../_page/danielsSandbox/danielsSandbox";
import { declareComponent } from "../../../../lib/declareComponent"

export type PageName = ""

export default declareComponent("page-manager", class PageManager extends Manager<PageName> {
  constructor() {
    super(new ImportanceMap<() => Promise<any>, any>(

      {
        key: new Import("", 10, (_HomePage: typeof HomePage) => 
          new _HomePage(this.element)
        ), val: () => import(/* webpackChunkName: "homePage" */"../../_page/_sectionedPage/homepage/homePage")
      },
      {
        key: new Import("404", 0, (__404Page: typeof _404Page) => 
          new __404Page(this.element)
        ), val: () => import(/* webpackChunkName: "404Page" */"../../_page/404/404")
      },
      {
        key: new Import("georgsSandbox", 0, (_GeorgsSandbox: typeof GeorgsSandbox) => 
          new _GeorgsSandbox()
        ), val: () => import(/* webpackChunkName: "georgsSandbox" */"../../_page/georgsSanbox/georgsSanbox")
      },
      {
        key: new Import("maxsSandbox", 0, (_MaxsSandbox: typeof MaxsSandbox) => 
          new _MaxsSandbox()
        ), val: () => import(/* webpackChunkName: "maxsSandbox" */"../../_page/maxsSandbox/maxsSandbox")
      },
      {
        key: new Import("test/123", 0, (_MaxsSandbox: typeof MaxsSandbox) => 
          new _MaxsSandbox()
        ), val: () => import(/* webpackChunkName: "maxsSandbox" */"../../_page/maxsSandbox/maxsSandbox")
      },
      {
        key: new Import("danielsSandbox", 0, (_DanielsSandbox: typeof DanielsSandbox) => 
          new _DanielsSandbox()
        ), val: () => import(/* webpackChunkName: "danielsSandbox" */"../../_page/danielsSandbox/danielsSandbox")
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
 