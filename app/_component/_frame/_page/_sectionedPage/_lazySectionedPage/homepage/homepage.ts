import { declareComponent } from "../../../../../../lib/declareComponent"
import LazySectionedPage from "../lazySectionedPage"
import { ImportanceMap, Import } from "../../../../../../lib/lazyLoad"
import VersuchanstaltSection from "../../../../_pageSection/versuchsanstaltSection/versuchsanstaltSection"
import AbendschuleSection from "../../../../_pageSection/abendschuleSection/abendschuleSection"
import LandingSection from "../../../../_pageSection/landingSection/landingSection"
import NewsContactSection from "../../../../_pageSection/newsContactSection/newsContactSection"
import { ScrollProgressAlias, ScrollProgressAliasIndex, AliasList, SimpleAlias } from "../../sectionedPage"


export default declareComponent("home-page", class Homepage extends LazySectionedPage {
  constructor(setPage: (domain: string) => void, sectionChangeCallback?: (section: string) => void, domainLevel = 1) {
    
    let newsToContactScrollProgressIndex = new ScrollProgressAliasIndex("newsKontakt", [
      new ScrollProgressAlias(0, "news"),
      new ScrollProgressAlias(700, "kontakt")
    ])

    super(new ImportanceMap<() => Promise<any>, any>(
      {
        key: new Import("tagesschule", 1, (landingSection: typeof LandingSection) =>
          new landingSection()
        ), val: () => import(/* webpackChunkName: "LandingSection" */"../../../../_pageSection/landingSection/landingSection")
      },
      {
        key: new Import("versuchsanstalt", 1, (_VersuchsanstaltSection: typeof VersuchanstaltSection) =>
          new _VersuchsanstaltSection()
        ), val: () => import(/* webpackChunkName: "VersuchsanstaltSection" */"../../../../_pageSection/versuchsanstaltSection/versuchsanstaltSection")
      },
      {
        key: new Import("abendschule", 1, (_AbendschuleSection: typeof AbendschuleSection) =>
          new _AbendschuleSection()
        ), val: () => import(/* webpackChunkName: "AbendschuleSection" */"../../../../_pageSection/abendschuleSection/abendschuleSection")
      },
      {
        key: new Import("newsKontakt", 1, (_NewsContactSection: typeof NewsContactSection) =>
          new _NewsContactSection()
        ), val: () => import(/* webpackChunkName: "newsContactSection" */"../../../../_pageSection/newsContactSection/newsContactSection")
      }
    ), domainLevel, setPage, sectionChangeCallback, new AliasList(
      newsToContactScrollProgressIndex
    ))
  }

  stl() {
    return super.stl() + require("./homepage.css").toString()
  }
  pug() {
    return require("./homepage.pug").default
  }

}) 
