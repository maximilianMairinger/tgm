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

    constructor(heading?: string, note?: string | Date, thumbnail?: string, href?: string | {link: string, domainLevel: number}, contenttitle?: string, content?: string) {
        super();
        if (heading) this.heading(heading)
        if (note) this.note(note)
        if (thumbnail) this.thumbnail(thumbnail)
        if (href) this.href(href)
        if (contenttitle) this.contenttitle(contenttitle)
        if (content) this.content(content)

        this.textblob.hsize({max:40, min:35});
    }

    note():string
    note(note:string | Date):void
    note(note?:string | Date){
        if(note) {
            this.q("note-text").text(local.formatDate(note));
        }
        else return this.q("note-text").text();
    }

    static apiParser(post) : HTMLElement{
        let newsCard = new NewsCard(
            WEEKDAYS[new Date(post.published_at).getDay()],
            new Date(post.published_at),
            post.feature_image,
            {link: post.slug, domainLevel: domain.domainIndex.length + 1},
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
