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
  console.log('options.font', opt )

  if ( _.isString( opt ) )
    opt = {
      family: opt
    }

  opt = _.extend( {
    weight: 400
  }, opt )

  opt = _.pick( opt, ['family', 'weight', 'css', 'style','glyphs'] )
  console.log('options.font', opt )
  return opt
}

options.geometry = function ( opt ) {
  if ( _.isNumber( opt ) )
    opt = { size: opt }

  return _.extend( {
    
  }, opt )
}
