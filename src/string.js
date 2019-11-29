const _ = require('lodash')
const runes = require('runes')
const Colour = require('deepcolour')
const { glyphIsCharacter, glyphTemplate } = require('./util')

module.exports = function string() {
  let glyphs = []
    , proto  = {}
    , lastWasSpace = true
    , word = -1
    , wordChar = 0
    , count = 0

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
      if ( ob.src ) 
        addGlyph( _.pick( ob, 'src' ) )
      if ( ob.icon ) 
        addGlyph( _.pick( ob, 'icon' ) )
    }
  }

  function addString( str ) {
    str = str.replace( /\r\n/g, '\n' )
    runes( str ).forEach( addCharacter )
  }


  function addCharacter( text ) {
    let isSpace = !!text.match( /[\s\.\:\!\?\;\,]/ )
    if ( !isSpace && lastWasSpace ) {
      word ++
      wordChar = 0
    }
    addGlyph( { text } )
    wordChar ++
    count ++
    lastWasSpace = isSpace
  }

  function addGlyph( glyph ) {
    let position = { words: word, word: wordChar, string: count }
    glyph = _.defaults( glyph, { position }, proto )
    glyphs.push( glyph )
  }

  function extendProto( ob ) {
    ob = glyphTemplate( ob )
    let protoColour = proto.colour
    proto = _.extend( {}, proto, ob )

    if ( protoColour || ob.color || ob.colour ) {
      let space = 
        ( protoColour && protoColour.space ) 
        || ( ob.colour && ob.colour.space ) 
        || ( ob.color && ob.color.space ) 
        || Colour

      let colour = new space( 'white' )
      colour.set( protoColour )
      colour.set( ob.color )
      colour.set( ob.colour )
      proto.colour = colour
    }
  }
}

