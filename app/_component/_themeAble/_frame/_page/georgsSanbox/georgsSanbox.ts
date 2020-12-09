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
import "../../../../_themeAble/overflowX/overflowX"
import "../../../../_themeAble/_text/blogPost/blogPost"
import "../../../../_themeAble/blogSuggestions/blogSuggestions"
import "../../../../_themeAble/_card/_infoCard/blogCard/blogCard"
import "../../../../_themeAble/_card/_infoCard/newsCard/newsCard"
import "../../../../_themeAble/_card/_infoCard/unterrichtSystemeCard/unterrichtSystemeCard"
import "../../../../_themeAble/vertiefungsContainer/vertiefungsContainer"
import "../../../_icon/swipe/swipe"

import "../../_pageSection/schuelerprojekteSection/schuelerprojekteSection"

import Button from "../../../_button/button";
import OverflowX from "../../../overflowX/overflowX"


export default declareComponent("georgs-sandbox", class extends Page {
    constructor() {
        super()
        let next = this.q("c-button.next") as Button;
        let previous = this.q("c-button.previous") as Button;
        let overflowContainer = this.q("c-overflow-x.custom") as OverflowX;
        overflowContainer.setNextButton(next);
        overflowContainer.setPreviousButton(previous);
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