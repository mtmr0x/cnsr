function masker(obj, maskable = []) {
  const oldObj = obj;
  const newObj = oldObj;
  const objKeys = Object.keys(oldObj);

  // iterate maskable objects for replacing
  // characters for * in case object key exists
  // in maskable array
  objKeys
    .filter(o => maskable.includes(o) && (typeof oldObj[o] === 'number' || typeof oldObj[o] === 'string'))
    .map(o => {
      newObj[o] = newObj[o].toString().replace(/./g, '*');
      return false
    });

  // filter objects in obj for recursively call
  // masker function for mask all levels data
  objKeys
    .filter(o => typeof oldObj[o] === 'object')
    .map(o => masker(newObj[o]), maskable);

  return newObj;
}

function cnsr(o, mask) {
  // Assign a new object to prevent
  // side effects in your original data
  const j = JSON.stringify(o);

  // recreate a new object based in JSON
  // for avoiding side effects
  return masker(JSON.parse(j), mask);
}

module.exports = cnsr;

