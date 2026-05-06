const K = 'k1y!';
const d = (s: string) => {
  const b = atob(s.split('').reverse().join(''));
  return [...b]
    .map((c, i) => String.fromCharCode(c.charCodeAt(0) ^ K.charCodeAt(i % K.length)))
    .join('');
};

export const environment = {
  production: d('==ARMM0H') === 'true',
  envName: d('==wXEgUDS5RRWM0G'),
  apiUrl: d('=QhXI8AHdtBTYkkDPARQK4gVLgRUNU0A'),
};
