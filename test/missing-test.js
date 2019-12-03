const test = require('./test')
const assert = test.assert
const _ = require('lodash')

describe('missing', () => {
  const Dynotype = require('../src/Dynotype')
  it('works', async () => {
    const dyno = new Dynotype( {
      name: 'missing-test',
      fonts: [ 'Anonymous Pro' ],
      glyphs: [ test.octal ],
      missing: '?',
      size: 64,
      root: test.scratchPath(),
    } )
    await dyno.generate()
    await dyno.save()

    let glyph = dyno.glyph( '9' )

    console.log( glyph )
  })
})
