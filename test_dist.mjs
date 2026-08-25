import fs from 'fs';

const html = fs.readFileSync('dist/index.html', 'utf8');
console.log('HTML:', html);

const jsFile = html.match(/src="\.\/assets\/([^"]+)"/)[1];
console.log('JS File:', jsFile);

const jsContent = fs.readFileSync('dist/assets/' + jsFile, 'utf8');
console.log('JS size:', jsContent.length);

// Check if document / window calls will fail on load
// Let's create a global mock window/document
global.window = global;
global.document = {
  documentElement: {
    setAttribute: () => {}
  },
  getElementById: () => ({
    render: () => {}
  }),
  querySelector: () => null,
  querySelectorAll: () => []
};

try {
  // eval jsContent to see if top-level script code throws an error!
  new Function('window', 'document', jsContent)(global.window, global.document);
  console.log('Top-level script evaluated WITHOUT errors!');
} catch (err) {
  console.error('TOP LEVEL SCRIPT THREW ERROR:', err);
}
