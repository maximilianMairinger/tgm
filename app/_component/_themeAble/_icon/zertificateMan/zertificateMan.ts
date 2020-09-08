import Icon from "../icon";
import declareComponent from "../../../../lib/declareComponent";

export default class ZertificateMan extends Icon {

    constructor() {
        super()

    }


    stl(){
        return super.stl() + require('./zertificateMan.css').toString();
    }


    pug() {
        return require("./zertificateMan.pug").default
    }
}

declareComponent("zertificate-man", ZertificateMan)