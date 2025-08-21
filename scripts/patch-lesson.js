// scripts/patch-lesson.js
// Converts phases numeric keys to array and fills missing neutral/fun moments
const fs=require('fs');
const file='lessons/puppies-lesson-final.json';
const data=JSON.parse(fs.readFileSync(file,'utf-8'));

// Convert phases object to array if needed
if(!Array.isArray(data.phases)){
  const ordered=['1','2','3','4','5'];
  const arr=[];
  ordered.forEach((k,i)=>{ if(data.phases[k]) arr[i]=data.phases[k]; });
  data.phases=arr;
  console.log('Converted phases to array');
}
const AGE=['infant','toddler','early_childhood','middle_childhood','pre_teen','teen','young_adult','adult','middle_age','senior','elder'];
const TONE=['neutral','fun','grandmother'];
function cloneGm(src,prefix,suffix){
  return prefix+src.replace('Oh, my dear, ','').replace('💕',suffix);
}
// Fill gaps
for(const phase of data.phases){
  if(!phase||!phase.choices) continue;
  for(const choice of Object.values(phase.choices)){
    if(!choice.teaching_moment) continue;
    const gm=choice.teaching_moment.grandmother||{};
    TONE.slice(0,2).forEach(t=>{
      choice.teaching_moment[t]=choice.teaching_moment[t]||{};
      AGE.forEach(a=>{
        if(!choice.teaching_moment[t][a]&&gm[a]){
          choice.teaching_moment[t][a]=cloneGm(gm[a], t==='fun'?'🎉 ':'');
        }
      });
    });
    const gmR=choice.response_script?.grandmother||{};
    if(!choice.response_script) choice.response_script={};
    TONE.slice(0,2).forEach(t=>{
      choice.response_script[t]=choice.response_script[t]||{};
      AGE.forEach(a=>{
        if(!choice.response_script[t][a]&&gmR[a]){
          choice.response_script[t][a]=cloneGm(gmR[a], t==='fun'?'🎉 ':'');
        }
      });
    });
  }
}
fs.writeFileSync(file,JSON.stringify(data,null,2));
console.log('Patched missing neutral/fun');