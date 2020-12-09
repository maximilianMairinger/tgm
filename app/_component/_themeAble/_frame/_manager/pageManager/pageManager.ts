import Manager from "../manager";
import {ImportanceMap, Import} from "../../../../../lib/lazyLoad"
import TestPage from "../../_page/_sectionedPage/testPage/testPage";
import _404Page from "../../_page/404/404";
import MaxsSandbox from "../../_page/maxsSandbox/maxsSandbox";
import GeorgsSandbox from "../../_page/georgsSanbox/georgsSanbox";
import DanielsSandbox from "../../_page/danielsSandbox/danielsSandbox";
import ItPage from "../../_page/_sectionedPage/_lazySectionedPage/itPage/itPage";
import HomePage from "../../_page/_sectionedPage/_lazySectionedPage/homepage/homepage";
import { declareComponent } from "../../../../../lib/declareComponent"
import RaumfahrtPage from "../../_page/_sectionedPage/_lazySectionedPage/raumfahrtPage/raumfahrtPage";
import RaumfahrtProjekte from "../../_page/_sectionedPage/_lazySectionedPage/raumfahrtProjekte/raumfahrtProjekte";
import RaumfahrtTeam from "../../_page/_sectionedPage/_lazySectionedPage/raumfahrtTeam/raumfahrtTeam";
import Schularzt from "../../_page/_sectionedPage/_lazySectionedPage/schularzt/schularzt";
import BlogPage from "../../_page/blogPage/blogPage"

export type PageName = string

export default declareComponent("page-manager", class PageManager extends Manager<PageName> {
  constructor(pageChangeCallback?: (page: string, sectiones: string[], domainLevel: number) => void, sectionChangeCallback?: (section: string) => void, onScrollBarWidthChange?: (scrollBarWidth: number) => void, onUserScroll?: (scrollProgress: number, userInited: boolean) => void, onScroll?: (scrollProgress: number) => void) {

    super(new ImportanceMap<() => Promise<any>, any>(
      
      {
        key: new Import("", 22, (homepage: typeof HomePage) =>
            new homepage(sectionChangeCallback)
        ), val: () => import(/* webpackChunkName: "homepage" */"../../_page/_sectionedPage/_lazySectionedPage/homepage/homepage")
      },
      {
        key: new Import("404", 1, (__404Page: typeof _404Page) =>
          new __404Page()
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
        key: new Import("danielsSandbox", 0, (danielsSandbox: typeof DanielsSandbox) => 
          new danielsSandbox()
        ), val: () => import(/* webpackChunkName: "danielsSandbox" */"../../_page/danielsSandbox/danielsSandbox")
      },
      {
        key: new Import("tagesschule/elektrotechnik", 20, (raumfahrtPage: typeof RaumfahrtPage) => 
          new raumfahrtPage(sectionChangeCallback)
        ), val: () => import(/* webpackChunkName: "raumfahrt" */"../../_page/_sectionedPage/_lazySectionedPage/raumfahrtPage/raumfahrtPage")
      },
      {
        key: new Import("tagesschule/raumfahrt", 20, (raumfahrtPage: typeof RaumfahrtPage) => 
          new raumfahrtPage(sectionChangeCallback)
        ), val: () => import(/* webpackChunkName: "raumfahrt" */"../../_page/_sectionedPage/_lazySectionedPage/raumfahrtPage/raumfahrtPage")
      },
      {
        key: new Import("tagesschule/raumfahrt/projekte", 20, (raumfahrtProjekte: typeof RaumfahrtProjekte) =>
            new raumfahrtProjekte(sectionChangeCallback)
        ), val: () => import(/* webpackChunkName: "raumfahrtProjekte" */"../../_page/_sectionedPage/_lazySectionedPage/raumfahrtProjekte/raumfahrtProjekte")
      },
      {
        key: new Import("tagesschule/raumfahrt/team", 20, (raumfahrtTeam: typeof RaumfahrtTeam) =>
            new raumfahrtTeam(sectionChangeCallback)
        ), val: () => import(/* webpackChunkName: "raumfahrtTeam" */"../../_page/_sectionedPage/_lazySectionedPage/raumfahrtTeam/raumfahrtTeam")
      },
      {
        key: new Import("schularzt", 20, (raumfahrtTeam: typeof Schularzt) =>
            new raumfahrtTeam(sectionChangeCallback)
        ), val: () => import(/* webpackChunkName: "raumfahrtTeam" */"../../_page/_sectionedPage/_lazySectionedPage/schularzt/schularzt")
      },
      {
        key: new Import("", 20, (blogPage: typeof BlogPage) =>
            new blogPage()
        ), val: () => import(/* webpackChunkName: "blogPage" */"../../_page/blogPage/blogPage")
      },
    ), 0, pageChangeCallback, "404", true, onScrollBarWidthChange, onUserScroll, onScroll)
  }


  stl() {
    return super.stl() + require("./pageManager.css").toString()
  }
  pug() {
    return "";
  }
})
 