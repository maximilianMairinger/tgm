import { declareComponent } from "../../../../../../../lib/declareComponent"
import { scrollAnimationEnd, begin } from "../../../../_pageSection/newsContactSection/conf"
import LazySectionedPage from "../lazySectionedPage"
import { ImportanceMap, Import } from "../../../../../../../lib/lazyLoad"
import VersuchanstaltSection from "../../../../_pageSection/versuchsanstaltSection/versuchsanstaltSection"
import AbendschuleSection from "../../../../_pageSection/abendschuleSection/abendschuleSection"
import LandingSection from "../../../../_pageSection/landingSection/landingSection"
import NewsContactSection from "../../../../_pageSection/newsContactSection/newsContactSection"
import { ScrollProgressAlias, ScrollProgressAliasIndex, AliasList, SimpleAlias } from "../../sectionedPage"
import Footer from "../../../../_pageSection/footer/footer"

export default declareComponent("home-page", class Homepage extends LazySectionedPage {
  constructor(baseLink: string, sectionChangeCallback?: (section: string) => void) {

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
        key: new Import("erwachsenenbildung", 1, (_AbendschuleSection: typeof AbendschuleSection) =>
          new _AbendschuleSection()
        ), val: () => import(/* webpackChunkName: "AbendschuleSection" */"../../../../_pageSection/abendschuleSection/abendschuleSection")
      },
      {
        key: new Import("newsKontakt", 1, (_NewsContactSection: typeof NewsContactSection) =>
          new _NewsContactSection(this.scrollToSection)
        ), val: () => import(/* webpackChunkName: "newsContactSection" */"../../../../_pageSection/newsContactSection/newsContactSection")
      },
      {
        key: new Import("footer", 1, (_Footer: typeof Footer) =>
          new _Footer(baseLink + "kontakt/")
        ), val: () => import(/* webpackChunkName: "footer" */"../../../../_pageSection/footer/footer")
      }
    ), sectionChangeCallback, new AliasList(
      new ScrollProgressAliasIndex("newsKontakt", [
        new ScrollProgressAlias(begin, "news"),
        new ScrollProgressAlias(scrollAnimationEnd, "kontakt")
      ]),
      new ScrollProgressAliasIndex("erwachsenenbildung", [
        new ScrollProgressAlias(0, "erwachsenenbildung/abendschule"),
        new ScrollProgressAlias(400, "erwachsenenbildung/tagesschule")
      ])
    ), {
      footer: "kontakt"
    })
  }

  pug() {
    return ""
  }

}) 
