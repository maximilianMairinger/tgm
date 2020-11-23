import ThemeAble from "../themeAble";


export default abstract class Icon extends ThemeAble {
  constructor() {
    super(false)

  }
  stl() {
    return super.stl() + require("./icon.css").toString()
  }
}

export const iconIndex = {
  // TODO: landing section
  navigation: {
    tagesschule: () => import("../_icon/_highlightAbleIcon/navigationIcon/tagesschule/tagesschule"),
    versuchsanstalt: () => import("../_icon/_highlightAbleIcon/navigationIcon/versuchsanstalt/versuchsanstalt"),
    abendschule: () => import("../_icon/_highlightAbleIcon/navigationIcon/abendschule/abendschule"),
    news: () => import("../_icon/_highlightAbleIcon/navigationIcon/news/news"),
    kontakt: () => import("../_icon/_highlightAbleIcon/navigationIcon/kontakt/kontakt"),
    info: () => import("../_icon/_highlightAbleIcon/navigationIcon/info/info"),
    highlights: () => import("../_icon/_highlightAbleIcon/navigationIcon/highlights/highlights"),
  },
  
  tagesschule: {
    anmelden: () => import("../_icon/_highlightAbleIcon/tagesschuleIcons/anmelden/anmelden"),
    sprechstunden: () => import("../_icon/_highlightAbleIcon/tagesschuleIcons/sprechstunden/sprechstunden"),
    projekte: () => import("./_highlightAbleIcon/tagesschuleIcons/project/project"),
    team: () => import("../_icon/_highlightAbleIcon/tagesschuleIcons/team/team"),
  }
}