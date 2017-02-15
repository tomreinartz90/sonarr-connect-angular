import { Component } from '@angular/core';


@Component( {
  selector: 'app', // <my-app></my-app>
  templateUrl: 'app.component.html',
} )
export class AppComponent {

  constructor() {
    // Do something with api
    console.log( 'start app' );
  }
}
