
const _ = require('lodash')
    , fs = require('fs-extra')
    , tempfile = require('tempfile')
    , path = require('path')
    , fileUrl = require('file-url')
    , PNGImage = require('png-image')

async function browserize( {
  file,
  geom,
  html,
  glyphs = []
} = {} ) {

  if ( _.isObject( html ) )
    html = html.html


  let htmlFile = tempfile()+'.html'

  await fs.outputFile( htmlFile, html )
  const browser = await require('puppeteer').launch();
  const page = await browser.newPage()
  await page.goto(fileUrl( htmlFile ))
  await new Promise( resolve => setTimeout( resolve, 300 ) )
  await page.screenshot( { path: file, omitBackground: true, fullPage: true } )

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
          rect: rect
        }
      }
      return result
    }

  let measurements = await page.waitForFunction( measure )


  glyphs = glyphs.map ( (glyph,index) => {
    let m = _.find( measurements, m => m.id == index )
    if ( !m ) return glyph
    delete glyph.html
    return _.extend( glyph, { width: m.rect.width / geom.cellWidth } )
  } )

  await browser.close()

  let pngImage = new PNGImage({
      imagePath: file,
      imageOutputPath: file,
      cropImage: {x: 0, y: 0, width: geom.width, height: geom.height }
  });

  await pngImage.runWithPromise()

  return {
    file,
    glyphs
  }
}

module.exports = browserize
