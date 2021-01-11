import declareComponent from "../../../../../lib/declareComponent";
import local from "../../../../../lib/formatTime";
import InfoCard from "../infoCard";
import * as domain from "../../../../../lib/domain";



export const weekday = (() => {
    const WEEKDAYS = [
        "Sontag",
        "Montag",
        "Dienstag",
        "Mittwoch",
        "Donnerstag",
        "Freitag",
        "Samstag"
    ];
    return function weekDay(of: Date) {
        return WEEKDAYS[of.getDay()]
    }
})()

export default class NewsCard extends InfoCard {

    constructor(heading?: string, note?: string | Date | Date[]/*[from: Date, until: Date]*/, thumbnail?: string, href?: string | {link: string, domainLevel: number}, contenttitle?: string, content?: string) {
        super();
        if (heading) this.heading(heading)
        if (note) this.note(note)
        if (thumbnail) this.thumbnail(thumbnail)
        else this.thumbnail("defaultNews")
        if (href) this.href(href)
        if (contenttitle) this.contenttitle(contenttitle)
        if (content) this.content(content)

        this.textblob.hsize({max:40, min:35});
    }

    note():string
    note(note:string | Date | Date[]/*[from: Date, until: Date]*/): void
    note(note?:string | Date | Date[]/*[from: Date, until: Date]*/){
        if(note) {
            this.q("note-text").text(local.formatDate(note));
        }
        else return this.q("note-text").text();
    }

    static apiParser(post): HTMLElement {        
        let startDate: Date
        let date: Date | Date[]/*[from: Date, until: Date]*/
        if (post.event_data) {
            date = JSON.parse(post.event_data).map((date: string) => new Date(date))
            startDate = (date as Date[]/*[from: Date, until: Date]*/).first
        }
        else startDate = date = new Date(post.published_at)
        let newsCard = new NewsCard(
            weekday(startDate),
            date,
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
