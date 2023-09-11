console.log('[some-lib] init');

export function someLib(): string {
  return 'some-lib';
}

export function fetchSomeData(): Promise<any> {
  return fetch('https://jsonplaceholder.typicode.com[ERROR]/todos/1');
}

// throw new Error('Error from some-lib');
