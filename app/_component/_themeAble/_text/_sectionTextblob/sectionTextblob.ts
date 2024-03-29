import Text from "../text"
import "../textblob/textblob"
import TextBlob, {MediaQuerySize} from "../textblob/textblob";
import {Theme} from "../../themeAble";
import declareComponent from "../../../../lib/declareComponent";



export default class SectionTextblob extends Text {

    private textBlob = this.q("c-textblob") as TextBlob

    constructor() {
        super()
    }

    note(): string
    note(note: string): void
    note(note?: string):any {
        return this.textBlob.note(note);
    }

    heading(): string
    heading(heading: string): void
    heading(heading?: string): any {
        return this.textBlob.heading(heading)
    }

    subheading(): string
    subheading(subheading: string): void
    subheading(subheading?: string): any {
        return this.textBlob.subheading(subheading)
    }

    content(): string
    content(content: string): void
    content(content?: string): any {
        return this.textBlob.content(content)
    }

    linktext(): string
    linktext(linktext: string): void
    linktext(linktext?: string): any {
        return this.textBlob.linktext(linktext)
    }

    linkhref(): string
    linkhref(linkhref: string): void
    linkhref(linkhref?: string): any {
        return this.textBlob.linkhref(linkhref)
    }

    hsize(): MediaQuerySize
    hsize(hsize: JSON | MediaQuerySize): void
    hsize(hsize?: JSON | MediaQuerySize): any {
        return this.textBlob.hsize(hsize)
    }

    hmobile(): MediaQuerySize
    hmobile(hmobile: JSON | MediaQuerySize): void
    hmobile(hmobile?: JSON | MediaQuerySize): any {
        return this.textBlob.hmobile(hmobile)
    }

    hscale(): number
    hscale(hscale: number): void
    hscale(hscale?: number): any {
        return this.textBlob.hscale(hscale);
    }

    theme():Theme
    theme(to:Theme):this
    theme(to?:Theme):any{
        this.textBlob.theme(to)
        return super.theme(to);
    }

    stl() {
        return require("./sectionTextblob.css").toString()
    }

    pug() {
        return require("./sectionTextblob.pug").default
    }
}

declareComponent("section-textblob", SectionTextblob)