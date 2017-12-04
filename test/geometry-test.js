describe('geometry', () => {
  it('works', async () => {
    const geometry = require('../src/geometry')
    let result = await geometry( {
      count: 4
    } )
    console.log( result )
  })
})
