import declareComponent from "../../../../../lib/declareComponent";
import Thumbnail from "../thumbnail";

export default declareComponent("team-leitung-thumbnail", class TeamLeitungThumbnail extends Thumbnail{

    constructor(){
        super();
        this.heading("Team und Leitung");
        this.subheading("welches die IT erst Ermöglicht");
        this.note("Unser/e IT");
        this.hsize({max:60, min:35});
        this.hmobile({max:55, min:35});
    }

    stl() {
        return super.stl() + require("./teamLeitungThumbnail.css").toString();
    }
})