// scripts/check-template-uniqueness.js
// Validate that every question/choice/teaching_moment string is unique across tone+age buckets
const fs = require('fs');
const path = process.argv[2] || 'lessons/puppies-lesson-final.json';

const data = JSON.parse(fs.readFileSync(path, 'utf-8'));
const map = new Map();
let duplicateCount = 0;

function add(str, context) {
  const key = str.trim().toLowerCase();
  if (map.has(key)) {
    console.log('DUPLICATE:', context, '==', map.get(key));
    duplicateCount++;
  } else {
    map.set(key, context);
  }
}

for (const phase of Object.values(data.phases)) {
  const { question_text, choices, content } = phase;
  if (question_text) add(question_text, `Q:${phase.display_name}`);
  if (choices) {
    for (const [optKey, opt] of Object.entries(choices)) {
      add(opt.text, `${phase.display_name}-${optKey}`);
      if (opt.teaching_moment) {
        for (const [tone, agesObj] of Object.entries(opt.teaching_moment)) {
          for (const [age, msg] of Object.entries(agesObj)) {
            add(msg, `${phase.display_name}-${optKey}-${tone}-${age}`);
          }
        }
      }
    }
  }
  if (content?.daily_fortune) add(content.daily_fortune, `${phase.display_name}-fortune`);
}

if (duplicateCount === 0) {
  console.log('✅ No duplicates found. Template uniqueness validated.');
  process.exit(0);
} else {
  console.error(`❌ Found ${duplicateCount} duplicates. Please revise content.`);
  process.exit(1);
}
