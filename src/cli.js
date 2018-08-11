#!/usr/bin/env node

async function execute() {
  let program = require('commander')
  const pkg = require('../package.json')

  program
    .version( pkg.version )
    .usage('[options] <config.yaml>')
    .option('-r, --refresh', 'Refresh font sheet rather than building.')

  program.parse( process.argv )

  let file = program.args[0]
  let config = await loadConfig( file )
  const Dynotype = require('./Dynotype')
  let dyno = new Dynotype( config )
  
  if ( program.refrsh ) {
    await dyno.refresh()
  } else {
    await dyno.generate()
    await dyno.save()
  }
}

async function loadConfig( file ) {
  const fs = require('fs-extra')
  const yaml = require('js-yaml')
  
  let data = await fs.readFile( file, 'utf8')
  data = yaml.load( data )
  return data
}


module.exports = execute

if ( require.main == module )
  execute()