import fs from 'node:fs';

const file = 'src/data/practiceQuestions.ts';
const source = fs.readFileSync(file, 'utf8');
const rows = source.split(/\r?\n/).filter(line => /^\s*\{id\s*:/.test(line));
const errors = [];
const ids = new Set();
const questionSets = new Set();

function stringField(line, field) {
  const marker = new RegExp('\\b' + field + '\\s*:\\s*').exec(line);
  if (!marker) return undefined;
  let index = marker.index + marker[0].length;
  const quote = line[index++];
  if (quote !== "'" && quote !== '"') return undefined;
  let value = '';
  while (index < line.length) {
    const char = line[index++];
    if (char === '\\') {
      if (index < line.length) value += line[index++];
    } else if (char === quote) {
      return value;
    } else {
      value += char;
    }
  }
  return undefined;
}

function quotedValues(input) {
  const values = [];
  let index = 0;
  while (index < input.length) {
    while (index < input.length && /[\s,]/.test(input[index])) index++;
    if (index >= input.length) break;
    const quote = input[index++];
    if (quote !== "'" && quote !== '"') return [];
    let value = '';
    let closed = false;
    while (index < input.length) {
      const char = input[index++];
      if (char === '\\') {
        if (index < input.length) value += input[index++];
      } else if (char === quote) {
        closed = true;
        break;
      } else {
        value += char;
      }
    }
    if (!closed) return [];
    values.push(value.trim());
    while (index < input.length && /\s/.test(input[index])) index++;
    if (index < input.length && input[index] !== ',') return [];
  }
  return values;
}

function normalize(value) {
  return (value || '').toLowerCase().replace(/[“”"'.,?!:;()]/g, '').replace(/\s+/g, ' ').trim();
}

for (const [index, line] of rows.entries()) {
  const id = stringField(line, 'id');
  const subject = stringField(line, 'subject');
  const question = stringField(line, 'question');
  const explanation = stringField(line, 'explanation');
  const optionsMatch = line.match(/\boptions\s*:\s*\[(.*)\]\s*,\s*answerIndex\s*:/);
  const answerMatch = line.match(/\banswerIndex\s*:\s*(-?\d+)/);
  const n = index + 1;

  if (!id?.trim()) errors.push('Row ' + n + ': missing ID');
  else if (ids.has(id)) errors.push('Row ' + n + ': duplicate ID ' + id);
  else ids.add(id);
  if (!subject?.trim()) errors.push('Row ' + n + ': missing subject');
  if (!question?.trim()) errors.push('Row ' + n + ': missing question');
  if (!explanation?.trim()) errors.push('Row ' + n + ': missing explanation');

  if (!optionsMatch) {
    errors.push('Row ' + n + ': missing options');
    continue;
  }
  const options = quotedValues(optionsMatch[1]);
  if (options.length !== 4) errors.push('Row ' + n + ': expected 4 options, found ' + options.length);
  if (options.some(option => !option)) errors.push('Row ' + n + ': blank option');
  if (new Set(options.map(normalize)).size !== options.length) errors.push('Row ' + n + ': duplicate options');

  const answerIndex = answerMatch ? Number(answerMatch[1]) : -1;
  if (!Number.isInteger(answerIndex) || answerIndex < 0 || answerIndex >= options.length) {
    errors.push('Row ' + n + ': answerIndex is outside the options');
  }

  if (subject && question) {
    const key = [normalize(subject), normalize(question), ...options.map(normalize), answerIndex].join('|');
    if (questionSets.has(key)) errors.push('Row ' + n + ': duplicate question and answer set');
    else questionSets.add(key);
  }
}

if (!rows.length) errors.push('No MCQ rows found.');
if (errors.length) {
  console.error(errors.join('\n'));
  process.exit(1);
}
console.log('MCQ checks passed: ' + rows.length + ' questions, ' + ids.size + ' unique IDs, no exact duplicate question/answer sets.');
