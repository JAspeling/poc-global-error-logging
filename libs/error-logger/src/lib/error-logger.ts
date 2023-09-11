import { logError } from './services/logger';

const original_error_handler = window.onerror;

export function run() {
  console.log('[error-logger] run (Entry point for the error-logger)');
  attachToWindowEvent();

  console.log(`[error-logger] window.onerror fn ${window.onerror ? 'already registered' : 'not registered'}`);
  setErrorFn();
}

function eventErrorFn({ filename, lineno, colno, error, message }: ErrorEvent) {
  console.log('[error-logger] window.error fired');
  logError(message, { source: filename, lineno, colno,error })
}

function attachToWindowEvent() {
  console.log('[error-logger] attachToWindowEvent');
  window.addEventListener('error', eventErrorFn);
}

function windowOnErrorFn(message: string | Event, source: string | undefined, lineno: number | undefined, colno: number | undefined, error: Error | undefined) {
  /**
   * Most events cancel the event's default behaviour be returning false.
   * However, to cancel the default behaviour of the error event of `Window`,
   * you need to return true.
   * When canceled, the error won't appear in the console, but the current script will still stop executing.
   */
  const defaultBehavior= false;
  const _message = message instanceof ErrorEvent ? (message as ErrorEvent).message : message as string;

  console.log('window.onError fired');
  logError(_message, { source, lineno, colno, error });

  return defaultBehavior;
}

/**
 * This function sets the function that will be called when an error occurs.
 * It is called when an error bubbles all the way up to the window.
 * It does not register the function as an event handler.
 */
function setErrorFn() {
  console.log('[error-logger] registering window.onerror');
  console.log()

  window.onerror = windowOnErrorFn;
}

function restoreOriginalErrorFn() {
  console.log('[error-logger] restoring original window.onerror');
  window.onerror = original_error_handler;
}

export function stop() {
  console.log('[error-logger] Stop listening and cleaning up...');
  restoreOriginalErrorFn();
  window.removeEventListener('error', eventErrorFn);
}
