import declareComponent from "../../../../../../lib/declareComponent";
import CardThumbnail from "../cardThumbnail";
import IconCard from "../../../../_card/iconCard/iconCard"
import Icon from "../../../../_icon/icon";

export default declareComponent("raumfahrt-thumbnail", class TeamLeitungThumbnail extends CardThumbnail{

    constructor(){
        super(
            new IconCard("tagesschule", "Anmelden"),
            new IconCard("abendschule", "Sprechstunde"),
            new IconCard("versuchsanstalt", "Projekte"),
            new IconCard("news", "Team")
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