const test = require('./test')
    , assert = test.assert
    , _ = require('lodash')
describe('line', () => {
  const Dynotype = require('../src/Dynotype')

  var dyno

  before( async () => {
    dyno = new Dynotype( {
      name: 'line-test-font',
      fonts: [ 'Dosis', 'Arvo', 'Ranchers' ],
      glyphs: [ test.alphaNumeric ],
      size: 64,
      root: test.scratchPath()
    } )
    // await dyno.generate()
    // await dyno.save()
    await dyno.refresh()
  })

  it('works', async () => {
    const glyphs = dyno.line( {font: 2, x: 1, align: 'centre', size: 0.5 },'Hello, world!')
    console.log( _.map( glyphs, glyph => _.pick( glyph, 'x' ) ) )
    console.log( _.map( glyphs ) )

  })
})
