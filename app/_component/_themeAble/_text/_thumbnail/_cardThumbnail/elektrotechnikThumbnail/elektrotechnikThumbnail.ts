import declareComponent from "../../../../../../lib/declareComponent";
import CardThumbnail from "../cardThumbnail";
import IconCard from "../../../../_card/iconCard/iconCard"

export default declareComponent("elektrotechnik-thumbnail", class ElektrotechnikThumbnail extends CardThumbnail{

    constructor(){
        super(
            new IconCard("anmelden", "Anmelden"),
            new IconCard("sprechstunden", "Sprechstunde", undefined, "neilo.webuntis.com/WebUntis/?school=tgm#/basic/officehours"),
            new IconCard("projekte", "Projekte", undefined, "tagesschule/elektrotechnik/projekte"),
            new IconCard("team", "Team", undefined, "tagesschule/elektrotechnik/team")
        )
        this.heading("Elektrotechnik");
        this.subheading("der Tagesschule");
        this.note("abteilung");
        this.hsize({max:70, min:35});
        this.hmobile({max:55, min:35});
    }

    stl() {
        return super.stl() + require("./elektrotechnikThumbnail.css").toString();
    }
    pug() {
      return super.pug() + require("./elektrotechnikThumbnail.pug").default
    }
})