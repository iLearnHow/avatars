// scripts/validate-lesson.js
// Usage: node scripts/validate-lesson.js lessons/puppies-lesson-final.json
const fs = require('fs');

const AGE = [
  'infant','toddler','early_childhood','middle_childhood','pre_teen','teen',
  'young_adult','adult','middle_age','senior','elder'
];
const TONE = ['neutral','fun','grandmother'];
const REQUIRED_PHASES=['welcome','beginning','middle','end','wisdom'];

function fail(msg){ console.error('❌',msg); process.exitCode=1; }

const file=process.argv[2];
if(!file){console.error('Provide lesson path');process.exit(1);} 
const data=JSON.parse(fs.readFileSync(file,'utf-8'));

// collect phase array or object
let phasesArr=[];
if(Array.isArray(data.phases)) phasesArr=data.phases; else {
  // convert obj with numeric keys
  phasesArr=Object.values(data.phases);
}

// Phase presence
for(const p of REQUIRED_PHASES){
  if(!phasesArr.find(x=>x.type===p)) fail(`phase '${p}' missing`);
}

for(const phase of phasesArr){
  const type=phase.type;
  if(['beginning','middle','end'].includes(type)){
    if(!phase.question_text) fail(`${type} missing question_text`);
    if(!phase.choices) fail(`${type} missing choices`);
    ['option_a','option_b'].forEach(opt=>{
      const c=phase.choices[opt];
      if(!c||!c.text) fail(`${type}.${opt} text missing`);
      if(!c.teaching_moment) fail(`${type}.${opt} teaching_moment missing`);
      if(!c.response_script) fail(`${type}.${opt} response_script missing`);
      TONE.forEach(t=>{
        AGE.forEach(a=>{
          if(!c.teaching_moment[t]||!c.teaching_moment[t][a]) fail(`${type}.${opt}.teaching_moment ${t}/${a} missing`);
          if(!c.response_script[t]||!c.response_script[t][a]) fail(`${type}.${opt}.response_script ${t}/${a} missing`);
        })
      })
    })
  }
  if(type==='wisdom'){
    if(!phase.content||!phase.content.daily_fortune) fail('wisdom daily_fortune missing');
  }
}
if(process.exitCode) console.log('Validation failed'); else console.log('✅ All checks passed');