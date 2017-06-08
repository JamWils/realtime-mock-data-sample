const mockDataSchema = require('./mockDataSchema');
const fs = require('fs');
const util = require('util');
const chalk = require('chalk');

const json = mockDataSchema.schema();
const jsonFormatted = JSON.stringify(json);

console.log(util.inspect(json, false, null));

fs.writeFile("./buildScripts/mockData/db.json", jsonFormatted, (err) => {
    if (err) {
        return console.log(chalk.red(err));
    } else {
        console.log(chalk.green("Mock data generated."));
    }
});

const client = require('firebase-tools');
client.database.set('/', './mockData/db.json', {
  project: 'my-test-project',
  token: process.env.FIREBASE_TOKEN,
  cwd: './'
}).then(function() {
  console.log(chalk.green('New mock data pushed to my-test-project'));
}).catch(function(err) {
  console.log(chalk.red(err));
});