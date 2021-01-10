import { declareComponent } from "../../../../../../lib/declareComponent"
import "../../../../_card/selectionCard/selectionCard"
import "../../../../_card/_infoCard/unterrichtSystemeCard/unterrichtSystemeCard"
import AusmachtSection from "../ausmachtSection";



export default declareComponent("ausmacht-section-rt", class extends AusmachtSection {

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


    constructor(baseLink: string) {
        super({
            heading: {
                heading: "Was uns ausmacht",
                subheading: "als Elektrotechnik"
            },
            selection: {
                heading: "Gegenstände",
                note: "Fachspezifische",
                selection: [
                    {
                        icon: "energysysteme", 
                        title: "Energiesysteme", 
                        content: "Energiegewinnung und -speicherung", 
                        link: baseLink + "energiesysteme"
                    },
                    {
                        icon: "automatisierungstechnik", 
                        title: "Automatisierungstechnik", 
                        content: "Automatisieren in elektrotechnischen Anwendungen", 
                        link: baseLink + "automatisierungstechnik"
                    },
                    {
                        icon: "antriebstechnik", 
                        title: "Antriebstechnik", 
                        content: "Bewegung und Elektrotechnik", 
                        link: baseLink + "antriebstechnik"
                    },
                    {
                        icon: "industrieelektronik", 
                        title: "Industrieelektronik", 
                        content: "Elektrotechnik in der Industrie", 
                        link: baseLink + "industrieelektronik"
                    },
                    {
                        icon: "angewandteInformatik", 
                        title: "Angewandte Informatik", 
                        content: "Entwickeln von computerbasierten Lösungen", 
                        link: baseLink + "angewandte-informatik"
                    }
                ],
                stundentafel: baseLink + "stundentafel-rt"
            },
            cards: [
                {
                    heading: "Lernbüro",
                    note: "Unterrichtssystem",
                    thumbnail: "/res/img/student_2.jpg",
                    href: baseLink + "lernbüro-elektrotechnik",
                    contenttitle: "Lernen im Aufbruch",
                    content: "Das Lernbüro ermöglicht den SchülerInnen ihren Stundenplan selbst zu organisieren. Dabei lernen sie Eigenverantwortung und Teamarbeit."
                },
                {
                    heading: "Werkstatt",
                    note: "PRAXISUNTERRICHT",
                    thumbnail: "/res/img/werkstaetteHET.png",
                    href: baseLink + "werkstätte-elektrotechnik",
                    contenttitle: "Praxisbasierte Erfahrungen",
                    content: "In unseren Werkstätten erlernen SchülerInnen den Umgang mit technischen Gerätschaften und setzen das gelernte Theoriewissen selbst um."
                }
            ],
            vertiefung: {
                text: {
                    note: "die",
                    heading: "Vertiefungen",
                    subheading: "der Elektrotechnik",
                    hsize: {max:60, min:40},
                    content: "Die Abteilung Elektrotechnik bietet einen besonders umfassende technische Ausbildung. Grundsätzlich beschäftigt sie sich mit allen Bereichen"
                },
                cards: [
                    {
                        heading:"Automatisierung",
                        icon:"automatisierung",
                        link: baseLink + "automatisierung",
                        content:"Das reibungslose Zusammenspiel aller Einrichtungen in einer Fabrik, der U-Bahnbetrieb, der immer vorhandene Strom in unseren Steckdosen – das alles ist ohne Automatisierungstechnik unmöglich."
                    },
                    {
                        heading:"Erneuerbare Energien",
                        icon:"erneuerbareEnergien",
                        link: baseLink + "erneuerbare-energien",
                        content:"Die Umwandlung von Strahlungsenergie der Sonne in elektrischen Strom (Photovoltaik) bzw. in Wärme (Solarthermie) oder der Aufbau von Windkraftanlagen – das sind nur einige der nachhaltigen Technologien aus dem Bereich der Erneuerbaren Energien."
                    }
                ]
                
            }
        })
    }
});
