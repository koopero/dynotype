const options = exports
    , _ = require('lodash')

options.Dynotype = function ( opt ) {
  opt = _.extend( {
    size:    64,
    fonts:   [],
    dir:     '.',
    root:    '.',
    name:    '',
  }, opt )

  return opt
}

options.font = function ( opt ) {
  if ( _.isString( opt ) )
    opt = {
      family: opt
    }

  opt = _.defaults( {
    weight: 400
  }, opt )

  return _.pick( opt, ['family', 'weight', 'css', 'style','glyphs'] )
}

options.geometry = function ( opt ) {
  if ( _.isNumber( opt ) )
    opt = { size: opt }

  return _.extend( {
    
  }, opt )
}
