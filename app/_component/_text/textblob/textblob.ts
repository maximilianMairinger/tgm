import Text from "./../text";
import declareComponent from "../../../lib/declareComponent";


export default declareComponent("textblob", class Textblob extends Text {

        private hsizeScale = ["45", "30"];
        private hmobileScale = ["45", "30"];
        private mediaQuery:MediaQueryList;
        private textbox = this.q("text-box");


        mobileQueryFunc(mediaQuery){
            console.log(this.textbox);
            if(!mediaQuery.matches)
                this.textbox.css({"fontSize":`calc(${this.hsizeScale[1]}px + (${this.hsizeScale[0]} - ${this.hsizeScale[1]}) * ((100vw - 768px) / (1600 - 768)))`});
            else
                this.textbox.css({"fontSize":`calc(${this.hmobileScale[1]}px + (${this.hmobileScale[0]} - ${this.hmobileScale[1]}) * ((100vw - 300px) / (768 - 300)))`});
        }

        constructor() {
            super();
            this.mediaQuery = window.matchMedia('(max-width: 768px)');
            this.mediaQuery.addListener(this.mobileQueryFunc);
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

        hsize(): string[]
        hsize(hsize: string): void
        hsize(hsize?: string) {
            if (hsize) {
                this.hsizeScale = hsize.split("/");
                this.mobileQueryFunc(this.mediaQuery);
            } else return this.hsizeScale;
        }

        hmobile(): string[]
        hmobile(hmobile: string): void
        hmobile(hmobile?: string) {
            if (hmobile) {
                this.hmobileScale = hmobile.split("/");
                this.mobileQueryFunc(this.mediaQuery);
            } else return this.hmobileScale;
        }

        hscale(): string
        hscale(hscale: string): void
        hscale(hscale?: string) {
            if (hscale) this.q("subheading-text").css({"fontSize": `max(${hscale}em, calc(${this.hsizeScale[1]}px * 0.8))`});
            else return this.q("subheading-text").css("fontSize");
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
                notebox.append(ce("spacing-box"));
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