const test = require('./test')

describe('html', () => {
  it('works', async () => {
    const html = require('../src/html')
        , fonts = await test.fonts()
        , glyphs = await test.glyphs()
        , geom = require('../src/geometry')( { size: 64, glyphs } )

    let result = await html( {
      fonts,
      geom, glyphs
    } )

    console.log( result )

    await test.scratchOutput( 'html-test.html', result )
  })
})
