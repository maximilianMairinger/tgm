import declareComponent from "../../../../../lib/declareComponent";
import local from "../../../../../lib/formatTime";
import InfoCard from "../infoCard";
import * as domain from "../../../../../lib/domain";

export const WEEKDAYS = [
    "Sontag",
    "Montag",
    "Dienstag",
    "Mittwoch",
    "Donnerstag",
    "Freitag",
    "Samstag"
];

export default class NewsCard extends InfoCard {

    constructor(heading?: string, note?: string | Date, thumbnail?: string, href?: string, contenttitle?: string, content?: string) {
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

    static apiParser(post) : HTMLElement{
        const domainCommon = [...domain.domainIndex].rmI(domain.domainIndex.length - 1).join(domain.dirString) + domain.dirString
        let newsCard = new NewsCard(
            WEEKDAYS[new Date(post.published_at).getDay()],
            new Date(post.published_at),
            post.feature_image,
            domainCommon + post.slug,
            post.title,
            post.excerpt,
        );
        return newsCard
    }

    stl(){
        return super.stl() + require('./newsCard.css').toString();
    }

}

declareComponent("news-card", NewsCard)
