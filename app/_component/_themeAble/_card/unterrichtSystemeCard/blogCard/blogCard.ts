import declareComponent from "../../../../../lib/declareComponent";
import ThemeAble, {Theme} from "../../../themeAble";
import UnterrichtSystemeCard from "../unterrichtSystemeCard";

export default class BlogCard extends UnterrichtSystemeCard {

    constructor() {
        super();
        this.textblob.hsize({max:25, min:25})
        this.textblob.hmobile({max:25, min:25})
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

    stl(){
        return super.stl() + require('./blogCard.css').toString();
    }

}

declareComponent("blog-card", BlogCard)
