
const _ = require('lodash')
    , phantom = require('phantom')
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



  let htmlFile = tempfile()+'.html'

  await fs.outputFile( htmlFile, html )

  const browser = require('navit')({ timeout: 30000, engine: 'phantomjs' });


  await browser
    .open(fileUrl( htmlFile ))
    // .wait(() => {
    //   try { return window.NodecaLoader.booted; } catch (__) { return false; }
    // })
    // .get.url(stack)
    // .click('forum-category__content:first forum-section__title-link')
    // .test.exists('.forum-topiclines')
    .screenshot( file )
    .close()

  // const instance = await phantom.create( [], {
  //   phantomPath: '/usr/local/bin/slimerjs'
  // })
  // const page = await instance.createPage()
  // const status = await page.open( fileUrl( htmlFile ) )
  // await new Promise( resolve => setTimeout( resolve, 500 ) )
  //
  // const content = await page.render( file )


  // let js =
  //   function () {
  //     var tds = document.getElementsByTagName('td');
  //     var result = [];
  //     for ( var i = 0; i < tds.length; i ++ ) {
  //       var td = tds[i]
  //       var span = td.getElementsByTagName('span')[0]
  //       var rect = span.getBoundingClientRect()
  //       result[i] = {
  //         id: td.id,
  //         width: rect.width
  //       }
  //     }
  //     return result
  //   }
  //
  //
  // let measurements = await page.evaluateJavaScript( js )
  // glyphs = glyphs.map ( (glyph,index) => {
  //   let m = _.find( measurements, m => m.id == index )
  //   if ( !m ) return glyph
  //
  //   return _.extend( glyph, { aspect: m.width / geom.cellWidth } )
  // } )

  // await instance.exit()

  return {
    file,
    glyphs
  }
}

module.exports = render
