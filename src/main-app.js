import { html } from 'lit-element';
import { MobxLitElement } from '@adobe/lit-mobx';

import cmsPostStore from './store/cms-post';

// create a new custom element, and use the base MobxLitElement class
// alternatively you can use the MobxReactionUpdate mixin, e.g. `class MyElement extends MobxReactionUpdate(LitElement)`
class MainApp extends MobxLitElement {
  cmsPost = cmsPostStore;

  firstUpdated() {
    this.cmsPost.fetchPostList({page: 1, pageSize: 10});
  }

  render() {
    return html`
      <pre>
        ${this.cmsPost.postSummaryList?.[0]?.title}
      </pre>
    `;
  }
}

customElements.define('main-app', MainApp);
