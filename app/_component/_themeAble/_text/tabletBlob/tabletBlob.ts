import declareComponent from "../../../../lib/declareComponent";
import Text from "../text";
import "../../../_button/button"
import {Theme} from "../../themeAble";
import Textblob from "../textblob/textblob";
import "../../_icon/arrow/arrow"

export default declareComponent("tablet-blob", class TableBlob extends Text {

    private textblob = this.q("c-textblob") as Textblob;

    theme():Theme
    theme(to:Theme):void
    theme(to?:Theme):any{
        this.textblob.theme(to);
        return super.theme(to);
    }

    stl(){
        return require('./tabletBlob.css').toString();
    }

    pug(){
        return require('./tabletBlob.pug').default;
    }
})
