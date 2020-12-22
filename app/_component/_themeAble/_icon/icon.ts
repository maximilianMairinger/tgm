import ThemeAble from "../themeAble";


export default abstract class Icon extends ThemeAble {
  constructor(strength?: "weak" | "strong" | null) {
    super(false)
    if (strength === undefined) strength = "strong"
    if (strength !== null) this.addClass(strength)
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
    // HET
    energysysteme: () => import("./fachIcon/sunElectricity/sunElectricity"),
    automatisierungstechnik: () => import("./fachIcon/sprintGear/sprintGear"),
    antriebstechnik: () => import("./fachIcon/electricCar/electricCar"),
    industrieelektronik: () => import("./fachIcon/powerPlant/powerPlant"),
    angewandteInformatik: () => import("./fachIcon/pcsConnected/pcsConnected"),

    // Biomed
    biologie: () => import("./fachIcon/biology/biology"),
    signalverarbeitung: () => import("./fachIcon/heartBeat/heartBeat"),
    gerätetechnik: () => import("./fachIcon/microscope/microscope"),
    gesundheitsmechatronik: () => import("./fachIcon/prosthesis/prosthesis"),
    gesundheitsinformatik: () => import("./fachIcon/heartSmartWatch/heartSmartWatch"),

    // HEL
    hardwareentwicklung: () => import("./fachIcon/nfcChip/nfcChip"),
    messtechnik: () => import("./fachIcon/motionSensor/motionSensor"),
    computersysteme: () => import("./fachIcon/shortWaves/shortWaves"),
    kommunikationssysteme: () => import("./fachIcon/graphNetwork/graphNetwork"),
    softwaretechnik: () => import("./fachIcon/terminal/terminal"),

    // HWI
    unternehmensführung: () => import("./fachIcon/law/law"),
    logistik: () => import("./fachIcon/deliveryCar/deliveryCar"),
    // automatisierungstechnik: () => import("./fachIcon/sprintGear/sprintGear"), // same as in het 
    betriebstechnik: () => import("./fachIcon/flag/flag"),
    informatik: () => import("./fachIcon/smartCode/smartCode"),
  },
  vertiefung: {
    // HET
    automatisierung: () => import("./vertiefung/automationGear/automationGear"),
    erneuerbareEnergien: () => import("./vertiefung/windMills/windMills"),

    // WI
    maschinenbau: () => import("./vertiefung/maschinenbau/maschinenbau"),
    logistik: () => import("./vertiefung/logistik/logistik"),
    betriebsinformatik: () => import("./vertiefung/betriebsinformatik/betriebsinformatik"),

  }
}