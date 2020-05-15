import Text from "./../text";
import declareComponent from "../../../lib/declareComponent";
import"./../textblob/textblob"


export default declareComponent("image-textblob", class Textblob extends Text {

        constructor() {
            super();
        }

        image():string
        image(image:string):void
        image(image?:string) {
            console.log(image);
            if(image) this.q("image-box").css("background", image);
            else return this.q("image-box").css("background");
        }


        stl() {
            return require("./imageTextblob.css").toString()
        }

        pug() {
            return require("./imageTextblob.pug").default
        }

    }
)