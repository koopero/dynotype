const _ = require('lodash')
const runes = require('runes')
const Colour = require('deepcolour')

module.exports = function string() {
  let glyphs = []
    , proto  = {}

  addArray( arguments )

  return glyphs

  function addArray( arr ) {
    _.map( arr, addAny )
  }

  function addAny( ob ) {
    if ( _.isString( ob ) )
      return addString( ob )

    if ( _.isArrayLikeObject( ob ) )
      return addArray( ob )

    if ( _.isObject( ob ) ) {
      extendProto( ob )
      if ( ob.text )
        addAny( ob.text )
    }
  }

  function addString( str ) {
    str = str.replace( /\r\n/g, '\n' )
    runes( str ).forEach( addGlyph )
  }

  function addGlyph( text ) {
    let glyph
    glyph = _.defaults( { text }, proto )
    glyphs.push( glyph )
  }

  function extendProto( ob ) {
    let space = 
      ( proto.colour && proto.colour.space ) 
      || ( ob.colour && ob.colour.space ) 
      || Colour

    let colour = new space( proto.colour )
    console.log( 'EXTEND', { proto, colour, ob } )
    colour.set( ob.color )
    colour.set( ob.colour )
    proto = _.extend( {}, proto, ob )
    proto.colour = colour
  }
}
