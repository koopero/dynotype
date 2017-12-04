const test = require('./test')
describe('render', () => {
  const render = require('../src/render')

  it('works', async () => {

    let glyphs = await test.glyphs()
    let fonts  = await test.fonts()
    let geom   = await require('../src/geometry')( { size: 128, glyphs } )
    let html   = await require('../src/html')( { fonts, glyphs, geom } )

    await test.scratchOutput( 'render-test.html',  html )

    let result = await render( {
      html,
      glyphs,
      geom,
      file: test.scrathPath( (new Date().getTime() )+'.png' ),
    } )
    console.log( result )
  })
})
