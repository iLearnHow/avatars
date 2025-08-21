#!/usr/bin/env node
/**
 * scripts/extract-tts-jobs.js
 * Create per-phase TTS job manifests from PhaseDNA v1 files.
 *
 * Usage:
 *   node scripts/extract-tts-jobs.js \
 *     --slugs the-sun,the-moon,earths-magnificent-oceans,puppies \
 *     --langs en,es,fr \
 *     --in data \
 *     --out data/tts_jobs
 */

const fs = require('fs');
const path = require('path');

function parseArgs() {
  const args = process.argv.slice(2);
  const get = (k, d = null) => {
    const i = args.indexOf(`--${k}`);
    return i >= 0 ? args[i + 1] : d;
  };
  const slugsArg = get('slugs', 'the-sun,the-moon,earths-magnificent-oceans,puppies');
  const langsArg = get('langs', 'en,es,fr');
  const inDir = get('in', 'data');
  const outDir = get('out', path.join('data', 'tts_jobs'));
  const slugs = slugsArg.split(',').map(s => s.trim()).filter(Boolean);
  const langs = langsArg.split(',').map(s => s.trim()).filter(Boolean);
  return { slugs, langs, inDir, outDir };
}

function readJsonOrNull(filePath) {
  try {
    const txt = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(txt);
  } catch (e) {
    return null;
  }
}

function extractTtsPhases(phaseDna) {
  if (!phaseDna || !Array.isArray(phaseDna.phases)) return [];
  const wantedOrder = ['welcome', 'beginning', 'middle', 'end', 'wisdom'];
  const phasesById = new Map();
  for (const p of phaseDna.phases) {
    if (!p || !p.id) continue;
    const text = (p.narration?.voiceOver || '').toString().trim();
    if (!text) continue;
    phasesById.set(p.id, {
      id: p.id,
      text,
      approxChars: text.length
    });
  }
  const ordered = [];
  for (const id of wantedOrder) {
    if (phasesById.has(id)) ordered.push(phasesById.get(id));
  }
  // Append any extras not in canonical order
  for (const [id, obj] of phasesById.entries()) {
    if (!wantedOrder.includes(id)) ordered.push(obj);
  }
  return ordered;
}

function ensureDir(dirPath) {
  if (!fs.existsSync(dirPath)) fs.mkdirSync(dirPath, { recursive: true });
}

function main() {
  const { slugs, langs, inDir, outDir } = parseArgs();
  ensureDir(outDir);

  let totalFiles = 0;
  let totalPhases = 0;

  for (const slug of slugs) {
    for (const lang of langs) {
      const src = path.join(inDir, `${slug}.${lang}.phased.json`);
      const dna = readJsonOrNull(src);
      if (!dna) {
        console.warn(`⚠️  Missing or invalid PhaseDNA: ${src}`);
        continue;
      }
      const phases = extractTtsPhases(dna);
      if (!phases.length) {
        console.warn(`⚠️  No narration.voiceOver found in phases for ${src}`);
        continue;
      }
      const job = {
        slug,
        language: lang,
        version: 'tts_jobs_v1',
        defaultSpeaker: 'kelly',
        phases
      };
      const outFile = path.join(outDir, `${slug}.${lang}.json`);
      fs.writeFileSync(outFile, JSON.stringify(job, null, 2));
      console.log(`💾 Wrote ${outFile} (${phases.length} phases)`);
      totalFiles += 1;
      totalPhases += phases.length;
    }
  }

  if (totalFiles === 0) {
    console.error('❌ No TTS job files were generated. Ensure PhaseDNA files exist and args are correct.');
    process.exit(1);
  }

  console.log(`✅ Generated ${totalFiles} TTS job files with ${totalPhases} total phases.`);
}

if (require.main === module) main();


