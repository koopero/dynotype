const options = require('./options')
    , string  = require('./string')
    , _ = require('lodash')
    , path = require('path')
    , yaml = require('js-yaml')
    , fs = require('fs-extra')
    , hasher = require('object-hash')

class Dynotype {
  constructor( opt ) {
    opt = options.Dynotype( opt )
    _.extend( this, opt )

    this.glyphs = []
    this.fonts = []

    _.map( opt.fonts, font => this.addFont( font ) )
    this.addGlyphs( opt.glyphs )
    this.setGeometry( opt.geometry || opt )
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
    let glyphs = _.map( this.glyphs, glyph => _.pick( glyph, 'text', 'font' ) )
    let fonts  = _.map( this.fonts,  font =>  _.pick( font, 'family', 'weight', 'css' ) )
    let geometry = _.pick( this.geometry, [ 'cellWidth', 'cellHeight'] )
    let hash = {
      geometry, glyphs, fonts
    }

    return hasher( hash )
  }

  glyph() {
    let args = string( arguments )
    let search = args[0]

    if ( !search )
      return

    let ourGlyph = _.find( this.glyphs, testGlyph =>
      search.text == testGlyph.text && ( _.isUndefined( search.font ) || search.font == testGlyph.font )
    )

    if ( !ourGlyph )
      return

    return _.extend( search, ourGlyph )
  }

  line( opt ) {

    let glyphs = string( _.pick( opt, 'y', 'text', 'font' ), _.slice( arguments, 1 ) )
    glyphs = glyphs.map( glyph => this.glyph( glyph ) )

    return require('./line')( opt, glyphs )
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

    this.html = html.html
    this.glyphs = html.glyphs
    this.png = this.png || this.filePath('.png' )

    let result = await require('../src/render')( {
      html,
      glyphs: this.glyphs,
      geom: this.geometry,
      file: this.png,
    } )
  }

  filePath( extension ) {
    let name = this.name || this.getHash()
    let file = this.resolvePath( `${name}${extension}` )
    return file
  }

  async save() {
    let data = {
      geometry: this.geometry,
      fonts: this.fonts.map( options.font ),
      glyphs: this.glyphs
    }

    let file = this.file || this.filePath('.yaml')

    if ( this.png ) {
      data.png = path.relative( path.dirname( file ), this.png )
    }

    data = yaml.dump( data )
    await fs.outputFile( file, data )

    if ( this.html )
      await fs.outputFile( this.filePath('.html'), this.html )

    return { file }
  }

  async load() {
    let file = this.filePath('.yaml')
    let str  = await fs.readFile( file, 'utf8' )
    let data = yaml.safeLoad( str )
    if ( data.png ) {
      data.png = this.resolvePath( path.dirname( file ), data.png )
    }

    _.extend( this, data )
  }

  async refresh() {
    try {
      await this.load()
      return true
    } catch( e ) {

    }
    await this.generate()
    await this.save()
  }
}

function glyphsEq( a, b ) {
  return a.text == b.text && a.font == b.font
}

module.exports = Dynotype
