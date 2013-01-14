//main.js

var fs, ssiparser, fname, source, options, shtml;

fs = require('fs');
ssiparser = require('./lib/node-ssi-parser');

function showUsage() {
    console.log('Usage:');
    console.log('   ssiparser file.shtml');
    console.log();
    console.log('Available options:');
    console.log();
    console.log('  -v, --version  Shows program version');
    console.log();
    process.exit(1);
}

if (process.argv.length <= 2) {
    showUsage();
}

options = {};

process.argv.splice(2).forEach(function (entry) {

    if (entry === '-h' || entry === '--help') {
        showUsage();
    } else if (entry === '-v' || entry === '--version') {
        // Keep in sync with package.json
        console.log('Node SSI Parser version 0.0.1');
        console.log();
        process.exit(0);
    } else if (entry.slice(0, 2) === '--') {
        console.log('Error: unknown option ' + entry + '.');
        process.exit(1);
    } else if (typeof fname === 'string') {
        console.log('Error: more than one input file.');
        process.exit(1);
    } else {
        fname = entry;
    }
});

if (typeof fname !== 'string') {
    console.log('Error: no input file.');
    process.exit(1);
}

try {
    //source = fs.readFileSync(fname, 'utf-8');
    shtml = ssiparser(source);
    console.log(shtml);
} catch (e) {
    console.log('Error: ' + e.message);
    process.exit(1);
}