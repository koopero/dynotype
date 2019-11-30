const test = require('./test')

describe('image', () => {
  it('will render images', async () => {
    const Dynotype = require('../src/Dynotype')
    let dyno = new Dynotype( {
      name: 'image-test',
      dir: 'scratch/',
      root: __dirname,
    } )

    dyno.addGlyphs( { src: 'image/hexagon.png' } )
    dyno.addGlyphs( { src: 'image/heptagon.png' } )
    dyno.addGlyphs( { src: 'image/wide.jpg' } )
    dyno.addGlyphs( { src: 'image/tall.jpg' } )
    dyno.setGeometry( { size: 128 } )

    await dyno.generate()
    await dyno.save()
  })
})
