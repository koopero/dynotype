const _ = require('lodash')

module.exports = function line( opt ) {

  opt = _.defaults( opt, {
    x: 0,
    y: 0,
    width: 0,
    size: 0,
    height: NaN,
    baseline: 0,
  })


  let glyphDefault = _.pick( opt, ['text','y','font','size'] )
  let glyphs = require('./string')( glyphDefault,  _.slice( arguments, 1 ) )

  if ( glyphs.length < 1 )
    return []

  console.log('opt',opt)


  let measure = measureGlyphs( glyphs )

  // console.log('measure',measure)

  let { x, size, width, align } = opt

  align = alignment( { align, width, size, measure } )
  // console.log('state',{x,size,width, align})

  layoutGlyphs()
  placeGlyphs()


  let { height } = opt

  if ( isNaN( height ) ) 
    height = align.size 

  if ( glyphs.length ) {
    glyphs[0].height = height
  } else {
    glyphs[0] = { height: height }
  }

  return glyphs

  function layoutGlyphs() {
    let x = 0
    glyphs = glyphs.map( function ( glyph ) {
      glyph = _.merge( glyph, { x } )
      x += resolveNumber( glyph.width, 0 )

      return glyph
    } )
  }

  function placeGlyphs() {
    glyphs.map( glyph => {
      let gx = glyph.x
      gx *= align.size
      gx += align.x
      glyph.x = gx
      glyph.y += ( parseFloat( opt.baseline ) || 0 ) * align.size

      glyph.size = align.size
    } )
  }

  function alignment( { align, width, size, measure } ) {
    let x

    width = parseFloat( width ) || 0
    size  = parseFloat( size )  || 0

    if ( !width && !size )
      width = 1

    if ( !size )
      size = width / measure.width

    switch ( align ) {
      case 'left':
        x = 0
      break
      case 'right':
        x = -width
      break

      default:
      case 'center':
      case 'centre':
        x = -width / 2
      break
    }

    return { x, size }
  }
}

function measureGlyphs( glyphs ) {
  let width = 0
    , space = 0

  glyphs.map( function ( glyph ) {
    width += parseFloat( glyph.width ) || 0
    if ( isGlyphSpace( glyph ) )
      space += parseFloat( glyph.width ) || 0
  })

  return { width, space, letter: width - space }
}

function isGlyphSpace( glyph ) {
  return !glyph.text || glyph.text.search(/[^\s]/) == -1
}

function resolveNumber( ob, key ) {
  for( let i = 0; i < arguments.length; i ++ ) {
    let arg = arguments[i]
    arg = parseFloat( arg )
    if ( !isNaN( arg ) )
      return arg
  }
}
