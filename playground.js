const runes = require('runes')
const _ = require('lodash')
let chars = `😀`

chars = runes( chars )

chars = chars.map( c => c.codePointAt( 0 ).toString( 16 ) )

console.log( chars )


const fs = require('fs-extra')


var source = "<p>Hello, my name is {{name}}. I am from {{hometown}}. I have " +
             "{{kids.length}} kids:</p>" +
             "<ul>{{#kids}}<li>{{name}} is {{age}}</li>{{/kids}}</ul>";
var template = Handlebars.compile(source);

var data = { "name": "Alan", "hometown": "Somewhere, TX",
             "kids": [{"name": "Jimmy", "age": "12"}, {"name": "Sally", "age": "4"}]};
var result = template(data);






const phantom = require('phantom');
const fileUrl = require('file-url');

let file = 'test.html'
loadFile( file )

async function loadFile( file ) {
  const instance = await phantom.create();
  const page = await instance.createPage();
  await page.on('onResourceRequested', function(requestData) {
    console.info('Requesting', requestData.url);
  });

  const status = await page.open(fileUrl( file ) );
  const content = await page.render('foo.png');
  console.log(content);

  await instance.exit();
}
