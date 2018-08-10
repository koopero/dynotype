const { resolve } = require('path')
const { readFile } = require('fs-extra')
const _ = require('lodash')
const escapeStringRegexp = require('escape-string-regexp')

class Library {
  constructor( {
    require = 'font-awesome',
    css = 'css/font-awesome.css',
    prefix = '.fa-'
  } = {} ) {

    this.require = require
    this.css = css
    this.prefix = prefix
  } 

  async loadCSS() {
    let file = resolve( __dirname, '..', 'node_modules', this.require, this.css )
    let data = await readFile( file, 'utf8' )
    let glyphs = []
    let reg = new RegExp( `((?:${ escapeStringRegexp( this.prefix ) }(.*?):before,?\\s*)+){\\s*content: "\\\\(.*)";`, 'g' )

    console.log( reg )

    data.replace( reg, ( match, names, nop, content ) => {
      content = parseInt( content, 16 )
      content = String.fromCharCode( content )

      let glyph = {
        text: content,
      }

      names = names.split(/\s*\,\s*/)
      names = names.map( name => name.replace( ':before', '' ) )
      names = names.map( name => _.trim( name ) )

      glyph.names = names

      glyphs.push( glyph )
    } )

    this.glyphs = glyphs

    return glyphs

  }
}

module.exports = Library