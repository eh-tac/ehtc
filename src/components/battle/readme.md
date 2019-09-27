# ehtc-battle



<!-- Auto Generated Below -->


## Properties

| Property | Attribute | Description | Type     | Default     |
| -------- | --------- | ----------- | -------- | ----------- |
| `battle` | --        |             | `Battle` | `undefined` |
| `code`   | `code`    |             | `string` | `undefined` |


## Events

| Event            | Description | Type                  |
| ---------------- | ----------- | --------------------- |
| `downloadBattle` |             | `CustomEvent<Battle>` |


## Dependencies

### Used by

 - [ehtc-battle-center](../battle-center)

### Depends on

- ion-segment
- ion-segment-button
- ion-label
- ion-list
- ion-list-header
- ion-item
- ion-button
- ion-note
- ion-badge
- ion-icon

### Graph
```mermaid
graph TD;
  ehtc-battle --> ion-segment
  ehtc-battle --> ion-segment-button
  ehtc-battle --> ion-label
  ehtc-battle --> ion-list
  ehtc-battle --> ion-list-header
  ehtc-battle --> ion-item
  ehtc-battle --> ion-button
  ehtc-battle --> ion-note
  ehtc-battle --> ion-badge
  ehtc-battle --> ion-icon
  ion-segment-button --> ion-ripple-effect
  ion-item --> ion-icon
  ion-item --> ion-ripple-effect
  ion-button --> ion-ripple-effect
  ehtc-battle-center --> ehtc-battle
  style ehtc-battle fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
