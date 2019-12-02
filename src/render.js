
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
  glyphs = [],
  htmlFile,
} = {} ) {

  if ( _.isObject( html ) )
    html = html.html


  htmlFile = htmlFile || tempfile()+'.html'
  let dir = path.dirname( file )
  await fs.ensureDir( dir )

  await fs.outputFile( htmlFile, html )
  const browser = await require('puppeteer').launch();
  const page = await browser.newPage()

  await page.goto(fileUrl( htmlFile ))
  await new Promise( resolve => setTimeout( resolve, 300 ) )
  await page.screenshot( { path: file, omitBackground: true, fullPage: true } )

  let measure =
    function () {
      var tds = document.getElementsByTagName('td')
      var result = [];
      for ( var i = 0; i < tds.length; i ++ ) {
        var td = tds[i]
        var span = td.getElementsByTagName('span')[0]
        if ( !span )
          continue
        var rect = span.getBoundingClientRect()
        rect = [ rect.x, rect.y, rect.width, rect.height ]
        result[i] = {
          id: td.id,
          rect: rect
        }
      }
      return result
    }

  let measurements = await page.evaluate( measure )

  glyphs = glyphs.map ( (glyph,index) => {
    let m = _.find( measurements, m => m.id == index )
    if ( !m ) return glyph
    delete glyph.html

    let rect = m.rect
    rect[0] -= glyph.col * geom.cellWidth
    rect[1] -= glyph.row * geom.cellHeight
    rect[0] /= geom.cellWidth;
    rect[1] /= geom.cellHeight;
    rect[2] /= geom.cellWidth;
    rect[3] /= geom.cellHeight;


    return _.extend( glyph, { width: rect[2], measured: rect } )
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
