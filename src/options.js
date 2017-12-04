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

  return _.pick( opt, ['family', 'weight', 'css', 'style'] )
}

options.geometry = function ( opt ) {
  if ( _.isNumber( opt ) )
    opt = { size: opt }

  return _.extend( {

  }, opt )
}
