import declareComponent from "../../../../../lib/declareComponent";
import InfoCard from "../infoCard";
import Button from "../../../../_button/button";

export default class BlogCard extends InfoCard {

    private button = new Button();

    constructor() {
        super();
        this.textblob.hsize({max:25, min:25});
        this.textblob.hmobile({max:25, min:25});
        this.q("info-card").append(this.button);
    }

    note():string
    note(note:Date|string):void
    note(note?:Date|string){
        console.log(new Date(note).toDateString() );
        if(new Date(note).toDateString() !== 'Invalid Date'){
            let moment = require("moment");
            this.q("note-text").text(moment(note).format("DD.MM.YY"));
        } else if (typeof note === 'string') super.note(note as string);
        else return this.q("note-text").text();
    }

    href(href?:string):any{
        this.button.link(href);
        return super.href(href);
    }

    stl(){
        return super.stl() + require('./blogCard.css').toString();
    }

}

declareComponent("blog-card", BlogCard)
