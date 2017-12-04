const options = require('./options')
    , string  = require('./string')
    , _ = require('lodash')
    , path = require('path')
    , hasher = require('object-hash')

class Dynotype {
  constructor( opt ) {
    opt = options.Dynotype( opt )
    _.extend( this, opt )

    this.glyphs = []
    this.fonts = []

    _.map( opt.fonts, font => this.addFont( font ) )
    this.addGlyphs( opt.glyphs )
    this.setGeometry( opt )
  }

  addFont( font ) {
    font = options.font( font )

    this.fonts = this.fonts || []
    this.fonts.push( font )
  }

  addGlyphs() {
    let fontKeys = _.keys( this.fonts )
    if ( !fontKeys.length )
      fontKeys = [ 0 ]

    let newGlyphs = string( arguments )
    _.map( newGlyphs, glyph => {
      let fonts = _.isNumber( glyph.font ) ? [ glyph.font ] : fontKeys

      fonts.map( font => {
        glyph.font = font
        if ( !_.find( this.glyphs, oldGlyph => glyphsEq( glyph, oldGlyph ) ) ) {
          glyph.index = this.glyphs.length
          this.glyphs.push( { ...glyph } )
        }
      } )
    } )

  }

  setGeometry( opt ) {
    opt = options.geometry( opt )
    opt.glyphs = this.glyphs
    this.geometry = require('./geometry')( opt )
  }

  resolvePath() {
    let root = this.root || process.cwd()
    let dir  = this.dir  || '.'
    return path.resolve.bind( path, root, dir ).apply( null, arguments )
  }

  getHash() {
    let hash = {
      geometry: _.pick( this.geometry, [ 'cellWidth', 'cellHeight'] )
    }

    return hasher( hash )
  }

  glyph() {
    let args = string( arguments )
    let search = args[0]

    if ( !search )
      return

    let glyph = _.find( this.glyphs, glyph =>
      search.text == glyph.text && ( _.isUndefined( search.font ) || search.font == glyph.font )
    )
    
    return glyph
  }

  async generate() {

    this.fonts  = await Promise.all( this.fonts.map(
      font => require('./fontfile')( { dir: this.dir, root: this.root, ...font } )
    ) )


    let html = await require('../src/html')( {
      fonts: this.fonts,
      glyphs: this.glyphs,
      geom: this.geometry,
    } )

    this.glyphs = html.glyphs

    let name = this.name || this.getHash()
    this.png = this.png || this.resolvePath( `${name}.png` )

    let result = await require('../src/render')( {
      html,
      glyphs: this.glyphs,
      geom: this.geometry,
      file: this.png,
    } )
  }
}

function glyphsEq( a, b ) {
  return a.text == b.text && a.font == b.font
}

module.exports = Dynotype