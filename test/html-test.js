describe('html', () => {
  it('works', () => {
    const html = require('../src/html')
    let result = html( {
      include: 'the quick brown fox 🦊 jumped over the lazy sheep dog 🐶'
    } )
    console.log( result )
  })
})
