import { css, html, LitElement } from 'https://unpkg.com/lit-element@latest/lit-element.js?module';
import {VlElement, define} from '/node_modules/vl-ui-core/vl-core.js';
import './vl-modal.src.js';
import '/node_modules/vl-ui-button/vl-button.js';
import '/node_modules/vl-ui-input-field/vl-input-field.js';

export class VlTest extends LitElement {


  constructor() {
    super();
  }

  render() {
    return html`
            <style>
                @import '../style.css';
                @import '/node_modules/vl-ui-icon/style.css';
                @import '/node_modules/vl-ui-link/style.css';
                @import '/node_modules/vl-ui-action-group/style.css';
                @import '/node_modules/vl-ui-button/style.css';
                @import '/node_modules/vl-ui-input-field/style.css';
            </style>
    <script src="/vl-modal.src.js"></script>

    <script src="/node_modules/vl-ui-button/vl-button.js"></script>

    <script src="/node_modules/vl-ui-action-group/vl-action-group.js"></script>

    <script src="/node_modules/vl-ui-icon/vl-icon.js"></script>

                <button is="vl-button" data-vl-modal-open="modal-3" onclick="openModalTest(this, 'modal-3')">Open</button>
                <vl-modal id="modal-3" data-title="Modal 3" closable not-cancellable>
                                    <button is="vl-button" slot="button" onclick="closeModalTest(this, 'modal-3')">aanvraag starten</button>
                                    <input is="vl-input-field" slot="content"/></input>

</vl-modal>`;
  }
}


define('vl-test', VlTest);