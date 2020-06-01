import Manager from "../manager";
import {ImportanceMap, Import} from "../../../../lib/lazyLoad"
import TestPage from "../../_page/_sectionedPage/testPage/testPage";
import _404Page from "../../_page/404/404";
import MaxsSandbox from "../../_page/maxsSandbox/maxsSandbox";
import GeorgsSandbox from "../../_page/georgsSanbox/georgsSanbox";
import DanielsSandbox from "../../_page/danielsSandbox/danielsSandbox";
import ItPage from "../../_page/_sectionedPage/_lazySectionedPage/itPage/itPage";
import HomePage from "../../_page/_sectionedPage/_lazySectionedPage/homepage/homepage";
import { declareComponent } from "../../../../lib/declareComponent"

export type PageName = string

export default declareComponent("page-manager", class PageManager extends Manager<PageName> {
  constructor(pageChangeCallback?: (page: string, sectiones: string[], domainLevel: number) => void, sectionChangeCallback?: (section: string) => void, onScrollBarWidthChange?: (scrollBarWidth: number) => void, onScroll?: (scrollProgress: number) => void) {
    let setPage = (a: PageName | null) => {
      this.element(a)
    }

    super(new ImportanceMap<() => Promise<any>, any>(
      {
        key: new Import("homepage", 20, (homepage: typeof HomePage) =>
            new homepage(setPage, sectionChangeCallback, 1)
        ), val: () => import(/* webpackChunkName: "homepage" */"../../_page/_sectionedPage/_lazySectionedPage/homepage/homepage")
      },
      {
        key: new Import("", 20, (homepage: typeof HomePage) =>
            new homepage(setPage, sectionChangeCallback, 0)
        ), val: () => import(/* webpackChunkName: "homepage" */"../../_page/_sectionedPage/_lazySectionedPage/homepage/homepage")
      },
      {
        key: new Import("test", 10, (testPage: typeof TestPage) => 
          new testPage(setPage, sectionChangeCallback, 1)
        ), val: () => import(/* webpackChunkName: "testPage" */"../../_page/_sectionedPage/testPage/testPage")
      },
      {
        key: new Import("404", 0, (__404Page: typeof _404Page) => 
          new __404Page(setPage)
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
        key: new Import("tagesschule/it", 20, (itPage: typeof ItPage) => 
          new itPage(setPage, 2, sectionChangeCallback)
        ), val: () => import(/* webpackChunkName: "itPage" */"../../_page/_sectionedPage/_lazySectionedPage/itPage/itPage")
      },
      {
        key: new Import("tagesschule/elektrotechnik", 20, (itPage: typeof ItPage) => 
          new itPage(setPage, 2, sectionChangeCallback)
        ), val: () => import(/* webpackChunkName: "itPage" */"../../_page/_sectionedPage/_lazySectionedPage/itPage/itPage")
      },
      {
        key: new Import("abendschule/elektrotechnik", 20, (itPage: typeof ItPage) => 
          new itPage(setPage, 2, sectionChangeCallback)
        ), val: () => import(/* webpackChunkName: "itPage" */"../../_page/_sectionedPage/_lazySectionedPage/itPage/itPage")
      }
      
    ), 0, pageChangeCallback, "404", true, onScrollBarWidthChange, onScroll)



  


  }


  stl() {
    return super.stl() + require("./pageManager.css").toString()
  }
  pug() {
    return ""
  }
})
 