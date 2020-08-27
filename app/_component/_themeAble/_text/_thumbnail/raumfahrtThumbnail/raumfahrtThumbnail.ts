import declareComponent from "../../../../../lib/declareComponent";
import Thumbnail from "../thumbnail";

export default declareComponent("raumfahrt-thumbnail", class TeamLeitungThumbnail extends Thumbnail{

    constructor(){
        super();
        this.heading("Raumfahrttechnik");
        this.subheading("der Tagesschule");
        this.note("abteilung");
        this.hsize({max:70, min:35});
        this.hmobile({max:55, min:35});
    }

    stl() {
        return super.stl() + require("./raumfahrtThumbnail.css").toString();
    }
    pug() {
      return super.pug() + require("./raumfahrtThumbnail.pug").default
    }
})