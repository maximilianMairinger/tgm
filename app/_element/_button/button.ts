import Component from "../component"
import declareComponent from "./../../lib/declareComponent"

export default declareComponent("button", class Button extends Component {

  constructor() {
    super(false)

  }


  content(s: string) {
    console.log("content", s)
    this.q("hello-test").text(s)
  }


  stl() {
    return require("./button.css").toString()
  }
  pug() {
    return require("./button.pug").default
  }
})
