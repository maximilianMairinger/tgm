import Component from "../_component/component";

/**
 * Declare new Component and append it to the customElementRegitry
 * @param name Name of the component, how it should be refelected in the dom (when not starting with "c-", "c-" will be prefixed) 
 * @param component The component class; observedAttributes will be injected automatically
 */
export function declareComponent<Comp>(name: string, component: Comp){
  //@ts-ignore
  if (!component.observedAttributes) {
    //@ts-ignore
    component.observedAttributes = Object.getOwnPropertyNames(component.prototype).rmV("constructor", "stl", "pug")
  }

  if (!name.startsWith("c-")) name = "c-" + name
  //@ts-ignore
  window.customElements.define(name, component)

  return component as Comp
}

export default declareComponent