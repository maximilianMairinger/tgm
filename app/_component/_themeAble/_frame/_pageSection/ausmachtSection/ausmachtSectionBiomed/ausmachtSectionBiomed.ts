import { declareComponent } from "../../../../../../lib/declareComponent"
import "../../../../_card/selectionCard/selectionCard"
import "../../../../_card/_infoCard/unterrichtSystemeCard/unterrichtSystemeCard"
import AusmachtSection from "../ausmachtSection";
import VertiefungsContainer from "../../../../vertiefungsContainer/vertiefungsContainer";
import {MediaQuerySize} from "../../../../_text/textblob/textblob";



export default declareComponent("ausmacht-section-biomed", class extends AusmachtSection {

    constructor() {
        super({
            heading: {
                heading: "Was uns ausmacht",
                subheading: "als Biomedizin"
            },
            selection: {
                heading: "Gegenstände",
                note: "Fachspezifische",
                selection: [
                    {"icon":"biologie", "title":"Biologie, Medizin & Gesundheitswesen", "content":"Ärzte unterrichten medizinisches Grundwissen", "link":"tagesschule/biomedizin/highlights/biologie-medizin-gesundheitswesen"},
                    {"icon":"signalverarbeitung", "title":"Biomedizinische Signalverarbeitung", "content":"Technische Geräte Prüfung von Vitalfunktionen", "link":"tagesschule/biomedizin/highlights/biomedizinische-signalverarbeitung"},
                    {"icon":"gerätetechnik", "title":"Medizinische Gerätetechnik", "content":"Technische Geräte verstehen und warten", "link":"tagesschule/biomedizin/highlights/medizinische-geraetetechnik"},
                    {"icon":"gesundheitsmechatronik", "title":"Gesundheitsmechatronik", "content":"Entwicklung von Prothesen", "link":"tagesschule/biomedizin/highlights/gesundheitsmechatronik"},
                    {"icon":"gesundheitsinformatik", "title":"Medizin & Gesundheitsinformatik", "content":"IT Anwendungen im biomedizinischen Kontext", "link":"tagesschule/biomedizin/highlights/medizin-gesundheitsinformatik"}
                ]
            },
            cards: [
                {
                    heading: "Zellkultur",
                    note: "praxisunterricht",
                    thumbnail: "/res/img/biomedPrototype.jpg",
                    href: "tagesschule/elektrotechnik/highlights/lernbüro-elektrotechnik",
                    contentTitle: "Zellkulturlabortechnik",
                    content: "Im praktischen Unterricht erlernen SchülerInnen den Umgang mit technischen Gerätschaften und aktuellen Tools zur Konzeptionierung von Projekten."
                },
                {
                    heading: "Werkstatt",
                    note: "PRAXISUNTERRICHT",
                    thumbnail: "/res/img/biomedLabor.png",
                    href: "tagesschule/elektrotechnik/highlights/werkstätte-elektrotechnik",
                    contentTitle: "Medizinisches Labor",
                    content: "Im praktischen Laborunterricht vermitteln unsere Lehrkräfte praktische Fachkentnisse und unterstützen die persönliche Entwicklung der"
                }
            ]
        })
    }

    stl() {
        return super.stl() + require("./ausmachtSectionBiomed.css").toString()
    }
    pug() {
        return super.pug() + require("./ausmachtSectionBiomed.pug").default
    }
});
