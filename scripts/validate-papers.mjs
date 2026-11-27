import fs from 'node:fs';

const path = process.argv[2] || 'data/past-paper-import-template.csv';
const text = fs.readFileSync(path, 'utf8').replace(/^\uFEFF/, '').trim();
if (!text) {
  console.error('CSV file is empty.');
  process.exit(1);
}

function parseCsvLine(line) {
  const fields = [];
  let value = '';
  let quoted = false;
  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    if (char === '"') {
      if (quoted && line[i + 1] === '"') {
        value += '"';
        i++;
      } else {
        quoted = !quoted;
      }
    } else if (char === ',' && !quoted) {
      fields.push(value.trim());
      value = '';
    } else {
      value += char;
    }
  }
  if (quoted) throw new Error('Unclosed quoted CSV field.');
  fields.push(value.trim());
  return fields;
}

let lines;
try {
  lines = text.split(/\r?\n/).filter(line => line.trim().length > 0);
} catch (error) {
  console.error('Unable to read CSV:', error.message);
  process.exit(1);
}

let header;
try {
  header = parseCsvLine(lines[0]);
} catch (error) {
  console.error('Invalid CSV header:', error.message);
  process.exit(1);
}
if (new Set(header).size !== header.length) {
  console.error('CSV contains duplicate column names.');
  process.exit(1);
}

const required = ['region','recruiting_body','department','post_title','bps','exam_year','title','source_url','rights','verification','status'];
const missing = required.filter(name => !header.includes(name));
if (missing.length) {
  console.error('Missing columns:', missing.join(', '));
  process.exit(1);
}

const index = Object.fromEntries(header.map((name, i) => [name, i]));
const regions = ['Federal','Punjab','Sindh','Khyber Pakhtunkhwa','Balochistan','Azad Jammu & Kashmir','Gilgit-Baltistan'];
const rightsValues = ['public_domain','licensed','user_authorized','link_only','pending_review'];
const verificationValues = ['unverified','metadata_checked','paper_checked','answer_key_verified'];
const statuses = ['draft','review','published','rejected'];
const seen = new Set();
const errors = [];

function validUrl(value) {
  try {
    const url = new URL(value);
    return url.protocol === 'http:' || url.protocol === 'https:';
  } catch {
    return false;
  }
}

for (let lineNumber = 1; lineNumber < lines.length; lineNumber++) {
  let columns;
  try {
    columns = parseCsvLine(lines[lineNumber]);
  } catch (error) {
    errors.push('Line ' + (lineNumber + 1) + ': ' + error.message);
    continue;
  }
  if (columns.length !== header.length) {
    errors.push('Line ' + (lineNumber + 1) + ': expected ' + header.length + ' columns, found ' + columns.length);
    continue;
  }
  const get = name => (columns[index[name]] || '').trim();
  const bps = Number(get('bps'));
  const year = Number(get('exam_year'));
  if (!regions.includes(get('region'))) errors.push('Line ' + (lineNumber + 1) + ': invalid region');
  if (!get('recruiting_body') || !get('department') || !get('post_title') || !get('title')) errors.push('Line ' + (lineNumber + 1) + ': required metadata missing');
  if (!Number.isInteger(bps) || bps < 5 || bps > 22) errors.push('Line ' + (lineNumber + 1) + ': BPS must be 5–22');
  if (!Number.isInteger(year) || year < 1990 || year > new Date().getFullYear() + 1) errors.push('Line ' + (lineNumber + 1) + ': invalid exam_year');
  if (!validUrl(get('source_url'))) errors.push('Line ' + (lineNumber + 1) + ': source_url must be HTTP(S)');
  for (const field of ['paper_url','answer_key_url']) {
    if (get(field) && !validUrl(get(field))) errors.push('Line ' + (lineNumber + 1) + ': ' + field + ' must be HTTP(S)');
  }
  if (!rightsValues.includes(get('rights'))) errors.push('Line ' + (lineNumber + 1) + ': invalid rights value');
  if (!verificationValues.includes(get('verification'))) errors.push('Line ' + (lineNumber + 1) + ': invalid verification value');
  if (!statuses.includes(get('status'))) errors.push('Line ' + (lineNumber + 1) + ': invalid status value');
  if (get('rights') === 'pending_review' && get('status') === 'published') errors.push('Line ' + (lineNumber + 1) + ': pending-rights content cannot be published');
  if (get('status') === 'published' && get('verification') === 'unverified') errors.push('Line ' + (lineNumber + 1) + ': unverified content cannot be published');
  if (get('rights') !== 'pending_review' && !get('rights_evidence')) errors.push('Line ' + (lineNumber + 1) + ': rights_evidence is required');
  const key = [get('recruiting_body'),get('post_title'),get('exam_year'),get('title')].join('|').toLowerCase();
  if (seen.has(key)) errors.push('Line ' + (lineNumber + 1) + ': duplicate paper record');
  else seen.add(key);
}

if (errors.length) {
  console.error(errors.join('\n'));
  process.exit(1);
}
console.log('CSV checks passed. This validates metadata and rights declarations, not the factual accuracy of the paper or answer key.');
