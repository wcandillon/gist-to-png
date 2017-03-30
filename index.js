var page = require('webpage').create();
var system = require('system');

// ***** Argument handling

function isInt(value) {
  return !isNaN(value) && 
         parseInt(Number(value)) == value && 
         !isNaN(parseInt(value, 10));
}

if ( system.args.length !== 4 ) {
  console.log('Usage: gist-to-png.js <gist-ID> <lines> <filename>');
  console.log('    <gist-ID>  - the ID of the Gist, from the URL, e.g. 2ab741a36788a38b459e');
  console.log('    <lines>    - number of lines in the Gist');
  console.log('    <filename> - output file');
  phantom.exit();
}

var id     = system.args[1];
var lines  = system.args[2];
var output = system.args[3];
var url    = 'https://gist.github.com/wcandillon/' + id;

if ( ! isInt(lines) ) {
  console.log('The number of lines is not an integer: ' + lines);
  phantom.exit();
}

// ***** Processing

// the portion of the page to take a screenshot of
page.clipRect = {
  top: 306,
  left: 20,
  width: 790,
  height: ( 20 * parseInt(lines, 10) ) + 2
};

page.open(url, function(status) {
  if (status !== 'success') {
    console.log('FAIL to load the URL: ' + url);
  }
  else {
    page.render(output);
    phantom.exit();
  }
});
