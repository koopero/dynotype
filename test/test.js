const test = exports
const path = require('path')
const fs = require('fs-extra')


test.assert = require('chai').assert


test.scrathPath = path.resolve.bind( path, __dirname, 'scratch' )
test.scratchOutput = ( file, data ) => fs.outputFile( test.scrathPath( file ), data )


test.fonts = async function () {
  let fonts = [
    require('../src/fontfile')( {
      root: test.scrathPath(),
      dir: '.',
      family: 'Monoton',
      weight: 400
    }),
    require('../src/fontfile')( {
      root: test.scrathPath(),
      dir: '.',
      family: 'Quicksand',
      weight: 300
    }),
  ]
  return Promise.all( fonts )
}


test.glyphs = function () {
  let glyphs = require('../src/glyphs')( {
    include: ' The Quick Brown Fox Jumped Over The Lazy Sheep Dog 👩‍ 👦🎨🔥🚬  สวัสดีครับ ສະບາຍດີ 0123456789 !@#$%^&*()'
  })

  return glyphs
}
