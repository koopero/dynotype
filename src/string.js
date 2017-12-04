const _ = require('lodash')
    , runes = require('runes')

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
      proto = _.extend( {}, proto, ob )
      if ( ob.text )
        addAny( ob.text )
    }
  }

  function addString( str ) {
    runes( str ).forEach( addGlyph )
  }

  function addGlyph( text ) {
    let glyph = _.defaults( { text }, proto )
    glyphs.push( glyph )
  }
}
