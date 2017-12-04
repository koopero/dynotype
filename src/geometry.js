module.exports = geometry

function geometry( {
  cols = 0,
  rows = 0,
  size = 64,
  aspect = 1.5,
  glyphs = [],
  include = ''
} = {} ) {

  let count = glyphs.length

  rows = Math.max( 0, parseFloat( rows ) || 0 )
  cols = Math.max( 0, parseFloat( cols ) || 0 )

  if ( !rows && !cols )
    cols = Math.ceil( Math.sqrt( count * aspect ) )

  if ( !rows )
    rows = Math.ceil( count / cols )

  if ( !cols )
    cols = Math.ceil( count / rows )


  let cellWidth = Math.ceil( size )
  let cellHeight = Math.ceil( size * aspect )

  let padding = 2
  let width = ( cellWidth + padding ) * cols
  let height = ( cellHeight + padding ) * rows


  return { size, aspect, cols, rows, width, height, cellWidth, cellHeight }

}
