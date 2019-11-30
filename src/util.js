module.exports = { glyphsAreEqual, glyphIsCharacter, glyphMinimize, glyphTemplate }

const _ = require('lodash')

function glyphsAreEqual( A, B ) {
  return A.text == B.text && A.font == B.font
}

function glyphIsCharacter( A ) {

}

function glyphTemplate( glyph ) {
  return _.omit( glyph, ['text','icon','src'] )
} 

function glyphMinimize( glyph ) {
  if ( glyph.src )
    return _.pick( glyph, ['src'] )

  if ( glyph.icon )
    return _.pick( glyph, ['icon'] )

  return _.pick( glyph, ['font','index','text'])
}