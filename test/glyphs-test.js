const test = require('./test')
    , assert = test.assert
describe('glyphs', () => {
  it('works', async () => {
    const glyphs = require('../src/glyphs')
    let result = await glyphs( {
      include: '👩'
    } )
    assert.isArray( result )
  })


  it('appends', async () => {
    let glyphs = require('../src/glyphs')( {
      include: 'abc'
    } )

    glyphs = require('../src/glyphs')( {
      glyphs,
      include: 'acbd'
    } )

    assert.isArray( glyphs )
    assert.equal( glyphs.length, 4 )
  })

  it('appends multiple fonts', async () => {
    let glyphs = require('../src/glyphs')( {
      include: 'abcd'
    } )

    glyphs = require('../src/glyphs')( {
      glyphs,
      font: 1,
      include: 'acbd'
    } )

    assert.isArray( glyphs )
    assert.equal( glyphs.length, 8 )
  })
})
