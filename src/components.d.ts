/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */


import { HTMLStencilElement, JSXBase } from '@stencil/core/internal';
import {
  Battle,
} from './model/battle';

export namespace Components {
  interface EhtcBattle {
    'battle': Battle;
    'code': string;
  }
  interface EhtcBattleCenter {}
  interface EhtcPilot {
    'pin': number;
  }
}

declare global {


  interface HTMLEhtcBattleElement extends Components.EhtcBattle, HTMLStencilElement {}
  var HTMLEhtcBattleElement: {
    prototype: HTMLEhtcBattleElement;
    new (): HTMLEhtcBattleElement;
  };

  interface HTMLEhtcBattleCenterElement extends Components.EhtcBattleCenter, HTMLStencilElement {}
  var HTMLEhtcBattleCenterElement: {
    prototype: HTMLEhtcBattleCenterElement;
    new (): HTMLEhtcBattleCenterElement;
  };

  interface HTMLEhtcPilotElement extends Components.EhtcPilot, HTMLStencilElement {}
  var HTMLEhtcPilotElement: {
    prototype: HTMLEhtcPilotElement;
    new (): HTMLEhtcPilotElement;
  };
  interface HTMLElementTagNameMap {
    'ehtc-battle': HTMLEhtcBattleElement;
    'ehtc-battle-center': HTMLEhtcBattleCenterElement;
    'ehtc-pilot': HTMLEhtcPilotElement;
  }
}

declare namespace LocalJSX {
  interface EhtcBattle extends JSXBase.HTMLAttributes<HTMLEhtcBattleElement> {
    'battle'?: Battle;
    'code'?: string;
    'onDownloadBattle'?: (event: CustomEvent<Battle>) => void;
  }
  interface EhtcBattleCenter extends JSXBase.HTMLAttributes<HTMLEhtcBattleCenterElement> {}
  interface EhtcPilot extends JSXBase.HTMLAttributes<HTMLEhtcPilotElement> {
    'pin'?: number;
  }

  interface IntrinsicElements {
    'ehtc-battle': EhtcBattle;
    'ehtc-battle-center': EhtcBattleCenter;
    'ehtc-pilot': EhtcPilot;
  }
}

export { LocalJSX as JSX };


declare module "@stencil/core" {
  export namespace JSX {
    interface IntrinsicElements extends LocalJSX.IntrinsicElements {}
  }
}

