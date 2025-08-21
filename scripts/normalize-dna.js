#!/usr/bin/env node
/**
 * scripts/normalize-dna.js
 * Canonicalize lesson DNA for autoplaying 5-phase lessons with precomputed languages.
 * - Ensures required structure: lesson_metadata, age_expressions, core_lesson_structure (q1-3), wisdom_phase_content
 * - Fills missing ages/tones by cloning nearest/neutral
 * - Adds language_translations and tone_delivery_dna with safe defaults (no external models)
 * - Accepts either canonical DNA or phase-style JSON (like puppies) and converts
 *
 * Usage:
 *   node scripts/normalize-dna.js --input <path> --output <path> --id <lesson_id> --title <title>
 * Examples:
 *   node scripts/normalize-dna.js --input dna-templates/the-sun.json --output data/sun_normalized.json --id the-sun --title "The Sun"
 *   node scripts/normalize-dna.js --input data/the-moon.json --output data/moon_normalized.json --id the-moon --title "The Moon"
 *   node scripts/normalize-dna.js --input lessons/puppies-lesson-final.json --output data/puppies_normalized.json --id puppies --title "Puppies"
 */

const fs = require('fs');
const path = require('path');

const AGES = ['2','5','8','12','16','25','40','60','80','102'];
const TONES = ['neutral','fun','grandmother'];
const LANGUAGES = ['english','spanish','french'];

function readJson(p) { return JSON.parse(fs.readFileSync(p, 'utf8')); }
function writeJson(p, obj) { fs.writeFileSync(p, JSON.stringify(obj, null, 2)); }

function slugify(str) { return (str||'').toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/(^-|-$)/g,''); }

function ensureConceptExpressions(dna, title){
  dna.age_expressions ||= {};
  for (const a of AGES) {
    dna.age_expressions[a] ||= { concept_name: {} };
    for (const t of TONES) {
      const base = dna.age_expressions[a].concept_name[t] || dna.age_expressions[a].concept_name.neutral || {};
      dna.age_expressions[a].concept_name[t] = {
        display_text: base.display_text || title || 'Lesson',
        voice_over_script: base.voice_over_script || base.display_text || title || 'Welcome to today\'s lesson.'
      };
    }
  }
}

function coalesceQuestionBlock(src, fallback){
  if (!src) return fallback || null;
  const out = { concept_focus: src.concept_focus || (fallback && fallback.concept_focus) || 'Core Concept', ages: {} };
  for (const a of AGES) {
    const ageSrc = (src.ages && src.ages[a]) || (fallback && fallback.ages && fallback.ages[a]) || null;
    const ageOut = { question: { neutral: { display_text: '' } }, option_a: { display_text: '' }, option_b: { display_text: '' }, teaching_moments: { option_a_response: '', option_b_response: '' }, correct_option: 'b' };
    if (ageSrc) {
      // question can be string or {tone:{display_text}}
      const q = ageSrc.question || {};
      const neutralQ = (q.neutral && (q.neutral.display_text||q.neutral.voice_over_script)) || q.display_text || q.voice_over_script || '';
      ageOut.question = {
        neutral: { display_text: neutralQ || 'Here\'s a question to start.' },
        fun: { display_text: (q.fun && (q.fun.display_text||q.fun.voice_over_script)) || neutralQ },
        grandmother: { display_text: (q.grandmother && (q.grandmother.display_text||q.grandmother.voice_over_script)) || neutralQ }
      };
      ageOut.option_a.display_text = (ageSrc.option_a && (ageSrc.option_a.display_text||ageSrc.option_a.voice_over_script)) || 'Option A';
      ageOut.option_b.display_text = (ageSrc.option_b && (ageSrc.option_b.display_text||ageSrc.option_b.voice_over_script)) || 'Option B';
      const tm = ageSrc.teaching_moments || {};
      ageOut.teaching_moments.option_a_response = (tm.option_a_response && (tm.option_a_response.voice_over_script||tm.option_a_response.display_text||tm.option_a_response)) || 'Let\'s think again about this.';
      ageOut.teaching_moments.option_b_response = (tm.option_b_response && (tm.option_b_response.voice_over_script||tm.option_b_response.display_text||tm.option_b_response)) || 'Exactly, that\'s the idea.';
    } else {
      // synth minimal
      ageOut.question = {
        neutral: { display_text: 'What do you think is the most important part?' },
        fun: { display_text: 'Which one seems right to you?' },
        grandmother: { display_text: 'What would you choose, dear?' }
      };
      ageOut.option_a.display_text = 'A';
      ageOut.option_b.display_text = 'B';
      ageOut.teaching_moments.option_a_response = 'Good try—let\'s check the other choice.';
      ageOut.teaching_moments.option_b_response = 'Exactly—nice reasoning!';
    }
    out.ages[a] = ageOut;
  }
  return out;
}

function ensureQuestions(dna){
  dna.core_lesson_structure ||= {};
  const q1 = coalesceQuestionBlock(dna.core_lesson_structure.question_1, null);
  const q2 = coalesceQuestionBlock(dna.core_lesson_structure.question_2, q1);
  const q3 = coalesceQuestionBlock(dna.core_lesson_structure.question_3, q2);
  dna.core_lesson_structure = { question_1: q1, question_2: q2, question_3: q3 };

  // Ensure each age block has a correct_option and tone expansions for question text
  for (const qk of ['question_1','question_2','question_3']){
    const qb = dna.core_lesson_structure[qk];
    for (const a of AGES){
      const blk = qb.ages[a];
      if (!blk) continue;
      // Expand tones for question if neutral only
      const baseQ = blk.question?.neutral?.display_text || 'Here\'s a question:';
      blk.question = blk.question || {};
      blk.question.neutral = blk.question.neutral || { display_text: baseQ };
      blk.question.fun = blk.question.fun || { display_text: baseQ };
      blk.question.grandmother = blk.question.grandmother || { display_text: baseQ };
      // Guard correct_option
      if (!blk.correct_option || !['a','b'].includes(blk.correct_option)) blk.correct_option = 'b';
      // Trim texts
      blk.option_a.display_text = (blk.option_a.display_text||'').toString().trim();
      blk.option_b.display_text = (blk.option_b.display_text||'').toString().trim();
    }
  }
}

function ensureWisdom(dna){
  dna.wisdom_phase_content ||= { fortune: {} };
  dna.wisdom_phase_content.fortune ||= {};
  for (const t of TONES) {
    const base = dna.wisdom_phase_content.fortune[t] || dna.wisdom_phase_content.fortune.neutral || {};
    dna.wisdom_phase_content.fortune[t] = {
      display_text: base.display_text || 'Carry this with you today.',
      voice_over_script: base.voice_over_script || base.display_text || 'Carry this with you today.'
    };
  }
}

function addLanguageAndToneSystems(dna){
  // Minimal but complete precomputed language/tone systems
  dna.language_translations ||= {};
  for (const lang of LANGUAGES) {
    dna.language_translations[lang] ||= {
      key_phrases: {
        greeting: lang==='spanish' ? '¡Hola!' : lang==='french' ? 'Bonjour!' : 'Hello!',
        question_intro: lang==='spanish' ? 'Una pregunta:' : lang==='french' ? 'Une question :' : "Here's a question:",
        validation_positive: lang==='spanish' ? '¡Excelente!' : lang==='french' ? 'Excellent !' : 'Excellent!'
      }
    };
  }
  dna.tone_delivery_dna ||= {};
  for (const tone of TONES) {
    dna.tone_delivery_dna[tone] ||= {
      language_patterns: {
        openings: [
          tone==='grandmother' ? 'I\'m so happy you\'re here today.' :
          tone==='fun' ? "This is going to be fun!" :
          'Welcome to today\'s lesson.'
        ],
        encouragements: [
          tone==='grandmother' ? 'You\'re doing wonderfully.' :
          tone==='fun' ? 'Great energy—keep going!' :
          'Good thinking.'
        ],
        closings: [
          tone==='grandmother' ? 'I\'m proud of you, dear.' :
          tone==='fun' ? 'Awesome work—see you next time!' :
          'Nice work today.'
        ]
      }
    };
  }
}

function fromPuppiesPhases(json, meta){
  // Convert phase-style JSON (like puppies-lesson-final.json) into canonical DNA
  const phases = json.phases || [];
  function find(type){ return phases.find(p=>p.type===type) || null; }
  function tmText(obj){
    if (!obj) return '';
    // prefer neutral.young_adult
    return (
      obj.neutral?.young_adult || obj.neutral?.adult || obj.fun?.young_adult || obj.grandmother?.young_adult || ''
    ).toString();
  }
  const q1 = find('beginning'); const q2 = find('middle')||q1; const q3 = find('end')||q1;
  const buildQ = (px) => ({ concept_focus: 'Core Idea', ages: {
    '25': {
      question: { neutral: { display_text: px?.question_text || '' } },
      option_a: { display_text: px?.choices?.option_a?.text || 'A' },
      option_b: { display_text: px?.choices?.option_b?.text || 'B' },
      teaching_moments: { option_a_response: tmText(px?.choices?.option_a?.teaching_moment), option_b_response: tmText(px?.choices?.option_b?.teaching_moment) }
    }
  }});
  const dna = {
    lesson_metadata: { lesson_id: meta.id, day: meta.day||0, universal_concept: json.title||meta.title, learning_essence: json.objective||'' },
    age_expressions: { '25': { concept_name: { neutral: { display_text: json.title||meta.title, voice_over_script: json.title||meta.title } } } },
    core_lesson_structure: {
      question_1: buildQ(q1),
      question_2: buildQ(q2),
      question_3: buildQ(q3)
    },
    wisdom_phase_content: { fortune: { neutral: { display_text: 'Great job today.', voice_over_script: 'Great job today.' } } }
  };
  return dna;
}

function normalize(input, id, title){
  const src = readJson(input);
  let dna = src;
  // Detect phase JSON
  if (src && src.phases && Array.isArray(src.phases)) {
    dna = fromPuppiesPhases(src, { id, title });
  }
  dna.lesson_metadata ||= { lesson_id: id, universal_concept: title };
  dna.lesson_metadata.lesson_id = id;
  dna.lesson_metadata.universal_concept ||= title;
  ensureConceptExpressions(dna, title);
  ensureQuestions(dna);
  ensureWisdom(dna);
  addLanguageAndToneSystems(dna);
  return dna;
}

function main(){
  const args = process.argv.slice(2);
  const get = (k, d=null) => {
    const i = args.indexOf(`--${k}`);
    return i>=0 ? args[i+1] : d;
  };
  const input = get('input');
  const output = get('output');
  let id = get('id');
  let title = get('title');
  if (!input || !output) {
    console.error('Usage: node scripts/normalize-dna.js --input <path> --output <path> --id <lesson_id> --title <title>');
    process.exit(1);
  }
  if (!id || !title) {
    const base = path.basename(output).replace(/_normalized\.json$/, '').replace(/\.json$/, '');
    id = id || slugify(base);
    title = title || base.replace(/-/g,' ').replace(/\b\w/g, c=>c.toUpperCase());
  }
  const normalized = normalize(input, id, title);
  writeJson(output, normalized);
  console.log(`✅ Normalized DNA written to ${output}`);
}

if (require.main === module) main();


