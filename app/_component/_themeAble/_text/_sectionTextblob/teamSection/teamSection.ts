import declareComponent from "../../../../../lib/declareComponent";
import sectionTextblob from "../sectionTextblob";

export default declareComponent("team-section", class TeamSection extends sectionTextblob{

    constructor(){
        super();
        this.theme('light');
        this.heading("Team");
        this.note("das");
        this.hsize({max:68, min:40});
        this.hmobile({max:40, min:30});
        this.content(`Die Lehrkräfte unserer Abteilung gewährleisten durch neueste pädagogische Methodiken und individuelle Betreuung die bestmögliche Entwicklung der SchülerInnen. Unser Lehrkörper rekrutiert aus den erfahrensten Mitgliedern der Wissenschaft und Industrie.`);
    }

    stl() {
        return super.stl() + require("./teamSection.css").toString();
    }
})