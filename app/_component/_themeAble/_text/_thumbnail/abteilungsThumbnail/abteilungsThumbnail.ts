import declareComponent from "../../../../../lib/declareComponent";
import Thumbnail from "../thumbnail";

export default declareComponent("abteilungs-thumbnail", class AbteilungsThumbnail extends Thumbnail{

    private mediaQuery:MediaQueryList;

    constructor(){
        super();
        this.heading("");
        this.subheading("der Tagesschule");
        this.note("Abteilung");
        this.hsize({max:55, min:30});
        this.hmobile({max:55, min:27});
        this.mediaQuery = window.matchMedia('(max-width: 768px)');
        this.mediaQuery.addListener(this.mobileQueryFunc.bind(this));
        this.mobileQueryFunc(this.mediaQuery);
    }

    private mediaQueryMatches: boolean;
    mobileQueryFunc(mediaQuery: MediaQueryList) {
        if (!mediaQuery.matches) {
            if (this.mediaQueryMatches || this.mediaQueryMatches === undefined) {
                this.mediaQueryMatches = false;
                this.heading("Informationstechnologie")
            }

        }

        else {
            if (!this.mediaQueryMatches) {
                this.mediaQueryMatches = true;
                this.heading("Informations-technologie");
            }
        }

    }

    stl() {
        return super.stl() + require("./abteilungsThumbnail.css").toString();
    }
})