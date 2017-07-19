function masker(obj, maskable = []) {
  const newObj = obj;
  const objKeys = Object.keys(obj);

  // iterate maskable objects for replacing
  // characters for * in case object key exists
  // in maskable array
  objKeys
    .filter(o => maskable.includes(o) && (typeof obj[o] === 'number' || typeof obj[o] === 'string'))
    .map(o => {
      newObj[o] = newObj[o].toString().replace(/./g, '*');
      return false
    });

  // filter objects in obj for recursively call
  // masker function for mask all levels data
  objKeys
    .filter(o => typeof obj[o] === 'object')
    .map(o => masker(newObj[o], maskable));

  return newObj;
}

function cnsr(obj, mask) {
  if (typeof obj !== 'object') {
    throw new TypeError(`cnsr expects an object but received ${typeof obj}`);
  }

  if (typeof mask !== 'object' || !mask.length) {
    throw new TypeError('cnsr second parameter is a required Array of strings for matching maskable data in your object. For more information see docs and usage at https://github.com/mtmr0x/cnsr');
  }
  // Assign a new object to prevent
  // side effects in your original data
  const j = JSON.stringify(obj);

  // recreate a new object based in JSON
  // for avoiding side effects
  return masker(JSON.parse(j), mask);
}

module.exports = cnsr;

