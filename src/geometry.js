module.exports = geometry

function geometry( {
  cols = 0,
  rows = 0,
  size = 64,
  charWidth = 1.25,
  charHeight = 1.5,
  glyphs = [],
  count = 0
} = {} ) {

  count = count || glyphs.length

  rows = Math.max( 0, parseFloat( rows ) || 0 )
  cols = Math.max( 0, parseFloat( cols ) || 0 )

  if ( !rows && !cols )
    cols = Math.ceil( Math.sqrt( count * charHeight / charWidth ) )

  if ( !rows )
    rows = Math.ceil( count / cols )

  if ( !cols )
    cols = Math.ceil( count / rows )


  let cellWidth = Math.ceil( size * charWidth )
  let cellHeight = Math.ceil( size * charHeight )

  let padding = 2
  let width = ( cellWidth + padding ) * cols
  let height = ( cellHeight + padding ) * rows


  return { size, cols, rows, width, height, cellWidth, cellHeight }

}