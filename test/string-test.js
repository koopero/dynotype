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

  it('passes images', () => {
    let glyphs = string( { src: 'img/foo1.png' }, '👩🏿‍🎤', { src: 'img/foo2.png' } )
    assert.isArray( glyphs )
    assert.equal( glyphs.length, 3 )
    assert.deepEqual( glyphs[2], { src: 'img/foo2.png' } )
  })

  it('passes colours', () => {
    let glyphs = string( { colour: 'red' }, 'foo', { text: 'bar', colour: { hue: 4/6 } } )
    assert.isArray( glyphs )
    assert.equal( glyphs.length, 6 )
    assert.deepEqual( glyphs[0].colour.red, 1 )
    assert.deepEqual( glyphs[0].colour.blue, 0 )
    assert.deepEqual( glyphs[3].colour.red, 0 )
    assert.deepEqual( glyphs[3].colour.blue, 1 )
  })
})
