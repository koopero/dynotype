const test = exports
const path = require('path')
const fs = require('fs-extra')


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
    include: ' ꠀ	ꠁ	ꠂ	ꠃ	ꠄ	ꠅ	꠆	ꠇ	ꠈ	ꠉ	ꠊ	ꠋ	ꠌ	ꠍ	ꠎ	ꠏ The Quick Brown Fox Jumped Over The Lazy Sheep Dog 👩‍ 👦🎨🔥🚬🍤🍳🎥🎮🐃 0123456789 !@#$%^&*()=_+\\/\'"[]{};:.,?~'
  })

  return glyphs
}
