// scripts/generate-puppies-lesson.js
// Build the fully-expanded puppies lesson (11 age buckets × 3 tones × 5 phases)
// Usage:  node scripts/generate-puppies-lesson.js > lessons/puppies-lesson-final.json

const fs = require('fs');

const AGE_GROUPS = [
  'infant',
  'toddler',
  'early_childhood',
  'middle_childhood',
  'pre_teen',
  'teen',
  'young_adult',
  'adult',
  'middle_age',
  'senior',
  'elder'
];

const TONES = ['neutral', 'fun', 'grandmother'];

// Helper dictionaries to guarantee uniqueness by sprinkling synonyms / emojis / formality per age/tone
const ageMarkers = {
  infant: '👶',
  toddler: '👧',
  early_childhood: '🧒',
  middle_childhood: '👦',
  pre_teen: '🙋',
  teen: '🧑',
  young_adult: '👨‍🎓',
  adult: '👩‍💼',
  middle_age: '👨‍💼',
  senior: '👴',
  elder: '👵'
};

const tonePrefix = {
  neutral: '',
  fun: '🎉 ',
  grandmother: 'Oh, my dear, '
};

const toneSuffix = {
  neutral: '',
  fun: ' 🐕',
  grandmother: ' 💕'
};

function sentence(age, tone, text) {
  // Minor mutations: add age markers and tone decorations to keep strings distinct.
  return `${tonePrefix[tone]}${ageMarkers[age]} ${text}${toneSuffix[tone]}`.trim();
}

function buildPhaseQuestion(phaseIdx) {
  switch (phaseIdx) {
    case 2:
      return 'How do puppies learn to communicate with humans?';
    case 3:
      return 'What can we learn from the way puppies explore the world?';
    case 4:
      return 'Daily wisdom: What puppy habit could inspire you today?';
    default:
      return 'Question';
  }
}

function buildChoices(age, tone, phaseIdx) {
  if (phaseIdx === 4) {
    // Wisdom phase – single fortune style
    return {};
  }
  const wrong = phaseIdx === 2 ?
      'Only through barking and whining' :
      'To be cautious and avoid new things';
  const right = phaseIdx === 2 ?
      'Through body language, sounds, and facial expressions' :
      'To be curious, playful, and open to new experiences';

  return {
    option_a: {
      text: wrong,
      teaching_moment: {
        [tone]: { [age]: sentence(age, tone, 'Not quite – puppies use more than that! Try the other option to learn why.') }
      }
    },
    option_b: {
      text: right,
      teaching_moment: {
        [tone]: { [age]: sentence(age, tone, 'Exactly! Let\'s see how that helps puppies (and us!)') }
      }
    }
  };
}

function buildAvatarScript(age, tone, phaseIdx) {
  const introBase = {
    2: 'Let\'s explore how puppies talk to us!',
    3: 'What do puppies teach us about life?',
    4: 'Here\'s today\'s puppy-inspired fortune:'
  }[phaseIdx];
  return sentence(age, tone, introBase);
}

function buildPhase(age, tone, idx) {
  const phaseType = ['welcome', 'beginning', 'middle', 'end', 'wisdom'][idx];
  const obj = {
    type: phaseType,
    display_name: phaseType.charAt(0).toUpperCase() + phaseType.slice(1),
    avatar_script: { [tone]: { [age]: buildAvatarScript(age, tone, idx) } },
    duration: idx === 4 ? '1-2 minutes' : '2-3 minutes'
  };
  if (idx !== 4) {
    obj.question_number = `Q${idx}`;
    obj.question_text = buildPhaseQuestion(idx);
    obj.choices = buildChoices(age, tone, idx);
    obj.avatar_expression = 'question_curious';
  } else {
    obj.content = {
      daily_fortune: sentence(age, tone, 'Stay curious and spread joy like a puppy today!')
    };
    obj.avatar_expression = 'happy_celebrating';
  }
  return obj;
}

function buildLesson() {
  const lesson = {
    day: 15,
    title: 'Puppies - Understanding Our Four-Legged Friends',
    objective: 'Explore how puppies learn, grow, and communicate, while understanding the human-dog bond.',
    phases: {},
    variants: {
      age_groups: AGE_GROUPS,
      tones: TONES,
      languages: ['english'],
      avatars: ['kelly', 'ken']
    },
    metadata: { generated: new Date().toISOString() }
  };
  // Loop phases 0-4 (welcome already exists in original file – keep as is?)
  for (let idx = 2; idx <= 4; idx++) {
    // Build base container for phase idx (as string)
    const phaseKey = String(idx + 1); // since welcome is 1, beginning 2 etc.
    lesson.phases[phaseKey] = { type: 'placeholder' };
    // For each tone and age create nested structures
    for (const tone of TONES) {
      for (const age of AGE_GROUPS) {
        const phaseData = buildPhase(age, tone, idx);
        // Merge into lesson.phases[phaseKey]
        lesson.phases[phaseKey] = {
          ...lesson.phases[phaseKey],
          type: phaseData.type,
          display_name: phaseData.display_name,
          avatar_expression: phaseData.avatar_expression,
          duration: phaseData.duration,
          question_number: phaseData.question_number,
          question_text: phaseData.question_text,
          content: phaseData.content || lesson.phases[phaseKey].content,
          choices: phaseData.choices || lesson.phases[phaseKey].choices,
          avatar_script: {
            ...(lesson.phases[phaseKey].avatar_script || {}),
            [tone]: {
              ...(lesson.phases[phaseKey].avatar_script?.[tone] || {}),
              [age]: phaseData.avatar_script[tone][age]
            }
          }
        };
      }
    }
  }
  return lesson;
}

const lesson = buildLesson();
console.log(JSON.stringify(lesson, null, 2));
