import {VlElement, define} from '/node_modules/vl-ui-core/vl-core.js';
import '../vl-modal.src.js';
import '/node_modules/vl-ui-button/vl-button.js';
import '/node_modules/vl-ui-input-field/vl-input-field.js';

export class VlModalTest extends VlElement(HTMLElement) {
  constructor() {
    super(`
      <style>
          @import '/node_modules/vl-ui-modal/style.css';
          @import '/node_modules/vl-ui-button/style.css';
          @import '/node_modules/vl-ui-input-field/style.css';
      </style>

      <vl-modal data-title="Modal" closable not-cancellable>
        <button is="vl-button" slot="button">aanvraag starten</button>
        <input is="vl-input-field" slot="content"/></input>
      </vl-modal>`);
  }
  
  open() {
    this._element.open();
  }
}

define('vl-modal-test', VlModalTest);