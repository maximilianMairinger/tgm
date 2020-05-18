import declareComponent from "../../../../../lib/declareComponent";
import Thumbnail from "../thumbnail";

export default declareComponent("schuelerprojekte-thumbnail", class SchuelerprojekteThumbnail extends Thumbnail{

    constructor(){
        super();
        this.heading("Schülerprojekte");
        this.subheading("der IT Abteilung");
        this.note("Bemerkenswerte");
        this.hsize({max:70, min:45});
        this.hmobile({max:55, min:25});
        this.content("Im Zuge des ITP-Unterrichts wird Projektmanagement anhand von wirklich durchgeführten Projekten demonstriert.");
    }

    stl() {
        return super.stl() + require("./schuelerprojekteThumbnail.css").toString();
    }
})