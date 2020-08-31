import declareComponent from "../../../../lib/declareComponent";
import Text from "../text";
import "../../../_button/button"
import {Theme} from "../../themeAble";
import Textblob from "../textblob/textblob";
import "../../_icon/arrow/arrow"
import {ElementList} from "extended-dom";

export type Project = { heading: string, note: string, logo: string, team: string[], thumbnail: string, title: string, content: string}

export default declareComponent("tablet-blob", class TableBlob extends Text {

    private index = 0;
    private projectData = [{
        heading:"Delta-3 Launch Vehicle",
        note:"Rakete zum ökonomischen Starten von Satelliten in den niedrigen Orbit",
        logo:"/res/img/projektLogoBeispiel3.png",
        team:[
            "Sabine Vollfrau",
            "Maximillian Meiringer",
            "Saphael Rschlage",
            "Feorg Gelber",
            "Moritz Meier"
        ],
        thumbnail:"/res/img/projektBeispiel3.jpg",
        title: "Das Problem",
        content: "Große Aerospace Unternehmen bieten keine ökonomischen Lösungen für kleinere wissenschaftliche Projekte, die eine Notwendigkeit für Satelliten im niedrigen Orbit haben. So kann zwar bei Missionen ein kleiner Satellit relativ billig mitgeschickt werden, Priorität ist aber jedenfalls die eigentliche Mission und eine individuelle Positionierung des Satelliten kann nicht garantiert werden.\n" +
            "\n" +
            "Schüler der 5. Klasse RT haben ein ökonomisches Launch Vehicle mit einer Kapazität von bis zu 500kg konzeptioniert, welches in Einzelausführung durch einen vergleichbar niedrigen Kostenpunkt, ein individuelles Deployment von Satelliten für kleinere wissenschaftliche Unternehmungen, als auch kommerzielle Applikationen bietet.",
    },
    {
        heading:"LabAuth",
        note:"Educard basierte Anwesenheitserfassung im Labor & Lernbüro.",
        logo:"/res/img/projektLogoBeispiel.png",
        team:[
            "Sabine Vollfrau",
            "Maximillian Meiringer",
            "Saphael Rschlage",
            "Garid Foldmann",
            "Feorg Gelber",
            "Moritz Meier"
        ],
        thumbnail:"/res/img/projektBeispiel.png",
        title: "Das Problem",
        content: "Die Anwesenheitserfassung im Labor oder Lernbüro hat sich im Laufe der Jahre als ein bescheiden herausgestellt. Manche Lehrer haben eine leere Liste durch die Klasse gegeben in welche die Schüler (nach Unterbrechen ihrer Arbeit) sich eingetragen hatten, welche anschließend vom Lehrer händisch in eine zentrale digitale Liste übertragen würde. Andere riefen schlicht jeden der ca. 100 Namen der Schüler die sich in dem Raum befinden könnten auf nur um die 20 ebenfalls in besagte liste zu schrieben.\n" +
            "\n" +
            "Das war nicht nur Unpraktisch, sondern auch Unverlässlich, da man ohne es zu wissen ausgelassen wurde wenn man zum Zeitpunkt der Answesenheitserfassung gerade nicht im Raum war. Zusätzlich kam es vor, dass Lehrer die Erfassung gar vergaßen und diese dan in Retrospektive oder garnicht Nachtrugen.",
    },
        {
            heading:"Phobos",
            note:"Eine neue Art der Datenübertragung",
            logo:"/res/img/projektLogoBeispiel2.png",
            team:[
                "Feorg Gelber",
                "Johann Mandel",
                "Rlorian Fitter"
            ],
            thumbnail:"/res/img/projektBeispiel2.png",
            title: "Das Problem",
            content: "Zu dem jetzigen Zeitpunkt gibt es einige Produkte auf dem Markt, welche ein kabellose Datenübertragung zwischen zwei Geräten ermöglichen. Für so gut wie alle benötigt man aber eine konstante Internetverbindung. Darüber hinaus leiden einige dieser Programme an geringer Übertragungsgeschwindigkeit und mangelnder Sicherheit. Aus diesem Grund wird eine Smartphone App als auch eine Desktop-Version der Applikation benötigt. Das Programm soll für eine kabellose und Internet unabhängige Datenübertragung verwendet werden."
        },
        {
            heading:"Delta-3 Launch Vehicle",
            note:"Rakete zum ökonomischen Starten von Satelliten in den niedrigen Orbit",
            logo:"/res/img/projektLogoBeispiel3.png",
            team:[
                "Sabine Vollfrau",
                "Maximillian Meiringer",
                "Saphael Rschlage",
                "Feorg Gelber",
                "Moritz Meier"
            ],
            thumbnail:"/res/img/projektBeispiel3.jpg",
            title: "Das Problem",
            content: "Große Aerospace Unternehmen bieten keine ökonomischen Lösungen für kleinere wissenschaftliche Projekte, die eine Notwendigkeit für Satelliten im niedrigen Orbit haben. So kann zwar bei Missionen ein kleiner Satellit relativ billig mitgeschickt werden, Priorität ist aber jedenfalls die eigentliche Mission und eine individuelle Positionierung des Satelliten kann nicht garantiert werden.\n" +
                "\n" +
                "Schüler der 5. Klasse RT haben ein ökonomisches Launch Vehicle mit einer Kapazität von bis zu 500kg konzeptioniert, welches in Einzelausführung durch einen vergleichbar niedrigen Kostenpunkt, ein individuelles Deployment von Satelliten für kleinere wissenschaftliche Unternehmungen, als auch kommerzielle Applikationen bietet.",
        },
        {
            heading:"LabAuth",
            note:"Educard basierte Anwesenheitserfassung im Labor & Lernbüro.",
            logo:"/res/img/projektLogoBeispiel.png",
            team:[
                "Sabine Vollfrau",
                "Maximillian Meiringer",
                "Saphael Rschlage",
                "Garid Foldmann",
                "Feorg Gelber",
                "Moritz Meier"
            ],
            thumbnail:"/res/img/projektBeispiel.png",
            title: "Das Problem",
            content: "Die Anwesenheitserfassung im Labor oder Lernbüro hat sich im Laufe der Jahre als ein bescheiden herausgestellt. Manche Lehrer haben eine leere Liste durch die Klasse gegeben in welche die Schüler (nach Unterbrechen ihrer Arbeit) sich eingetragen hatten, welche anschließend vom Lehrer händisch in eine zentrale digitale Liste übertragen würde. Andere riefen schlicht jeden der ca. 100 Namen der Schüler die sich in dem Raum befinden könnten auf nur um die 20 ebenfalls in besagte liste zu schrieben.\n" +
                "\n" +
                "Das war nicht nur Unpraktisch, sondern auch Unverlässlich, da man ohne es zu wissen ausgelassen wurde wenn man zum Zeitpunkt der Answesenheitserfassung gerade nicht im Raum war. Zusätzlich kam es vor, dass Lehrer die Erfassung gar vergaßen und diese dan in Retrospektive oder garnicht Nachtrugen.",
        },
        {
            heading:"Phobos",
            note:"Eine neue Art der Datenübertragung",
            logo:"/res/img/projektLogoBeispiel2.png",
            team:[
                "Feorg Gelber",
                "Johann Mandel",
                "Rlorian Fitter"
            ],
            thumbnail:"/res/img/projektBeispiel2.png",
            title: "Das Problem",
            content: "Zu dem jetzigen Zeitpunkt gibt es einige Produkte auf dem Markt, welche ein kabellose Datenübertragung zwischen zwei Geräten ermöglichen. Für so gut wie alle benötigt man aber eine konstante Internetverbindung. Darüber hinaus leiden einige dieser Programme an geringer Übertragungsgeschwindigkeit und mangelnder Sicherheit. Aus diesem Grund wird eine Smartphone App als auch eine Desktop-Version der Applikation benötigt. Das Programm soll für eine kabellose und Internet unabhängige Datenübertragung verwendet werden."
        },
        {
            heading:"Delta-3 Launch Vehicle",
            note:"Rakete zum ökonomischen Starten von Satelliten in den niedrigen Orbit",
            logo:"/res/img/projektLogoBeispiel3.png",
            team:[
                "Sabine Vollfrau",
                "Maximillian Meiringer",
                "Saphael Rschlage",
                "Feorg Gelber",
                "Moritz Meier"
            ],
            thumbnail:"/res/img/projektBeispiel3.jpg",
            title: "Das Problem",
            content: "Große Aerospace Unternehmen bieten keine ökonomischen Lösungen für kleinere wissenschaftliche Projekte, die eine Notwendigkeit für Satelliten im niedrigen Orbit haben. So kann zwar bei Missionen ein kleiner Satellit relativ billig mitgeschickt werden, Priorität ist aber jedenfalls die eigentliche Mission und eine individuelle Positionierung des Satelliten kann nicht garantiert werden.\n" +
                "\n" +
                "Schüler der 5. Klasse RT haben ein ökonomisches Launch Vehicle mit einer Kapazität von bis zu 500kg konzeptioniert, welches in Einzelausführung durch einen vergleichbar niedrigen Kostenpunkt, ein individuelles Deployment von Satelliten für kleinere wissenschaftliche Unternehmungen, als auch kommerzielle Applikationen bietet.",
        },
        {
            heading:"LabAuth",
            note:"Educard basierte Anwesenheitserfassung im Labor & Lernbüro.",
            logo:"/res/img/projektLogoBeispiel.png",
            team:[
                "Sabine Vollfrau",
                "Maximillian Meiringer",
                "Saphael Rschlage",
                "Garid Foldmann",
                "Feorg Gelber",
                "Moritz Meier"
            ],
            thumbnail:"/res/img/projektBeispiel.png",
            title: "Das Problem",
            content: "Die Anwesenheitserfassung im Labor oder Lernbüro hat sich im Laufe der Jahre als ein bescheiden herausgestellt. Manche Lehrer haben eine leere Liste durch die Klasse gegeben in welche die Schüler (nach Unterbrechen ihrer Arbeit) sich eingetragen hatten, welche anschließend vom Lehrer händisch in eine zentrale digitale Liste übertragen würde. Andere riefen schlicht jeden der ca. 100 Namen der Schüler die sich in dem Raum befinden könnten auf nur um die 20 ebenfalls in besagte liste zu schrieben.\n" +
                "\n" +
                "Das war nicht nur Unpraktisch, sondern auch Unverlässlich, da man ohne es zu wissen ausgelassen wurde wenn man zum Zeitpunkt der Answesenheitserfassung gerade nicht im Raum war. Zusätzlich kam es vor, dass Lehrer die Erfassung gar vergaßen und diese dan in Retrospektive oder garnicht Nachtrugen.",
        },
        {
            heading:"Phobos",
            note:"Eine neue Art der Datenübertragung",
            logo:"/res/img/projektLogoBeispiel2.png",
            team:[
                "Feorg Gelber",
                "Johann Mandel",
                "Rlorian Fitter"
            ],
            thumbnail:"/res/img/projektBeispiel2.png",
            title: "Das Problem",
            content: "Zu dem jetzigen Zeitpunkt gibt es einige Produkte auf dem Markt, welche ein kabellose Datenübertragung zwischen zwei Geräten ermöglichen. Für so gut wie alle benötigt man aber eine konstante Internetverbindung. Darüber hinaus leiden einige dieser Programme an geringer Übertragungsgeschwindigkeit und mangelnder Sicherheit. Aus diesem Grund wird eine Smartphone App als auch eine Desktop-Version der Applikation benötigt. Das Programm soll für eine kabellose und Internet unabhängige Datenübertragung verwendet werden."
        }
        ] as Project[];


    constructor(){
        super()
        if(this.projectData.length) {
            this.project(this.projectData[this.index]);
            this.team(this.projectData[this.index].team);
            this.logo(this.projectData[this.index].logo);
        }
    }

    theme():Theme
    theme(to:Theme):void
    theme(to?:Theme):any{
        (this.q("c-textblob") as ElementList<Textblob>).forEach(textblob => textblob.theme(to))
        return super.theme(to);
    }

    project():Project
    project(project:Project):void
    project(project:Project, tablet:HTMLElement):void
    project(project?:Project, tablet = this.q("tablet-content.current")){
        if(project){
            let projectJson = this.parseJSONProp(project);
            (tablet.querySelector("c-textblob") as Textblob).heading(projectJson.heading)
            tablet.querySelector("note-box").text(projectJson.note);
            tablet.querySelector(".thumbnail-pic").setAttribute("src", projectJson.thumbnail);
            tablet.querySelector("info-title").text(projectJson.title);
            tablet.querySelector("info-text").text(projectJson.content);
        }else
            return this.projectData[this.index];
    }

    private team(members:string[]){
        let projectteam = this.q("project-team");
        projectteam.removeChilds();
        if(members.length) projectteam.text("Projektteam");
        members.forEach(member => projectteam.appendChild(ce("project-member").text(member)))
    }

    private logo(logo:string){
        this.q(".project-icon-pic").setAttribute("src", logo)
    }

    stl(){
        return require('./tabletBlob.css').toString();
    }

    pug(){
        return require('./tabletBlob.pug').default;
    }
})
