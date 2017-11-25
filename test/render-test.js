const path = require('path')
describe('render', () => {
  it('works', async () => {
    const render = require('../src/render')
    let result = await render( {
      size: 256,
      file: path.resolve( __dirname, 'scratch', 'foo.png' ),
      include: '🐶 THE QUICK BROWN FOX 🦊 JUMPED OVER THE LAZY SHEEP DOG '
    } )
    console.log( result )
  })
})
