const _ = require('lodash')
async function html( {
  geom,
  fonts = [],
  glyphs = [],
} = {} ) {

  fonts = fonts.map( ( font, index ) => ( { ...font, index } ) )

  glyphs = glyphs.map( ( glyph ) => ({ ...glyph, font: glyph.font || 0 } ) )
  // glyphs = await Promise.all( glyphs )




  let tableRows = []
  for ( let row = 0; row < geom.rows; row++ ) {
    tableRows[row] = { cols: [] }
    for ( let col = 0; col < geom.cols; col++ ) {
      let index = col + row * geom.cols
      let glyph = glyphs[index] || {}
      glyph.col = col
      glyph.row = row
      glyph.index = index
      tableRows[row].cols[col] = _.merge( glyph, {
        html: glyph.text == ' ' ? '&nbsp;' : glyph.text,
        left: geom.cellWidth * col,
        top: geom.cellHeight * row,
      } )
    }
  }

  let data = {
    fonts,
    rows: geom.rows,
    cols: geom.cols,
    fontSize: geom.size,
    cellWidth: geom.cellWidth,
    cellHeight: geom.cellHeight,
    width: geom.width,
    height: geom.height,
    tableRows
  }

  let template = await loadTemplate()
  let html = template( data )

  return { html, glyphs }
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
