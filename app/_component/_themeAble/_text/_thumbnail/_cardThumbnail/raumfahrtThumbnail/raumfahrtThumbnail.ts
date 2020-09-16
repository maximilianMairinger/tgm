import declareComponent from "../../../../../../lib/declareComponent";
import CardThumbnail from "../cardThumbnail";
import IconCard from "../../../../_card/iconCard/iconCard"

export default declareComponent("raumfahrt-thumbnail", class TeamLeitungThumbnail extends CardThumbnail{

    constructor(){
        super(
            new IconCard("anmelden", "Anmelden"),
            new IconCard("sprechstunden", "Sprechstunde", undefined, "neilo.webuntis.com/WebUntis/?school=tgm#/basic/officehours"),
            new IconCard("projekte", "Projekte", undefined, "tagesschule/raumfahrt/projekte"),
            new IconCard("team", "Team", undefined, "tagesschule/raumfahrt/team")
        )
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