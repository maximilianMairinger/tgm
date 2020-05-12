import Text from "./../text";
import declareComponent from "../../../lib/declareComponent";


export default declareComponent("textblob", class Textblob extends Text {

        constructor() {
            super();
        }

        stl() {
            return require("./textblob.css").toString()
        }

        pug() {
            return require("./textblob.pug").default
        }

        title(): string
        title(title: string): void
        title(title?: string) {
            if(title) this.q("h1").text(title);
            else return this.q("h1").text();
        }

    }
)