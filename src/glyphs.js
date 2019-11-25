module.exports = glyphs
const _ = require('lodash')
const runes = require('runes')
const { glyphsAreEqual } = require('./util')

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
  glyphs = _.uniqWith( glyphs, ( a,b ) => glyphsAreEqual( a, b )  )


  return glyphs
}
