import Text from "./../text";
import declareComponent from "../../../lib/declareComponent";


export default declareComponent("textblob", class Textblob extends Text {

        constructor() {
            super();
        }


        heading(): string
        heading(heading: string): void
        heading(heading?: string) {
            if (heading) this.q("heading").text(heading);
            else return this.q("heading").text();
        }

        subheading():string
        subheading(subheading:string):void
        subheading(subheading?:string){
            if (subheading) this.q("subheading").text(subheading);
            else return this.q("subheading").text();
        }

        note():string
        note(note:string):void
        note(note?:string){
            if (note) {
                var notebox:HTMLElement = document.createElement("notebox");
                var noteElement:HTMLElement = document.createElement("note");
                noteElement.text(note);
                var connector:HTMLElement = document.createElement("connector");
                var hr:HTMLElement = document.createElement("HR");
                connector.append(hr);
                notebox.append(noteElement);
                notebox.append(connector);
                this.q("textblob").append(notebox)
            }
            else return this.q("note").text();
        }

        content():string
        content(content:string):void
        content(content?:string) {
            if (content) {
                this.q("content").text(content);
            }
            else return this.q("content").text();
        }

        linktext():string
        linktext(linktext:string):void
        linktext(linktext?:string){
            if(linktext) this.q("a.link").html(linktext);
            else return this.q("a.link").html();
        }

        linkhref():string
        linkhref(linkhref:string):void
        linkhref(linkhref?:string){
            if(linkhref) this.q("a.link").setAttribute("href", linkhref);
            else return this.q("a.link").getAttribute("href");
        }


    stl() {
            return require("./textblob.css").toString()
        }

        pug() {
            return require("./textblob.pug").default
        }

    }
)