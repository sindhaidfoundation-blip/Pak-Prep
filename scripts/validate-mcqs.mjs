import fs from 'node:fs';

const file = 'src/data/practiceQuestions.ts';
const source = fs.readFileSync(file, 'utf8');
const rows = source.split(/\r?\n/).filter(line => /\bid\s*:\s*['"]/.test(line));
const errors = [];
const ids = new Set();

for (const [index, line] of rows.entries()) {
  const id = line.match(/\bid\s*:\s*['"]([^'"]+)['"]/);
  const subject = line.match(/\bsubject\s*:\s*['"]([^'"]+)['"]/);
  const question = line.match(/\bquestion\s*:\s*(['"])(.*?)\1\s*,\s*options\s*:/);
  const options = line.match(/\boptions\s*:\s*\[([^\]]*)\]/);
  const answer = line.match(/\banswerIndex\s*:\s*(\d+)/);
  const explanation = line.match(/\bexplanation\s*:/);
  const n = index + 1;

  if (!id) errors.push(`Row ${n}: missing ID`);
  else if (ids.has(id[1])) errors.push(`Row ${n}: duplicate ID ${id[1]}`);
  else ids.add(id[1]);
  if (!subject) errors.push(`Row ${n}: missing subject`);
  if (!question || !question[2].trim()) errors.push(`Row ${n}: missing question`);
  if (!options) errors.push(`Row ${n}: missing options`);
  else {
    const optionCount = [...options[1].matchAll(/(['"])(.*?)\1/g)].length;
    if (optionCount !== 4) errors.push(`Row ${n}: expected 4 options, found ${optionCount}`);
    if (answer && Number(answer[1]) >= optionCount) errors.push(`Row ${n}: answerIndex is outside the options`);
  }
  if (!answer || Number(answer[1]) < 0 || Number(answer[1]) > 3) errors.push(`Row ${n}: invalid answerIndex`);
  if (!explanation) errors.push(`Row ${n}: missing explanation`);
}

if (!rows.length) errors.push('No MCQ rows found.');
if (errors.length) {
  console.error(errors.join('\n'));
  process.exit(1);
}
console.log(`MCQ structure checks passed: ${rows.length} questions, ${ids.size} unique IDs.`);
