const test = exports
test.mammals = '🐵🐶🐻🐶🐱🐭🐹🐰'
test.zoo = '🐵🐶🐻🐶🐱🐭🐹🐰🐻🐼🐨🐯🐮🐷🐸🐵🙈🙉🙊🐒🐔🐧🐦🐤🐥🐝🐛🐌🐢🐍🐙🐠🐟🐡🐬🐳🐋🐊🐆🐅🐃🐂🐄🐪🐫🐘🐎🐖🐐🐏🐑🐕🐩🐈🐓'
test.alphabet = 'abcdefghjklmnopqrstuvwxyzABCDEFGHJKLMNOPQRSTUVWXYZ'
test.numbers = '0123456789'
test.math = test.numbers + 'xXeEn-+÷=*+.:()t¼½¾[]{}*/<>!?π'
test.symbols = ' ~`!@#$%^&*()_+=-[]{};\';",./<>?'
test.common = test.alphabet + test.numbers + test.symbols

const assert = require('chai').assert
    , pathlib = require('path')

test.assert = assert
test.scratchPath = pathlib.resolve.bind( pathlib, __dirname, 'scratch' )
