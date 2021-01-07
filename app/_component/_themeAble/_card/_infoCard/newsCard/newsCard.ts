import declareComponent from "../../../../../lib/declareComponent";
import local from "../../../../../lib/formatTime";
import InfoCard from "../infoCard";

export default class NewsCard extends InfoCard {

    constructor(heading?: string, note?: string, thumbnail?: string, href?: string, contenttitle?: string, content?: string) {
        super();
        if (heading) this.heading(heading)
        if (note) this.note(note)
        if (thumbnail) this.thumbnail(thumbnail)
        if (href) this.href(href)
        if (contenttitle) this.contenttitle(contenttitle)
        if (content) this.content(content)

        this.textblob.hsize({max:40, min:35});
    }

    // note():string
    // note(note:string | Date):void
    // note(note?:string | Date){
    //     if(note && new Date(note).toDateString() !== 'Invalid Date'){
    //         this.q("note-text").text(local.formatDate(note));
    //     } else if (typeof note === 'string') super.note(note as string);
    //     else return this.q("note-text").text();
    // }

    stl(){
        return super.stl() + require('./newsCard.css').toString();
    }

}

declareComponent("news-card", NewsCard)
