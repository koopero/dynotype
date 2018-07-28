const test = require('./test')
    , assert = test.assert

describe('Mesh', () => {
  const Mesh = require('../src/mesh')

  it('works', () => {
    let mesh = new Mesh()

    assert.isObject( mesh )
    assert.isArray( mesh.vertex )
    assert.isArray( mesh.index )
    assert.equal( mesh.mode, 'triangle' )

    // mesh.addTriangle( [1,2,3], [4,5,6], [6,7,8] )
    // mesh.addVertex( 2, 2, 2 )

    mesh.addQuad( { z: -0.9, top: 0.5, width: 0.4, height: 0.4, rotation: 90 } )

    console.log( mesh )
  })
})

describe('Vertex', () => {
  const Vertex = require('../src/mesh').Vertex

  it('from args', () => {
    let vert = Vertex( 1, 2, 3 )
    assert.isArray( vert )
    assert.equal( vert.length, 12 )
    assert.equal( vert[0], 1 )
    assert.equal( vert[1], 2 )
    assert.equal( vert[2], 3 )
  })

  it('from object', () => {
    let vert = Vertex( { x: 1, y: 2, z: 3 } )
    assert.isArray( vert )
    assert.equal( vert.length, 12 )
    assert.equal( vert[0], 1 )
    assert.equal( vert[1], 2 )
    assert.equal( vert[2], 3 )
  })
})
