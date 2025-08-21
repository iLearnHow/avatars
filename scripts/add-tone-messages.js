// scripts/add-tone-messages.js
// Ensure teaching_moment & response_script have neutral and fun if missing by copying grandmother and tweaking text.
const fs = require('fs');
const file = 'lessons/puppies-lesson-final.json';
const data = JSON.parse(fs.readFileSync(file,'utf-8'));

function tweak(text,prefix){
  if(!text) return '';
  if(prefix==='🎉') return text.replace('Oh, my dear,','🎉').replace('💕',' 🐕');
  if(prefix==='') return text.replace('Oh, my dear, ','');
  return text;
}

for(const phase of Object.values(data.phases)){
  if(!phase.choices) continue;
  for(const choice of Object.values(phase.choices)){
    // teaching_moment
    if(choice.teaching_moment){
      const gm = choice.teaching_moment.grandmother;
      if(gm){
        choice.teaching_moment.neutral=choice.teaching_moment.neutral||{};
        choice.teaching_moment.fun=choice.teaching_moment.fun||{};
        for(const [age,msg] of Object.entries(gm)){
          if(!choice.teaching_moment.neutral[age])
            choice.teaching_moment.neutral[age]=tweak(msg,'');
          if(!choice.teaching_moment.fun[age])
            choice.teaching_moment.fun[age]=tweak(msg,'🎉');
        }
      }
    }
    // response_script similar
    if(choice.response_script){
      const gm = choice.response_script.grandmother;
      if(gm){
        choice.response_script.neutral=choice.response_script.neutral||{};
        choice.response_script.fun=choice.response_script.fun||{};
        for(const [age,msg] of Object.entries(gm)){
          if(!choice.response_script.neutral[age])
            choice.response_script.neutral[age]=tweak(msg,'');
          if(!choice.response_script.fun[age])
            choice.response_script.fun[age]=tweak(msg,'🎉');
        }
      }
    }
  }
}
fs.writeFileSync(file,JSON.stringify(data,null,2));
console.log('Added neutral and fun messages where missing');