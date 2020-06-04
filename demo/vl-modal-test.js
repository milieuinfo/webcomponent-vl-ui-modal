import {vlElement, define} from '/node_modules/vl-ui-core/dist/vl-core.js';
import '/node_modules/vl-ui-button/dist/vl-button.js';
import '/node_modules/vl-ui-input-field/dist/vl-input-field.js';
import '/src/vl-modal.js';

export class VlModalTest extends vlElement(HTMLElement) {
  constructor() {
    super(`
      <style>
          @import '/node_modules/vl-ui-button/dist/style.css';
          @import '/node_modules/vl-ui-input-field/dist/style.css';
      </style>

      <vl-modal data-title="Modal" closable not-cancellable>
        <button is="vl-button" slot="button">aanvraag starten</button>
        <input id="input-safari" is="vl-input-field" slot="content" block></input>
      </vl-modal>
    `);
  }

  open() {
    this._element.open();
  }
}

export class VlModalContainerTest extends vlElement(HTMLElement) {
  constructor() {
    super(`
      <vl-modal-test></vl-modal-test>
    `);
  }

  open() {
    this._element.open();
  }
}

customElements.whenDefined('vl-input-field').then(() => {
  define('vl-modal-test', VlModalTest);
  define('vl-modal-container-test', VlModalContainerTest);
});
