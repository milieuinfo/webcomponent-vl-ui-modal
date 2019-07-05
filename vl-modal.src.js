import {VlElement, define} from '/node_modules/vl-ui-core/vl-core.js';
import {VlIcon} from '/node_modules/vl-ui-icon/vl-icon.js';
import {VlButton} from '/node_modules/vl-ui-button/vl-button.js';
import {VlActionGroup} from '/node_modules/vl-ui-action-group/vl-action-group.js';

(() => {
  loadScript('util.js',
      '/node_modules/@govflanders/vl-ui-util/dist/js/util.min.js', () => {
        loadScript('core.js',
            '/node_modules/@govflanders/vl-ui-core/dist/js/core.min.js', () => {
              loadScript('modal.js', '../dist/modal.js');
            });
      });

  function loadScript(id, src, onload) {
    if (!document.head.querySelector('#' + id)) {
      let script = document.createElement('script');
      script.setAttribute('id', id);
      script.setAttribute('src', src);
      script.onload = onload;
      document.head.appendChild(script);
    }
  }
})();

/**
 * VlModal
 * @class
 * @classdesc Gebruik de modal dialoog om de gebruiker te informeren over onbewaarde wijzigingen wanneer hij de pagina verlaat. Een modal dialoog vraagt de aandacht van de gebruiker en verplicht de gebruiker om actie te ondernemen voordat de site verder gebruikt kan worden. <a href="demo/vl-modal.html">Demo</a>.
 *
 * @extends VlElement
 *
 * @property {boolean} title - Attribuut wordt gebruikt om de titel (in een h2) te zetten. Indien leeg of weggelaten, wordt er geen titel element gezet.
 * @property {boolean} open - Attribuut wordt gebruikt om aan te duiden dat de modal onmiddellijk geopend moet worden na het renderen.
 * @property {boolean} closable - Attribuut wordt gebruikt om aan te duiden dat de modal sluitbaar is.
 */
export class VlModal extends VlElement(HTMLElement) {
  static get _observedAttributes() {
    return ['id', 'title', 'closable', 'cancellable', 'open'];
  }

  constructor() {
    super(`
            <style>
                @import '../style.css';
                @import '/node_modules/vl-ui-icon/style.css';
                @import '/node_modules/vl-ui-link/style.css';
                @import '/node_modules/vl-ui-action-group/style.css';
                @import '/node_modules/vl-ui-button/style.css';
            </style>

            <div class="vl-modal">
                <dialog class="vl-modal-dialog" data-vl-modal tabindex="-1" role="dialog" aria-modal="true" aria-hidden="true" aria-labelledby="modal-toggle-1-title" aria-describedby="modal-toggle-1-description">
                    <div class="vl-modal-dialog__content" id="modal-toggle-1-description">
                        <slot name="content">Modal content</slot>
                    </div>
                      <div is="vl-action-group" id="modal-action-group">
                        <slot name="button"></slot>
                        <button is="vl-button-link" data-vl-modal-close id="modal-toggle-1-cancellable">
                            <span is="vl-icon" icon="cross" before data-vl-modal-close></span>Annuleer
                        </button>
                      </div>
                </dialog>
            </div>
        `);
  }

  connectedCallback() {
    this.dress();
  }

  get _dialogElement() {
    return this._element.querySelector('dialog');
  }

  get _titleElement() {
    return this._element.querySelector('#modal-toggle-1-title');
  }

  get _actionGroupElement() {
    return this._element.querySelector('#modal-action-group');
  }

  get _cancelElement() {
    return this._element.querySelector('#modal-toggle-1-cancellable');
  }

  get _dressed() {
    return !!this.getAttribute('data-vl-modal-dressed');
  }

  /**
   * Initialiseer de modal config.
   */
  dress() {
    (async () => {
      while (!window.vl || !window.vl.modal) {
        await new Promise(resolve => setTimeout(resolve, 100));
      }

      if (!this._dressed) {
        vl.modal.dress(this._dialogElement);
      }
    })();
  }

  /**
   * Handmatig openen van modal.
   */
  open() {
    vl.modal.lastClickedToggle = this._dialogElement;
    if (!this._dialogElement.hasAttribute("open")) {
      vl.modal.toggle(this._dialogElement);
    }
  }

  /**
   * Handmatig sluiten van modal.
   */
  close() {
    if (this._dialogElement.hasAttribute("open")) {
      vl.modal.toggle(this._dialogElement);
    }
  }

  /**
   * Mogelijkheid om functies toe te voegen op events die op de dialog voorkomen.
   * @param event
   * @param callback
   */
  on(event, callback) {
    this._dialogElement.addEventListener(event, callback);
  }

  _getCloseButtonTemplate() {
    return this._template(`
            <button type="button" class="vl-modal-dialog__close" data-vl-modal-close>
                <i class="vl-modal-dialog__close__icon vl-vi vl-vi-cross" aria-hidden="true"></i>
                <span class="vl-u-visually-hidden">Venster sluiten</span>
            </button>
        `);
  }

  _getTitleTemplate(titel) {
    return this._template(`
      <h2 class="vl-modal-dialog__title" id="modal-toggle-1-title">${titel}</h2>
        `);
  }

  _getCancelTemplate() {
    return this._template(`
        <button is="vl-button-link" data-vl-modal-close id="modal-toggle-1-cancellable">
            <span is="vl-icon" icon="cross" before data-vl-modal-close></span>Annuleer
        </button>`);
  }

  _idChangedCallback(oldValue, newValue) {
    this._dialogElement.id = newValue;
  }

  _titleChangedCallback(oldValue, newValue) {
    if (newValue) {
      if (this._titleElement) {
        this._titleElement.innerText = newValue;
      } else {
        this._dialogElement.prepend(this._getTitleTemplate(newValue));
      }
    } else {
      if (this._titleElement) {
        this._titleElement.remove();
      }
    }
  }

  _cancellableChangedCallback(oldValue, newValue) {
    if (newValue !== "true" && this._cancelElement) {
      this._cancelElement.remove();
    } else if (newValue === "true" || newValue === null) {
      this._actionGroupElement.append(this._getCancelTemplate());
    }
  }

  _openChangedCallback(oldValue, newValue) {
    this._dialogElement.setAttribute('open', newValue);
  }

  _closableChangedCallback(oldValue, newValue) {
    if (newValue !== undefined) {
      this._closeButtonElement = this._getCloseButtonTemplate();
      this._dialogElement.setAttribute('data-vl-modal-closable', '');
      this._dialogElement.appendChild(this._closeButtonElement);
    } else {
      if (this._closeButtonElement) {
        this._closeButtonElement.remove();
        this._dialogElement.removeAttribute('data-vl-modal-closable');
      }
    }
  }

}

define('vl-modal', VlModal);