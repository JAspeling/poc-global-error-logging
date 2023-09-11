import { Component } from '@angular/core';
import { someLib } from '@error-handling/some-lib';

@Component({
  selector: 'error-handling-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'error-handling';

  constructor() {
    someLib();
    // console.log('[flow] AppComponent constructor, throwing error...')
    // throw new Error('Error from AppComponent constructor');
  }

  ngOnInit() {
    console.log('[flow] AppComponent ngOnInit, throwing error...');
    throw new Error('Error from AppComponent ngOnInit');
  }
}
