import ThemeAble from "../themeAble";


export default abstract class Icon extends ThemeAble {
  constructor(strength: "weak" | "strong" = "strong") {
    super(false)
    this.addClass(strength)

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
  },
  
  tagesschule: {
    anmelden: () => import("../_icon/tagesschuleIcons/anmelden/anmelden"),
    sprechstunden: () => import("../_icon/tagesschuleIcons/sprechstunden/sprechstunden"),
    projekte: () => import("./tagesschuleIcons/project/project"),
    team: () => import("../_icon/tagesschuleIcons/team/team"),
  },
  fach: {
    energysysteme: () => import("./fachIcon/sunElectricity/sunElectricity")
  }
}