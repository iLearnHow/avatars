// scripts/generate-puppies-lesson-fixed.js
// Build a fully-validated Puppies lesson that passes scripts/validate-lesson.js
// Usage:   node scripts/generate-puppies-lesson-fixed.js > lessons/puppies-lesson-final.json

const AGE_GROUPS=[
  'infant','toddler','early_childhood','middle_childhood','pre_teen','teen',
  'young_adult','adult','middle_age','senior','elder'
];
const TONES=['neutral','fun','grandmother'];
const PHASES=['welcome','beginning','middle','end','wisdom'];

const ageEmoji={
  infant:'👶',toddler:'👧',early_childhood:'🧒',middle_childhood:'👦',pre_teen:'🙋',
  teen:'🧑',young_adult:'👨‍🎓',adult:'👩‍💼',middle_age:'👨‍💼',senior:'👴',elder:'👵'
};
const tonePrefix={neutral:'',fun:'🎉 ',grandmother:'Oh, my dear, '};
const toneSuffix={neutral:'',fun:' 🐕',grandmother:' 💕'};
const sentence=(age,tone,text)=>`${tonePrefix[tone]}${ageEmoji[age]} ${text}${toneSuffix[tone]}`.trim();

function buildWelcome(age,tone){
  return {
    type:'welcome',display_name:'Welcome',avatar_expression:'teaching_explaining',duration:'30-45 seconds',
    content:{ lesson_preview: sentence(age,tone,'Today we will discover how puppies learn, grow and communicate!') },
    avatar_script:{ [tone]:{ [age]: sentence(age,tone,'Welcome to our puppy adventure!') } }
  };
}
function questionByIdx(idx){
  return [
    '',
    'What is the most important thing a puppy needs to grow up healthy and happy?',
    'How do puppies learn to communicate with humans?',
    'What can we learn from the way puppies explore the world?',
    'Daily fortune: What puppy habit could inspire you today?'
  ][idx];
}
function buildQA(age,tone,idx){
  const wrong = idx===1? 'Lots of toys and treats'
               : idx===2? 'Only through barking and whining'
               : 'To be cautious and avoid new things';
  const right = idx===1? 'Love, care, and consistent training'
               : idx===2? 'Through body language, sounds and facial expressions'
               : 'To be curious, playful and open to new experiences';
  const makeChoice=(text,correct)=>({
    text,
    teaching_moment:{ [tone]:{ [age]: sentence(age,tone, correct?'Exactly!':'Not quite – try the other option!') } },
    response_script: { [tone]:{ [age]: sentence(age,tone, correct?'Great insight – let’s keep going!':'Let’s think again about what puppies really need.') } }
  });
  return {
    type:PHASES[idx],display_name:PHASES[idx][0].toUpperCase()+PHASES[idx].slice(1),avatar_expression:'question_curious',
    question_number:`Q${idx}`,duration:'2-3 minutes',
    question_text: sentence(age,tone,questionByIdx(idx)),
    choices:{
      option_a: makeChoice(sentence(age,tone,wrong),false),
      option_b: makeChoice(sentence(age,tone,right),true)
    },
    avatar_script:{ [tone]:{ [age]: sentence(age,tone,'Let’s dive in!') } }
  };
}
function buildWisdom(age,tone){
  return {
    type:'wisdom',display_name:'Wisdom',avatar_expression:'happy_celebrating',duration:'1-2 minutes',
    content:{ daily_fortune:{ [tone]:{ [age]: sentence(age,tone,'Stay curious and spread joy like a puppy today!') } } },
    avatar_script:{ [tone]:{ [age]: sentence(age,tone,'Here’s today’s puppy-inspired fortune:') } }
  };
}

function makeEmptyPhase(type){return {type,display_name:type.charAt(0).toUpperCase()+type.slice(1)};}

function buildLesson(){
  // create array skeleton 5 phases
  const phases=[...PHASES.map(makeEmptyPhase)];
  for(const tone of TONES){
    for(const age of AGE_GROUPS){
      phases[0]=merge(phases[0],buildWelcome(age,tone));
      phases[1]=merge(phases[1],buildQA(age,tone,1));
      phases[2]=merge(phases[2],buildQA(age,tone,2));
      phases[3]=merge(phases[3],buildQA(age,tone,3));
      phases[4]=merge(phases[4],buildWisdom(age,tone));
    }
  }
  return {
    day:15,
    title:'Puppies - Understanding Our Four-Legged Friends',
    objective:'Explore how puppies learn, grow, and communicate, while understanding the human-dog bond.',
    phases,
    variants:{ age_groups:AGE_GROUPS, tones:TONES, languages:['english'], avatars:['kelly','ken'] },
    metadata:{ generated:new Date().toISOString() }
  };
}

function merge(base,newObj){
  // deep merge helper tailored for this generator
  const out={...base};
  for(const k in newObj){
    if(typeof newObj[k]==='object' && newObj[k]!==null && !Array.isArray(newObj[k])){
      out[k]=merge(out[k]||{},newObj[k]);
    }else out[k]=newObj[k];
  }
  return out;
}

console.log(JSON.stringify(buildLesson(),null,2));
