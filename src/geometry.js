module.exports = geometry

function geometry( {
  cols = 0,
  rows = 0,
  size = 64,
  fontSize = 0,
  fontScale = 0.9,
  gutter = 2,
  cellWidth = 0,
  cellHeight = 0,
  glyphs = [],
  count = 0
} = {} ) {
  count = count || glyphs.length

  cellWidth = parseInt(cellWidth) || Math.ceil( size )
  cellHeight = parseInt(cellHeight) || Math.ceil( size )

  rows = Math.max( 0, parseInt( rows ) || 0 )
  cols = Math.max( 0, parseInt( cols ) || 0 )
  gutter = Math.max( 0, parseInt( gutter ) || 0 )

  let defaultFontSize = Math.floor( (Math.min( cellWidth, cellHeight ) - gutter * 2 ) * fontScale )

  fontSize = Math.max( 0, parseFloat( fontSize ) || 0 ) || defaultFontSize

  if ( !rows && !cols && count )
    cols = Math.min( count, Math.ceil( Math.sqrt( count * cellHeight / cellWidth ) ) )

  if ( !rows && count )
    rows = Math.ceil( count / cols )

  if ( !cols && count )
    cols = Math.ceil( count / rows )

  let width = ( cellWidth ) * cols
  let height = ( cellHeight ) * rows

  return { size, cols, rows, width, height, cellWidth, cellHeight, fontSize, gutter }
}
