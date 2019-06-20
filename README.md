# webcomponent-vl-ui-modal
De ["modal" UI component van Webuniversum Vlaanderen](https://overheid.vlaanderen.be/webuniversum/v3/documentation/js-components/vl-ui-modal/) als Web Component

## Installation
```
npm install --save vl-ui-modal
```

## Demo
```
npm run demo
```

## <a name="gebruik"></a>Gebruik
```
      <button is="vl-button" data-vl-modal-open="modal-1">Open</button>
      <vl-modal id="modal-1" ... >
        <... slot="content" ... > ... </...>
        <... slot="button" ... > ... </...>
      </vl-modal>
```

## Kanttekening
- De modal element heeft 2 slots, 1 voor content en 1 voor een button (zie [Gebruik](#gebruik))
- De styling van de `button` slot is terug te vinden in [vl-ui-action-group](https://github.com/milieuinfo/webcomponent-vl-ui-action-group)
- Deze component laadt de volgende javascript bestanden in (minified versies): util.js, core.js en modal.js

## Credits
Zie de lijst van [ontwikkelaars](https://github.com/milieuinfo/webcomponent-vl-ui-select/graphs/contributors) die meegewerkt hebben aan de webcomponent.

## Contact
Mail je suggesties, opmerkingen of tips naar [help@omgevingvlaanderen.be](mailto:help@omgevingvlaanderen.be)
