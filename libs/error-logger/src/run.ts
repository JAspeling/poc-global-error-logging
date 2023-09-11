// Maybe wait for nativeBridge to be attached to window before running?

import { run } from './lib/error-logger';

console.log('[error-logger] run (Attaching to DOMContentLoaded)');
/**
 * By default, Angular bootstraps automatically upon `DOMContentLoaded`.
 * Therefor, we can't use `DOMContentLoaded` to attach to the window event.
 * This needs to be done before Angular bootstraps, as soon as possible.
 *
 * Note: This uses window.addEventListener, which means that the window must be available at the time
 * of running this script.
 *
 * To control the bootstrap process, you can disable this by adding `ng-app`
 * attribute to an HTML element, and then manually bootstrap it after your script has run.
 */
run();
