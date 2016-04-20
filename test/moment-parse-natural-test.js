'use strict'

var test = require('tape')
var moment = require('moment')

moment.parseNatural = require('../index')

test('absolute dates', function (t) {
  var days = [
    '2016/04/25',
    '2010/03/03'
  ]
  for (var i = 0; i < days.length; i++) {
    t.equals(moment.parseNatural(days[i]).format('YYYY/MM/DD'), days[i], days[i])
  }
  t.end()
})

test('today', function (t) {
  t.equal(moment.parseNatural('today').format('MM/DD/YYYY'), moment().format('MM/DD/YYYY'), 'today')
  t.equal(moment.parseNatural('tod').format('MM/DD/YYYY'), moment().format('MM/DD/YYYY'), 'today')
  t.end()
})

test('tomorrow', function (t) {
  t.equal(moment.parseNatural('tomorrow').format('MM/DD/YYYY'), moment().add('days', 1).format('MM/DD/YYYY'), 'tomorrow')
  t.equal(moment.parseNatural('tom').format('MM/DD/YYYY'), moment().add('days', 1).format('MM/DD/YYYY'), 'tom')
  t.end()
})

test('yesterday', function (test) {
  test.equal(moment.parseNatural('yesterday').format('MM/DD/YYYY'), moment().subtract('days', 1).format('MM/DD/YYYY'), 'yesterday')
  test.end()
})

test('Apr', function (test) {
  test.equal(moment.parseNatural('Apr').format('MM'), '04', 'Apr')
  test.end()
})

test('25 Apr', function (test) {
  test.equals(moment.parseNatural('25 Apr').format('MM/DD'), '04/25', '25 Apr')
  test.equals(moment.parseNatural('25th Apr').format('MM/DD'), '04/25', '25th Apr')
  test.equals(moment.parseNatural('Apr 25th').format('MM/DD'), '04/25', 'Apr 25th')
  test.end()
})

test('2 days', function (test) {
  test.equals(moment.parseNatural('2 days').format('MM/DD'), moment().add('days', 2).format('MM/DD'), '2 days')
  test.end()
})

test('3 weeks ago', function (test) {
  test.equals(moment.parseNatural('3 weeks ago').format('MM/DD/YYYY'), moment().subtract('weeks', 3).format('MM/DD/YYYY'), '3 weeks ago')
  test.end()
})

test('last year', function (test) {
  test.equals(moment.parseNatural('last year').format('MM/DD/YYYY'), moment().subtract('years', 1).format('MM/DD/YYYY'), 'last year')
  test.end()
})
