const test = exports
const path = require('path')
const fs = require('fs-extra')

test.zoo = '🐵🐶🐻🐶🐱🐭🐹🐰🐻🐼🐨🐯🐮🐷🐸🐵🙈🙉🙊🐒🐔🐧🐦🐤🐥🐝🐛🐌🐢🐍🐙🐠🐟🐡🐬🐳🐋🐊🐆🐅🐃🐂🐄🐪🐫🐘🐎🐖🐐🐏🐑🐕🐩🐈🐓'
test.math = '0123456789xXeEn-+÷=*+.:()t¼½¾[]{}*/<>!?π'
test.alphaNumeric = ' abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ01234567890'
test.assert = require('chai').assert


test.scratchPath = path.resolve.bind( path, __dirname, 'scratch' )
test.scratchOutput = ( file, data ) => fs.outputFile( test.scratchPath( file ), data )


test.fonts = async function () {
  let fonts = [
    require('../src/fontfile')( {
      root: test.scratchPath(),
      dir: '.',
      family: 'Noto Sans',
      weight: 400
    }),
    
    require('../src/fontfile')( {
      root: test.scratchPath(),
      dir: '.',
      family: 'Quicksand',
      weight: 300
    }),
  ]
  return Promise.all( fonts )
}


test.glyphs = function () {
  let glyphs = require('../src/glyphs')( {
    include: 'The Quick Brown Fox Jumped Over The Lazy Sheep Dog 👩‍ 👦🎨🔥🚬🍤🍳🎥🎮🐃 0123456789 !@#$%^&*()=_+\\/\'"[]{};:.,?~'
  })

  return glyphs
}
