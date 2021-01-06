import Manager from "../manager";
import {ImportanceMap, Import} from "../../../../../lib/lazyLoad"
import TestPage from "../../_page/_sectionedPage/testPage/testPage";
import _404Page from "../../_page/404/404";
import MaxsSandbox from "../../_page/maxsSandbox/maxsSandbox";
import GeorgsSandbox from "../../_page/georgsSanbox/georgsSanbox";
import DanielsSandbox from "../../_page/danielsSandbox/danielsSandbox";
import HomePage from "../../_page/_sectionedPage/_lazySectionedPage/homepage/homepage";
import { declareComponent } from "../../../../../lib/declareComponent"
import BlogPage from "../../_page/blogPage/blogPage"
import Schularzt from "../../_page/_sectionedPage/_lazySectionedPage/schularzt/schularzt";


import RtPage from "../../_page/_sectionedPage/_lazySectionedPage/rtPage/rtPage";
import RtProjekte from "../../_page/_sectionedPage/_lazySectionedPage/rtProjekte/rtProjekte";
import RtTeam from "../../_page/_sectionedPage/_lazySectionedPage/_teamPage/rtTeam/rtTeam";

import Et from "../../_page/_sectionedPage/_lazySectionedPage/etPage/etPage";
import EtTeam from "../../_page/_sectionedPage/_lazySectionedPage/_teamPage/etTeam/etTeam";
import EtProjekte from "../../_page/_sectionedPage/_lazySectionedPage/etProjekte/etProjekte";

import El from "../../_page/_sectionedPage/_lazySectionedPage/elPage/elPage";
import ElTeam from "../../_page/_sectionedPage/_lazySectionedPage/_teamPage/elTeam/elTeam";
import ElProjekte from "../../_page/_sectionedPage/_lazySectionedPage/elProjekte/elProjekte";

import Wi from "../../_page/_sectionedPage/_lazySectionedPage/wiPage/wiPage"
import WiProjekte from "../../_page/_sectionedPage/_lazySectionedPage/wiProjekte/wiProjekte";
import WiTeam from "../../_page/_sectionedPage/_lazySectionedPage/_teamPage/wiTeam/wiTeam"

import It from "../../_page/_sectionedPage/_lazySectionedPage/itPage/itPage"
import ItProjekte from "../../_page/_sectionedPage/_lazySectionedPage/itProjekte/itProjekte";
import ItTeam from "../../_page/_sectionedPage/_lazySectionedPage/_teamPage/itTeam/itTeam"

import Kt from "../../_page/_sectionedPage/_lazySectionedPage/ktPage/ktPage"
import KtProjekte from "../../_page/_sectionedPage/_lazySectionedPage/ktProjekte/ktProjekte";
import KtTeam from "../../_page/_sectionedPage/_lazySectionedPage/_teamPage/ktTeam/ktTeam"

import Mb from "../../_page/_sectionedPage/_lazySectionedPage/mbPage/mbPage"
import MbProjekte from "../../_page/_sectionedPage/_lazySectionedPage/mbProjekte/mbProjekte";
import MbTeam from "../../_page/_sectionedPage/_lazySectionedPage/_teamPage/mbTeam/mbTeam"

import Bg from "../../_page/_sectionedPage/_lazySectionedPage/bgPage/bgPage"
import BgProjekte from "../../_page/_sectionedPage/_lazySectionedPage/bgProjekte/bgProjekte";
import BgTeam from "../../_page/_sectionedPage/_lazySectionedPage/_teamPage/bgTeam/bgTeam"


export default declareComponent("page-manager", class PageManager extends Manager {
  constructor(pageChangeCallback?: (page: string, sectiones: string[], domainLevel: number) => void, sectionChangeCallback?: (section: string) => void, onScrollBarWidthChange?: (scrollBarWidth: number) => void, onUserScroll?: (scrollProgress: number, userInited: boolean) => void, onScroll?: (scrollProgress: number) => void) {

    super(new ImportanceMap<() => Promise<any>, any>(
      
      {
        key: new Import("", 10, (homepage: typeof HomePage) =>
            new homepage("", sectionChangeCallback)
        ), val: () => import(/* webpackChunkName: "homepage" */"../../_page/_sectionedPage/_lazySectionedPage/homepage/homepage")
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
        key: new Import("tagesschule/wirtschaftsingenieure", 22, (wi: typeof Wi) => 
          new wi("tagesschule/wirtschaftsingenieure/", sectionChangeCallback)
        ), val: () => import(/* webpackChunkName: "wi" */"../../_page/_sectionedPage/_lazySectionedPage/wiPage/wiPage")
      },
      {
        key: new Import("tagesschule/wirtschaftsingenieure/projekte", 30, (wiProjekte: typeof WiProjekte) =>
            new wiProjekte("tagesschule/wirtschaftsingenieure/projekte", sectionChangeCallback)
        ), val: () => import(/* webpackChunkName: "wiProjekte" */"../../_page/_sectionedPage/_lazySectionedPage/wiProjekte/wiProjekte")
      },
      {
        key: new Import("tagesschule/wirtschaftsingenieure/team", 30, (wiTeam: typeof WiTeam) =>
            new wiTeam("tagesschule/wirtschaftsingenieure/team", sectionChangeCallback)
        ), val: () => import(/* webpackChunkName: "wiTeam" */"../../_page/_sectionedPage/_lazySectionedPage/_teamPage/wiTeam/wiTeam")
      },
      {
        key: new Import("tagesschule/kunststofftechnik", 22, (kt: typeof Kt) => 
          new kt("tagesschule/kunststofftechnik/", sectionChangeCallback)
        ), val: () => import(/* webpackChunkName: "kt" */"../../_page/_sectionedPage/_lazySectionedPage/ktPage/ktPage")
      },
      {
        key: new Import("tagesschule/kunststofftechnik/projekte", 30, (ktProjekte: typeof KtProjekte) =>
            new ktProjekte("tagesschule/kunststofftechnik/projekte", sectionChangeCallback)
        ), val: () => import(/* webpackChunkName: "ktProjekte" */"../../_page/_sectionedPage/_lazySectionedPage/ktProjekte/ktProjekte")
      },
      {
        key: new Import("tagesschule/kunststofftechnik/team", 30, (ktTeam: typeof KtTeam) =>
            new ktTeam("tagesschule/kunststofftechnik/projekte", sectionChangeCallback)
        ), val: () => import(/* webpackChunkName: "ktTeam" */"../../_page/_sectionedPage/_lazySectionedPage/_teamPage/ktTeam/ktTeam")
      },
      {
        key: new Import("tagesschule/maschinenbau", 22, (kt: typeof Mb) => 
          new kt("tagesschule/maschinenbau/", sectionChangeCallback)
        ), val: () => import(/* webpackChunkName: "mb" */"../../_page/_sectionedPage/_lazySectionedPage/mbPage/mbPage")
      },
      {
        key: new Import("tagesschule/maschinenbau/projekte", 30, (ktProjekte: typeof MbProjekte) =>
            new ktProjekte("tagesschule/maschinenbau/projekte", sectionChangeCallback)
        ), val: () => import(/* webpackChunkName: "mbProjekte" */"../../_page/_sectionedPage/_lazySectionedPage/mbProjekte/mbProjekte")
      },
      {
        key: new Import("tagesschule/maschinenbau/team", 30, (ktTeam: typeof MbTeam) =>
            new ktTeam("tagesschule/maschinenbau/projekte", sectionChangeCallback)
        ), val: () => import(/* webpackChunkName: "mbTeam" */"../../_page/_sectionedPage/_lazySectionedPage/_teamPage/mbTeam/mbTeam")
      },
      {
        key: new Import("tagesschule/informationstechnologie", 22, (it: typeof It) => 
          new it("tagesschule/informationstechnologie/", sectionChangeCallback)
        ), val: () => import(/* webpackChunkName: "it" */"../../_page/_sectionedPage/_lazySectionedPage/itPage/itPage")
      },
      {
        key: new Import("tagesschule/informationstechnologie/projekte", 30, (itProjekte: typeof ItProjekte) =>
            new itProjekte("tagesschule/informationstechnologie/projekte", sectionChangeCallback)
        ), val: () => import(/* webpackChunkName: "itProjekte" */"../../_page/_sectionedPage/_lazySectionedPage/itProjekte/itProjekte")
      },
      {
        key: new Import("tagesschule/informationstechnologie/team", 30, (itTeam: typeof ItTeam) =>
            new itTeam("tagesschule/informationstechnologie/projekte", sectionChangeCallback)
        ), val: () => import(/* webpackChunkName: "itTeam" */"../../_page/_sectionedPage/_lazySectionedPage/_teamPage/itTeam/itTeam")
      },
      {
        key: new Import("tagesschule/elektrotechnik", 21, (et: typeof Et) => 
          new et("tagesschule/elektrotechnik/", sectionChangeCallback)
        ), val: () => import(/* webpackChunkName: "et" */"../../_page/_sectionedPage/_lazySectionedPage/etPage/etPage")
      },
      {
        key: new Import("tagesschule/elektrotechnik/projekte", 30, (etProj: typeof EtProjekte) =>
            new etProj("tagesschule/elektrotechnik/projekte", sectionChangeCallback)
        ), val: () => import(/* webpackChunkName: "etProjekte" */"../../_page/_sectionedPage/_lazySectionedPage/etProjekte/etProjekte")
      },
      {
        key: new Import("tagesschule/elektrotechnik/team", 30, (etTeam: typeof EtTeam) =>
            new etTeam("tagesschule/elektrotechnik/projekte", sectionChangeCallback)
        ), val: () => import(/* webpackChunkName: "etTeam" */"../../_page/_sectionedPage/_lazySectionedPage/_teamPage/etTeam/etTeam")
      },
      {
        key: new Import("tagesschule/biomedizin", 42, (el: typeof Bg) => 
          new el("tagesschule/biomedizin/", sectionChangeCallback)
        ), val: () => import(/* webpackChunkName: "bgPage" */"../../_page/_sectionedPage/_lazySectionedPage/bgPage/bgPage")
      },
      {
        key: new Import("tagesschule/biomedizin/projekte", 30, (elProj: typeof BgProjekte) =>
            new elProj("tagesschule/biomedizin/projekte", sectionChangeCallback)
        ), val: () => import(/* webpackChunkName: "bgProjekte" */"../../_page/_sectionedPage/_lazySectionedPage/bgProjekte/bgProjekte")
      },
      {
        key: new Import("tagesschule/biomedizin/team", 30, (elTeam: typeof BgTeam) =>
            new elTeam("tagesschule/biomedizin/projekte", sectionChangeCallback)
        ), val: () => import(/* webpackChunkName: "bgTeam" */"../../_page/_sectionedPage/_lazySectionedPage/_teamPage/bgTeam/bgTeam")
      },
      {
        key: new Import("tagesschule/elektronik", 42, (elektrotechnikPage: typeof El) => 
          new elektrotechnikPage("tagesschule/elektronik/", sectionChangeCallback)
        ), val: () => import(/* webpackChunkName: "el" */"../../_page/_sectionedPage/_lazySectionedPage/elPage/elPage")
      },
      {
        key: new Import("tagesschule/elektronik/projekte", 30, (elektrotechnikProjekte: typeof ElProjekte) =>
            new elektrotechnikProjekte("tagesschule/elektronik/projekte", sectionChangeCallback)
        ), val: () => import(/* webpackChunkName: "elProjekte" */"../../_page/_sectionedPage/_lazySectionedPage/elProjekte/elProjekte")
      },
      {
        key: new Import("tagesschule/elektronik/team", 30, (elektrotechnikTeam: typeof ElTeam) =>
            new elektrotechnikTeam("tagesschule/elektronik/projekte", sectionChangeCallback)
        ), val: () => import(/* webpackChunkName: "elTeam" */"../../_page/_sectionedPage/_lazySectionedPage/_teamPage/elTeam/elTeam")
      },
      {
        key: new Import("tagesschule/raumfahrt", 20, (raumfahrtPage: typeof RtPage) => 
          new raumfahrtPage("tagesschule/raumfahrt/", sectionChangeCallback)
        ), val: () => import(/* webpackChunkName: "rt" */"../../_page/_sectionedPage/_lazySectionedPage/rtPage/rtPage")
      },
      {
        key: new Import("tagesschule/raumfahrt/projekte", 30, (raumfahrtProjekte: typeof RtProjekte) =>
            new raumfahrtProjekte("tagesschule/raumfahrt/projekte", sectionChangeCallback)
        ), val: () => import(/* webpackChunkName: "rtProjekte" */"../../_page/_sectionedPage/_lazySectionedPage/rtProjekte/rtProjekte")
      },
      {
        key: new Import("tagesschule/raumfahrt/team", 30, (raumfahrtTeam: typeof RtTeam) =>
            new raumfahrtTeam("tagesschule/raumfahrt/projekte", sectionChangeCallback)
        ), val: () => import(/* webpackChunkName: "rtTeam" */"../../_page/_sectionedPage/_lazySectionedPage/_teamPage/rtTeam/rtTeam")
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
      {
        key: new Import("", 60, (__404Page: typeof _404Page) =>
          new __404Page()
        ), val: () => import(/* webpackChunkName: "404Page" */"../../_page/404/404")
      }
    ), 0, pageChangeCallback, true, onScrollBarWidthChange, onUserScroll, onScroll)
  }


  stl() {
    return super.stl() + require("./pageManager.css").toString()
  }
  pug() {
    return "";
  }
})
 