describe('Library', () => {
  const Library = require('../src/Library')
  it('will load font-awesome', async () => {
    let lib = new Library( {
      require: 'font-awesome',
      css: 'css/font-awesome.css',
      prefix: '.fa-'
    })
    let result = await lib.loadCSS()
    console.log(result)
  })

  it('will load weathericons', async () => {
    let lib = new Library( {
      require: 'weathericons',
      css: 'css/weather-icons.css',
      prefix: '.wi-'
    })
    let result = await lib.loadCSS()
    console.log(result)
  })
})