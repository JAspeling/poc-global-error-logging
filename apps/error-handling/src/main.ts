import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';

// The following executes before the script is loaded in the index.html.
// throw new Error('Error from main.ts');

console.log('[flow] main.ts: Bootstrapping Angular');

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .then(() => {
    console.log('[flow] Angular bootstrapped');
  })
  .catch((err) => {
    console.log('[flow] Angular bootstrapping failed');
    console.error(err)
  })
  .finally(() => {
    console.log('[flow] Angular bootstrap completed');

    console.log(`[flow] window.onerror fn ${window.onerror ? 'is registered' : 'not registered'}`);
    const event = new CustomEvent('appBootstrapCompleted', { detail: true });
    window.dispatchEvent(event);
  });
