import { css, html, LitElement } from 'https://unpkg.com/lit-element@latest/lit-element.js?module';
import {VlElement, define} from '/node_modules/vl-ui-core/vl-core.js';
import 'vl-modal.js';
import '/node_modules/vl-ui-button/vl-button.js';

export class Test extends LitElement {
  render() {
    return html`
                <button is="vl-button" data-vl-modal-open="modal-3">Open</button>
                <vl-modal id="modal-3" data-title="Modal 3" closable not-cancellable></vl-modal>`;
  }
}


define('vl-test', Test);