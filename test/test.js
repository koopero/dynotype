const test = exports
const path = require('path')
const fs = require('fs-extra')


test.scrathPath = path.resolve.bind( path, __dirname, 'scratch' )
test.scratchOutput = ( file, data ) => fs.outputFile( test.scrathPath( file ), data )


test.fonts = async function () {
  let font = await require('../src/fontfile')( {
    root: test.scrathPath(),
    dir: '.',
    family: 'Lobster',
    weight: 400
  })
  let fonts = [ font ]
  return Promise.all( fonts )
}


test.glyphs = async function () {
  return await require('../src/glyphs')( {
    include: 'The Quick Brown Fox Jumped Over The Lazy Sheep Dog 👦🎨🔥🚬  สวัสดีครับ ສະບາຍດີ 0123456789 !@#$%^&*()'
  })
}
