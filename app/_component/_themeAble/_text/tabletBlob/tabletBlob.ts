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
    private previousArrow = this.q("project-previous");
    private previousAvailable = false;
    private nextArrow = this.q("project-next");
    private nextAvailable = false;
    private projectData = [{
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
            heading:"LabAuth 2",
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
            content: "",
        },
        {
            heading:"Phobos 2",
            note:"Eine neue Art der Datenübertragung",
            logo:"/res/img/projektLogoBeispiel2.png",
            team:[
                "Feorg Gelber",
                "Johann Mandel",
                "Rlorian Fitter"
            ],
            thumbnail:"/res/img/projektBeispiel2.png",
            title: "Das Problem",
            content: ""
        }] as Project[];

    private next(){
        console.log("next");
        if(this.nextAvailable) {
            this.index++;
            let cache = this.q("tablet-content.previous").removeClass("previous");
            this.q("tablet-content.current").removeClass("current").addClass("previous");
            this.q("tablet-content.next").removeClass("next").addClass("current");
            cache.addClass("next")
            this.update(true, cache as HTMLElement);
        }
    }

    private previous(){
        console.log("previous");
        if(this.previousAvailable) {
            this.index--;
            let cache = this.q("tablet-content.next").removeClass("next");
            this.q("tablet-content.current").removeClass("current").addClass("next");
            this.q("tablet-content.previous").removeClass("previous").addClass("current");
            cache.addClass("previous");
            this.update(false, cache as HTMLElement)
        }
    }

    /**
     * @param shift true -> shift forwards
     *              false -> shift backwards
     *              null -> no shift
     */
    private update(shift:boolean, tablet:HTMLElement){
        this.team(this.projectData[this.index].team);
        this.logo(this.projectData[this.index].logo);
        if(shift != null)
            if(shift){
                this.previousArrow.firstChild.text(this.projectData[this.index - 1].heading)
                if(!this.previousAvailable) {
                    this.previousArrow.css({"display": "flex"});
                    this.previousAvailable = true;
                }
                this.nextAvailable = this.index < this.projectData.length - 1;
                if(!this.nextAvailable)
                    this.nextArrow.css({"display":"none"});
                else {
                    this.nextArrow.firstChild.text(this.projectData[this.index + 1].heading);
                    this.project(this.projectData[this.index + 1], this.q("tablet-content.next") as HTMLElement)
                }

            }else {
                this.nextArrow.firstChild.text(this.projectData[this.index + 1].heading)
                if(!this.nextAvailable) {
                    this.nextArrow.css({"display": "flex"});
                    this.nextAvailable = true
                }
                this.previousAvailable = this.index > 0;
                if(!this.previousAvailable)
                    this.previousArrow.css({"display":"none"});
                else {
                    this.previousArrow.firstChild.text(this.projectData[this.index - 1].heading);
                    this.project(this.projectData[this.index - 1], this.q("tablet-content.previous") as HTMLElement)
                }

            }
        else {
            this.nextAvailable = this.index < this.projectData.length - 1;
            this.project(this.projectData[this.index + 1], this.q("tablet-content.next") as HTMLElement)
            this.nextArrow.firstChild.text(this.projectData[this.index + 1].heading)
            this.nextArrow.css({"display":"flex"});
        }
    }

    constructor(){
        super()
        this.nextArrow.addEventListener("click", this.next.bind(this));
        this.previousArrow.addEventListener("click", this.previous.bind(this));
        if(this.projectData.length) {
            this.project(this.projectData[this.index]);
            this.team(this.projectData[this.index].team);
            this.logo(this.projectData[this.index].logo);
            this.update(null, this.q("tablet-content.next") as HTMLElement)
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
            (tablet.querySelector("c-textblob") as Textblob).heading(project.heading)
            tablet.querySelector("note-box").text(project.note);
            tablet.querySelector(".thumbnail-pic").setAttribute("src", project.thumbnail);
            tablet.querySelector("info-title").text(project.title);
            tablet.querySelector("info-text").text(project.content);
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
