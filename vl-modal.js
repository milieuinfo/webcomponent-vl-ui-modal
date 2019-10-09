import{VlElement,define,awaitScript,awaitUntil}from"/node_modules/vl-ui-core/vl-core.js";import{VlIcon}from"/node_modules/vl-ui-icon/vl-icon.js";import{VlButton}from"/node_modules/vl-ui-button/vl-button.js";import{VlActionGroup}from"/node_modules/vl-ui-action-group/vl-action-group.js";Promise.all([awaitScript("util","/node_modules/@govflanders/vl-ui-util/dist/js/util.min.js"),awaitScript("core","/node_modules/@govflanders/vl-ui-core/dist/js/core.min.js"),awaitScript("modal","/node_modules/vl-ui-modal/dist/modal.js"),awaitUntil(()=>window.vl&&window.vl.modal)]).then(()=>define("vl-modal",VlModal));export class VlModal extends(VlElement(HTMLElement)){static get _observedAttributes(){return["id","data-title","closable","not-cancellable","open"]}constructor(){super('\n            <style>\n                @import \'/node_modules/vl-ui-modal/style.css\';\n                @import \'/node_modules/vl-ui-icon/style.css\';\n                @import \'/node_modules/vl-ui-link/style.css\';\n                @import \'/node_modules/vl-ui-action-group/style.css\';\n                @import \'/node_modules/vl-ui-button/style.css\';\n            </style>\n\n            <div class="vl-modal">\n                <dialog class="vl-modal-dialog" data-vl-modal tabindex="-1" role="dialog" aria-modal="true" aria-hidden="true" aria-labelledby="modal-toggle-title" aria-describedby="modal-toggle-description">\n                  <div class="vl-modal-dialog__content" id="modal-toggle-description">\n                      <slot name="content">Modal content</slot>\n                  </div>\n                  <div is="vl-action-group" id="modal-action-group">\n                    <slot name="button" data-vl-modal-close></slot>\n                    <button is="vl-button-link" id="modal-toggle-cancellable" data-vl-modal-close>\n                        <span is="vl-icon" icon="cross" before></span>Annuleer\n                    </button>\n                  </div>\n                </dialog>\n            </div>\n        ')}connectedCallback(){this.dress()}get _dialogElement(){return this._element.querySelector("dialog")}get _titleElement(){return this._element.querySelector("#modal-toggle-title")}get _actionGroupElement(){return this._element.querySelector("#modal-action-group")}get _cancelElement(){return this._element.querySelector("#modal-toggle-cancellable")}get _dressed(){return!!this.getAttribute("data-vl-modal-dressed")}dress(){this._dressed||vl.modal.dress(this._dialogElement)}open(){vl.modal.lastClickedToggle=this._dialogElement,this._dialogElement.hasAttribute("open")||vl.modal.toggle(this._dialogElement)}close(){this._dialogElement.hasAttribute("open")&&vl.modal.toggle(this._dialogElement)}on(e,t){this._dialogElement.addEventListener(e,t)}_getCloseButtonTemplate(){return this._template('\n          <button type="button" class="vl-modal-dialog__close" data-vl-modal-close>\n            <i class="vl-modal-dialog__close__icon vl-vi vl-vi-cross" aria-hidden="true"></i>\n            <span class="vl-u-visually-hidden">Venster sluiten</span>\n          </button>\n        ')}_getTitleTemplate(e){return this._template(`\n      <h2 class="vl-modal-dialog__title" id="modal-toggle-title">${e}</h2>\n        `)}_getCancelTemplate(){return this._template('\n        <button is="vl-button-link" data-vl-modal-close id="modal-toggle-cancellable">\n            <span is="vl-icon" icon="cross" before data-vl-modal-close></span>Annuleer\n        </button>')}_idChangedCallback(e,t){this._dialogElement.id=t}_data_titleChangedCallback(e,t){t?this._titleElement?this._titleElement.innerText=t:this._dialogElement.prepend(this._getTitleTemplate(t)):this._titleElement&&this._titleElement.remove()}_not_cancellableChangedCallback(e,t){void 0!==t||this._cancelElement?void 0!==t&&this._cancelElement&&this._cancelElement.remove():this._actionGroupElement.append(this._getCancelTemplate())}_openChangedCallback(e,t){this._dialogElement.setAttribute("open",t)}_closableChangedCallback(e,t){void 0!==t?(this._closeButtonElement=this._getCloseButtonTemplate(),this._dialogElement.setAttribute("data-vl-modal-closable",""),this._dialogElement.appendChild(this._closeButtonElement)):this._closeButtonElement&&(this._closeButtonElement.remove(),this._dialogElement.removeAttribute("data-vl-modal-closable"))}};