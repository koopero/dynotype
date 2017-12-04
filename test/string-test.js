const test = require('./test')
    , assert = test.assert

describe('string', () => {
  const string = require('../src/string')

  it('works', async () => {

    let glyphs = string('Foo Bar')

    assert.isArray( glyphs )
    assert.isObject( glyphs[0] )
    assert.equal( glyphs[0].text, 'F' )
  })

  it('adds fonts', async () => {

    let glyphs = string({font: 2}, 'Foo Bar')

    assert.equal( glyphs[2].font, 2 )
  })


})
