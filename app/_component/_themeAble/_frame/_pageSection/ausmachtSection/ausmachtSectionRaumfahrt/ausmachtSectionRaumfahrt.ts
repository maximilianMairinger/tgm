import { declareComponent } from "../../../../../../lib/declareComponent"
import "../../../../_card/selectionCard/selectionCard"
import "../../../../_card/_infoCard/unterrichtSystemeCard/unterrichtSystemeCard"
import AusmachtSection from "../ausmachtSection";



export default declareComponent("ausmacht-section-raumfahrt", class extends AusmachtSection {

    // c-selection-card( note='Fachspezifische' heading='Vertiefungen' background='none'
    //         selection='[' +
    //         '{"icon":"satellite", "title":"Satellitentechnik", "content":"Satellitendesign und Konstruktion", "link":"/"},' +
    //         '{"icon":"rocket", "title":"Raketentechnik", "content":"Raketenentwicklung, Abschussvorbereitung", "link":"/"},' +
    //         '{"icon":"rover", "title":"Raumfahrtrobotik", "content":"Weltraumfähige Roboter mit autonomen Anwendungen", "link":"/"},' +
    //         '{"icon":"rover", "title":"Raumfahrtrobotik", "content":"Weltraumfähige Roboter mit autonomen Anwendungen", "link":"/"},' +
    //         '{"icon":"space-aids", "title":"Raumfahrtbiologie", "content":"Biologische Untersuchungen in der Schwerelosigkeit", "link":"/"}' +
    //         ']')
    //     c-unterricht-systeme-card(heading="Labor" headingBackground="#98AAB6" note="Unterrichtssystem"  thumbnail='/res/img/unterrichtSysteme_1.jpg' href="/" contenttitle="Im Aufbruch" content='Das Labor ermöglicht den SchülerInnen, ihren Stundenplan selbst zu organisieren. Dabei lernen sie Eigenverantwortung und Teamarbeit.')
    //     c-unterricht-systeme-card(heading="Werkstätte" headingBackground="#C1DBCB" note="Unsere"  thumbnail='/res/img/werk.jpg' href="/" contenttitle="Werkstätte" content='Unser Unterricht in der Werkstätte ermöglicht es den SchülerInnen auch im fachpraktischen Bereich Erfahrung zu sammeln.')


    constructor() {
        super({
            heading: {
                heading: "Was uns Ausmacht",
                subheading: "als Elektrotechnik"
            },
            selection: {
                heading: "Vertiefungen",
                note: "Fachspezifische",
                selection: [
                    {"icon":"energysysteme", "title":"Satellitentechnik", "content":"Satellitendesign und Konstruktion", "link":"/"},
                    {"icon":"automatisierungstechnik", "title":"Raketentechnik", "content":"Raketenentwicklung, Abschussvorbereitung", "link":"/"},
                    {"icon":"antriebstechnik", "title":"Raumfahrtrobotik", "content":"Weltraumfähige Roboter mit autonomen Anwendungen", "link":"/"},
                    {"icon":"industrieelektronik", "title":"Raumfahrtrobotik", "content":"Weltraumfähige Roboter mit autonomen Anwendungen", "link":"/"},
                    {"icon":"angewandteInformatik", "title":"Raumfahrtbiologie", "content":"Biologische Untersuchungen in der Schwerelosigkeit", "link":"/"}
                ]
            },
            cards: [
                {
                    heading: "Labor",
                    note: "Unterrichtssystem",
                    thumbnail: "/res/img/unterrichtSysteme_1.jpg",
                    href: "/",
                    contentTitle: "Im Aufbruch",
                    content: "Das Labor ermöglicht den SchülerInnen, ihren Stundenplan selbst zu organisieren. Dabei lernen sie Eigenverantwortung und Teamarbeit."
                },
                {
                    heading: "Werkstätte",
                    note: "Unsere",
                    thumbnail: "/res/img/werk.jpg",
                    href: "/",
                    contentTitle: "Werkstätte",
                    content: "Unser Unterricht in der Werkstätte ermöglicht es den SchülerInnen auch im fachpraktischen Bereich Erfahrung zu sammeln."
                }
            ],
            vertiefung: {
                text: {
                    note: "die",
                    heading: "Vertiefungen",
                    subheading: "der Raumfahrt",
                    hsize: {max:60, min:40},
                    content: "Die Abteilung Raumfahrt bietet einen besonders umfassende technische Ausbildung. Grundsätzlich beschäftigt sie sich mit allen Bereichen"
                },
                cards: [
                    {
                        heading:"Erneuerbare Energien",
                        icon:"erneuerbareEnergien",
                        link:"",
                        content:"Die Umwandlung von Strahlungsenergie der Sonne in elektrischen Strom (Photovoltaik) bzw. in Wärme (Solarthermie) oder der Aufbau von Windkraftanlagen – das sind nur einige der nachhaltigen Technologien aus dem Bereich der Erneuerbaren Energien."
                    },
                    {
                        heading:"Erneuerbare Energien",
                        icon:"erneuerbareEnergien",
                        link:"",
                        content:"Die Umwandlung von Strahlungsenergie der Sonne in elektrischen Strom (Photovoltaik) bzw. in Wärme (Solarthermie) oder der Aufbau von Windkraftanlagen – das sind nur einige der nachhaltigen Technologien aus dem Bereich der Erneuerbaren Energien."
                    }
                ]
            }
        })
    }

    stl() {
        return super.stl() + require("./ausmachtSectionRaumfahrt.css").toString()
    }
    pug() {
        return super.pug() + require("./ausmachtSectionRaumfahrt.pug").default
    }
});
