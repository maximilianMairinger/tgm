import declareComponent from "../../../../../lib/declareComponent";
import sectionTextblob from "../sectionTextblob";

export default declareComponent("team-section", class TeamSection extends sectionTextblob{

    constructor(){
        super();
        this.theme('light');
        this.heading("Team");
        this.subheading("der RT Abteilung.");
        this.note("Unser/e");
        this.hsize({max:68, min:40});
        this.hmobile({max:40, min:30});
        this.content("We are a bunch of talented and passionate people who hate beige walls and dull parties. If this is your case you can always send us your information!\n" +
            "\n" +
            "Derzeit suchen wir nach einem LehrerInnen im bereich Softwareentwicklung, Fotographie, Graphic Design und Web-Entwicklung bestmöglichst mit Praxiserfahrung.");
    }

    stl() {
        return super.stl() + require("./teamSection.css").toString();
    }
})