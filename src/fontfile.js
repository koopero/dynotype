module.exports = fontfile

const request = require('request-promise')
    , querystring = require('querystring')
    , path = require('path')
    , fs = require('fs-extra')
    , fileUrl = require('file-url')

const FORMAT_BROWSER =
{
  'eot'   : 'Mozilla/4.0 (compatible; MSIE 8.0; Windows NT 6.1; WOW64; Trident/4.0; SLCC2; .NET CLR 2.0.50727; .NET CLR 3.5.30729; .NET CLR 3.0.30729; .NET4.0C; .NET4.0E)',
  'ttf'   : 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_6_8) AppleWebKit/534.59.8 (KHTML, like Gecko) Version/5.1.9 Safari/534.59.8',
  'woff'  : 'Mozilla/5.0 (Windows NT 10.0; WOW64; Trident/7.0; .NET4.0C; .NET4.0E; .NET CLR 2.0.50727; .NET CLR 3.0.30729; .NET CLR 3.5.30729; rv:11.0) like Gecko',
  'woff2' : 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; ServiceUI 8) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.79 Safari/537.36 Edge/14.14393'
}

const FORMAT_NAME =
{
  'eot'   : 'eot',
  'ttf'   : 'truetype',
  'woff'  : 'woff',
  'woff2' : 'woff2',
}

async function fontfile( {
  root,
  name,
  format = 'ttf',
  dir = 'font/',
  family = 'Roboto Mono',
  weight = 400,
  variant,
  css = ''
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

  let googleCSS = await getCSS()

  let match = /url\((.*?)\)/.exec( googleCSS )

  let url = match[1]

  let data = await request( { url, encoding: null } )

  await fs.outputFile( file, data )

  let srcURL = fileUrl( file )

  let src = `url(${srcURL}) format('${FORMAT_NAME[format]}')`
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
      headers: {
        'User-Agent': FORMAT_BROWSER[format]
      }
    })

    return data
  }


}
