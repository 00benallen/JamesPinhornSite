import {
    trigger,
    state,
    style,
    animate,
    transition,
    query,
  } from '@angular/animations';

const openCloseAnimation = trigger('openClose', [ // define trigger, corresponds with @triggerName in template
    state('open', style({ // define state with styles
        height: '200px',
        opacity: 1,
        backgroundColor: 'yellow'
    })),
    state('closed', style({ // define state with styles
        height: '100px',
        opacity: 0.5,
        backgroundColor: 'green'
    })),
    transition('open => closed', [ // define transition and direction
        animate('1s')
    ]),
    transition('closed => open', [
        animate('0.5s')
    ]),
]);
