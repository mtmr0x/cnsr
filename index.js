const attrToMask = [
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

function replacer(string) {
  return string.replace(/./g, '*');
}

function masker(obj, inRecursion) {
  const oldObj = Object.freeze(obj || {});
  const changableObj = Object.assign({}, oldObj);
  const keyedObj = Object.keys(oldObj);

  keyedObj
    .filter(o => attrToMask.includes(o) && (typeof oldObj[o] === 'string' || typeof oldObj[o] === 'number'))
    .map(o => {
      changableObj[o] = replacer(changableObj[o].toString());
      return false;
    });

  keyedObj
    .filter(o => typeof oldObj[o] === 'object')
    .map(o => masker(oldObj[o], true));

  return changableObj;
}

function cnsr(o) {
  // Assign a new object to prevent
  // side effects in your original data
  const originalData = Object.freeze(o);
  return masker(Object.assign({}, originalData));
}

module.exports = cnsr;
