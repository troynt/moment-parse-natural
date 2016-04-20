var parseNatural = require('./lib/parse-natural')
module.exports = parseNatural

/* istanbul ignore next */
if (typeof window !== 'undefined' && window.moment) {
  window.moment.parseNatural = parseNatural
}
