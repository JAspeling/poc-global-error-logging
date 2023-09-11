type Context = Record<string, string>;

function logBrowser(applicationLog: any) {
  const logMessage = {
    timestamp: new Date().getTime(),
    application: [applicationLog],
  };

  // use xmlHttpRequest because every browser supports it
  const xmlhttp = new XMLHttpRequest();
  xmlhttp.open('POST', 'https://log.rabobank.nl/messages');
  xmlhttp.setRequestHeader('Content-Type', 'text/plain');
  xmlhttp.send(JSON.stringify(logMessage));
}

function getContext(context: Context): Context {
  const defaultContext = {};

  return Object.assign({}, defaultContext, context);
}


function log(
  message: string,
  context: Context,
  level: any
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
