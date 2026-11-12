import {existsSync,readFileSync} from 'node:fs';
import {execFileSync} from 'node:child_process';
for(const file of ['public/index.html','public/push.js','public/sw.js','public/manifest.webmanifest','netlify/functions/push-api.mjs','netlify/functions/reminder-breakfast.mjs','netlify/functions/reminder-lunch.mjs','netlify/functions/reminder-water.mjs','netlify/functions/reminder-sleep.mjs'])if(!existsSync(file))throw Error('Missing '+file);
for(const file of ['public/app.js','public/push.js','public/sw.js','netlify/functions/push-api.mjs','netlify/lib/push.mjs','netlify/lib/core.mjs'])execFileSync(process.execPath,['--check',file]);
const manifest=JSON.parse(readFileSync('public/manifest.webmanifest','utf8'));
for(const icon of manifest.icons)if(!existsSync('public/'+icon.src))throw Error('Missing icon');
console.log('Aplicativo e funções verificados.');
