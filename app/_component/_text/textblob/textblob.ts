import Text from "./../text";
import declareComponent from "../../../lib/declareComponent";


export default declareComponent("textblob", class Textblob extends Text {

        constructor() {
            super();
        }


        heading(): string
        heading(heading: string): void
        heading(heading?: string) {
            if (heading) this.q("heading-text").text(heading);
            else return this.q("heading-text").text();
        }

        subheading(): string
        subheading(subheading: string): void
        subheading(subheading?: string) {
            if (subheading) this.q("subheading-text").text(subheading);
            else return this.q("subheading-text").text();
        }

        hscale():string
        hscale(hscale:string):void
        hscale(hscale?:string){
            if(hscale) this.q("subheading-text").css("font-size", hscale + "em");
            else return this.q("subheading-text").css("font-size");
        }

        note(): string
        note(note: string): void
        note(note?: string) {
            if (note) {
                let notebox = ce("note-box");
                let notetext = ce("note-text");
                notetext.text(note);
                let connector = ce("connector-box");
                let hr = ce("HR");
                connector.append(hr);
                notebox.append(notetext);
                notebox.append(connector);
                notebox.append(ce("spacing-box"))
                this.q("text-blob").append(notebox)
            } else return this.q("note-text").text();
        }

        content(): string
        content(content: string): void
        content(content?: string) {
            if (content) {
                this.q("content-text").text(content);
            } else return this.q("content-text").text();
        }

        linktext(): string
        linktext(linktext: string): void
        linktext(linktext?: string) {
            if (linktext) this.q("a.link").html(linktext);
            else return this.q("a.link").html();
        }

        linkhref(): string
        linkhref(linkhref: string): void
        linkhref(linkhref?: string) {
            if (linkhref) this.q("a.link").setAttribute("href", linkhref);
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