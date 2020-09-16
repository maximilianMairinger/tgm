import {declareComponent} from "../../../../../lib/declareComponent"
import Page from "../page"
import "../../../../_themeAble/_text/textblob/textblob"
import "../../../../_themeAble/_text/imageTextblob/imageTextblob"
import "../../../../_themeAble/_text/_thumbnail/schuelerprojekteThumbnail/schuelerprojekteThumbnail"
import "../../../../_themeAble/_text/_thumbnail/abteilungsThumbnail/abteilungsThumbnail"
import "../../../../_themeAble/_text/_thumbnail/teamLeitungThumbnail/teamLeitungThumbnail"
import "../../../../_themeAble/_text/_thumbnail/parameterThumbnail/parameterThumbnail"
import "../../../../_themeAble/_text/_sectionTextblob/versuchsanstalltSection/versuchsanstalltSection"
import "../../../../_themeAble/_text/_sectionTextblob/teamSection/teamSection"
import "../../../../_themeAble/_text/_sectionTextblob/informationenSection/informationenSection"
import "../../../../_themeAble/_text/_sectionTextblob/ausbildungSection/ausbildungSection"
import "../../../../_themeAble/_card/selectionCard/selectionCard"
import "../../../../_themeAble/_card/anmeldenCard/anmeldenCard"
import "../../../../_themeAble/_card/_infoCard/infoCard"
import "../../../../_themeAble/_text/tabletBlob/tabletBlob"
import "../../../../_themeAble/cookieNote/cookieNote"
import "../../../../_themeAble/_text/blogPost/blogPost"
import "../../../../_themeAble/blogSuggestions/blogSuggestions"
import "../../../../_themeAble/_card/_infoCard/blogCard/blogCard"
import "../../../../_themeAble/_card/_infoCard/newsCard/newsCard"
import "../../../../_themeAble/_card/_infoCard/unterrichtSystemeCard/unterrichtSystemeCard"

import "../../_pageSection/schuelerprojekteSection/schuelerprojekteSection"
import "../../_pageSection/ausmachtSection/ausmachtSection"


export default declareComponent("georgs-sandbox", class extends Page {
    constructor() {
        super()
    }

    protected activationCallback(active: boolean): void {

    }

    stl() {
        return super.stl() + require("./georgsSanbox.css").toString()
    }

    pug() {
        return require("./georgsSanbox.pug").default
    }

}) 