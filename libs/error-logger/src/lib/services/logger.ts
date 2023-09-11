// interface dictionary
type Context = {
  [key: string]: any
}

function logBrowser(applicationLog: any) {
  const logMessage = {
    timestamp: new Date().getTime(),
    application: [applicationLog],
  };

  // use xmlHttpRequest because every browser supports it
  // This will be sent to the rabobank log collector service.
  console.log('%c[logger browser]%c',
    'background-color: blue',
    'background-color: reset',
    logMessage
  );

  const xmlhttp = new XMLHttpRequest();
  xmlhttp.open('POST', 'https://log.rabobank.nl/messages');
  xmlhttp.setRequestHeader('Content-Type', 'text/plain');
  xmlhttp.send(JSON.stringify(logMessage));
}

function getContext(context?: Context): Context {
  const defaultContext = {};

  return Object.assign({}, defaultContext, context);
}


function log(
  message: string,
  context?: Context,
  level: any = 'INFO'
) {
  const _context = getContext(context);

  const applicationLog = {
    feature: 'global-error-logger',
    level: level,
    message: message,
    timestamp: new Date().getTime(),
    environment: window?.location?.href,
    context: _context,
  };

  try {
    logBrowser(applicationLog);
  } catch (e) {
    console.error(e);
  }
}

export function logError(message: string, context?: Context) {
  log(message, context, 'ERROR');
}

export function logInfo(message: string, context?: Context) {
  log(message, context, 'INFO');
}
