module.exports = glyphs
const _ = require('lodash')
    , runes = require('runes')

async function glyphs( {
  include = 'abcdedfghijklmnopqrstuvxyz',
  glyphs  = [],
} = {} ) {

  include = runes( include )
  include = _.uniq( include )
  include = include.map( function ( str ) {
    glyphs = glyphs.concat( { text: str } )
  } )

  glyphs = _.filter( glyphs, _.isObject )
  glyphs = _.uniqWith( glyphs, ( a,b ) => a.text == b.text )


  return glyphs
}
