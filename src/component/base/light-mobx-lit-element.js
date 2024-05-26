import { MobxLitElement } from '@adobe/lit-mobx';

export default class LightMobxLitElement extends MobxLitElement {
  createRenderRoot() {
    return this;
  }
}
