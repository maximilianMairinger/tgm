import declareComponent from "../../../../lib/declareComponent";
import Text from "../text";
import "../../../_themeAble/_button/button"
import {Theme} from "../../themeAble";
import Textblob from "../textblob/textblob";
import "../../_icon/swipe/swipe"
import "../../_icon/arrow/arrow"
import {ElementList} from "extended-dom";

export type Project = { heading: string, note: string, logo: string, team: string[], thumbnail: string, title: string, content: string, loaded:boolean}

export default declareComponent("tablet-blob", class TableBlob extends Text {

    private index = 0;
    private previousArrow = this.q("project-previous");
    private previousAvailable = false;
    private nextArrow = this.q("project-next");
    private nextAvailable = false;
    private slider = this.q("tablet-slider");
    private updating:boolean;
    private tutorial = this.q("mobile-tutorial");
    private tutorialBind;
    private projectData = [{
        heading:"Delta-1 Launch Vehicle",
        note:"Rakete zum ökonomischen Starten von Satelliten in den niedrigen Orbit",
        logo:"/res/img/projektLogoBeispiel3.png",
        team:[
            "Sabine Vollfrau",
            "Maximillian Meiringer",
            "Saphael Rschlage",
            "Feorg Gelber",
            "Moritz Meier"
        ],
        thumbnail:"/res/img/projektBeispiel3.png",
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
            heading:"Delta-2 Launch Vehicle",
            note:"Rakete zum ökonomischen Starten von Satelliten in den niedrigen Orbit",
            logo:"/res/img/projektLogoBeispiel3.png",
            team:[
                "Sabine Vollfrau",
                "Maximillian Meiringer",
                "Saphael Rschlage",
                "Feorg Gelber",
                "Moritz Meier"
            ],
            thumbnail:"/res/img/projektBeispiel3.png",
            title: "Das Problem",
            content: "Große Aerospace Unternehmen bieten keine ökonomischen Lösungen für kleinere wissenschaftliche Projekte, die eine Notwendigkeit für Satelliten im niedrigen Orbit haben. So kann zwar bei Missionen ein kleiner Satellit relativ billig mitgeschickt werden, Priorität ist aber jedenfalls die eigentliche Mission und eine individuelle Positionierung des Satelliten kann nicht garantiert werden.\n" +
                "\n" +
                "Schüler der 5. Klasse RT haben ein ökonomisches Launch Vehicle mit einer Kapazität von bis zu 500kg konzeptioniert, welches in Einzelausführung durch einen vergleichbar niedrigen Kostenpunkt, ein individuelles Deployment von Satelliten für kleinere wissenschaftliche Unternehmungen, als auch kommerzielle Applikationen bietet.",
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
            content: "Die Anwesenheitserfassung im Labor oder Lernbüro hat sich im Laufe der Jahre als ein bescheiden herausgestellt. Manche Lehrer haben eine leere Liste durch die Klasse gegeben in welche die Schüler (nach Unterbrechen ihrer Arbeit) sich eingetragen hatten, welche anschließend vom Lehrer händisch in eine zentrale digitale Liste übertragen würde. Andere riefen schlicht jeden der ca. 100 Namen der Schüler die sich in dem Raum befinden könnten auf nur um die 20 ebenfalls in besagte liste zu schrieben.\n" +
                "\n" +
                "Das war nicht nur Unpraktisch, sondern auch Unverlässlich, da man ohne es zu wissen ausgelassen wurde wenn man zum Zeitpunkt der Answesenheitserfassung gerade nicht im Raum war. Zusätzlich kam es vor, dass Lehrer die Erfassung gar vergaßen und diese dan in Retrospektive oder garnicht Nachtrugen.",
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
            thumbnail:"/res/img/projektBeispiel3.png",
            title: "Das Problem",
            content: "Große Aerospace Unternehmen bieten keine ökonomischen Lösungen für kleinere wissenschaftliche Projekte, die eine Notwendigkeit für Satelliten im niedrigen Orbit haben. So kann zwar bei Missionen ein kleiner Satellit relativ billig mitgeschickt werden, Priorität ist aber jedenfalls die eigentliche Mission und eine individuelle Positionierung des Satelliten kann nicht garantiert werden.\n" +
                "\n" +
                "Schüler der 5. Klasse RT haben ein ökonomisches Launch Vehicle mit einer Kapazität von bis zu 500kg konzeptioniert, welches in Einzelausführung durch einen vergleichbar niedrigen Kostenpunkt, ein individuelles Deployment von Satelliten für kleinere wissenschaftliche Unternehmungen, als auch kommerzielle Applikationen bietet.",
        },
        {
            heading:"LabAuth 3",
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
            heading:"Phobos 3",
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

    private updateIndex(){
        this.index = Math.floor((this.slider.scrollLeft / this.slider.width()) + 0.5);
    }

    private next() {
        if(!this.updating) {
            this.updating = true;
            this.updateIndex()
            if (this.nextAvailable) {
                this.index++;
                let scrollLeft = this.index * this.slider.width();
                this.slider.scrollTo({left: scrollLeft, top: 0, behavior: 'smooth'});
                this.wait4scroll(this.slider, scrollLeft, () => this.update(true));
            }
        }
    }

    private previous(){
        if(!this.updating) {
            this.updating = true;
            this.updateIndex()
            if(this.previousAvailable) {
                this.index--;
                let scrollLeft = this.index * this.slider.width();
                this.slider.scrollTo({left: scrollLeft, top: 0, behavior: 'smooth'});
                this.wait4scroll(this.slider, scrollLeft, () => this.update(false));
            }
        }
    }

    private scrollUpdate() {
        // console.log("scrolling")
        let index = this.index;
        this.updateIndex()
        if (this.index > index)
            this.update(true);
        else if (this.index < index)
            this.update(false);
    }

    private update(shift = null){
        this.team(this.projectData[this.index].team);
        this.logo(this.projectData[this.index].logo);
        let preload:number = this.projectData.length -1 ;
        if(shift != null)
            if(shift){
                // @ts-ignore
                this.previousArrow.firstChild.text(this.projectData[this.index - 1].heading, false)
                if(!this.previousAvailable) {
                    this.previousArrow.css({"display": "flex"});
                    this.previousAvailable = true;
                }
                this.nextAvailable = this.index < this.projectData.length - 1;
                if(!this.nextAvailable)
                    this.nextArrow.css({"display":"none"});
                else {
                    // @ts-ignore
                    this.nextArrow.firstChild.text(this.projectData[this.index + 1].heading, false);
                    if(this.index + preload < this.projectData.length && !this.projectData[this.index + preload].loaded)
                        this.project(this.projectData[this.index + preload])
                }

            }else {
                // @ts-ignore
                this.nextArrow.firstChild.text(this.projectData[this.index + 1].heading, false)
                if(!this.nextAvailable) {
                    this.nextArrow.css({"display": "flex"});
                    this.nextAvailable = true
                }
                this.previousAvailable = this.index > 0;
                if(!this.previousAvailable)
                    this.previousArrow.css({"display":"none"});
                else {
                    // @ts-ignore
                    this.previousArrow.firstChild.text(this.projectData[this.index - 1].heading, false);
                }

            }
        else {
            this.nextAvailable = true;
            this.project(this.projectData[this.index + 1])
            for(let index = this.index + 2; index < this.projectData.length && index <= preload; index ++)
                this.project(this.projectData[index])

            this.nextArrow.firstChild.text(this.projectData[this.index + 1].heading)
            this.nextArrow.css({"display":"flex"});
        }
        this.updating=false;
    }

    private tutorialHandler(){
        this.tutorial.removeEventListener("scroll", this.tutorialBind);
        this.wait4scroll(this.tutorial, this.tutorial.width(), () => this.tutorial.css({display: "none"}));
    }

    private pid;
    private wait4scroll(scroller:Element, wantedPx:number, func:()=>any){
        // console.log("scroll waiter");
        clearInterval(this.pid);
        this.pid = setInterval(() => {
            if(scroller.scrollLeft < wantedPx + 10 && scroller.scrollLeft > wantedPx - 10){
                // console.log("scroll finished")
                func();
                clearInterval(this.pid);
            }
        }, 32)
    }

    constructor(){
        super()
        this.nextArrow.addEventListener("click", this.next.bind(this));
        this.previousArrow.addEventListener("click", this.previous.bind(this));
        this.slider.addEventListener("scroll", this.scrollUpdate.bind(this))
        this.tutorialBind = this.tutorialHandler.bind(this);
        this.tutorial.addEventListener("scroll", this.tutorialBind);
        if(this.projectData.length) {
            this.project(this.projectData[this.index]);
            this.update();
        }
    }

    theme():Theme
    theme(to:Theme):this
    theme(to?:Theme):any{
        (this.q("c-textblob") as ElementList<Textblob>).forEach(textblob => textblob.theme(to))
        return super.theme(to);
    }

    project():Project
    project(project:Project):void
    project(project:Project, tablet:HTMLElement):void
    project(project?:Project, tablet= this.createProject()){
        if(project){
            let projectJson = this.parseJSONProp(project);
            (tablet.querySelector("c-textblob") as Textblob).heading(projectJson.heading)
            tablet.querySelector("note-box").text(projectJson.note);
            tablet.querySelector(".thumbnail-pic").setAttribute("src", projectJson.thumbnail);
            tablet.querySelector("info-title").text(projectJson.title);
            tablet.querySelector("info-text").text(projectJson.content);
            // console.log(project.heading);
            // console.log("Index:", this.index);
            project.loaded = true;
        }else
            return this.projectData[this.index];
    }

    private createProject():Element{
        let tablet = ce("tablet-content");

        let textblob = new Textblob();
        textblob.hsize({max:42, min:42});
        tablet.append(textblob);

        let notebox = ce("note-box");
        notebox.append(ce("note-text"));
        tablet.append(notebox);

        let thumbnail = ce("thumbnail-container");
        //Why does it work that way?!?!?!?
        thumbnail.append(ce("IMG").addClass("thumbnail-pic"));
        thumbnail.append(ce("thumbnail-background"));
        tablet.append(thumbnail);

        let info = ce("tablet-info");
        info.append(ce("info-title"));
        info.append(ce("info-text"));
        tablet.append(info);


        this.slider.append(tablet);

        return tablet;
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
