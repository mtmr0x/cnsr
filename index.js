const whatToMask = [
  'cpf',
  'password',
  'postcode',
  'number',
  'authCode',
  'verificationCode',
  'holder',
  'expirationMonth',
  'expirationYear',
  'taxDocument',
];

function masker(obj) {
  const oldObj = obj;
  const newObj = oldObj;
  const objKeys = Object.keys(oldObj);

  objKeys
    .filter(o => whatToMask.includes(o) && (typeof oldObj[o] === 'number' || typeof oldObj[o] === 'string'))
    .map(o => {
      newObj[o] = newObj[o].toString().replace(/./g, '*');
      return false
    });

  objKeys
    .filter(o => typeof oldObj[o] === 'object')
    .map(o => masker(newObj[o]));

  return newObj;
}

function cnsr(o) {
  // Assign a new object to prevent
  // side effects in your original data
  const j = JSON.stringify(o);
  return masker(JSON.parse(j));
}

module.exports = cnsr;

