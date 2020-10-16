import declareComponent from "../../../../../lib/declareComponent";
import InfoCard from "../infoCard";

export default class NewsCard extends InfoCard {

    constructor() {
        super();
        this.textblob.hsize({max:40, min:35});
    }

    note():string
    note(note:string|Date):void
    note(note?:string|Date){
        if(note && new Date(note).toDateString() !== 'Invalid Date'){
            let moment = require("moment");
            this.q("note-text").text(moment(note).format("DD.MM.YY"));
        } else if (typeof note === 'string') super.note(note as string);
        else return this.q("note-text").text();
    }

    stl(){
        return super.stl() + require('./newsCard.css').toString();
    }

}

declareComponent("news-card", NewsCard)
