const test = require('./test')

describe('in loopin', () => {
  var loopin
  beforeEach( () => {
    loopin = require('loopin')()
    loopin.plugin('files')
    loopin.logShow('patch')
    loopin.filesRoot( test.scratchPath() )
    loopin.plugin( require('../src/plugin.js'), {
      dir: '.'
    } )

    loopin.plugin( require('loopin-native'), { verbose: true } )

    return loopin.bootstrap()
  })

  it( 'does something', async () => {
    loopin.patchYAML(`
      show:
        buffer: test
        alpha: multiply
      window:
        x: -1000
        y: 300
        width: 1000
        height: 500

      camera/view:
        zoom: 0


      pixels/pattern:
        format: hex2
        width: 2
        data: f00 00f 0f0 fff
    `)

    let textEngine = loopin.plugin( require('../src/plugin'), {
      dir: '.',
      name: 'test',
      glyphs: test.common + test.mammals,
      geometry: {
        size: 256,
      },
      fonts: [
        { family: 'Open Sans Condensed', weight: 300 },
        { family: 'Pacifico', weight: 400 }
      ],
    } )



    await textEngine.load()

    textEngine.line( { x: 0.1, y: 0, size: 0.4 }, 'Hello, ', {font:1}, ' world!' )

    async function critters() {
      let set = '🐵🐶🐻🐶🐱🐭🐹🐰🐻🐼🐨🐯🐮🐷'
      set = require('runes')( set )
      let length = 6
      let result = ''
      while ( length-- )
        result += set[Math.floor( Math.random() * set.length )]

      textEngine.line( { x: 0, y: 0 }, result )
      await loopin.Promise.delay( 50 )
    }

    async function time( t ) {

    }

    // while(1) { await critters() }

    //
    // const Mesh = require('../src/mesh')
    // let mesh = new Mesh()
    // mesh.addQuad( {
    //   width: 0.2,
    //   rotation: 15
    // } )
    //
    // mesh.addQuad( {
    //   width: 0.2,
    //   rotation: -15,
    //   bottom: 0.5,
    // } )
    // loopin.patch( mesh, 'mesh/test' )

    await loopin.Promise.delay( 10000 )
  })

  afterEach( () => {
    return loopin.close()
  })
})
