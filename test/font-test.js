const test = require('./test')

describe('font', () => {
  it('works', async () => {
    const fontfile = require('../src/fontfile')
    let result = await fontfile( {
      root: test.scratchPath(),
      dir: '.',
      family: 'Indie Flower',
      weight: 400
    } )
    console.log( result )
  })
})
