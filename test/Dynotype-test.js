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

      dyno.addFont( { family: 'Pacifico', weight: 400 } )
      // dyno.addFont( { family: 'Quicksand', weight: 400 } )
      // dyno.addFont( { family: 'Quicksand', weight: 500 } )
      // dyno.addFont( { family: 'Quicksand', weight: 700 } )

      dyno.addGlyphs( test.math )
      dyno.addGlyphs( {font:0},'🎨🔥🚬🐃👩🏿‍🎤' )

      dyno.setGeometry( { size: 48, rows: 6 } )

      await dyno.generate()
      await dyno.save()
    })

    it( 'works from options', async () => {
      let dyno = new Dynotype( {
        name: 'Dynotype-generate-test-options',
        fonts: [ 'Dosis', 'Arvo', 'Ranchers' ],
        glyphs: [ test.alphaNumeric ],
        size: 64,
        root: test.scratchPath()
      } )
      await dyno.generate()
      await dyno.save()
    })
  })


  describe('save', () => {
    it( 'works', async () => {
      let dyno = new Dynotype( {
        name: 'Dynotype-save-test',
        root: test.scratchPath()
      } )

      dyno.addFont( { css: 'top: 10%;' } )
      dyno.addGlyphs( test.zoo )
      dyno.setGeometry( { size: 128, charWidth: 1.1, charHeight: 1.1, rows: 7 } )

      await dyno.generate()
      await dyno.save()

      let loader = new Dynotype( {
        name: 'Dynotype-save-test',
        root: test.scratchPath()
      } )

      await loader.load()
      // assert.equal( dyno.fonts[0].family, family )
    })
  })
})
