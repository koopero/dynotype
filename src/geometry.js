module.exports = geometry

async function geometry( {
  cols = 0,
  rows = 0,
  size = 64,
  aspect = 1,
  glyphs = [],
  include = ''
} = {} ) {

  glyphs = await require('./glyphs')( {
    include, glyphs
  } )

  let count = glyphs.length

  rows = Math.max( 0, parseFloat( rows ) || 0 )
  cols = Math.max( 0, parseFloat( cols ) || 0 )

  if ( !rows && !cols )
    cols = Math.ceil( Math.sqrt( count / aspect ) )

  if ( !rows )
    rows = Math.ceil( count / cols )

  if ( !cols )
    cols = Math.ceil( count / rows )


  let cellWidth = Math.ceil( size * aspect )
  let cellHeight = Math.ceil( size )

  let padding = 2
  let width = ( cellWidth + padding ) * cols
  let height = ( cellHeight + padding ) * rows


  return { size, cols, rows, width, height, cellWidth, cellHeight, glyphs }

}
