import fs from 'node:fs';
const path=process.argv[2]||'data/past-paper-import-template.csv';
const text=fs.readFileSync(path,'utf8').trim();
const lines=text.split(/\r?\n/);
const header=lines[0].split(',');
const required=['region','recruiting_body','department','post_title','bps','exam_year','title','source_url','rights','verification','status'];
const missing=required.filter(x=>!header.includes(x));
if(missing.length){console.error('Missing columns:',missing.join(', '));process.exit(1);}
const ix=Object.fromEntries(header.map((x,i)=>[x,i]));
const allowedRegions=['Federal','Punjab','Sindh','Khyber Pakhtunkhwa','Balochistan','Azad Jammu & Kashmir','Gilgit-Baltistan'];
let errors=0;
for(let n=1;n<lines.length;n++){
 const cols=lines[n].split(',');
 const get=k=>(cols[ix[k]]||'').trim();
 const bps=Number(get('bps')),year=Number(get('exam_year'));
 if(!allowedRegions.includes(get('region'))){console.error('Line',n+1,'invalid region');errors++;}
 if(!Number.isInteger(bps)||bps<5||bps>22){console.error('Line',n+1,'BPS must be 5–22');errors++;}
 if(!Number.isInteger(year)||year<1990||year>2100){console.error('Line',n+1,'invalid exam_year');errors++;}
 if(!/^https?:\/\//.test(get('source_url'))){console.error('Line',n+1,'source_url must be HTTP(S)');errors++;}
 if(!get('recruiting_body')||!get('post_title')||!get('title')){console.error('Line',n+1,'required metadata missing');errors++;}
}
if(errors){console.error('Validation failed:',errors);process.exit(1);}
console.log('CSV structure checks passed. This does not verify content accuracy or reuse rights.');
