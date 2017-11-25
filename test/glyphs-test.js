describe('glyphs', () => {
  it('works', async () => {
    const glyphs = require('../src/glyphs')
    let result = await glyphs( {
      include: 'hello, world!👩‍👩‍👧‍👦  asdfvadet'
    } )
    console.log( result )
  })
})
