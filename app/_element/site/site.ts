import Element from "../element"
import Button from "./../_button/button"

export default class Site extends Element {

  constructor() {
    super();
  }

  stl() {
    return require("./site.css").toString()
  }
  pug() {
    return require("./site.pug").default
  }
}

window.customElements.define('c-site', Site);