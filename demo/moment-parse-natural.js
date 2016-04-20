(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.momentParseNatural = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var parseNatural = require('./lib/parse-natural')
module.exports = parseNatural

/* istanbul ignore next */
if (typeof window !== 'undefined' && window.moment) {
  window.moment.parseNatural = parseNatural
}

},{"./lib/parse-natural":2}],2:[function(require,module,exports){
var moment = require('moment')
module.exports = parseNatural

function parseNatural (string) {
  if (string.match('tod(ay)?') || string.match('now')) {
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
  if (moment_parsed.isValid()) {
    return moment_parsed
  }

  var local_data = moment.localeData(moment.locale())

  var i = words.length
  while (i-- && !month) {
    month = local_data.monthsParse(words[i]) || false
    if (month) {
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

},{"moment":"moment"}],"moment":[function(require,module,exports){

},{}]},{},[1])("moment")
});