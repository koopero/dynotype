describe('geometry', () => {
  it('works', async () => {
    const geometry = require('../src/geometry')
    let result = await geometry( {
      include: 'hello, world!👩‍👩‍👧‍👦  asdfvadet46uereryjen ewtbabAW 3 2T'
    } )
    console.log( result )
  })
})
