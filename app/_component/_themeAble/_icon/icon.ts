import ThemeAble from "../themeAble";


export default abstract class Icon extends ThemeAble {
  constructor(strength?: "weak" | "strong" | null) {
    super(false)
    if (strength === undefined) strength = "strong"
    if (strength !== null) this.addClass(strength)
  }
  stl() {
    return require("./icon.css").toString()
  }
}

export const iconIndex = {
  // TODO: landing section
  navigation: {
    tagesschule: () => import("../_icon/_highlightAbleIcon/navigationIcon/tagesschule/tagesschule"),
    versuchsanstalt: () => import("../_icon/_highlightAbleIcon/navigationIcon/versuchsanstalt/versuchsanstalt"),
    erwachsenenbildung: () => import("../_icon/_highlightAbleIcon/navigationIcon/erwachsenenschule/erwachsenenschule"),
    news: () => import("../_icon/_highlightAbleIcon/navigationIcon/news/news"),
    kontakt: () => import("../_icon/_highlightAbleIcon/navigationIcon/kontakt/kontakt"),
    info: () => import("../_icon/_highlightAbleIcon/navigationIcon/info/info"),
    highlights: () => import("../_icon/_highlightAbleIcon/navigationIcon/highlights/highlights"),
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
    // logistik: () => import("./fachIcon/deliveryCar/deliveryCar"),
    laboratoriumWi: () => import("./fachIcon/electricGear/electricGear"),
    betriebstechnik: () => import("./fachIcon/flag/flag"),
    informatik: () => import("./fachIcon/smartCode/smartCode"),

    // HIT
    softwareentwicklung: () => import("./fachIcon/terminal/terminal"),
    informationstechnischeProjekte: () => import("./fachIcon/workflow/workflow"),
    netzwerktechnik: () => import("./fachIcon/graphNetwork/graphNetwork"),
    informationssysteme: () => import("./fachIcon/cloudDataBase/cloudDataBase"),

    // KT
    laboratoriumKt: () => import("./fachIcon/microscope/microscope"),
    konstruktionProduktentwicklung: () => import("./fachIcon/pen/pen"),
    technischeMechanikKt: () => import("./fachIcon/chain/chain"),
    kunststoffverarbeitung: () => import("./fachIcon/filter/filter"),
    fertigungstechnik: () => import("./fachIcon/layers/layers"),
    umwelttechnik: () => import("./fachIcon/environment/environment"),

    // MB
    konstruktionProjManagement: () => import("./fachIcon/workflow/workflow"),
    techMech: () => import("./fachIcon/calculator/calculator"),
    // fertigungstechnik: () => import("./fachIcon/chain/chain"),
    maschinenAnlagen: () => import("./fachIcon/factory/factory"),
    // automatisierungstechnik: () => import("./fachIcon/layers/layers")



    // Abendschule
    requirement: () => import("./fachIcon/attached/attached"),
    register: () => import("./fachIcon/addUser/addUser"),
    registration: () => import("./fachIcon/moveUp/moveUp"),
    graduate: () => import("./fachIcon/star/star")

  },
  vertiefung: {
    // HET
    automatisierung: () => import("./vertiefung/automationGear/automationGear"),
    erneuerbareEnergien: () => import("./vertiefung/windMill/windMill"),

    // HWI
    maschinenbau: () => import("./vertiefung/maschinenbau/maschinenbau"),
    logistik: () => import("./vertiefung/logistik/logistik"),
    betriebsinformatik: () => import("./vertiefung/betriebsinformatik/betriebsinformatik"),

    // HIT
    medientechnik: () => import("./vertiefung/mediaCode/mediaCode"),
    systemtechnik: () => import("./vertiefung/cloudNetwork/cloudNetwork"),

    // HBG
    fahrzeugtechnik: () => import("./vertiefung/fastCar/fastCar"),
    industrieDesign : () => import("./vertiefung/industry/industry"),
    robotik : () => import("./vertiefung/industrialRobot/industrialRobot"),

    // Abend
    electronics: () => import("./vertiefung/elektronics/elektronics"),
    wirtschaftsingenieure: () => import("./vertiefung/ideaMechanics/ideaMechanics"),
    // erneuerbareEnergien: () => import("./vertiefung/windMill/windMill"),
    // maschinenbau: () => import("./vertiefung/maschinenbau/maschinenbau"),
    mechatronics: () => import("./vertiefung/drone/drone")
  },
  abendschule: {
    bigStonks: () => import("./abendschule/bigStonks/bigStonks"),
    smallStonks: () => import("./abendschule/smallStonks/smallStonks"),
    kolleg: () => import("./abendschule/kolleg/kolleg"),
    tools: () => import("./tools/tools"),
  }
}