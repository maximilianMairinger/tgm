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
import ElektrotechnikPage from "../../_page/_sectionedPage/_lazySectionedPage/elektrotechnikPage/elektrotechnikPage";
import RaumfahrtProjekte from "../../_page/_sectionedPage/_lazySectionedPage/raumfahrtProjekte/raumfahrtProjekte";
import RaumfahrtTeam from "../../_page/_sectionedPage/_lazySectionedPage/_teamPage/raumfahrtTeam/raumfahrtTeam";
import Schularzt from "../../_page/_sectionedPage/_lazySectionedPage/schularzt/schularzt";
import BlogPage from "../../_page/blogPage/blogPage"
import ElektrotechnikTeam from "../../_page/_sectionedPage/_lazySectionedPage/_teamPage/elektrotechnikTeam/elektrotechnikTeam";
import ElektrotechnikProjekte from "../../_page/_sectionedPage/_lazySectionedPage/elektrotechnikProjekte/elektrotechnikProjekte";
import WiProjekte from "../../_page/_sectionedPage/_lazySectionedPage/wirtschaftsingenieureProjekte/wirtschaftsingenieureProjekte";
import WiTeam from "../../_page/_sectionedPage/_lazySectionedPage/_teamPage/wiTeam/wiTeam"

export type PageName = string

export default declareComponent("page-manager", class PageManager extends Manager<PageName> {
  constructor(pageChangeCallback?: (page: string, sectiones: string[], domainLevel: number) => void, sectionChangeCallback?: (section: string) => void, onScrollBarWidthChange?: (scrollBarWidth: number) => void, onUserScroll?: (scrollProgress: number, userInited: boolean) => void, onScroll?: (scrollProgress: number) => void) {

    super(new ImportanceMap<() => Promise<any>, any>(
      
      {
        key: new Import("", 10, (homepage: typeof HomePage) =>
            new homepage(sectionChangeCallback)
        ), val: () => import(/* webpackChunkName: "homepage" */"../../_page/_sectionedPage/_lazySectionedPage/homepage/homepage")
      },
      {
        key: new Import("404", 60, (__404Page: typeof _404Page) =>
          new __404Page()
        ), val: () => import(/* webpackChunkName: "404Page" */"../../_page/404/404")
      },
      {
        key: new Import("georgsSandbox", 50, (georgsSandbox: typeof GeorgsSandbox) => 
          new georgsSandbox()
        ), val: () => import(/* webpackChunkName: "georgsSandbox" */"../../_page/georgsSanbox/georgsSanbox")
      },
      // {
      //   key: new Import("maxsSandbox", 0, (maxsSandbox: typeof MaxsSandbox) => 
      //     new maxsSandbox()
      //   ), val: () => import(/* webpackChunkName: "maxsSandbox" */"../../_page/maxsSandbox/maxsSandbox")
      // },
      // {
      //   key: new Import("danielsSandbox", 0, (danielsSandbox: typeof DanielsSandbox) => 
      //     new danielsSandbox()
      //   ), val: () => import(/* webpackChunkName: "danielsSandbox" */"../../_page/danielsSandbox/danielsSandbox")
      // },
      {
        key: new Import("tagesschule/wirtschaftsingenieure", 22, (elektrotechnikPage: typeof ElektrotechnikPage) => 
          new elektrotechnikPage(sectionChangeCallback)
        ), val: () => import(/* webpackChunkName: "elektrotechnik" */"../../_page/_sectionedPage/_lazySectionedPage/wiPage/wiPage")
      },
      {
        key: new Import("tagesschule/wirtschaftsingenieure/projekte", 30, (wiProjekte: typeof WiProjekte) =>
            new wiProjekte(sectionChangeCallback)
        ), val: () => import(/* webpackChunkName: "wiProjekte" */"../../_page/_sectionedPage/_lazySectionedPage/wirtschaftsingenieureProjekte/wirtschaftsingenieureProjekte")
      },
      {
        key: new Import("tagesschule/wirtschaftsingenieure/team", 30, (wiTeam: typeof WiTeam) =>
            new wiTeam(sectionChangeCallback)
        ), val: () => import(/* webpackChunkName: "wiTeam" */"../../_page/_sectionedPage/_lazySectionedPage/_teamPage/wiTeam/wiTeam")
      },
      {
        key: new Import("tagesschule/elektrotechnik", 21, (elektrotechnikPage: typeof ElektrotechnikPage) => 
          new elektrotechnikPage(sectionChangeCallback)
        ), val: () => import(/* webpackChunkName: "elektrotechnik" */"../../_page/_sectionedPage/_lazySectionedPage/elektrotechnikPage/elektrotechnikPage")
      },
      {
        key: new Import("tagesschule/elektrotechnik/projekte", 30, (elektrotechnikProjekte: typeof ElektrotechnikProjekte) =>
            new elektrotechnikProjekte(sectionChangeCallback)
        ), val: () => import(/* webpackChunkName: "elektrotechnikProjekte" */"../../_page/_sectionedPage/_lazySectionedPage/elektrotechnikProjekte/elektrotechnikProjekte")
      },
      {
        key: new Import("tagesschule/elektrotechnik/team", 30, (elektrotechnikTeam: typeof ElektrotechnikTeam) =>
            new elektrotechnikTeam(sectionChangeCallback)
        ), val: () => import(/* webpackChunkName: "elektrotechnikTeam" */"../../_page/_sectionedPage/_lazySectionedPage/_teamPage/elektrotechnikTeam/elektrotechnikTeam")
      },
      {
        key: new Import("tagesschule/biomedizin", 42, (elektrotechnikPage: typeof ElektrotechnikPage) => 
          new elektrotechnikPage(sectionChangeCallback)
        ), val: () => import(/* webpackChunkName: "biomedPage" */"../../_page/_sectionedPage/_lazySectionedPage/biomedPage/biomedPage")
      },
      {
        key: new Import("tagesschule/biomedizin/projekte", 30, (elektrotechnikProjekte: typeof ElektrotechnikProjekte) =>
            new elektrotechnikProjekte(sectionChangeCallback)
        ), val: () => import(/* webpackChunkName: "biomedProjekte" */"../../_page/_sectionedPage/_lazySectionedPage/biomedProjekte/biomedProjekte")
      },
      {
        key: new Import("tagesschule/biomedizin/team", 30, (elektrotechnikTeam: typeof ElektrotechnikTeam) =>
            new elektrotechnikTeam(sectionChangeCallback)
        ), val: () => import(/* webpackChunkName: "biomedizin" */"../../_page/_sectionedPage/_lazySectionedPage/_teamPage/biomedTeam/biomedTeam")
      },
      {
        key: new Import("tagesschule/elektronik", 42, (elektrotechnikPage: typeof ElektrotechnikPage) => 
          new elektrotechnikPage(sectionChangeCallback)
        ), val: () => import(/* webpackChunkName: "elektronik" */"../../_page/_sectionedPage/_lazySectionedPage/elektronikPage/elektronikPage")
      },
      {
        key: new Import("tagesschule/elektronik/projekte", 30, (elektrotechnikProjekte: typeof ElektrotechnikProjekte) =>
            new elektrotechnikProjekte(sectionChangeCallback)
        ), val: () => import(/* webpackChunkName: "elektronikProjekte" */"../../_page/_sectionedPage/_lazySectionedPage/elektronikProjekte/elektronikProjekte")
      },
      {
        key: new Import("tagesschule/elektronik/team", 30, (elektrotechnikTeam: typeof ElektrotechnikTeam) =>
            new elektrotechnikTeam(sectionChangeCallback)
        ), val: () => import(/* webpackChunkName: "elektronikTeam" */"../../_page/_sectionedPage/_lazySectionedPage/_teamPage/elektronikTeam/elektronikTeam")
      },
      {
        key: new Import("tagesschule/raumfahrt", 20, (raumfahrtPage: typeof RaumfahrtPage) => 
          new raumfahrtPage(sectionChangeCallback)
        ), val: () => import(/* webpackChunkName: "raumfahrt" */"../../_page/_sectionedPage/_lazySectionedPage/raumfahrtPage/raumfahrtPage")
      },
      {
        key: new Import("tagesschule/raumfahrt/projekte", 30, (raumfahrtProjekte: typeof RaumfahrtProjekte) =>
            new raumfahrtProjekte(sectionChangeCallback)
        ), val: () => import(/* webpackChunkName: "raumfahrtProjekte" */"../../_page/_sectionedPage/_lazySectionedPage/raumfahrtProjekte/raumfahrtProjekte")
      },
      {
        key: new Import("tagesschule/raumfahrt/team", 30, (raumfahrtTeam: typeof RaumfahrtTeam) =>
            new raumfahrtTeam(sectionChangeCallback)
        ), val: () => import(/* webpackChunkName: "raumfahrtTeam" */"../../_page/_sectionedPage/_lazySectionedPage/_teamPage/raumfahrtTeam/raumfahrtTeam")
      },
      // {
      //   key: new Import("schularzt", 30, (raumfahrtTeam: typeof Schularzt) =>
      //       new raumfahrtTeam(sectionChangeCallback)
      //   ), val: () => import(/* webpackChunkName: "schularzt" */"../../_page/_sectionedPage/_lazySectionedPage/schularzt/schularzt")
      // },
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
 