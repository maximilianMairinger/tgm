import declareComponent from "../../../../../lib/declareComponent";
import sectionTextblob from "../sectionTextblob";

export default declareComponent("informationen-section", class InformationenSection extends sectionTextblob{

    constructor(){
        super();
        this.theme('light');
        this.heading("Informationen");
        this.subheading("zu den Projekten.");
        this.note("Vorweg");
        this.hsize({max:55, min:37});
        this.hmobile({max:40, min:30});
        this.content("Folgende Schülerprojekte wurden im Zuge des ITP-Unterrichts entwickelt. SchülerInnen haben die Möglichkeit ihre Kreativität auszueleben und wertvolle Lektionen fürs zukünfige Berufleben zu sammeln.\n" +
            "\n" +
            "Unsere Abteilung arbeitet mit top Unternehmen aus der Privatwirtschaft zusammen um gemeinsam Tools zu entwickeln den SchülerInnen einen einsteig in die Industrie zu bieten.");
    }

    stl() {
        return super.stl() + require("./informationenSection.css").toString();
    }
})