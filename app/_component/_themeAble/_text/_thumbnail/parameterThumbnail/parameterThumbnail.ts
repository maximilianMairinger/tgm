import declareComponent from "../../../../../lib/declareComponent";
import Thumbnail from "../thumbnail";

export default declareComponent("parameter-thumbnail", class ParameterThumbnail extends Thumbnail{

    constructor(){
        super();
        this.hsize({max:60, min:35});
        this.hmobile({max:55, min:35});
    }

    background():string
    background(background:string):void
    background(background?:string) {
        if (background)
            this.q("background-image").css({"backgroundImage": background});
        else return this.q("background-image").css("backgroundImage");
    }

    stl() {
        return super.stl() + require("./parameterThumbnail.css").toString();
    }
})