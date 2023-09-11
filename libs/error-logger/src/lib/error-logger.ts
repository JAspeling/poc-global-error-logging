export function run() {
  console.log('[error-logger] run');
  attachToWindowEvent();
  setErrorFn();
}

function attachToWindowEvent() {
  console.log('[error-logger] attachToWindowEvent');
  window.addEventListener('error', (event) => {
    console.log('[error-logger] window error', event);
  });
}

function setErrorFn() {
  console.log('[error-logger] setErrorFn');
  window.onerror = function (message, source, lineno, colno, error) {
    console.log('[error-logger] window onerror', message, source, lineno, colno, error);
  }
}

