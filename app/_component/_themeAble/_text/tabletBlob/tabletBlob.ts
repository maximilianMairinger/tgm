import declareComponent from "../../../../lib/declareComponent";
import Text from "../text";
import "../../../_themeAble/_button/button"
import {Theme} from "../../themeAble";
import Textblob from "../textblob/textblob";
import "../../_icon/swipe/swipe"
import "../../_icon/arrow/arrow"
import {ElementList} from "extended-dom";
import GhostContentAPI from "@tryghost/content-api";
import BlogSuggestions, {blogCardInfo} from "../../blogSuggestions/blogSuggestions";
import * as domain from "../../../../lib/domain";
import "./../../../image/image"
import Image from "./../../../image/image"
import PenIcon from "../../_icon/fachIcon/pen/pen";
import {api} from "../../../../lib/api";

export type Project = { heading: string, note: string, logo: string, team: string[], thumbnail?: string, thumbVid?: string, title: string, content: string, loaded:boolean}

export default class TabletBlob extends Text {

    private index = 0;
    private previousArrow = this.q("project-previous");
    private previousAvailable = false;
    private nextArrow = this.q("project-next");
    private nextAvailable = false;
    private slider = this.q("tablet-slider");
    private updating:boolean;
    private tutorial = this.q("mobile-tutorial");
    private projectData: Project[];
    private tutorialBind;

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

    constructor(projekte?: JSON[] | Project[], api?:boolean, abt?:string){
        super()
        if(api) this.apiData(abt).then(() => this.build());
        else if(projekte) {
            this.projectList(projekte)
            this.build()
        }
    }

    private build(){
        this.nextArrow.addEventListener("click", this.next.bind(this));
        this.previousArrow.addEventListener("click", this.previous.bind(this));
        this.slider.addEventListener("scroll", this.scrollUpdate.bind(this))
        this.tutorialBind = this.tutorialHandler.bind(this);
        this.tutorial.addEventListener("scroll", this.tutorialBind);
        if (this.projectData.length) {
            this.project(this.projectData[this.index]);
            this.update();
        }
    }

    private async apiData(abt: string){
        this.projectData = []
        let blogData: any
        try {
            blogData = await api.posts.browse({filter:"tag:projekt+tag:"+abt})
        }
        catch(e) {
            console.error("problem with project api")
        }
        blogData.forEach(post=>this.apiParser(post));

    }

    private apiParser(data){
        let parser = new DOMParser();
        let html = parser.parseFromString(data.html, 'text/html');
        let project:Project = {
            content: this.apiContentParser(html),
            heading: data.title,
            loaded: false,
            logo: html.querySelector("td img").getAttribute("src"),
            note: html.querySelector("p:first-child").text(),
            team: html.querySelector("td:first-child").innerHTML.split(/<\s*br\s*\/*>/),
            thumbnail: data.feature_image,
            title: html.querySelector("p:nth-child(2)").text()
        };
        //console.log(data)
        this.projectData.add(project)
    }

    private apiContentParser(html:Document):string{
        return Array.from(html.querySelectorAll("*:nth-child(n + 3):not(table, td, tr)")).map(elm => elm.outerHTML).join('')
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

            let thumbnailContainer = tablet.querySelector("thumbnail-container")
            let oldThumbNail = thumbnailContainer.childs(".thumbnail-pic", true)
            if (!oldThumbNail.empty) oldThumbNail.remove()
            
            
            if (projectJson.thumbnail) {
                let pic = ce("c-image").addClass("thumbnail-pic") as Image
                thumbnailContainer.prepend(pic)
                pic.src(projectJson.thumbnail)
            }
            else if (projectJson.thumbVid) {
                setTimeout(() => {
                    thumbnailContainer.insertAdjacentHTML("beforeend", `<iframe class="thumbnail-pic" width="560" height="515" src="${projectJson.thumbVid}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`)
                })
            }
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
        // thumbnail.append(ce("c-image").addClass("thumbnail-pic"));
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
        if (logo) (this.logoElem.show() as any).src(logo)
        else this.logoElem.hide()
    }

    projectList(projekte:JSON[] | Project[]){
        this.projectData = this.parseJSONProp(projekte)
    }

    stl(){
        return require('./tabletBlob.css').toString();
    }

    pug(){
        return require('./tabletBlob.pug').default;
    }
}

declareComponent("tablet-blob", TabletBlob);