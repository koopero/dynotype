
const _ = require('lodash')
    , fs = require('fs-extra')
    , tempfile = require('tempfile')
    , path = require('path')
    , fileUrl = require('file-url')

async function render( {
  file,
  geom,
  html,
  glyphs = [],
  include = ''
} = {} ) {

  if ( _.isObject( html ) )
    html = html.html


  let htmlFile = tempfile()+'.html'

  await fs.outputFile( htmlFile, html )
  const browser = require('navit')({ timeout: 30000, engine: 'phantomjs' });
  await browser.open(fileUrl( htmlFile ))
  await new Promise( resolve => setTimeout( resolve, 300 ) )
  await browser.screenshot( file )

  let measure =
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

  let measurements = await new Promise( resolve => browser.get.evaluate( measure, resolve ).run() )


  glyphs = glyphs.map ( (glyph,index) => {
    let m = _.find( measurements, m => m.id == index )
    if ( !m ) return glyph
    return _.extend( glyph, { aspect: m.width / geom.cellWidth } )
  } )

  await browser.close()

  return {
    file,
    glyphs
  }
}

module.exports = render
