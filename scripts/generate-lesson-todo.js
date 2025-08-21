#!/usr/bin/env node
/**
 * scripts/generate-lesson-todo.js
 * Generate a comprehensive TODO list with subtasks for all 366 lessons.
 * Sources titles/objectives primarily from complete-curriculum.js.
 * Also inspects filesystem to pre-check which artifacts already exist.
 *
 * Outputs:
 *  - tasks/lesson_todo.json
 *  - tasks/lesson_todo.md
 */

const fs = require('fs');
const path = require('path');

// Root dir from this script location
const ROOT = path.join(__dirname, '..');

// Load curriculum map (CJS export guarded for Node)
const { COMPLETE_CURRICULUM } = require(path.join(ROOT, 'complete-curriculum.js'));

// Known slug mappings and normalized sources for golden lessons
const GOLDEN_SLUGS = new Map([
  [1, 'the-sun'],
  [10, 'the-moon'],
  [24, 'earths-magnificent-oceans']
]);

const NORMALIZED_BY_SLUG = new Map([
  ['the-sun', 'sun_normalized.json'],
  ['the-moon', 'moon_normalized.json'],
  ['earths-magnificent-oceans', 'ocean_normalized.json']
]);

function slugify(title) {
  if (!title) return '';
  return String(title)
    .toLowerCase()
    .replace(/&/g, ' and ')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

function exists(p) { try { return fs.existsSync(p); } catch { return false; } }

function buildDayRecord(day) {
  const meta = COMPLETE_CURRICULUM?.[day] || null;
  const title = meta?.title || `Day ${day}`;
  const learningObjective = meta?.learning_objective || '';
  const slug = GOLDEN_SLUGS.get(day) || slugify(title) || `day-${day}`;

  // File paths
  const dataDir = path.join(ROOT, 'data');
  const normalizedName = NORMALIZED_BY_SLUG.get(slug) || `${slug}_normalized.json`;
  const normalizedPath = path.join(dataDir, normalizedName);
  const phasedEN = path.join(dataDir, `${slug}.en.phased.json`);
  const phasedES = path.join(dataDir, `${slug}.es.phased.json`);
  const phasedFR = path.join(dataDir, `${slug}.fr.phased.json`);
  const ttsJobsEN = path.join(dataDir, 'tts_jobs', `${slug}.en.json`);
  const ttsJobsES = path.join(dataDir, 'tts_jobs', `${slug}.es.json`);
  const ttsJobsFR = path.join(dataDir, 'tts_jobs', `${slug}.fr.json`);

  const status = {
    normalizedExists: exists(normalizedPath),
    phased: {
      en: exists(phasedEN),
      es: exists(phasedES),
      fr: exists(phasedFR)
    },
    ttsJobs: {
      en: exists(ttsJobsEN),
      es: exists(ttsJobsES),
      fr: exists(ttsJobsFR)
    }
  };

  // Commands (non-interactive) to achieve each step
  const cmdGeneratePhased = `node scripts/generate-phased-from-normalized.js --input data/${path.basename(normalizedPath)} --outbase data/${slug} --lang en --clone-es-fr`;
  const cmdExtractTtsJobs = `node scripts/extract-tts-jobs.js --slugs ${slug} --langs en,es,fr --in data --out data/tts_jobs`;

  const subtasks = [
    {
      id: 'author-normalized-dna',
      label: 'Author normalized DNA source',
      target: `data/${path.basename(normalizedPath)}`,
      done: status.normalizedExists
    },
    {
      id: 'generate-phased-en-es-fr',
      label: 'Generate PhaseDNA v1 (en + clone es/fr)',
      target: `data/${slug}.en|es|fr.phased.json`,
      command: cmdGeneratePhased,
      done: status.phased.en && status.phased.es && status.phased.fr
    },
    {
      id: 'extract-tts-jobs',
      label: 'Extract TTS jobs (per-phase narration) for en/es/fr',
      target: `data/tts_jobs/${slug}.en|es|fr.json`,
      command: cmdExtractTtsJobs,
      done: status.ttsJobs.en && status.ttsJobs.es && status.ttsJobs.fr
    },
    {
      id: 'validate-schema',
      label: 'Validate PhaseDNA shape and TTS jobs presence',
      target: 'npm run validate',
      done: false
    },
    {
      id: 'wire-loader',
      label: 'Ensure day-to-slug resolver loads this lesson in index.html',
      target: 'Update getDNALessonData to include this day or general resolver',
      done: [1,10,24].includes(day)
    },
    {
      id: 'avatar-cues',
      label: 'Attach minimal avatar cues/moods per phase (optional)',
      target: 'Edit phased JSON: phases[].avatar.cues',
      done: false
    },
    {
      id: 'localization-review',
      label: 'Quick review of es/fr clones for obvious issues',
      target: `data/${slug}.es|fr.phased.json`,
      done: false
    },
    {
      id: 'prefetch-config',
      label: 'Enable prefetch of next-phase TTS during playback',
      target: 'Player optimization (once globally implemented)',
      done: false
    },
    {
      id: 'qa-run',
      label: 'QA in index.html: phase texts render, TTS plays, interactions flow',
      target: `Open index.html?day=${day}`,
      done: false
    }
  ];

  return {
    day,
    title,
    slug,
    learningObjective,
    files: {
      normalized: `data/${path.basename(normalizedPath)}`,
      phased: {
        en: `data/${slug}.en.phased.json`,
        es: `data/${slug}.es.phased.json`,
        fr: `data/${slug}.fr.phased.json`
      },
      ttsJobs: {
        en: `data/tts_jobs/${slug}.en.json`,
        es: `data/tts_jobs/${slug}.es.json`,
        fr: `data/tts_jobs/${slug}.fr.json`
      }
    },
    status,
    subtasks
  };
}

function ensureDir(dirPath) {
  if (!fs.existsSync(dirPath)) fs.mkdirSync(dirPath, { recursive: true });
}

function renderMarkdown(todoList) {
  const lines = [];
  lines.push('# Lesson TODO (All 366)');
  lines.push('');
  lines.push('This file is auto-generated. Do not edit by hand.');
  lines.push('');
  for (const item of todoList) {
    lines.push(`## Day ${item.day} — ${item.title}`);
    if (item.learningObjective) {
      lines.push(`- Learning objective: ${item.learningObjective}`);
    }
    lines.push(`- Slug: ${item.slug}`);
    lines.push('- Files:');
    lines.push(`  - Normalized: ${item.files.normalized}`);
    lines.push(`  - PhaseDNA: ${item.files.phased.en}, ${item.files.phased.es}, ${item.files.phased.fr}`);
    lines.push(`  - TTS jobs: ${item.files.ttsJobs.en}, ${item.files.ttsJobs.es}, ${item.files.ttsJobs.fr}`);
    lines.push('- Subtasks:');
    for (const st of item.subtasks) {
      const mark = st.done ? 'x' : ' ';
      const cmd = st.command ? ` (cmd: ${st.command})` : '';
      lines.push(`  - [${mark}] ${st.label} → ${st.target}${cmd}`);
    }
    lines.push('');
  }
  return lines.join('\n');
}

function main() {
  const todoList = [];
  for (let day = 1; day <= 366; day += 1) {
    todoList.push(buildDayRecord(day));
  }

  const outDir = path.join(ROOT, 'tasks');
  ensureDir(outDir);

  const jsonPath = path.join(outDir, 'lesson_todo.json');
  const mdPath = path.join(outDir, 'lesson_todo.md');

  fs.writeFileSync(jsonPath, JSON.stringify({ generatedAt: new Date().toISOString(), items: todoList }, null, 2));
  fs.writeFileSync(mdPath, renderMarkdown(todoList));
  console.log(`✅ Wrote ${jsonPath}`);
  console.log(`✅ Wrote ${mdPath}`);
}

if (require.main === module) main();


