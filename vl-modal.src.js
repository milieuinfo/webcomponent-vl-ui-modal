import {VlElement} from '/node_modules/vl-ui-core/vl-core.js';
import {VlLink} from '/node_modules/vl-ui-link/vl-link.js';
import {VlIcon} from '/node_modules/vl-ui-icon/vl-icon.js';
import {VlActionGroup} from '/node_modules/vl-ui-action-group/vl-action-group.src.js';

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
 * @property {boolean} open - Attribuut wordt gebruikt om aan te duiden dat de modal onmiddellijk geopend moet worden na het renderen.
 * @property {boolean} closable - Attribuut wordt gebruikt om aan te duiden dat de modal sluitbaar is.
 */
export class VlModal extends VlElement(HTMLElement) {
  static get _observedAttributes() {
    return ['id', 'title', 'closable', 'open'];
  }

  constructor() {
    super(`
            <style>
                @import '../style.css';
                @import '/node_modules/vl-ui-icon/style.css';
                @import '/node_modules/vl-ui-link/style.css';
                @import '/node_modules/vl-ui-action-group/style.css';
            </style>

            <div class="vl-modal">
                <dialog class="vl-modal-dialog" data-vl-modal tabindex="-1" role="dialog" aria-modal="true" aria-hidden="true" aria-labelledby="modal-toggle-1-title" aria-describedby="modal-toggle-1-description">
                    <h2 class="vl-modal-dialog__title" id="modal-toggle-1-title">Modal titel</h2>
                    <div class="vl-modal-dialog__content" id="modal-toggle-1-description">
                        <slot name="content">Modal content</slot>
                    </div>
                    <div is="vl-action-group">
                        <slot name="button"></slot>
                        <a href="#" is="vl-link" data-vl-modal-close>
                            <span is="vl-icon" icon="cross" before data-vl-modal-close></span>Annuleer
                        </a>
                    </div>
                </dialog>
            </div>
        `);
  }

  connectedCallback() {
    this.dress();
  }

  get _dialog() {
    return this._element.querySelector('dialog');
  }

  get _titleElement() {
    return this._element.querySelector('#modal-toggle-1-title');
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
        vl.modal.dress(this._dialog);
      }
    })();
  }

  /**
   * Handmatig openen van modal.
   */
  open() {
    (async () => {
      while (!window.vl || !window.vl.modal) {
        await new Promise(resolve => setTimeout(resolve, 100));
      }

      vl.modal.lastClickedToggle = this._dialog;
      if (!this._dialog.hasAttribute("open")) {
        vl.modal.toggle(this._dialog);
      }
    })();
  }

  /**
   * Handmatig sluiten van modal.
   */
  close() {
    (async () => {
      while (!window.vl || !window.vl.modal) {
        await new Promise(resolve => setTimeout(resolve, 100));
      }

      if (this._dialog.hasAttribute("open")) {
        vl.modal.toggle(this._dialog);
      }
    })();
  }

  _getCloseButtonTemplate() {
    return this._template(`
            <button type="button" class="vl-modal-dialog__close" data-vl-modal-close>
                <i class="vl-modal-dialog__close__icon vl-vi vl-vi-cross" aria-hidden="true"></i>
                <span class="vl-u-visually-hidden">Venster sluiten</span>
            </button>
        `);
  }

  _idChangedCallback(oldValue, newValue) {
    this._dialog.id = newValue;
  }

  _titleChangedCallback(oldValue, newValue) {
    this._titleElement.innerText = newValue;
  }

  _openChangedCallback(oldValue, newValue) {
    this._dialog.setAttribute('open', newValue);
  }

  _closableChangedCallback(oldValue, newValue) {
    if (newValue !== undefined) {
      this._closeButtonElement = this._getCloseButtonTemplate();
      this._dialog.setAttribute('data-vl-modal-closable', '');
      this._dialog.appendChild(this._closeButtonElement);
    } else {
      if (this._closeButtonElement) {
        this._closeButtonElement.remove();
        this._dialog.removeAttribute('data-vl-modal-closable', '');
      }
    }
  }

};

customElements.define('vl-modal', VlModal);