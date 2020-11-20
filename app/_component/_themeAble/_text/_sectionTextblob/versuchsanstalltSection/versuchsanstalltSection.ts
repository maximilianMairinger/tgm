import declareComponent from "../../../../../lib/declareComponent";
import sectionTextblob from "../sectionTextblob";

export default declareComponent("versuchsanstalt-section", class VersuchsanstalltSection extends sectionTextblob{

    constructor(){
        super();
        this.theme('dark');
        this.heading("Versuchsanstalt");
        this.subheading("österreichweit.");
        this.note("Die Größte");
        this.hsize({max:75, min:35});
        this.hmobile({max:40, min:30});
        this.hscale(0.5);
        this.content("Die Staatliche Versuchsanstalt am TGM wurde als „Probieranstalt für mechanisch-technische Materialprüfung“ im Jahr 1887 gegründet. Mit 100 Angestellten ist sie die größte in Österreich.\n" +
            "\n" +
            "Sie ist in ihrer aktuellen Organisationsform in 6 Fachbereiche untergliedert. Unten können Sie mehr erfahren.\n");
        this.linktext("Mehr erfahren");
        this.linkhref("");
    }

    stl() {
        return super.stl() + require("./versuchsanstalltSection.css").toString();
    }
})