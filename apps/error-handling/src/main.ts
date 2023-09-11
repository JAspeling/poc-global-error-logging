import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';

console.log('Main.ts');

// The following executes before the script is loaded in the index.html.
throw new Error('Error from main.ts');

console.log('Bootstrapping Angular');

platformBrowserDynamic()
  .bootstrapModule(AppModule).then(() => {
  console.log('Angular bootstrapped');
})
  .catch((err) => console.error(err));

