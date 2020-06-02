import declareComponent from "../../../../lib/declareComponent";
import Card from "../card";
import "../../link/link"
import {Theme} from "../../themeAble";
import Textblob from "../../_text/textblob/textblob";
import "../../../_themeAble/_icon/zertificateMan/zertificateMan"
import ZertificateMan from "../../_icon/zertificateMan/zertificateMan"

export default declareComponent("anmelden-card", class AnmeldenCard extends Card {

    private textblob = this.q("c-textblob") as Textblob;
    private zertificateMan = this.q("c-zertificate-man") as ZertificateMan;

    constructor(){
        super(false);
    }

    theme():Theme
    theme(to:Theme):void
    theme(to?:Theme):any{
        this.zertificateMan.theme(to);
        this.textblob.theme(to);
        return super.theme(to);
    }

    stl(){
        return super.stl() + require('./anmeldenCard.css').toString();
    }

    pug(){
        return require('./anmeldenCard.pug').default;
    }
})
