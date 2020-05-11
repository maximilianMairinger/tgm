import Element from "../element"

export default class Button extends Element {

  constructor() {
    super(false)

  }


  // static get observedAttributes() {
  //   return ['content'];
  // }

  stl() {
    return require("./button.css").toString()
  }
  pug() {
    return require("./button.pug").default
  }
}

window.customElements.define('c-button', Button);