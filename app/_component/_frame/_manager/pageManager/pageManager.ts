import Manager from "../manager";
import {ImportanceMap, Import} from "../../../../lib/lazyLoad"
import HomePage from "../../_page/homepage/homePage";

import { declareComponent } from "../../../../lib/declareComponent"

export type PageName = ""

export default declareComponent("page-manager", class PageManager extends Manager<PageName> {
  constructor() {
    super(new ImportanceMap<() => Promise<any>, any>(

      {
        key: new Import("", 0, (_HomePage: typeof HomePage) => 
          new _HomePage(this.element)
        ), val: () => import(/* webpackChunkName: "homePage" */"../../_page/homepage/homePage")
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
 