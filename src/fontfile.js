module.exports = fontfile

const request = require('request-promise')
    , querystring = require('querystring')
    , path = require('path')
    , fs = require('fs-extra')
    , fileUrl = require('file-url')
    , dataUri = require('strong-data-uri')

async function fontfile( {
  root,
  name,
  format = 'ttf',
  dir = 'font/',
  family = 'Roboto Mono',
  weight = 400,
  variant
} ) {

  if ( !variant ) {
    variant = String( weight )
  }

  if ( !name ) {
    name = family.replace(/\s/g, '')+'-'+variant
  }

  let file = `${name}.${format}`
  file = path.join( dir, file )

  if ( root ) {
    file = path.resolve( root, file )
    // file = path.relative( root, file )
  }

  let css = await getCSS()

  let match = /url\((.*?)\)/.exec( css )

  let url = match[1]

  let data = await request( { url, encoding: null } )

  await fs.outputFile( file, data )

  let src = fileUrl( file )
  // let src = dataUri.encode( data, "application/x-font-ttf" )


  return {
    name,
    family,
    variant,
    weight,
    file,
    css,
    url,
    src
  }


  async function getCSS() {
    let family_ = family.replace(/\s+/g, '+')
    let url = `https://fonts.googleapis.com/css?family=${family_}:${variant}`

    let data = await request( {
      url,
    })

    return data
  }


}
