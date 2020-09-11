import declareComponent from "../../../../../lib/declareComponent";
import ThemeAble, {Theme} from "../../../themeAble";
import UnterrichtSystemeCard from "../unterrichtSystemeCard";
import Textblob from "../../../_text/textblob/textblob";
import Card from "../../card";

export default class BlogCard extends UnterrichtSystemeCard {

    constructor() {
        super();
        this.textblob.hsize({max:25, min:25})
        this.textblob.hmobile({max:25, min:25})
    }

    stl(){
        return super.stl() + require('./blogCard.css').toString();
    }

}

declareComponent("blog-card", BlogCard)
