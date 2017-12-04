module.exports = glyphs
const _ = require('lodash')
    , runes = require('runes')

function glyphs( {
  include = 'abcdedfghijklmnopqrstuvxyz',
  glyphs  = [],
  font    = 0
} = {} ) {

  glyphs  = glyphs.map( glyph => _.extend( { text: '', font: 0 }, glyph ) )

  include = runes( include )
  include = _.uniq( include )
  include = include.map( function ( str ) {
    glyphs = glyphs.concat( { text: str, font } )
  } )

  glyphs = _.filter( glyphs, _.isObject )
  glyphs = _.uniqWith( glyphs, ( a,b ) => a.text == b.text && a.font == b.font  )


  return glyphs
}
