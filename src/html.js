async function html( {
  geom,
  fonts = [],
  glyphs = [],
  include = ''
} = {} ) {
  console.log('glyphs', glyphs)
  console.log('include', include)

  glyphs = await require('./glyphs')( {
    include, glyphs
  } )

  glyphs = glyphs.map( async ( glyph ) => glyph )
  glyphs = await Promise.all( glyphs )


  let tableRows = []
  for ( let row = 0; row < geom.rows; row++ ) {
    tableRows[row] = { cols: [] }
    for ( let col = 0; col < geom.cols; col++ ) {
      let index = col + row * geom.cols
      let glyph = glyphs[index] || {}
      glyph.col = col
      glyph.row = row
      glyph.index = index
      tableRows[row].cols[col] = glyph
    }
  }

  let data = {
    rows: geom.rows,
    cols: geom.cols,
    fontSize: geom.size,
    tdWidth: geom.cellWidth,
    tdHeight: geom.cellHeight,
    width: geom.width,
    height: geom.height,
    tableRows
  }

  let template = await loadTemplate()

  let html = template( data )

  return {
    html,
    width: geom.width,
    height: geom.height
  }
}

const path = require('path')
    , fs = require('fs-extra')
    , Handlebars = require('handlebars')

async function loadTemplate() {
  let file = path.resolve( __dirname, 'html.hbs' )
  let source = await fs.readFile( file, 'utf8' )
  return Handlebars.compile( source )
}

module.exports = html
