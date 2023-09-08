import { Component } from '@angular/core';
import { errorLogger } from '@error-handling/error-logger';
import { someLib } from '@error-handling/some-lib';

@Component({
  selector: 'error-handling-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'error-handling';

  constructor() {
    errorLogger();

    someLib();
  }
}
