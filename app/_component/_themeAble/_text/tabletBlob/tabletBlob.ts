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
        heading:"Power Kite",
        note:"Stromerzeugung mittels kitessurfen",
        // logo:"/res/img/projektLogoBeispiel3.png",
        team: [
            "Lukas Buza",
            "Lukas Gassner",
            "Matteo Ingegneri",
            "Mario Lang"
        ],
        thumbnail:"/res/img/kitesurf.jpg",
        title: "Diplomarbeit der 5AHET (2018/19)",
        content: 
            "Das Ziel dieser Diplomarbeit war die Fertigung eines Funktionsprototyps zur Stromerzeugung mittels eines Kites, wie man es vom Kitesurfen her kennt. Durch das Ausfahren eines Kites sollte über eine Welle ein Gleichstrommotor als Generator betrieben und die erzeugte Energie in einem Akku gespeichert werden. Weiters wurde als Ziel gesetzt, das Maturaprojekt mit einem so geringen Budget wie möglich durchzuführen. Daher wurden für dieses Projekt möglichst viele Teile wiederverwendet, welche in der Abteilung keine anderweitige Anwendung mehr fanden."
            +
            "<img src='/res/img/kiteprinzip.png'></img>"
            +
            "Als Basis des Prototyps wurde eine Europalette gewählt. Auf dieser wurden sowohl die mechanischen als auch die elektrischen Komponenten befestigt. Zur Leistungswandlung wurde eine 150W Gleichstrommaschine gewählt. Für die zweite, kleinere Maschine, welche für das Funktionsprinzip notwendig war, wurde ein Bohrmaschinenmotor verwendet."
            + "<br><br>" +
            "Nachdem die mechanischen Komponenten auf der Palette angebracht worden waren, wurde eine elektrische Schaltung zum Messen von Spannung und Strom entworfen. In einem von der Schule zur Verfügung gestellten Akkumulator sollte die erzeugte elektrische Energie gespeichert werden. Zur Ansteuerung der beiden elektrischen Maschinen wurden zusätzlich zwei HBrücken benötigt. Diese sollten mittels Mikrocontroller angesteuert werden. Die elektrischen Bauteile wurden anschließend in einer angefertigten Holzbox verschaltet. Diese diente auch als Steuerpult, welches zwei Potentiometer zur Steuerung der Gleichstrommaschinen über den Arduino sowie einen Schalter zum Ein- und Ausschalten des PowerKites beinhaltet. Für den Arduino wurde ein Programm zur Steuerung der beiden Maschinen sowie eine Ausgabe der gemessenen Größen erstellt. Der fertige Prototyp wurde zuerst am Gelände des TGM und später auf der Donauinsel einem Funktionstest unterworfen und es konnte tatsächlich elektrische Energie erzeugt werden. Allerdings wurde dabei das Kite-Segel manuell gesteuert, was im Falle einer kommerziellen Stromerzeugung natürlich automatisiert erfolgen müsste."
    },
    {
        heading:"ELFASNO",
        note:"Elektrisches Fahrrad für Schneebetrieb.",
        team:[
            "Jan Dworschak",
            "Christian Wiedenhofer",
            "Michael Beierl"
        ],
        thumbnail:"/res/img/schneerad.png",
        title: "Diplomarbeit der 5AHET (2016/17)",
        content: 
            "Das Primärziel dieses Projekts war es ein elektrisch betriebenes Fahrrad für den Schneebetrieb zu konstruieren und zu realisieren. Das Elektrofahrrad sollte dabei größere Steigungen bewältigen können, eine gewisse Geschwindigkeit erreichen und mit möglichst geringen Verlusten im Schnee fahren können. Das Antriebskonzept sollte dem eines „Pedelec-Mobils“ ähneln. Dabei fährt man, im Gegensatz zu einem Moped nicht rein elektrisch, sondern tritt mit seinen Füßen im mit. Das war eine wichtige Rahmenbedingung, die man einhalten musste."
            + "<br><br>" +
            "Es sollte ein möglichst detailgetreues OpenModelica Modell erstellt werden, um alle Teile richtig auslegen zu können und so auch abzuschätzen, wie das Gefährt mit unterschiedlichen Bedingungen fertig werden könne. Ebenso galt es abzuwägen und zu entscheiden , welches Antriebs - bz w. Fortbewegungskonzept gewählt werden sollte - herkömmliche Schneeräder, Fat Tyres oder eine Ski/Schneeraupenkombination."
            + "<br>" +
            "Es sollte ein Vehikel geschaffen werden, welches auf einem Fahrrad basiert, sich möglichst wendig verhält und eine gute Steigfähigkeit aufweist, um zum Beispiel Rettungskräfte nach Lawinen oder Personen in verschneiten Gebieten zu unterstützen."
            + "<br>" +
            "Ein wichtiges Ziel ist es, eine wirtschaftliche Alternative zu lauten, umweltbelastenden Schneemobilen beziehungsweise MotoCross-Motorrädern zu finden und somit die Pisten und Schneegebiete angenehmer und idyllischer zu machen."
            + "<br>" + 
            "Zusätzlich zum umwelttechnischen Aspekt hat das Team sich überlegt, dass das ELFASNO auch im winterlichen Hilfseinsatz eine Rolle spielen könnte."
            + "<br><br>" + 
            "Es wurde der Prototyp eines leistungsstarken, mobilen Fahrzeuges gebaut, welches bei entsprechender Weiterentwicklung Einsatzkräften auf der ganzen Welt in Schneegebieten beziehungsweise nach Lawinen- oder Murenabgängen eine hilfreiche Unterstützung sein kann."
    }] as Project[];

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
            tablet.querySelector("info-text").html(projectJson.content);
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

    private logoElem = this.q(".project-icon-pic")
    private logo(logo:string){
        if (logo) this.logoElem.show().setAttribute("src", logo)
        else this.logoElem.hide()
    }

    stl(){
        return require('./tabletBlob.css').toString();
    }

    pug(){
        return require('./tabletBlob.pug').default;
    }
})
