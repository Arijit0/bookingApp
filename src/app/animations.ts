import {trigger,state,style,animate,transition} from '@angular/animations';


export let openClose=trigger('openClose', [
    // ...
    state('open', style({
      
      overflow:'hidden'
      
    })),
    state('closed', style({
      height: "0",
      overflow:'hidden',
      opacity:'0',
      visibility:'hidden'
    })),
    transition('open <=> closed', [
      animate('100ms')
    ])
  ]);

  export let fade=trigger('openClose', [
    // ...
    state('open', style({
      
        opacity:'0'
      
    })),
    state('closed', style({
        opacity:'1'
    })),
    transition('open <=> closed', [
      animate('2000 ms')
    ])
  ]);