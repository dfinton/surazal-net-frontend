import { LitElement } from "lit-element";

export default class LightLitElement extends LitElement {
  createRenderRoot() {
    return this;
  }
}
