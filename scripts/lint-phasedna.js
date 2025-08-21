#!/usr/bin/env node
/**
 * Lints PhaseDNA v1 files for narration quality and structural completeness.
 * Checks:
 *  - Required phases present
 *  - For question phases: narration.voiceOver + onNoChoice present
 *  - Choices a/b with text; correct in {'a','b'}; teachingMoments a and b present
 *  - Prohibited patterns in narration (e.g., 'Option A/B', single-letter labels like 'A:' 'B:')
 *  - Presence of an action cue in narration (e.g., 'choose')
 *  - Length/pacing heuristics (warn on extremes)
 * Usage: node scripts/lint-phasedna.js [--path data]
 */

const fs = require('fs');
const path = require('path');

const targetDir = process.argv.includes('--path') ? process.argv[process.argv.indexOf('--path')+1] : 'data';

function readJson(p){ return JSON.parse(fs.readFileSync(p,'utf8')); }
function listPhased(dir){ return fs.readdirSync(dir).filter(f=>f.endsWith('.phased.json')).map(f=>path.join(dir,f)); }

function wordCount(s){ return String(s||'').trim().split(/\s+/).filter(Boolean).length; }

function lintFile(file){
  const json = readJson(file);
  const warnings = [];
  function warn(msg){ warnings.push(msg); }
  if (!json?.metadata?.version || json.metadata.version !== 'phase_v1') warn('metadata.version != phase_v1');
  const phases = json?.phases || [];
  const ids = phases.map(p=>p.id);
  ['welcome','beginning','middle','end','wisdom'].forEach(id=>{ if (!ids.includes(id)) warn(`missing phase: ${id}`); });
  const byId = Object.fromEntries(phases.map(p=>[p.id,p]));
  const prohibited = /(\bOption\s*[ABab]\b)|(\b[Aa]:\s)|(\b[Bb]:\s)/; // conservative
  ['beginning','middle','end'].forEach(id=>{
    const p = byId[id]; if (!p) return;
    const n = p.narration || {};
    if (!n.voiceOver) warn(`${id}: missing narration.voiceOver`);
    if (!n.onNoChoice) warn(`${id}: missing narration.onNoChoice`);
    if (n.voiceOver && prohibited.test(n.voiceOver)) warn(`${id}: prohibited phrasing in voiceOver`);
    if (n.onNoChoice && prohibited.test(n.onNoChoice)) warn(`${id}: prohibited phrasing in onNoChoice`);
    if (n.voiceOver && !/(choose|elige|escoge|selecciona|choisis|choisissez|choix)/i.test(n.voiceOver)) warn(`${id}: action cue 'choose' not found`);
    // Structure of question
    const q = p.question || {};
    if (!q.text) warn(`${id}: missing question.text`);
    const a = (q.choices||[]).find(c=>c.id==='a');
    const b = (q.choices||[]).find(c=>c.id==='b');
    if (!a || !a.text) warn(`${id}: missing choice a.text`);
    if (!b || !b.text) warn(`${id}: missing choice b.text`);
    if (!q.correct || !['a','b'].includes(String(q.correct).toLowerCase())) warn(`${id}: missing/invalid correct`);
    if (!q.teachingMoments || !q.teachingMoments.a || !q.teachingMoments.b) warn(`${id}: teachingMoments incomplete`);
    // Pacing: flag overly long narration
    const wc = wordCount(n.voiceOver||'');
    if (wc > 55) warn(`${id}: voiceOver too long (${wc} words)`);
  });
  // Welcome/wisdom sanity
  if (byId.welcome?.narration?.voiceOver && prohibited.test(byId.welcome.narration.voiceOver)) warn('welcome: prohibited phrasing');
  if (byId.wisdom?.narration?.voiceOver && prohibited.test(byId.wisdom.narration.voiceOver)) warn('wisdom: prohibited phrasing');
  return { file, warnings };
}

function main(){
  const files = listPhased(targetDir);
  const results = files.map(lintFile);
  const totalWarnings = results.reduce((a,r)=>a+r.warnings.length,0);
  const failing = results.filter(r=>r.warnings.length>0);
  console.log(JSON.stringify({ totalFiles: files.length, totalWarnings, failing }, null, 2));
  if (process.env.CI && failing.length>0) process.exit(1);
}

if (require.main === module) main();


