
const _ = require('lodash')
    , phantom = require('phantom')
    , fs = require('fs-extra')
    , tempfile = require('tempfile')
    , path = require('path')
    , fileUrl = require('file-url')

async function render( {
  file,
  htmlFile,
  tmp,
  size,
  cols,
  rows,
  width,
  height,
  fonts = [],
  glyphs = [],
  include = ''
} = {} ) {

  glyphs = await require('./glyphs')( {
    include, glyphs
  } )

  let geom = await require('./geometry')( {
    size, cols, rows, glyphs, width, height
  })

  let htmlResult = await require('./html')( {
    geom, glyphs, include, fonts,
  } )

  let html = htmlResult.html
  console.log( 'geom', geom )
  console.log( 'html', html )


  let hash = 'bar'

  tmp = tmp || tempfile()

  htmlFile = htmlFile || `${hash}.html`
  htmlFile = path.resolve( tmp, htmlFile )

  await fs.outputFile( htmlFile, html )

  const instance = await phantom.create()
  const page = await instance.createPage()
  await page.on('onResourceRequested', function(requestData) {
    console.info('Requesting', requestData.url)
  });

  const status = await page.open( fileUrl( htmlFile ) )

  const content = await page.render( file )
  let js =
    function () {
      var tds = document.getElementsByTagName('td');
      var result = [];
      for ( var i = 0; i < tds.length; i ++ ) {
        var td = tds[i]
        var span = td.getElementsByTagName('span')[0]
        var rect = span.getBoundingClientRect()
        result[i] = {
          id: td.id,
          width: rect.width
        }
      }
      return result
    }

  let measurements = await page.evaluateJavaScript( js )
  console.log( measurements )
  glyphs = glyphs.map ( (glyph,index) => {
    let m = _.find( measurements, m => m.id == index )
    if ( !m ) return glyph

    return _.extend( glyph, { aspect: m.width / geom.cellWidth } )
  } )

  await instance.exit()

  return {
    rows: geom.rows,
    cols: geom.cols,
    width: geom.width,
    height: geom.height,
    cellWidth: geom.cellWidth,
    cellHeight: geom.cellHeight,
    glyphs
  }
}

module.exports = render
