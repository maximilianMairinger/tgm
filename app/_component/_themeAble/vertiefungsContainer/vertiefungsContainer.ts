import ThemeAble, {Theme} from "../themeAble"
import declareComponent from "../../../lib/declareComponent"
import "../../_themeAble/_button/button"
import "../_icon/arrow/arrow"
import VertiefungsCard from  "../_card/vertiefungsCard/vertiefungsCard"


export type VertiefungsCardContent = { heading: string, icon:string, link:string, content: string }
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
        cards.forEach((card) => {
            let vertiefungItem = ce("vertiefungs-item");
            vertiefungItem.apd(ce("vertiefungs-extra-line-1"));
            vertiefungItem.apd(ce("vertiefungs-extra-line-2"));
            vertiefungItem.apd(ce("vertiefungs-extra-circle"));
            vertiefungItem.apd(new VertiefungsCard(card.heading, card.content, card.icon, card.link))
            vertiefungsContainer.apd(vertiefungItem)
        });
    }

    stl() {
        return super.stl() + require("./vertiefungsContainer.css").toString()
    }

    pug() {
        return require("./vertiefungsContainer.pug").default
    }

}

declareComponent("vertiefungs-container", VertiefungsContainer);