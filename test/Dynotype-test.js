const test = require('./test')
    , assert = test.assert

describe('Dynotype', () => {
  const Dynotype = require('../src/Dynotype')

  it('works', async () => {
    let dyno = new Dynotype( {
      root: test.scratchPath()
    } )
  })

  describe('.addFont', () => {
    it( 'works', async () => {
      let family = 'Fredoka One'
      let dyno = new Dynotype( {
        root: test.scratchPath()
      } )

      await dyno.addFont( family )

      assert.isArray( dyno.fonts )
      assert.equal( dyno.fonts[0].family, family )
    })
  })

  describe('.addGlyphs', () => {
    it( 'works', () => {
      let dyno = new Dynotype( {
        root: test.scratchPath()
      } )

      dyno.addGlyphs( 'foo', { font: 1 }, 'bar' )

      assert.isArray( dyno.glyphs )
      assert.equal( dyno.glyphs.length, 5 )
      assert.deepEqual( dyno.glyphs[4], { text: 'r', font: 1, index: 4 } )
    })
  })

  describe('.glyph', () => {
    it( 'works', () => {
      let dyno = new Dynotype( {} )

      dyno.addGlyphs( 'foo', { font: 1 }, 'bar' )

      assert.deepEqual( dyno.glyph( 'f' ), { font: 0, index: 0, text: 'f' } )
      assert.deepEqual( dyno.glyph( 'a' ), { font: 1, index: 3, text: 'a' } )
      assert.deepEqual( dyno.glyph( { font: 0 }, 'a' ), undefined )
    })
  })

  describe('.setGeometry', () => {
    it( 'works', () => {
      let dyno = new Dynotype( {} )

      dyno.addGlyphs( 'foobar' )
      dyno.setGeometry( 64 )

      assert.isObject( dyno.geometry )
      assert.equal( dyno.geometry.rows, 2 )
    })
  })



  describe('.generate', () => {
    it( 'works', async () => {
      let dyno = new Dynotype( {
        name: 'Dynotype-generate-test',
        root: test.scratchPath()
      } )

      dyno.addFont( { family: 'Quicksand', weight: 300 } )
      dyno.addFont( { family: 'Quicksand', weight: 400 } )
      dyno.addFont( { family: 'Quicksand', weight: 500 } )
      dyno.addFont( { family: 'Quicksand', weight: 700 } )

      dyno.addGlyphs( '01234567890+-.:()t¼½[]{}*/x<>' )
      dyno.addGlyphs( {font:0},'🎨🔥🚬🐃' )

      dyno.setGeometry( { size: 48, rows: 6 } )

      await dyno.generate()
      // assert.equal( dyno.fonts[0].family, family )
    })

    it( 'works from options', async () => {
      let dyno = new Dynotype( {
        name: 'Dynotype-generate-test-options',
        fonts: [ 'Dosis', 'Arvo', 'Ranchers' ],
        glyphs: [ ' abcdefghijklmnopqrstuvwxyz01234567890' ],
        size: 64,
        root: test.scratchPath()
      } )
      await dyno.generate()
      // assert.equal( dyno.fonts[0].family, family )
    })
  })
})
