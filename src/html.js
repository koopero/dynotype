const _ = require('lodash')
const fileUrl = require('file-url')
const path = require('path')
const emojiRegex = require('emoji-regex')()
const fs = require('fs-extra')
const Handlebars = require('handlebars')
const { promisify } = require('util')
const imageSize = promisify(require('image-size'))

function isEmoji( str ) {
  if ( !str ) return false
  return !!str.match( emojiRegex )
}

async function html( {
  geom,
  root,
  css = '',
  fonts = [],
  glyphs = [],
} = {} ) {

  fonts = fonts.map( ( font, index ) => ( { ...font, index, fontSize: font.fontSize || geom.fontSize } ) )
  glyphs = glyphs.map( ( glyph ) => ({ ...glyph, font: glyph.font || 0 } ) )

  let tableRows = []
  for ( let row = 0; row < geom.rows; row++ ) {
    tableRows[row] = { cols: [] }
    for ( let col = 0; col < geom.cols; col++ ) {
      let index = col + row * geom.cols
      let glyph = glyphs[index] || {}
      glyph.col = col
      glyph.row = row
      glyph.index = index
      tableRows[row].cols[col] = await glyphToHTML( { glyph, geom, root } )
    }
  }
  
  let data = {
    fonts,
    css,
    rows: geom.rows,
    cols: geom.cols,
    fontSize: geom.fontSize,
    cellWidth: geom.cellWidth,
    cellHeight: geom.cellHeight,
    gutter: geom.gutter,
    width: geom.width,
    height: geom.height,
    tableRows
  }

  let template = await loadTemplate()
  let html = template( data )

  return { html, glyphs }
}

async function glyphToHTML( { glyph, geom, root } ) {
  let classes = ''
  let html
  
  if ( glyph.src ) {
    let { src } = glyph
    src = path.resolve( root, src )
    let [ width, height ] = await srcSize( { src, geom } )
    html = `<span><img width=${width} height=${height} src='${fileUrl( src )}'/></span>`
  } else if ( glyph.text ) {
    if ( isEmoji( glyph.text ) )
      classes += 'emoji '

    html = glyph.text == ' ' ? '&nbsp;' : glyph.text
    html = `<span class='font${ glyph.font }'>${html}</span>`
  }

  glyph = _.merge( {}, glyph, {
    html,
    left: geom.cellWidth * glyph.col,
    top: geom.cellHeight * glyph.row,
    classes,
  } )

  return glyph
}

async function srcSize( { src, geom } ) {
  let size = await imageSize( src )
  let scale = Math.min(
    (geom.cellWidth-geom.gutter*2) / size.width,
    (geom.cellHeight-geom.gutter*2) / size.height
  )
  return [ size.width * scale, size.height * scale ]
}

async function loadTemplate() {
  let file = path.resolve( __dirname, 'html.hbs' )
  let source = await fs.readFile( file, 'utf8' )
  return Handlebars.compile( source )
}

module.exports = html


