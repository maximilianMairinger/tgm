import ThemeAble, {Theme} from "../themeAble"
import declareComponent from "../../../lib/declareComponent"
import "../../_themeAble/_button/button"
import "../_icon/arrow/arrow"
import VertiefungsCard from  "../_card/vertiefungsCard/vertiefungsCard"
import Icon from "../_icon/icon"


export type VertiefungsCardContent = { heading: string, icon: string | (() => any) | Icon, link:string, content: string }
export default class VertiefungsContainer extends ThemeAble {

    constructor() {
        super(false);
    }


    theme(): Theme
    theme(to: Theme): this
    theme(to?: Theme): any {
        return super.theme(to)
    }

    cards(cards: JSON[] | VertiefungsCardContent[]) {
        let vertiefungsContainer = this.q("vertiefungs-container")
        cards = this.parseJSONProp(cards)
        console.log(cards)
        if (cards.length === 1) {
            const card = cards.first as VertiefungsCardContent
            let vertiefungItem = ce("vertiefungs-item");
            vertiefungItem.apd(ce("vertiefungs-extra-line-1").css("opacity", 0));
            vertiefungItem.apd(ce("vertiefungs-extra-line-2").css("opacity", 0));
            vertiefungItem.apd(ce("vertiefungs-extra-circle").css("opacity", 0));
            vertiefungItem.apd(new VertiefungsCard(card.heading, card.content, card.icon, card.link))
            vertiefungsContainer.apd(vertiefungItem)
        }
        else {
            cards.forEach((card) => {
                let vertiefungItem = ce("vertiefungs-item");
                vertiefungItem.apd(ce("vertiefungs-extra-line-1"));
                vertiefungItem.apd(ce("vertiefungs-extra-line-2"));
                vertiefungItem.apd(ce("vertiefungs-extra-circle"));
                vertiefungItem.apd(new VertiefungsCard(card.heading, card.content, card.icon, card.link))
                vertiefungsContainer.apd(vertiefungItem)
            });
        }
        
    }

    stl() {
        return require("./vertiefungsContainer.css").toString()
    }

    pug() {
        return require("./vertiefungsContainer.pug").default
    }

}

declareComponent("vertiefungs-container", VertiefungsContainer);