/**
 * Created by Reinartz.T on 15-2-2017.
 */
import { trigger, state, animate, style, transition, keyframes, AnimationEntryMetadata } from '@angular/core';

export function routerTransition(): AnimationEntryMetadata {
  return fadeInOut();
}

export function serieDetailAnimation() {
  return slideToTop();
}

function slideToTop() {
  return trigger( 'slideToTop', [
    state( 'void', style( { position: 'fixed', width: '100%' } ) ),
    state( '*', style( { position: 'fixed', width: '100%' } ) ),
    transition( ':enter', [  // before 2.1: transition('void => *', [
      style( { transform: 'translateY(100%)' } ),
      animate( '0.3s ease-in-out', style( { transform: 'translateY(0%)' } ) )
    ] ),
    transition( ':leave', [  // before 2.1: transition('* => void', [
      style( { transform: 'translateY(0%)' } ),
      animate( '0.3s ease-in-out', style( { transform: 'translateY(100%)' } ) )
    ] )
  ] );
}

export function fadeInOut() {
  return trigger( 'fadeInOut', [
    state( 'show', style( { opacity: 1 } ) ),
    state( 'hide', style( { opacity: 0 } ) ),
    transition( '* => *', animate( '.5s' ) )
  ] )
}


function flyInOut() {
  return trigger( 'flyInOut', [
    state( 'in', style( { transform: 'translateY(0)' } ) ),
    transition( 'void => *', [
      animate( 300, keyframes( [
        style( { opacity: 0, transform: 'translateY(-100%)', offset: 0 } ),
        style( { opacity: 1, transform: 'translateY(15px)', offset: 0.3 } ),
        style( { opacity: 1, transform: 'translateY(0)', offset: 1.0 } )
      ] ) )
    ] ),
    transition( '* => void', [
      animate( 300, keyframes( [
        style( { opacity: 1, transform: 'translateY(0)', offset: 0 } ),
        style( { opacity: 1, transform: 'translateY(15px)', offset: 0.7 } ),
        style( { opacity: 0, transform: 'translateY(-100%)', offset: 1.0 } )
      ] ) )
    ] )
  ] )
}
