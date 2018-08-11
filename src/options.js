const options = exports
    , _ = require('lodash')

options.Dynotype = function ( opt ) {
  opt = _.extend( {
    size:    64,
    fonts:   [],
    dir:     '.',
    root:    '.',
    name:    '',
    css:     ''
  }, opt )

  return opt
}

options.font = function ( opt ) {
  if ( _.isString( opt ) )
    opt = {
      family: opt
    }

  opt = _.extend( {
    weight: 400
  }, opt )

  opt = _.pick( opt, ['family', 'weight', 'css', 'style','glyphs'] )
  return opt
}

options.geometry = function ( opt ) {
  if ( _.isNumber( opt ) )
    opt = { size: opt }

  return _.extend( {
    
  }, opt )
}
