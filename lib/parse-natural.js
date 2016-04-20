var moment = require('moment')
module.exports = parseNatural

function parseNatural (string) {
  if (string.match('tod(ay)?')) {
    return moment()
  }
  if (string.match('tom(orrow)?')) {
    return moment().add(1, 'days')
  }
  if (string.match('yes(terday)?')) {
    return moment().subtract(1, 'days')
  }

  var month = false
  var day = false
  var year = false
  var unit = false
  var is_subtracting
  var amount
  var matches
  var words = string.split(/(\s+|\b)/)

  var d

  // attempt to match things like last year, 30 seconds ago, next week, etc.
  matches = string.match(/(year|month|week|day|hour|minute|second)/)
  if (matches) {
    unit = matches[1]
    amount = 1
    matches = string.match(/\d+/)
    if (matches) {
      amount = matches[0]
    }

    is_subtracting = false
    matches = string.match(/(last|previous| ago)/)
    if (matches) {
      is_subtracting = true
    }

    if (string.match(/-\d/)) {
      is_subtracting = true
    }

    unit += 's'

    if (is_subtracting) {
      return moment().subtract(amount, unit)
    }
    return moment().add(amount, unit)
  }

  var moment_parsed = moment(string)
  if ( moment_parsed.isValid() ) {
    return moment_parsed
  }

  var local_data = moment.localeData(moment.locale())

  var i = words.length
  while (i-- && !month) {
    month = local_data.monthsParse(words[i]) || false
    if (month ) {
      words.splice(i, 1)
      break
    }
  }



  i = words.length
  while (i--) {
    matches = words[i].match(/\d\d\d\d/)
    if (matches) {
      year = matches[0]
      words.splice(i, 1)
      break
    }
  }

  i = words.length
  while (i--) {
    matches = words[i].match(/\d\d?/)
    if (matches) {
      day = matches[0]
      words.splice(i, 1)
      break
    }
  }

  if (month !== false || day !== false || year !== false) {
    d = new Date()
    if (month !== false) {
      d.setMonth(month)
    }

    if (year !== false) {
      d.setYear(year)
    }

    if (day !== false) {
      d.setMonth(d.getMonth(), day)
    }
    return moment(d)
  }

  return moment(string)
}
