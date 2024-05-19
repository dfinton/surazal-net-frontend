import { html } from 'lit-element';
import { observable, action, makeObservable } from 'mobx';
import { MobxLitElement } from '@adobe/lit-mobx';

// create a mobx observable
class Counter {
  count = 0;

  constructor() {
    makeObservable(this, {
      count: observable,
      increment: action,
    });
  }

  increment() {
    this.count++;
  }
}

// create instance that can be shared across components
const counter = new Counter();


// create a new custom element, and use the base MobxLitElement class
// alternatively you can use the MobxReactionUpdate mixin, e.g. `class MyElement extends MobxReactionUpdate(LitElement)`
class MainApp extends MobxLitElement {
  counter = counter;

  // any observables accessed in the render method will now trigger an update
  render() {
    return html`
      Count is ${this.counter.count}
      <br />
      <button @click=${this.incrementCount}>Add</button>
    `;
  }

  firstUpdated() {
    // you can update in first updated
    this.counter.increment(); // value is now 1
  }

  incrementCount() {
    // and you can trigger change in event callbacks
    this.counter.increment(); // value is now n + 1
  }
}

customElements.define('main-app', MainApp);
