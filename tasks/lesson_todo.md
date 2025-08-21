# Lesson TODO (All 366)

This file is auto-generated. Do not edit by hand.

## Day 1 — The Sun - Our Star
- Learning objective: Understand solar physics while exploring how solar energy drives Earth's climate, technology, and life processes.
- Slug: the-sun
- Files:
  - Normalized: data/sun_normalized.json
  - PhaseDNA: data/the-sun.en.phased.json, data/the-sun.es.phased.json, data/the-sun.fr.phased.json
  - TTS jobs: data/tts_jobs/the-sun.en.json, data/tts_jobs/the-sun.es.json, data/tts_jobs/the-sun.fr.json
- Subtasks:
  - [x] Author normalized DNA source → data/sun_normalized.json
  - [ ] Generate PhaseDNA v1 (en + clone es/fr) → data/the-sun.en|es|fr.phased.json (cmd: node scripts/generate-phased-from-normalized.js --input data/sun_normalized.json --outbase data/the-sun --lang en --clone-es-fr)
  - [x] Extract TTS jobs (per-phase narration) for en/es/fr → data/tts_jobs/the-sun.en|es|fr.json (cmd: node scripts/extract-tts-jobs.js --slugs the-sun --langs en,es,fr --in data --out data/tts_jobs)
  - [ ] Validate PhaseDNA shape and TTS jobs presence → npm run validate
  - [x] Ensure day-to-slug resolver loads this lesson in index.html → Update getDNALessonData to include this day or general resolver
  - [ ] Attach minimal avatar cues/moods per phase (optional) → Edit phased JSON: phases[].avatar.cues
  - [ ] Quick review of es/fr clones for obvious issues → data/the-sun.es|fr.phased.json
  - [ ] Enable prefetch of next-phase TTS during playback → Player optimization (once globally implemented)
  - [ ] QA in index.html: phase texts render, TTS plays, interactions flow → Open index.html?day=1

## Day 2 — Mathematics - The Language of Patterns
- Learning objective: Practice mathematical thinking while understanding how mathematical concepts enable scientific discovery, technology, and problem-solving.
- Slug: mathematics-the-language-of-patterns
- Files:
  - Normalized: data/mathematics-the-language-of-patterns_normalized.json
  - PhaseDNA: data/mathematics-the-language-of-patterns.en.phased.json, data/mathematics-the-language-of-patterns.es.phased.json, data/mathematics-the-language-of-patterns.fr.phased.json
  - TTS jobs: data/tts_jobs/mathematics-the-language-of-patterns.en.json, data/tts_jobs/mathematics-the-language-of-patterns.es.json, data/tts_jobs/mathematics-the-language-of-patterns.fr.json
- Subtasks:
  - [ ] Author normalized DNA source → data/mathematics-the-language-of-patterns_normalized.json
  - [ ] Generate PhaseDNA v1 (en + clone es/fr) → data/mathematics-the-language-of-patterns.en|es|fr.phased.json (cmd: node scripts/generate-phased-from-normalized.js --input data/mathematics-the-language-of-patterns_normalized.json --outbase data/mathematics-the-language-of-patterns --lang en --clone-es-fr)
  - [ ] Extract TTS jobs (per-phase narration) for en/es/fr → data/tts_jobs/mathematics-the-language-of-patterns.en|es|fr.json (cmd: node scripts/extract-tts-jobs.js --slugs mathematics-the-language-of-patterns --langs en,es,fr --in data --out data/tts_jobs)
  - [ ] Validate PhaseDNA shape and TTS jobs presence → npm run validate
  - [ ] Ensure day-to-slug resolver loads this lesson in index.html → Update getDNALessonData to include this day or general resolver
  - [ ] Attach minimal avatar cues/moods per phase (optional) → Edit phased JSON: phases[].avatar.cues
  - [ ] Quick review of es/fr clones for obvious issues → data/mathematics-the-language-of-patterns.es|fr.phased.json
  - [ ] Enable prefetch of next-phase TTS during playback → Player optimization (once globally implemented)
  - [ ] QA in index.html: phase texts render, TTS plays, interactions flow → Open index.html?day=2

## Day 3 — Chemistry - The Science of Matter
- Learning objective: Explore molecular interactions while understanding how chemical knowledge enables materials science, medicine, and environmental protection.
- Slug: chemistry-the-science-of-matter
- Files:
  - Normalized: data/chemistry-the-science-of-matter_normalized.json
  - PhaseDNA: data/chemistry-the-science-of-matter.en.phased.json, data/chemistry-the-science-of-matter.es.phased.json, data/chemistry-the-science-of-matter.fr.phased.json
  - TTS jobs: data/tts_jobs/chemistry-the-science-of-matter.en.json, data/tts_jobs/chemistry-the-science-of-matter.es.json, data/tts_jobs/chemistry-the-science-of-matter.fr.json
- Subtasks:
  - [ ] Author normalized DNA source → data/chemistry-the-science-of-matter_normalized.json
  - [ ] Generate PhaseDNA v1 (en + clone es/fr) → data/chemistry-the-science-of-matter.en|es|fr.phased.json (cmd: node scripts/generate-phased-from-normalized.js --input data/chemistry-the-science-of-matter_normalized.json --outbase data/chemistry-the-science-of-matter --lang en --clone-es-fr)
  - [ ] Extract TTS jobs (per-phase narration) for en/es/fr → data/tts_jobs/chemistry-the-science-of-matter.en|es|fr.json (cmd: node scripts/extract-tts-jobs.js --slugs chemistry-the-science-of-matter --langs en,es,fr --in data --out data/tts_jobs)
  - [ ] Validate PhaseDNA shape and TTS jobs presence → npm run validate
  - [ ] Ensure day-to-slug resolver loads this lesson in index.html → Update getDNALessonData to include this day or general resolver
  - [ ] Attach minimal avatar cues/moods per phase (optional) → Edit phased JSON: phases[].avatar.cues
  - [ ] Quick review of es/fr clones for obvious issues → data/chemistry-the-science-of-matter.es|fr.phased.json
  - [ ] Enable prefetch of next-phase TTS during playback → Player optimization (once globally implemented)
  - [ ] QA in index.html: phase texts render, TTS plays, interactions flow → Open index.html?day=3

## Day 4 — Physics - The Laws of Nature
- Learning objective: Understand fundamental forces while exploring how physical principles enable technology, energy systems, and scientific discovery.
- Slug: physics-the-laws-of-nature
- Files:
  - Normalized: data/physics-the-laws-of-nature_normalized.json
  - PhaseDNA: data/physics-the-laws-of-nature.en.phased.json, data/physics-the-laws-of-nature.es.phased.json, data/physics-the-laws-of-nature.fr.phased.json
  - TTS jobs: data/tts_jobs/physics-the-laws-of-nature.en.json, data/tts_jobs/physics-the-laws-of-nature.es.json, data/tts_jobs/physics-the-laws-of-nature.fr.json
- Subtasks:
  - [ ] Author normalized DNA source → data/physics-the-laws-of-nature_normalized.json
  - [ ] Generate PhaseDNA v1 (en + clone es/fr) → data/physics-the-laws-of-nature.en|es|fr.phased.json (cmd: node scripts/generate-phased-from-normalized.js --input data/physics-the-laws-of-nature_normalized.json --outbase data/physics-the-laws-of-nature --lang en --clone-es-fr)
  - [ ] Extract TTS jobs (per-phase narration) for en/es/fr → data/tts_jobs/physics-the-laws-of-nature.en|es|fr.json (cmd: node scripts/extract-tts-jobs.js --slugs physics-the-laws-of-nature --langs en,es,fr --in data --out data/tts_jobs)
  - [ ] Validate PhaseDNA shape and TTS jobs presence → npm run validate
  - [ ] Ensure day-to-slug resolver loads this lesson in index.html → Update getDNALessonData to include this day or general resolver
  - [ ] Attach minimal avatar cues/moods per phase (optional) → Edit phased JSON: phases[].avatar.cues
  - [ ] Quick review of es/fr clones for obvious issues → data/physics-the-laws-of-nature.es|fr.phased.json
  - [ ] Enable prefetch of next-phase TTS during playback → Player optimization (once globally implemented)
  - [ ] QA in index.html: phase texts render, TTS plays, interactions flow → Open index.html?day=4

## Day 5 — Biology - The Study of Life
- Learning objective: Explore living systems while understanding how biological knowledge informs medicine, agriculture, and environmental conservation.
- Slug: biology-the-study-of-life
- Files:
  - Normalized: data/biology-the-study-of-life_normalized.json
  - PhaseDNA: data/biology-the-study-of-life.en.phased.json, data/biology-the-study-of-life.es.phased.json, data/biology-the-study-of-life.fr.phased.json
  - TTS jobs: data/tts_jobs/biology-the-study-of-life.en.json, data/tts_jobs/biology-the-study-of-life.es.json, data/tts_jobs/biology-the-study-of-life.fr.json
- Subtasks:
  - [ ] Author normalized DNA source → data/biology-the-study-of-life_normalized.json
  - [ ] Generate PhaseDNA v1 (en + clone es/fr) → data/biology-the-study-of-life.en|es|fr.phased.json (cmd: node scripts/generate-phased-from-normalized.js --input data/biology-the-study-of-life_normalized.json --outbase data/biology-the-study-of-life --lang en --clone-es-fr)
  - [ ] Extract TTS jobs (per-phase narration) for en/es/fr → data/tts_jobs/biology-the-study-of-life.en|es|fr.json (cmd: node scripts/extract-tts-jobs.js --slugs biology-the-study-of-life --langs en,es,fr --in data --out data/tts_jobs)
  - [ ] Validate PhaseDNA shape and TTS jobs presence → npm run validate
  - [ ] Ensure day-to-slug resolver loads this lesson in index.html → Update getDNALessonData to include this day or general resolver
  - [ ] Attach minimal avatar cues/moods per phase (optional) → Edit phased JSON: phases[].avatar.cues
  - [ ] Quick review of es/fr clones for obvious issues → data/biology-the-study-of-life.es|fr.phased.json
  - [ ] Enable prefetch of next-phase TTS during playback → Player optimization (once globally implemented)
  - [ ] QA in index.html: phase texts render, TTS plays, interactions flow → Open index.html?day=5

## Day 6 — History - Learning from the Past
- Learning objective: Analyze historical patterns while understanding how historical knowledge informs present decisions and future planning.
- Slug: history-learning-from-the-past
- Files:
  - Normalized: data/history-learning-from-the-past_normalized.json
  - PhaseDNA: data/history-learning-from-the-past.en.phased.json, data/history-learning-from-the-past.es.phased.json, data/history-learning-from-the-past.fr.phased.json
  - TTS jobs: data/tts_jobs/history-learning-from-the-past.en.json, data/tts_jobs/history-learning-from-the-past.es.json, data/tts_jobs/history-learning-from-the-past.fr.json
- Subtasks:
  - [ ] Author normalized DNA source → data/history-learning-from-the-past_normalized.json
  - [ ] Generate PhaseDNA v1 (en + clone es/fr) → data/history-learning-from-the-past.en|es|fr.phased.json (cmd: node scripts/generate-phased-from-normalized.js --input data/history-learning-from-the-past_normalized.json --outbase data/history-learning-from-the-past --lang en --clone-es-fr)
  - [ ] Extract TTS jobs (per-phase narration) for en/es/fr → data/tts_jobs/history-learning-from-the-past.en|es|fr.json (cmd: node scripts/extract-tts-jobs.js --slugs history-learning-from-the-past --langs en,es,fr --in data --out data/tts_jobs)
  - [ ] Validate PhaseDNA shape and TTS jobs presence → npm run validate
  - [ ] Ensure day-to-slug resolver loads this lesson in index.html → Update getDNALessonData to include this day or general resolver
  - [ ] Attach minimal avatar cues/moods per phase (optional) → Edit phased JSON: phases[].avatar.cues
  - [ ] Quick review of es/fr clones for obvious issues → data/history-learning-from-the-past.es|fr.phased.json
  - [ ] Enable prefetch of next-phase TTS during playback → Player optimization (once globally implemented)
  - [ ] QA in index.html: phase texts render, TTS plays, interactions flow → Open index.html?day=6

## Day 7 — Geography - Understanding Our World
- Learning objective: Explore spatial relationships while understanding how geographical knowledge informs environmental management and cultural understanding.
- Slug: geography-understanding-our-world
- Files:
  - Normalized: data/geography-understanding-our-world_normalized.json
  - PhaseDNA: data/geography-understanding-our-world.en.phased.json, data/geography-understanding-our-world.es.phased.json, data/geography-understanding-our-world.fr.phased.json
  - TTS jobs: data/tts_jobs/geography-understanding-our-world.en.json, data/tts_jobs/geography-understanding-our-world.es.json, data/tts_jobs/geography-understanding-our-world.fr.json
- Subtasks:
  - [ ] Author normalized DNA source → data/geography-understanding-our-world_normalized.json
  - [ ] Generate PhaseDNA v1 (en + clone es/fr) → data/geography-understanding-our-world.en|es|fr.phased.json (cmd: node scripts/generate-phased-from-normalized.js --input data/geography-understanding-our-world_normalized.json --outbase data/geography-understanding-our-world --lang en --clone-es-fr)
  - [ ] Extract TTS jobs (per-phase narration) for en/es/fr → data/tts_jobs/geography-understanding-our-world.en|es|fr.json (cmd: node scripts/extract-tts-jobs.js --slugs geography-understanding-our-world --langs en,es,fr --in data --out data/tts_jobs)
  - [ ] Validate PhaseDNA shape and TTS jobs presence → npm run validate
  - [ ] Ensure day-to-slug resolver loads this lesson in index.html → Update getDNALessonData to include this day or general resolver
  - [ ] Attach minimal avatar cues/moods per phase (optional) → Edit phased JSON: phases[].avatar.cues
  - [ ] Quick review of es/fr clones for obvious issues → data/geography-understanding-our-world.es|fr.phased.json
  - [ ] Enable prefetch of next-phase TTS during playback → Player optimization (once globally implemented)
  - [ ] QA in index.html: phase texts render, TTS plays, interactions flow → Open index.html?day=7

## Day 8 — Literature - Stories That Shape Us
- Learning objective: Practice critical reading while understanding how literature enables cultural expression, empathy building, and social commentary.
- Slug: literature-stories-that-shape-us
- Files:
  - Normalized: data/literature-stories-that-shape-us_normalized.json
  - PhaseDNA: data/literature-stories-that-shape-us.en.phased.json, data/literature-stories-that-shape-us.es.phased.json, data/literature-stories-that-shape-us.fr.phased.json
  - TTS jobs: data/tts_jobs/literature-stories-that-shape-us.en.json, data/tts_jobs/literature-stories-that-shape-us.es.json, data/tts_jobs/literature-stories-that-shape-us.fr.json
- Subtasks:
  - [ ] Author normalized DNA source → data/literature-stories-that-shape-us_normalized.json
  - [ ] Generate PhaseDNA v1 (en + clone es/fr) → data/literature-stories-that-shape-us.en|es|fr.phased.json (cmd: node scripts/generate-phased-from-normalized.js --input data/literature-stories-that-shape-us_normalized.json --outbase data/literature-stories-that-shape-us --lang en --clone-es-fr)
  - [ ] Extract TTS jobs (per-phase narration) for en/es/fr → data/tts_jobs/literature-stories-that-shape-us.en|es|fr.json (cmd: node scripts/extract-tts-jobs.js --slugs literature-stories-that-shape-us --langs en,es,fr --in data --out data/tts_jobs)
  - [ ] Validate PhaseDNA shape and TTS jobs presence → npm run validate
  - [ ] Ensure day-to-slug resolver loads this lesson in index.html → Update getDNALessonData to include this day or general resolver
  - [ ] Attach minimal avatar cues/moods per phase (optional) → Edit phased JSON: phases[].avatar.cues
  - [ ] Quick review of es/fr clones for obvious issues → data/literature-stories-that-shape-us.es|fr.phased.json
  - [ ] Enable prefetch of next-phase TTS during playback → Player optimization (once globally implemented)
  - [ ] QA in index.html: phase texts render, TTS plays, interactions flow → Open index.html?day=8

## Day 9 — Art - Creative Expression
- Learning objective: Practice visual communication while understanding how art enables cultural preservation, social commentary, and personal expression.
- Slug: art-creative-expression
- Files:
  - Normalized: data/art-creative-expression_normalized.json
  - PhaseDNA: data/art-creative-expression.en.phased.json, data/art-creative-expression.es.phased.json, data/art-creative-expression.fr.phased.json
  - TTS jobs: data/tts_jobs/art-creative-expression.en.json, data/tts_jobs/art-creative-expression.es.json, data/tts_jobs/art-creative-expression.fr.json
- Subtasks:
  - [ ] Author normalized DNA source → data/art-creative-expression_normalized.json
  - [ ] Generate PhaseDNA v1 (en + clone es/fr) → data/art-creative-expression.en|es|fr.phased.json (cmd: node scripts/generate-phased-from-normalized.js --input data/art-creative-expression_normalized.json --outbase data/art-creative-expression --lang en --clone-es-fr)
  - [ ] Extract TTS jobs (per-phase narration) for en/es/fr → data/tts_jobs/art-creative-expression.en|es|fr.json (cmd: node scripts/extract-tts-jobs.js --slugs art-creative-expression --langs en,es,fr --in data --out data/tts_jobs)
  - [ ] Validate PhaseDNA shape and TTS jobs presence → npm run validate
  - [ ] Ensure day-to-slug resolver loads this lesson in index.html → Update getDNALessonData to include this day or general resolver
  - [ ] Attach minimal avatar cues/moods per phase (optional) → Edit phased JSON: phases[].avatar.cues
  - [ ] Quick review of es/fr clones for obvious issues → data/art-creative-expression.es|fr.phased.json
  - [ ] Enable prefetch of next-phase TTS during playback → Player optimization (once globally implemented)
  - [ ] QA in index.html: phase texts render, TTS plays, interactions flow → Open index.html?day=9

## Day 10 — Music - The Universal Language
- Learning objective: Explore musical expression while understanding how music enables cultural exchange, emotional communication, and cognitive development.
- Slug: the-moon
- Files:
  - Normalized: data/moon_normalized.json
  - PhaseDNA: data/the-moon.en.phased.json, data/the-moon.es.phased.json, data/the-moon.fr.phased.json
  - TTS jobs: data/tts_jobs/the-moon.en.json, data/tts_jobs/the-moon.es.json, data/tts_jobs/the-moon.fr.json
- Subtasks:
  - [x] Author normalized DNA source → data/moon_normalized.json
  - [ ] Generate PhaseDNA v1 (en + clone es/fr) → data/the-moon.en|es|fr.phased.json (cmd: node scripts/generate-phased-from-normalized.js --input data/moon_normalized.json --outbase data/the-moon --lang en --clone-es-fr)
  - [x] Extract TTS jobs (per-phase narration) for en/es/fr → data/tts_jobs/the-moon.en|es|fr.json (cmd: node scripts/extract-tts-jobs.js --slugs the-moon --langs en,es,fr --in data --out data/tts_jobs)
  - [ ] Validate PhaseDNA shape and TTS jobs presence → npm run validate
  - [x] Ensure day-to-slug resolver loads this lesson in index.html → Update getDNALessonData to include this day or general resolver
  - [ ] Attach minimal avatar cues/moods per phase (optional) → Edit phased JSON: phases[].avatar.cues
  - [ ] Quick review of es/fr clones for obvious issues → data/the-moon.es|fr.phased.json
  - [ ] Enable prefetch of next-phase TTS during playback → Player optimization (once globally implemented)
  - [ ] QA in index.html: phase texts render, TTS plays, interactions flow → Open index.html?day=10

## Day 11 — Philosophy - The Love of Wisdom
- Learning objective: Practice critical thinking while understanding how philosophical inquiry enables ethical reasoning, logical analysis, and meaning-making.
- Slug: philosophy-the-love-of-wisdom
- Files:
  - Normalized: data/philosophy-the-love-of-wisdom_normalized.json
  - PhaseDNA: data/philosophy-the-love-of-wisdom.en.phased.json, data/philosophy-the-love-of-wisdom.es.phased.json, data/philosophy-the-love-of-wisdom.fr.phased.json
  - TTS jobs: data/tts_jobs/philosophy-the-love-of-wisdom.en.json, data/tts_jobs/philosophy-the-love-of-wisdom.es.json, data/tts_jobs/philosophy-the-love-of-wisdom.fr.json
- Subtasks:
  - [ ] Author normalized DNA source → data/philosophy-the-love-of-wisdom_normalized.json
  - [ ] Generate PhaseDNA v1 (en + clone es/fr) → data/philosophy-the-love-of-wisdom.en|es|fr.phased.json (cmd: node scripts/generate-phased-from-normalized.js --input data/philosophy-the-love-of-wisdom_normalized.json --outbase data/philosophy-the-love-of-wisdom --lang en --clone-es-fr)
  - [ ] Extract TTS jobs (per-phase narration) for en/es/fr → data/tts_jobs/philosophy-the-love-of-wisdom.en|es|fr.json (cmd: node scripts/extract-tts-jobs.js --slugs philosophy-the-love-of-wisdom --langs en,es,fr --in data --out data/tts_jobs)
  - [ ] Validate PhaseDNA shape and TTS jobs presence → npm run validate
  - [ ] Ensure day-to-slug resolver loads this lesson in index.html → Update getDNALessonData to include this day or general resolver
  - [ ] Attach minimal avatar cues/moods per phase (optional) → Edit phased JSON: phases[].avatar.cues
  - [ ] Quick review of es/fr clones for obvious issues → data/philosophy-the-love-of-wisdom.es|fr.phased.json
  - [ ] Enable prefetch of next-phase TTS during playback → Player optimization (once globally implemented)
  - [ ] QA in index.html: phase texts render, TTS plays, interactions flow → Open index.html?day=11

## Day 12 — Psychology - Understanding the Mind
- Learning objective: Explore mental processes while understanding how psychological knowledge informs education, healthcare, and social policy.
- Slug: psychology-understanding-the-mind
- Files:
  - Normalized: data/psychology-understanding-the-mind_normalized.json
  - PhaseDNA: data/psychology-understanding-the-mind.en.phased.json, data/psychology-understanding-the-mind.es.phased.json, data/psychology-understanding-the-mind.fr.phased.json
  - TTS jobs: data/tts_jobs/psychology-understanding-the-mind.en.json, data/tts_jobs/psychology-understanding-the-mind.es.json, data/tts_jobs/psychology-understanding-the-mind.fr.json
- Subtasks:
  - [ ] Author normalized DNA source → data/psychology-understanding-the-mind_normalized.json
  - [ ] Generate PhaseDNA v1 (en + clone es/fr) → data/psychology-understanding-the-mind.en|es|fr.phased.json (cmd: node scripts/generate-phased-from-normalized.js --input data/psychology-understanding-the-mind_normalized.json --outbase data/psychology-understanding-the-mind --lang en --clone-es-fr)
  - [ ] Extract TTS jobs (per-phase narration) for en/es/fr → data/tts_jobs/psychology-understanding-the-mind.en|es|fr.json (cmd: node scripts/extract-tts-jobs.js --slugs psychology-understanding-the-mind --langs en,es,fr --in data --out data/tts_jobs)
  - [ ] Validate PhaseDNA shape and TTS jobs presence → npm run validate
  - [ ] Ensure day-to-slug resolver loads this lesson in index.html → Update getDNALessonData to include this day or general resolver
  - [ ] Attach minimal avatar cues/moods per phase (optional) → Edit phased JSON: phases[].avatar.cues
  - [ ] Quick review of es/fr clones for obvious issues → data/psychology-understanding-the-mind.es|fr.phased.json
  - [ ] Enable prefetch of next-phase TTS during playback → Player optimization (once globally implemented)
  - [ ] QA in index.html: phase texts render, TTS plays, interactions flow → Open index.html?day=12

## Day 13 — Sociology - Society and Culture
- Learning objective: Analyze social structures while understanding how sociological knowledge informs policy, community development, and cultural understanding.
- Slug: sociology-society-and-culture
- Files:
  - Normalized: data/sociology-society-and-culture_normalized.json
  - PhaseDNA: data/sociology-society-and-culture.en.phased.json, data/sociology-society-and-culture.es.phased.json, data/sociology-society-and-culture.fr.phased.json
  - TTS jobs: data/tts_jobs/sociology-society-and-culture.en.json, data/tts_jobs/sociology-society-and-culture.es.json, data/tts_jobs/sociology-society-and-culture.fr.json
- Subtasks:
  - [ ] Author normalized DNA source → data/sociology-society-and-culture_normalized.json
  - [ ] Generate PhaseDNA v1 (en + clone es/fr) → data/sociology-society-and-culture.en|es|fr.phased.json (cmd: node scripts/generate-phased-from-normalized.js --input data/sociology-society-and-culture_normalized.json --outbase data/sociology-society-and-culture --lang en --clone-es-fr)
  - [ ] Extract TTS jobs (per-phase narration) for en/es/fr → data/tts_jobs/sociology-society-and-culture.en|es|fr.json (cmd: node scripts/extract-tts-jobs.js --slugs sociology-society-and-culture --langs en,es,fr --in data --out data/tts_jobs)
  - [ ] Validate PhaseDNA shape and TTS jobs presence → npm run validate
  - [ ] Ensure day-to-slug resolver loads this lesson in index.html → Update getDNALessonData to include this day or general resolver
  - [ ] Attach minimal avatar cues/moods per phase (optional) → Edit phased JSON: phases[].avatar.cues
  - [ ] Quick review of es/fr clones for obvious issues → data/sociology-society-and-culture.es|fr.phased.json
  - [ ] Enable prefetch of next-phase TTS during playback → Player optimization (once globally implemented)
  - [ ] QA in index.html: phase texts render, TTS plays, interactions flow → Open index.html?day=13

## Day 14 — Economics - The Science of Choice
- Learning objective: Understand resource allocation while exploring how economic principles inform policy, business, and social welfare.
- Slug: economics-the-science-of-choice
- Files:
  - Normalized: data/economics-the-science-of-choice_normalized.json
  - PhaseDNA: data/economics-the-science-of-choice.en.phased.json, data/economics-the-science-of-choice.es.phased.json, data/economics-the-science-of-choice.fr.phased.json
  - TTS jobs: data/tts_jobs/economics-the-science-of-choice.en.json, data/tts_jobs/economics-the-science-of-choice.es.json, data/tts_jobs/economics-the-science-of-choice.fr.json
- Subtasks:
  - [ ] Author normalized DNA source → data/economics-the-science-of-choice_normalized.json
  - [ ] Generate PhaseDNA v1 (en + clone es/fr) → data/economics-the-science-of-choice.en|es|fr.phased.json (cmd: node scripts/generate-phased-from-normalized.js --input data/economics-the-science-of-choice_normalized.json --outbase data/economics-the-science-of-choice --lang en --clone-es-fr)
  - [ ] Extract TTS jobs (per-phase narration) for en/es/fr → data/tts_jobs/economics-the-science-of-choice.en|es|fr.json (cmd: node scripts/extract-tts-jobs.js --slugs economics-the-science-of-choice --langs en,es,fr --in data --out data/tts_jobs)
  - [ ] Validate PhaseDNA shape and TTS jobs presence → npm run validate
  - [ ] Ensure day-to-slug resolver loads this lesson in index.html → Update getDNALessonData to include this day or general resolver
  - [ ] Attach minimal avatar cues/moods per phase (optional) → Edit phased JSON: phases[].avatar.cues
  - [ ] Quick review of es/fr clones for obvious issues → data/economics-the-science-of-choice.es|fr.phased.json
  - [ ] Enable prefetch of next-phase TTS during playback → Player optimization (once globally implemented)
  - [ ] QA in index.html: phase texts render, TTS plays, interactions flow → Open index.html?day=14

## Day 15 — Political Science - Power and Governance
- Learning objective: Analyze political systems while understanding how political knowledge enables democratic participation and civic engagement.
- Slug: political-science-power-and-governance
- Files:
  - Normalized: data/political-science-power-and-governance_normalized.json
  - PhaseDNA: data/political-science-power-and-governance.en.phased.json, data/political-science-power-and-governance.es.phased.json, data/political-science-power-and-governance.fr.phased.json
  - TTS jobs: data/tts_jobs/political-science-power-and-governance.en.json, data/tts_jobs/political-science-power-and-governance.es.json, data/tts_jobs/political-science-power-and-governance.fr.json
- Subtasks:
  - [ ] Author normalized DNA source → data/political-science-power-and-governance_normalized.json
  - [ ] Generate PhaseDNA v1 (en + clone es/fr) → data/political-science-power-and-governance.en|es|fr.phased.json (cmd: node scripts/generate-phased-from-normalized.js --input data/political-science-power-and-governance_normalized.json --outbase data/political-science-power-and-governance --lang en --clone-es-fr)
  - [ ] Extract TTS jobs (per-phase narration) for en/es/fr → data/tts_jobs/political-science-power-and-governance.en|es|fr.json (cmd: node scripts/extract-tts-jobs.js --slugs political-science-power-and-governance --langs en,es,fr --in data --out data/tts_jobs)
  - [ ] Validate PhaseDNA shape and TTS jobs presence → npm run validate
  - [ ] Ensure day-to-slug resolver loads this lesson in index.html → Update getDNALessonData to include this day or general resolver
  - [ ] Attach minimal avatar cues/moods per phase (optional) → Edit phased JSON: phases[].avatar.cues
  - [ ] Quick review of es/fr clones for obvious issues → data/political-science-power-and-governance.es|fr.phased.json
  - [ ] Enable prefetch of next-phase TTS during playback → Player optimization (once globally implemented)
  - [ ] QA in index.html: phase texts render, TTS plays, interactions flow → Open index.html?day=15

## Day 16 — Anthropology - Human Cultures
- Learning objective: Explore cultural diversity while understanding how anthropological knowledge promotes cross-cultural understanding and cultural preservation.
- Slug: anthropology-human-cultures
- Files:
  - Normalized: data/anthropology-human-cultures_normalized.json
  - PhaseDNA: data/anthropology-human-cultures.en.phased.json, data/anthropology-human-cultures.es.phased.json, data/anthropology-human-cultures.fr.phased.json
  - TTS jobs: data/tts_jobs/anthropology-human-cultures.en.json, data/tts_jobs/anthropology-human-cultures.es.json, data/tts_jobs/anthropology-human-cultures.fr.json
- Subtasks:
  - [ ] Author normalized DNA source → data/anthropology-human-cultures_normalized.json
  - [ ] Generate PhaseDNA v1 (en + clone es/fr) → data/anthropology-human-cultures.en|es|fr.phased.json (cmd: node scripts/generate-phased-from-normalized.js --input data/anthropology-human-cultures_normalized.json --outbase data/anthropology-human-cultures --lang en --clone-es-fr)
  - [ ] Extract TTS jobs (per-phase narration) for en/es/fr → data/tts_jobs/anthropology-human-cultures.en|es|fr.json (cmd: node scripts/extract-tts-jobs.js --slugs anthropology-human-cultures --langs en,es,fr --in data --out data/tts_jobs)
  - [ ] Validate PhaseDNA shape and TTS jobs presence → npm run validate
  - [ ] Ensure day-to-slug resolver loads this lesson in index.html → Update getDNALessonData to include this day or general resolver
  - [ ] Attach minimal avatar cues/moods per phase (optional) → Edit phased JSON: phases[].avatar.cues
  - [ ] Quick review of es/fr clones for obvious issues → data/anthropology-human-cultures.es|fr.phased.json
  - [ ] Enable prefetch of next-phase TTS during playback → Player optimization (once globally implemented)
  - [ ] QA in index.html: phase texts render, TTS plays, interactions flow → Open index.html?day=16

## Day 17 — Archaeology - Uncovering the Past
- Learning objective: Practice scientific inquiry while understanding how archaeological knowledge informs cultural heritage and historical understanding.
- Slug: archaeology-uncovering-the-past
- Files:
  - Normalized: data/archaeology-uncovering-the-past_normalized.json
  - PhaseDNA: data/archaeology-uncovering-the-past.en.phased.json, data/archaeology-uncovering-the-past.es.phased.json, data/archaeology-uncovering-the-past.fr.phased.json
  - TTS jobs: data/tts_jobs/archaeology-uncovering-the-past.en.json, data/tts_jobs/archaeology-uncovering-the-past.es.json, data/tts_jobs/archaeology-uncovering-the-past.fr.json
- Subtasks:
  - [ ] Author normalized DNA source → data/archaeology-uncovering-the-past_normalized.json
  - [ ] Generate PhaseDNA v1 (en + clone es/fr) → data/archaeology-uncovering-the-past.en|es|fr.phased.json (cmd: node scripts/generate-phased-from-normalized.js --input data/archaeology-uncovering-the-past_normalized.json --outbase data/archaeology-uncovering-the-past --lang en --clone-es-fr)
  - [ ] Extract TTS jobs (per-phase narration) for en/es/fr → data/tts_jobs/archaeology-uncovering-the-past.en|es|fr.json (cmd: node scripts/extract-tts-jobs.js --slugs archaeology-uncovering-the-past --langs en,es,fr --in data --out data/tts_jobs)
  - [ ] Validate PhaseDNA shape and TTS jobs presence → npm run validate
  - [ ] Ensure day-to-slug resolver loads this lesson in index.html → Update getDNALessonData to include this day or general resolver
  - [ ] Attach minimal avatar cues/moods per phase (optional) → Edit phased JSON: phases[].avatar.cues
  - [ ] Quick review of es/fr clones for obvious issues → data/archaeology-uncovering-the-past.es|fr.phased.json
  - [ ] Enable prefetch of next-phase TTS during playback → Player optimization (once globally implemented)
  - [ ] QA in index.html: phase texts render, TTS plays, interactions flow → Open index.html?day=17

## Day 18 — Astronomy - Exploring the Cosmos
- Learning objective: Explore celestial objects while understanding how astronomical knowledge drives technological innovation and scientific discovery.
- Slug: astronomy-exploring-the-cosmos
- Files:
  - Normalized: data/astronomy-exploring-the-cosmos_normalized.json
  - PhaseDNA: data/astronomy-exploring-the-cosmos.en.phased.json, data/astronomy-exploring-the-cosmos.es.phased.json, data/astronomy-exploring-the-cosmos.fr.phased.json
  - TTS jobs: data/tts_jobs/astronomy-exploring-the-cosmos.en.json, data/tts_jobs/astronomy-exploring-the-cosmos.es.json, data/tts_jobs/astronomy-exploring-the-cosmos.fr.json
- Subtasks:
  - [ ] Author normalized DNA source → data/astronomy-exploring-the-cosmos_normalized.json
  - [ ] Generate PhaseDNA v1 (en + clone es/fr) → data/astronomy-exploring-the-cosmos.en|es|fr.phased.json (cmd: node scripts/generate-phased-from-normalized.js --input data/astronomy-exploring-the-cosmos_normalized.json --outbase data/astronomy-exploring-the-cosmos --lang en --clone-es-fr)
  - [ ] Extract TTS jobs (per-phase narration) for en/es/fr → data/tts_jobs/astronomy-exploring-the-cosmos.en|es|fr.json (cmd: node scripts/extract-tts-jobs.js --slugs astronomy-exploring-the-cosmos --langs en,es,fr --in data --out data/tts_jobs)
  - [ ] Validate PhaseDNA shape and TTS jobs presence → npm run validate
  - [ ] Ensure day-to-slug resolver loads this lesson in index.html → Update getDNALessonData to include this day or general resolver
  - [ ] Attach minimal avatar cues/moods per phase (optional) → Edit phased JSON: phases[].avatar.cues
  - [ ] Quick review of es/fr clones for obvious issues → data/astronomy-exploring-the-cosmos.es|fr.phased.json
  - [ ] Enable prefetch of next-phase TTS during playback → Player optimization (once globally implemented)
  - [ ] QA in index.html: phase texts render, TTS plays, interactions flow → Open index.html?day=18

## Day 19 — Geology - Earth's Story
- Learning objective: Understand Earth processes while exploring how geological knowledge informs resource management and environmental protection.
- Slug: geology-earths-story
- Files:
  - Normalized: data/geology-earths-story_normalized.json
  - PhaseDNA: data/geology-earths-story.en.phased.json, data/geology-earths-story.es.phased.json, data/geology-earths-story.fr.phased.json
  - TTS jobs: data/tts_jobs/geology-earths-story.en.json, data/tts_jobs/geology-earths-story.es.json, data/tts_jobs/geology-earths-story.fr.json
- Subtasks:
  - [ ] Author normalized DNA source → data/geology-earths-story_normalized.json
  - [ ] Generate PhaseDNA v1 (en + clone es/fr) → data/geology-earths-story.en|es|fr.phased.json (cmd: node scripts/generate-phased-from-normalized.js --input data/geology-earths-story_normalized.json --outbase data/geology-earths-story --lang en --clone-es-fr)
  - [ ] Extract TTS jobs (per-phase narration) for en/es/fr → data/tts_jobs/geology-earths-story.en|es|fr.json (cmd: node scripts/extract-tts-jobs.js --slugs geology-earths-story --langs en,es,fr --in data --out data/tts_jobs)
  - [ ] Validate PhaseDNA shape and TTS jobs presence → npm run validate
  - [ ] Ensure day-to-slug resolver loads this lesson in index.html → Update getDNALessonData to include this day or general resolver
  - [ ] Attach minimal avatar cues/moods per phase (optional) → Edit phased JSON: phases[].avatar.cues
  - [ ] Quick review of es/fr clones for obvious issues → data/geology-earths-story.es|fr.phased.json
  - [ ] Enable prefetch of next-phase TTS during playback → Player optimization (once globally implemented)
  - [ ] QA in index.html: phase texts render, TTS plays, interactions flow → Open index.html?day=19

## Day 20 — Meteorology - Weather and Climate
- Learning objective: Analyze atmospheric patterns while understanding how meteorological knowledge informs agriculture, transportation, and climate policy.
- Slug: meteorology-weather-and-climate
- Files:
  - Normalized: data/meteorology-weather-and-climate_normalized.json
  - PhaseDNA: data/meteorology-weather-and-climate.en.phased.json, data/meteorology-weather-and-climate.es.phased.json, data/meteorology-weather-and-climate.fr.phased.json
  - TTS jobs: data/tts_jobs/meteorology-weather-and-climate.en.json, data/tts_jobs/meteorology-weather-and-climate.es.json, data/tts_jobs/meteorology-weather-and-climate.fr.json
- Subtasks:
  - [ ] Author normalized DNA source → data/meteorology-weather-and-climate_normalized.json
  - [ ] Generate PhaseDNA v1 (en + clone es/fr) → data/meteorology-weather-and-climate.en|es|fr.phased.json (cmd: node scripts/generate-phased-from-normalized.js --input data/meteorology-weather-and-climate_normalized.json --outbase data/meteorology-weather-and-climate --lang en --clone-es-fr)
  - [ ] Extract TTS jobs (per-phase narration) for en/es/fr → data/tts_jobs/meteorology-weather-and-climate.en|es|fr.json (cmd: node scripts/extract-tts-jobs.js --slugs meteorology-weather-and-climate --langs en,es,fr --in data --out data/tts_jobs)
  - [ ] Validate PhaseDNA shape and TTS jobs presence → npm run validate
  - [ ] Ensure day-to-slug resolver loads this lesson in index.html → Update getDNALessonData to include this day or general resolver
  - [ ] Attach minimal avatar cues/moods per phase (optional) → Edit phased JSON: phases[].avatar.cues
  - [ ] Quick review of es/fr clones for obvious issues → data/meteorology-weather-and-climate.es|fr.phased.json
  - [ ] Enable prefetch of next-phase TTS during playback → Player optimization (once globally implemented)
  - [ ] QA in index.html: phase texts render, TTS plays, interactions flow → Open index.html?day=20

## Day 21 — Oceanography - The Blue Planet
- Learning objective: Explore marine systems while understanding how oceanographic knowledge informs fisheries management and climate science.
- Slug: oceanography-the-blue-planet
- Files:
  - Normalized: data/oceanography-the-blue-planet_normalized.json
  - PhaseDNA: data/oceanography-the-blue-planet.en.phased.json, data/oceanography-the-blue-planet.es.phased.json, data/oceanography-the-blue-planet.fr.phased.json
  - TTS jobs: data/tts_jobs/oceanography-the-blue-planet.en.json, data/tts_jobs/oceanography-the-blue-planet.es.json, data/tts_jobs/oceanography-the-blue-planet.fr.json
- Subtasks:
  - [ ] Author normalized DNA source → data/oceanography-the-blue-planet_normalized.json
  - [ ] Generate PhaseDNA v1 (en + clone es/fr) → data/oceanography-the-blue-planet.en|es|fr.phased.json (cmd: node scripts/generate-phased-from-normalized.js --input data/oceanography-the-blue-planet_normalized.json --outbase data/oceanography-the-blue-planet --lang en --clone-es-fr)
  - [ ] Extract TTS jobs (per-phase narration) for en/es/fr → data/tts_jobs/oceanography-the-blue-planet.en|es|fr.json (cmd: node scripts/extract-tts-jobs.js --slugs oceanography-the-blue-planet --langs en,es,fr --in data --out data/tts_jobs)
  - [ ] Validate PhaseDNA shape and TTS jobs presence → npm run validate
  - [ ] Ensure day-to-slug resolver loads this lesson in index.html → Update getDNALessonData to include this day or general resolver
  - [ ] Attach minimal avatar cues/moods per phase (optional) → Edit phased JSON: phases[].avatar.cues
  - [ ] Quick review of es/fr clones for obvious issues → data/oceanography-the-blue-planet.es|fr.phased.json
  - [ ] Enable prefetch of next-phase TTS during playback → Player optimization (once globally implemented)
  - [ ] QA in index.html: phase texts render, TTS plays, interactions flow → Open index.html?day=21

## Day 22 — Botany - Plant Science
- Learning objective: Explore plant biology while understanding how botanical knowledge informs agriculture, medicine, and environmental conservation.
- Slug: botany-plant-science
- Files:
  - Normalized: data/botany-plant-science_normalized.json
  - PhaseDNA: data/botany-plant-science.en.phased.json, data/botany-plant-science.es.phased.json, data/botany-plant-science.fr.phased.json
  - TTS jobs: data/tts_jobs/botany-plant-science.en.json, data/tts_jobs/botany-plant-science.es.json, data/tts_jobs/botany-plant-science.fr.json
- Subtasks:
  - [ ] Author normalized DNA source → data/botany-plant-science_normalized.json
  - [ ] Generate PhaseDNA v1 (en + clone es/fr) → data/botany-plant-science.en|es|fr.phased.json (cmd: node scripts/generate-phased-from-normalized.js --input data/botany-plant-science_normalized.json --outbase data/botany-plant-science --lang en --clone-es-fr)
  - [ ] Extract TTS jobs (per-phase narration) for en/es/fr → data/tts_jobs/botany-plant-science.en|es|fr.json (cmd: node scripts/extract-tts-jobs.js --slugs botany-plant-science --langs en,es,fr --in data --out data/tts_jobs)
  - [ ] Validate PhaseDNA shape and TTS jobs presence → npm run validate
  - [ ] Ensure day-to-slug resolver loads this lesson in index.html → Update getDNALessonData to include this day or general resolver
  - [ ] Attach minimal avatar cues/moods per phase (optional) → Edit phased JSON: phases[].avatar.cues
  - [ ] Quick review of es/fr clones for obvious issues → data/botany-plant-science.es|fr.phased.json
  - [ ] Enable prefetch of next-phase TTS during playback → Player optimization (once globally implemented)
  - [ ] QA in index.html: phase texts render, TTS plays, interactions flow → Open index.html?day=22

## Day 23 — Zoology - Animal Kingdom
- Learning objective: Study animal behavior while understanding how zoological knowledge informs conservation, animal welfare, and biomimetic technology.
- Slug: zoology-animal-kingdom
- Files:
  - Normalized: data/zoology-animal-kingdom_normalized.json
  - PhaseDNA: data/zoology-animal-kingdom.en.phased.json, data/zoology-animal-kingdom.es.phased.json, data/zoology-animal-kingdom.fr.phased.json
  - TTS jobs: data/tts_jobs/zoology-animal-kingdom.en.json, data/tts_jobs/zoology-animal-kingdom.es.json, data/tts_jobs/zoology-animal-kingdom.fr.json
- Subtasks:
  - [ ] Author normalized DNA source → data/zoology-animal-kingdom_normalized.json
  - [ ] Generate PhaseDNA v1 (en + clone es/fr) → data/zoology-animal-kingdom.en|es|fr.phased.json (cmd: node scripts/generate-phased-from-normalized.js --input data/zoology-animal-kingdom_normalized.json --outbase data/zoology-animal-kingdom --lang en --clone-es-fr)
  - [ ] Extract TTS jobs (per-phase narration) for en/es/fr → data/tts_jobs/zoology-animal-kingdom.en|es|fr.json (cmd: node scripts/extract-tts-jobs.js --slugs zoology-animal-kingdom --langs en,es,fr --in data --out data/tts_jobs)
  - [ ] Validate PhaseDNA shape and TTS jobs presence → npm run validate
  - [ ] Ensure day-to-slug resolver loads this lesson in index.html → Update getDNALessonData to include this day or general resolver
  - [ ] Attach minimal avatar cues/moods per phase (optional) → Edit phased JSON: phases[].avatar.cues
  - [ ] Quick review of es/fr clones for obvious issues → data/zoology-animal-kingdom.es|fr.phased.json
  - [ ] Enable prefetch of next-phase TTS during playback → Player optimization (once globally implemented)
  - [ ] QA in index.html: phase texts render, TTS plays, interactions flow → Open index.html?day=23

## Day 24 — Microbiology - Invisible Life
- Learning objective: Explore microscopic organisms while understanding how microbiological knowledge informs medicine, biotechnology, and environmental science.
- Slug: earths-magnificent-oceans
- Files:
  - Normalized: data/ocean_normalized.json
  - PhaseDNA: data/earths-magnificent-oceans.en.phased.json, data/earths-magnificent-oceans.es.phased.json, data/earths-magnificent-oceans.fr.phased.json
  - TTS jobs: data/tts_jobs/earths-magnificent-oceans.en.json, data/tts_jobs/earths-magnificent-oceans.es.json, data/tts_jobs/earths-magnificent-oceans.fr.json
- Subtasks:
  - [x] Author normalized DNA source → data/ocean_normalized.json
  - [ ] Generate PhaseDNA v1 (en + clone es/fr) → data/earths-magnificent-oceans.en|es|fr.phased.json (cmd: node scripts/generate-phased-from-normalized.js --input data/ocean_normalized.json --outbase data/earths-magnificent-oceans --lang en --clone-es-fr)
  - [x] Extract TTS jobs (per-phase narration) for en/es/fr → data/tts_jobs/earths-magnificent-oceans.en|es|fr.json (cmd: node scripts/extract-tts-jobs.js --slugs earths-magnificent-oceans --langs en,es,fr --in data --out data/tts_jobs)
  - [ ] Validate PhaseDNA shape and TTS jobs presence → npm run validate
  - [x] Ensure day-to-slug resolver loads this lesson in index.html → Update getDNALessonData to include this day or general resolver
  - [ ] Attach minimal avatar cues/moods per phase (optional) → Edit phased JSON: phases[].avatar.cues
  - [ ] Quick review of es/fr clones for obvious issues → data/earths-magnificent-oceans.es|fr.phased.json
  - [ ] Enable prefetch of next-phase TTS during playback → Player optimization (once globally implemented)
  - [ ] QA in index.html: phase texts render, TTS plays, interactions flow → Open index.html?day=24

## Day 25 — Genetics - The Code of Life
- Learning objective: Understand inheritance patterns while exploring how genetic knowledge enables medicine, agriculture, and evolutionary biology.
- Slug: genetics-the-code-of-life
- Files:
  - Normalized: data/genetics-the-code-of-life_normalized.json
  - PhaseDNA: data/genetics-the-code-of-life.en.phased.json, data/genetics-the-code-of-life.es.phased.json, data/genetics-the-code-of-life.fr.phased.json
  - TTS jobs: data/tts_jobs/genetics-the-code-of-life.en.json, data/tts_jobs/genetics-the-code-of-life.es.json, data/tts_jobs/genetics-the-code-of-life.fr.json
- Subtasks:
  - [ ] Author normalized DNA source → data/genetics-the-code-of-life_normalized.json
  - [ ] Generate PhaseDNA v1 (en + clone es/fr) → data/genetics-the-code-of-life.en|es|fr.phased.json (cmd: node scripts/generate-phased-from-normalized.js --input data/genetics-the-code-of-life_normalized.json --outbase data/genetics-the-code-of-life --lang en --clone-es-fr)
  - [ ] Extract TTS jobs (per-phase narration) for en/es/fr → data/tts_jobs/genetics-the-code-of-life.en|es|fr.json (cmd: node scripts/extract-tts-jobs.js --slugs genetics-the-code-of-life --langs en,es,fr --in data --out data/tts_jobs)
  - [ ] Validate PhaseDNA shape and TTS jobs presence → npm run validate
  - [ ] Ensure day-to-slug resolver loads this lesson in index.html → Update getDNALessonData to include this day or general resolver
  - [ ] Attach minimal avatar cues/moods per phase (optional) → Edit phased JSON: phases[].avatar.cues
  - [ ] Quick review of es/fr clones for obvious issues → data/genetics-the-code-of-life.es|fr.phased.json
  - [ ] Enable prefetch of next-phase TTS during playback → Player optimization (once globally implemented)
  - [ ] QA in index.html: phase texts render, TTS plays, interactions flow → Open index.html?day=25

## Day 26 — Ecology - Environmental Systems
- Learning objective: Model ecological relationships while understanding how ecological knowledge informs conservation and sustainable development.
- Slug: ecology-environmental-systems
- Files:
  - Normalized: data/ecology-environmental-systems_normalized.json
  - PhaseDNA: data/ecology-environmental-systems.en.phased.json, data/ecology-environmental-systems.es.phased.json, data/ecology-environmental-systems.fr.phased.json
  - TTS jobs: data/tts_jobs/ecology-environmental-systems.en.json, data/tts_jobs/ecology-environmental-systems.es.json, data/tts_jobs/ecology-environmental-systems.fr.json
- Subtasks:
  - [ ] Author normalized DNA source → data/ecology-environmental-systems_normalized.json
  - [ ] Generate PhaseDNA v1 (en + clone es/fr) → data/ecology-environmental-systems.en|es|fr.phased.json (cmd: node scripts/generate-phased-from-normalized.js --input data/ecology-environmental-systems_normalized.json --outbase data/ecology-environmental-systems --lang en --clone-es-fr)
  - [ ] Extract TTS jobs (per-phase narration) for en/es/fr → data/tts_jobs/ecology-environmental-systems.en|es|fr.json (cmd: node scripts/extract-tts-jobs.js --slugs ecology-environmental-systems --langs en,es,fr --in data --out data/tts_jobs)
  - [ ] Validate PhaseDNA shape and TTS jobs presence → npm run validate
  - [ ] Ensure day-to-slug resolver loads this lesson in index.html → Update getDNALessonData to include this day or general resolver
  - [ ] Attach minimal avatar cues/moods per phase (optional) → Edit phased JSON: phases[].avatar.cues
  - [ ] Quick review of es/fr clones for obvious issues → data/ecology-environmental-systems.es|fr.phased.json
  - [ ] Enable prefetch of next-phase TTS during playback → Player optimization (once globally implemented)
  - [ ] QA in index.html: phase texts render, TTS plays, interactions flow → Open index.html?day=26

## Day 27 — Evolution - Life's Story
- Learning objective: Understand biological change while exploring how evolutionary theory informs medicine, agriculture, and conservation biology.
- Slug: evolution-lifes-story
- Files:
  - Normalized: data/evolution-lifes-story_normalized.json
  - PhaseDNA: data/evolution-lifes-story.en.phased.json, data/evolution-lifes-story.es.phased.json, data/evolution-lifes-story.fr.phased.json
  - TTS jobs: data/tts_jobs/evolution-lifes-story.en.json, data/tts_jobs/evolution-lifes-story.es.json, data/tts_jobs/evolution-lifes-story.fr.json
- Subtasks:
  - [ ] Author normalized DNA source → data/evolution-lifes-story_normalized.json
  - [ ] Generate PhaseDNA v1 (en + clone es/fr) → data/evolution-lifes-story.en|es|fr.phased.json (cmd: node scripts/generate-phased-from-normalized.js --input data/evolution-lifes-story_normalized.json --outbase data/evolution-lifes-story --lang en --clone-es-fr)
  - [ ] Extract TTS jobs (per-phase narration) for en/es/fr → data/tts_jobs/evolution-lifes-story.en|es|fr.json (cmd: node scripts/extract-tts-jobs.js --slugs evolution-lifes-story --langs en,es,fr --in data --out data/tts_jobs)
  - [ ] Validate PhaseDNA shape and TTS jobs presence → npm run validate
  - [ ] Ensure day-to-slug resolver loads this lesson in index.html → Update getDNALessonData to include this day or general resolver
  - [ ] Attach minimal avatar cues/moods per phase (optional) → Edit phased JSON: phases[].avatar.cues
  - [ ] Quick review of es/fr clones for obvious issues → data/evolution-lifes-story.es|fr.phased.json
  - [ ] Enable prefetch of next-phase TTS during playback → Player optimization (once globally implemented)
  - [ ] QA in index.html: phase texts render, TTS plays, interactions flow → Open index.html?day=27

## Day 28 — Biotechnology - Life as Technology
- Learning objective: Apply biological knowledge while understanding how biotechnology addresses global challenges while requiring ethical oversight.
- Slug: biotechnology-life-as-technology
- Files:
  - Normalized: data/biotechnology-life-as-technology_normalized.json
  - PhaseDNA: data/biotechnology-life-as-technology.en.phased.json, data/biotechnology-life-as-technology.es.phased.json, data/biotechnology-life-as-technology.fr.phased.json
  - TTS jobs: data/tts_jobs/biotechnology-life-as-technology.en.json, data/tts_jobs/biotechnology-life-as-technology.es.json, data/tts_jobs/biotechnology-life-as-technology.fr.json
- Subtasks:
  - [ ] Author normalized DNA source → data/biotechnology-life-as-technology_normalized.json
  - [ ] Generate PhaseDNA v1 (en + clone es/fr) → data/biotechnology-life-as-technology.en|es|fr.phased.json (cmd: node scripts/generate-phased-from-normalized.js --input data/biotechnology-life-as-technology_normalized.json --outbase data/biotechnology-life-as-technology --lang en --clone-es-fr)
  - [ ] Extract TTS jobs (per-phase narration) for en/es/fr → data/tts_jobs/biotechnology-life-as-technology.en|es|fr.json (cmd: node scripts/extract-tts-jobs.js --slugs biotechnology-life-as-technology --langs en,es,fr --in data --out data/tts_jobs)
  - [ ] Validate PhaseDNA shape and TTS jobs presence → npm run validate
  - [ ] Ensure day-to-slug resolver loads this lesson in index.html → Update getDNALessonData to include this day or general resolver
  - [ ] Attach minimal avatar cues/moods per phase (optional) → Edit phased JSON: phases[].avatar.cues
  - [ ] Quick review of es/fr clones for obvious issues → data/biotechnology-life-as-technology.es|fr.phased.json
  - [ ] Enable prefetch of next-phase TTS during playback → Player optimization (once globally implemented)
  - [ ] QA in index.html: phase texts render, TTS plays, interactions flow → Open index.html?day=28

## Day 29 — Nanotechnology - The Small Scale
- Learning objective: Explore molecular engineering while understanding how nanotechnology enables medical advances and materials innovation.
- Slug: nanotechnology-the-small-scale
- Files:
  - Normalized: data/nanotechnology-the-small-scale_normalized.json
  - PhaseDNA: data/nanotechnology-the-small-scale.en.phased.json, data/nanotechnology-the-small-scale.es.phased.json, data/nanotechnology-the-small-scale.fr.phased.json
  - TTS jobs: data/tts_jobs/nanotechnology-the-small-scale.en.json, data/tts_jobs/nanotechnology-the-small-scale.es.json, data/tts_jobs/nanotechnology-the-small-scale.fr.json
- Subtasks:
  - [ ] Author normalized DNA source → data/nanotechnology-the-small-scale_normalized.json
  - [ ] Generate PhaseDNA v1 (en + clone es/fr) → data/nanotechnology-the-small-scale.en|es|fr.phased.json (cmd: node scripts/generate-phased-from-normalized.js --input data/nanotechnology-the-small-scale_normalized.json --outbase data/nanotechnology-the-small-scale --lang en --clone-es-fr)
  - [ ] Extract TTS jobs (per-phase narration) for en/es/fr → data/tts_jobs/nanotechnology-the-small-scale.en|es|fr.json (cmd: node scripts/extract-tts-jobs.js --slugs nanotechnology-the-small-scale --langs en,es,fr --in data --out data/tts_jobs)
  - [ ] Validate PhaseDNA shape and TTS jobs presence → npm run validate
  - [ ] Ensure day-to-slug resolver loads this lesson in index.html → Update getDNALessonData to include this day or general resolver
  - [ ] Attach minimal avatar cues/moods per phase (optional) → Edit phased JSON: phases[].avatar.cues
  - [ ] Quick review of es/fr clones for obvious issues → data/nanotechnology-the-small-scale.es|fr.phased.json
  - [ ] Enable prefetch of next-phase TTS during playback → Player optimization (once globally implemented)
  - [ ] QA in index.html: phase texts render, TTS plays, interactions flow → Open index.html?day=29

## Day 30 — Robotics - Intelligent Machines
- Learning objective: Practice automation design while understanding how robotics enables manufacturing, healthcare, and space exploration.
- Slug: robotics-intelligent-machines
- Files:
  - Normalized: data/robotics-intelligent-machines_normalized.json
  - PhaseDNA: data/robotics-intelligent-machines.en.phased.json, data/robotics-intelligent-machines.es.phased.json, data/robotics-intelligent-machines.fr.phased.json
  - TTS jobs: data/tts_jobs/robotics-intelligent-machines.en.json, data/tts_jobs/robotics-intelligent-machines.es.json, data/tts_jobs/robotics-intelligent-machines.fr.json
- Subtasks:
  - [ ] Author normalized DNA source → data/robotics-intelligent-machines_normalized.json
  - [ ] Generate PhaseDNA v1 (en + clone es/fr) → data/robotics-intelligent-machines.en|es|fr.phased.json (cmd: node scripts/generate-phased-from-normalized.js --input data/robotics-intelligent-machines_normalized.json --outbase data/robotics-intelligent-machines --lang en --clone-es-fr)
  - [ ] Extract TTS jobs (per-phase narration) for en/es/fr → data/tts_jobs/robotics-intelligent-machines.en|es|fr.json (cmd: node scripts/extract-tts-jobs.js --slugs robotics-intelligent-machines --langs en,es,fr --in data --out data/tts_jobs)
  - [ ] Validate PhaseDNA shape and TTS jobs presence → npm run validate
  - [ ] Ensure day-to-slug resolver loads this lesson in index.html → Update getDNALessonData to include this day or general resolver
  - [ ] Attach minimal avatar cues/moods per phase (optional) → Edit phased JSON: phases[].avatar.cues
  - [ ] Quick review of es/fr clones for obvious issues → data/robotics-intelligent-machines.es|fr.phased.json
  - [ ] Enable prefetch of next-phase TTS during playback → Player optimization (once globally implemented)
  - [ ] QA in index.html: phase texts render, TTS plays, interactions flow → Open index.html?day=30

## Day 31 — Artificial Intelligence - Machine Learning
- Learning objective: Explore computational intelligence while understanding how AI enables automation, decision support, and scientific discovery.
- Slug: artificial-intelligence-machine-learning
- Files:
  - Normalized: data/artificial-intelligence-machine-learning_normalized.json
  - PhaseDNA: data/artificial-intelligence-machine-learning.en.phased.json, data/artificial-intelligence-machine-learning.es.phased.json, data/artificial-intelligence-machine-learning.fr.phased.json
  - TTS jobs: data/tts_jobs/artificial-intelligence-machine-learning.en.json, data/tts_jobs/artificial-intelligence-machine-learning.es.json, data/tts_jobs/artificial-intelligence-machine-learning.fr.json
- Subtasks:
  - [ ] Author normalized DNA source → data/artificial-intelligence-machine-learning_normalized.json
  - [ ] Generate PhaseDNA v1 (en + clone es/fr) → data/artificial-intelligence-machine-learning.en|es|fr.phased.json (cmd: node scripts/generate-phased-from-normalized.js --input data/artificial-intelligence-machine-learning_normalized.json --outbase data/artificial-intelligence-machine-learning --lang en --clone-es-fr)
  - [ ] Extract TTS jobs (per-phase narration) for en/es/fr → data/tts_jobs/artificial-intelligence-machine-learning.en|es|fr.json (cmd: node scripts/extract-tts-jobs.js --slugs artificial-intelligence-machine-learning --langs en,es,fr --in data --out data/tts_jobs)
  - [ ] Validate PhaseDNA shape and TTS jobs presence → npm run validate
  - [ ] Ensure day-to-slug resolver loads this lesson in index.html → Update getDNALessonData to include this day or general resolver
  - [ ] Attach minimal avatar cues/moods per phase (optional) → Edit phased JSON: phases[].avatar.cues
  - [ ] Quick review of es/fr clones for obvious issues → data/artificial-intelligence-machine-learning.es|fr.phased.json
  - [ ] Enable prefetch of next-phase TTS during playback → Player optimization (once globally implemented)
  - [ ] QA in index.html: phase texts render, TTS plays, interactions flow → Open index.html?day=31

## Day 32 — Computer Science - Digital Logic
- Learning objective: Practice computational thinking while understanding how computer science enables software development, data analysis, and digital innovation.
- Slug: computer-science-digital-logic
- Files:
  - Normalized: data/computer-science-digital-logic_normalized.json
  - PhaseDNA: data/computer-science-digital-logic.en.phased.json, data/computer-science-digital-logic.es.phased.json, data/computer-science-digital-logic.fr.phased.json
  - TTS jobs: data/tts_jobs/computer-science-digital-logic.en.json, data/tts_jobs/computer-science-digital-logic.es.json, data/tts_jobs/computer-science-digital-logic.fr.json
- Subtasks:
  - [ ] Author normalized DNA source → data/computer-science-digital-logic_normalized.json
  - [ ] Generate PhaseDNA v1 (en + clone es/fr) → data/computer-science-digital-logic.en|es|fr.phased.json (cmd: node scripts/generate-phased-from-normalized.js --input data/computer-science-digital-logic_normalized.json --outbase data/computer-science-digital-logic --lang en --clone-es-fr)
  - [ ] Extract TTS jobs (per-phase narration) for en/es/fr → data/tts_jobs/computer-science-digital-logic.en|es|fr.json (cmd: node scripts/extract-tts-jobs.js --slugs computer-science-digital-logic --langs en,es,fr --in data --out data/tts_jobs)
  - [ ] Validate PhaseDNA shape and TTS jobs presence → npm run validate
  - [ ] Ensure day-to-slug resolver loads this lesson in index.html → Update getDNALessonData to include this day or general resolver
  - [ ] Attach minimal avatar cues/moods per phase (optional) → Edit phased JSON: phases[].avatar.cues
  - [ ] Quick review of es/fr clones for obvious issues → data/computer-science-digital-logic.es|fr.phased.json
  - [ ] Enable prefetch of next-phase TTS during playback → Player optimization (once globally implemented)
  - [ ] QA in index.html: phase texts render, TTS plays, interactions flow → Open index.html?day=32

## Day 33 — Data Science - Information Insights
- Learning objective: Analyze data patterns while understanding how data science enables evidence-based decision making and scientific discovery.
- Slug: data-science-information-insights
- Files:
  - Normalized: data/data-science-information-insights_normalized.json
  - PhaseDNA: data/data-science-information-insights.en.phased.json, data/data-science-information-insights.es.phased.json, data/data-science-information-insights.fr.phased.json
  - TTS jobs: data/tts_jobs/data-science-information-insights.en.json, data/tts_jobs/data-science-information-insights.es.json, data/tts_jobs/data-science-information-insights.fr.json
- Subtasks:
  - [ ] Author normalized DNA source → data/data-science-information-insights_normalized.json
  - [ ] Generate PhaseDNA v1 (en + clone es/fr) → data/data-science-information-insights.en|es|fr.phased.json (cmd: node scripts/generate-phased-from-normalized.js --input data/data-science-information-insights_normalized.json --outbase data/data-science-information-insights --lang en --clone-es-fr)
  - [ ] Extract TTS jobs (per-phase narration) for en/es/fr → data/tts_jobs/data-science-information-insights.en|es|fr.json (cmd: node scripts/extract-tts-jobs.js --slugs data-science-information-insights --langs en,es,fr --in data --out data/tts_jobs)
  - [ ] Validate PhaseDNA shape and TTS jobs presence → npm run validate
  - [ ] Ensure day-to-slug resolver loads this lesson in index.html → Update getDNALessonData to include this day or general resolver
  - [ ] Attach minimal avatar cues/moods per phase (optional) → Edit phased JSON: phases[].avatar.cues
  - [ ] Quick review of es/fr clones for obvious issues → data/data-science-information-insights.es|fr.phased.json
  - [ ] Enable prefetch of next-phase TTS during playback → Player optimization (once globally implemented)
  - [ ] QA in index.html: phase texts render, TTS plays, interactions flow → Open index.html?day=33

## Day 34 — Cybersecurity - Digital Protection
- Learning objective: Practice security thinking while understanding how cybersecurity protects individuals, organizations, and critical infrastructure.
- Slug: cybersecurity-digital-protection
- Files:
  - Normalized: data/cybersecurity-digital-protection_normalized.json
  - PhaseDNA: data/cybersecurity-digital-protection.en.phased.json, data/cybersecurity-digital-protection.es.phased.json, data/cybersecurity-digital-protection.fr.phased.json
  - TTS jobs: data/tts_jobs/cybersecurity-digital-protection.en.json, data/tts_jobs/cybersecurity-digital-protection.es.json, data/tts_jobs/cybersecurity-digital-protection.fr.json
- Subtasks:
  - [ ] Author normalized DNA source → data/cybersecurity-digital-protection_normalized.json
  - [ ] Generate PhaseDNA v1 (en + clone es/fr) → data/cybersecurity-digital-protection.en|es|fr.phased.json (cmd: node scripts/generate-phased-from-normalized.js --input data/cybersecurity-digital-protection_normalized.json --outbase data/cybersecurity-digital-protection --lang en --clone-es-fr)
  - [ ] Extract TTS jobs (per-phase narration) for en/es/fr → data/tts_jobs/cybersecurity-digital-protection.en|es|fr.json (cmd: node scripts/extract-tts-jobs.js --slugs cybersecurity-digital-protection --langs en,es,fr --in data --out data/tts_jobs)
  - [ ] Validate PhaseDNA shape and TTS jobs presence → npm run validate
  - [ ] Ensure day-to-slug resolver loads this lesson in index.html → Update getDNALessonData to include this day or general resolver
  - [ ] Attach minimal avatar cues/moods per phase (optional) → Edit phased JSON: phases[].avatar.cues
  - [ ] Quick review of es/fr clones for obvious issues → data/cybersecurity-digital-protection.es|fr.phased.json
  - [ ] Enable prefetch of next-phase TTS during playback → Player optimization (once globally implemented)
  - [ ] QA in index.html: phase texts render, TTS plays, interactions flow → Open index.html?day=34

## Day 35 — Blockchain - Distributed Trust
- Learning objective: Understand decentralized systems while exploring how blockchain technology enables secure transactions and digital ownership.
- Slug: blockchain-distributed-trust
- Files:
  - Normalized: data/blockchain-distributed-trust_normalized.json
  - PhaseDNA: data/blockchain-distributed-trust.en.phased.json, data/blockchain-distributed-trust.es.phased.json, data/blockchain-distributed-trust.fr.phased.json
  - TTS jobs: data/tts_jobs/blockchain-distributed-trust.en.json, data/tts_jobs/blockchain-distributed-trust.es.json, data/tts_jobs/blockchain-distributed-trust.fr.json
- Subtasks:
  - [ ] Author normalized DNA source → data/blockchain-distributed-trust_normalized.json
  - [ ] Generate PhaseDNA v1 (en + clone es/fr) → data/blockchain-distributed-trust.en|es|fr.phased.json (cmd: node scripts/generate-phased-from-normalized.js --input data/blockchain-distributed-trust_normalized.json --outbase data/blockchain-distributed-trust --lang en --clone-es-fr)
  - [ ] Extract TTS jobs (per-phase narration) for en/es/fr → data/tts_jobs/blockchain-distributed-trust.en|es|fr.json (cmd: node scripts/extract-tts-jobs.js --slugs blockchain-distributed-trust --langs en,es,fr --in data --out data/tts_jobs)
  - [ ] Validate PhaseDNA shape and TTS jobs presence → npm run validate
  - [ ] Ensure day-to-slug resolver loads this lesson in index.html → Update getDNALessonData to include this day or general resolver
  - [ ] Attach minimal avatar cues/moods per phase (optional) → Edit phased JSON: phases[].avatar.cues
  - [ ] Quick review of es/fr clones for obvious issues → data/blockchain-distributed-trust.es|fr.phased.json
  - [ ] Enable prefetch of next-phase TTS during playback → Player optimization (once globally implemented)
  - [ ] QA in index.html: phase texts render, TTS plays, interactions flow → Open index.html?day=35

## Day 36 — Quantum Computing - Beyond Classical
- Learning objective: Explore quantum mechanics while understanding how quantum computing enables cryptography, simulation, and optimization.
- Slug: quantum-computing-beyond-classical
- Files:
  - Normalized: data/quantum-computing-beyond-classical_normalized.json
  - PhaseDNA: data/quantum-computing-beyond-classical.en.phased.json, data/quantum-computing-beyond-classical.es.phased.json, data/quantum-computing-beyond-classical.fr.phased.json
  - TTS jobs: data/tts_jobs/quantum-computing-beyond-classical.en.json, data/tts_jobs/quantum-computing-beyond-classical.es.json, data/tts_jobs/quantum-computing-beyond-classical.fr.json
- Subtasks:
  - [ ] Author normalized DNA source → data/quantum-computing-beyond-classical_normalized.json
  - [ ] Generate PhaseDNA v1 (en + clone es/fr) → data/quantum-computing-beyond-classical.en|es|fr.phased.json (cmd: node scripts/generate-phased-from-normalized.js --input data/quantum-computing-beyond-classical_normalized.json --outbase data/quantum-computing-beyond-classical --lang en --clone-es-fr)
  - [ ] Extract TTS jobs (per-phase narration) for en/es/fr → data/tts_jobs/quantum-computing-beyond-classical.en|es|fr.json (cmd: node scripts/extract-tts-jobs.js --slugs quantum-computing-beyond-classical --langs en,es,fr --in data --out data/tts_jobs)
  - [ ] Validate PhaseDNA shape and TTS jobs presence → npm run validate
  - [ ] Ensure day-to-slug resolver loads this lesson in index.html → Update getDNALessonData to include this day or general resolver
  - [ ] Attach minimal avatar cues/moods per phase (optional) → Edit phased JSON: phases[].avatar.cues
  - [ ] Quick review of es/fr clones for obvious issues → data/quantum-computing-beyond-classical.es|fr.phased.json
  - [ ] Enable prefetch of next-phase TTS during playback → Player optimization (once globally implemented)
  - [ ] QA in index.html: phase texts render, TTS plays, interactions flow → Open index.html?day=36

## Day 37 — Machine Learning - Pattern Recognition
- Learning objective: Practice algorithmic learning while understanding how machine learning enables automation, prediction, and personalization.
- Slug: machine-learning-pattern-recognition
- Files:
  - Normalized: data/machine-learning-pattern-recognition_normalized.json
  - PhaseDNA: data/machine-learning-pattern-recognition.en.phased.json, data/machine-learning-pattern-recognition.es.phased.json, data/machine-learning-pattern-recognition.fr.phased.json
  - TTS jobs: data/tts_jobs/machine-learning-pattern-recognition.en.json, data/tts_jobs/machine-learning-pattern-recognition.es.json, data/tts_jobs/machine-learning-pattern-recognition.fr.json
- Subtasks:
  - [ ] Author normalized DNA source → data/machine-learning-pattern-recognition_normalized.json
  - [ ] Generate PhaseDNA v1 (en + clone es/fr) → data/machine-learning-pattern-recognition.en|es|fr.phased.json (cmd: node scripts/generate-phased-from-normalized.js --input data/machine-learning-pattern-recognition_normalized.json --outbase data/machine-learning-pattern-recognition --lang en --clone-es-fr)
  - [ ] Extract TTS jobs (per-phase narration) for en/es/fr → data/tts_jobs/machine-learning-pattern-recognition.en|es|fr.json (cmd: node scripts/extract-tts-jobs.js --slugs machine-learning-pattern-recognition --langs en,es,fr --in data --out data/tts_jobs)
  - [ ] Validate PhaseDNA shape and TTS jobs presence → npm run validate
  - [ ] Ensure day-to-slug resolver loads this lesson in index.html → Update getDNALessonData to include this day or general resolver
  - [ ] Attach minimal avatar cues/moods per phase (optional) → Edit phased JSON: phases[].avatar.cues
  - [ ] Quick review of es/fr clones for obvious issues → data/machine-learning-pattern-recognition.es|fr.phased.json
  - [ ] Enable prefetch of next-phase TTS during playback → Player optimization (once globally implemented)
  - [ ] QA in index.html: phase texts render, TTS plays, interactions flow → Open index.html?day=37

## Day 38 — Neural Networks - Brain-Inspired Computing
- Learning objective: Model neural processes while understanding how neural networks enable image recognition, language processing, and decision making.
- Slug: neural-networks-brain-inspired-computing
- Files:
  - Normalized: data/neural-networks-brain-inspired-computing_normalized.json
  - PhaseDNA: data/neural-networks-brain-inspired-computing.en.phased.json, data/neural-networks-brain-inspired-computing.es.phased.json, data/neural-networks-brain-inspired-computing.fr.phased.json
  - TTS jobs: data/tts_jobs/neural-networks-brain-inspired-computing.en.json, data/tts_jobs/neural-networks-brain-inspired-computing.es.json, data/tts_jobs/neural-networks-brain-inspired-computing.fr.json
- Subtasks:
  - [ ] Author normalized DNA source → data/neural-networks-brain-inspired-computing_normalized.json
  - [ ] Generate PhaseDNA v1 (en + clone es/fr) → data/neural-networks-brain-inspired-computing.en|es|fr.phased.json (cmd: node scripts/generate-phased-from-normalized.js --input data/neural-networks-brain-inspired-computing_normalized.json --outbase data/neural-networks-brain-inspired-computing --lang en --clone-es-fr)
  - [ ] Extract TTS jobs (per-phase narration) for en/es/fr → data/tts_jobs/neural-networks-brain-inspired-computing.en|es|fr.json (cmd: node scripts/extract-tts-jobs.js --slugs neural-networks-brain-inspired-computing --langs en,es,fr --in data --out data/tts_jobs)
  - [ ] Validate PhaseDNA shape and TTS jobs presence → npm run validate
  - [ ] Ensure day-to-slug resolver loads this lesson in index.html → Update getDNALessonData to include this day or general resolver
  - [ ] Attach minimal avatar cues/moods per phase (optional) → Edit phased JSON: phases[].avatar.cues
  - [ ] Quick review of es/fr clones for obvious issues → data/neural-networks-brain-inspired-computing.es|fr.phased.json
  - [ ] Enable prefetch of next-phase TTS during playback → Player optimization (once globally implemented)
  - [ ] QA in index.html: phase texts render, TTS plays, interactions flow → Open index.html?day=38

## Day 39 — Virtual Reality - Immersive Experience
- Learning objective: Explore spatial computing while understanding how VR enables training, entertainment, and therapeutic applications.
- Slug: virtual-reality-immersive-experience
- Files:
  - Normalized: data/virtual-reality-immersive-experience_normalized.json
  - PhaseDNA: data/virtual-reality-immersive-experience.en.phased.json, data/virtual-reality-immersive-experience.es.phased.json, data/virtual-reality-immersive-experience.fr.phased.json
  - TTS jobs: data/tts_jobs/virtual-reality-immersive-experience.en.json, data/tts_jobs/virtual-reality-immersive-experience.es.json, data/tts_jobs/virtual-reality-immersive-experience.fr.json
- Subtasks:
  - [ ] Author normalized DNA source → data/virtual-reality-immersive-experience_normalized.json
  - [ ] Generate PhaseDNA v1 (en + clone es/fr) → data/virtual-reality-immersive-experience.en|es|fr.phased.json (cmd: node scripts/generate-phased-from-normalized.js --input data/virtual-reality-immersive-experience_normalized.json --outbase data/virtual-reality-immersive-experience --lang en --clone-es-fr)
  - [ ] Extract TTS jobs (per-phase narration) for en/es/fr → data/tts_jobs/virtual-reality-immersive-experience.en|es|fr.json (cmd: node scripts/extract-tts-jobs.js --slugs virtual-reality-immersive-experience --langs en,es,fr --in data --out data/tts_jobs)
  - [ ] Validate PhaseDNA shape and TTS jobs presence → npm run validate
  - [ ] Ensure day-to-slug resolver loads this lesson in index.html → Update getDNALessonData to include this day or general resolver
  - [ ] Attach minimal avatar cues/moods per phase (optional) → Edit phased JSON: phases[].avatar.cues
  - [ ] Quick review of es/fr clones for obvious issues → data/virtual-reality-immersive-experience.es|fr.phased.json
  - [ ] Enable prefetch of next-phase TTS during playback → Player optimization (once globally implemented)
  - [ ] QA in index.html: phase texts render, TTS plays, interactions flow → Open index.html?day=39

## Day 40 — Augmented Reality - Enhanced Reality
- Learning objective: Practice spatial interface design while understanding how AR enables information overlay, navigation, and interactive experiences.
- Slug: augmented-reality-enhanced-reality
- Files:
  - Normalized: data/augmented-reality-enhanced-reality_normalized.json
  - PhaseDNA: data/augmented-reality-enhanced-reality.en.phased.json, data/augmented-reality-enhanced-reality.es.phased.json, data/augmented-reality-enhanced-reality.fr.phased.json
  - TTS jobs: data/tts_jobs/augmented-reality-enhanced-reality.en.json, data/tts_jobs/augmented-reality-enhanced-reality.es.json, data/tts_jobs/augmented-reality-enhanced-reality.fr.json
- Subtasks:
  - [ ] Author normalized DNA source → data/augmented-reality-enhanced-reality_normalized.json
  - [ ] Generate PhaseDNA v1 (en + clone es/fr) → data/augmented-reality-enhanced-reality.en|es|fr.phased.json (cmd: node scripts/generate-phased-from-normalized.js --input data/augmented-reality-enhanced-reality_normalized.json --outbase data/augmented-reality-enhanced-reality --lang en --clone-es-fr)
  - [ ] Extract TTS jobs (per-phase narration) for en/es/fr → data/tts_jobs/augmented-reality-enhanced-reality.en|es|fr.json (cmd: node scripts/extract-tts-jobs.js --slugs augmented-reality-enhanced-reality --langs en,es,fr --in data --out data/tts_jobs)
  - [ ] Validate PhaseDNA shape and TTS jobs presence → npm run validate
  - [ ] Ensure day-to-slug resolver loads this lesson in index.html → Update getDNALessonData to include this day or general resolver
  - [ ] Attach minimal avatar cues/moods per phase (optional) → Edit phased JSON: phases[].avatar.cues
  - [ ] Quick review of es/fr clones for obvious issues → data/augmented-reality-enhanced-reality.es|fr.phased.json
  - [ ] Enable prefetch of next-phase TTS during playback → Player optimization (once globally implemented)
  - [ ] QA in index.html: phase texts render, TTS plays, interactions flow → Open index.html?day=40

## Day 41 — Internet of Things - Connected Devices
- Learning objective: Design sensor networks while understanding how IoT enables smart homes, industrial automation, and environmental monitoring.
- Slug: internet-of-things-connected-devices
- Files:
  - Normalized: data/internet-of-things-connected-devices_normalized.json
  - PhaseDNA: data/internet-of-things-connected-devices.en.phased.json, data/internet-of-things-connected-devices.es.phased.json, data/internet-of-things-connected-devices.fr.phased.json
  - TTS jobs: data/tts_jobs/internet-of-things-connected-devices.en.json, data/tts_jobs/internet-of-things-connected-devices.es.json, data/tts_jobs/internet-of-things-connected-devices.fr.json
- Subtasks:
  - [ ] Author normalized DNA source → data/internet-of-things-connected-devices_normalized.json
  - [ ] Generate PhaseDNA v1 (en + clone es/fr) → data/internet-of-things-connected-devices.en|es|fr.phased.json (cmd: node scripts/generate-phased-from-normalized.js --input data/internet-of-things-connected-devices_normalized.json --outbase data/internet-of-things-connected-devices --lang en --clone-es-fr)
  - [ ] Extract TTS jobs (per-phase narration) for en/es/fr → data/tts_jobs/internet-of-things-connected-devices.en|es|fr.json (cmd: node scripts/extract-tts-jobs.js --slugs internet-of-things-connected-devices --langs en,es,fr --in data --out data/tts_jobs)
  - [ ] Validate PhaseDNA shape and TTS jobs presence → npm run validate
  - [ ] Ensure day-to-slug resolver loads this lesson in index.html → Update getDNALessonData to include this day or general resolver
  - [ ] Attach minimal avatar cues/moods per phase (optional) → Edit phased JSON: phases[].avatar.cues
  - [ ] Quick review of es/fr clones for obvious issues → data/internet-of-things-connected-devices.es|fr.phased.json
  - [ ] Enable prefetch of next-phase TTS during playback → Player optimization (once globally implemented)
  - [ ] QA in index.html: phase texts render, TTS plays, interactions flow → Open index.html?day=41

## Day 42 — Cloud Computing - Distributed Resources
- Learning objective: Understand scalable systems while exploring how cloud computing enables software services, data storage, and computational power.
- Slug: cloud-computing-distributed-resources
- Files:
  - Normalized: data/cloud-computing-distributed-resources_normalized.json
  - PhaseDNA: data/cloud-computing-distributed-resources.en.phased.json, data/cloud-computing-distributed-resources.es.phased.json, data/cloud-computing-distributed-resources.fr.phased.json
  - TTS jobs: data/tts_jobs/cloud-computing-distributed-resources.en.json, data/tts_jobs/cloud-computing-distributed-resources.es.json, data/tts_jobs/cloud-computing-distributed-resources.fr.json
- Subtasks:
  - [ ] Author normalized DNA source → data/cloud-computing-distributed-resources_normalized.json
  - [ ] Generate PhaseDNA v1 (en + clone es/fr) → data/cloud-computing-distributed-resources.en|es|fr.phased.json (cmd: node scripts/generate-phased-from-normalized.js --input data/cloud-computing-distributed-resources_normalized.json --outbase data/cloud-computing-distributed-resources --lang en --clone-es-fr)
  - [ ] Extract TTS jobs (per-phase narration) for en/es/fr → data/tts_jobs/cloud-computing-distributed-resources.en|es|fr.json (cmd: node scripts/extract-tts-jobs.js --slugs cloud-computing-distributed-resources --langs en,es,fr --in data --out data/tts_jobs)
  - [ ] Validate PhaseDNA shape and TTS jobs presence → npm run validate
  - [ ] Ensure day-to-slug resolver loads this lesson in index.html → Update getDNALessonData to include this day or general resolver
  - [ ] Attach minimal avatar cues/moods per phase (optional) → Edit phased JSON: phases[].avatar.cues
  - [ ] Quick review of es/fr clones for obvious issues → data/cloud-computing-distributed-resources.es|fr.phased.json
  - [ ] Enable prefetch of next-phase TTS during playback → Player optimization (once globally implemented)
  - [ ] QA in index.html: phase texts render, TTS plays, interactions flow → Open index.html?day=42

## Day 43 — Mobile Development - App Creation
- Learning objective: Practice mobile interface design while understanding how mobile apps enable communication, productivity, and entertainment.
- Slug: mobile-development-app-creation
- Files:
  - Normalized: data/mobile-development-app-creation_normalized.json
  - PhaseDNA: data/mobile-development-app-creation.en.phased.json, data/mobile-development-app-creation.es.phased.json, data/mobile-development-app-creation.fr.phased.json
  - TTS jobs: data/tts_jobs/mobile-development-app-creation.en.json, data/tts_jobs/mobile-development-app-creation.es.json, data/tts_jobs/mobile-development-app-creation.fr.json
- Subtasks:
  - [ ] Author normalized DNA source → data/mobile-development-app-creation_normalized.json
  - [ ] Generate PhaseDNA v1 (en + clone es/fr) → data/mobile-development-app-creation.en|es|fr.phased.json (cmd: node scripts/generate-phased-from-normalized.js --input data/mobile-development-app-creation_normalized.json --outbase data/mobile-development-app-creation --lang en --clone-es-fr)
  - [ ] Extract TTS jobs (per-phase narration) for en/es/fr → data/tts_jobs/mobile-development-app-creation.en|es|fr.json (cmd: node scripts/extract-tts-jobs.js --slugs mobile-development-app-creation --langs en,es,fr --in data --out data/tts_jobs)
  - [ ] Validate PhaseDNA shape and TTS jobs presence → npm run validate
  - [ ] Ensure day-to-slug resolver loads this lesson in index.html → Update getDNALessonData to include this day or general resolver
  - [ ] Attach minimal avatar cues/moods per phase (optional) → Edit phased JSON: phases[].avatar.cues
  - [ ] Quick review of es/fr clones for obvious issues → data/mobile-development-app-creation.es|fr.phased.json
  - [ ] Enable prefetch of next-phase TTS during playback → Player optimization (once globally implemented)
  - [ ] QA in index.html: phase texts render, TTS plays, interactions flow → Open index.html?day=43

## Day 44 — Web Development - Digital Presence
- Learning objective: Build web applications while understanding how web technology enables information sharing, e-commerce, and social interaction.
- Slug: web-development-digital-presence
- Files:
  - Normalized: data/web-development-digital-presence_normalized.json
  - PhaseDNA: data/web-development-digital-presence.en.phased.json, data/web-development-digital-presence.es.phased.json, data/web-development-digital-presence.fr.phased.json
  - TTS jobs: data/tts_jobs/web-development-digital-presence.en.json, data/tts_jobs/web-development-digital-presence.es.json, data/tts_jobs/web-development-digital-presence.fr.json
- Subtasks:
  - [ ] Author normalized DNA source → data/web-development-digital-presence_normalized.json
  - [ ] Generate PhaseDNA v1 (en + clone es/fr) → data/web-development-digital-presence.en|es|fr.phased.json (cmd: node scripts/generate-phased-from-normalized.js --input data/web-development-digital-presence_normalized.json --outbase data/web-development-digital-presence --lang en --clone-es-fr)
  - [ ] Extract TTS jobs (per-phase narration) for en/es/fr → data/tts_jobs/web-development-digital-presence.en|es|fr.json (cmd: node scripts/extract-tts-jobs.js --slugs web-development-digital-presence --langs en,es,fr --in data --out data/tts_jobs)
  - [ ] Validate PhaseDNA shape and TTS jobs presence → npm run validate
  - [ ] Ensure day-to-slug resolver loads this lesson in index.html → Update getDNALessonData to include this day or general resolver
  - [ ] Attach minimal avatar cues/moods per phase (optional) → Edit phased JSON: phases[].avatar.cues
  - [ ] Quick review of es/fr clones for obvious issues → data/web-development-digital-presence.es|fr.phased.json
  - [ ] Enable prefetch of next-phase TTS during playback → Player optimization (once globally implemented)
  - [ ] QA in index.html: phase texts render, TTS plays, interactions flow → Open index.html?day=44

## Day 45 — Game Development - Interactive Entertainment
- Learning objective: Create digital experiences while understanding how games enable education, therapy, and social interaction.
- Slug: game-development-interactive-entertainment
- Files:
  - Normalized: data/game-development-interactive-entertainment_normalized.json
  - PhaseDNA: data/game-development-interactive-entertainment.en.phased.json, data/game-development-interactive-entertainment.es.phased.json, data/game-development-interactive-entertainment.fr.phased.json
  - TTS jobs: data/tts_jobs/game-development-interactive-entertainment.en.json, data/tts_jobs/game-development-interactive-entertainment.es.json, data/tts_jobs/game-development-interactive-entertainment.fr.json
- Subtasks:
  - [ ] Author normalized DNA source → data/game-development-interactive-entertainment_normalized.json
  - [ ] Generate PhaseDNA v1 (en + clone es/fr) → data/game-development-interactive-entertainment.en|es|fr.phased.json (cmd: node scripts/generate-phased-from-normalized.js --input data/game-development-interactive-entertainment_normalized.json --outbase data/game-development-interactive-entertainment --lang en --clone-es-fr)
  - [ ] Extract TTS jobs (per-phase narration) for en/es/fr → data/tts_jobs/game-development-interactive-entertainment.en|es|fr.json (cmd: node scripts/extract-tts-jobs.js --slugs game-development-interactive-entertainment --langs en,es,fr --in data --out data/tts_jobs)
  - [ ] Validate PhaseDNA shape and TTS jobs presence → npm run validate
  - [ ] Ensure day-to-slug resolver loads this lesson in index.html → Update getDNALessonData to include this day or general resolver
  - [ ] Attach minimal avatar cues/moods per phase (optional) → Edit phased JSON: phases[].avatar.cues
  - [ ] Quick review of es/fr clones for obvious issues → data/game-development-interactive-entertainment.es|fr.phased.json
  - [ ] Enable prefetch of next-phase TTS during playback → Player optimization (once globally implemented)
  - [ ] QA in index.html: phase texts render, TTS plays, interactions flow → Open index.html?day=45

## Day 46 — Digital Art - Creative Technology
- Learning objective: Practice digital creation while understanding how digital art enables new forms of expression and cultural preservation.
- Slug: digital-art-creative-technology
- Files:
  - Normalized: data/digital-art-creative-technology_normalized.json
  - PhaseDNA: data/digital-art-creative-technology.en.phased.json, data/digital-art-creative-technology.es.phased.json, data/digital-art-creative-technology.fr.phased.json
  - TTS jobs: data/tts_jobs/digital-art-creative-technology.en.json, data/tts_jobs/digital-art-creative-technology.es.json, data/tts_jobs/digital-art-creative-technology.fr.json
- Subtasks:
  - [ ] Author normalized DNA source → data/digital-art-creative-technology_normalized.json
  - [ ] Generate PhaseDNA v1 (en + clone es/fr) → data/digital-art-creative-technology.en|es|fr.phased.json (cmd: node scripts/generate-phased-from-normalized.js --input data/digital-art-creative-technology_normalized.json --outbase data/digital-art-creative-technology --lang en --clone-es-fr)
  - [ ] Extract TTS jobs (per-phase narration) for en/es/fr → data/tts_jobs/digital-art-creative-technology.en|es|fr.json (cmd: node scripts/extract-tts-jobs.js --slugs digital-art-creative-technology --langs en,es,fr --in data --out data/tts_jobs)
  - [ ] Validate PhaseDNA shape and TTS jobs presence → npm run validate
  - [ ] Ensure day-to-slug resolver loads this lesson in index.html → Update getDNALessonData to include this day or general resolver
  - [ ] Attach minimal avatar cues/moods per phase (optional) → Edit phased JSON: phases[].avatar.cues
  - [ ] Quick review of es/fr clones for obvious issues → data/digital-art-creative-technology.es|fr.phased.json
  - [ ] Enable prefetch of next-phase TTS during playback → Player optimization (once globally implemented)
  - [ ] QA in index.html: phase texts render, TTS plays, interactions flow → Open index.html?day=46

## Day 47 — Digital Music - Sonic Innovation
- Learning objective: Explore electronic sound while understanding how digital music enables new forms of composition and performance.
- Slug: digital-music-sonic-innovation
- Files:
  - Normalized: data/digital-music-sonic-innovation_normalized.json
  - PhaseDNA: data/digital-music-sonic-innovation.en.phased.json, data/digital-music-sonic-innovation.es.phased.json, data/digital-music-sonic-innovation.fr.phased.json
  - TTS jobs: data/tts_jobs/digital-music-sonic-innovation.en.json, data/tts_jobs/digital-music-sonic-innovation.es.json, data/tts_jobs/digital-music-sonic-innovation.fr.json
- Subtasks:
  - [ ] Author normalized DNA source → data/digital-music-sonic-innovation_normalized.json
  - [ ] Generate PhaseDNA v1 (en + clone es/fr) → data/digital-music-sonic-innovation.en|es|fr.phased.json (cmd: node scripts/generate-phased-from-normalized.js --input data/digital-music-sonic-innovation_normalized.json --outbase data/digital-music-sonic-innovation --lang en --clone-es-fr)
  - [ ] Extract TTS jobs (per-phase narration) for en/es/fr → data/tts_jobs/digital-music-sonic-innovation.en|es|fr.json (cmd: node scripts/extract-tts-jobs.js --slugs digital-music-sonic-innovation --langs en,es,fr --in data --out data/tts_jobs)
  - [ ] Validate PhaseDNA shape and TTS jobs presence → npm run validate
  - [ ] Ensure day-to-slug resolver loads this lesson in index.html → Update getDNALessonData to include this day or general resolver
  - [ ] Attach minimal avatar cues/moods per phase (optional) → Edit phased JSON: phases[].avatar.cues
  - [ ] Quick review of es/fr clones for obvious issues → data/digital-music-sonic-innovation.es|fr.phased.json
  - [ ] Enable prefetch of next-phase TTS during playback → Player optimization (once globally implemented)
  - [ ] QA in index.html: phase texts render, TTS plays, interactions flow → Open index.html?day=47

## Day 48 — Digital Photography - Visual Storytelling
- Learning objective: Practice visual communication while understanding how digital photography enables documentation, art, and social media.
- Slug: digital-photography-visual-storytelling
- Files:
  - Normalized: data/digital-photography-visual-storytelling_normalized.json
  - PhaseDNA: data/digital-photography-visual-storytelling.en.phased.json, data/digital-photography-visual-storytelling.es.phased.json, data/digital-photography-visual-storytelling.fr.phased.json
  - TTS jobs: data/tts_jobs/digital-photography-visual-storytelling.en.json, data/tts_jobs/digital-photography-visual-storytelling.es.json, data/tts_jobs/digital-photography-visual-storytelling.fr.json
- Subtasks:
  - [ ] Author normalized DNA source → data/digital-photography-visual-storytelling_normalized.json
  - [ ] Generate PhaseDNA v1 (en + clone es/fr) → data/digital-photography-visual-storytelling.en|es|fr.phased.json (cmd: node scripts/generate-phased-from-normalized.js --input data/digital-photography-visual-storytelling_normalized.json --outbase data/digital-photography-visual-storytelling --lang en --clone-es-fr)
  - [ ] Extract TTS jobs (per-phase narration) for en/es/fr → data/tts_jobs/digital-photography-visual-storytelling.en|es|fr.json (cmd: node scripts/extract-tts-jobs.js --slugs digital-photography-visual-storytelling --langs en,es,fr --in data --out data/tts_jobs)
  - [ ] Validate PhaseDNA shape and TTS jobs presence → npm run validate
  - [ ] Ensure day-to-slug resolver loads this lesson in index.html → Update getDNALessonData to include this day or general resolver
  - [ ] Attach minimal avatar cues/moods per phase (optional) → Edit phased JSON: phases[].avatar.cues
  - [ ] Quick review of es/fr clones for obvious issues → data/digital-photography-visual-storytelling.es|fr.phased.json
  - [ ] Enable prefetch of next-phase TTS during playback → Player optimization (once globally implemented)
  - [ ] QA in index.html: phase texts render, TTS plays, interactions flow → Open index.html?day=48

## Day 49 — Video Production - Moving Images
- Learning objective: Create visual narratives while understanding how video enables education, entertainment, and social commentary.
- Slug: video-production-moving-images
- Files:
  - Normalized: data/video-production-moving-images_normalized.json
  - PhaseDNA: data/video-production-moving-images.en.phased.json, data/video-production-moving-images.es.phased.json, data/video-production-moving-images.fr.phased.json
  - TTS jobs: data/tts_jobs/video-production-moving-images.en.json, data/tts_jobs/video-production-moving-images.es.json, data/tts_jobs/video-production-moving-images.fr.json
- Subtasks:
  - [ ] Author normalized DNA source → data/video-production-moving-images_normalized.json
  - [ ] Generate PhaseDNA v1 (en + clone es/fr) → data/video-production-moving-images.en|es|fr.phased.json (cmd: node scripts/generate-phased-from-normalized.js --input data/video-production-moving-images_normalized.json --outbase data/video-production-moving-images --lang en --clone-es-fr)
  - [ ] Extract TTS jobs (per-phase narration) for en/es/fr → data/tts_jobs/video-production-moving-images.en|es|fr.json (cmd: node scripts/extract-tts-jobs.js --slugs video-production-moving-images --langs en,es,fr --in data --out data/tts_jobs)
  - [ ] Validate PhaseDNA shape and TTS jobs presence → npm run validate
  - [ ] Ensure day-to-slug resolver loads this lesson in index.html → Update getDNALessonData to include this day or general resolver
  - [ ] Attach minimal avatar cues/moods per phase (optional) → Edit phased JSON: phases[].avatar.cues
  - [ ] Quick review of es/fr clones for obvious issues → data/video-production-moving-images.es|fr.phased.json
  - [ ] Enable prefetch of next-phase TTS during playback → Player optimization (once globally implemented)
  - [ ] QA in index.html: phase texts render, TTS plays, interactions flow → Open index.html?day=49

## Day 50 — Podcasting - Audio Content
- Learning objective: Practice audio storytelling while understanding how podcasting enables education, entertainment, and community building.
- Slug: podcasting-audio-content
- Files:
  - Normalized: data/podcasting-audio-content_normalized.json
  - PhaseDNA: data/podcasting-audio-content.en.phased.json, data/podcasting-audio-content.es.phased.json, data/podcasting-audio-content.fr.phased.json
  - TTS jobs: data/tts_jobs/podcasting-audio-content.en.json, data/tts_jobs/podcasting-audio-content.es.json, data/tts_jobs/podcasting-audio-content.fr.json
- Subtasks:
  - [ ] Author normalized DNA source → data/podcasting-audio-content_normalized.json
  - [ ] Generate PhaseDNA v1 (en + clone es/fr) → data/podcasting-audio-content.en|es|fr.phased.json (cmd: node scripts/generate-phased-from-normalized.js --input data/podcasting-audio-content_normalized.json --outbase data/podcasting-audio-content --lang en --clone-es-fr)
  - [ ] Extract TTS jobs (per-phase narration) for en/es/fr → data/tts_jobs/podcasting-audio-content.en|es|fr.json (cmd: node scripts/extract-tts-jobs.js --slugs podcasting-audio-content --langs en,es,fr --in data --out data/tts_jobs)
  - [ ] Validate PhaseDNA shape and TTS jobs presence → npm run validate
  - [ ] Ensure day-to-slug resolver loads this lesson in index.html → Update getDNALessonData to include this day or general resolver
  - [ ] Attach minimal avatar cues/moods per phase (optional) → Edit phased JSON: phases[].avatar.cues
  - [ ] Quick review of es/fr clones for obvious issues → data/podcasting-audio-content.es|fr.phased.json
  - [ ] Enable prefetch of next-phase TTS during playback → Player optimization (once globally implemented)
  - [ ] QA in index.html: phase texts render, TTS plays, interactions flow → Open index.html?day=50

## Day 51 — Social Media - Digital Connection
- Learning objective: Navigate online communities while understanding how social media enables communication, activism, and information sharing.
- Slug: social-media-digital-connection
- Files:
  - Normalized: data/social-media-digital-connection_normalized.json
  - PhaseDNA: data/social-media-digital-connection.en.phased.json, data/social-media-digital-connection.es.phased.json, data/social-media-digital-connection.fr.phased.json
  - TTS jobs: data/tts_jobs/social-media-digital-connection.en.json, data/tts_jobs/social-media-digital-connection.es.json, data/tts_jobs/social-media-digital-connection.fr.json
- Subtasks:
  - [ ] Author normalized DNA source → data/social-media-digital-connection_normalized.json
  - [ ] Generate PhaseDNA v1 (en + clone es/fr) → data/social-media-digital-connection.en|es|fr.phased.json (cmd: node scripts/generate-phased-from-normalized.js --input data/social-media-digital-connection_normalized.json --outbase data/social-media-digital-connection --lang en --clone-es-fr)
  - [ ] Extract TTS jobs (per-phase narration) for en/es/fr → data/tts_jobs/social-media-digital-connection.en|es|fr.json (cmd: node scripts/extract-tts-jobs.js --slugs social-media-digital-connection --langs en,es,fr --in data --out data/tts_jobs)
  - [ ] Validate PhaseDNA shape and TTS jobs presence → npm run validate
  - [ ] Ensure day-to-slug resolver loads this lesson in index.html → Update getDNALessonData to include this day or general resolver
  - [ ] Attach minimal avatar cues/moods per phase (optional) → Edit phased JSON: phases[].avatar.cues
  - [ ] Quick review of es/fr clones for obvious issues → data/social-media-digital-connection.es|fr.phased.json
  - [ ] Enable prefetch of next-phase TTS during playback → Player optimization (once globally implemented)
  - [ ] QA in index.html: phase texts render, TTS plays, interactions flow → Open index.html?day=51

## Day 52 — Digital Marketing - Online Promotion
- Learning objective: Practice online promotion while understanding how digital marketing enables business growth and customer engagement.
- Slug: digital-marketing-online-promotion
- Files:
  - Normalized: data/digital-marketing-online-promotion_normalized.json
  - PhaseDNA: data/digital-marketing-online-promotion.en.phased.json, data/digital-marketing-online-promotion.es.phased.json, data/digital-marketing-online-promotion.fr.phased.json
  - TTS jobs: data/tts_jobs/digital-marketing-online-promotion.en.json, data/tts_jobs/digital-marketing-online-promotion.es.json, data/tts_jobs/digital-marketing-online-promotion.fr.json
- Subtasks:
  - [ ] Author normalized DNA source → data/digital-marketing-online-promotion_normalized.json
  - [ ] Generate PhaseDNA v1 (en + clone es/fr) → data/digital-marketing-online-promotion.en|es|fr.phased.json (cmd: node scripts/generate-phased-from-normalized.js --input data/digital-marketing-online-promotion_normalized.json --outbase data/digital-marketing-online-promotion --lang en --clone-es-fr)
  - [ ] Extract TTS jobs (per-phase narration) for en/es/fr → data/tts_jobs/digital-marketing-online-promotion.en|es|fr.json (cmd: node scripts/extract-tts-jobs.js --slugs digital-marketing-online-promotion --langs en,es,fr --in data --out data/tts_jobs)
  - [ ] Validate PhaseDNA shape and TTS jobs presence → npm run validate
  - [ ] Ensure day-to-slug resolver loads this lesson in index.html → Update getDNALessonData to include this day or general resolver
  - [ ] Attach minimal avatar cues/moods per phase (optional) → Edit phased JSON: phases[].avatar.cues
  - [ ] Quick review of es/fr clones for obvious issues → data/digital-marketing-online-promotion.es|fr.phased.json
  - [ ] Enable prefetch of next-phase TTS during playback → Player optimization (once globally implemented)
  - [ ] QA in index.html: phase texts render, TTS plays, interactions flow → Open index.html?day=52

## Day 53 — E-commerce - Digital Commerce
- Learning objective: Build online stores while understanding how e-commerce enables global trade and entrepreneurial opportunity.
- Slug: e-commerce-digital-commerce
- Files:
  - Normalized: data/e-commerce-digital-commerce_normalized.json
  - PhaseDNA: data/e-commerce-digital-commerce.en.phased.json, data/e-commerce-digital-commerce.es.phased.json, data/e-commerce-digital-commerce.fr.phased.json
  - TTS jobs: data/tts_jobs/e-commerce-digital-commerce.en.json, data/tts_jobs/e-commerce-digital-commerce.es.json, data/tts_jobs/e-commerce-digital-commerce.fr.json
- Subtasks:
  - [ ] Author normalized DNA source → data/e-commerce-digital-commerce_normalized.json
  - [ ] Generate PhaseDNA v1 (en + clone es/fr) → data/e-commerce-digital-commerce.en|es|fr.phased.json (cmd: node scripts/generate-phased-from-normalized.js --input data/e-commerce-digital-commerce_normalized.json --outbase data/e-commerce-digital-commerce --lang en --clone-es-fr)
  - [ ] Extract TTS jobs (per-phase narration) for en/es/fr → data/tts_jobs/e-commerce-digital-commerce.en|es|fr.json (cmd: node scripts/extract-tts-jobs.js --slugs e-commerce-digital-commerce --langs en,es,fr --in data --out data/tts_jobs)
  - [ ] Validate PhaseDNA shape and TTS jobs presence → npm run validate
  - [ ] Ensure day-to-slug resolver loads this lesson in index.html → Update getDNALessonData to include this day or general resolver
  - [ ] Attach minimal avatar cues/moods per phase (optional) → Edit phased JSON: phases[].avatar.cues
  - [ ] Quick review of es/fr clones for obvious issues → data/e-commerce-digital-commerce.es|fr.phased.json
  - [ ] Enable prefetch of next-phase TTS during playback → Player optimization (once globally implemented)
  - [ ] QA in index.html: phase texts render, TTS plays, interactions flow → Open index.html?day=53

## Day 54 — Digital Finance - Fintech Innovation
- Learning objective: Explore financial technology while understanding how digital finance enables banking, investing, and financial inclusion.
- Slug: digital-finance-fintech-innovation
- Files:
  - Normalized: data/digital-finance-fintech-innovation_normalized.json
  - PhaseDNA: data/digital-finance-fintech-innovation.en.phased.json, data/digital-finance-fintech-innovation.es.phased.json, data/digital-finance-fintech-innovation.fr.phased.json
  - TTS jobs: data/tts_jobs/digital-finance-fintech-innovation.en.json, data/tts_jobs/digital-finance-fintech-innovation.es.json, data/tts_jobs/digital-finance-fintech-innovation.fr.json
- Subtasks:
  - [ ] Author normalized DNA source → data/digital-finance-fintech-innovation_normalized.json
  - [ ] Generate PhaseDNA v1 (en + clone es/fr) → data/digital-finance-fintech-innovation.en|es|fr.phased.json (cmd: node scripts/generate-phased-from-normalized.js --input data/digital-finance-fintech-innovation_normalized.json --outbase data/digital-finance-fintech-innovation --lang en --clone-es-fr)
  - [ ] Extract TTS jobs (per-phase narration) for en/es/fr → data/tts_jobs/digital-finance-fintech-innovation.en|es|fr.json (cmd: node scripts/extract-tts-jobs.js --slugs digital-finance-fintech-innovation --langs en,es,fr --in data --out data/tts_jobs)
  - [ ] Validate PhaseDNA shape and TTS jobs presence → npm run validate
  - [ ] Ensure day-to-slug resolver loads this lesson in index.html → Update getDNALessonData to include this day or general resolver
  - [ ] Attach minimal avatar cues/moods per phase (optional) → Edit phased JSON: phases[].avatar.cues
  - [ ] Quick review of es/fr clones for obvious issues → data/digital-finance-fintech-innovation.es|fr.phased.json
  - [ ] Enable prefetch of next-phase TTS during playback → Player optimization (once globally implemented)
  - [ ] QA in index.html: phase texts render, TTS plays, interactions flow → Open index.html?day=54

## Day 55 — Digital Health - Telemedicine
- Learning objective: Practice remote healthcare while understanding how digital health enables medical access and health monitoring.
- Slug: digital-health-telemedicine
- Files:
  - Normalized: data/digital-health-telemedicine_normalized.json
  - PhaseDNA: data/digital-health-telemedicine.en.phased.json, data/digital-health-telemedicine.es.phased.json, data/digital-health-telemedicine.fr.phased.json
  - TTS jobs: data/tts_jobs/digital-health-telemedicine.en.json, data/tts_jobs/digital-health-telemedicine.es.json, data/tts_jobs/digital-health-telemedicine.fr.json
- Subtasks:
  - [ ] Author normalized DNA source → data/digital-health-telemedicine_normalized.json
  - [ ] Generate PhaseDNA v1 (en + clone es/fr) → data/digital-health-telemedicine.en|es|fr.phased.json (cmd: node scripts/generate-phased-from-normalized.js --input data/digital-health-telemedicine_normalized.json --outbase data/digital-health-telemedicine --lang en --clone-es-fr)
  - [ ] Extract TTS jobs (per-phase narration) for en/es/fr → data/tts_jobs/digital-health-telemedicine.en|es|fr.json (cmd: node scripts/extract-tts-jobs.js --slugs digital-health-telemedicine --langs en,es,fr --in data --out data/tts_jobs)
  - [ ] Validate PhaseDNA shape and TTS jobs presence → npm run validate
  - [ ] Ensure day-to-slug resolver loads this lesson in index.html → Update getDNALessonData to include this day or general resolver
  - [ ] Attach minimal avatar cues/moods per phase (optional) → Edit phased JSON: phases[].avatar.cues
  - [ ] Quick review of es/fr clones for obvious issues → data/digital-health-telemedicine.es|fr.phased.json
  - [ ] Enable prefetch of next-phase TTS during playback → Player optimization (once globally implemented)
  - [ ] QA in index.html: phase texts render, TTS plays, interactions flow → Open index.html?day=55

## Day 56 — Digital Education - Online Learning
- Learning objective: Design learning experiences while understanding how digital education enables global access to knowledge and skills.
- Slug: digital-education-online-learning
- Files:
  - Normalized: data/digital-education-online-learning_normalized.json
  - PhaseDNA: data/digital-education-online-learning.en.phased.json, data/digital-education-online-learning.es.phased.json, data/digital-education-online-learning.fr.phased.json
  - TTS jobs: data/tts_jobs/digital-education-online-learning.en.json, data/tts_jobs/digital-education-online-learning.es.json, data/tts_jobs/digital-education-online-learning.fr.json
- Subtasks:
  - [ ] Author normalized DNA source → data/digital-education-online-learning_normalized.json
  - [ ] Generate PhaseDNA v1 (en + clone es/fr) → data/digital-education-online-learning.en|es|fr.phased.json (cmd: node scripts/generate-phased-from-normalized.js --input data/digital-education-online-learning_normalized.json --outbase data/digital-education-online-learning --lang en --clone-es-fr)
  - [ ] Extract TTS jobs (per-phase narration) for en/es/fr → data/tts_jobs/digital-education-online-learning.en|es|fr.json (cmd: node scripts/extract-tts-jobs.js --slugs digital-education-online-learning --langs en,es,fr --in data --out data/tts_jobs)
  - [ ] Validate PhaseDNA shape and TTS jobs presence → npm run validate
  - [ ] Ensure day-to-slug resolver loads this lesson in index.html → Update getDNALessonData to include this day or general resolver
  - [ ] Attach minimal avatar cues/moods per phase (optional) → Edit phased JSON: phases[].avatar.cues
  - [ ] Quick review of es/fr clones for obvious issues → data/digital-education-online-learning.es|fr.phased.json
  - [ ] Enable prefetch of next-phase TTS during playback → Player optimization (once globally implemented)
  - [ ] QA in index.html: phase texts render, TTS plays, interactions flow → Open index.html?day=56

## Day 57 — Digital Government - E-Governance
- Learning objective: Practice digital democracy while understanding how e-government enables citizen services and transparency.
- Slug: digital-government-e-governance
- Files:
  - Normalized: data/digital-government-e-governance_normalized.json
  - PhaseDNA: data/digital-government-e-governance.en.phased.json, data/digital-government-e-governance.es.phased.json, data/digital-government-e-governance.fr.phased.json
  - TTS jobs: data/tts_jobs/digital-government-e-governance.en.json, data/tts_jobs/digital-government-e-governance.es.json, data/tts_jobs/digital-government-e-governance.fr.json
- Subtasks:
  - [ ] Author normalized DNA source → data/digital-government-e-governance_normalized.json
  - [ ] Generate PhaseDNA v1 (en + clone es/fr) → data/digital-government-e-governance.en|es|fr.phased.json (cmd: node scripts/generate-phased-from-normalized.js --input data/digital-government-e-governance_normalized.json --outbase data/digital-government-e-governance --lang en --clone-es-fr)
  - [ ] Extract TTS jobs (per-phase narration) for en/es/fr → data/tts_jobs/digital-government-e-governance.en|es|fr.json (cmd: node scripts/extract-tts-jobs.js --slugs digital-government-e-governance --langs en,es,fr --in data --out data/tts_jobs)
  - [ ] Validate PhaseDNA shape and TTS jobs presence → npm run validate
  - [ ] Ensure day-to-slug resolver loads this lesson in index.html → Update getDNALessonData to include this day or general resolver
  - [ ] Attach minimal avatar cues/moods per phase (optional) → Edit phased JSON: phases[].avatar.cues
  - [ ] Quick review of es/fr clones for obvious issues → data/digital-government-e-governance.es|fr.phased.json
  - [ ] Enable prefetch of next-phase TTS during playback → Player optimization (once globally implemented)
  - [ ] QA in index.html: phase texts render, TTS plays, interactions flow → Open index.html?day=57

## Day 58 — Digital Rights - Online Privacy
- Learning objective: Protect digital privacy while understanding how digital rights enable individual autonomy and democratic participation.
- Slug: digital-rights-online-privacy
- Files:
  - Normalized: data/digital-rights-online-privacy_normalized.json
  - PhaseDNA: data/digital-rights-online-privacy.en.phased.json, data/digital-rights-online-privacy.es.phased.json, data/digital-rights-online-privacy.fr.phased.json
  - TTS jobs: data/tts_jobs/digital-rights-online-privacy.en.json, data/tts_jobs/digital-rights-online-privacy.es.json, data/tts_jobs/digital-rights-online-privacy.fr.json
- Subtasks:
  - [ ] Author normalized DNA source → data/digital-rights-online-privacy_normalized.json
  - [ ] Generate PhaseDNA v1 (en + clone es/fr) → data/digital-rights-online-privacy.en|es|fr.phased.json (cmd: node scripts/generate-phased-from-normalized.js --input data/digital-rights-online-privacy_normalized.json --outbase data/digital-rights-online-privacy --lang en --clone-es-fr)
  - [ ] Extract TTS jobs (per-phase narration) for en/es/fr → data/tts_jobs/digital-rights-online-privacy.en|es|fr.json (cmd: node scripts/extract-tts-jobs.js --slugs digital-rights-online-privacy --langs en,es,fr --in data --out data/tts_jobs)
  - [ ] Validate PhaseDNA shape and TTS jobs presence → npm run validate
  - [ ] Ensure day-to-slug resolver loads this lesson in index.html → Update getDNALessonData to include this day or general resolver
  - [ ] Attach minimal avatar cues/moods per phase (optional) → Edit phased JSON: phases[].avatar.cues
  - [ ] Quick review of es/fr clones for obvious issues → data/digital-rights-online-privacy.es|fr.phased.json
  - [ ] Enable prefetch of next-phase TTS during playback → Player optimization (once globally implemented)
  - [ ] QA in index.html: phase texts render, TTS plays, interactions flow → Open index.html?day=58

## Day 59 — Digital Ethics - Responsible Technology
- Learning objective: Practice ethical technology while understanding how digital ethics ensures technology serves human welfare and social justice.
- Slug: digital-ethics-responsible-technology
- Files:
  - Normalized: data/digital-ethics-responsible-technology_normalized.json
  - PhaseDNA: data/digital-ethics-responsible-technology.en.phased.json, data/digital-ethics-responsible-technology.es.phased.json, data/digital-ethics-responsible-technology.fr.phased.json
  - TTS jobs: data/tts_jobs/digital-ethics-responsible-technology.en.json, data/tts_jobs/digital-ethics-responsible-technology.es.json, data/tts_jobs/digital-ethics-responsible-technology.fr.json
- Subtasks:
  - [ ] Author normalized DNA source → data/digital-ethics-responsible-technology_normalized.json
  - [ ] Generate PhaseDNA v1 (en + clone es/fr) → data/digital-ethics-responsible-technology.en|es|fr.phased.json (cmd: node scripts/generate-phased-from-normalized.js --input data/digital-ethics-responsible-technology_normalized.json --outbase data/digital-ethics-responsible-technology --lang en --clone-es-fr)
  - [ ] Extract TTS jobs (per-phase narration) for en/es/fr → data/tts_jobs/digital-ethics-responsible-technology.en|es|fr.json (cmd: node scripts/extract-tts-jobs.js --slugs digital-ethics-responsible-technology --langs en,es,fr --in data --out data/tts_jobs)
  - [ ] Validate PhaseDNA shape and TTS jobs presence → npm run validate
  - [ ] Ensure day-to-slug resolver loads this lesson in index.html → Update getDNALessonData to include this day or general resolver
  - [ ] Attach minimal avatar cues/moods per phase (optional) → Edit phased JSON: phases[].avatar.cues
  - [ ] Quick review of es/fr clones for obvious issues → data/digital-ethics-responsible-technology.es|fr.phased.json
  - [ ] Enable prefetch of next-phase TTS during playback → Player optimization (once globally implemented)
  - [ ] QA in index.html: phase texts render, TTS plays, interactions flow → Open index.html?day=59

## Day 60 — Environmental Science - Earth Systems
- Learning objective: Understand environmental processes while exploring how environmental science informs conservation and sustainable development.
- Slug: environmental-science-earth-systems
- Files:
  - Normalized: data/environmental-science-earth-systems_normalized.json
  - PhaseDNA: data/environmental-science-earth-systems.en.phased.json, data/environmental-science-earth-systems.es.phased.json, data/environmental-science-earth-systems.fr.phased.json
  - TTS jobs: data/tts_jobs/environmental-science-earth-systems.en.json, data/tts_jobs/environmental-science-earth-systems.es.json, data/tts_jobs/environmental-science-earth-systems.fr.json
- Subtasks:
  - [ ] Author normalized DNA source → data/environmental-science-earth-systems_normalized.json
  - [ ] Generate PhaseDNA v1 (en + clone es/fr) → data/environmental-science-earth-systems.en|es|fr.phased.json (cmd: node scripts/generate-phased-from-normalized.js --input data/environmental-science-earth-systems_normalized.json --outbase data/environmental-science-earth-systems --lang en --clone-es-fr)
  - [ ] Extract TTS jobs (per-phase narration) for en/es/fr → data/tts_jobs/environmental-science-earth-systems.en|es|fr.json (cmd: node scripts/extract-tts-jobs.js --slugs environmental-science-earth-systems --langs en,es,fr --in data --out data/tts_jobs)
  - [ ] Validate PhaseDNA shape and TTS jobs presence → npm run validate
  - [ ] Ensure day-to-slug resolver loads this lesson in index.html → Update getDNALessonData to include this day or general resolver
  - [ ] Attach minimal avatar cues/moods per phase (optional) → Edit phased JSON: phases[].avatar.cues
  - [ ] Quick review of es/fr clones for obvious issues → data/environmental-science-earth-systems.es|fr.phased.json
  - [ ] Enable prefetch of next-phase TTS during playback → Player optimization (once globally implemented)
  - [ ] QA in index.html: phase texts render, TTS plays, interactions flow → Open index.html?day=60

## Day 61 — Climate Science - Global Change
- Learning objective: Analyze climate patterns while understanding how climate science informs policy, adaptation, and mitigation strategies.
- Slug: climate-science-global-change
- Files:
  - Normalized: data/climate-science-global-change_normalized.json
  - PhaseDNA: data/climate-science-global-change.en.phased.json, data/climate-science-global-change.es.phased.json, data/climate-science-global-change.fr.phased.json
  - TTS jobs: data/tts_jobs/climate-science-global-change.en.json, data/tts_jobs/climate-science-global-change.es.json, data/tts_jobs/climate-science-global-change.fr.json
- Subtasks:
  - [ ] Author normalized DNA source → data/climate-science-global-change_normalized.json
  - [ ] Generate PhaseDNA v1 (en + clone es/fr) → data/climate-science-global-change.en|es|fr.phased.json (cmd: node scripts/generate-phased-from-normalized.js --input data/climate-science-global-change_normalized.json --outbase data/climate-science-global-change --lang en --clone-es-fr)
  - [ ] Extract TTS jobs (per-phase narration) for en/es/fr → data/tts_jobs/climate-science-global-change.en|es|fr.json (cmd: node scripts/extract-tts-jobs.js --slugs climate-science-global-change --langs en,es,fr --in data --out data/tts_jobs)
  - [ ] Validate PhaseDNA shape and TTS jobs presence → npm run validate
  - [ ] Ensure day-to-slug resolver loads this lesson in index.html → Update getDNALessonData to include this day or general resolver
  - [ ] Attach minimal avatar cues/moods per phase (optional) → Edit phased JSON: phases[].avatar.cues
  - [ ] Quick review of es/fr clones for obvious issues → data/climate-science-global-change.es|fr.phased.json
  - [ ] Enable prefetch of next-phase TTS during playback → Player optimization (once globally implemented)
  - [ ] QA in index.html: phase texts render, TTS plays, interactions flow → Open index.html?day=61

## Day 62 — Sustainability - Long-term Thinking
- Learning objective: Practice sustainable design while understanding how sustainability principles enable environmental protection and social equity.
- Slug: sustainability-long-term-thinking
- Files:
  - Normalized: data/sustainability-long-term-thinking_normalized.json
  - PhaseDNA: data/sustainability-long-term-thinking.en.phased.json, data/sustainability-long-term-thinking.es.phased.json, data/sustainability-long-term-thinking.fr.phased.json
  - TTS jobs: data/tts_jobs/sustainability-long-term-thinking.en.json, data/tts_jobs/sustainability-long-term-thinking.es.json, data/tts_jobs/sustainability-long-term-thinking.fr.json
- Subtasks:
  - [ ] Author normalized DNA source → data/sustainability-long-term-thinking_normalized.json
  - [ ] Generate PhaseDNA v1 (en + clone es/fr) → data/sustainability-long-term-thinking.en|es|fr.phased.json (cmd: node scripts/generate-phased-from-normalized.js --input data/sustainability-long-term-thinking_normalized.json --outbase data/sustainability-long-term-thinking --lang en --clone-es-fr)
  - [ ] Extract TTS jobs (per-phase narration) for en/es/fr → data/tts_jobs/sustainability-long-term-thinking.en|es|fr.json (cmd: node scripts/extract-tts-jobs.js --slugs sustainability-long-term-thinking --langs en,es,fr --in data --out data/tts_jobs)
  - [ ] Validate PhaseDNA shape and TTS jobs presence → npm run validate
  - [ ] Ensure day-to-slug resolver loads this lesson in index.html → Update getDNALessonData to include this day or general resolver
  - [ ] Attach minimal avatar cues/moods per phase (optional) → Edit phased JSON: phases[].avatar.cues
  - [ ] Quick review of es/fr clones for obvious issues → data/sustainability-long-term-thinking.es|fr.phased.json
  - [ ] Enable prefetch of next-phase TTS during playback → Player optimization (once globally implemented)
  - [ ] QA in index.html: phase texts render, TTS plays, interactions flow → Open index.html?day=62

## Day 63 — Renewable Energy - Clean Power
- Learning objective: Explore energy alternatives while understanding how renewable energy enables climate mitigation and energy independence.
- Slug: renewable-energy-clean-power
- Files:
  - Normalized: data/renewable-energy-clean-power_normalized.json
  - PhaseDNA: data/renewable-energy-clean-power.en.phased.json, data/renewable-energy-clean-power.es.phased.json, data/renewable-energy-clean-power.fr.phased.json
  - TTS jobs: data/tts_jobs/renewable-energy-clean-power.en.json, data/tts_jobs/renewable-energy-clean-power.es.json, data/tts_jobs/renewable-energy-clean-power.fr.json
- Subtasks:
  - [ ] Author normalized DNA source → data/renewable-energy-clean-power_normalized.json
  - [ ] Generate PhaseDNA v1 (en + clone es/fr) → data/renewable-energy-clean-power.en|es|fr.phased.json (cmd: node scripts/generate-phased-from-normalized.js --input data/renewable-energy-clean-power_normalized.json --outbase data/renewable-energy-clean-power --lang en --clone-es-fr)
  - [ ] Extract TTS jobs (per-phase narration) for en/es/fr → data/tts_jobs/renewable-energy-clean-power.en|es|fr.json (cmd: node scripts/extract-tts-jobs.js --slugs renewable-energy-clean-power --langs en,es,fr --in data --out data/tts_jobs)
  - [ ] Validate PhaseDNA shape and TTS jobs presence → npm run validate
  - [ ] Ensure day-to-slug resolver loads this lesson in index.html → Update getDNALessonData to include this day or general resolver
  - [ ] Attach minimal avatar cues/moods per phase (optional) → Edit phased JSON: phases[].avatar.cues
  - [ ] Quick review of es/fr clones for obvious issues → data/renewable-energy-clean-power.es|fr.phased.json
  - [ ] Enable prefetch of next-phase TTS during playback → Player optimization (once globally implemented)
  - [ ] QA in index.html: phase texts render, TTS plays, interactions flow → Open index.html?day=63

## Day 64 — Green Technology - Eco-Innovation
- Learning objective: Design environmental solutions while understanding how green technology enables sustainable development and circular economy.
- Slug: green-technology-eco-innovation
- Files:
  - Normalized: data/green-technology-eco-innovation_normalized.json
  - PhaseDNA: data/green-technology-eco-innovation.en.phased.json, data/green-technology-eco-innovation.es.phased.json, data/green-technology-eco-innovation.fr.phased.json
  - TTS jobs: data/tts_jobs/green-technology-eco-innovation.en.json, data/tts_jobs/green-technology-eco-innovation.es.json, data/tts_jobs/green-technology-eco-innovation.fr.json
- Subtasks:
  - [ ] Author normalized DNA source → data/green-technology-eco-innovation_normalized.json
  - [ ] Generate PhaseDNA v1 (en + clone es/fr) → data/green-technology-eco-innovation.en|es|fr.phased.json (cmd: node scripts/generate-phased-from-normalized.js --input data/green-technology-eco-innovation_normalized.json --outbase data/green-technology-eco-innovation --lang en --clone-es-fr)
  - [ ] Extract TTS jobs (per-phase narration) for en/es/fr → data/tts_jobs/green-technology-eco-innovation.en|es|fr.json (cmd: node scripts/extract-tts-jobs.js --slugs green-technology-eco-innovation --langs en,es,fr --in data --out data/tts_jobs)
  - [ ] Validate PhaseDNA shape and TTS jobs presence → npm run validate
  - [ ] Ensure day-to-slug resolver loads this lesson in index.html → Update getDNALessonData to include this day or general resolver
  - [ ] Attach minimal avatar cues/moods per phase (optional) → Edit phased JSON: phases[].avatar.cues
  - [ ] Quick review of es/fr clones for obvious issues → data/green-technology-eco-innovation.es|fr.phased.json
  - [ ] Enable prefetch of next-phase TTS during playback → Player optimization (once globally implemented)
  - [ ] QA in index.html: phase texts render, TTS plays, interactions flow → Open index.html?day=64

## Day 65 — Conservation Biology - Biodiversity Protection
- Learning objective: Protect species diversity while understanding how conservation biology enables ecosystem health and human welfare.
- Slug: conservation-biology-biodiversity-protection
- Files:
  - Normalized: data/conservation-biology-biodiversity-protection_normalized.json
  - PhaseDNA: data/conservation-biology-biodiversity-protection.en.phased.json, data/conservation-biology-biodiversity-protection.es.phased.json, data/conservation-biology-biodiversity-protection.fr.phased.json
  - TTS jobs: data/tts_jobs/conservation-biology-biodiversity-protection.en.json, data/tts_jobs/conservation-biology-biodiversity-protection.es.json, data/tts_jobs/conservation-biology-biodiversity-protection.fr.json
- Subtasks:
  - [ ] Author normalized DNA source → data/conservation-biology-biodiversity-protection_normalized.json
  - [ ] Generate PhaseDNA v1 (en + clone es/fr) → data/conservation-biology-biodiversity-protection.en|es|fr.phased.json (cmd: node scripts/generate-phased-from-normalized.js --input data/conservation-biology-biodiversity-protection_normalized.json --outbase data/conservation-biology-biodiversity-protection --lang en --clone-es-fr)
  - [ ] Extract TTS jobs (per-phase narration) for en/es/fr → data/tts_jobs/conservation-biology-biodiversity-protection.en|es|fr.json (cmd: node scripts/extract-tts-jobs.js --slugs conservation-biology-biodiversity-protection --langs en,es,fr --in data --out data/tts_jobs)
  - [ ] Validate PhaseDNA shape and TTS jobs presence → npm run validate
  - [ ] Ensure day-to-slug resolver loads this lesson in index.html → Update getDNALessonData to include this day or general resolver
  - [ ] Attach minimal avatar cues/moods per phase (optional) → Edit phased JSON: phases[].avatar.cues
  - [ ] Quick review of es/fr clones for obvious issues → data/conservation-biology-biodiversity-protection.es|fr.phased.json
  - [ ] Enable prefetch of next-phase TTS during playback → Player optimization (once globally implemented)
  - [ ] QA in index.html: phase texts render, TTS plays, interactions flow → Open index.html?day=65

## Day 66 — Wildlife Biology - Animal Conservation
- Learning objective: Study wild animals while understanding how wildlife biology informs conservation, tourism, and ecosystem management.
- Slug: wildlife-biology-animal-conservation
- Files:
  - Normalized: data/wildlife-biology-animal-conservation_normalized.json
  - PhaseDNA: data/wildlife-biology-animal-conservation.en.phased.json, data/wildlife-biology-animal-conservation.es.phased.json, data/wildlife-biology-animal-conservation.fr.phased.json
  - TTS jobs: data/tts_jobs/wildlife-biology-animal-conservation.en.json, data/tts_jobs/wildlife-biology-animal-conservation.es.json, data/tts_jobs/wildlife-biology-animal-conservation.fr.json
- Subtasks:
  - [ ] Author normalized DNA source → data/wildlife-biology-animal-conservation_normalized.json
  - [ ] Generate PhaseDNA v1 (en + clone es/fr) → data/wildlife-biology-animal-conservation.en|es|fr.phased.json (cmd: node scripts/generate-phased-from-normalized.js --input data/wildlife-biology-animal-conservation_normalized.json --outbase data/wildlife-biology-animal-conservation --lang en --clone-es-fr)
  - [ ] Extract TTS jobs (per-phase narration) for en/es/fr → data/tts_jobs/wildlife-biology-animal-conservation.en|es|fr.json (cmd: node scripts/extract-tts-jobs.js --slugs wildlife-biology-animal-conservation --langs en,es,fr --in data --out data/tts_jobs)
  - [ ] Validate PhaseDNA shape and TTS jobs presence → npm run validate
  - [ ] Ensure day-to-slug resolver loads this lesson in index.html → Update getDNALessonData to include this day or general resolver
  - [ ] Attach minimal avatar cues/moods per phase (optional) → Edit phased JSON: phases[].avatar.cues
  - [ ] Quick review of es/fr clones for obvious issues → data/wildlife-biology-animal-conservation.es|fr.phased.json
  - [ ] Enable prefetch of next-phase TTS during playback → Player optimization (once globally implemented)
  - [ ] QA in index.html: phase texts render, TTS plays, interactions flow → Open index.html?day=66

## Day 67 — Marine Biology - Ocean Life
- Learning objective: Explore marine ecosystems while understanding how marine biology informs fisheries management and ocean conservation.
- Slug: marine-biology-ocean-life
- Files:
  - Normalized: data/marine-biology-ocean-life_normalized.json
  - PhaseDNA: data/marine-biology-ocean-life.en.phased.json, data/marine-biology-ocean-life.es.phased.json, data/marine-biology-ocean-life.fr.phased.json
  - TTS jobs: data/tts_jobs/marine-biology-ocean-life.en.json, data/tts_jobs/marine-biology-ocean-life.es.json, data/tts_jobs/marine-biology-ocean-life.fr.json
- Subtasks:
  - [ ] Author normalized DNA source → data/marine-biology-ocean-life_normalized.json
  - [ ] Generate PhaseDNA v1 (en + clone es/fr) → data/marine-biology-ocean-life.en|es|fr.phased.json (cmd: node scripts/generate-phased-from-normalized.js --input data/marine-biology-ocean-life_normalized.json --outbase data/marine-biology-ocean-life --lang en --clone-es-fr)
  - [ ] Extract TTS jobs (per-phase narration) for en/es/fr → data/tts_jobs/marine-biology-ocean-life.en|es|fr.json (cmd: node scripts/extract-tts-jobs.js --slugs marine-biology-ocean-life --langs en,es,fr --in data --out data/tts_jobs)
  - [ ] Validate PhaseDNA shape and TTS jobs presence → npm run validate
  - [ ] Ensure day-to-slug resolver loads this lesson in index.html → Update getDNALessonData to include this day or general resolver
  - [ ] Attach minimal avatar cues/moods per phase (optional) → Edit phased JSON: phases[].avatar.cues
  - [ ] Quick review of es/fr clones for obvious issues → data/marine-biology-ocean-life.es|fr.phased.json
  - [ ] Enable prefetch of next-phase TTS during playback → Player optimization (once globally implemented)
  - [ ] QA in index.html: phase texts render, TTS plays, interactions flow → Open index.html?day=67

## Day 68 — Forest Ecology - Woodland Systems
- Learning objective: Study forest ecosystems while understanding how forest ecology informs timber management and carbon sequestration.
- Slug: forest-ecology-woodland-systems
- Files:
  - Normalized: data/forest-ecology-woodland-systems_normalized.json
  - PhaseDNA: data/forest-ecology-woodland-systems.en.phased.json, data/forest-ecology-woodland-systems.es.phased.json, data/forest-ecology-woodland-systems.fr.phased.json
  - TTS jobs: data/tts_jobs/forest-ecology-woodland-systems.en.json, data/tts_jobs/forest-ecology-woodland-systems.es.json, data/tts_jobs/forest-ecology-woodland-systems.fr.json
- Subtasks:
  - [ ] Author normalized DNA source → data/forest-ecology-woodland-systems_normalized.json
  - [ ] Generate PhaseDNA v1 (en + clone es/fr) → data/forest-ecology-woodland-systems.en|es|fr.phased.json (cmd: node scripts/generate-phased-from-normalized.js --input data/forest-ecology-woodland-systems_normalized.json --outbase data/forest-ecology-woodland-systems --lang en --clone-es-fr)
  - [ ] Extract TTS jobs (per-phase narration) for en/es/fr → data/tts_jobs/forest-ecology-woodland-systems.en|es|fr.json (cmd: node scripts/extract-tts-jobs.js --slugs forest-ecology-woodland-systems --langs en,es,fr --in data --out data/tts_jobs)
  - [ ] Validate PhaseDNA shape and TTS jobs presence → npm run validate
  - [ ] Ensure day-to-slug resolver loads this lesson in index.html → Update getDNALessonData to include this day or general resolver
  - [ ] Attach minimal avatar cues/moods per phase (optional) → Edit phased JSON: phases[].avatar.cues
  - [ ] Quick review of es/fr clones for obvious issues → data/forest-ecology-woodland-systems.es|fr.phased.json
  - [ ] Enable prefetch of next-phase TTS during playback → Player optimization (once globally implemented)
  - [ ] QA in index.html: phase texts render, TTS plays, interactions flow → Open index.html?day=68

## Day 69 — Wetland Ecology - Water Systems
- Learning objective: Explore wetland ecosystems while understanding how wetland ecology informs water quality and flood control.
- Slug: wetland-ecology-water-systems
- Files:
  - Normalized: data/wetland-ecology-water-systems_normalized.json
  - PhaseDNA: data/wetland-ecology-water-systems.en.phased.json, data/wetland-ecology-water-systems.es.phased.json, data/wetland-ecology-water-systems.fr.phased.json
  - TTS jobs: data/tts_jobs/wetland-ecology-water-systems.en.json, data/tts_jobs/wetland-ecology-water-systems.es.json, data/tts_jobs/wetland-ecology-water-systems.fr.json
- Subtasks:
  - [ ] Author normalized DNA source → data/wetland-ecology-water-systems_normalized.json
  - [ ] Generate PhaseDNA v1 (en + clone es/fr) → data/wetland-ecology-water-systems.en|es|fr.phased.json (cmd: node scripts/generate-phased-from-normalized.js --input data/wetland-ecology-water-systems_normalized.json --outbase data/wetland-ecology-water-systems --lang en --clone-es-fr)
  - [ ] Extract TTS jobs (per-phase narration) for en/es/fr → data/tts_jobs/wetland-ecology-water-systems.en|es|fr.json (cmd: node scripts/extract-tts-jobs.js --slugs wetland-ecology-water-systems --langs en,es,fr --in data --out data/tts_jobs)
  - [ ] Validate PhaseDNA shape and TTS jobs presence → npm run validate
  - [ ] Ensure day-to-slug resolver loads this lesson in index.html → Update getDNALessonData to include this day or general resolver
  - [ ] Attach minimal avatar cues/moods per phase (optional) → Edit phased JSON: phases[].avatar.cues
  - [ ] Quick review of es/fr clones for obvious issues → data/wetland-ecology-water-systems.es|fr.phased.json
  - [ ] Enable prefetch of next-phase TTS during playback → Player optimization (once globally implemented)
  - [ ] QA in index.html: phase texts render, TTS plays, interactions flow → Open index.html?day=69

## Day 70 — Desert Ecology - Arid Systems
- Learning objective: Study desert ecosystems while understanding how desert ecology informs adaptation and resource management.
- Slug: desert-ecology-arid-systems
- Files:
  - Normalized: data/desert-ecology-arid-systems_normalized.json
  - PhaseDNA: data/desert-ecology-arid-systems.en.phased.json, data/desert-ecology-arid-systems.es.phased.json, data/desert-ecology-arid-systems.fr.phased.json
  - TTS jobs: data/tts_jobs/desert-ecology-arid-systems.en.json, data/tts_jobs/desert-ecology-arid-systems.es.json, data/tts_jobs/desert-ecology-arid-systems.fr.json
- Subtasks:
  - [ ] Author normalized DNA source → data/desert-ecology-arid-systems_normalized.json
  - [ ] Generate PhaseDNA v1 (en + clone es/fr) → data/desert-ecology-arid-systems.en|es|fr.phased.json (cmd: node scripts/generate-phased-from-normalized.js --input data/desert-ecology-arid-systems_normalized.json --outbase data/desert-ecology-arid-systems --lang en --clone-es-fr)
  - [ ] Extract TTS jobs (per-phase narration) for en/es/fr → data/tts_jobs/desert-ecology-arid-systems.en|es|fr.json (cmd: node scripts/extract-tts-jobs.js --slugs desert-ecology-arid-systems --langs en,es,fr --in data --out data/tts_jobs)
  - [ ] Validate PhaseDNA shape and TTS jobs presence → npm run validate
  - [ ] Ensure day-to-slug resolver loads this lesson in index.html → Update getDNALessonData to include this day or general resolver
  - [ ] Attach minimal avatar cues/moods per phase (optional) → Edit phased JSON: phases[].avatar.cues
  - [ ] Quick review of es/fr clones for obvious issues → data/desert-ecology-arid-systems.es|fr.phased.json
  - [ ] Enable prefetch of next-phase TTS during playback → Player optimization (once globally implemented)
  - [ ] QA in index.html: phase texts render, TTS plays, interactions flow → Open index.html?day=70

## Day 71 — Tropical Ecology - Rainforest Systems
- Learning objective: Explore tropical ecosystems while understanding how tropical ecology informs biodiversity conservation and climate regulation.
- Slug: tropical-ecology-rainforest-systems
- Files:
  - Normalized: data/tropical-ecology-rainforest-systems_normalized.json
  - PhaseDNA: data/tropical-ecology-rainforest-systems.en.phased.json, data/tropical-ecology-rainforest-systems.es.phased.json, data/tropical-ecology-rainforest-systems.fr.phased.json
  - TTS jobs: data/tts_jobs/tropical-ecology-rainforest-systems.en.json, data/tts_jobs/tropical-ecology-rainforest-systems.es.json, data/tts_jobs/tropical-ecology-rainforest-systems.fr.json
- Subtasks:
  - [ ] Author normalized DNA source → data/tropical-ecology-rainforest-systems_normalized.json
  - [ ] Generate PhaseDNA v1 (en + clone es/fr) → data/tropical-ecology-rainforest-systems.en|es|fr.phased.json (cmd: node scripts/generate-phased-from-normalized.js --input data/tropical-ecology-rainforest-systems_normalized.json --outbase data/tropical-ecology-rainforest-systems --lang en --clone-es-fr)
  - [ ] Extract TTS jobs (per-phase narration) for en/es/fr → data/tts_jobs/tropical-ecology-rainforest-systems.en|es|fr.json (cmd: node scripts/extract-tts-jobs.js --slugs tropical-ecology-rainforest-systems --langs en,es,fr --in data --out data/tts_jobs)
  - [ ] Validate PhaseDNA shape and TTS jobs presence → npm run validate
  - [ ] Ensure day-to-slug resolver loads this lesson in index.html → Update getDNALessonData to include this day or general resolver
  - [ ] Attach minimal avatar cues/moods per phase (optional) → Edit phased JSON: phases[].avatar.cues
  - [ ] Quick review of es/fr clones for obvious issues → data/tropical-ecology-rainforest-systems.es|fr.phased.json
  - [ ] Enable prefetch of next-phase TTS during playback → Player optimization (once globally implemented)
  - [ ] QA in index.html: phase texts render, TTS plays, interactions flow → Open index.html?day=71

## Day 72 — Polar Ecology - Arctic Systems
- Learning objective: Study polar ecosystems while understanding how polar ecology informs climate science and indigenous knowledge.
- Slug: polar-ecology-arctic-systems
- Files:
  - Normalized: data/polar-ecology-arctic-systems_normalized.json
  - PhaseDNA: data/polar-ecology-arctic-systems.en.phased.json, data/polar-ecology-arctic-systems.es.phased.json, data/polar-ecology-arctic-systems.fr.phased.json
  - TTS jobs: data/tts_jobs/polar-ecology-arctic-systems.en.json, data/tts_jobs/polar-ecology-arctic-systems.es.json, data/tts_jobs/polar-ecology-arctic-systems.fr.json
- Subtasks:
  - [ ] Author normalized DNA source → data/polar-ecology-arctic-systems_normalized.json
  - [ ] Generate PhaseDNA v1 (en + clone es/fr) → data/polar-ecology-arctic-systems.en|es|fr.phased.json (cmd: node scripts/generate-phased-from-normalized.js --input data/polar-ecology-arctic-systems_normalized.json --outbase data/polar-ecology-arctic-systems --lang en --clone-es-fr)
  - [ ] Extract TTS jobs (per-phase narration) for en/es/fr → data/tts_jobs/polar-ecology-arctic-systems.en|es|fr.json (cmd: node scripts/extract-tts-jobs.js --slugs polar-ecology-arctic-systems --langs en,es,fr --in data --out data/tts_jobs)
  - [ ] Validate PhaseDNA shape and TTS jobs presence → npm run validate
  - [ ] Ensure day-to-slug resolver loads this lesson in index.html → Update getDNALessonData to include this day or general resolver
  - [ ] Attach minimal avatar cues/moods per phase (optional) → Edit phased JSON: phases[].avatar.cues
  - [ ] Quick review of es/fr clones for obvious issues → data/polar-ecology-arctic-systems.es|fr.phased.json
  - [ ] Enable prefetch of next-phase TTS during playback → Player optimization (once globally implemented)
  - [ ] QA in index.html: phase texts render, TTS plays, interactions flow → Open index.html?day=72

## Day 73 — Urban Ecology - City Systems
- Learning objective: Study urban ecosystems while understanding how urban ecology informs city planning and environmental justice.
- Slug: urban-ecology-city-systems
- Files:
  - Normalized: data/urban-ecology-city-systems_normalized.json
  - PhaseDNA: data/urban-ecology-city-systems.en.phased.json, data/urban-ecology-city-systems.es.phased.json, data/urban-ecology-city-systems.fr.phased.json
  - TTS jobs: data/tts_jobs/urban-ecology-city-systems.en.json, data/tts_jobs/urban-ecology-city-systems.es.json, data/tts_jobs/urban-ecology-city-systems.fr.json
- Subtasks:
  - [ ] Author normalized DNA source → data/urban-ecology-city-systems_normalized.json
  - [ ] Generate PhaseDNA v1 (en + clone es/fr) → data/urban-ecology-city-systems.en|es|fr.phased.json (cmd: node scripts/generate-phased-from-normalized.js --input data/urban-ecology-city-systems_normalized.json --outbase data/urban-ecology-city-systems --lang en --clone-es-fr)
  - [ ] Extract TTS jobs (per-phase narration) for en/es/fr → data/tts_jobs/urban-ecology-city-systems.en|es|fr.json (cmd: node scripts/extract-tts-jobs.js --slugs urban-ecology-city-systems --langs en,es,fr --in data --out data/tts_jobs)
  - [ ] Validate PhaseDNA shape and TTS jobs presence → npm run validate
  - [ ] Ensure day-to-slug resolver loads this lesson in index.html → Update getDNALessonData to include this day or general resolver
  - [ ] Attach minimal avatar cues/moods per phase (optional) → Edit phased JSON: phases[].avatar.cues
  - [ ] Quick review of es/fr clones for obvious issues → data/urban-ecology-city-systems.es|fr.phased.json
  - [ ] Enable prefetch of next-phase TTS during playback → Player optimization (once globally implemented)
  - [ ] QA in index.html: phase texts render, TTS plays, interactions flow → Open index.html?day=73

## Day 74 — Agricultural Ecology - Food Systems
- Learning objective: Study farming systems while understanding how agricultural ecology informs food security and environmental protection.
- Slug: agricultural-ecology-food-systems
- Files:
  - Normalized: data/agricultural-ecology-food-systems_normalized.json
  - PhaseDNA: data/agricultural-ecology-food-systems.en.phased.json, data/agricultural-ecology-food-systems.es.phased.json, data/agricultural-ecology-food-systems.fr.phased.json
  - TTS jobs: data/tts_jobs/agricultural-ecology-food-systems.en.json, data/tts_jobs/agricultural-ecology-food-systems.es.json, data/tts_jobs/agricultural-ecology-food-systems.fr.json
- Subtasks:
  - [ ] Author normalized DNA source → data/agricultural-ecology-food-systems_normalized.json
  - [ ] Generate PhaseDNA v1 (en + clone es/fr) → data/agricultural-ecology-food-systems.en|es|fr.phased.json (cmd: node scripts/generate-phased-from-normalized.js --input data/agricultural-ecology-food-systems_normalized.json --outbase data/agricultural-ecology-food-systems --lang en --clone-es-fr)
  - [ ] Extract TTS jobs (per-phase narration) for en/es/fr → data/tts_jobs/agricultural-ecology-food-systems.en|es|fr.json (cmd: node scripts/extract-tts-jobs.js --slugs agricultural-ecology-food-systems --langs en,es,fr --in data --out data/tts_jobs)
  - [ ] Validate PhaseDNA shape and TTS jobs presence → npm run validate
  - [ ] Ensure day-to-slug resolver loads this lesson in index.html → Update getDNALessonData to include this day or general resolver
  - [ ] Attach minimal avatar cues/moods per phase (optional) → Edit phased JSON: phases[].avatar.cues
  - [ ] Quick review of es/fr clones for obvious issues → data/agricultural-ecology-food-systems.es|fr.phased.json
  - [ ] Enable prefetch of next-phase TTS during playback → Player optimization (once globally implemented)
  - [ ] QA in index.html: phase texts render, TTS plays, interactions flow → Open index.html?day=74

## Day 75 — Restoration Ecology - Healing Nature
- Learning objective: Practice ecosystem restoration while understanding how restoration ecology enables environmental recovery and biodiversity.
- Slug: restoration-ecology-healing-nature
- Files:
  - Normalized: data/restoration-ecology-healing-nature_normalized.json
  - PhaseDNA: data/restoration-ecology-healing-nature.en.phased.json, data/restoration-ecology-healing-nature.es.phased.json, data/restoration-ecology-healing-nature.fr.phased.json
  - TTS jobs: data/tts_jobs/restoration-ecology-healing-nature.en.json, data/tts_jobs/restoration-ecology-healing-nature.es.json, data/tts_jobs/restoration-ecology-healing-nature.fr.json
- Subtasks:
  - [ ] Author normalized DNA source → data/restoration-ecology-healing-nature_normalized.json
  - [ ] Generate PhaseDNA v1 (en + clone es/fr) → data/restoration-ecology-healing-nature.en|es|fr.phased.json (cmd: node scripts/generate-phased-from-normalized.js --input data/restoration-ecology-healing-nature_normalized.json --outbase data/restoration-ecology-healing-nature --lang en --clone-es-fr)
  - [ ] Extract TTS jobs (per-phase narration) for en/es/fr → data/tts_jobs/restoration-ecology-healing-nature.en|es|fr.json (cmd: node scripts/extract-tts-jobs.js --slugs restoration-ecology-healing-nature --langs en,es,fr --in data --out data/tts_jobs)
  - [ ] Validate PhaseDNA shape and TTS jobs presence → npm run validate
  - [ ] Ensure day-to-slug resolver loads this lesson in index.html → Update getDNALessonData to include this day or general resolver
  - [ ] Attach minimal avatar cues/moods per phase (optional) → Edit phased JSON: phases[].avatar.cues
  - [ ] Quick review of es/fr clones for obvious issues → data/restoration-ecology-healing-nature.es|fr.phased.json
  - [ ] Enable prefetch of next-phase TTS during playback → Player optimization (once globally implemented)
  - [ ] QA in index.html: phase texts render, TTS plays, interactions flow → Open index.html?day=75

## Day 76 — Landscape Ecology - Spatial Patterns
- Learning objective: Analyze landscape patterns while understanding how landscape ecology informs land use planning and conservation.
- Slug: landscape-ecology-spatial-patterns
- Files:
  - Normalized: data/landscape-ecology-spatial-patterns_normalized.json
  - PhaseDNA: data/landscape-ecology-spatial-patterns.en.phased.json, data/landscape-ecology-spatial-patterns.es.phased.json, data/landscape-ecology-spatial-patterns.fr.phased.json
  - TTS jobs: data/tts_jobs/landscape-ecology-spatial-patterns.en.json, data/tts_jobs/landscape-ecology-spatial-patterns.es.json, data/tts_jobs/landscape-ecology-spatial-patterns.fr.json
- Subtasks:
  - [ ] Author normalized DNA source → data/landscape-ecology-spatial-patterns_normalized.json
  - [ ] Generate PhaseDNA v1 (en + clone es/fr) → data/landscape-ecology-spatial-patterns.en|es|fr.phased.json (cmd: node scripts/generate-phased-from-normalized.js --input data/landscape-ecology-spatial-patterns_normalized.json --outbase data/landscape-ecology-spatial-patterns --lang en --clone-es-fr)
  - [ ] Extract TTS jobs (per-phase narration) for en/es/fr → data/tts_jobs/landscape-ecology-spatial-patterns.en|es|fr.json (cmd: node scripts/extract-tts-jobs.js --slugs landscape-ecology-spatial-patterns --langs en,es,fr --in data --out data/tts_jobs)
  - [ ] Validate PhaseDNA shape and TTS jobs presence → npm run validate
  - [ ] Ensure day-to-slug resolver loads this lesson in index.html → Update getDNALessonData to include this day or general resolver
  - [ ] Attach minimal avatar cues/moods per phase (optional) → Edit phased JSON: phases[].avatar.cues
  - [ ] Quick review of es/fr clones for obvious issues → data/landscape-ecology-spatial-patterns.es|fr.phased.json
  - [ ] Enable prefetch of next-phase TTS during playback → Player optimization (once globally implemented)
  - [ ] QA in index.html: phase texts render, TTS plays, interactions flow → Open index.html?day=76

## Day 77 — Population Ecology - Species Dynamics
- Learning objective: Study population dynamics while understanding how population ecology informs wildlife management and conservation.
- Slug: population-ecology-species-dynamics
- Files:
  - Normalized: data/population-ecology-species-dynamics_normalized.json
  - PhaseDNA: data/population-ecology-species-dynamics.en.phased.json, data/population-ecology-species-dynamics.es.phased.json, data/population-ecology-species-dynamics.fr.phased.json
  - TTS jobs: data/tts_jobs/population-ecology-species-dynamics.en.json, data/tts_jobs/population-ecology-species-dynamics.es.json, data/tts_jobs/population-ecology-species-dynamics.fr.json
- Subtasks:
  - [ ] Author normalized DNA source → data/population-ecology-species-dynamics_normalized.json
  - [ ] Generate PhaseDNA v1 (en + clone es/fr) → data/population-ecology-species-dynamics.en|es|fr.phased.json (cmd: node scripts/generate-phased-from-normalized.js --input data/population-ecology-species-dynamics_normalized.json --outbase data/population-ecology-species-dynamics --lang en --clone-es-fr)
  - [ ] Extract TTS jobs (per-phase narration) for en/es/fr → data/tts_jobs/population-ecology-species-dynamics.en|es|fr.json (cmd: node scripts/extract-tts-jobs.js --slugs population-ecology-species-dynamics --langs en,es,fr --in data --out data/tts_jobs)
  - [ ] Validate PhaseDNA shape and TTS jobs presence → npm run validate
  - [ ] Ensure day-to-slug resolver loads this lesson in index.html → Update getDNALessonData to include this day or general resolver
  - [ ] Attach minimal avatar cues/moods per phase (optional) → Edit phased JSON: phases[].avatar.cues
  - [ ] Quick review of es/fr clones for obvious issues → data/population-ecology-species-dynamics.es|fr.phased.json
  - [ ] Enable prefetch of next-phase TTS during playback → Player optimization (once globally implemented)
  - [ ] QA in index.html: phase texts render, TTS plays, interactions flow → Open index.html?day=77

## Day 78 — Community Ecology - Species Interactions
- Learning objective: Study species relationships while understanding how community ecology informs ecosystem health and biodiversity.
- Slug: community-ecology-species-interactions
- Files:
  - Normalized: data/community-ecology-species-interactions_normalized.json
  - PhaseDNA: data/community-ecology-species-interactions.en.phased.json, data/community-ecology-species-interactions.es.phased.json, data/community-ecology-species-interactions.fr.phased.json
  - TTS jobs: data/tts_jobs/community-ecology-species-interactions.en.json, data/tts_jobs/community-ecology-species-interactions.es.json, data/tts_jobs/community-ecology-species-interactions.fr.json
- Subtasks:
  - [ ] Author normalized DNA source → data/community-ecology-species-interactions_normalized.json
  - [ ] Generate PhaseDNA v1 (en + clone es/fr) → data/community-ecology-species-interactions.en|es|fr.phased.json (cmd: node scripts/generate-phased-from-normalized.js --input data/community-ecology-species-interactions_normalized.json --outbase data/community-ecology-species-interactions --lang en --clone-es-fr)
  - [ ] Extract TTS jobs (per-phase narration) for en/es/fr → data/tts_jobs/community-ecology-species-interactions.en|es|fr.json (cmd: node scripts/extract-tts-jobs.js --slugs community-ecology-species-interactions --langs en,es,fr --in data --out data/tts_jobs)
  - [ ] Validate PhaseDNA shape and TTS jobs presence → npm run validate
  - [ ] Ensure day-to-slug resolver loads this lesson in index.html → Update getDNALessonData to include this day or general resolver
  - [ ] Attach minimal avatar cues/moods per phase (optional) → Edit phased JSON: phases[].avatar.cues
  - [ ] Quick review of es/fr clones for obvious issues → data/community-ecology-species-interactions.es|fr.phased.json
  - [ ] Enable prefetch of next-phase TTS during playback → Player optimization (once globally implemented)
  - [ ] QA in index.html: phase texts render, TTS plays, interactions flow → Open index.html?day=78

## Day 79 — Ecosystem Ecology - System Dynamics
- Learning objective: Study ecosystem processes while understanding how ecosystem ecology informs environmental management and sustainability.
- Slug: ecosystem-ecology-system-dynamics
- Files:
  - Normalized: data/ecosystem-ecology-system-dynamics_normalized.json
  - PhaseDNA: data/ecosystem-ecology-system-dynamics.en.phased.json, data/ecosystem-ecology-system-dynamics.es.phased.json, data/ecosystem-ecology-system-dynamics.fr.phased.json
  - TTS jobs: data/tts_jobs/ecosystem-ecology-system-dynamics.en.json, data/tts_jobs/ecosystem-ecology-system-dynamics.es.json, data/tts_jobs/ecosystem-ecology-system-dynamics.fr.json
- Subtasks:
  - [ ] Author normalized DNA source → data/ecosystem-ecology-system-dynamics_normalized.json
  - [ ] Generate PhaseDNA v1 (en + clone es/fr) → data/ecosystem-ecology-system-dynamics.en|es|fr.phased.json (cmd: node scripts/generate-phased-from-normalized.js --input data/ecosystem-ecology-system-dynamics_normalized.json --outbase data/ecosystem-ecology-system-dynamics --lang en --clone-es-fr)
  - [ ] Extract TTS jobs (per-phase narration) for en/es/fr → data/tts_jobs/ecosystem-ecology-system-dynamics.en|es|fr.json (cmd: node scripts/extract-tts-jobs.js --slugs ecosystem-ecology-system-dynamics --langs en,es,fr --in data --out data/tts_jobs)
  - [ ] Validate PhaseDNA shape and TTS jobs presence → npm run validate
  - [ ] Ensure day-to-slug resolver loads this lesson in index.html → Update getDNALessonData to include this day or general resolver
  - [ ] Attach minimal avatar cues/moods per phase (optional) → Edit phased JSON: phases[].avatar.cues
  - [ ] Quick review of es/fr clones for obvious issues → data/ecosystem-ecology-system-dynamics.es|fr.phased.json
  - [ ] Enable prefetch of next-phase TTS during playback → Player optimization (once globally implemented)
  - [ ] QA in index.html: phase texts render, TTS plays, interactions flow → Open index.html?day=79

## Day 80 — Global Ecology - Earth Systems
- Learning objective: Study global processes while understanding how global ecology informs climate science and environmental policy.
- Slug: global-ecology-earth-systems
- Files:
  - Normalized: data/global-ecology-earth-systems_normalized.json
  - PhaseDNA: data/global-ecology-earth-systems.en.phased.json, data/global-ecology-earth-systems.es.phased.json, data/global-ecology-earth-systems.fr.phased.json
  - TTS jobs: data/tts_jobs/global-ecology-earth-systems.en.json, data/tts_jobs/global-ecology-earth-systems.es.json, data/tts_jobs/global-ecology-earth-systems.fr.json
- Subtasks:
  - [ ] Author normalized DNA source → data/global-ecology-earth-systems_normalized.json
  - [ ] Generate PhaseDNA v1 (en + clone es/fr) → data/global-ecology-earth-systems.en|es|fr.phased.json (cmd: node scripts/generate-phased-from-normalized.js --input data/global-ecology-earth-systems_normalized.json --outbase data/global-ecology-earth-systems --lang en --clone-es-fr)
  - [ ] Extract TTS jobs (per-phase narration) for en/es/fr → data/tts_jobs/global-ecology-earth-systems.en|es|fr.json (cmd: node scripts/extract-tts-jobs.js --slugs global-ecology-earth-systems --langs en,es,fr --in data --out data/tts_jobs)
  - [ ] Validate PhaseDNA shape and TTS jobs presence → npm run validate
  - [ ] Ensure day-to-slug resolver loads this lesson in index.html → Update getDNALessonData to include this day or general resolver
  - [ ] Attach minimal avatar cues/moods per phase (optional) → Edit phased JSON: phases[].avatar.cues
  - [ ] Quick review of es/fr clones for obvious issues → data/global-ecology-earth-systems.es|fr.phased.json
  - [ ] Enable prefetch of next-phase TTS during playback → Player optimization (once globally implemented)
  - [ ] QA in index.html: phase texts render, TTS plays, interactions flow → Open index.html?day=80

## Day 81 — Behavioral Ecology - Animal Behavior
- Learning objective: Study animal behavior while understanding how behavioral ecology informs conservation and evolutionary biology.
- Slug: behavioral-ecology-animal-behavior
- Files:
  - Normalized: data/behavioral-ecology-animal-behavior_normalized.json
  - PhaseDNA: data/behavioral-ecology-animal-behavior.en.phased.json, data/behavioral-ecology-animal-behavior.es.phased.json, data/behavioral-ecology-animal-behavior.fr.phased.json
  - TTS jobs: data/tts_jobs/behavioral-ecology-animal-behavior.en.json, data/tts_jobs/behavioral-ecology-animal-behavior.es.json, data/tts_jobs/behavioral-ecology-animal-behavior.fr.json
- Subtasks:
  - [ ] Author normalized DNA source → data/behavioral-ecology-animal-behavior_normalized.json
  - [ ] Generate PhaseDNA v1 (en + clone es/fr) → data/behavioral-ecology-animal-behavior.en|es|fr.phased.json (cmd: node scripts/generate-phased-from-normalized.js --input data/behavioral-ecology-animal-behavior_normalized.json --outbase data/behavioral-ecology-animal-behavior --lang en --clone-es-fr)
  - [ ] Extract TTS jobs (per-phase narration) for en/es/fr → data/tts_jobs/behavioral-ecology-animal-behavior.en|es|fr.json (cmd: node scripts/extract-tts-jobs.js --slugs behavioral-ecology-animal-behavior --langs en,es,fr --in data --out data/tts_jobs)
  - [ ] Validate PhaseDNA shape and TTS jobs presence → npm run validate
  - [ ] Ensure day-to-slug resolver loads this lesson in index.html → Update getDNALessonData to include this day or general resolver
  - [ ] Attach minimal avatar cues/moods per phase (optional) → Edit phased JSON: phases[].avatar.cues
  - [ ] Quick review of es/fr clones for obvious issues → data/behavioral-ecology-animal-behavior.es|fr.phased.json
  - [ ] Enable prefetch of next-phase TTS during playback → Player optimization (once globally implemented)
  - [ ] QA in index.html: phase texts render, TTS plays, interactions flow → Open index.html?day=81

## Day 82 — Evolutionary Ecology - Adaptation
- Learning objective: Study evolutionary processes while understanding how evolutionary ecology informs conservation and medicine.
- Slug: evolutionary-ecology-adaptation
- Files:
  - Normalized: data/evolutionary-ecology-adaptation_normalized.json
  - PhaseDNA: data/evolutionary-ecology-adaptation.en.phased.json, data/evolutionary-ecology-adaptation.es.phased.json, data/evolutionary-ecology-adaptation.fr.phased.json
  - TTS jobs: data/tts_jobs/evolutionary-ecology-adaptation.en.json, data/tts_jobs/evolutionary-ecology-adaptation.es.json, data/tts_jobs/evolutionary-ecology-adaptation.fr.json
- Subtasks:
  - [ ] Author normalized DNA source → data/evolutionary-ecology-adaptation_normalized.json
  - [ ] Generate PhaseDNA v1 (en + clone es/fr) → data/evolutionary-ecology-adaptation.en|es|fr.phased.json (cmd: node scripts/generate-phased-from-normalized.js --input data/evolutionary-ecology-adaptation_normalized.json --outbase data/evolutionary-ecology-adaptation --lang en --clone-es-fr)
  - [ ] Extract TTS jobs (per-phase narration) for en/es/fr → data/tts_jobs/evolutionary-ecology-adaptation.en|es|fr.json (cmd: node scripts/extract-tts-jobs.js --slugs evolutionary-ecology-adaptation --langs en,es,fr --in data --out data/tts_jobs)
  - [ ] Validate PhaseDNA shape and TTS jobs presence → npm run validate
  - [ ] Ensure day-to-slug resolver loads this lesson in index.html → Update getDNALessonData to include this day or general resolver
  - [ ] Attach minimal avatar cues/moods per phase (optional) → Edit phased JSON: phases[].avatar.cues
  - [ ] Quick review of es/fr clones for obvious issues → data/evolutionary-ecology-adaptation.es|fr.phased.json
  - [ ] Enable prefetch of next-phase TTS during playback → Player optimization (once globally implemented)
  - [ ] QA in index.html: phase texts render, TTS plays, interactions flow → Open index.html?day=82

## Day 83 — Molecular Ecology - Genetic Diversity
- Learning objective: Study genetic variation while understanding how molecular ecology informs conservation and evolutionary biology.
- Slug: molecular-ecology-genetic-diversity
- Files:
  - Normalized: data/molecular-ecology-genetic-diversity_normalized.json
  - PhaseDNA: data/molecular-ecology-genetic-diversity.en.phased.json, data/molecular-ecology-genetic-diversity.es.phased.json, data/molecular-ecology-genetic-diversity.fr.phased.json
  - TTS jobs: data/tts_jobs/molecular-ecology-genetic-diversity.en.json, data/tts_jobs/molecular-ecology-genetic-diversity.es.json, data/tts_jobs/molecular-ecology-genetic-diversity.fr.json
- Subtasks:
  - [ ] Author normalized DNA source → data/molecular-ecology-genetic-diversity_normalized.json
  - [ ] Generate PhaseDNA v1 (en + clone es/fr) → data/molecular-ecology-genetic-diversity.en|es|fr.phased.json (cmd: node scripts/generate-phased-from-normalized.js --input data/molecular-ecology-genetic-diversity_normalized.json --outbase data/molecular-ecology-genetic-diversity --lang en --clone-es-fr)
  - [ ] Extract TTS jobs (per-phase narration) for en/es/fr → data/tts_jobs/molecular-ecology-genetic-diversity.en|es|fr.json (cmd: node scripts/extract-tts-jobs.js --slugs molecular-ecology-genetic-diversity --langs en,es,fr --in data --out data/tts_jobs)
  - [ ] Validate PhaseDNA shape and TTS jobs presence → npm run validate
  - [ ] Ensure day-to-slug resolver loads this lesson in index.html → Update getDNALessonData to include this day or general resolver
  - [ ] Attach minimal avatar cues/moods per phase (optional) → Edit phased JSON: phases[].avatar.cues
  - [ ] Quick review of es/fr clones for obvious issues → data/molecular-ecology-genetic-diversity.es|fr.phased.json
  - [ ] Enable prefetch of next-phase TTS during playback → Player optimization (once globally implemented)
  - [ ] QA in index.html: phase texts render, TTS plays, interactions flow → Open index.html?day=83

## Day 84 — Physiological Ecology - Organism Function
- Learning objective: Study organism function while understanding how physiological ecology informs medicine and conservation.
- Slug: physiological-ecology-organism-function
- Files:
  - Normalized: data/physiological-ecology-organism-function_normalized.json
  - PhaseDNA: data/physiological-ecology-organism-function.en.phased.json, data/physiological-ecology-organism-function.es.phased.json, data/physiological-ecology-organism-function.fr.phased.json
  - TTS jobs: data/tts_jobs/physiological-ecology-organism-function.en.json, data/tts_jobs/physiological-ecology-organism-function.es.json, data/tts_jobs/physiological-ecology-organism-function.fr.json
- Subtasks:
  - [ ] Author normalized DNA source → data/physiological-ecology-organism-function_normalized.json
  - [ ] Generate PhaseDNA v1 (en + clone es/fr) → data/physiological-ecology-organism-function.en|es|fr.phased.json (cmd: node scripts/generate-phased-from-normalized.js --input data/physiological-ecology-organism-function_normalized.json --outbase data/physiological-ecology-organism-function --lang en --clone-es-fr)
  - [ ] Extract TTS jobs (per-phase narration) for en/es/fr → data/tts_jobs/physiological-ecology-organism-function.en|es|fr.json (cmd: node scripts/extract-tts-jobs.js --slugs physiological-ecology-organism-function --langs en,es,fr --in data --out data/tts_jobs)
  - [ ] Validate PhaseDNA shape and TTS jobs presence → npm run validate
  - [ ] Ensure day-to-slug resolver loads this lesson in index.html → Update getDNALessonData to include this day or general resolver
  - [ ] Attach minimal avatar cues/moods per phase (optional) → Edit phased JSON: phases[].avatar.cues
  - [ ] Quick review of es/fr clones for obvious issues → data/physiological-ecology-organism-function.es|fr.phased.json
  - [ ] Enable prefetch of next-phase TTS during playback → Player optimization (once globally implemented)
  - [ ] QA in index.html: phase texts render, TTS plays, interactions flow → Open index.html?day=84

## Day 85 — Chemical Ecology - Chemical Communication
- Learning objective: Study chemical signals while understanding how chemical ecology informs medicine and pest management.
- Slug: chemical-ecology-chemical-communication
- Files:
  - Normalized: data/chemical-ecology-chemical-communication_normalized.json
  - PhaseDNA: data/chemical-ecology-chemical-communication.en.phased.json, data/chemical-ecology-chemical-communication.es.phased.json, data/chemical-ecology-chemical-communication.fr.phased.json
  - TTS jobs: data/tts_jobs/chemical-ecology-chemical-communication.en.json, data/tts_jobs/chemical-ecology-chemical-communication.es.json, data/tts_jobs/chemical-ecology-chemical-communication.fr.json
- Subtasks:
  - [ ] Author normalized DNA source → data/chemical-ecology-chemical-communication_normalized.json
  - [ ] Generate PhaseDNA v1 (en + clone es/fr) → data/chemical-ecology-chemical-communication.en|es|fr.phased.json (cmd: node scripts/generate-phased-from-normalized.js --input data/chemical-ecology-chemical-communication_normalized.json --outbase data/chemical-ecology-chemical-communication --lang en --clone-es-fr)
  - [ ] Extract TTS jobs (per-phase narration) for en/es/fr → data/tts_jobs/chemical-ecology-chemical-communication.en|es|fr.json (cmd: node scripts/extract-tts-jobs.js --slugs chemical-ecology-chemical-communication --langs en,es,fr --in data --out data/tts_jobs)
  - [ ] Validate PhaseDNA shape and TTS jobs presence → npm run validate
  - [ ] Ensure day-to-slug resolver loads this lesson in index.html → Update getDNALessonData to include this day or general resolver
  - [ ] Attach minimal avatar cues/moods per phase (optional) → Edit phased JSON: phases[].avatar.cues
  - [ ] Quick review of es/fr clones for obvious issues → data/chemical-ecology-chemical-communication.es|fr.phased.json
  - [ ] Enable prefetch of next-phase TTS during playback → Player optimization (once globally implemented)
  - [ ] QA in index.html: phase texts render, TTS plays, interactions flow → Open index.html?day=85

## Day 86 — Sensory Ecology - Perception
- Learning objective: Study sensory systems while understanding how sensory ecology informs technology and conservation.
- Slug: sensory-ecology-perception
- Files:
  - Normalized: data/sensory-ecology-perception_normalized.json
  - PhaseDNA: data/sensory-ecology-perception.en.phased.json, data/sensory-ecology-perception.es.phased.json, data/sensory-ecology-perception.fr.phased.json
  - TTS jobs: data/tts_jobs/sensory-ecology-perception.en.json, data/tts_jobs/sensory-ecology-perception.es.json, data/tts_jobs/sensory-ecology-perception.fr.json
- Subtasks:
  - [ ] Author normalized DNA source → data/sensory-ecology-perception_normalized.json
  - [ ] Generate PhaseDNA v1 (en + clone es/fr) → data/sensory-ecology-perception.en|es|fr.phased.json (cmd: node scripts/generate-phased-from-normalized.js --input data/sensory-ecology-perception_normalized.json --outbase data/sensory-ecology-perception --lang en --clone-es-fr)
  - [ ] Extract TTS jobs (per-phase narration) for en/es/fr → data/tts_jobs/sensory-ecology-perception.en|es|fr.json (cmd: node scripts/extract-tts-jobs.js --slugs sensory-ecology-perception --langs en,es,fr --in data --out data/tts_jobs)
  - [ ] Validate PhaseDNA shape and TTS jobs presence → npm run validate
  - [ ] Ensure day-to-slug resolver loads this lesson in index.html → Update getDNALessonData to include this day or general resolver
  - [ ] Attach minimal avatar cues/moods per phase (optional) → Edit phased JSON: phases[].avatar.cues
  - [ ] Quick review of es/fr clones for obvious issues → data/sensory-ecology-perception.es|fr.phased.json
  - [ ] Enable prefetch of next-phase TTS during playback → Player optimization (once globally implemented)
  - [ ] QA in index.html: phase texts render, TTS plays, interactions flow → Open index.html?day=86

## Day 87 — Movement Ecology - Animal Movement
- Learning objective: Study animal movement while understanding how movement ecology informs conservation and disease spread.
- Slug: movement-ecology-animal-movement
- Files:
  - Normalized: data/movement-ecology-animal-movement_normalized.json
  - PhaseDNA: data/movement-ecology-animal-movement.en.phased.json, data/movement-ecology-animal-movement.es.phased.json, data/movement-ecology-animal-movement.fr.phased.json
  - TTS jobs: data/tts_jobs/movement-ecology-animal-movement.en.json, data/tts_jobs/movement-ecology-animal-movement.es.json, data/tts_jobs/movement-ecology-animal-movement.fr.json
- Subtasks:
  - [ ] Author normalized DNA source → data/movement-ecology-animal-movement_normalized.json
  - [ ] Generate PhaseDNA v1 (en + clone es/fr) → data/movement-ecology-animal-movement.en|es|fr.phased.json (cmd: node scripts/generate-phased-from-normalized.js --input data/movement-ecology-animal-movement_normalized.json --outbase data/movement-ecology-animal-movement --lang en --clone-es-fr)
  - [ ] Extract TTS jobs (per-phase narration) for en/es/fr → data/tts_jobs/movement-ecology-animal-movement.en|es|fr.json (cmd: node scripts/extract-tts-jobs.js --slugs movement-ecology-animal-movement --langs en,es,fr --in data --out data/tts_jobs)
  - [ ] Validate PhaseDNA shape and TTS jobs presence → npm run validate
  - [ ] Ensure day-to-slug resolver loads this lesson in index.html → Update getDNALessonData to include this day or general resolver
  - [ ] Attach minimal avatar cues/moods per phase (optional) → Edit phased JSON: phases[].avatar.cues
  - [ ] Quick review of es/fr clones for obvious issues → data/movement-ecology-animal-movement.es|fr.phased.json
  - [ ] Enable prefetch of next-phase TTS during playback → Player optimization (once globally implemented)
  - [ ] QA in index.html: phase texts render, TTS plays, interactions flow → Open index.html?day=87

## Day 88 — Disease Ecology - Pathogen Dynamics
- Learning objective: Study disease processes while understanding how disease ecology informs public health and conservation.
- Slug: disease-ecology-pathogen-dynamics
- Files:
  - Normalized: data/disease-ecology-pathogen-dynamics_normalized.json
  - PhaseDNA: data/disease-ecology-pathogen-dynamics.en.phased.json, data/disease-ecology-pathogen-dynamics.es.phased.json, data/disease-ecology-pathogen-dynamics.fr.phased.json
  - TTS jobs: data/tts_jobs/disease-ecology-pathogen-dynamics.en.json, data/tts_jobs/disease-ecology-pathogen-dynamics.es.json, data/tts_jobs/disease-ecology-pathogen-dynamics.fr.json
- Subtasks:
  - [ ] Author normalized DNA source → data/disease-ecology-pathogen-dynamics_normalized.json
  - [ ] Generate PhaseDNA v1 (en + clone es/fr) → data/disease-ecology-pathogen-dynamics.en|es|fr.phased.json (cmd: node scripts/generate-phased-from-normalized.js --input data/disease-ecology-pathogen-dynamics_normalized.json --outbase data/disease-ecology-pathogen-dynamics --lang en --clone-es-fr)
  - [ ] Extract TTS jobs (per-phase narration) for en/es/fr → data/tts_jobs/disease-ecology-pathogen-dynamics.en|es|fr.json (cmd: node scripts/extract-tts-jobs.js --slugs disease-ecology-pathogen-dynamics --langs en,es,fr --in data --out data/tts_jobs)
  - [ ] Validate PhaseDNA shape and TTS jobs presence → npm run validate
  - [ ] Ensure day-to-slug resolver loads this lesson in index.html → Update getDNALessonData to include this day or general resolver
  - [ ] Attach minimal avatar cues/moods per phase (optional) → Edit phased JSON: phases[].avatar.cues
  - [ ] Quick review of es/fr clones for obvious issues → data/disease-ecology-pathogen-dynamics.es|fr.phased.json
  - [ ] Enable prefetch of next-phase TTS during playback → Player optimization (once globally implemented)
  - [ ] QA in index.html: phase texts render, TTS plays, interactions flow → Open index.html?day=88

## Day 89 — Parasite Ecology - Host-Parasite Systems
- Learning objective: Study parasitic relationships while understanding how parasite ecology informs medicine and conservation.
- Slug: parasite-ecology-host-parasite-systems
- Files:
  - Normalized: data/parasite-ecology-host-parasite-systems_normalized.json
  - PhaseDNA: data/parasite-ecology-host-parasite-systems.en.phased.json, data/parasite-ecology-host-parasite-systems.es.phased.json, data/parasite-ecology-host-parasite-systems.fr.phased.json
  - TTS jobs: data/tts_jobs/parasite-ecology-host-parasite-systems.en.json, data/tts_jobs/parasite-ecology-host-parasite-systems.es.json, data/tts_jobs/parasite-ecology-host-parasite-systems.fr.json
- Subtasks:
  - [ ] Author normalized DNA source → data/parasite-ecology-host-parasite-systems_normalized.json
  - [ ] Generate PhaseDNA v1 (en + clone es/fr) → data/parasite-ecology-host-parasite-systems.en|es|fr.phased.json (cmd: node scripts/generate-phased-from-normalized.js --input data/parasite-ecology-host-parasite-systems_normalized.json --outbase data/parasite-ecology-host-parasite-systems --lang en --clone-es-fr)
  - [ ] Extract TTS jobs (per-phase narration) for en/es/fr → data/tts_jobs/parasite-ecology-host-parasite-systems.en|es|fr.json (cmd: node scripts/extract-tts-jobs.js --slugs parasite-ecology-host-parasite-systems --langs en,es,fr --in data --out data/tts_jobs)
  - [ ] Validate PhaseDNA shape and TTS jobs presence → npm run validate
  - [ ] Ensure day-to-slug resolver loads this lesson in index.html → Update getDNALessonData to include this day or general resolver
  - [ ] Attach minimal avatar cues/moods per phase (optional) → Edit phased JSON: phases[].avatar.cues
  - [ ] Quick review of es/fr clones for obvious issues → data/parasite-ecology-host-parasite-systems.es|fr.phased.json
  - [ ] Enable prefetch of next-phase TTS during playback → Player optimization (once globally implemented)
  - [ ] QA in index.html: phase texts render, TTS plays, interactions flow → Open index.html?day=89

## Day 90 — Invasive Species Ecology - Biological Invasions
- Learning objective: Study invasive species while understanding how invasion ecology informs conservation and management.
- Slug: invasive-species-ecology-biological-invasions
- Files:
  - Normalized: data/invasive-species-ecology-biological-invasions_normalized.json
  - PhaseDNA: data/invasive-species-ecology-biological-invasions.en.phased.json, data/invasive-species-ecology-biological-invasions.es.phased.json, data/invasive-species-ecology-biological-invasions.fr.phased.json
  - TTS jobs: data/tts_jobs/invasive-species-ecology-biological-invasions.en.json, data/tts_jobs/invasive-species-ecology-biological-invasions.es.json, data/tts_jobs/invasive-species-ecology-biological-invasions.fr.json
- Subtasks:
  - [ ] Author normalized DNA source → data/invasive-species-ecology-biological-invasions_normalized.json
  - [ ] Generate PhaseDNA v1 (en + clone es/fr) → data/invasive-species-ecology-biological-invasions.en|es|fr.phased.json (cmd: node scripts/generate-phased-from-normalized.js --input data/invasive-species-ecology-biological-invasions_normalized.json --outbase data/invasive-species-ecology-biological-invasions --lang en --clone-es-fr)
  - [ ] Extract TTS jobs (per-phase narration) for en/es/fr → data/tts_jobs/invasive-species-ecology-biological-invasions.en|es|fr.json (cmd: node scripts/extract-tts-jobs.js --slugs invasive-species-ecology-biological-invasions --langs en,es,fr --in data --out data/tts_jobs)
  - [ ] Validate PhaseDNA shape and TTS jobs presence → npm run validate
  - [ ] Ensure day-to-slug resolver loads this lesson in index.html → Update getDNALessonData to include this day or general resolver
  - [ ] Attach minimal avatar cues/moods per phase (optional) → Edit phased JSON: phases[].avatar.cues
  - [ ] Quick review of es/fr clones for obvious issues → data/invasive-species-ecology-biological-invasions.es|fr.phased.json
  - [ ] Enable prefetch of next-phase TTS during playback → Player optimization (once globally implemented)
  - [ ] QA in index.html: phase texts render, TTS plays, interactions flow → Open index.html?day=90

## Day 91 — Day 91
- Slug: day-91
- Files:
  - Normalized: data/day-91_normalized.json
  - PhaseDNA: data/day-91.en.phased.json, data/day-91.es.phased.json, data/day-91.fr.phased.json
  - TTS jobs: data/tts_jobs/day-91.en.json, data/tts_jobs/day-91.es.json, data/tts_jobs/day-91.fr.json
- Subtasks:
  - [ ] Author normalized DNA source → data/day-91_normalized.json
  - [ ] Generate PhaseDNA v1 (en + clone es/fr) → data/day-91.en|es|fr.phased.json (cmd: node scripts/generate-phased-from-normalized.js --input data/day-91_normalized.json --outbase data/day-91 --lang en --clone-es-fr)
  - [ ] Extract TTS jobs (per-phase narration) for en/es/fr → data/tts_jobs/day-91.en|es|fr.json (cmd: node scripts/extract-tts-jobs.js --slugs day-91 --langs en,es,fr --in data --out data/tts_jobs)
  - [ ] Validate PhaseDNA shape and TTS jobs presence → npm run validate
  - [ ] Ensure day-to-slug resolver loads this lesson in index.html → Update getDNALessonData to include this day or general resolver
  - [ ] Attach minimal avatar cues/moods per phase (optional) → Edit phased JSON: phases[].avatar.cues
  - [ ] Quick review of es/fr clones for obvious issues → data/day-91.es|fr.phased.json
  - [ ] Enable prefetch of next-phase TTS during playback → Player optimization (once globally implemented)
  - [ ] QA in index.html: phase texts render, TTS plays, interactions flow → Open index.html?day=91

## Day 92 — Day 92
- Slug: day-92
- Files:
  - Normalized: data/day-92_normalized.json
  - PhaseDNA: data/day-92.en.phased.json, data/day-92.es.phased.json, data/day-92.fr.phased.json
  - TTS jobs: data/tts_jobs/day-92.en.json, data/tts_jobs/day-92.es.json, data/tts_jobs/day-92.fr.json
- Subtasks:
  - [ ] Author normalized DNA source → data/day-92_normalized.json
  - [ ] Generate PhaseDNA v1 (en + clone es/fr) → data/day-92.en|es|fr.phased.json (cmd: node scripts/generate-phased-from-normalized.js --input data/day-92_normalized.json --outbase data/day-92 --lang en --clone-es-fr)
  - [ ] Extract TTS jobs (per-phase narration) for en/es/fr → data/tts_jobs/day-92.en|es|fr.json (cmd: node scripts/extract-tts-jobs.js --slugs day-92 --langs en,es,fr --in data --out data/tts_jobs)
  - [ ] Validate PhaseDNA shape and TTS jobs presence → npm run validate
  - [ ] Ensure day-to-slug resolver loads this lesson in index.html → Update getDNALessonData to include this day or general resolver
  - [ ] Attach minimal avatar cues/moods per phase (optional) → Edit phased JSON: phases[].avatar.cues
  - [ ] Quick review of es/fr clones for obvious issues → data/day-92.es|fr.phased.json
  - [ ] Enable prefetch of next-phase TTS during playback → Player optimization (once globally implemented)
  - [ ] QA in index.html: phase texts render, TTS plays, interactions flow → Open index.html?day=92

## Day 93 — Day 93
- Slug: day-93
- Files:
  - Normalized: data/day-93_normalized.json
  - PhaseDNA: data/day-93.en.phased.json, data/day-93.es.phased.json, data/day-93.fr.phased.json
  - TTS jobs: data/tts_jobs/day-93.en.json, data/tts_jobs/day-93.es.json, data/tts_jobs/day-93.fr.json
- Subtasks:
  - [ ] Author normalized DNA source → data/day-93_normalized.json
  - [ ] Generate PhaseDNA v1 (en + clone es/fr) → data/day-93.en|es|fr.phased.json (cmd: node scripts/generate-phased-from-normalized.js --input data/day-93_normalized.json --outbase data/day-93 --lang en --clone-es-fr)
  - [ ] Extract TTS jobs (per-phase narration) for en/es/fr → data/tts_jobs/day-93.en|es|fr.json (cmd: node scripts/extract-tts-jobs.js --slugs day-93 --langs en,es,fr --in data --out data/tts_jobs)
  - [ ] Validate PhaseDNA shape and TTS jobs presence → npm run validate
  - [ ] Ensure day-to-slug resolver loads this lesson in index.html → Update getDNALessonData to include this day or general resolver
  - [ ] Attach minimal avatar cues/moods per phase (optional) → Edit phased JSON: phases[].avatar.cues
  - [ ] Quick review of es/fr clones for obvious issues → data/day-93.es|fr.phased.json
  - [ ] Enable prefetch of next-phase TTS during playback → Player optimization (once globally implemented)
  - [ ] QA in index.html: phase texts render, TTS plays, interactions flow → Open index.html?day=93

## Day 94 — Day 94
- Slug: day-94
- Files:
  - Normalized: data/day-94_normalized.json
  - PhaseDNA: data/day-94.en.phased.json, data/day-94.es.phased.json, data/day-94.fr.phased.json
  - TTS jobs: data/tts_jobs/day-94.en.json, data/tts_jobs/day-94.es.json, data/tts_jobs/day-94.fr.json
- Subtasks:
  - [ ] Author normalized DNA source → data/day-94_normalized.json
  - [ ] Generate PhaseDNA v1 (en + clone es/fr) → data/day-94.en|es|fr.phased.json (cmd: node scripts/generate-phased-from-normalized.js --input data/day-94_normalized.json --outbase data/day-94 --lang en --clone-es-fr)
  - [ ] Extract TTS jobs (per-phase narration) for en/es/fr → data/tts_jobs/day-94.en|es|fr.json (cmd: node scripts/extract-tts-jobs.js --slugs day-94 --langs en,es,fr --in data --out data/tts_jobs)
  - [ ] Validate PhaseDNA shape and TTS jobs presence → npm run validate
  - [ ] Ensure day-to-slug resolver loads this lesson in index.html → Update getDNALessonData to include this day or general resolver
  - [ ] Attach minimal avatar cues/moods per phase (optional) → Edit phased JSON: phases[].avatar.cues
  - [ ] Quick review of es/fr clones for obvious issues → data/day-94.es|fr.phased.json
  - [ ] Enable prefetch of next-phase TTS during playback → Player optimization (once globally implemented)
  - [ ] QA in index.html: phase texts render, TTS plays, interactions flow → Open index.html?day=94

## Day 95 — Day 95
- Slug: day-95
- Files:
  - Normalized: data/day-95_normalized.json
  - PhaseDNA: data/day-95.en.phased.json, data/day-95.es.phased.json, data/day-95.fr.phased.json
  - TTS jobs: data/tts_jobs/day-95.en.json, data/tts_jobs/day-95.es.json, data/tts_jobs/day-95.fr.json
- Subtasks:
  - [ ] Author normalized DNA source → data/day-95_normalized.json
  - [ ] Generate PhaseDNA v1 (en + clone es/fr) → data/day-95.en|es|fr.phased.json (cmd: node scripts/generate-phased-from-normalized.js --input data/day-95_normalized.json --outbase data/day-95 --lang en --clone-es-fr)
  - [ ] Extract TTS jobs (per-phase narration) for en/es/fr → data/tts_jobs/day-95.en|es|fr.json (cmd: node scripts/extract-tts-jobs.js --slugs day-95 --langs en,es,fr --in data --out data/tts_jobs)
  - [ ] Validate PhaseDNA shape and TTS jobs presence → npm run validate
  - [ ] Ensure day-to-slug resolver loads this lesson in index.html → Update getDNALessonData to include this day or general resolver
  - [ ] Attach minimal avatar cues/moods per phase (optional) → Edit phased JSON: phases[].avatar.cues
  - [ ] Quick review of es/fr clones for obvious issues → data/day-95.es|fr.phased.json
  - [ ] Enable prefetch of next-phase TTS during playback → Player optimization (once globally implemented)
  - [ ] QA in index.html: phase texts render, TTS plays, interactions flow → Open index.html?day=95

## Day 96 — Day 96
- Slug: day-96
- Files:
  - Normalized: data/day-96_normalized.json
  - PhaseDNA: data/day-96.en.phased.json, data/day-96.es.phased.json, data/day-96.fr.phased.json
  - TTS jobs: data/tts_jobs/day-96.en.json, data/tts_jobs/day-96.es.json, data/tts_jobs/day-96.fr.json
- Subtasks:
  - [ ] Author normalized DNA source → data/day-96_normalized.json
  - [ ] Generate PhaseDNA v1 (en + clone es/fr) → data/day-96.en|es|fr.phased.json (cmd: node scripts/generate-phased-from-normalized.js --input data/day-96_normalized.json --outbase data/day-96 --lang en --clone-es-fr)
  - [ ] Extract TTS jobs (per-phase narration) for en/es/fr → data/tts_jobs/day-96.en|es|fr.json (cmd: node scripts/extract-tts-jobs.js --slugs day-96 --langs en,es,fr --in data --out data/tts_jobs)
  - [ ] Validate PhaseDNA shape and TTS jobs presence → npm run validate
  - [ ] Ensure day-to-slug resolver loads this lesson in index.html → Update getDNALessonData to include this day or general resolver
  - [ ] Attach minimal avatar cues/moods per phase (optional) → Edit phased JSON: phases[].avatar.cues
  - [ ] Quick review of es/fr clones for obvious issues → data/day-96.es|fr.phased.json
  - [ ] Enable prefetch of next-phase TTS during playback → Player optimization (once globally implemented)
  - [ ] QA in index.html: phase texts render, TTS plays, interactions flow → Open index.html?day=96

## Day 97 — Day 97
- Slug: day-97
- Files:
  - Normalized: data/day-97_normalized.json
  - PhaseDNA: data/day-97.en.phased.json, data/day-97.es.phased.json, data/day-97.fr.phased.json
  - TTS jobs: data/tts_jobs/day-97.en.json, data/tts_jobs/day-97.es.json, data/tts_jobs/day-97.fr.json
- Subtasks:
  - [ ] Author normalized DNA source → data/day-97_normalized.json
  - [ ] Generate PhaseDNA v1 (en + clone es/fr) → data/day-97.en|es|fr.phased.json (cmd: node scripts/generate-phased-from-normalized.js --input data/day-97_normalized.json --outbase data/day-97 --lang en --clone-es-fr)
  - [ ] Extract TTS jobs (per-phase narration) for en/es/fr → data/tts_jobs/day-97.en|es|fr.json (cmd: node scripts/extract-tts-jobs.js --slugs day-97 --langs en,es,fr --in data --out data/tts_jobs)
  - [ ] Validate PhaseDNA shape and TTS jobs presence → npm run validate
  - [ ] Ensure day-to-slug resolver loads this lesson in index.html → Update getDNALessonData to include this day or general resolver
  - [ ] Attach minimal avatar cues/moods per phase (optional) → Edit phased JSON: phases[].avatar.cues
  - [ ] Quick review of es/fr clones for obvious issues → data/day-97.es|fr.phased.json
  - [ ] Enable prefetch of next-phase TTS during playback → Player optimization (once globally implemented)
  - [ ] QA in index.html: phase texts render, TTS plays, interactions flow → Open index.html?day=97

## Day 98 — Day 98
- Slug: day-98
- Files:
  - Normalized: data/day-98_normalized.json
  - PhaseDNA: data/day-98.en.phased.json, data/day-98.es.phased.json, data/day-98.fr.phased.json
  - TTS jobs: data/tts_jobs/day-98.en.json, data/tts_jobs/day-98.es.json, data/tts_jobs/day-98.fr.json
- Subtasks:
  - [ ] Author normalized DNA source → data/day-98_normalized.json
  - [ ] Generate PhaseDNA v1 (en + clone es/fr) → data/day-98.en|es|fr.phased.json (cmd: node scripts/generate-phased-from-normalized.js --input data/day-98_normalized.json --outbase data/day-98 --lang en --clone-es-fr)
  - [ ] Extract TTS jobs (per-phase narration) for en/es/fr → data/tts_jobs/day-98.en|es|fr.json (cmd: node scripts/extract-tts-jobs.js --slugs day-98 --langs en,es,fr --in data --out data/tts_jobs)
  - [ ] Validate PhaseDNA shape and TTS jobs presence → npm run validate
  - [ ] Ensure day-to-slug resolver loads this lesson in index.html → Update getDNALessonData to include this day or general resolver
  - [ ] Attach minimal avatar cues/moods per phase (optional) → Edit phased JSON: phases[].avatar.cues
  - [ ] Quick review of es/fr clones for obvious issues → data/day-98.es|fr.phased.json
  - [ ] Enable prefetch of next-phase TTS during playback → Player optimization (once globally implemented)
  - [ ] QA in index.html: phase texts render, TTS plays, interactions flow → Open index.html?day=98

## Day 99 — Day 99
- Slug: day-99
- Files:
  - Normalized: data/day-99_normalized.json
  - PhaseDNA: data/day-99.en.phased.json, data/day-99.es.phased.json, data/day-99.fr.phased.json
  - TTS jobs: data/tts_jobs/day-99.en.json, data/tts_jobs/day-99.es.json, data/tts_jobs/day-99.fr.json
- Subtasks:
  - [ ] Author normalized DNA source → data/day-99_normalized.json
  - [ ] Generate PhaseDNA v1 (en + clone es/fr) → data/day-99.en|es|fr.phased.json (cmd: node scripts/generate-phased-from-normalized.js --input data/day-99_normalized.json --outbase data/day-99 --lang en --clone-es-fr)
  - [ ] Extract TTS jobs (per-phase narration) for en/es/fr → data/tts_jobs/day-99.en|es|fr.json (cmd: node scripts/extract-tts-jobs.js --slugs day-99 --langs en,es,fr --in data --out data/tts_jobs)
  - [ ] Validate PhaseDNA shape and TTS jobs presence → npm run validate
  - [ ] Ensure day-to-slug resolver loads this lesson in index.html → Update getDNALessonData to include this day or general resolver
  - [ ] Attach minimal avatar cues/moods per phase (optional) → Edit phased JSON: phases[].avatar.cues
  - [ ] Quick review of es/fr clones for obvious issues → data/day-99.es|fr.phased.json
  - [ ] Enable prefetch of next-phase TTS during playback → Player optimization (once globally implemented)
  - [ ] QA in index.html: phase texts render, TTS plays, interactions flow → Open index.html?day=99

## Day 100 — Day 100
- Slug: day-100
- Files:
  - Normalized: data/day-100_normalized.json
  - PhaseDNA: data/day-100.en.phased.json, data/day-100.es.phased.json, data/day-100.fr.phased.json
  - TTS jobs: data/tts_jobs/day-100.en.json, data/tts_jobs/day-100.es.json, data/tts_jobs/day-100.fr.json
- Subtasks:
  - [ ] Author normalized DNA source → data/day-100_normalized.json
  - [ ] Generate PhaseDNA v1 (en + clone es/fr) → data/day-100.en|es|fr.phased.json (cmd: node scripts/generate-phased-from-normalized.js --input data/day-100_normalized.json --outbase data/day-100 --lang en --clone-es-fr)
  - [ ] Extract TTS jobs (per-phase narration) for en/es/fr → data/tts_jobs/day-100.en|es|fr.json (cmd: node scripts/extract-tts-jobs.js --slugs day-100 --langs en,es,fr --in data --out data/tts_jobs)
  - [ ] Validate PhaseDNA shape and TTS jobs presence → npm run validate
  - [ ] Ensure day-to-slug resolver loads this lesson in index.html → Update getDNALessonData to include this day or general resolver
  - [ ] Attach minimal avatar cues/moods per phase (optional) → Edit phased JSON: phases[].avatar.cues
  - [ ] Quick review of es/fr clones for obvious issues → data/day-100.es|fr.phased.json
  - [ ] Enable prefetch of next-phase TTS during playback → Player optimization (once globally implemented)
  - [ ] QA in index.html: phase texts render, TTS plays, interactions flow → Open index.html?day=100

## Day 101 — Day 101
- Slug: day-101
- Files:
  - Normalized: data/day-101_normalized.json
  - PhaseDNA: data/day-101.en.phased.json, data/day-101.es.phased.json, data/day-101.fr.phased.json
  - TTS jobs: data/tts_jobs/day-101.en.json, data/tts_jobs/day-101.es.json, data/tts_jobs/day-101.fr.json
- Subtasks:
  - [ ] Author normalized DNA source → data/day-101_normalized.json
  - [ ] Generate PhaseDNA v1 (en + clone es/fr) → data/day-101.en|es|fr.phased.json (cmd: node scripts/generate-phased-from-normalized.js --input data/day-101_normalized.json --outbase data/day-101 --lang en --clone-es-fr)
  - [ ] Extract TTS jobs (per-phase narration) for en/es/fr → data/tts_jobs/day-101.en|es|fr.json (cmd: node scripts/extract-tts-jobs.js --slugs day-101 --langs en,es,fr --in data --out data/tts_jobs)
  - [ ] Validate PhaseDNA shape and TTS jobs presence → npm run validate
  - [ ] Ensure day-to-slug resolver loads this lesson in index.html → Update getDNALessonData to include this day or general resolver
  - [ ] Attach minimal avatar cues/moods per phase (optional) → Edit phased JSON: phases[].avatar.cues
  - [ ] Quick review of es/fr clones for obvious issues → data/day-101.es|fr.phased.json
  - [ ] Enable prefetch of next-phase TTS during playback → Player optimization (once globally implemented)
  - [ ] QA in index.html: phase texts render, TTS plays, interactions flow → Open index.html?day=101

## Day 102 — Day 102
- Slug: day-102
- Files:
  - Normalized: data/day-102_normalized.json
  - PhaseDNA: data/day-102.en.phased.json, data/day-102.es.phased.json, data/day-102.fr.phased.json
  - TTS jobs: data/tts_jobs/day-102.en.json, data/tts_jobs/day-102.es.json, data/tts_jobs/day-102.fr.json
- Subtasks:
  - [ ] Author normalized DNA source → data/day-102_normalized.json
  - [ ] Generate PhaseDNA v1 (en + clone es/fr) → data/day-102.en|es|fr.phased.json (cmd: node scripts/generate-phased-from-normalized.js --input data/day-102_normalized.json --outbase data/day-102 --lang en --clone-es-fr)
  - [ ] Extract TTS jobs (per-phase narration) for en/es/fr → data/tts_jobs/day-102.en|es|fr.json (cmd: node scripts/extract-tts-jobs.js --slugs day-102 --langs en,es,fr --in data --out data/tts_jobs)
  - [ ] Validate PhaseDNA shape and TTS jobs presence → npm run validate
  - [ ] Ensure day-to-slug resolver loads this lesson in index.html → Update getDNALessonData to include this day or general resolver
  - [ ] Attach minimal avatar cues/moods per phase (optional) → Edit phased JSON: phases[].avatar.cues
  - [ ] Quick review of es/fr clones for obvious issues → data/day-102.es|fr.phased.json
  - [ ] Enable prefetch of next-phase TTS during playback → Player optimization (once globally implemented)
  - [ ] QA in index.html: phase texts render, TTS plays, interactions flow → Open index.html?day=102

## Day 103 — Day 103
- Slug: day-103
- Files:
  - Normalized: data/day-103_normalized.json
  - PhaseDNA: data/day-103.en.phased.json, data/day-103.es.phased.json, data/day-103.fr.phased.json
  - TTS jobs: data/tts_jobs/day-103.en.json, data/tts_jobs/day-103.es.json, data/tts_jobs/day-103.fr.json
- Subtasks:
  - [ ] Author normalized DNA source → data/day-103_normalized.json
  - [ ] Generate PhaseDNA v1 (en + clone es/fr) → data/day-103.en|es|fr.phased.json (cmd: node scripts/generate-phased-from-normalized.js --input data/day-103_normalized.json --outbase data/day-103 --lang en --clone-es-fr)
  - [ ] Extract TTS jobs (per-phase narration) for en/es/fr → data/tts_jobs/day-103.en|es|fr.json (cmd: node scripts/extract-tts-jobs.js --slugs day-103 --langs en,es,fr --in data --out data/tts_jobs)
  - [ ] Validate PhaseDNA shape and TTS jobs presence → npm run validate
  - [ ] Ensure day-to-slug resolver loads this lesson in index.html → Update getDNALessonData to include this day or general resolver
  - [ ] Attach minimal avatar cues/moods per phase (optional) → Edit phased JSON: phases[].avatar.cues
  - [ ] Quick review of es/fr clones for obvious issues → data/day-103.es|fr.phased.json
  - [ ] Enable prefetch of next-phase TTS during playback → Player optimization (once globally implemented)
  - [ ] QA in index.html: phase texts render, TTS plays, interactions flow → Open index.html?day=103

## Day 104 — Day 104
- Slug: day-104
- Files:
  - Normalized: data/day-104_normalized.json
  - PhaseDNA: data/day-104.en.phased.json, data/day-104.es.phased.json, data/day-104.fr.phased.json
  - TTS jobs: data/tts_jobs/day-104.en.json, data/tts_jobs/day-104.es.json, data/tts_jobs/day-104.fr.json
- Subtasks:
  - [ ] Author normalized DNA source → data/day-104_normalized.json
  - [ ] Generate PhaseDNA v1 (en + clone es/fr) → data/day-104.en|es|fr.phased.json (cmd: node scripts/generate-phased-from-normalized.js --input data/day-104_normalized.json --outbase data/day-104 --lang en --clone-es-fr)
  - [ ] Extract TTS jobs (per-phase narration) for en/es/fr → data/tts_jobs/day-104.en|es|fr.json (cmd: node scripts/extract-tts-jobs.js --slugs day-104 --langs en,es,fr --in data --out data/tts_jobs)
  - [ ] Validate PhaseDNA shape and TTS jobs presence → npm run validate
  - [ ] Ensure day-to-slug resolver loads this lesson in index.html → Update getDNALessonData to include this day or general resolver
  - [ ] Attach minimal avatar cues/moods per phase (optional) → Edit phased JSON: phases[].avatar.cues
  - [ ] Quick review of es/fr clones for obvious issues → data/day-104.es|fr.phased.json
  - [ ] Enable prefetch of next-phase TTS during playback → Player optimization (once globally implemented)
  - [ ] QA in index.html: phase texts render, TTS plays, interactions flow → Open index.html?day=104

## Day 105 — Day 105
- Slug: day-105
- Files:
  - Normalized: data/day-105_normalized.json
  - PhaseDNA: data/day-105.en.phased.json, data/day-105.es.phased.json, data/day-105.fr.phased.json
  - TTS jobs: data/tts_jobs/day-105.en.json, data/tts_jobs/day-105.es.json, data/tts_jobs/day-105.fr.json
- Subtasks:
  - [ ] Author normalized DNA source → data/day-105_normalized.json
  - [ ] Generate PhaseDNA v1 (en + clone es/fr) → data/day-105.en|es|fr.phased.json (cmd: node scripts/generate-phased-from-normalized.js --input data/day-105_normalized.json --outbase data/day-105 --lang en --clone-es-fr)
  - [ ] Extract TTS jobs (per-phase narration) for en/es/fr → data/tts_jobs/day-105.en|es|fr.json (cmd: node scripts/extract-tts-jobs.js --slugs day-105 --langs en,es,fr --in data --out data/tts_jobs)
  - [ ] Validate PhaseDNA shape and TTS jobs presence → npm run validate
  - [ ] Ensure day-to-slug resolver loads this lesson in index.html → Update getDNALessonData to include this day or general resolver
  - [ ] Attach minimal avatar cues/moods per phase (optional) → Edit phased JSON: phases[].avatar.cues
  - [ ] Quick review of es/fr clones for obvious issues → data/day-105.es|fr.phased.json
  - [ ] Enable prefetch of next-phase TTS during playback → Player optimization (once globally implemented)
  - [ ] QA in index.html: phase texts render, TTS plays, interactions flow → Open index.html?day=105

## Day 106 — Day 106
- Slug: day-106
- Files:
  - Normalized: data/day-106_normalized.json
  - PhaseDNA: data/day-106.en.phased.json, data/day-106.es.phased.json, data/day-106.fr.phased.json
  - TTS jobs: data/tts_jobs/day-106.en.json, data/tts_jobs/day-106.es.json, data/tts_jobs/day-106.fr.json
- Subtasks:
  - [ ] Author normalized DNA source → data/day-106_normalized.json
  - [ ] Generate PhaseDNA v1 (en + clone es/fr) → data/day-106.en|es|fr.phased.json (cmd: node scripts/generate-phased-from-normalized.js --input data/day-106_normalized.json --outbase data/day-106 --lang en --clone-es-fr)
  - [ ] Extract TTS jobs (per-phase narration) for en/es/fr → data/tts_jobs/day-106.en|es|fr.json (cmd: node scripts/extract-tts-jobs.js --slugs day-106 --langs en,es,fr --in data --out data/tts_jobs)
  - [ ] Validate PhaseDNA shape and TTS jobs presence → npm run validate
  - [ ] Ensure day-to-slug resolver loads this lesson in index.html → Update getDNALessonData to include this day or general resolver
  - [ ] Attach minimal avatar cues/moods per phase (optional) → Edit phased JSON: phases[].avatar.cues
  - [ ] Quick review of es/fr clones for obvious issues → data/day-106.es|fr.phased.json
  - [ ] Enable prefetch of next-phase TTS during playback → Player optimization (once globally implemented)
  - [ ] QA in index.html: phase texts render, TTS plays, interactions flow → Open index.html?day=106

## Day 107 — Day 107
- Slug: day-107
- Files:
  - Normalized: data/day-107_normalized.json
  - PhaseDNA: data/day-107.en.phased.json, data/day-107.es.phased.json, data/day-107.fr.phased.json
  - TTS jobs: data/tts_jobs/day-107.en.json, data/tts_jobs/day-107.es.json, data/tts_jobs/day-107.fr.json
- Subtasks:
  - [ ] Author normalized DNA source → data/day-107_normalized.json
  - [ ] Generate PhaseDNA v1 (en + clone es/fr) → data/day-107.en|es|fr.phased.json (cmd: node scripts/generate-phased-from-normalized.js --input data/day-107_normalized.json --outbase data/day-107 --lang en --clone-es-fr)
  - [ ] Extract TTS jobs (per-phase narration) for en/es/fr → data/tts_jobs/day-107.en|es|fr.json (cmd: node scripts/extract-tts-jobs.js --slugs day-107 --langs en,es,fr --in data --out data/tts_jobs)
  - [ ] Validate PhaseDNA shape and TTS jobs presence → npm run validate
  - [ ] Ensure day-to-slug resolver loads this lesson in index.html → Update getDNALessonData to include this day or general resolver
  - [ ] Attach minimal avatar cues/moods per phase (optional) → Edit phased JSON: phases[].avatar.cues
  - [ ] Quick review of es/fr clones for obvious issues → data/day-107.es|fr.phased.json
  - [ ] Enable prefetch of next-phase TTS during playback → Player optimization (once globally implemented)
  - [ ] QA in index.html: phase texts render, TTS plays, interactions flow → Open index.html?day=107

## Day 108 — Day 108
- Slug: day-108
- Files:
  - Normalized: data/day-108_normalized.json
  - PhaseDNA: data/day-108.en.phased.json, data/day-108.es.phased.json, data/day-108.fr.phased.json
  - TTS jobs: data/tts_jobs/day-108.en.json, data/tts_jobs/day-108.es.json, data/tts_jobs/day-108.fr.json
- Subtasks:
  - [ ] Author normalized DNA source → data/day-108_normalized.json
  - [ ] Generate PhaseDNA v1 (en + clone es/fr) → data/day-108.en|es|fr.phased.json (cmd: node scripts/generate-phased-from-normalized.js --input data/day-108_normalized.json --outbase data/day-108 --lang en --clone-es-fr)
  - [ ] Extract TTS jobs (per-phase narration) for en/es/fr → data/tts_jobs/day-108.en|es|fr.json (cmd: node scripts/extract-tts-jobs.js --slugs day-108 --langs en,es,fr --in data --out data/tts_jobs)
  - [ ] Validate PhaseDNA shape and TTS jobs presence → npm run validate
  - [ ] Ensure day-to-slug resolver loads this lesson in index.html → Update getDNALessonData to include this day or general resolver
  - [ ] Attach minimal avatar cues/moods per phase (optional) → Edit phased JSON: phases[].avatar.cues
  - [ ] Quick review of es/fr clones for obvious issues → data/day-108.es|fr.phased.json
  - [ ] Enable prefetch of next-phase TTS during playback → Player optimization (once globally implemented)
  - [ ] QA in index.html: phase texts render, TTS plays, interactions flow → Open index.html?day=108

## Day 109 — Day 109
- Slug: day-109
- Files:
  - Normalized: data/day-109_normalized.json
  - PhaseDNA: data/day-109.en.phased.json, data/day-109.es.phased.json, data/day-109.fr.phased.json
  - TTS jobs: data/tts_jobs/day-109.en.json, data/tts_jobs/day-109.es.json, data/tts_jobs/day-109.fr.json
- Subtasks:
  - [ ] Author normalized DNA source → data/day-109_normalized.json
  - [ ] Generate PhaseDNA v1 (en + clone es/fr) → data/day-109.en|es|fr.phased.json (cmd: node scripts/generate-phased-from-normalized.js --input data/day-109_normalized.json --outbase data/day-109 --lang en --clone-es-fr)
  - [ ] Extract TTS jobs (per-phase narration) for en/es/fr → data/tts_jobs/day-109.en|es|fr.json (cmd: node scripts/extract-tts-jobs.js --slugs day-109 --langs en,es,fr --in data --out data/tts_jobs)
  - [ ] Validate PhaseDNA shape and TTS jobs presence → npm run validate
  - [ ] Ensure day-to-slug resolver loads this lesson in index.html → Update getDNALessonData to include this day or general resolver
  - [ ] Attach minimal avatar cues/moods per phase (optional) → Edit phased JSON: phases[].avatar.cues
  - [ ] Quick review of es/fr clones for obvious issues → data/day-109.es|fr.phased.json
  - [ ] Enable prefetch of next-phase TTS during playback → Player optimization (once globally implemented)
  - [ ] QA in index.html: phase texts render, TTS plays, interactions flow → Open index.html?day=109

## Day 110 — Day 110
- Slug: day-110
- Files:
  - Normalized: data/day-110_normalized.json
  - PhaseDNA: data/day-110.en.phased.json, data/day-110.es.phased.json, data/day-110.fr.phased.json
  - TTS jobs: data/tts_jobs/day-110.en.json, data/tts_jobs/day-110.es.json, data/tts_jobs/day-110.fr.json
- Subtasks:
  - [ ] Author normalized DNA source → data/day-110_normalized.json
  - [ ] Generate PhaseDNA v1 (en + clone es/fr) → data/day-110.en|es|fr.phased.json (cmd: node scripts/generate-phased-from-normalized.js --input data/day-110_normalized.json --outbase data/day-110 --lang en --clone-es-fr)
  - [ ] Extract TTS jobs (per-phase narration) for en/es/fr → data/tts_jobs/day-110.en|es|fr.json (cmd: node scripts/extract-tts-jobs.js --slugs day-110 --langs en,es,fr --in data --out data/tts_jobs)
  - [ ] Validate PhaseDNA shape and TTS jobs presence → npm run validate
  - [ ] Ensure day-to-slug resolver loads this lesson in index.html → Update getDNALessonData to include this day or general resolver
  - [ ] Attach minimal avatar cues/moods per phase (optional) → Edit phased JSON: phases[].avatar.cues
  - [ ] Quick review of es/fr clones for obvious issues → data/day-110.es|fr.phased.json
  - [ ] Enable prefetch of next-phase TTS during playback → Player optimization (once globally implemented)
  - [ ] QA in index.html: phase texts render, TTS plays, interactions flow → Open index.html?day=110

## Day 111 — Day 111
- Slug: day-111
- Files:
  - Normalized: data/day-111_normalized.json
  - PhaseDNA: data/day-111.en.phased.json, data/day-111.es.phased.json, data/day-111.fr.phased.json
  - TTS jobs: data/tts_jobs/day-111.en.json, data/tts_jobs/day-111.es.json, data/tts_jobs/day-111.fr.json
- Subtasks:
  - [ ] Author normalized DNA source → data/day-111_normalized.json
  - [ ] Generate PhaseDNA v1 (en + clone es/fr) → data/day-111.en|es|fr.phased.json (cmd: node scripts/generate-phased-from-normalized.js --input data/day-111_normalized.json --outbase data/day-111 --lang en --clone-es-fr)
  - [ ] Extract TTS jobs (per-phase narration) for en/es/fr → data/tts_jobs/day-111.en|es|fr.json (cmd: node scripts/extract-tts-jobs.js --slugs day-111 --langs en,es,fr --in data --out data/tts_jobs)
  - [ ] Validate PhaseDNA shape and TTS jobs presence → npm run validate
  - [ ] Ensure day-to-slug resolver loads this lesson in index.html → Update getDNALessonData to include this day or general resolver
  - [ ] Attach minimal avatar cues/moods per phase (optional) → Edit phased JSON: phases[].avatar.cues
  - [ ] Quick review of es/fr clones for obvious issues → data/day-111.es|fr.phased.json
  - [ ] Enable prefetch of next-phase TTS during playback → Player optimization (once globally implemented)
  - [ ] QA in index.html: phase texts render, TTS plays, interactions flow → Open index.html?day=111

## Day 112 — Day 112
- Slug: day-112
- Files:
  - Normalized: data/day-112_normalized.json
  - PhaseDNA: data/day-112.en.phased.json, data/day-112.es.phased.json, data/day-112.fr.phased.json
  - TTS jobs: data/tts_jobs/day-112.en.json, data/tts_jobs/day-112.es.json, data/tts_jobs/day-112.fr.json
- Subtasks:
  - [ ] Author normalized DNA source → data/day-112_normalized.json
  - [ ] Generate PhaseDNA v1 (en + clone es/fr) → data/day-112.en|es|fr.phased.json (cmd: node scripts/generate-phased-from-normalized.js --input data/day-112_normalized.json --outbase data/day-112 --lang en --clone-es-fr)
  - [ ] Extract TTS jobs (per-phase narration) for en/es/fr → data/tts_jobs/day-112.en|es|fr.json (cmd: node scripts/extract-tts-jobs.js --slugs day-112 --langs en,es,fr --in data --out data/tts_jobs)
  - [ ] Validate PhaseDNA shape and TTS jobs presence → npm run validate
  - [ ] Ensure day-to-slug resolver loads this lesson in index.html → Update getDNALessonData to include this day or general resolver
  - [ ] Attach minimal avatar cues/moods per phase (optional) → Edit phased JSON: phases[].avatar.cues
  - [ ] Quick review of es/fr clones for obvious issues → data/day-112.es|fr.phased.json
  - [ ] Enable prefetch of next-phase TTS during playback → Player optimization (once globally implemented)
  - [ ] QA in index.html: phase texts render, TTS plays, interactions flow → Open index.html?day=112

## Day 113 — Day 113
- Slug: day-113
- Files:
  - Normalized: data/day-113_normalized.json
  - PhaseDNA: data/day-113.en.phased.json, data/day-113.es.phased.json, data/day-113.fr.phased.json
  - TTS jobs: data/tts_jobs/day-113.en.json, data/tts_jobs/day-113.es.json, data/tts_jobs/day-113.fr.json
- Subtasks:
  - [ ] Author normalized DNA source → data/day-113_normalized.json
  - [ ] Generate PhaseDNA v1 (en + clone es/fr) → data/day-113.en|es|fr.phased.json (cmd: node scripts/generate-phased-from-normalized.js --input data/day-113_normalized.json --outbase data/day-113 --lang en --clone-es-fr)
  - [ ] Extract TTS jobs (per-phase narration) for en/es/fr → data/tts_jobs/day-113.en|es|fr.json (cmd: node scripts/extract-tts-jobs.js --slugs day-113 --langs en,es,fr --in data --out data/tts_jobs)
  - [ ] Validate PhaseDNA shape and TTS jobs presence → npm run validate
  - [ ] Ensure day-to-slug resolver loads this lesson in index.html → Update getDNALessonData to include this day or general resolver
  - [ ] Attach minimal avatar cues/moods per phase (optional) → Edit phased JSON: phases[].avatar.cues
  - [ ] Quick review of es/fr clones for obvious issues → data/day-113.es|fr.phased.json
  - [ ] Enable prefetch of next-phase TTS during playback → Player optimization (once globally implemented)
  - [ ] QA in index.html: phase texts render, TTS plays, interactions flow → Open index.html?day=113

## Day 114 — Day 114
- Slug: day-114
- Files:
  - Normalized: data/day-114_normalized.json
  - PhaseDNA: data/day-114.en.phased.json, data/day-114.es.phased.json, data/day-114.fr.phased.json
  - TTS jobs: data/tts_jobs/day-114.en.json, data/tts_jobs/day-114.es.json, data/tts_jobs/day-114.fr.json
- Subtasks:
  - [ ] Author normalized DNA source → data/day-114_normalized.json
  - [ ] Generate PhaseDNA v1 (en + clone es/fr) → data/day-114.en|es|fr.phased.json (cmd: node scripts/generate-phased-from-normalized.js --input data/day-114_normalized.json --outbase data/day-114 --lang en --clone-es-fr)
  - [ ] Extract TTS jobs (per-phase narration) for en/es/fr → data/tts_jobs/day-114.en|es|fr.json (cmd: node scripts/extract-tts-jobs.js --slugs day-114 --langs en,es,fr --in data --out data/tts_jobs)
  - [ ] Validate PhaseDNA shape and TTS jobs presence → npm run validate
  - [ ] Ensure day-to-slug resolver loads this lesson in index.html → Update getDNALessonData to include this day or general resolver
  - [ ] Attach minimal avatar cues/moods per phase (optional) → Edit phased JSON: phases[].avatar.cues
  - [ ] Quick review of es/fr clones for obvious issues → data/day-114.es|fr.phased.json
  - [ ] Enable prefetch of next-phase TTS during playback → Player optimization (once globally implemented)
  - [ ] QA in index.html: phase texts render, TTS plays, interactions flow → Open index.html?day=114

## Day 115 — Day 115
- Slug: day-115
- Files:
  - Normalized: data/day-115_normalized.json
  - PhaseDNA: data/day-115.en.phased.json, data/day-115.es.phased.json, data/day-115.fr.phased.json
  - TTS jobs: data/tts_jobs/day-115.en.json, data/tts_jobs/day-115.es.json, data/tts_jobs/day-115.fr.json
- Subtasks:
  - [ ] Author normalized DNA source → data/day-115_normalized.json
  - [ ] Generate PhaseDNA v1 (en + clone es/fr) → data/day-115.en|es|fr.phased.json (cmd: node scripts/generate-phased-from-normalized.js --input data/day-115_normalized.json --outbase data/day-115 --lang en --clone-es-fr)
  - [ ] Extract TTS jobs (per-phase narration) for en/es/fr → data/tts_jobs/day-115.en|es|fr.json (cmd: node scripts/extract-tts-jobs.js --slugs day-115 --langs en,es,fr --in data --out data/tts_jobs)
  - [ ] Validate PhaseDNA shape and TTS jobs presence → npm run validate
  - [ ] Ensure day-to-slug resolver loads this lesson in index.html → Update getDNALessonData to include this day or general resolver
  - [ ] Attach minimal avatar cues/moods per phase (optional) → Edit phased JSON: phases[].avatar.cues
  - [ ] Quick review of es/fr clones for obvious issues → data/day-115.es|fr.phased.json
  - [ ] Enable prefetch of next-phase TTS during playback → Player optimization (once globally implemented)
  - [ ] QA in index.html: phase texts render, TTS plays, interactions flow → Open index.html?day=115

## Day 116 — Day 116
- Slug: day-116
- Files:
  - Normalized: data/day-116_normalized.json
  - PhaseDNA: data/day-116.en.phased.json, data/day-116.es.phased.json, data/day-116.fr.phased.json
  - TTS jobs: data/tts_jobs/day-116.en.json, data/tts_jobs/day-116.es.json, data/tts_jobs/day-116.fr.json
- Subtasks:
  - [ ] Author normalized DNA source → data/day-116_normalized.json
  - [ ] Generate PhaseDNA v1 (en + clone es/fr) → data/day-116.en|es|fr.phased.json (cmd: node scripts/generate-phased-from-normalized.js --input data/day-116_normalized.json --outbase data/day-116 --lang en --clone-es-fr)
  - [ ] Extract TTS jobs (per-phase narration) for en/es/fr → data/tts_jobs/day-116.en|es|fr.json (cmd: node scripts/extract-tts-jobs.js --slugs day-116 --langs en,es,fr --in data --out data/tts_jobs)
  - [ ] Validate PhaseDNA shape and TTS jobs presence → npm run validate
  - [ ] Ensure day-to-slug resolver loads this lesson in index.html → Update getDNALessonData to include this day or general resolver
  - [ ] Attach minimal avatar cues/moods per phase (optional) → Edit phased JSON: phases[].avatar.cues
  - [ ] Quick review of es/fr clones for obvious issues → data/day-116.es|fr.phased.json
  - [ ] Enable prefetch of next-phase TTS during playback → Player optimization (once globally implemented)
  - [ ] QA in index.html: phase texts render, TTS plays, interactions flow → Open index.html?day=116

## Day 117 — Day 117
- Slug: day-117
- Files:
  - Normalized: data/day-117_normalized.json
  - PhaseDNA: data/day-117.en.phased.json, data/day-117.es.phased.json, data/day-117.fr.phased.json
  - TTS jobs: data/tts_jobs/day-117.en.json, data/tts_jobs/day-117.es.json, data/tts_jobs/day-117.fr.json
- Subtasks:
  - [ ] Author normalized DNA source → data/day-117_normalized.json
  - [ ] Generate PhaseDNA v1 (en + clone es/fr) → data/day-117.en|es|fr.phased.json (cmd: node scripts/generate-phased-from-normalized.js --input data/day-117_normalized.json --outbase data/day-117 --lang en --clone-es-fr)
  - [ ] Extract TTS jobs (per-phase narration) for en/es/fr → data/tts_jobs/day-117.en|es|fr.json (cmd: node scripts/extract-tts-jobs.js --slugs day-117 --langs en,es,fr --in data --out data/tts_jobs)
  - [ ] Validate PhaseDNA shape and TTS jobs presence → npm run validate
  - [ ] Ensure day-to-slug resolver loads this lesson in index.html → Update getDNALessonData to include this day or general resolver
  - [ ] Attach minimal avatar cues/moods per phase (optional) → Edit phased JSON: phases[].avatar.cues
  - [ ] Quick review of es/fr clones for obvious issues → data/day-117.es|fr.phased.json
  - [ ] Enable prefetch of next-phase TTS during playback → Player optimization (once globally implemented)
  - [ ] QA in index.html: phase texts render, TTS plays, interactions flow → Open index.html?day=117

## Day 118 — Day 118
- Slug: day-118
- Files:
  - Normalized: data/day-118_normalized.json
  - PhaseDNA: data/day-118.en.phased.json, data/day-118.es.phased.json, data/day-118.fr.phased.json
  - TTS jobs: data/tts_jobs/day-118.en.json, data/tts_jobs/day-118.es.json, data/tts_jobs/day-118.fr.json
- Subtasks:
  - [ ] Author normalized DNA source → data/day-118_normalized.json
  - [ ] Generate PhaseDNA v1 (en + clone es/fr) → data/day-118.en|es|fr.phased.json (cmd: node scripts/generate-phased-from-normalized.js --input data/day-118_normalized.json --outbase data/day-118 --lang en --clone-es-fr)
  - [ ] Extract TTS jobs (per-phase narration) for en/es/fr → data/tts_jobs/day-118.en|es|fr.json (cmd: node scripts/extract-tts-jobs.js --slugs day-118 --langs en,es,fr --in data --out data/tts_jobs)
  - [ ] Validate PhaseDNA shape and TTS jobs presence → npm run validate
  - [ ] Ensure day-to-slug resolver loads this lesson in index.html → Update getDNALessonData to include this day or general resolver
  - [ ] Attach minimal avatar cues/moods per phase (optional) → Edit phased JSON: phases[].avatar.cues
  - [ ] Quick review of es/fr clones for obvious issues → data/day-118.es|fr.phased.json
  - [ ] Enable prefetch of next-phase TTS during playback → Player optimization (once globally implemented)
  - [ ] QA in index.html: phase texts render, TTS plays, interactions flow → Open index.html?day=118

## Day 119 — Day 119
- Slug: day-119
- Files:
  - Normalized: data/day-119_normalized.json
  - PhaseDNA: data/day-119.en.phased.json, data/day-119.es.phased.json, data/day-119.fr.phased.json
  - TTS jobs: data/tts_jobs/day-119.en.json, data/tts_jobs/day-119.es.json, data/tts_jobs/day-119.fr.json
- Subtasks:
  - [ ] Author normalized DNA source → data/day-119_normalized.json
  - [ ] Generate PhaseDNA v1 (en + clone es/fr) → data/day-119.en|es|fr.phased.json (cmd: node scripts/generate-phased-from-normalized.js --input data/day-119_normalized.json --outbase data/day-119 --lang en --clone-es-fr)
  - [ ] Extract TTS jobs (per-phase narration) for en/es/fr → data/tts_jobs/day-119.en|es|fr.json (cmd: node scripts/extract-tts-jobs.js --slugs day-119 --langs en,es,fr --in data --out data/tts_jobs)
  - [ ] Validate PhaseDNA shape and TTS jobs presence → npm run validate
  - [ ] Ensure day-to-slug resolver loads this lesson in index.html → Update getDNALessonData to include this day or general resolver
  - [ ] Attach minimal avatar cues/moods per phase (optional) → Edit phased JSON: phases[].avatar.cues
  - [ ] Quick review of es/fr clones for obvious issues → data/day-119.es|fr.phased.json
  - [ ] Enable prefetch of next-phase TTS during playback → Player optimization (once globally implemented)
  - [ ] QA in index.html: phase texts render, TTS plays, interactions flow → Open index.html?day=119

## Day 120 — Day 120
- Slug: day-120
- Files:
  - Normalized: data/day-120_normalized.json
  - PhaseDNA: data/day-120.en.phased.json, data/day-120.es.phased.json, data/day-120.fr.phased.json
  - TTS jobs: data/tts_jobs/day-120.en.json, data/tts_jobs/day-120.es.json, data/tts_jobs/day-120.fr.json
- Subtasks:
  - [ ] Author normalized DNA source → data/day-120_normalized.json
  - [ ] Generate PhaseDNA v1 (en + clone es/fr) → data/day-120.en|es|fr.phased.json (cmd: node scripts/generate-phased-from-normalized.js --input data/day-120_normalized.json --outbase data/day-120 --lang en --clone-es-fr)
  - [ ] Extract TTS jobs (per-phase narration) for en/es/fr → data/tts_jobs/day-120.en|es|fr.json (cmd: node scripts/extract-tts-jobs.js --slugs day-120 --langs en,es,fr --in data --out data/tts_jobs)
  - [ ] Validate PhaseDNA shape and TTS jobs presence → npm run validate
  - [ ] Ensure day-to-slug resolver loads this lesson in index.html → Update getDNALessonData to include this day or general resolver
  - [ ] Attach minimal avatar cues/moods per phase (optional) → Edit phased JSON: phases[].avatar.cues
  - [ ] Quick review of es/fr clones for obvious issues → data/day-120.es|fr.phased.json
  - [ ] Enable prefetch of next-phase TTS during playback → Player optimization (once globally implemented)
  - [ ] QA in index.html: phase texts render, TTS plays, interactions flow → Open index.html?day=120

## Day 121 — Day 121
- Slug: day-121
- Files:
  - Normalized: data/day-121_normalized.json
  - PhaseDNA: data/day-121.en.phased.json, data/day-121.es.phased.json, data/day-121.fr.phased.json
  - TTS jobs: data/tts_jobs/day-121.en.json, data/tts_jobs/day-121.es.json, data/tts_jobs/day-121.fr.json
- Subtasks:
  - [ ] Author normalized DNA source → data/day-121_normalized.json
  - [ ] Generate PhaseDNA v1 (en + clone es/fr) → data/day-121.en|es|fr.phased.json (cmd: node scripts/generate-phased-from-normalized.js --input data/day-121_normalized.json --outbase data/day-121 --lang en --clone-es-fr)
  - [ ] Extract TTS jobs (per-phase narration) for en/es/fr → data/tts_jobs/day-121.en|es|fr.json (cmd: node scripts/extract-tts-jobs.js --slugs day-121 --langs en,es,fr --in data --out data/tts_jobs)
  - [ ] Validate PhaseDNA shape and TTS jobs presence → npm run validate
  - [ ] Ensure day-to-slug resolver loads this lesson in index.html → Update getDNALessonData to include this day or general resolver
  - [ ] Attach minimal avatar cues/moods per phase (optional) → Edit phased JSON: phases[].avatar.cues
  - [ ] Quick review of es/fr clones for obvious issues → data/day-121.es|fr.phased.json
  - [ ] Enable prefetch of next-phase TTS during playback → Player optimization (once globally implemented)
  - [ ] QA in index.html: phase texts render, TTS plays, interactions flow → Open index.html?day=121

## Day 122 — Day 122
- Slug: day-122
- Files:
  - Normalized: data/day-122_normalized.json
  - PhaseDNA: data/day-122.en.phased.json, data/day-122.es.phased.json, data/day-122.fr.phased.json
  - TTS jobs: data/tts_jobs/day-122.en.json, data/tts_jobs/day-122.es.json, data/tts_jobs/day-122.fr.json
- Subtasks:
  - [ ] Author normalized DNA source → data/day-122_normalized.json
  - [ ] Generate PhaseDNA v1 (en + clone es/fr) → data/day-122.en|es|fr.phased.json (cmd: node scripts/generate-phased-from-normalized.js --input data/day-122_normalized.json --outbase data/day-122 --lang en --clone-es-fr)
  - [ ] Extract TTS jobs (per-phase narration) for en/es/fr → data/tts_jobs/day-122.en|es|fr.json (cmd: node scripts/extract-tts-jobs.js --slugs day-122 --langs en,es,fr --in data --out data/tts_jobs)
  - [ ] Validate PhaseDNA shape and TTS jobs presence → npm run validate
  - [ ] Ensure day-to-slug resolver loads this lesson in index.html → Update getDNALessonData to include this day or general resolver
  - [ ] Attach minimal avatar cues/moods per phase (optional) → Edit phased JSON: phases[].avatar.cues
  - [ ] Quick review of es/fr clones for obvious issues → data/day-122.es|fr.phased.json
  - [ ] Enable prefetch of next-phase TTS during playback → Player optimization (once globally implemented)
  - [ ] QA in index.html: phase texts render, TTS plays, interactions flow → Open index.html?day=122

## Day 123 — Day 123
- Slug: day-123
- Files:
  - Normalized: data/day-123_normalized.json
  - PhaseDNA: data/day-123.en.phased.json, data/day-123.es.phased.json, data/day-123.fr.phased.json
  - TTS jobs: data/tts_jobs/day-123.en.json, data/tts_jobs/day-123.es.json, data/tts_jobs/day-123.fr.json
- Subtasks:
  - [ ] Author normalized DNA source → data/day-123_normalized.json
  - [ ] Generate PhaseDNA v1 (en + clone es/fr) → data/day-123.en|es|fr.phased.json (cmd: node scripts/generate-phased-from-normalized.js --input data/day-123_normalized.json --outbase data/day-123 --lang en --clone-es-fr)
  - [ ] Extract TTS jobs (per-phase narration) for en/es/fr → data/tts_jobs/day-123.en|es|fr.json (cmd: node scripts/extract-tts-jobs.js --slugs day-123 --langs en,es,fr --in data --out data/tts_jobs)
  - [ ] Validate PhaseDNA shape and TTS jobs presence → npm run validate
  - [ ] Ensure day-to-slug resolver loads this lesson in index.html → Update getDNALessonData to include this day or general resolver
  - [ ] Attach minimal avatar cues/moods per phase (optional) → Edit phased JSON: phases[].avatar.cues
  - [ ] Quick review of es/fr clones for obvious issues → data/day-123.es|fr.phased.json
  - [ ] Enable prefetch of next-phase TTS during playback → Player optimization (once globally implemented)
  - [ ] QA in index.html: phase texts render, TTS plays, interactions flow → Open index.html?day=123

## Day 124 — Day 124
- Slug: day-124
- Files:
  - Normalized: data/day-124_normalized.json
  - PhaseDNA: data/day-124.en.phased.json, data/day-124.es.phased.json, data/day-124.fr.phased.json
  - TTS jobs: data/tts_jobs/day-124.en.json, data/tts_jobs/day-124.es.json, data/tts_jobs/day-124.fr.json
- Subtasks:
  - [ ] Author normalized DNA source → data/day-124_normalized.json
  - [ ] Generate PhaseDNA v1 (en + clone es/fr) → data/day-124.en|es|fr.phased.json (cmd: node scripts/generate-phased-from-normalized.js --input data/day-124_normalized.json --outbase data/day-124 --lang en --clone-es-fr)
  - [ ] Extract TTS jobs (per-phase narration) for en/es/fr → data/tts_jobs/day-124.en|es|fr.json (cmd: node scripts/extract-tts-jobs.js --slugs day-124 --langs en,es,fr --in data --out data/tts_jobs)
  - [ ] Validate PhaseDNA shape and TTS jobs presence → npm run validate
  - [ ] Ensure day-to-slug resolver loads this lesson in index.html → Update getDNALessonData to include this day or general resolver
  - [ ] Attach minimal avatar cues/moods per phase (optional) → Edit phased JSON: phases[].avatar.cues
  - [ ] Quick review of es/fr clones for obvious issues → data/day-124.es|fr.phased.json
  - [ ] Enable prefetch of next-phase TTS during playback → Player optimization (once globally implemented)
  - [ ] QA in index.html: phase texts render, TTS plays, interactions flow → Open index.html?day=124

## Day 125 — Day 125
- Slug: day-125
- Files:
  - Normalized: data/day-125_normalized.json
  - PhaseDNA: data/day-125.en.phased.json, data/day-125.es.phased.json, data/day-125.fr.phased.json
  - TTS jobs: data/tts_jobs/day-125.en.json, data/tts_jobs/day-125.es.json, data/tts_jobs/day-125.fr.json
- Subtasks:
  - [ ] Author normalized DNA source → data/day-125_normalized.json
  - [ ] Generate PhaseDNA v1 (en + clone es/fr) → data/day-125.en|es|fr.phased.json (cmd: node scripts/generate-phased-from-normalized.js --input data/day-125_normalized.json --outbase data/day-125 --lang en --clone-es-fr)
  - [ ] Extract TTS jobs (per-phase narration) for en/es/fr → data/tts_jobs/day-125.en|es|fr.json (cmd: node scripts/extract-tts-jobs.js --slugs day-125 --langs en,es,fr --in data --out data/tts_jobs)
  - [ ] Validate PhaseDNA shape and TTS jobs presence → npm run validate
  - [ ] Ensure day-to-slug resolver loads this lesson in index.html → Update getDNALessonData to include this day or general resolver
  - [ ] Attach minimal avatar cues/moods per phase (optional) → Edit phased JSON: phases[].avatar.cues
  - [ ] Quick review of es/fr clones for obvious issues → data/day-125.es|fr.phased.json
  - [ ] Enable prefetch of next-phase TTS during playback → Player optimization (once globally implemented)
  - [ ] QA in index.html: phase texts render, TTS plays, interactions flow → Open index.html?day=125

## Day 126 — Day 126
- Slug: day-126
- Files:
  - Normalized: data/day-126_normalized.json
  - PhaseDNA: data/day-126.en.phased.json, data/day-126.es.phased.json, data/day-126.fr.phased.json
  - TTS jobs: data/tts_jobs/day-126.en.json, data/tts_jobs/day-126.es.json, data/tts_jobs/day-126.fr.json
- Subtasks:
  - [ ] Author normalized DNA source → data/day-126_normalized.json
  - [ ] Generate PhaseDNA v1 (en + clone es/fr) → data/day-126.en|es|fr.phased.json (cmd: node scripts/generate-phased-from-normalized.js --input data/day-126_normalized.json --outbase data/day-126 --lang en --clone-es-fr)
  - [ ] Extract TTS jobs (per-phase narration) for en/es/fr → data/tts_jobs/day-126.en|es|fr.json (cmd: node scripts/extract-tts-jobs.js --slugs day-126 --langs en,es,fr --in data --out data/tts_jobs)
  - [ ] Validate PhaseDNA shape and TTS jobs presence → npm run validate
  - [ ] Ensure day-to-slug resolver loads this lesson in index.html → Update getDNALessonData to include this day or general resolver
  - [ ] Attach minimal avatar cues/moods per phase (optional) → Edit phased JSON: phases[].avatar.cues
  - [ ] Quick review of es/fr clones for obvious issues → data/day-126.es|fr.phased.json
  - [ ] Enable prefetch of next-phase TTS during playback → Player optimization (once globally implemented)
  - [ ] QA in index.html: phase texts render, TTS plays, interactions flow → Open index.html?day=126

## Day 127 — Day 127
- Slug: day-127
- Files:
  - Normalized: data/day-127_normalized.json
  - PhaseDNA: data/day-127.en.phased.json, data/day-127.es.phased.json, data/day-127.fr.phased.json
  - TTS jobs: data/tts_jobs/day-127.en.json, data/tts_jobs/day-127.es.json, data/tts_jobs/day-127.fr.json
- Subtasks:
  - [ ] Author normalized DNA source → data/day-127_normalized.json
  - [ ] Generate PhaseDNA v1 (en + clone es/fr) → data/day-127.en|es|fr.phased.json (cmd: node scripts/generate-phased-from-normalized.js --input data/day-127_normalized.json --outbase data/day-127 --lang en --clone-es-fr)
  - [ ] Extract TTS jobs (per-phase narration) for en/es/fr → data/tts_jobs/day-127.en|es|fr.json (cmd: node scripts/extract-tts-jobs.js --slugs day-127 --langs en,es,fr --in data --out data/tts_jobs)
  - [ ] Validate PhaseDNA shape and TTS jobs presence → npm run validate
  - [ ] Ensure day-to-slug resolver loads this lesson in index.html → Update getDNALessonData to include this day or general resolver
  - [ ] Attach minimal avatar cues/moods per phase (optional) → Edit phased JSON: phases[].avatar.cues
  - [ ] Quick review of es/fr clones for obvious issues → data/day-127.es|fr.phased.json
  - [ ] Enable prefetch of next-phase TTS during playback → Player optimization (once globally implemented)
  - [ ] QA in index.html: phase texts render, TTS plays, interactions flow → Open index.html?day=127

## Day 128 — Day 128
- Slug: day-128
- Files:
  - Normalized: data/day-128_normalized.json
  - PhaseDNA: data/day-128.en.phased.json, data/day-128.es.phased.json, data/day-128.fr.phased.json
  - TTS jobs: data/tts_jobs/day-128.en.json, data/tts_jobs/day-128.es.json, data/tts_jobs/day-128.fr.json
- Subtasks:
  - [ ] Author normalized DNA source → data/day-128_normalized.json
  - [ ] Generate PhaseDNA v1 (en + clone es/fr) → data/day-128.en|es|fr.phased.json (cmd: node scripts/generate-phased-from-normalized.js --input data/day-128_normalized.json --outbase data/day-128 --lang en --clone-es-fr)
  - [ ] Extract TTS jobs (per-phase narration) for en/es/fr → data/tts_jobs/day-128.en|es|fr.json (cmd: node scripts/extract-tts-jobs.js --slugs day-128 --langs en,es,fr --in data --out data/tts_jobs)
  - [ ] Validate PhaseDNA shape and TTS jobs presence → npm run validate
  - [ ] Ensure day-to-slug resolver loads this lesson in index.html → Update getDNALessonData to include this day or general resolver
  - [ ] Attach minimal avatar cues/moods per phase (optional) → Edit phased JSON: phases[].avatar.cues
  - [ ] Quick review of es/fr clones for obvious issues → data/day-128.es|fr.phased.json
  - [ ] Enable prefetch of next-phase TTS during playback → Player optimization (once globally implemented)
  - [ ] QA in index.html: phase texts render, TTS plays, interactions flow → Open index.html?day=128

## Day 129 — Day 129
- Slug: day-129
- Files:
  - Normalized: data/day-129_normalized.json
  - PhaseDNA: data/day-129.en.phased.json, data/day-129.es.phased.json, data/day-129.fr.phased.json
  - TTS jobs: data/tts_jobs/day-129.en.json, data/tts_jobs/day-129.es.json, data/tts_jobs/day-129.fr.json
- Subtasks:
  - [ ] Author normalized DNA source → data/day-129_normalized.json
  - [ ] Generate PhaseDNA v1 (en + clone es/fr) → data/day-129.en|es|fr.phased.json (cmd: node scripts/generate-phased-from-normalized.js --input data/day-129_normalized.json --outbase data/day-129 --lang en --clone-es-fr)
  - [ ] Extract TTS jobs (per-phase narration) for en/es/fr → data/tts_jobs/day-129.en|es|fr.json (cmd: node scripts/extract-tts-jobs.js --slugs day-129 --langs en,es,fr --in data --out data/tts_jobs)
  - [ ] Validate PhaseDNA shape and TTS jobs presence → npm run validate
  - [ ] Ensure day-to-slug resolver loads this lesson in index.html → Update getDNALessonData to include this day or general resolver
  - [ ] Attach minimal avatar cues/moods per phase (optional) → Edit phased JSON: phases[].avatar.cues
  - [ ] Quick review of es/fr clones for obvious issues → data/day-129.es|fr.phased.json
  - [ ] Enable prefetch of next-phase TTS during playback → Player optimization (once globally implemented)
  - [ ] QA in index.html: phase texts render, TTS plays, interactions flow → Open index.html?day=129

## Day 130 — Day 130
- Slug: day-130
- Files:
  - Normalized: data/day-130_normalized.json
  - PhaseDNA: data/day-130.en.phased.json, data/day-130.es.phased.json, data/day-130.fr.phased.json
  - TTS jobs: data/tts_jobs/day-130.en.json, data/tts_jobs/day-130.es.json, data/tts_jobs/day-130.fr.json
- Subtasks:
  - [ ] Author normalized DNA source → data/day-130_normalized.json
  - [ ] Generate PhaseDNA v1 (en + clone es/fr) → data/day-130.en|es|fr.phased.json (cmd: node scripts/generate-phased-from-normalized.js --input data/day-130_normalized.json --outbase data/day-130 --lang en --clone-es-fr)
  - [ ] Extract TTS jobs (per-phase narration) for en/es/fr → data/tts_jobs/day-130.en|es|fr.json (cmd: node scripts/extract-tts-jobs.js --slugs day-130 --langs en,es,fr --in data --out data/tts_jobs)
  - [ ] Validate PhaseDNA shape and TTS jobs presence → npm run validate
  - [ ] Ensure day-to-slug resolver loads this lesson in index.html → Update getDNALessonData to include this day or general resolver
  - [ ] Attach minimal avatar cues/moods per phase (optional) → Edit phased JSON: phases[].avatar.cues
  - [ ] Quick review of es/fr clones for obvious issues → data/day-130.es|fr.phased.json
  - [ ] Enable prefetch of next-phase TTS during playback → Player optimization (once globally implemented)
  - [ ] QA in index.html: phase texts render, TTS plays, interactions flow → Open index.html?day=130

## Day 131 — Day 131
- Slug: day-131
- Files:
  - Normalized: data/day-131_normalized.json
  - PhaseDNA: data/day-131.en.phased.json, data/day-131.es.phased.json, data/day-131.fr.phased.json
  - TTS jobs: data/tts_jobs/day-131.en.json, data/tts_jobs/day-131.es.json, data/tts_jobs/day-131.fr.json
- Subtasks:
  - [ ] Author normalized DNA source → data/day-131_normalized.json
  - [ ] Generate PhaseDNA v1 (en + clone es/fr) → data/day-131.en|es|fr.phased.json (cmd: node scripts/generate-phased-from-normalized.js --input data/day-131_normalized.json --outbase data/day-131 --lang en --clone-es-fr)
  - [ ] Extract TTS jobs (per-phase narration) for en/es/fr → data/tts_jobs/day-131.en|es|fr.json (cmd: node scripts/extract-tts-jobs.js --slugs day-131 --langs en,es,fr --in data --out data/tts_jobs)
  - [ ] Validate PhaseDNA shape and TTS jobs presence → npm run validate
  - [ ] Ensure day-to-slug resolver loads this lesson in index.html → Update getDNALessonData to include this day or general resolver
  - [ ] Attach minimal avatar cues/moods per phase (optional) → Edit phased JSON: phases[].avatar.cues
  - [ ] Quick review of es/fr clones for obvious issues → data/day-131.es|fr.phased.json
  - [ ] Enable prefetch of next-phase TTS during playback → Player optimization (once globally implemented)
  - [ ] QA in index.html: phase texts render, TTS plays, interactions flow → Open index.html?day=131

## Day 132 — Day 132
- Slug: day-132
- Files:
  - Normalized: data/day-132_normalized.json
  - PhaseDNA: data/day-132.en.phased.json, data/day-132.es.phased.json, data/day-132.fr.phased.json
  - TTS jobs: data/tts_jobs/day-132.en.json, data/tts_jobs/day-132.es.json, data/tts_jobs/day-132.fr.json
- Subtasks:
  - [ ] Author normalized DNA source → data/day-132_normalized.json
  - [ ] Generate PhaseDNA v1 (en + clone es/fr) → data/day-132.en|es|fr.phased.json (cmd: node scripts/generate-phased-from-normalized.js --input data/day-132_normalized.json --outbase data/day-132 --lang en --clone-es-fr)
  - [ ] Extract TTS jobs (per-phase narration) for en/es/fr → data/tts_jobs/day-132.en|es|fr.json (cmd: node scripts/extract-tts-jobs.js --slugs day-132 --langs en,es,fr --in data --out data/tts_jobs)
  - [ ] Validate PhaseDNA shape and TTS jobs presence → npm run validate
  - [ ] Ensure day-to-slug resolver loads this lesson in index.html → Update getDNALessonData to include this day or general resolver
  - [ ] Attach minimal avatar cues/moods per phase (optional) → Edit phased JSON: phases[].avatar.cues
  - [ ] Quick review of es/fr clones for obvious issues → data/day-132.es|fr.phased.json
  - [ ] Enable prefetch of next-phase TTS during playback → Player optimization (once globally implemented)
  - [ ] QA in index.html: phase texts render, TTS plays, interactions flow → Open index.html?day=132

## Day 133 — Day 133
- Slug: day-133
- Files:
  - Normalized: data/day-133_normalized.json
  - PhaseDNA: data/day-133.en.phased.json, data/day-133.es.phased.json, data/day-133.fr.phased.json
  - TTS jobs: data/tts_jobs/day-133.en.json, data/tts_jobs/day-133.es.json, data/tts_jobs/day-133.fr.json
- Subtasks:
  - [ ] Author normalized DNA source → data/day-133_normalized.json
  - [ ] Generate PhaseDNA v1 (en + clone es/fr) → data/day-133.en|es|fr.phased.json (cmd: node scripts/generate-phased-from-normalized.js --input data/day-133_normalized.json --outbase data/day-133 --lang en --clone-es-fr)
  - [ ] Extract TTS jobs (per-phase narration) for en/es/fr → data/tts_jobs/day-133.en|es|fr.json (cmd: node scripts/extract-tts-jobs.js --slugs day-133 --langs en,es,fr --in data --out data/tts_jobs)
  - [ ] Validate PhaseDNA shape and TTS jobs presence → npm run validate
  - [ ] Ensure day-to-slug resolver loads this lesson in index.html → Update getDNALessonData to include this day or general resolver
  - [ ] Attach minimal avatar cues/moods per phase (optional) → Edit phased JSON: phases[].avatar.cues
  - [ ] Quick review of es/fr clones for obvious issues → data/day-133.es|fr.phased.json
  - [ ] Enable prefetch of next-phase TTS during playback → Player optimization (once globally implemented)
  - [ ] QA in index.html: phase texts render, TTS plays, interactions flow → Open index.html?day=133

## Day 134 — Day 134
- Slug: day-134
- Files:
  - Normalized: data/day-134_normalized.json
  - PhaseDNA: data/day-134.en.phased.json, data/day-134.es.phased.json, data/day-134.fr.phased.json
  - TTS jobs: data/tts_jobs/day-134.en.json, data/tts_jobs/day-134.es.json, data/tts_jobs/day-134.fr.json
- Subtasks:
  - [ ] Author normalized DNA source → data/day-134_normalized.json
  - [ ] Generate PhaseDNA v1 (en + clone es/fr) → data/day-134.en|es|fr.phased.json (cmd: node scripts/generate-phased-from-normalized.js --input data/day-134_normalized.json --outbase data/day-134 --lang en --clone-es-fr)
  - [ ] Extract TTS jobs (per-phase narration) for en/es/fr → data/tts_jobs/day-134.en|es|fr.json (cmd: node scripts/extract-tts-jobs.js --slugs day-134 --langs en,es,fr --in data --out data/tts_jobs)
  - [ ] Validate PhaseDNA shape and TTS jobs presence → npm run validate
  - [ ] Ensure day-to-slug resolver loads this lesson in index.html → Update getDNALessonData to include this day or general resolver
  - [ ] Attach minimal avatar cues/moods per phase (optional) → Edit phased JSON: phases[].avatar.cues
  - [ ] Quick review of es/fr clones for obvious issues → data/day-134.es|fr.phased.json
  - [ ] Enable prefetch of next-phase TTS during playback → Player optimization (once globally implemented)
  - [ ] QA in index.html: phase texts render, TTS plays, interactions flow → Open index.html?day=134

## Day 135 — Day 135
- Slug: day-135
- Files:
  - Normalized: data/day-135_normalized.json
  - PhaseDNA: data/day-135.en.phased.json, data/day-135.es.phased.json, data/day-135.fr.phased.json
  - TTS jobs: data/tts_jobs/day-135.en.json, data/tts_jobs/day-135.es.json, data/tts_jobs/day-135.fr.json
- Subtasks:
  - [ ] Author normalized DNA source → data/day-135_normalized.json
  - [ ] Generate PhaseDNA v1 (en + clone es/fr) → data/day-135.en|es|fr.phased.json (cmd: node scripts/generate-phased-from-normalized.js --input data/day-135_normalized.json --outbase data/day-135 --lang en --clone-es-fr)
  - [ ] Extract TTS jobs (per-phase narration) for en/es/fr → data/tts_jobs/day-135.en|es|fr.json (cmd: node scripts/extract-tts-jobs.js --slugs day-135 --langs en,es,fr --in data --out data/tts_jobs)
  - [ ] Validate PhaseDNA shape and TTS jobs presence → npm run validate
  - [ ] Ensure day-to-slug resolver loads this lesson in index.html → Update getDNALessonData to include this day or general resolver
  - [ ] Attach minimal avatar cues/moods per phase (optional) → Edit phased JSON: phases[].avatar.cues
  - [ ] Quick review of es/fr clones for obvious issues → data/day-135.es|fr.phased.json
  - [ ] Enable prefetch of next-phase TTS during playback → Player optimization (once globally implemented)
  - [ ] QA in index.html: phase texts render, TTS plays, interactions flow → Open index.html?day=135

## Day 136 — Day 136
- Slug: day-136
- Files:
  - Normalized: data/day-136_normalized.json
  - PhaseDNA: data/day-136.en.phased.json, data/day-136.es.phased.json, data/day-136.fr.phased.json
  - TTS jobs: data/tts_jobs/day-136.en.json, data/tts_jobs/day-136.es.json, data/tts_jobs/day-136.fr.json
- Subtasks:
  - [ ] Author normalized DNA source → data/day-136_normalized.json
  - [ ] Generate PhaseDNA v1 (en + clone es/fr) → data/day-136.en|es|fr.phased.json (cmd: node scripts/generate-phased-from-normalized.js --input data/day-136_normalized.json --outbase data/day-136 --lang en --clone-es-fr)
  - [ ] Extract TTS jobs (per-phase narration) for en/es/fr → data/tts_jobs/day-136.en|es|fr.json (cmd: node scripts/extract-tts-jobs.js --slugs day-136 --langs en,es,fr --in data --out data/tts_jobs)
  - [ ] Validate PhaseDNA shape and TTS jobs presence → npm run validate
  - [ ] Ensure day-to-slug resolver loads this lesson in index.html → Update getDNALessonData to include this day or general resolver
  - [ ] Attach minimal avatar cues/moods per phase (optional) → Edit phased JSON: phases[].avatar.cues
  - [ ] Quick review of es/fr clones for obvious issues → data/day-136.es|fr.phased.json
  - [ ] Enable prefetch of next-phase TTS during playback → Player optimization (once globally implemented)
  - [ ] QA in index.html: phase texts render, TTS plays, interactions flow → Open index.html?day=136

## Day 137 — Day 137
- Slug: day-137
- Files:
  - Normalized: data/day-137_normalized.json
  - PhaseDNA: data/day-137.en.phased.json, data/day-137.es.phased.json, data/day-137.fr.phased.json
  - TTS jobs: data/tts_jobs/day-137.en.json, data/tts_jobs/day-137.es.json, data/tts_jobs/day-137.fr.json
- Subtasks:
  - [ ] Author normalized DNA source → data/day-137_normalized.json
  - [ ] Generate PhaseDNA v1 (en + clone es/fr) → data/day-137.en|es|fr.phased.json (cmd: node scripts/generate-phased-from-normalized.js --input data/day-137_normalized.json --outbase data/day-137 --lang en --clone-es-fr)
  - [ ] Extract TTS jobs (per-phase narration) for en/es/fr → data/tts_jobs/day-137.en|es|fr.json (cmd: node scripts/extract-tts-jobs.js --slugs day-137 --langs en,es,fr --in data --out data/tts_jobs)
  - [ ] Validate PhaseDNA shape and TTS jobs presence → npm run validate
  - [ ] Ensure day-to-slug resolver loads this lesson in index.html → Update getDNALessonData to include this day or general resolver
  - [ ] Attach minimal avatar cues/moods per phase (optional) → Edit phased JSON: phases[].avatar.cues
  - [ ] Quick review of es/fr clones for obvious issues → data/day-137.es|fr.phased.json
  - [ ] Enable prefetch of next-phase TTS during playback → Player optimization (once globally implemented)
  - [ ] QA in index.html: phase texts render, TTS plays, interactions flow → Open index.html?day=137

## Day 138 — Day 138
- Slug: day-138
- Files:
  - Normalized: data/day-138_normalized.json
  - PhaseDNA: data/day-138.en.phased.json, data/day-138.es.phased.json, data/day-138.fr.phased.json
  - TTS jobs: data/tts_jobs/day-138.en.json, data/tts_jobs/day-138.es.json, data/tts_jobs/day-138.fr.json
- Subtasks:
  - [ ] Author normalized DNA source → data/day-138_normalized.json
  - [ ] Generate PhaseDNA v1 (en + clone es/fr) → data/day-138.en|es|fr.phased.json (cmd: node scripts/generate-phased-from-normalized.js --input data/day-138_normalized.json --outbase data/day-138 --lang en --clone-es-fr)
  - [ ] Extract TTS jobs (per-phase narration) for en/es/fr → data/tts_jobs/day-138.en|es|fr.json (cmd: node scripts/extract-tts-jobs.js --slugs day-138 --langs en,es,fr --in data --out data/tts_jobs)
  - [ ] Validate PhaseDNA shape and TTS jobs presence → npm run validate
  - [ ] Ensure day-to-slug resolver loads this lesson in index.html → Update getDNALessonData to include this day or general resolver
  - [ ] Attach minimal avatar cues/moods per phase (optional) → Edit phased JSON: phases[].avatar.cues
  - [ ] Quick review of es/fr clones for obvious issues → data/day-138.es|fr.phased.json
  - [ ] Enable prefetch of next-phase TTS during playback → Player optimization (once globally implemented)
  - [ ] QA in index.html: phase texts render, TTS plays, interactions flow → Open index.html?day=138

## Day 139 — Day 139
- Slug: day-139
- Files:
  - Normalized: data/day-139_normalized.json
  - PhaseDNA: data/day-139.en.phased.json, data/day-139.es.phased.json, data/day-139.fr.phased.json
  - TTS jobs: data/tts_jobs/day-139.en.json, data/tts_jobs/day-139.es.json, data/tts_jobs/day-139.fr.json
- Subtasks:
  - [ ] Author normalized DNA source → data/day-139_normalized.json
  - [ ] Generate PhaseDNA v1 (en + clone es/fr) → data/day-139.en|es|fr.phased.json (cmd: node scripts/generate-phased-from-normalized.js --input data/day-139_normalized.json --outbase data/day-139 --lang en --clone-es-fr)
  - [ ] Extract TTS jobs (per-phase narration) for en/es/fr → data/tts_jobs/day-139.en|es|fr.json (cmd: node scripts/extract-tts-jobs.js --slugs day-139 --langs en,es,fr --in data --out data/tts_jobs)
  - [ ] Validate PhaseDNA shape and TTS jobs presence → npm run validate
  - [ ] Ensure day-to-slug resolver loads this lesson in index.html → Update getDNALessonData to include this day or general resolver
  - [ ] Attach minimal avatar cues/moods per phase (optional) → Edit phased JSON: phases[].avatar.cues
  - [ ] Quick review of es/fr clones for obvious issues → data/day-139.es|fr.phased.json
  - [ ] Enable prefetch of next-phase TTS during playback → Player optimization (once globally implemented)
  - [ ] QA in index.html: phase texts render, TTS plays, interactions flow → Open index.html?day=139

## Day 140 — Day 140
- Slug: day-140
- Files:
  - Normalized: data/day-140_normalized.json
  - PhaseDNA: data/day-140.en.phased.json, data/day-140.es.phased.json, data/day-140.fr.phased.json
  - TTS jobs: data/tts_jobs/day-140.en.json, data/tts_jobs/day-140.es.json, data/tts_jobs/day-140.fr.json
- Subtasks:
  - [ ] Author normalized DNA source → data/day-140_normalized.json
  - [ ] Generate PhaseDNA v1 (en + clone es/fr) → data/day-140.en|es|fr.phased.json (cmd: node scripts/generate-phased-from-normalized.js --input data/day-140_normalized.json --outbase data/day-140 --lang en --clone-es-fr)
  - [ ] Extract TTS jobs (per-phase narration) for en/es/fr → data/tts_jobs/day-140.en|es|fr.json (cmd: node scripts/extract-tts-jobs.js --slugs day-140 --langs en,es,fr --in data --out data/tts_jobs)
  - [ ] Validate PhaseDNA shape and TTS jobs presence → npm run validate
  - [ ] Ensure day-to-slug resolver loads this lesson in index.html → Update getDNALessonData to include this day or general resolver
  - [ ] Attach minimal avatar cues/moods per phase (optional) → Edit phased JSON: phases[].avatar.cues
  - [ ] Quick review of es/fr clones for obvious issues → data/day-140.es|fr.phased.json
  - [ ] Enable prefetch of next-phase TTS during playback → Player optimization (once globally implemented)
  - [ ] QA in index.html: phase texts render, TTS plays, interactions flow → Open index.html?day=140

## Day 141 — Day 141
- Slug: day-141
- Files:
  - Normalized: data/day-141_normalized.json
  - PhaseDNA: data/day-141.en.phased.json, data/day-141.es.phased.json, data/day-141.fr.phased.json
  - TTS jobs: data/tts_jobs/day-141.en.json, data/tts_jobs/day-141.es.json, data/tts_jobs/day-141.fr.json
- Subtasks:
  - [ ] Author normalized DNA source → data/day-141_normalized.json
  - [ ] Generate PhaseDNA v1 (en + clone es/fr) → data/day-141.en|es|fr.phased.json (cmd: node scripts/generate-phased-from-normalized.js --input data/day-141_normalized.json --outbase data/day-141 --lang en --clone-es-fr)
  - [ ] Extract TTS jobs (per-phase narration) for en/es/fr → data/tts_jobs/day-141.en|es|fr.json (cmd: node scripts/extract-tts-jobs.js --slugs day-141 --langs en,es,fr --in data --out data/tts_jobs)
  - [ ] Validate PhaseDNA shape and TTS jobs presence → npm run validate
  - [ ] Ensure day-to-slug resolver loads this lesson in index.html → Update getDNALessonData to include this day or general resolver
  - [ ] Attach minimal avatar cues/moods per phase (optional) → Edit phased JSON: phases[].avatar.cues
  - [ ] Quick review of es/fr clones for obvious issues → data/day-141.es|fr.phased.json
  - [ ] Enable prefetch of next-phase TTS during playback → Player optimization (once globally implemented)
  - [ ] QA in index.html: phase texts render, TTS plays, interactions flow → Open index.html?day=141

## Day 142 — Day 142
- Slug: day-142
- Files:
  - Normalized: data/day-142_normalized.json
  - PhaseDNA: data/day-142.en.phased.json, data/day-142.es.phased.json, data/day-142.fr.phased.json
  - TTS jobs: data/tts_jobs/day-142.en.json, data/tts_jobs/day-142.es.json, data/tts_jobs/day-142.fr.json
- Subtasks:
  - [ ] Author normalized DNA source → data/day-142_normalized.json
  - [ ] Generate PhaseDNA v1 (en + clone es/fr) → data/day-142.en|es|fr.phased.json (cmd: node scripts/generate-phased-from-normalized.js --input data/day-142_normalized.json --outbase data/day-142 --lang en --clone-es-fr)
  - [ ] Extract TTS jobs (per-phase narration) for en/es/fr → data/tts_jobs/day-142.en|es|fr.json (cmd: node scripts/extract-tts-jobs.js --slugs day-142 --langs en,es,fr --in data --out data/tts_jobs)
  - [ ] Validate PhaseDNA shape and TTS jobs presence → npm run validate
  - [ ] Ensure day-to-slug resolver loads this lesson in index.html → Update getDNALessonData to include this day or general resolver
  - [ ] Attach minimal avatar cues/moods per phase (optional) → Edit phased JSON: phases[].avatar.cues
  - [ ] Quick review of es/fr clones for obvious issues → data/day-142.es|fr.phased.json
  - [ ] Enable prefetch of next-phase TTS during playback → Player optimization (once globally implemented)
  - [ ] QA in index.html: phase texts render, TTS plays, interactions flow → Open index.html?day=142

## Day 143 — Day 143
- Slug: day-143
- Files:
  - Normalized: data/day-143_normalized.json
  - PhaseDNA: data/day-143.en.phased.json, data/day-143.es.phased.json, data/day-143.fr.phased.json
  - TTS jobs: data/tts_jobs/day-143.en.json, data/tts_jobs/day-143.es.json, data/tts_jobs/day-143.fr.json
- Subtasks:
  - [ ] Author normalized DNA source → data/day-143_normalized.json
  - [ ] Generate PhaseDNA v1 (en + clone es/fr) → data/day-143.en|es|fr.phased.json (cmd: node scripts/generate-phased-from-normalized.js --input data/day-143_normalized.json --outbase data/day-143 --lang en --clone-es-fr)
  - [ ] Extract TTS jobs (per-phase narration) for en/es/fr → data/tts_jobs/day-143.en|es|fr.json (cmd: node scripts/extract-tts-jobs.js --slugs day-143 --langs en,es,fr --in data --out data/tts_jobs)
  - [ ] Validate PhaseDNA shape and TTS jobs presence → npm run validate
  - [ ] Ensure day-to-slug resolver loads this lesson in index.html → Update getDNALessonData to include this day or general resolver
  - [ ] Attach minimal avatar cues/moods per phase (optional) → Edit phased JSON: phases[].avatar.cues
  - [ ] Quick review of es/fr clones for obvious issues → data/day-143.es|fr.phased.json
  - [ ] Enable prefetch of next-phase TTS during playback → Player optimization (once globally implemented)
  - [ ] QA in index.html: phase texts render, TTS plays, interactions flow → Open index.html?day=143

## Day 144 — Day 144
- Slug: day-144
- Files:
  - Normalized: data/day-144_normalized.json
  - PhaseDNA: data/day-144.en.phased.json, data/day-144.es.phased.json, data/day-144.fr.phased.json
  - TTS jobs: data/tts_jobs/day-144.en.json, data/tts_jobs/day-144.es.json, data/tts_jobs/day-144.fr.json
- Subtasks:
  - [ ] Author normalized DNA source → data/day-144_normalized.json
  - [ ] Generate PhaseDNA v1 (en + clone es/fr) → data/day-144.en|es|fr.phased.json (cmd: node scripts/generate-phased-from-normalized.js --input data/day-144_normalized.json --outbase data/day-144 --lang en --clone-es-fr)
  - [ ] Extract TTS jobs (per-phase narration) for en/es/fr → data/tts_jobs/day-144.en|es|fr.json (cmd: node scripts/extract-tts-jobs.js --slugs day-144 --langs en,es,fr --in data --out data/tts_jobs)
  - [ ] Validate PhaseDNA shape and TTS jobs presence → npm run validate
  - [ ] Ensure day-to-slug resolver loads this lesson in index.html → Update getDNALessonData to include this day or general resolver
  - [ ] Attach minimal avatar cues/moods per phase (optional) → Edit phased JSON: phases[].avatar.cues
  - [ ] Quick review of es/fr clones for obvious issues → data/day-144.es|fr.phased.json
  - [ ] Enable prefetch of next-phase TTS during playback → Player optimization (once globally implemented)
  - [ ] QA in index.html: phase texts render, TTS plays, interactions flow → Open index.html?day=144

## Day 145 — Day 145
- Slug: day-145
- Files:
  - Normalized: data/day-145_normalized.json
  - PhaseDNA: data/day-145.en.phased.json, data/day-145.es.phased.json, data/day-145.fr.phased.json
  - TTS jobs: data/tts_jobs/day-145.en.json, data/tts_jobs/day-145.es.json, data/tts_jobs/day-145.fr.json
- Subtasks:
  - [ ] Author normalized DNA source → data/day-145_normalized.json
  - [ ] Generate PhaseDNA v1 (en + clone es/fr) → data/day-145.en|es|fr.phased.json (cmd: node scripts/generate-phased-from-normalized.js --input data/day-145_normalized.json --outbase data/day-145 --lang en --clone-es-fr)
  - [ ] Extract TTS jobs (per-phase narration) for en/es/fr → data/tts_jobs/day-145.en|es|fr.json (cmd: node scripts/extract-tts-jobs.js --slugs day-145 --langs en,es,fr --in data --out data/tts_jobs)
  - [ ] Validate PhaseDNA shape and TTS jobs presence → npm run validate
  - [ ] Ensure day-to-slug resolver loads this lesson in index.html → Update getDNALessonData to include this day or general resolver
  - [ ] Attach minimal avatar cues/moods per phase (optional) → Edit phased JSON: phases[].avatar.cues
  - [ ] Quick review of es/fr clones for obvious issues → data/day-145.es|fr.phased.json
  - [ ] Enable prefetch of next-phase TTS during playback → Player optimization (once globally implemented)
  - [ ] QA in index.html: phase texts render, TTS plays, interactions flow → Open index.html?day=145

## Day 146 — Day 146
- Slug: day-146
- Files:
  - Normalized: data/day-146_normalized.json
  - PhaseDNA: data/day-146.en.phased.json, data/day-146.es.phased.json, data/day-146.fr.phased.json
  - TTS jobs: data/tts_jobs/day-146.en.json, data/tts_jobs/day-146.es.json, data/tts_jobs/day-146.fr.json
- Subtasks:
  - [ ] Author normalized DNA source → data/day-146_normalized.json
  - [ ] Generate PhaseDNA v1 (en + clone es/fr) → data/day-146.en|es|fr.phased.json (cmd: node scripts/generate-phased-from-normalized.js --input data/day-146_normalized.json --outbase data/day-146 --lang en --clone-es-fr)
  - [ ] Extract TTS jobs (per-phase narration) for en/es/fr → data/tts_jobs/day-146.en|es|fr.json (cmd: node scripts/extract-tts-jobs.js --slugs day-146 --langs en,es,fr --in data --out data/tts_jobs)
  - [ ] Validate PhaseDNA shape and TTS jobs presence → npm run validate
  - [ ] Ensure day-to-slug resolver loads this lesson in index.html → Update getDNALessonData to include this day or general resolver
  - [ ] Attach minimal avatar cues/moods per phase (optional) → Edit phased JSON: phases[].avatar.cues
  - [ ] Quick review of es/fr clones for obvious issues → data/day-146.es|fr.phased.json
  - [ ] Enable prefetch of next-phase TTS during playback → Player optimization (once globally implemented)
  - [ ] QA in index.html: phase texts render, TTS plays, interactions flow → Open index.html?day=146

## Day 147 — Day 147
- Slug: day-147
- Files:
  - Normalized: data/day-147_normalized.json
  - PhaseDNA: data/day-147.en.phased.json, data/day-147.es.phased.json, data/day-147.fr.phased.json
  - TTS jobs: data/tts_jobs/day-147.en.json, data/tts_jobs/day-147.es.json, data/tts_jobs/day-147.fr.json
- Subtasks:
  - [ ] Author normalized DNA source → data/day-147_normalized.json
  - [ ] Generate PhaseDNA v1 (en + clone es/fr) → data/day-147.en|es|fr.phased.json (cmd: node scripts/generate-phased-from-normalized.js --input data/day-147_normalized.json --outbase data/day-147 --lang en --clone-es-fr)
  - [ ] Extract TTS jobs (per-phase narration) for en/es/fr → data/tts_jobs/day-147.en|es|fr.json (cmd: node scripts/extract-tts-jobs.js --slugs day-147 --langs en,es,fr --in data --out data/tts_jobs)
  - [ ] Validate PhaseDNA shape and TTS jobs presence → npm run validate
  - [ ] Ensure day-to-slug resolver loads this lesson in index.html → Update getDNALessonData to include this day or general resolver
  - [ ] Attach minimal avatar cues/moods per phase (optional) → Edit phased JSON: phases[].avatar.cues
  - [ ] Quick review of es/fr clones for obvious issues → data/day-147.es|fr.phased.json
  - [ ] Enable prefetch of next-phase TTS during playback → Player optimization (once globally implemented)
  - [ ] QA in index.html: phase texts render, TTS plays, interactions flow → Open index.html?day=147

## Day 148 — Day 148
- Slug: day-148
- Files:
  - Normalized: data/day-148_normalized.json
  - PhaseDNA: data/day-148.en.phased.json, data/day-148.es.phased.json, data/day-148.fr.phased.json
  - TTS jobs: data/tts_jobs/day-148.en.json, data/tts_jobs/day-148.es.json, data/tts_jobs/day-148.fr.json
- Subtasks:
  - [ ] Author normalized DNA source → data/day-148_normalized.json
  - [ ] Generate PhaseDNA v1 (en + clone es/fr) → data/day-148.en|es|fr.phased.json (cmd: node scripts/generate-phased-from-normalized.js --input data/day-148_normalized.json --outbase data/day-148 --lang en --clone-es-fr)
  - [ ] Extract TTS jobs (per-phase narration) for en/es/fr → data/tts_jobs/day-148.en|es|fr.json (cmd: node scripts/extract-tts-jobs.js --slugs day-148 --langs en,es,fr --in data --out data/tts_jobs)
  - [ ] Validate PhaseDNA shape and TTS jobs presence → npm run validate
  - [ ] Ensure day-to-slug resolver loads this lesson in index.html → Update getDNALessonData to include this day or general resolver
  - [ ] Attach minimal avatar cues/moods per phase (optional) → Edit phased JSON: phases[].avatar.cues
  - [ ] Quick review of es/fr clones for obvious issues → data/day-148.es|fr.phased.json
  - [ ] Enable prefetch of next-phase TTS during playback → Player optimization (once globally implemented)
  - [ ] QA in index.html: phase texts render, TTS plays, interactions flow → Open index.html?day=148

## Day 149 — Day 149
- Slug: day-149
- Files:
  - Normalized: data/day-149_normalized.json
  - PhaseDNA: data/day-149.en.phased.json, data/day-149.es.phased.json, data/day-149.fr.phased.json
  - TTS jobs: data/tts_jobs/day-149.en.json, data/tts_jobs/day-149.es.json, data/tts_jobs/day-149.fr.json
- Subtasks:
  - [ ] Author normalized DNA source → data/day-149_normalized.json
  - [ ] Generate PhaseDNA v1 (en + clone es/fr) → data/day-149.en|es|fr.phased.json (cmd: node scripts/generate-phased-from-normalized.js --input data/day-149_normalized.json --outbase data/day-149 --lang en --clone-es-fr)
  - [ ] Extract TTS jobs (per-phase narration) for en/es/fr → data/tts_jobs/day-149.en|es|fr.json (cmd: node scripts/extract-tts-jobs.js --slugs day-149 --langs en,es,fr --in data --out data/tts_jobs)
  - [ ] Validate PhaseDNA shape and TTS jobs presence → npm run validate
  - [ ] Ensure day-to-slug resolver loads this lesson in index.html → Update getDNALessonData to include this day or general resolver
  - [ ] Attach minimal avatar cues/moods per phase (optional) → Edit phased JSON: phases[].avatar.cues
  - [ ] Quick review of es/fr clones for obvious issues → data/day-149.es|fr.phased.json
  - [ ] Enable prefetch of next-phase TTS during playback → Player optimization (once globally implemented)
  - [ ] QA in index.html: phase texts render, TTS plays, interactions flow → Open index.html?day=149

## Day 150 — Day 150
- Slug: day-150
- Files:
  - Normalized: data/day-150_normalized.json
  - PhaseDNA: data/day-150.en.phased.json, data/day-150.es.phased.json, data/day-150.fr.phased.json
  - TTS jobs: data/tts_jobs/day-150.en.json, data/tts_jobs/day-150.es.json, data/tts_jobs/day-150.fr.json
- Subtasks:
  - [ ] Author normalized DNA source → data/day-150_normalized.json
  - [ ] Generate PhaseDNA v1 (en + clone es/fr) → data/day-150.en|es|fr.phased.json (cmd: node scripts/generate-phased-from-normalized.js --input data/day-150_normalized.json --outbase data/day-150 --lang en --clone-es-fr)
  - [ ] Extract TTS jobs (per-phase narration) for en/es/fr → data/tts_jobs/day-150.en|es|fr.json (cmd: node scripts/extract-tts-jobs.js --slugs day-150 --langs en,es,fr --in data --out data/tts_jobs)
  - [ ] Validate PhaseDNA shape and TTS jobs presence → npm run validate
  - [ ] Ensure day-to-slug resolver loads this lesson in index.html → Update getDNALessonData to include this day or general resolver
  - [ ] Attach minimal avatar cues/moods per phase (optional) → Edit phased JSON: phases[].avatar.cues
  - [ ] Quick review of es/fr clones for obvious issues → data/day-150.es|fr.phased.json
  - [ ] Enable prefetch of next-phase TTS during playback → Player optimization (once globally implemented)
  - [ ] QA in index.html: phase texts render, TTS plays, interactions flow → Open index.html?day=150

## Day 151 — Day 151
- Slug: day-151
- Files:
  - Normalized: data/day-151_normalized.json
  - PhaseDNA: data/day-151.en.phased.json, data/day-151.es.phased.json, data/day-151.fr.phased.json
  - TTS jobs: data/tts_jobs/day-151.en.json, data/tts_jobs/day-151.es.json, data/tts_jobs/day-151.fr.json
- Subtasks:
  - [ ] Author normalized DNA source → data/day-151_normalized.json
  - [ ] Generate PhaseDNA v1 (en + clone es/fr) → data/day-151.en|es|fr.phased.json (cmd: node scripts/generate-phased-from-normalized.js --input data/day-151_normalized.json --outbase data/day-151 --lang en --clone-es-fr)
  - [ ] Extract TTS jobs (per-phase narration) for en/es/fr → data/tts_jobs/day-151.en|es|fr.json (cmd: node scripts/extract-tts-jobs.js --slugs day-151 --langs en,es,fr --in data --out data/tts_jobs)
  - [ ] Validate PhaseDNA shape and TTS jobs presence → npm run validate
  - [ ] Ensure day-to-slug resolver loads this lesson in index.html → Update getDNALessonData to include this day or general resolver
  - [ ] Attach minimal avatar cues/moods per phase (optional) → Edit phased JSON: phases[].avatar.cues
  - [ ] Quick review of es/fr clones for obvious issues → data/day-151.es|fr.phased.json
  - [ ] Enable prefetch of next-phase TTS during playback → Player optimization (once globally implemented)
  - [ ] QA in index.html: phase texts render, TTS plays, interactions flow → Open index.html?day=151

## Day 152 — Day 152
- Slug: day-152
- Files:
  - Normalized: data/day-152_normalized.json
  - PhaseDNA: data/day-152.en.phased.json, data/day-152.es.phased.json, data/day-152.fr.phased.json
  - TTS jobs: data/tts_jobs/day-152.en.json, data/tts_jobs/day-152.es.json, data/tts_jobs/day-152.fr.json
- Subtasks:
  - [ ] Author normalized DNA source → data/day-152_normalized.json
  - [ ] Generate PhaseDNA v1 (en + clone es/fr) → data/day-152.en|es|fr.phased.json (cmd: node scripts/generate-phased-from-normalized.js --input data/day-152_normalized.json --outbase data/day-152 --lang en --clone-es-fr)
  - [ ] Extract TTS jobs (per-phase narration) for en/es/fr → data/tts_jobs/day-152.en|es|fr.json (cmd: node scripts/extract-tts-jobs.js --slugs day-152 --langs en,es,fr --in data --out data/tts_jobs)
  - [ ] Validate PhaseDNA shape and TTS jobs presence → npm run validate
  - [ ] Ensure day-to-slug resolver loads this lesson in index.html → Update getDNALessonData to include this day or general resolver
  - [ ] Attach minimal avatar cues/moods per phase (optional) → Edit phased JSON: phases[].avatar.cues
  - [ ] Quick review of es/fr clones for obvious issues → data/day-152.es|fr.phased.json
  - [ ] Enable prefetch of next-phase TTS during playback → Player optimization (once globally implemented)
  - [ ] QA in index.html: phase texts render, TTS plays, interactions flow → Open index.html?day=152

## Day 153 — Day 153
- Slug: day-153
- Files:
  - Normalized: data/day-153_normalized.json
  - PhaseDNA: data/day-153.en.phased.json, data/day-153.es.phased.json, data/day-153.fr.phased.json
  - TTS jobs: data/tts_jobs/day-153.en.json, data/tts_jobs/day-153.es.json, data/tts_jobs/day-153.fr.json
- Subtasks:
  - [ ] Author normalized DNA source → data/day-153_normalized.json
  - [ ] Generate PhaseDNA v1 (en + clone es/fr) → data/day-153.en|es|fr.phased.json (cmd: node scripts/generate-phased-from-normalized.js --input data/day-153_normalized.json --outbase data/day-153 --lang en --clone-es-fr)
  - [ ] Extract TTS jobs (per-phase narration) for en/es/fr → data/tts_jobs/day-153.en|es|fr.json (cmd: node scripts/extract-tts-jobs.js --slugs day-153 --langs en,es,fr --in data --out data/tts_jobs)
  - [ ] Validate PhaseDNA shape and TTS jobs presence → npm run validate
  - [ ] Ensure day-to-slug resolver loads this lesson in index.html → Update getDNALessonData to include this day or general resolver
  - [ ] Attach minimal avatar cues/moods per phase (optional) → Edit phased JSON: phases[].avatar.cues
  - [ ] Quick review of es/fr clones for obvious issues → data/day-153.es|fr.phased.json
  - [ ] Enable prefetch of next-phase TTS during playback → Player optimization (once globally implemented)
  - [ ] QA in index.html: phase texts render, TTS plays, interactions flow → Open index.html?day=153

## Day 154 — Day 154
- Slug: day-154
- Files:
  - Normalized: data/day-154_normalized.json
  - PhaseDNA: data/day-154.en.phased.json, data/day-154.es.phased.json, data/day-154.fr.phased.json
  - TTS jobs: data/tts_jobs/day-154.en.json, data/tts_jobs/day-154.es.json, data/tts_jobs/day-154.fr.json
- Subtasks:
  - [ ] Author normalized DNA source → data/day-154_normalized.json
  - [ ] Generate PhaseDNA v1 (en + clone es/fr) → data/day-154.en|es|fr.phased.json (cmd: node scripts/generate-phased-from-normalized.js --input data/day-154_normalized.json --outbase data/day-154 --lang en --clone-es-fr)
  - [ ] Extract TTS jobs (per-phase narration) for en/es/fr → data/tts_jobs/day-154.en|es|fr.json (cmd: node scripts/extract-tts-jobs.js --slugs day-154 --langs en,es,fr --in data --out data/tts_jobs)
  - [ ] Validate PhaseDNA shape and TTS jobs presence → npm run validate
  - [ ] Ensure day-to-slug resolver loads this lesson in index.html → Update getDNALessonData to include this day or general resolver
  - [ ] Attach minimal avatar cues/moods per phase (optional) → Edit phased JSON: phases[].avatar.cues
  - [ ] Quick review of es/fr clones for obvious issues → data/day-154.es|fr.phased.json
  - [ ] Enable prefetch of next-phase TTS during playback → Player optimization (once globally implemented)
  - [ ] QA in index.html: phase texts render, TTS plays, interactions flow → Open index.html?day=154

## Day 155 — Day 155
- Slug: day-155
- Files:
  - Normalized: data/day-155_normalized.json
  - PhaseDNA: data/day-155.en.phased.json, data/day-155.es.phased.json, data/day-155.fr.phased.json
  - TTS jobs: data/tts_jobs/day-155.en.json, data/tts_jobs/day-155.es.json, data/tts_jobs/day-155.fr.json
- Subtasks:
  - [ ] Author normalized DNA source → data/day-155_normalized.json
  - [ ] Generate PhaseDNA v1 (en + clone es/fr) → data/day-155.en|es|fr.phased.json (cmd: node scripts/generate-phased-from-normalized.js --input data/day-155_normalized.json --outbase data/day-155 --lang en --clone-es-fr)
  - [ ] Extract TTS jobs (per-phase narration) for en/es/fr → data/tts_jobs/day-155.en|es|fr.json (cmd: node scripts/extract-tts-jobs.js --slugs day-155 --langs en,es,fr --in data --out data/tts_jobs)
  - [ ] Validate PhaseDNA shape and TTS jobs presence → npm run validate
  - [ ] Ensure day-to-slug resolver loads this lesson in index.html → Update getDNALessonData to include this day or general resolver
  - [ ] Attach minimal avatar cues/moods per phase (optional) → Edit phased JSON: phases[].avatar.cues
  - [ ] Quick review of es/fr clones for obvious issues → data/day-155.es|fr.phased.json
  - [ ] Enable prefetch of next-phase TTS during playback → Player optimization (once globally implemented)
  - [ ] QA in index.html: phase texts render, TTS plays, interactions flow → Open index.html?day=155

## Day 156 — Day 156
- Slug: day-156
- Files:
  - Normalized: data/day-156_normalized.json
  - PhaseDNA: data/day-156.en.phased.json, data/day-156.es.phased.json, data/day-156.fr.phased.json
  - TTS jobs: data/tts_jobs/day-156.en.json, data/tts_jobs/day-156.es.json, data/tts_jobs/day-156.fr.json
- Subtasks:
  - [ ] Author normalized DNA source → data/day-156_normalized.json
  - [ ] Generate PhaseDNA v1 (en + clone es/fr) → data/day-156.en|es|fr.phased.json (cmd: node scripts/generate-phased-from-normalized.js --input data/day-156_normalized.json --outbase data/day-156 --lang en --clone-es-fr)
  - [ ] Extract TTS jobs (per-phase narration) for en/es/fr → data/tts_jobs/day-156.en|es|fr.json (cmd: node scripts/extract-tts-jobs.js --slugs day-156 --langs en,es,fr --in data --out data/tts_jobs)
  - [ ] Validate PhaseDNA shape and TTS jobs presence → npm run validate
  - [ ] Ensure day-to-slug resolver loads this lesson in index.html → Update getDNALessonData to include this day or general resolver
  - [ ] Attach minimal avatar cues/moods per phase (optional) → Edit phased JSON: phases[].avatar.cues
  - [ ] Quick review of es/fr clones for obvious issues → data/day-156.es|fr.phased.json
  - [ ] Enable prefetch of next-phase TTS during playback → Player optimization (once globally implemented)
  - [ ] QA in index.html: phase texts render, TTS plays, interactions flow → Open index.html?day=156

## Day 157 — Day 157
- Slug: day-157
- Files:
  - Normalized: data/day-157_normalized.json
  - PhaseDNA: data/day-157.en.phased.json, data/day-157.es.phased.json, data/day-157.fr.phased.json
  - TTS jobs: data/tts_jobs/day-157.en.json, data/tts_jobs/day-157.es.json, data/tts_jobs/day-157.fr.json
- Subtasks:
  - [ ] Author normalized DNA source → data/day-157_normalized.json
  - [ ] Generate PhaseDNA v1 (en + clone es/fr) → data/day-157.en|es|fr.phased.json (cmd: node scripts/generate-phased-from-normalized.js --input data/day-157_normalized.json --outbase data/day-157 --lang en --clone-es-fr)
  - [ ] Extract TTS jobs (per-phase narration) for en/es/fr → data/tts_jobs/day-157.en|es|fr.json (cmd: node scripts/extract-tts-jobs.js --slugs day-157 --langs en,es,fr --in data --out data/tts_jobs)
  - [ ] Validate PhaseDNA shape and TTS jobs presence → npm run validate
  - [ ] Ensure day-to-slug resolver loads this lesson in index.html → Update getDNALessonData to include this day or general resolver
  - [ ] Attach minimal avatar cues/moods per phase (optional) → Edit phased JSON: phases[].avatar.cues
  - [ ] Quick review of es/fr clones for obvious issues → data/day-157.es|fr.phased.json
  - [ ] Enable prefetch of next-phase TTS during playback → Player optimization (once globally implemented)
  - [ ] QA in index.html: phase texts render, TTS plays, interactions flow → Open index.html?day=157

## Day 158 — Day 158
- Slug: day-158
- Files:
  - Normalized: data/day-158_normalized.json
  - PhaseDNA: data/day-158.en.phased.json, data/day-158.es.phased.json, data/day-158.fr.phased.json
  - TTS jobs: data/tts_jobs/day-158.en.json, data/tts_jobs/day-158.es.json, data/tts_jobs/day-158.fr.json
- Subtasks:
  - [ ] Author normalized DNA source → data/day-158_normalized.json
  - [ ] Generate PhaseDNA v1 (en + clone es/fr) → data/day-158.en|es|fr.phased.json (cmd: node scripts/generate-phased-from-normalized.js --input data/day-158_normalized.json --outbase data/day-158 --lang en --clone-es-fr)
  - [ ] Extract TTS jobs (per-phase narration) for en/es/fr → data/tts_jobs/day-158.en|es|fr.json (cmd: node scripts/extract-tts-jobs.js --slugs day-158 --langs en,es,fr --in data --out data/tts_jobs)
  - [ ] Validate PhaseDNA shape and TTS jobs presence → npm run validate
  - [ ] Ensure day-to-slug resolver loads this lesson in index.html → Update getDNALessonData to include this day or general resolver
  - [ ] Attach minimal avatar cues/moods per phase (optional) → Edit phased JSON: phases[].avatar.cues
  - [ ] Quick review of es/fr clones for obvious issues → data/day-158.es|fr.phased.json
  - [ ] Enable prefetch of next-phase TTS during playback → Player optimization (once globally implemented)
  - [ ] QA in index.html: phase texts render, TTS plays, interactions flow → Open index.html?day=158

## Day 159 — Day 159
- Slug: day-159
- Files:
  - Normalized: data/day-159_normalized.json
  - PhaseDNA: data/day-159.en.phased.json, data/day-159.es.phased.json, data/day-159.fr.phased.json
  - TTS jobs: data/tts_jobs/day-159.en.json, data/tts_jobs/day-159.es.json, data/tts_jobs/day-159.fr.json
- Subtasks:
  - [ ] Author normalized DNA source → data/day-159_normalized.json
  - [ ] Generate PhaseDNA v1 (en + clone es/fr) → data/day-159.en|es|fr.phased.json (cmd: node scripts/generate-phased-from-normalized.js --input data/day-159_normalized.json --outbase data/day-159 --lang en --clone-es-fr)
  - [ ] Extract TTS jobs (per-phase narration) for en/es/fr → data/tts_jobs/day-159.en|es|fr.json (cmd: node scripts/extract-tts-jobs.js --slugs day-159 --langs en,es,fr --in data --out data/tts_jobs)
  - [ ] Validate PhaseDNA shape and TTS jobs presence → npm run validate
  - [ ] Ensure day-to-slug resolver loads this lesson in index.html → Update getDNALessonData to include this day or general resolver
  - [ ] Attach minimal avatar cues/moods per phase (optional) → Edit phased JSON: phases[].avatar.cues
  - [ ] Quick review of es/fr clones for obvious issues → data/day-159.es|fr.phased.json
  - [ ] Enable prefetch of next-phase TTS during playback → Player optimization (once globally implemented)
  - [ ] QA in index.html: phase texts render, TTS plays, interactions flow → Open index.html?day=159

## Day 160 — Day 160
- Slug: day-160
- Files:
  - Normalized: data/day-160_normalized.json
  - PhaseDNA: data/day-160.en.phased.json, data/day-160.es.phased.json, data/day-160.fr.phased.json
  - TTS jobs: data/tts_jobs/day-160.en.json, data/tts_jobs/day-160.es.json, data/tts_jobs/day-160.fr.json
- Subtasks:
  - [ ] Author normalized DNA source → data/day-160_normalized.json
  - [ ] Generate PhaseDNA v1 (en + clone es/fr) → data/day-160.en|es|fr.phased.json (cmd: node scripts/generate-phased-from-normalized.js --input data/day-160_normalized.json --outbase data/day-160 --lang en --clone-es-fr)
  - [ ] Extract TTS jobs (per-phase narration) for en/es/fr → data/tts_jobs/day-160.en|es|fr.json (cmd: node scripts/extract-tts-jobs.js --slugs day-160 --langs en,es,fr --in data --out data/tts_jobs)
  - [ ] Validate PhaseDNA shape and TTS jobs presence → npm run validate
  - [ ] Ensure day-to-slug resolver loads this lesson in index.html → Update getDNALessonData to include this day or general resolver
  - [ ] Attach minimal avatar cues/moods per phase (optional) → Edit phased JSON: phases[].avatar.cues
  - [ ] Quick review of es/fr clones for obvious issues → data/day-160.es|fr.phased.json
  - [ ] Enable prefetch of next-phase TTS during playback → Player optimization (once globally implemented)
  - [ ] QA in index.html: phase texts render, TTS plays, interactions flow → Open index.html?day=160

## Day 161 — Day 161
- Slug: day-161
- Files:
  - Normalized: data/day-161_normalized.json
  - PhaseDNA: data/day-161.en.phased.json, data/day-161.es.phased.json, data/day-161.fr.phased.json
  - TTS jobs: data/tts_jobs/day-161.en.json, data/tts_jobs/day-161.es.json, data/tts_jobs/day-161.fr.json
- Subtasks:
  - [ ] Author normalized DNA source → data/day-161_normalized.json
  - [ ] Generate PhaseDNA v1 (en + clone es/fr) → data/day-161.en|es|fr.phased.json (cmd: node scripts/generate-phased-from-normalized.js --input data/day-161_normalized.json --outbase data/day-161 --lang en --clone-es-fr)
  - [ ] Extract TTS jobs (per-phase narration) for en/es/fr → data/tts_jobs/day-161.en|es|fr.json (cmd: node scripts/extract-tts-jobs.js --slugs day-161 --langs en,es,fr --in data --out data/tts_jobs)
  - [ ] Validate PhaseDNA shape and TTS jobs presence → npm run validate
  - [ ] Ensure day-to-slug resolver loads this lesson in index.html → Update getDNALessonData to include this day or general resolver
  - [ ] Attach minimal avatar cues/moods per phase (optional) → Edit phased JSON: phases[].avatar.cues
  - [ ] Quick review of es/fr clones for obvious issues → data/day-161.es|fr.phased.json
  - [ ] Enable prefetch of next-phase TTS during playback → Player optimization (once globally implemented)
  - [ ] QA in index.html: phase texts render, TTS plays, interactions flow → Open index.html?day=161

## Day 162 — Day 162
- Slug: day-162
- Files:
  - Normalized: data/day-162_normalized.json
  - PhaseDNA: data/day-162.en.phased.json, data/day-162.es.phased.json, data/day-162.fr.phased.json
  - TTS jobs: data/tts_jobs/day-162.en.json, data/tts_jobs/day-162.es.json, data/tts_jobs/day-162.fr.json
- Subtasks:
  - [ ] Author normalized DNA source → data/day-162_normalized.json
  - [ ] Generate PhaseDNA v1 (en + clone es/fr) → data/day-162.en|es|fr.phased.json (cmd: node scripts/generate-phased-from-normalized.js --input data/day-162_normalized.json --outbase data/day-162 --lang en --clone-es-fr)
  - [ ] Extract TTS jobs (per-phase narration) for en/es/fr → data/tts_jobs/day-162.en|es|fr.json (cmd: node scripts/extract-tts-jobs.js --slugs day-162 --langs en,es,fr --in data --out data/tts_jobs)
  - [ ] Validate PhaseDNA shape and TTS jobs presence → npm run validate
  - [ ] Ensure day-to-slug resolver loads this lesson in index.html → Update getDNALessonData to include this day or general resolver
  - [ ] Attach minimal avatar cues/moods per phase (optional) → Edit phased JSON: phases[].avatar.cues
  - [ ] Quick review of es/fr clones for obvious issues → data/day-162.es|fr.phased.json
  - [ ] Enable prefetch of next-phase TTS during playback → Player optimization (once globally implemented)
  - [ ] QA in index.html: phase texts render, TTS plays, interactions flow → Open index.html?day=162

## Day 163 — Day 163
- Slug: day-163
- Files:
  - Normalized: data/day-163_normalized.json
  - PhaseDNA: data/day-163.en.phased.json, data/day-163.es.phased.json, data/day-163.fr.phased.json
  - TTS jobs: data/tts_jobs/day-163.en.json, data/tts_jobs/day-163.es.json, data/tts_jobs/day-163.fr.json
- Subtasks:
  - [ ] Author normalized DNA source → data/day-163_normalized.json
  - [ ] Generate PhaseDNA v1 (en + clone es/fr) → data/day-163.en|es|fr.phased.json (cmd: node scripts/generate-phased-from-normalized.js --input data/day-163_normalized.json --outbase data/day-163 --lang en --clone-es-fr)
  - [ ] Extract TTS jobs (per-phase narration) for en/es/fr → data/tts_jobs/day-163.en|es|fr.json (cmd: node scripts/extract-tts-jobs.js --slugs day-163 --langs en,es,fr --in data --out data/tts_jobs)
  - [ ] Validate PhaseDNA shape and TTS jobs presence → npm run validate
  - [ ] Ensure day-to-slug resolver loads this lesson in index.html → Update getDNALessonData to include this day or general resolver
  - [ ] Attach minimal avatar cues/moods per phase (optional) → Edit phased JSON: phases[].avatar.cues
  - [ ] Quick review of es/fr clones for obvious issues → data/day-163.es|fr.phased.json
  - [ ] Enable prefetch of next-phase TTS during playback → Player optimization (once globally implemented)
  - [ ] QA in index.html: phase texts render, TTS plays, interactions flow → Open index.html?day=163

## Day 164 — Day 164
- Slug: day-164
- Files:
  - Normalized: data/day-164_normalized.json
  - PhaseDNA: data/day-164.en.phased.json, data/day-164.es.phased.json, data/day-164.fr.phased.json
  - TTS jobs: data/tts_jobs/day-164.en.json, data/tts_jobs/day-164.es.json, data/tts_jobs/day-164.fr.json
- Subtasks:
  - [ ] Author normalized DNA source → data/day-164_normalized.json
  - [ ] Generate PhaseDNA v1 (en + clone es/fr) → data/day-164.en|es|fr.phased.json (cmd: node scripts/generate-phased-from-normalized.js --input data/day-164_normalized.json --outbase data/day-164 --lang en --clone-es-fr)
  - [ ] Extract TTS jobs (per-phase narration) for en/es/fr → data/tts_jobs/day-164.en|es|fr.json (cmd: node scripts/extract-tts-jobs.js --slugs day-164 --langs en,es,fr --in data --out data/tts_jobs)
  - [ ] Validate PhaseDNA shape and TTS jobs presence → npm run validate
  - [ ] Ensure day-to-slug resolver loads this lesson in index.html → Update getDNALessonData to include this day or general resolver
  - [ ] Attach minimal avatar cues/moods per phase (optional) → Edit phased JSON: phases[].avatar.cues
  - [ ] Quick review of es/fr clones for obvious issues → data/day-164.es|fr.phased.json
  - [ ] Enable prefetch of next-phase TTS during playback → Player optimization (once globally implemented)
  - [ ] QA in index.html: phase texts render, TTS plays, interactions flow → Open index.html?day=164

## Day 165 — Day 165
- Slug: day-165
- Files:
  - Normalized: data/day-165_normalized.json
  - PhaseDNA: data/day-165.en.phased.json, data/day-165.es.phased.json, data/day-165.fr.phased.json
  - TTS jobs: data/tts_jobs/day-165.en.json, data/tts_jobs/day-165.es.json, data/tts_jobs/day-165.fr.json
- Subtasks:
  - [ ] Author normalized DNA source → data/day-165_normalized.json
  - [ ] Generate PhaseDNA v1 (en + clone es/fr) → data/day-165.en|es|fr.phased.json (cmd: node scripts/generate-phased-from-normalized.js --input data/day-165_normalized.json --outbase data/day-165 --lang en --clone-es-fr)
  - [ ] Extract TTS jobs (per-phase narration) for en/es/fr → data/tts_jobs/day-165.en|es|fr.json (cmd: node scripts/extract-tts-jobs.js --slugs day-165 --langs en,es,fr --in data --out data/tts_jobs)
  - [ ] Validate PhaseDNA shape and TTS jobs presence → npm run validate
  - [ ] Ensure day-to-slug resolver loads this lesson in index.html → Update getDNALessonData to include this day or general resolver
  - [ ] Attach minimal avatar cues/moods per phase (optional) → Edit phased JSON: phases[].avatar.cues
  - [ ] Quick review of es/fr clones for obvious issues → data/day-165.es|fr.phased.json
  - [ ] Enable prefetch of next-phase TTS during playback → Player optimization (once globally implemented)
  - [ ] QA in index.html: phase texts render, TTS plays, interactions flow → Open index.html?day=165

## Day 166 — Day 166
- Slug: day-166
- Files:
  - Normalized: data/day-166_normalized.json
  - PhaseDNA: data/day-166.en.phased.json, data/day-166.es.phased.json, data/day-166.fr.phased.json
  - TTS jobs: data/tts_jobs/day-166.en.json, data/tts_jobs/day-166.es.json, data/tts_jobs/day-166.fr.json
- Subtasks:
  - [ ] Author normalized DNA source → data/day-166_normalized.json
  - [ ] Generate PhaseDNA v1 (en + clone es/fr) → data/day-166.en|es|fr.phased.json (cmd: node scripts/generate-phased-from-normalized.js --input data/day-166_normalized.json --outbase data/day-166 --lang en --clone-es-fr)
  - [ ] Extract TTS jobs (per-phase narration) for en/es/fr → data/tts_jobs/day-166.en|es|fr.json (cmd: node scripts/extract-tts-jobs.js --slugs day-166 --langs en,es,fr --in data --out data/tts_jobs)
  - [ ] Validate PhaseDNA shape and TTS jobs presence → npm run validate
  - [ ] Ensure day-to-slug resolver loads this lesson in index.html → Update getDNALessonData to include this day or general resolver
  - [ ] Attach minimal avatar cues/moods per phase (optional) → Edit phased JSON: phases[].avatar.cues
  - [ ] Quick review of es/fr clones for obvious issues → data/day-166.es|fr.phased.json
  - [ ] Enable prefetch of next-phase TTS during playback → Player optimization (once globally implemented)
  - [ ] QA in index.html: phase texts render, TTS plays, interactions flow → Open index.html?day=166

## Day 167 — Day 167
- Slug: day-167
- Files:
  - Normalized: data/day-167_normalized.json
  - PhaseDNA: data/day-167.en.phased.json, data/day-167.es.phased.json, data/day-167.fr.phased.json
  - TTS jobs: data/tts_jobs/day-167.en.json, data/tts_jobs/day-167.es.json, data/tts_jobs/day-167.fr.json
- Subtasks:
  - [ ] Author normalized DNA source → data/day-167_normalized.json
  - [ ] Generate PhaseDNA v1 (en + clone es/fr) → data/day-167.en|es|fr.phased.json (cmd: node scripts/generate-phased-from-normalized.js --input data/day-167_normalized.json --outbase data/day-167 --lang en --clone-es-fr)
  - [ ] Extract TTS jobs (per-phase narration) for en/es/fr → data/tts_jobs/day-167.en|es|fr.json (cmd: node scripts/extract-tts-jobs.js --slugs day-167 --langs en,es,fr --in data --out data/tts_jobs)
  - [ ] Validate PhaseDNA shape and TTS jobs presence → npm run validate
  - [ ] Ensure day-to-slug resolver loads this lesson in index.html → Update getDNALessonData to include this day or general resolver
  - [ ] Attach minimal avatar cues/moods per phase (optional) → Edit phased JSON: phases[].avatar.cues
  - [ ] Quick review of es/fr clones for obvious issues → data/day-167.es|fr.phased.json
  - [ ] Enable prefetch of next-phase TTS during playback → Player optimization (once globally implemented)
  - [ ] QA in index.html: phase texts render, TTS plays, interactions flow → Open index.html?day=167

## Day 168 — Day 168
- Slug: day-168
- Files:
  - Normalized: data/day-168_normalized.json
  - PhaseDNA: data/day-168.en.phased.json, data/day-168.es.phased.json, data/day-168.fr.phased.json
  - TTS jobs: data/tts_jobs/day-168.en.json, data/tts_jobs/day-168.es.json, data/tts_jobs/day-168.fr.json
- Subtasks:
  - [ ] Author normalized DNA source → data/day-168_normalized.json
  - [ ] Generate PhaseDNA v1 (en + clone es/fr) → data/day-168.en|es|fr.phased.json (cmd: node scripts/generate-phased-from-normalized.js --input data/day-168_normalized.json --outbase data/day-168 --lang en --clone-es-fr)
  - [ ] Extract TTS jobs (per-phase narration) for en/es/fr → data/tts_jobs/day-168.en|es|fr.json (cmd: node scripts/extract-tts-jobs.js --slugs day-168 --langs en,es,fr --in data --out data/tts_jobs)
  - [ ] Validate PhaseDNA shape and TTS jobs presence → npm run validate
  - [ ] Ensure day-to-slug resolver loads this lesson in index.html → Update getDNALessonData to include this day or general resolver
  - [ ] Attach minimal avatar cues/moods per phase (optional) → Edit phased JSON: phases[].avatar.cues
  - [ ] Quick review of es/fr clones for obvious issues → data/day-168.es|fr.phased.json
  - [ ] Enable prefetch of next-phase TTS during playback → Player optimization (once globally implemented)
  - [ ] QA in index.html: phase texts render, TTS plays, interactions flow → Open index.html?day=168

## Day 169 — Day 169
- Slug: day-169
- Files:
  - Normalized: data/day-169_normalized.json
  - PhaseDNA: data/day-169.en.phased.json, data/day-169.es.phased.json, data/day-169.fr.phased.json
  - TTS jobs: data/tts_jobs/day-169.en.json, data/tts_jobs/day-169.es.json, data/tts_jobs/day-169.fr.json
- Subtasks:
  - [ ] Author normalized DNA source → data/day-169_normalized.json
  - [ ] Generate PhaseDNA v1 (en + clone es/fr) → data/day-169.en|es|fr.phased.json (cmd: node scripts/generate-phased-from-normalized.js --input data/day-169_normalized.json --outbase data/day-169 --lang en --clone-es-fr)
  - [ ] Extract TTS jobs (per-phase narration) for en/es/fr → data/tts_jobs/day-169.en|es|fr.json (cmd: node scripts/extract-tts-jobs.js --slugs day-169 --langs en,es,fr --in data --out data/tts_jobs)
  - [ ] Validate PhaseDNA shape and TTS jobs presence → npm run validate
  - [ ] Ensure day-to-slug resolver loads this lesson in index.html → Update getDNALessonData to include this day or general resolver
  - [ ] Attach minimal avatar cues/moods per phase (optional) → Edit phased JSON: phases[].avatar.cues
  - [ ] Quick review of es/fr clones for obvious issues → data/day-169.es|fr.phased.json
  - [ ] Enable prefetch of next-phase TTS during playback → Player optimization (once globally implemented)
  - [ ] QA in index.html: phase texts render, TTS plays, interactions flow → Open index.html?day=169

## Day 170 — Day 170
- Slug: day-170
- Files:
  - Normalized: data/day-170_normalized.json
  - PhaseDNA: data/day-170.en.phased.json, data/day-170.es.phased.json, data/day-170.fr.phased.json
  - TTS jobs: data/tts_jobs/day-170.en.json, data/tts_jobs/day-170.es.json, data/tts_jobs/day-170.fr.json
- Subtasks:
  - [ ] Author normalized DNA source → data/day-170_normalized.json
  - [ ] Generate PhaseDNA v1 (en + clone es/fr) → data/day-170.en|es|fr.phased.json (cmd: node scripts/generate-phased-from-normalized.js --input data/day-170_normalized.json --outbase data/day-170 --lang en --clone-es-fr)
  - [ ] Extract TTS jobs (per-phase narration) for en/es/fr → data/tts_jobs/day-170.en|es|fr.json (cmd: node scripts/extract-tts-jobs.js --slugs day-170 --langs en,es,fr --in data --out data/tts_jobs)
  - [ ] Validate PhaseDNA shape and TTS jobs presence → npm run validate
  - [ ] Ensure day-to-slug resolver loads this lesson in index.html → Update getDNALessonData to include this day or general resolver
  - [ ] Attach minimal avatar cues/moods per phase (optional) → Edit phased JSON: phases[].avatar.cues
  - [ ] Quick review of es/fr clones for obvious issues → data/day-170.es|fr.phased.json
  - [ ] Enable prefetch of next-phase TTS during playback → Player optimization (once globally implemented)
  - [ ] QA in index.html: phase texts render, TTS plays, interactions flow → Open index.html?day=170

## Day 171 — Day 171
- Slug: day-171
- Files:
  - Normalized: data/day-171_normalized.json
  - PhaseDNA: data/day-171.en.phased.json, data/day-171.es.phased.json, data/day-171.fr.phased.json
  - TTS jobs: data/tts_jobs/day-171.en.json, data/tts_jobs/day-171.es.json, data/tts_jobs/day-171.fr.json
- Subtasks:
  - [ ] Author normalized DNA source → data/day-171_normalized.json
  - [ ] Generate PhaseDNA v1 (en + clone es/fr) → data/day-171.en|es|fr.phased.json (cmd: node scripts/generate-phased-from-normalized.js --input data/day-171_normalized.json --outbase data/day-171 --lang en --clone-es-fr)
  - [ ] Extract TTS jobs (per-phase narration) for en/es/fr → data/tts_jobs/day-171.en|es|fr.json (cmd: node scripts/extract-tts-jobs.js --slugs day-171 --langs en,es,fr --in data --out data/tts_jobs)
  - [ ] Validate PhaseDNA shape and TTS jobs presence → npm run validate
  - [ ] Ensure day-to-slug resolver loads this lesson in index.html → Update getDNALessonData to include this day or general resolver
  - [ ] Attach minimal avatar cues/moods per phase (optional) → Edit phased JSON: phases[].avatar.cues
  - [ ] Quick review of es/fr clones for obvious issues → data/day-171.es|fr.phased.json
  - [ ] Enable prefetch of next-phase TTS during playback → Player optimization (once globally implemented)
  - [ ] QA in index.html: phase texts render, TTS plays, interactions flow → Open index.html?day=171

## Day 172 — Day 172
- Slug: day-172
- Files:
  - Normalized: data/day-172_normalized.json
  - PhaseDNA: data/day-172.en.phased.json, data/day-172.es.phased.json, data/day-172.fr.phased.json
  - TTS jobs: data/tts_jobs/day-172.en.json, data/tts_jobs/day-172.es.json, data/tts_jobs/day-172.fr.json
- Subtasks:
  - [ ] Author normalized DNA source → data/day-172_normalized.json
  - [ ] Generate PhaseDNA v1 (en + clone es/fr) → data/day-172.en|es|fr.phased.json (cmd: node scripts/generate-phased-from-normalized.js --input data/day-172_normalized.json --outbase data/day-172 --lang en --clone-es-fr)
  - [ ] Extract TTS jobs (per-phase narration) for en/es/fr → data/tts_jobs/day-172.en|es|fr.json (cmd: node scripts/extract-tts-jobs.js --slugs day-172 --langs en,es,fr --in data --out data/tts_jobs)
  - [ ] Validate PhaseDNA shape and TTS jobs presence → npm run validate
  - [ ] Ensure day-to-slug resolver loads this lesson in index.html → Update getDNALessonData to include this day or general resolver
  - [ ] Attach minimal avatar cues/moods per phase (optional) → Edit phased JSON: phases[].avatar.cues
  - [ ] Quick review of es/fr clones for obvious issues → data/day-172.es|fr.phased.json
  - [ ] Enable prefetch of next-phase TTS during playback → Player optimization (once globally implemented)
  - [ ] QA in index.html: phase texts render, TTS plays, interactions flow → Open index.html?day=172

## Day 173 — Day 173
- Slug: day-173
- Files:
  - Normalized: data/day-173_normalized.json
  - PhaseDNA: data/day-173.en.phased.json, data/day-173.es.phased.json, data/day-173.fr.phased.json
  - TTS jobs: data/tts_jobs/day-173.en.json, data/tts_jobs/day-173.es.json, data/tts_jobs/day-173.fr.json
- Subtasks:
  - [ ] Author normalized DNA source → data/day-173_normalized.json
  - [ ] Generate PhaseDNA v1 (en + clone es/fr) → data/day-173.en|es|fr.phased.json (cmd: node scripts/generate-phased-from-normalized.js --input data/day-173_normalized.json --outbase data/day-173 --lang en --clone-es-fr)
  - [ ] Extract TTS jobs (per-phase narration) for en/es/fr → data/tts_jobs/day-173.en|es|fr.json (cmd: node scripts/extract-tts-jobs.js --slugs day-173 --langs en,es,fr --in data --out data/tts_jobs)
  - [ ] Validate PhaseDNA shape and TTS jobs presence → npm run validate
  - [ ] Ensure day-to-slug resolver loads this lesson in index.html → Update getDNALessonData to include this day or general resolver
  - [ ] Attach minimal avatar cues/moods per phase (optional) → Edit phased JSON: phases[].avatar.cues
  - [ ] Quick review of es/fr clones for obvious issues → data/day-173.es|fr.phased.json
  - [ ] Enable prefetch of next-phase TTS during playback → Player optimization (once globally implemented)
  - [ ] QA in index.html: phase texts render, TTS plays, interactions flow → Open index.html?day=173

## Day 174 — Day 174
- Slug: day-174
- Files:
  - Normalized: data/day-174_normalized.json
  - PhaseDNA: data/day-174.en.phased.json, data/day-174.es.phased.json, data/day-174.fr.phased.json
  - TTS jobs: data/tts_jobs/day-174.en.json, data/tts_jobs/day-174.es.json, data/tts_jobs/day-174.fr.json
- Subtasks:
  - [ ] Author normalized DNA source → data/day-174_normalized.json
  - [ ] Generate PhaseDNA v1 (en + clone es/fr) → data/day-174.en|es|fr.phased.json (cmd: node scripts/generate-phased-from-normalized.js --input data/day-174_normalized.json --outbase data/day-174 --lang en --clone-es-fr)
  - [ ] Extract TTS jobs (per-phase narration) for en/es/fr → data/tts_jobs/day-174.en|es|fr.json (cmd: node scripts/extract-tts-jobs.js --slugs day-174 --langs en,es,fr --in data --out data/tts_jobs)
  - [ ] Validate PhaseDNA shape and TTS jobs presence → npm run validate
  - [ ] Ensure day-to-slug resolver loads this lesson in index.html → Update getDNALessonData to include this day or general resolver
  - [ ] Attach minimal avatar cues/moods per phase (optional) → Edit phased JSON: phases[].avatar.cues
  - [ ] Quick review of es/fr clones for obvious issues → data/day-174.es|fr.phased.json
  - [ ] Enable prefetch of next-phase TTS during playback → Player optimization (once globally implemented)
  - [ ] QA in index.html: phase texts render, TTS plays, interactions flow → Open index.html?day=174

## Day 175 — Day 175
- Slug: day-175
- Files:
  - Normalized: data/day-175_normalized.json
  - PhaseDNA: data/day-175.en.phased.json, data/day-175.es.phased.json, data/day-175.fr.phased.json
  - TTS jobs: data/tts_jobs/day-175.en.json, data/tts_jobs/day-175.es.json, data/tts_jobs/day-175.fr.json
- Subtasks:
  - [ ] Author normalized DNA source → data/day-175_normalized.json
  - [ ] Generate PhaseDNA v1 (en + clone es/fr) → data/day-175.en|es|fr.phased.json (cmd: node scripts/generate-phased-from-normalized.js --input data/day-175_normalized.json --outbase data/day-175 --lang en --clone-es-fr)
  - [ ] Extract TTS jobs (per-phase narration) for en/es/fr → data/tts_jobs/day-175.en|es|fr.json (cmd: node scripts/extract-tts-jobs.js --slugs day-175 --langs en,es,fr --in data --out data/tts_jobs)
  - [ ] Validate PhaseDNA shape and TTS jobs presence → npm run validate
  - [ ] Ensure day-to-slug resolver loads this lesson in index.html → Update getDNALessonData to include this day or general resolver
  - [ ] Attach minimal avatar cues/moods per phase (optional) → Edit phased JSON: phases[].avatar.cues
  - [ ] Quick review of es/fr clones for obvious issues → data/day-175.es|fr.phased.json
  - [ ] Enable prefetch of next-phase TTS during playback → Player optimization (once globally implemented)
  - [ ] QA in index.html: phase texts render, TTS plays, interactions flow → Open index.html?day=175

## Day 176 — Day 176
- Slug: day-176
- Files:
  - Normalized: data/day-176_normalized.json
  - PhaseDNA: data/day-176.en.phased.json, data/day-176.es.phased.json, data/day-176.fr.phased.json
  - TTS jobs: data/tts_jobs/day-176.en.json, data/tts_jobs/day-176.es.json, data/tts_jobs/day-176.fr.json
- Subtasks:
  - [ ] Author normalized DNA source → data/day-176_normalized.json
  - [ ] Generate PhaseDNA v1 (en + clone es/fr) → data/day-176.en|es|fr.phased.json (cmd: node scripts/generate-phased-from-normalized.js --input data/day-176_normalized.json --outbase data/day-176 --lang en --clone-es-fr)
  - [ ] Extract TTS jobs (per-phase narration) for en/es/fr → data/tts_jobs/day-176.en|es|fr.json (cmd: node scripts/extract-tts-jobs.js --slugs day-176 --langs en,es,fr --in data --out data/tts_jobs)
  - [ ] Validate PhaseDNA shape and TTS jobs presence → npm run validate
  - [ ] Ensure day-to-slug resolver loads this lesson in index.html → Update getDNALessonData to include this day or general resolver
  - [ ] Attach minimal avatar cues/moods per phase (optional) → Edit phased JSON: phases[].avatar.cues
  - [ ] Quick review of es/fr clones for obvious issues → data/day-176.es|fr.phased.json
  - [ ] Enable prefetch of next-phase TTS during playback → Player optimization (once globally implemented)
  - [ ] QA in index.html: phase texts render, TTS plays, interactions flow → Open index.html?day=176

## Day 177 — Day 177
- Slug: day-177
- Files:
  - Normalized: data/day-177_normalized.json
  - PhaseDNA: data/day-177.en.phased.json, data/day-177.es.phased.json, data/day-177.fr.phased.json
  - TTS jobs: data/tts_jobs/day-177.en.json, data/tts_jobs/day-177.es.json, data/tts_jobs/day-177.fr.json
- Subtasks:
  - [ ] Author normalized DNA source → data/day-177_normalized.json
  - [ ] Generate PhaseDNA v1 (en + clone es/fr) → data/day-177.en|es|fr.phased.json (cmd: node scripts/generate-phased-from-normalized.js --input data/day-177_normalized.json --outbase data/day-177 --lang en --clone-es-fr)
  - [ ] Extract TTS jobs (per-phase narration) for en/es/fr → data/tts_jobs/day-177.en|es|fr.json (cmd: node scripts/extract-tts-jobs.js --slugs day-177 --langs en,es,fr --in data --out data/tts_jobs)
  - [ ] Validate PhaseDNA shape and TTS jobs presence → npm run validate
  - [ ] Ensure day-to-slug resolver loads this lesson in index.html → Update getDNALessonData to include this day or general resolver
  - [ ] Attach minimal avatar cues/moods per phase (optional) → Edit phased JSON: phases[].avatar.cues
  - [ ] Quick review of es/fr clones for obvious issues → data/day-177.es|fr.phased.json
  - [ ] Enable prefetch of next-phase TTS during playback → Player optimization (once globally implemented)
  - [ ] QA in index.html: phase texts render, TTS plays, interactions flow → Open index.html?day=177

## Day 178 — Day 178
- Slug: day-178
- Files:
  - Normalized: data/day-178_normalized.json
  - PhaseDNA: data/day-178.en.phased.json, data/day-178.es.phased.json, data/day-178.fr.phased.json
  - TTS jobs: data/tts_jobs/day-178.en.json, data/tts_jobs/day-178.es.json, data/tts_jobs/day-178.fr.json
- Subtasks:
  - [ ] Author normalized DNA source → data/day-178_normalized.json
  - [ ] Generate PhaseDNA v1 (en + clone es/fr) → data/day-178.en|es|fr.phased.json (cmd: node scripts/generate-phased-from-normalized.js --input data/day-178_normalized.json --outbase data/day-178 --lang en --clone-es-fr)
  - [ ] Extract TTS jobs (per-phase narration) for en/es/fr → data/tts_jobs/day-178.en|es|fr.json (cmd: node scripts/extract-tts-jobs.js --slugs day-178 --langs en,es,fr --in data --out data/tts_jobs)
  - [ ] Validate PhaseDNA shape and TTS jobs presence → npm run validate
  - [ ] Ensure day-to-slug resolver loads this lesson in index.html → Update getDNALessonData to include this day or general resolver
  - [ ] Attach minimal avatar cues/moods per phase (optional) → Edit phased JSON: phases[].avatar.cues
  - [ ] Quick review of es/fr clones for obvious issues → data/day-178.es|fr.phased.json
  - [ ] Enable prefetch of next-phase TTS during playback → Player optimization (once globally implemented)
  - [ ] QA in index.html: phase texts render, TTS plays, interactions flow → Open index.html?day=178

## Day 179 — Day 179
- Slug: day-179
- Files:
  - Normalized: data/day-179_normalized.json
  - PhaseDNA: data/day-179.en.phased.json, data/day-179.es.phased.json, data/day-179.fr.phased.json
  - TTS jobs: data/tts_jobs/day-179.en.json, data/tts_jobs/day-179.es.json, data/tts_jobs/day-179.fr.json
- Subtasks:
  - [ ] Author normalized DNA source → data/day-179_normalized.json
  - [ ] Generate PhaseDNA v1 (en + clone es/fr) → data/day-179.en|es|fr.phased.json (cmd: node scripts/generate-phased-from-normalized.js --input data/day-179_normalized.json --outbase data/day-179 --lang en --clone-es-fr)
  - [ ] Extract TTS jobs (per-phase narration) for en/es/fr → data/tts_jobs/day-179.en|es|fr.json (cmd: node scripts/extract-tts-jobs.js --slugs day-179 --langs en,es,fr --in data --out data/tts_jobs)
  - [ ] Validate PhaseDNA shape and TTS jobs presence → npm run validate
  - [ ] Ensure day-to-slug resolver loads this lesson in index.html → Update getDNALessonData to include this day or general resolver
  - [ ] Attach minimal avatar cues/moods per phase (optional) → Edit phased JSON: phases[].avatar.cues
  - [ ] Quick review of es/fr clones for obvious issues → data/day-179.es|fr.phased.json
  - [ ] Enable prefetch of next-phase TTS during playback → Player optimization (once globally implemented)
  - [ ] QA in index.html: phase texts render, TTS plays, interactions flow → Open index.html?day=179

## Day 180 — Day 180
- Slug: day-180
- Files:
  - Normalized: data/day-180_normalized.json
  - PhaseDNA: data/day-180.en.phased.json, data/day-180.es.phased.json, data/day-180.fr.phased.json
  - TTS jobs: data/tts_jobs/day-180.en.json, data/tts_jobs/day-180.es.json, data/tts_jobs/day-180.fr.json
- Subtasks:
  - [ ] Author normalized DNA source → data/day-180_normalized.json
  - [ ] Generate PhaseDNA v1 (en + clone es/fr) → data/day-180.en|es|fr.phased.json (cmd: node scripts/generate-phased-from-normalized.js --input data/day-180_normalized.json --outbase data/day-180 --lang en --clone-es-fr)
  - [ ] Extract TTS jobs (per-phase narration) for en/es/fr → data/tts_jobs/day-180.en|es|fr.json (cmd: node scripts/extract-tts-jobs.js --slugs day-180 --langs en,es,fr --in data --out data/tts_jobs)
  - [ ] Validate PhaseDNA shape and TTS jobs presence → npm run validate
  - [ ] Ensure day-to-slug resolver loads this lesson in index.html → Update getDNALessonData to include this day or general resolver
  - [ ] Attach minimal avatar cues/moods per phase (optional) → Edit phased JSON: phases[].avatar.cues
  - [ ] Quick review of es/fr clones for obvious issues → data/day-180.es|fr.phased.json
  - [ ] Enable prefetch of next-phase TTS during playback → Player optimization (once globally implemented)
  - [ ] QA in index.html: phase texts render, TTS plays, interactions flow → Open index.html?day=180

## Day 181 — Day 181
- Slug: day-181
- Files:
  - Normalized: data/day-181_normalized.json
  - PhaseDNA: data/day-181.en.phased.json, data/day-181.es.phased.json, data/day-181.fr.phased.json
  - TTS jobs: data/tts_jobs/day-181.en.json, data/tts_jobs/day-181.es.json, data/tts_jobs/day-181.fr.json
- Subtasks:
  - [ ] Author normalized DNA source → data/day-181_normalized.json
  - [ ] Generate PhaseDNA v1 (en + clone es/fr) → data/day-181.en|es|fr.phased.json (cmd: node scripts/generate-phased-from-normalized.js --input data/day-181_normalized.json --outbase data/day-181 --lang en --clone-es-fr)
  - [ ] Extract TTS jobs (per-phase narration) for en/es/fr → data/tts_jobs/day-181.en|es|fr.json (cmd: node scripts/extract-tts-jobs.js --slugs day-181 --langs en,es,fr --in data --out data/tts_jobs)
  - [ ] Validate PhaseDNA shape and TTS jobs presence → npm run validate
  - [ ] Ensure day-to-slug resolver loads this lesson in index.html → Update getDNALessonData to include this day or general resolver
  - [ ] Attach minimal avatar cues/moods per phase (optional) → Edit phased JSON: phases[].avatar.cues
  - [ ] Quick review of es/fr clones for obvious issues → data/day-181.es|fr.phased.json
  - [ ] Enable prefetch of next-phase TTS during playback → Player optimization (once globally implemented)
  - [ ] QA in index.html: phase texts render, TTS plays, interactions flow → Open index.html?day=181

## Day 182 — Zoology - The Study of Animals
- Learning objective: Explore animal behavior while understanding how zoological knowledge informs conservation, animal welfare, and biomimetic technology.
- Slug: zoology-the-study-of-animals
- Files:
  - Normalized: data/zoology-the-study-of-animals_normalized.json
  - PhaseDNA: data/zoology-the-study-of-animals.en.phased.json, data/zoology-the-study-of-animals.es.phased.json, data/zoology-the-study-of-animals.fr.phased.json
  - TTS jobs: data/tts_jobs/zoology-the-study-of-animals.en.json, data/tts_jobs/zoology-the-study-of-animals.es.json, data/tts_jobs/zoology-the-study-of-animals.fr.json
- Subtasks:
  - [ ] Author normalized DNA source → data/zoology-the-study-of-animals_normalized.json
  - [ ] Generate PhaseDNA v1 (en + clone es/fr) → data/zoology-the-study-of-animals.en|es|fr.phased.json (cmd: node scripts/generate-phased-from-normalized.js --input data/zoology-the-study-of-animals_normalized.json --outbase data/zoology-the-study-of-animals --lang en --clone-es-fr)
  - [ ] Extract TTS jobs (per-phase narration) for en/es/fr → data/tts_jobs/zoology-the-study-of-animals.en|es|fr.json (cmd: node scripts/extract-tts-jobs.js --slugs zoology-the-study-of-animals --langs en,es,fr --in data --out data/tts_jobs)
  - [ ] Validate PhaseDNA shape and TTS jobs presence → npm run validate
  - [ ] Ensure day-to-slug resolver loads this lesson in index.html → Update getDNALessonData to include this day or general resolver
  - [ ] Attach minimal avatar cues/moods per phase (optional) → Edit phased JSON: phases[].avatar.cues
  - [ ] Quick review of es/fr clones for obvious issues → data/zoology-the-study-of-animals.es|fr.phased.json
  - [ ] Enable prefetch of next-phase TTS during playback → Player optimization (once globally implemented)
  - [ ] QA in index.html: phase texts render, TTS plays, interactions flow → Open index.html?day=182

## Day 183 — Ecology - How Environments Work
- Learning objective: Model ecological systems while understanding how ecological thinking applies to social systems, economic networks, and sustainable technology.
- Slug: ecology-how-environments-work
- Files:
  - Normalized: data/ecology-how-environments-work_normalized.json
  - PhaseDNA: data/ecology-how-environments-work.en.phased.json, data/ecology-how-environments-work.es.phased.json, data/ecology-how-environments-work.fr.phased.json
  - TTS jobs: data/tts_jobs/ecology-how-environments-work.en.json, data/tts_jobs/ecology-how-environments-work.es.json, data/tts_jobs/ecology-how-environments-work.fr.json
- Subtasks:
  - [ ] Author normalized DNA source → data/ecology-how-environments-work_normalized.json
  - [ ] Generate PhaseDNA v1 (en + clone es/fr) → data/ecology-how-environments-work.en|es|fr.phased.json (cmd: node scripts/generate-phased-from-normalized.js --input data/ecology-how-environments-work_normalized.json --outbase data/ecology-how-environments-work --lang en --clone-es-fr)
  - [ ] Extract TTS jobs (per-phase narration) for en/es/fr → data/tts_jobs/ecology-how-environments-work.en|es|fr.json (cmd: node scripts/extract-tts-jobs.js --slugs ecology-how-environments-work --langs en,es,fr --in data --out data/tts_jobs)
  - [ ] Validate PhaseDNA shape and TTS jobs presence → npm run validate
  - [ ] Ensure day-to-slug resolver loads this lesson in index.html → Update getDNALessonData to include this day or general resolver
  - [ ] Attach minimal avatar cues/moods per phase (optional) → Edit phased JSON: phases[].avatar.cues
  - [ ] Quick review of es/fr clones for obvious issues → data/ecology-how-environments-work.es|fr.phased.json
  - [ ] Enable prefetch of next-phase TTS during playback → Player optimization (once globally implemented)
  - [ ] QA in index.html: phase texts render, TTS plays, interactions flow → Open index.html?day=183

## Day 184 — Dance - Movement as Expression
- Learning objective: Practice embodied expression while understanding how dance enables cultural preservation, physical health, and social bonding.
- Slug: dance-movement-as-expression
- Files:
  - Normalized: data/dance-movement-as-expression_normalized.json
  - PhaseDNA: data/dance-movement-as-expression.en.phased.json, data/dance-movement-as-expression.es.phased.json, data/dance-movement-as-expression.fr.phased.json
  - TTS jobs: data/tts_jobs/dance-movement-as-expression.en.json, data/tts_jobs/dance-movement-as-expression.es.json, data/tts_jobs/dance-movement-as-expression.fr.json
- Subtasks:
  - [ ] Author normalized DNA source → data/dance-movement-as-expression_normalized.json
  - [ ] Generate PhaseDNA v1 (en + clone es/fr) → data/dance-movement-as-expression.en|es|fr.phased.json (cmd: node scripts/generate-phased-from-normalized.js --input data/dance-movement-as-expression_normalized.json --outbase data/dance-movement-as-expression --lang en --clone-es-fr)
  - [ ] Extract TTS jobs (per-phase narration) for en/es/fr → data/tts_jobs/dance-movement-as-expression.en|es|fr.json (cmd: node scripts/extract-tts-jobs.js --slugs dance-movement-as-expression --langs en,es,fr --in data --out data/tts_jobs)
  - [ ] Validate PhaseDNA shape and TTS jobs presence → npm run validate
  - [ ] Ensure day-to-slug resolver loads this lesson in index.html → Update getDNALessonData to include this day or general resolver
  - [ ] Attach minimal avatar cues/moods per phase (optional) → Edit phased JSON: phases[].avatar.cues
  - [ ] Quick review of es/fr clones for obvious issues → data/dance-movement-as-expression.es|fr.phased.json
  - [ ] Enable prefetch of next-phase TTS during playback → Player optimization (once globally implemented)
  - [ ] QA in index.html: phase texts render, TTS plays, interactions flow → Open index.html?day=184

## Day 185 — Optics - How Light Behaves and Bends
- Learning objective: Understand optical physics while exploring how light manipulation enables fiber optic communication, medical lasers, and quantum computing applications.
- Slug: optics-how-light-behaves-and-bends
- Files:
  - Normalized: data/optics-how-light-behaves-and-bends_normalized.json
  - PhaseDNA: data/optics-how-light-behaves-and-bends.en.phased.json, data/optics-how-light-behaves-and-bends.es.phased.json, data/optics-how-light-behaves-and-bends.fr.phased.json
  - TTS jobs: data/tts_jobs/optics-how-light-behaves-and-bends.en.json, data/tts_jobs/optics-how-light-behaves-and-bends.es.json, data/tts_jobs/optics-how-light-behaves-and-bends.fr.json
- Subtasks:
  - [ ] Author normalized DNA source → data/optics-how-light-behaves-and-bends_normalized.json
  - [ ] Generate PhaseDNA v1 (en + clone es/fr) → data/optics-how-light-behaves-and-bends.en|es|fr.phased.json (cmd: node scripts/generate-phased-from-normalized.js --input data/optics-how-light-behaves-and-bends_normalized.json --outbase data/optics-how-light-behaves-and-bends --lang en --clone-es-fr)
  - [ ] Extract TTS jobs (per-phase narration) for en/es/fr → data/tts_jobs/optics-how-light-behaves-and-bends.en|es|fr.json (cmd: node scripts/extract-tts-jobs.js --slugs optics-how-light-behaves-and-bends --langs en,es,fr --in data --out data/tts_jobs)
  - [ ] Validate PhaseDNA shape and TTS jobs presence → npm run validate
  - [ ] Ensure day-to-slug resolver loads this lesson in index.html → Update getDNALessonData to include this day or general resolver
  - [ ] Attach minimal avatar cues/moods per phase (optional) → Edit phased JSON: phases[].avatar.cues
  - [ ] Quick review of es/fr clones for obvious issues → data/optics-how-light-behaves-and-bends.es|fr.phased.json
  - [ ] Enable prefetch of next-phase TTS during playback → Player optimization (once globally implemented)
  - [ ] QA in index.html: phase texts render, TTS plays, interactions flow → Open index.html?day=185

## Day 186 — Technological Innovation - Pushing the Boundaries
- Learning objective: Practice innovation methodology while understanding how responsible technology development balances progress with ethical considerations and social impact.
- Slug: technological-innovation-pushing-the-boundaries
- Files:
  - Normalized: data/technological-innovation-pushing-the-boundaries_normalized.json
  - PhaseDNA: data/technological-innovation-pushing-the-boundaries.en.phased.json, data/technological-innovation-pushing-the-boundaries.es.phased.json, data/technological-innovation-pushing-the-boundaries.fr.phased.json
  - TTS jobs: data/tts_jobs/technological-innovation-pushing-the-boundaries.en.json, data/tts_jobs/technological-innovation-pushing-the-boundaries.es.json, data/tts_jobs/technological-innovation-pushing-the-boundaries.fr.json
- Subtasks:
  - [ ] Author normalized DNA source → data/technological-innovation-pushing-the-boundaries_normalized.json
  - [ ] Generate PhaseDNA v1 (en + clone es/fr) → data/technological-innovation-pushing-the-boundaries.en|es|fr.phased.json (cmd: node scripts/generate-phased-from-normalized.js --input data/technological-innovation-pushing-the-boundaries_normalized.json --outbase data/technological-innovation-pushing-the-boundaries --lang en --clone-es-fr)
  - [ ] Extract TTS jobs (per-phase narration) for en/es/fr → data/tts_jobs/technological-innovation-pushing-the-boundaries.en|es|fr.json (cmd: node scripts/extract-tts-jobs.js --slugs technological-innovation-pushing-the-boundaries --langs en,es,fr --in data --out data/tts_jobs)
  - [ ] Validate PhaseDNA shape and TTS jobs presence → npm run validate
  - [ ] Ensure day-to-slug resolver loads this lesson in index.html → Update getDNALessonData to include this day or general resolver
  - [ ] Attach minimal avatar cues/moods per phase (optional) → Edit phased JSON: phases[].avatar.cues
  - [ ] Quick review of es/fr clones for obvious issues → data/technological-innovation-pushing-the-boundaries.es|fr.phased.json
  - [ ] Enable prefetch of next-phase TTS during playback → Player optimization (once globally implemented)
  - [ ] QA in index.html: phase texts render, TTS plays, interactions flow → Open index.html?day=186

## Day 187 — Conservation Biology - Protecting Life on Earth
- Learning objective: Understand biodiversity protection while exploring how conservation science informs policy, sustainable development, and international cooperation.
- Slug: conservation-biology-protecting-life-on-earth
- Files:
  - Normalized: data/conservation-biology-protecting-life-on-earth_normalized.json
  - PhaseDNA: data/conservation-biology-protecting-life-on-earth.en.phased.json, data/conservation-biology-protecting-life-on-earth.es.phased.json, data/conservation-biology-protecting-life-on-earth.fr.phased.json
  - TTS jobs: data/tts_jobs/conservation-biology-protecting-life-on-earth.en.json, data/tts_jobs/conservation-biology-protecting-life-on-earth.es.json, data/tts_jobs/conservation-biology-protecting-life-on-earth.fr.json
- Subtasks:
  - [ ] Author normalized DNA source → data/conservation-biology-protecting-life-on-earth_normalized.json
  - [ ] Generate PhaseDNA v1 (en + clone es/fr) → data/conservation-biology-protecting-life-on-earth.en|es|fr.phased.json (cmd: node scripts/generate-phased-from-normalized.js --input data/conservation-biology-protecting-life-on-earth_normalized.json --outbase data/conservation-biology-protecting-life-on-earth --lang en --clone-es-fr)
  - [ ] Extract TTS jobs (per-phase narration) for en/es/fr → data/tts_jobs/conservation-biology-protecting-life-on-earth.en|es|fr.json (cmd: node scripts/extract-tts-jobs.js --slugs conservation-biology-protecting-life-on-earth --langs en,es,fr --in data --out data/tts_jobs)
  - [ ] Validate PhaseDNA shape and TTS jobs presence → npm run validate
  - [ ] Ensure day-to-slug resolver loads this lesson in index.html → Update getDNALessonData to include this day or general resolver
  - [ ] Attach minimal avatar cues/moods per phase (optional) → Edit phased JSON: phases[].avatar.cues
  - [ ] Quick review of es/fr clones for obvious issues → data/conservation-biology-protecting-life-on-earth.es|fr.phased.json
  - [ ] Enable prefetch of next-phase TTS during playback → Player optimization (once globally implemented)
  - [ ] QA in index.html: phase texts render, TTS plays, interactions flow → Open index.html?day=187

## Day 188 — Negotiation Skills - Finding Win-Win Solutions
- Learning objective: Practice collaborative problem-solving while understanding how principled negotiation enables conflict resolution, democratic deliberation, and international diplomacy.
- Slug: negotiation-skills-finding-win-win-solutions
- Files:
  - Normalized: data/negotiation-skills-finding-win-win-solutions_normalized.json
  - PhaseDNA: data/negotiation-skills-finding-win-win-solutions.en.phased.json, data/negotiation-skills-finding-win-win-solutions.es.phased.json, data/negotiation-skills-finding-win-win-solutions.fr.phased.json
  - TTS jobs: data/tts_jobs/negotiation-skills-finding-win-win-solutions.en.json, data/tts_jobs/negotiation-skills-finding-win-win-solutions.es.json, data/tts_jobs/negotiation-skills-finding-win-win-solutions.fr.json
- Subtasks:
  - [ ] Author normalized DNA source → data/negotiation-skills-finding-win-win-solutions_normalized.json
  - [ ] Generate PhaseDNA v1 (en + clone es/fr) → data/negotiation-skills-finding-win-win-solutions.en|es|fr.phased.json (cmd: node scripts/generate-phased-from-normalized.js --input data/negotiation-skills-finding-win-win-solutions_normalized.json --outbase data/negotiation-skills-finding-win-win-solutions --lang en --clone-es-fr)
  - [ ] Extract TTS jobs (per-phase narration) for en/es/fr → data/tts_jobs/negotiation-skills-finding-win-win-solutions.en|es|fr.json (cmd: node scripts/extract-tts-jobs.js --slugs negotiation-skills-finding-win-win-solutions --langs en,es,fr --in data --out data/tts_jobs)
  - [ ] Validate PhaseDNA shape and TTS jobs presence → npm run validate
  - [ ] Ensure day-to-slug resolver loads this lesson in index.html → Update getDNALessonData to include this day or general resolver
  - [ ] Attach minimal avatar cues/moods per phase (optional) → Edit phased JSON: phases[].avatar.cues
  - [ ] Quick review of es/fr clones for obvious issues → data/negotiation-skills-finding-win-win-solutions.es|fr.phased.json
  - [ ] Enable prefetch of next-phase TTS during playback → Player optimization (once globally implemented)
  - [ ] QA in index.html: phase texts render, TTS plays, interactions flow → Open index.html?day=188

## Day 189 — Biochemistry - The Chemistry of Life
- Learning objective: Explore molecular biology while understanding how biochemical knowledge enables medicine, biotechnology, and sustainable materials development.
- Slug: biochemistry-the-chemistry-of-life
- Files:
  - Normalized: data/biochemistry-the-chemistry-of-life_normalized.json
  - PhaseDNA: data/biochemistry-the-chemistry-of-life.en.phased.json, data/biochemistry-the-chemistry-of-life.es.phased.json, data/biochemistry-the-chemistry-of-life.fr.phased.json
  - TTS jobs: data/tts_jobs/biochemistry-the-chemistry-of-life.en.json, data/tts_jobs/biochemistry-the-chemistry-of-life.es.json, data/tts_jobs/biochemistry-the-chemistry-of-life.fr.json
- Subtasks:
  - [ ] Author normalized DNA source → data/biochemistry-the-chemistry-of-life_normalized.json
  - [ ] Generate PhaseDNA v1 (en + clone es/fr) → data/biochemistry-the-chemistry-of-life.en|es|fr.phased.json (cmd: node scripts/generate-phased-from-normalized.js --input data/biochemistry-the-chemistry-of-life_normalized.json --outbase data/biochemistry-the-chemistry-of-life --lang en --clone-es-fr)
  - [ ] Extract TTS jobs (per-phase narration) for en/es/fr → data/tts_jobs/biochemistry-the-chemistry-of-life.en|es|fr.json (cmd: node scripts/extract-tts-jobs.js --slugs biochemistry-the-chemistry-of-life --langs en,es,fr --in data --out data/tts_jobs)
  - [ ] Validate PhaseDNA shape and TTS jobs presence → npm run validate
  - [ ] Ensure day-to-slug resolver loads this lesson in index.html → Update getDNALessonData to include this day or general resolver
  - [ ] Attach minimal avatar cues/moods per phase (optional) → Edit phased JSON: phases[].avatar.cues
  - [ ] Quick review of es/fr clones for obvious issues → data/biochemistry-the-chemistry-of-life.es|fr.phased.json
  - [ ] Enable prefetch of next-phase TTS during playback → Player optimization (once globally implemented)
  - [ ] QA in index.html: phase texts render, TTS plays, interactions flow → Open index.html?day=189

## Day 190 — Developmental Biology - How Organisms Grow
- Learning objective: Understand biological development while exploring how developmental science informs regenerative medicine, educational theory, and ethical considerations.
- Slug: developmental-biology-how-organisms-grow
- Files:
  - Normalized: data/developmental-biology-how-organisms-grow_normalized.json
  - PhaseDNA: data/developmental-biology-how-organisms-grow.en.phased.json, data/developmental-biology-how-organisms-grow.es.phased.json, data/developmental-biology-how-organisms-grow.fr.phased.json
  - TTS jobs: data/tts_jobs/developmental-biology-how-organisms-grow.en.json, data/tts_jobs/developmental-biology-how-organisms-grow.es.json, data/tts_jobs/developmental-biology-how-organisms-grow.fr.json
- Subtasks:
  - [ ] Author normalized DNA source → data/developmental-biology-how-organisms-grow_normalized.json
  - [ ] Generate PhaseDNA v1 (en + clone es/fr) → data/developmental-biology-how-organisms-grow.en|es|fr.phased.json (cmd: node scripts/generate-phased-from-normalized.js --input data/developmental-biology-how-organisms-grow_normalized.json --outbase data/developmental-biology-how-organisms-grow --lang en --clone-es-fr)
  - [ ] Extract TTS jobs (per-phase narration) for en/es/fr → data/tts_jobs/developmental-biology-how-organisms-grow.en|es|fr.json (cmd: node scripts/extract-tts-jobs.js --slugs developmental-biology-how-organisms-grow --langs en,es,fr --in data --out data/tts_jobs)
  - [ ] Validate PhaseDNA shape and TTS jobs presence → npm run validate
  - [ ] Ensure day-to-slug resolver loads this lesson in index.html → Update getDNALessonData to include this day or general resolver
  - [ ] Attach minimal avatar cues/moods per phase (optional) → Edit phased JSON: phases[].avatar.cues
  - [ ] Quick review of es/fr clones for obvious issues → data/developmental-biology-how-organisms-grow.es|fr.phased.json
  - [ ] Enable prefetch of next-phase TTS during playback → Player optimization (once globally implemented)
  - [ ] QA in index.html: phase texts render, TTS plays, interactions flow → Open index.html?day=190

## Day 191 — Theater - Live Performance Art
- Learning objective: Practice public expression while understanding how theater enables social commentary, empathy building, and democratic dialogue through storytelling.
- Slug: theater-live-performance-art
- Files:
  - Normalized: data/theater-live-performance-art_normalized.json
  - PhaseDNA: data/theater-live-performance-art.en.phased.json, data/theater-live-performance-art.es.phased.json, data/theater-live-performance-art.fr.phased.json
  - TTS jobs: data/tts_jobs/theater-live-performance-art.en.json, data/tts_jobs/theater-live-performance-art.es.json, data/tts_jobs/theater-live-performance-art.fr.json
- Subtasks:
  - [ ] Author normalized DNA source → data/theater-live-performance-art_normalized.json
  - [ ] Generate PhaseDNA v1 (en + clone es/fr) → data/theater-live-performance-art.en|es|fr.phased.json (cmd: node scripts/generate-phased-from-normalized.js --input data/theater-live-performance-art_normalized.json --outbase data/theater-live-performance-art --lang en --clone-es-fr)
  - [ ] Extract TTS jobs (per-phase narration) for en/es/fr → data/tts_jobs/theater-live-performance-art.en|es|fr.json (cmd: node scripts/extract-tts-jobs.js --slugs theater-live-performance-art --langs en,es,fr --in data --out data/tts_jobs)
  - [ ] Validate PhaseDNA shape and TTS jobs presence → npm run validate
  - [ ] Ensure day-to-slug resolver loads this lesson in index.html → Update getDNALessonData to include this day or general resolver
  - [ ] Attach minimal avatar cues/moods per phase (optional) → Edit phased JSON: phases[].avatar.cues
  - [ ] Quick review of es/fr clones for obvious issues → data/theater-live-performance-art.es|fr.phased.json
  - [ ] Enable prefetch of next-phase TTS during playback → Player optimization (once globally implemented)
  - [ ] QA in index.html: phase texts render, TTS plays, interactions flow → Open index.html?day=191

## Day 192 — Acoustics - The Science of Sound and Hearing
- Learning objective: Understand sound physics while exploring how acoustic knowledge enables communication technology, architectural design, and accessibility improvements.
- Slug: acoustics-the-science-of-sound-and-hearing
- Files:
  - Normalized: data/acoustics-the-science-of-sound-and-hearing_normalized.json
  - PhaseDNA: data/acoustics-the-science-of-sound-and-hearing.en.phased.json, data/acoustics-the-science-of-sound-and-hearing.es.phased.json, data/acoustics-the-science-of-sound-and-hearing.fr.phased.json
  - TTS jobs: data/tts_jobs/acoustics-the-science-of-sound-and-hearing.en.json, data/tts_jobs/acoustics-the-science-of-sound-and-hearing.es.json, data/tts_jobs/acoustics-the-science-of-sound-and-hearing.fr.json
- Subtasks:
  - [ ] Author normalized DNA source → data/acoustics-the-science-of-sound-and-hearing_normalized.json
  - [ ] Generate PhaseDNA v1 (en + clone es/fr) → data/acoustics-the-science-of-sound-and-hearing.en|es|fr.phased.json (cmd: node scripts/generate-phased-from-normalized.js --input data/acoustics-the-science-of-sound-and-hearing_normalized.json --outbase data/acoustics-the-science-of-sound-and-hearing --lang en --clone-es-fr)
  - [ ] Extract TTS jobs (per-phase narration) for en/es/fr → data/tts_jobs/acoustics-the-science-of-sound-and-hearing.en|es|fr.json (cmd: node scripts/extract-tts-jobs.js --slugs acoustics-the-science-of-sound-and-hearing --langs en,es,fr --in data --out data/tts_jobs)
  - [ ] Validate PhaseDNA shape and TTS jobs presence → npm run validate
  - [ ] Ensure day-to-slug resolver loads this lesson in index.html → Update getDNALessonData to include this day or general resolver
  - [ ] Attach minimal avatar cues/moods per phase (optional) → Edit phased JSON: phases[].avatar.cues
  - [ ] Quick review of es/fr clones for obvious issues → data/acoustics-the-science-of-sound-and-hearing.es|fr.phased.json
  - [ ] Enable prefetch of next-phase TTS during playback → Player optimization (once globally implemented)
  - [ ] QA in index.html: phase texts render, TTS plays, interactions flow → Open index.html?day=192

## Day 193 — Lean Methodology - Efficient Innovation
- Learning objective: Practice process improvement while understanding how lean thinking enables sustainable production, waste reduction, and democratic organizational structures.
- Slug: lean-methodology-efficient-innovation
- Files:
  - Normalized: data/lean-methodology-efficient-innovation_normalized.json
  - PhaseDNA: data/lean-methodology-efficient-innovation.en.phased.json, data/lean-methodology-efficient-innovation.es.phased.json, data/lean-methodology-efficient-innovation.fr.phased.json
  - TTS jobs: data/tts_jobs/lean-methodology-efficient-innovation.en.json, data/tts_jobs/lean-methodology-efficient-innovation.es.json, data/tts_jobs/lean-methodology-efficient-innovation.fr.json
- Subtasks:
  - [ ] Author normalized DNA source → data/lean-methodology-efficient-innovation_normalized.json
  - [ ] Generate PhaseDNA v1 (en + clone es/fr) → data/lean-methodology-efficient-innovation.en|es|fr.phased.json (cmd: node scripts/generate-phased-from-normalized.js --input data/lean-methodology-efficient-innovation_normalized.json --outbase data/lean-methodology-efficient-innovation --lang en --clone-es-fr)
  - [ ] Extract TTS jobs (per-phase narration) for en/es/fr → data/tts_jobs/lean-methodology-efficient-innovation.en|es|fr.json (cmd: node scripts/extract-tts-jobs.js --slugs lean-methodology-efficient-innovation --langs en,es,fr --in data --out data/tts_jobs)
  - [ ] Validate PhaseDNA shape and TTS jobs presence → npm run validate
  - [ ] Ensure day-to-slug resolver loads this lesson in index.html → Update getDNALessonData to include this day or general resolver
  - [ ] Attach minimal avatar cues/moods per phase (optional) → Edit phased JSON: phases[].avatar.cues
  - [ ] Quick review of es/fr clones for obvious issues → data/lean-methodology-efficient-innovation.es|fr.phased.json
  - [ ] Enable prefetch of next-phase TTS during playback → Player optimization (once globally implemented)
  - [ ] QA in index.html: phase texts render, TTS plays, interactions flow → Open index.html?day=193

## Day 194 — Taxonomy - Organizing Life's Diversity
- Learning objective: Understand classification systems while exploring how systematic thinking enables scientific communication, data organization, and knowledge management.
- Slug: taxonomy-organizing-lifes-diversity
- Files:
  - Normalized: data/taxonomy-organizing-lifes-diversity_normalized.json
  - PhaseDNA: data/taxonomy-organizing-lifes-diversity.en.phased.json, data/taxonomy-organizing-lifes-diversity.es.phased.json, data/taxonomy-organizing-lifes-diversity.fr.phased.json
  - TTS jobs: data/tts_jobs/taxonomy-organizing-lifes-diversity.en.json, data/tts_jobs/taxonomy-organizing-lifes-diversity.es.json, data/tts_jobs/taxonomy-organizing-lifes-diversity.fr.json
- Subtasks:
  - [ ] Author normalized DNA source → data/taxonomy-organizing-lifes-diversity_normalized.json
  - [ ] Generate PhaseDNA v1 (en + clone es/fr) → data/taxonomy-organizing-lifes-diversity.en|es|fr.phased.json (cmd: node scripts/generate-phased-from-normalized.js --input data/taxonomy-organizing-lifes-diversity_normalized.json --outbase data/taxonomy-organizing-lifes-diversity --lang en --clone-es-fr)
  - [ ] Extract TTS jobs (per-phase narration) for en/es/fr → data/tts_jobs/taxonomy-organizing-lifes-diversity.en|es|fr.json (cmd: node scripts/extract-tts-jobs.js --slugs taxonomy-organizing-lifes-diversity --langs en,es,fr --in data --out data/tts_jobs)
  - [ ] Validate PhaseDNA shape and TTS jobs presence → npm run validate
  - [ ] Ensure day-to-slug resolver loads this lesson in index.html → Update getDNALessonData to include this day or general resolver
  - [ ] Attach minimal avatar cues/moods per phase (optional) → Edit phased JSON: phases[].avatar.cues
  - [ ] Quick review of es/fr clones for obvious issues → data/taxonomy-organizing-lifes-diversity.es|fr.phased.json
  - [ ] Enable prefetch of next-phase TTS during playback → Player optimization (once globally implemented)
  - [ ] QA in index.html: phase texts render, TTS plays, interactions flow → Open index.html?day=194

## Day 195 — Density and Buoyancy - Why Some Things Float and Others Sink
- Learning objective: Model fluid physics while understanding how density principles enable ship design, aviation technology, and materials engineering.
- Slug: density-and-buoyancy-why-some-things-float-and-others-sink
- Files:
  - Normalized: data/density-and-buoyancy-why-some-things-float-and-others-sink_normalized.json
  - PhaseDNA: data/density-and-buoyancy-why-some-things-float-and-others-sink.en.phased.json, data/density-and-buoyancy-why-some-things-float-and-others-sink.es.phased.json, data/density-and-buoyancy-why-some-things-float-and-others-sink.fr.phased.json
  - TTS jobs: data/tts_jobs/density-and-buoyancy-why-some-things-float-and-others-sink.en.json, data/tts_jobs/density-and-buoyancy-why-some-things-float-and-others-sink.es.json, data/tts_jobs/density-and-buoyancy-why-some-things-float-and-others-sink.fr.json
- Subtasks:
  - [ ] Author normalized DNA source → data/density-and-buoyancy-why-some-things-float-and-others-sink_normalized.json
  - [ ] Generate PhaseDNA v1 (en + clone es/fr) → data/density-and-buoyancy-why-some-things-float-and-others-sink.en|es|fr.phased.json (cmd: node scripts/generate-phased-from-normalized.js --input data/density-and-buoyancy-why-some-things-float-and-others-sink_normalized.json --outbase data/density-and-buoyancy-why-some-things-float-and-others-sink --lang en --clone-es-fr)
  - [ ] Extract TTS jobs (per-phase narration) for en/es/fr → data/tts_jobs/density-and-buoyancy-why-some-things-float-and-others-sink.en|es|fr.json (cmd: node scripts/extract-tts-jobs.js --slugs density-and-buoyancy-why-some-things-float-and-others-sink --langs en,es,fr --in data --out data/tts_jobs)
  - [ ] Validate PhaseDNA shape and TTS jobs presence → npm run validate
  - [ ] Ensure day-to-slug resolver loads this lesson in index.html → Update getDNALessonData to include this day or general resolver
  - [ ] Attach minimal avatar cues/moods per phase (optional) → Edit phased JSON: phases[].avatar.cues
  - [ ] Quick review of es/fr clones for obvious issues → data/density-and-buoyancy-why-some-things-float-and-others-sink.es|fr.phased.json
  - [ ] Enable prefetch of next-phase TTS during playback → Player optimization (once globally implemented)
  - [ ] QA in index.html: phase texts render, TTS plays, interactions flow → Open index.html?day=195

## Day 196 — Ethology - Animal Behavior Science
- Learning objective: Understand behavioral evolution while exploring how ethological knowledge informs conservation, animal welfare, and human behavioral insights.
- Slug: ethology-animal-behavior-science
- Files:
  - Normalized: data/ethology-animal-behavior-science_normalized.json
  - PhaseDNA: data/ethology-animal-behavior-science.en.phased.json, data/ethology-animal-behavior-science.es.phased.json, data/ethology-animal-behavior-science.fr.phased.json
  - TTS jobs: data/tts_jobs/ethology-animal-behavior-science.en.json, data/tts_jobs/ethology-animal-behavior-science.es.json, data/tts_jobs/ethology-animal-behavior-science.fr.json
- Subtasks:
  - [ ] Author normalized DNA source → data/ethology-animal-behavior-science_normalized.json
  - [ ] Generate PhaseDNA v1 (en + clone es/fr) → data/ethology-animal-behavior-science.en|es|fr.phased.json (cmd: node scripts/generate-phased-from-normalized.js --input data/ethology-animal-behavior-science_normalized.json --outbase data/ethology-animal-behavior-science --lang en --clone-es-fr)
  - [ ] Extract TTS jobs (per-phase narration) for en/es/fr → data/tts_jobs/ethology-animal-behavior-science.en|es|fr.json (cmd: node scripts/extract-tts-jobs.js --slugs ethology-animal-behavior-science --langs en,es,fr --in data --out data/tts_jobs)
  - [ ] Validate PhaseDNA shape and TTS jobs presence → npm run validate
  - [ ] Ensure day-to-slug resolver loads this lesson in index.html → Update getDNALessonData to include this day or general resolver
  - [ ] Attach minimal avatar cues/moods per phase (optional) → Edit phased JSON: phases[].avatar.cues
  - [ ] Quick review of es/fr clones for obvious issues → data/ethology-animal-behavior-science.es|fr.phased.json
  - [ ] Enable prefetch of next-phase TTS during playback → Player optimization (once globally implemented)
  - [ ] QA in index.html: phase texts render, TTS plays, interactions flow → Open index.html?day=196

## Day 197 — Paleontology - Life from the Past
- Learning objective: Explore deep time and evolution while building scientific literacy about evidence-based reasoning and climate change patterns.
- Slug: paleontology-life-from-the-past
- Files:
  - Normalized: data/paleontology-life-from-the-past_normalized.json
  - PhaseDNA: data/paleontology-life-from-the-past.en.phased.json, data/paleontology-life-from-the-past.es.phased.json, data/paleontology-life-from-the-past.fr.phased.json
  - TTS jobs: data/tts_jobs/paleontology-life-from-the-past.en.json, data/tts_jobs/paleontology-life-from-the-past.es.json, data/tts_jobs/paleontology-life-from-the-past.fr.json
- Subtasks:
  - [ ] Author normalized DNA source → data/paleontology-life-from-the-past_normalized.json
  - [ ] Generate PhaseDNA v1 (en + clone es/fr) → data/paleontology-life-from-the-past.en|es|fr.phased.json (cmd: node scripts/generate-phased-from-normalized.js --input data/paleontology-life-from-the-past_normalized.json --outbase data/paleontology-life-from-the-past --lang en --clone-es-fr)
  - [ ] Extract TTS jobs (per-phase narration) for en/es/fr → data/tts_jobs/paleontology-life-from-the-past.en|es|fr.json (cmd: node scripts/extract-tts-jobs.js --slugs paleontology-life-from-the-past --langs en,es,fr --in data --out data/tts_jobs)
  - [ ] Validate PhaseDNA shape and TTS jobs presence → npm run validate
  - [ ] Ensure day-to-slug resolver loads this lesson in index.html → Update getDNALessonData to include this day or general resolver
  - [ ] Attach minimal avatar cues/moods per phase (optional) → Edit phased JSON: phases[].avatar.cues
  - [ ] Quick review of es/fr clones for obvious issues → data/paleontology-life-from-the-past.es|fr.phased.json
  - [ ] Enable prefetch of next-phase TTS during playback → Player optimization (once globally implemented)
  - [ ] QA in index.html: phase texts render, TTS plays, interactions flow → Open index.html?day=197

## Day 198 — Film Making - Storytelling Through Moving Pictures
- Learning objective: Practice visual storytelling while understanding how cinema enables cultural exchange, social documentation, and democratic discourse.
- Slug: film-making-storytelling-through-moving-pictures
- Files:
  - Normalized: data/film-making-storytelling-through-moving-pictures_normalized.json
  - PhaseDNA: data/film-making-storytelling-through-moving-pictures.en.phased.json, data/film-making-storytelling-through-moving-pictures.es.phased.json, data/film-making-storytelling-through-moving-pictures.fr.phased.json
  - TTS jobs: data/tts_jobs/film-making-storytelling-through-moving-pictures.en.json, data/tts_jobs/film-making-storytelling-through-moving-pictures.es.json, data/tts_jobs/film-making-storytelling-through-moving-pictures.fr.json
- Subtasks:
  - [ ] Author normalized DNA source → data/film-making-storytelling-through-moving-pictures_normalized.json
  - [ ] Generate PhaseDNA v1 (en + clone es/fr) → data/film-making-storytelling-through-moving-pictures.en|es|fr.phased.json (cmd: node scripts/generate-phased-from-normalized.js --input data/film-making-storytelling-through-moving-pictures_normalized.json --outbase data/film-making-storytelling-through-moving-pictures --lang en --clone-es-fr)
  - [ ] Extract TTS jobs (per-phase narration) for en/es/fr → data/tts_jobs/film-making-storytelling-through-moving-pictures.en|es|fr.json (cmd: node scripts/extract-tts-jobs.js --slugs film-making-storytelling-through-moving-pictures --langs en,es,fr --in data --out data/tts_jobs)
  - [ ] Validate PhaseDNA shape and TTS jobs presence → npm run validate
  - [ ] Ensure day-to-slug resolver loads this lesson in index.html → Update getDNALessonData to include this day or general resolver
  - [ ] Attach minimal avatar cues/moods per phase (optional) → Edit phased JSON: phases[].avatar.cues
  - [ ] Quick review of es/fr clones for obvious issues → data/film-making-storytelling-through-moving-pictures.es|fr.phased.json
  - [ ] Enable prefetch of next-phase TTS during playback → Player optimization (once globally implemented)
  - [ ] QA in index.html: phase texts render, TTS plays, interactions flow → Open index.html?day=198

## Day 199 — Crystallography - The Geometry of Minerals
- Learning objective: Understand crystal structures while exploring how crystallography enables materials science, drug development, and technological miniaturization.
- Slug: crystallography-the-geometry-of-minerals
- Files:
  - Normalized: data/crystallography-the-geometry-of-minerals_normalized.json
  - PhaseDNA: data/crystallography-the-geometry-of-minerals.en.phased.json, data/crystallography-the-geometry-of-minerals.es.phased.json, data/crystallography-the-geometry-of-minerals.fr.phased.json
  - TTS jobs: data/tts_jobs/crystallography-the-geometry-of-minerals.en.json, data/tts_jobs/crystallography-the-geometry-of-minerals.es.json, data/tts_jobs/crystallography-the-geometry-of-minerals.fr.json
- Subtasks:
  - [ ] Author normalized DNA source → data/crystallography-the-geometry-of-minerals_normalized.json
  - [ ] Generate PhaseDNA v1 (en + clone es/fr) → data/crystallography-the-geometry-of-minerals.en|es|fr.phased.json (cmd: node scripts/generate-phased-from-normalized.js --input data/crystallography-the-geometry-of-minerals_normalized.json --outbase data/crystallography-the-geometry-of-minerals --lang en --clone-es-fr)
  - [ ] Extract TTS jobs (per-phase narration) for en/es/fr → data/tts_jobs/crystallography-the-geometry-of-minerals.en|es|fr.json (cmd: node scripts/extract-tts-jobs.js --slugs crystallography-the-geometry-of-minerals --langs en,es,fr --in data --out data/tts_jobs)
  - [ ] Validate PhaseDNA shape and TTS jobs presence → npm run validate
  - [ ] Ensure day-to-slug resolver loads this lesson in index.html → Update getDNALessonData to include this day or general resolver
  - [ ] Attach minimal avatar cues/moods per phase (optional) → Edit phased JSON: phases[].avatar.cues
  - [ ] Quick review of es/fr clones for obvious issues → data/crystallography-the-geometry-of-minerals.es|fr.phased.json
  - [ ] Enable prefetch of next-phase TTS during playback → Player optimization (once globally implemented)
  - [ ] QA in index.html: phase texts render, TTS plays, interactions flow → Open index.html?day=199

## Day 200 — Open Source Innovation - Collaborative Creation
- Learning objective: Practice collaborative development while understanding how open source principles enable democratic innovation, knowledge sharing, and technological sovereignty.
- Slug: open-source-innovation-collaborative-creation
- Files:
  - Normalized: data/open-source-innovation-collaborative-creation_normalized.json
  - PhaseDNA: data/open-source-innovation-collaborative-creation.en.phased.json, data/open-source-innovation-collaborative-creation.es.phased.json, data/open-source-innovation-collaborative-creation.fr.phased.json
  - TTS jobs: data/tts_jobs/open-source-innovation-collaborative-creation.en.json, data/tts_jobs/open-source-innovation-collaborative-creation.es.json, data/tts_jobs/open-source-innovation-collaborative-creation.fr.json
- Subtasks:
  - [ ] Author normalized DNA source → data/open-source-innovation-collaborative-creation_normalized.json
  - [ ] Generate PhaseDNA v1 (en + clone es/fr) → data/open-source-innovation-collaborative-creation.en|es|fr.phased.json (cmd: node scripts/generate-phased-from-normalized.js --input data/open-source-innovation-collaborative-creation_normalized.json --outbase data/open-source-innovation-collaborative-creation --lang en --clone-es-fr)
  - [ ] Extract TTS jobs (per-phase narration) for en/es/fr → data/tts_jobs/open-source-innovation-collaborative-creation.en|es|fr.json (cmd: node scripts/extract-tts-jobs.js --slugs open-source-innovation-collaborative-creation --langs en,es,fr --in data --out data/tts_jobs)
  - [ ] Validate PhaseDNA shape and TTS jobs presence → npm run validate
  - [ ] Ensure day-to-slug resolver loads this lesson in index.html → Update getDNALessonData to include this day or general resolver
  - [ ] Attach minimal avatar cues/moods per phase (optional) → Edit phased JSON: phases[].avatar.cues
  - [ ] Quick review of es/fr clones for obvious issues → data/open-source-innovation-collaborative-creation.es|fr.phased.json
  - [ ] Enable prefetch of next-phase TTS during playback → Player optimization (once globally implemented)
  - [ ] QA in index.html: phase texts render, TTS plays, interactions flow → Open index.html?day=200

## Day 201 — Astrobiology - The Search for Life Beyond Earth
- Learning objective: Explore possibilities of extraterrestrial life while understanding how astrobiology research drives technological innovation and international cooperation.
- Slug: astrobiology-the-search-for-life-beyond-earth
- Files:
  - Normalized: data/astrobiology-the-search-for-life-beyond-earth_normalized.json
  - PhaseDNA: data/astrobiology-the-search-for-life-beyond-earth.en.phased.json, data/astrobiology-the-search-for-life-beyond-earth.es.phased.json, data/astrobiology-the-search-for-life-beyond-earth.fr.phased.json
  - TTS jobs: data/tts_jobs/astrobiology-the-search-for-life-beyond-earth.en.json, data/tts_jobs/astrobiology-the-search-for-life-beyond-earth.es.json, data/tts_jobs/astrobiology-the-search-for-life-beyond-earth.fr.json
- Subtasks:
  - [ ] Author normalized DNA source → data/astrobiology-the-search-for-life-beyond-earth_normalized.json
  - [ ] Generate PhaseDNA v1 (en + clone es/fr) → data/astrobiology-the-search-for-life-beyond-earth.en|es|fr.phased.json (cmd: node scripts/generate-phased-from-normalized.js --input data/astrobiology-the-search-for-life-beyond-earth_normalized.json --outbase data/astrobiology-the-search-for-life-beyond-earth --lang en --clone-es-fr)
  - [ ] Extract TTS jobs (per-phase narration) for en/es/fr → data/tts_jobs/astrobiology-the-search-for-life-beyond-earth.en|es|fr.json (cmd: node scripts/extract-tts-jobs.js --slugs astrobiology-the-search-for-life-beyond-earth --langs en,es,fr --in data --out data/tts_jobs)
  - [ ] Validate PhaseDNA shape and TTS jobs presence → npm run validate
  - [ ] Ensure day-to-slug resolver loads this lesson in index.html → Update getDNALessonData to include this day or general resolver
  - [ ] Attach minimal avatar cues/moods per phase (optional) → Edit phased JSON: phases[].avatar.cues
  - [ ] Quick review of es/fr clones for obvious issues → data/astrobiology-the-search-for-life-beyond-earth.es|fr.phased.json
  - [ ] Enable prefetch of next-phase TTS during playback → Player optimization (once globally implemented)
  - [ ] QA in index.html: phase texts render, TTS plays, interactions flow → Open index.html?day=201

## Day 202 — Capillary Action - How Liquids Climb
- Learning objective: Understand surface forces while exploring how capillary physics enables plant biology, medical devices, and microfluidics technology.
- Slug: capillary-action-how-liquids-climb
- Files:
  - Normalized: data/capillary-action-how-liquids-climb_normalized.json
  - PhaseDNA: data/capillary-action-how-liquids-climb.en.phased.json, data/capillary-action-how-liquids-climb.es.phased.json, data/capillary-action-how-liquids-climb.fr.phased.json
  - TTS jobs: data/tts_jobs/capillary-action-how-liquids-climb.en.json, data/tts_jobs/capillary-action-how-liquids-climb.es.json, data/tts_jobs/capillary-action-how-liquids-climb.fr.json
- Subtasks:
  - [ ] Author normalized DNA source → data/capillary-action-how-liquids-climb_normalized.json
  - [ ] Generate PhaseDNA v1 (en + clone es/fr) → data/capillary-action-how-liquids-climb.en|es|fr.phased.json (cmd: node scripts/generate-phased-from-normalized.js --input data/capillary-action-how-liquids-climb_normalized.json --outbase data/capillary-action-how-liquids-climb --lang en --clone-es-fr)
  - [ ] Extract TTS jobs (per-phase narration) for en/es/fr → data/tts_jobs/capillary-action-how-liquids-climb.en|es|fr.json (cmd: node scripts/extract-tts-jobs.js --slugs capillary-action-how-liquids-climb --langs en,es,fr --in data --out data/tts_jobs)
  - [ ] Validate PhaseDNA shape and TTS jobs presence → npm run validate
  - [ ] Ensure day-to-slug resolver loads this lesson in index.html → Update getDNALessonData to include this day or general resolver
  - [ ] Attach minimal avatar cues/moods per phase (optional) → Edit phased JSON: phases[].avatar.cues
  - [ ] Quick review of es/fr clones for obvious issues → data/capillary-action-how-liquids-climb.es|fr.phased.json
  - [ ] Enable prefetch of next-phase TTS during playback → Player optimization (once globally implemented)
  - [ ] QA in index.html: phase texts render, TTS plays, interactions flow → Open index.html?day=202

## Day 203 — Biotechnology - Using Life to Solve Problems
- Learning objective: Explore biological applications while understanding how biotechnology can address global challenges while requiring ethical oversight and equitable access.
- Slug: biotechnology-using-life-to-solve-problems
- Files:
  - Normalized: data/biotechnology-using-life-to-solve-problems_normalized.json
  - PhaseDNA: data/biotechnology-using-life-to-solve-problems.en.phased.json, data/biotechnology-using-life-to-solve-problems.es.phased.json, data/biotechnology-using-life-to-solve-problems.fr.phased.json
  - TTS jobs: data/tts_jobs/biotechnology-using-life-to-solve-problems.en.json, data/tts_jobs/biotechnology-using-life-to-solve-problems.es.json, data/tts_jobs/biotechnology-using-life-to-solve-problems.fr.json
- Subtasks:
  - [ ] Author normalized DNA source → data/biotechnology-using-life-to-solve-problems_normalized.json
  - [ ] Generate PhaseDNA v1 (en + clone es/fr) → data/biotechnology-using-life-to-solve-problems.en|es|fr.phased.json (cmd: node scripts/generate-phased-from-normalized.js --input data/biotechnology-using-life-to-solve-problems_normalized.json --outbase data/biotechnology-using-life-to-solve-problems --lang en --clone-es-fr)
  - [ ] Extract TTS jobs (per-phase narration) for en/es/fr → data/tts_jobs/biotechnology-using-life-to-solve-problems.en|es|fr.json (cmd: node scripts/extract-tts-jobs.js --slugs biotechnology-using-life-to-solve-problems --langs en,es,fr --in data --out data/tts_jobs)
  - [ ] Validate PhaseDNA shape and TTS jobs presence → npm run validate
  - [ ] Ensure day-to-slug resolver loads this lesson in index.html → Update getDNALessonData to include this day or general resolver
  - [ ] Attach minimal avatar cues/moods per phase (optional) → Edit phased JSON: phases[].avatar.cues
  - [ ] Quick review of es/fr clones for obvious issues → data/biotechnology-using-life-to-solve-problems.es|fr.phased.json
  - [ ] Enable prefetch of next-phase TTS during playback → Player optimization (once globally implemented)
  - [ ] QA in index.html: phase texts render, TTS plays, interactions flow → Open index.html?day=203

## Day 204 — Genetic Engineering - Editing the Code of Life
- Learning objective: Understand gene editing while exploring the transformative potential and ethical implications of genetic technology for medicine and agriculture.
- Slug: genetic-engineering-editing-the-code-of-life
- Files:
  - Normalized: data/genetic-engineering-editing-the-code-of-life_normalized.json
  - PhaseDNA: data/genetic-engineering-editing-the-code-of-life.en.phased.json, data/genetic-engineering-editing-the-code-of-life.es.phased.json, data/genetic-engineering-editing-the-code-of-life.fr.phased.json
  - TTS jobs: data/tts_jobs/genetic-engineering-editing-the-code-of-life.en.json, data/tts_jobs/genetic-engineering-editing-the-code-of-life.es.json, data/tts_jobs/genetic-engineering-editing-the-code-of-life.fr.json
- Subtasks:
  - [ ] Author normalized DNA source → data/genetic-engineering-editing-the-code-of-life_normalized.json
  - [ ] Generate PhaseDNA v1 (en + clone es/fr) → data/genetic-engineering-editing-the-code-of-life.en|es|fr.phased.json (cmd: node scripts/generate-phased-from-normalized.js --input data/genetic-engineering-editing-the-code-of-life_normalized.json --outbase data/genetic-engineering-editing-the-code-of-life --lang en --clone-es-fr)
  - [ ] Extract TTS jobs (per-phase narration) for en/es/fr → data/tts_jobs/genetic-engineering-editing-the-code-of-life.en|es|fr.json (cmd: node scripts/extract-tts-jobs.js --slugs genetic-engineering-editing-the-code-of-life --langs en,es,fr --in data --out data/tts_jobs)
  - [ ] Validate PhaseDNA shape and TTS jobs presence → npm run validate
  - [ ] Ensure day-to-slug resolver loads this lesson in index.html → Update getDNALessonData to include this day or general resolver
  - [ ] Attach minimal avatar cues/moods per phase (optional) → Edit phased JSON: phases[].avatar.cues
  - [ ] Quick review of es/fr clones for obvious issues → data/genetic-engineering-editing-the-code-of-life.es|fr.phased.json
  - [ ] Enable prefetch of next-phase TTS during playback → Player optimization (once globally implemented)
  - [ ] QA in index.html: phase texts render, TTS plays, interactions flow → Open index.html?day=204

## Day 205 — Creative Writing - Crafting Stories and Poems
- Learning objective: Practice narrative expression while understanding how storytelling enables cultural preservation, social commentary, and empathy building.
- Slug: creative-writing-crafting-stories-and-poems
- Files:
  - Normalized: data/creative-writing-crafting-stories-and-poems_normalized.json
  - PhaseDNA: data/creative-writing-crafting-stories-and-poems.en.phased.json, data/creative-writing-crafting-stories-and-poems.es.phased.json, data/creative-writing-crafting-stories-and-poems.fr.phased.json
  - TTS jobs: data/tts_jobs/creative-writing-crafting-stories-and-poems.en.json, data/tts_jobs/creative-writing-crafting-stories-and-poems.es.json, data/tts_jobs/creative-writing-crafting-stories-and-poems.fr.json
- Subtasks:
  - [ ] Author normalized DNA source → data/creative-writing-crafting-stories-and-poems_normalized.json
  - [ ] Generate PhaseDNA v1 (en + clone es/fr) → data/creative-writing-crafting-stories-and-poems.en|es|fr.phased.json (cmd: node scripts/generate-phased-from-normalized.js --input data/creative-writing-crafting-stories-and-poems_normalized.json --outbase data/creative-writing-crafting-stories-and-poems --lang en --clone-es-fr)
  - [ ] Extract TTS jobs (per-phase narration) for en/es/fr → data/tts_jobs/creative-writing-crafting-stories-and-poems.en|es|fr.json (cmd: node scripts/extract-tts-jobs.js --slugs creative-writing-crafting-stories-and-poems --langs en,es,fr --in data --out data/tts_jobs)
  - [ ] Validate PhaseDNA shape and TTS jobs presence → npm run validate
  - [ ] Ensure day-to-slug resolver loads this lesson in index.html → Update getDNALessonData to include this day or general resolver
  - [ ] Attach minimal avatar cues/moods per phase (optional) → Edit phased JSON: phases[].avatar.cues
  - [ ] Quick review of es/fr clones for obvious issues → data/creative-writing-crafting-stories-and-poems.es|fr.phased.json
  - [ ] Enable prefetch of next-phase TTS during playback → Player optimization (once globally implemented)
  - [ ] QA in index.html: phase texts render, TTS plays, interactions flow → Open index.html?day=205

## Day 206 — Plasma Physics - The Fourth State of Matter
- Learning objective: Explore high-energy physics while understanding how plasma science enables fusion energy, space technology, and advanced manufacturing.
- Slug: plasma-physics-the-fourth-state-of-matter
- Files:
  - Normalized: data/plasma-physics-the-fourth-state-of-matter_normalized.json
  - PhaseDNA: data/plasma-physics-the-fourth-state-of-matter.en.phased.json, data/plasma-physics-the-fourth-state-of-matter.es.phased.json, data/plasma-physics-the-fourth-state-of-matter.fr.phased.json
  - TTS jobs: data/tts_jobs/plasma-physics-the-fourth-state-of-matter.en.json, data/tts_jobs/plasma-physics-the-fourth-state-of-matter.es.json, data/tts_jobs/plasma-physics-the-fourth-state-of-matter.fr.json
- Subtasks:
  - [ ] Author normalized DNA source → data/plasma-physics-the-fourth-state-of-matter_normalized.json
  - [ ] Generate PhaseDNA v1 (en + clone es/fr) → data/plasma-physics-the-fourth-state-of-matter.en|es|fr.phased.json (cmd: node scripts/generate-phased-from-normalized.js --input data/plasma-physics-the-fourth-state-of-matter_normalized.json --outbase data/plasma-physics-the-fourth-state-of-matter --lang en --clone-es-fr)
  - [ ] Extract TTS jobs (per-phase narration) for en/es/fr → data/tts_jobs/plasma-physics-the-fourth-state-of-matter.en|es|fr.json (cmd: node scripts/extract-tts-jobs.js --slugs plasma-physics-the-fourth-state-of-matter --langs en,es,fr --in data --out data/tts_jobs)
  - [ ] Validate PhaseDNA shape and TTS jobs presence → npm run validate
  - [ ] Ensure day-to-slug resolver loads this lesson in index.html → Update getDNALessonData to include this day or general resolver
  - [ ] Attach minimal avatar cues/moods per phase (optional) → Edit phased JSON: phases[].avatar.cues
  - [ ] Quick review of es/fr clones for obvious issues → data/plasma-physics-the-fourth-state-of-matter.es|fr.phased.json
  - [ ] Enable prefetch of next-phase TTS during playback → Player optimization (once globally implemented)
  - [ ] QA in index.html: phase texts render, TTS plays, interactions flow → Open index.html?day=206

## Day 207 — Disruptive Innovation - Ideas That Change Everything
- Learning objective: Understand innovation patterns while exploring how disruptive technologies can either democratize or concentrate power depending on their governance.
- Slug: disruptive-innovation-ideas-that-change-everything
- Files:
  - Normalized: data/disruptive-innovation-ideas-that-change-everything_normalized.json
  - PhaseDNA: data/disruptive-innovation-ideas-that-change-everything.en.phased.json, data/disruptive-innovation-ideas-that-change-everything.es.phased.json, data/disruptive-innovation-ideas-that-change-everything.fr.phased.json
  - TTS jobs: data/tts_jobs/disruptive-innovation-ideas-that-change-everything.en.json, data/tts_jobs/disruptive-innovation-ideas-that-change-everything.es.json, data/tts_jobs/disruptive-innovation-ideas-that-change-everything.fr.json
- Subtasks:
  - [ ] Author normalized DNA source → data/disruptive-innovation-ideas-that-change-everything_normalized.json
  - [ ] Generate PhaseDNA v1 (en + clone es/fr) → data/disruptive-innovation-ideas-that-change-everything.en|es|fr.phased.json (cmd: node scripts/generate-phased-from-normalized.js --input data/disruptive-innovation-ideas-that-change-everything_normalized.json --outbase data/disruptive-innovation-ideas-that-change-everything --lang en --clone-es-fr)
  - [ ] Extract TTS jobs (per-phase narration) for en/es/fr → data/tts_jobs/disruptive-innovation-ideas-that-change-everything.en|es|fr.json (cmd: node scripts/extract-tts-jobs.js --slugs disruptive-innovation-ideas-that-change-everything --langs en,es,fr --in data --out data/tts_jobs)
  - [ ] Validate PhaseDNA shape and TTS jobs presence → npm run validate
  - [ ] Ensure day-to-slug resolver loads this lesson in index.html → Update getDNALessonData to include this day or general resolver
  - [ ] Attach minimal avatar cues/moods per phase (optional) → Edit phased JSON: phases[].avatar.cues
  - [ ] Quick review of es/fr clones for obvious issues → data/disruptive-innovation-ideas-that-change-everything.es|fr.phased.json
  - [ ] Enable prefetch of next-phase TTS during playback → Player optimization (once globally implemented)
  - [ ] QA in index.html: phase texts render, TTS plays, interactions flow → Open index.html?day=207

## Day 208 — Stem Cells - The Body's Repair Kit
- Learning objective: Explore regenerative biology while understanding how stem cell research raises ethical questions about medical applications and research oversight.
- Slug: stem-cells-the-bodys-repair-kit
- Files:
  - Normalized: data/stem-cells-the-bodys-repair-kit_normalized.json
  - PhaseDNA: data/stem-cells-the-bodys-repair-kit.en.phased.json, data/stem-cells-the-bodys-repair-kit.es.phased.json, data/stem-cells-the-bodys-repair-kit.fr.phased.json
  - TTS jobs: data/tts_jobs/stem-cells-the-bodys-repair-kit.en.json, data/tts_jobs/stem-cells-the-bodys-repair-kit.es.json, data/tts_jobs/stem-cells-the-bodys-repair-kit.fr.json
- Subtasks:
  - [ ] Author normalized DNA source → data/stem-cells-the-bodys-repair-kit_normalized.json
  - [ ] Generate PhaseDNA v1 (en + clone es/fr) → data/stem-cells-the-bodys-repair-kit.en|es|fr.phased.json (cmd: node scripts/generate-phased-from-normalized.js --input data/stem-cells-the-bodys-repair-kit_normalized.json --outbase data/stem-cells-the-bodys-repair-kit --lang en --clone-es-fr)
  - [ ] Extract TTS jobs (per-phase narration) for en/es/fr → data/tts_jobs/stem-cells-the-bodys-repair-kit.en|es|fr.json (cmd: node scripts/extract-tts-jobs.js --slugs stem-cells-the-bodys-repair-kit --langs en,es,fr --in data --out data/tts_jobs)
  - [ ] Validate PhaseDNA shape and TTS jobs presence → npm run validate
  - [ ] Ensure day-to-slug resolver loads this lesson in index.html → Update getDNALessonData to include this day or general resolver
  - [ ] Attach minimal avatar cues/moods per phase (optional) → Edit phased JSON: phases[].avatar.cues
  - [ ] Quick review of es/fr clones for obvious issues → data/stem-cells-the-bodys-repair-kit.es|fr.phased.json
  - [ ] Enable prefetch of next-phase TTS during playback → Player optimization (once globally implemented)
  - [ ] QA in index.html: phase texts render, TTS plays, interactions flow → Open index.html?day=208

## Day 209 — Parasitology - Nature's Freeloaders
- Learning objective: Understand parasitic relationships while exploring how parasitology informs public health, agriculture, and ecological balance.
- Slug: parasitology-natures-freeloaders
- Files:
  - Normalized: data/parasitology-natures-freeloaders_normalized.json
  - PhaseDNA: data/parasitology-natures-freeloaders.en.phased.json, data/parasitology-natures-freeloaders.es.phased.json, data/parasitology-natures-freeloaders.fr.phased.json
  - TTS jobs: data/tts_jobs/parasitology-natures-freeloaders.en.json, data/tts_jobs/parasitology-natures-freeloaders.es.json, data/tts_jobs/parasitology-natures-freeloaders.fr.json
- Subtasks:
  - [ ] Author normalized DNA source → data/parasitology-natures-freeloaders_normalized.json
  - [ ] Generate PhaseDNA v1 (en + clone es/fr) → data/parasitology-natures-freeloaders.en|es|fr.phased.json (cmd: node scripts/generate-phased-from-normalized.js --input data/parasitology-natures-freeloaders_normalized.json --outbase data/parasitology-natures-freeloaders --lang en --clone-es-fr)
  - [ ] Extract TTS jobs (per-phase narration) for en/es/fr → data/tts_jobs/parasitology-natures-freeloaders.en|es|fr.json (cmd: node scripts/extract-tts-jobs.js --slugs parasitology-natures-freeloaders --langs en,es,fr --in data --out data/tts_jobs)
  - [ ] Validate PhaseDNA shape and TTS jobs presence → npm run validate
  - [ ] Ensure day-to-slug resolver loads this lesson in index.html → Update getDNALessonData to include this day or general resolver
  - [ ] Attach minimal avatar cues/moods per phase (optional) → Edit phased JSON: phases[].avatar.cues
  - [ ] Quick review of es/fr clones for obvious issues → data/parasitology-natures-freeloaders.es|fr.phased.json
  - [ ] Enable prefetch of next-phase TTS during playback → Player optimization (once globally implemented)
  - [ ] QA in index.html: phase texts render, TTS plays, interactions flow → Open index.html?day=209

## Day 210 — Aging Process - How Life Changes Over Time
- Learning objective: Understand biological aging while exploring how gerontology research affects healthcare policy, social support systems, and end-of-life ethics.
- Slug: aging-process-how-life-changes-over-time
- Files:
  - Normalized: data/aging-process-how-life-changes-over-time_normalized.json
  - PhaseDNA: data/aging-process-how-life-changes-over-time.en.phased.json, data/aging-process-how-life-changes-over-time.es.phased.json, data/aging-process-how-life-changes-over-time.fr.phased.json
  - TTS jobs: data/tts_jobs/aging-process-how-life-changes-over-time.en.json, data/tts_jobs/aging-process-how-life-changes-over-time.es.json, data/tts_jobs/aging-process-how-life-changes-over-time.fr.json
- Subtasks:
  - [ ] Author normalized DNA source → data/aging-process-how-life-changes-over-time_normalized.json
  - [ ] Generate PhaseDNA v1 (en + clone es/fr) → data/aging-process-how-life-changes-over-time.en|es|fr.phased.json (cmd: node scripts/generate-phased-from-normalized.js --input data/aging-process-how-life-changes-over-time_normalized.json --outbase data/aging-process-how-life-changes-over-time --lang en --clone-es-fr)
  - [ ] Extract TTS jobs (per-phase narration) for en/es/fr → data/tts_jobs/aging-process-how-life-changes-over-time.en|es|fr.json (cmd: node scripts/extract-tts-jobs.js --slugs aging-process-how-life-changes-over-time --langs en,es,fr --in data --out data/tts_jobs)
  - [ ] Validate PhaseDNA shape and TTS jobs presence → npm run validate
  - [ ] Ensure day-to-slug resolver loads this lesson in index.html → Update getDNALessonData to include this day or general resolver
  - [ ] Attach minimal avatar cues/moods per phase (optional) → Edit phased JSON: phases[].avatar.cues
  - [ ] Quick review of es/fr clones for obvious issues → data/aging-process-how-life-changes-over-time.es|fr.phased.json
  - [ ] Enable prefetch of next-phase TTS during playback → Player optimization (once globally implemented)
  - [ ] QA in index.html: phase texts render, TTS plays, interactions flow → Open index.html?day=210

## Day 211 — Nutrition Science - Fueling the Body
- Learning objective: Apply nutritional knowledge while understanding how food science informs public health policy, agricultural practices, and global food security.
- Slug: nutrition-science-fueling-the-body
- Files:
  - Normalized: data/nutrition-science-fueling-the-body_normalized.json
  - PhaseDNA: data/nutrition-science-fueling-the-body.en.phased.json, data/nutrition-science-fueling-the-body.es.phased.json, data/nutrition-science-fueling-the-body.fr.phased.json
  - TTS jobs: data/tts_jobs/nutrition-science-fueling-the-body.en.json, data/tts_jobs/nutrition-science-fueling-the-body.es.json, data/tts_jobs/nutrition-science-fueling-the-body.fr.json
- Subtasks:
  - [ ] Author normalized DNA source → data/nutrition-science-fueling-the-body_normalized.json
  - [ ] Generate PhaseDNA v1 (en + clone es/fr) → data/nutrition-science-fueling-the-body.en|es|fr.phased.json (cmd: node scripts/generate-phased-from-normalized.js --input data/nutrition-science-fueling-the-body_normalized.json --outbase data/nutrition-science-fueling-the-body --lang en --clone-es-fr)
  - [ ] Extract TTS jobs (per-phase narration) for en/es/fr → data/tts_jobs/nutrition-science-fueling-the-body.en|es|fr.json (cmd: node scripts/extract-tts-jobs.js --slugs nutrition-science-fueling-the-body --langs en,es,fr --in data --out data/tts_jobs)
  - [ ] Validate PhaseDNA shape and TTS jobs presence → npm run validate
  - [ ] Ensure day-to-slug resolver loads this lesson in index.html → Update getDNALessonData to include this day or general resolver
  - [ ] Attach minimal avatar cues/moods per phase (optional) → Edit phased JSON: phases[].avatar.cues
  - [ ] Quick review of es/fr clones for obvious issues → data/nutrition-science-fueling-the-body.es|fr.phased.json
  - [ ] Enable prefetch of next-phase TTS during playback → Player optimization (once globally implemented)
  - [ ] QA in index.html: phase texts render, TTS plays, interactions flow → Open index.html?day=211

## Day 212 — Poetry - The Art of Condensed Expression
- Learning objective: Practice linguistic creativity while understanding how poetry enables cultural expression, social critique, and cross-cultural communication.
- Slug: poetry-the-art-of-condensed-expression
- Files:
  - Normalized: data/poetry-the-art-of-condensed-expression_normalized.json
  - PhaseDNA: data/poetry-the-art-of-condensed-expression.en.phased.json, data/poetry-the-art-of-condensed-expression.es.phased.json, data/poetry-the-art-of-condensed-expression.fr.phased.json
  - TTS jobs: data/tts_jobs/poetry-the-art-of-condensed-expression.en.json, data/tts_jobs/poetry-the-art-of-condensed-expression.es.json, data/tts_jobs/poetry-the-art-of-condensed-expression.fr.json
- Subtasks:
  - [ ] Author normalized DNA source → data/poetry-the-art-of-condensed-expression_normalized.json
  - [ ] Generate PhaseDNA v1 (en + clone es/fr) → data/poetry-the-art-of-condensed-expression.en|es|fr.phased.json (cmd: node scripts/generate-phased-from-normalized.js --input data/poetry-the-art-of-condensed-expression_normalized.json --outbase data/poetry-the-art-of-condensed-expression --lang en --clone-es-fr)
  - [ ] Extract TTS jobs (per-phase narration) for en/es/fr → data/tts_jobs/poetry-the-art-of-condensed-expression.en|es|fr.json (cmd: node scripts/extract-tts-jobs.js --slugs poetry-the-art-of-condensed-expression --langs en,es,fr --in data --out data/tts_jobs)
  - [ ] Validate PhaseDNA shape and TTS jobs presence → npm run validate
  - [ ] Ensure day-to-slug resolver loads this lesson in index.html → Update getDNALessonData to include this day or general resolver
  - [ ] Attach minimal avatar cues/moods per phase (optional) → Edit phased JSON: phases[].avatar.cues
  - [ ] Quick review of es/fr clones for obvious issues → data/poetry-the-art-of-condensed-expression.es|fr.phased.json
  - [ ] Enable prefetch of next-phase TTS during playback → Player optimization (once globally implemented)
  - [ ] QA in index.html: phase texts render, TTS plays, interactions flow → Open index.html?day=212

## Day 213 — Electromagnetic Spectrum - Beyond Visible Light
- Learning objective: Understand radiation physics while exploring how electromagnetic knowledge enables communication, medical imaging, and astronomical observation.
- Slug: electromagnetic-spectrum-beyond-visible-light
- Files:
  - Normalized: data/electromagnetic-spectrum-beyond-visible-light_normalized.json
  - PhaseDNA: data/electromagnetic-spectrum-beyond-visible-light.en.phased.json, data/electromagnetic-spectrum-beyond-visible-light.es.phased.json, data/electromagnetic-spectrum-beyond-visible-light.fr.phased.json
  - TTS jobs: data/tts_jobs/electromagnetic-spectrum-beyond-visible-light.en.json, data/tts_jobs/electromagnetic-spectrum-beyond-visible-light.es.json, data/tts_jobs/electromagnetic-spectrum-beyond-visible-light.fr.json
- Subtasks:
  - [ ] Author normalized DNA source → data/electromagnetic-spectrum-beyond-visible-light_normalized.json
  - [ ] Generate PhaseDNA v1 (en + clone es/fr) → data/electromagnetic-spectrum-beyond-visible-light.en|es|fr.phased.json (cmd: node scripts/generate-phased-from-normalized.js --input data/electromagnetic-spectrum-beyond-visible-light_normalized.json --outbase data/electromagnetic-spectrum-beyond-visible-light --lang en --clone-es-fr)
  - [ ] Extract TTS jobs (per-phase narration) for en/es/fr → data/tts_jobs/electromagnetic-spectrum-beyond-visible-light.en|es|fr.json (cmd: node scripts/extract-tts-jobs.js --slugs electromagnetic-spectrum-beyond-visible-light --langs en,es,fr --in data --out data/tts_jobs)
  - [ ] Validate PhaseDNA shape and TTS jobs presence → npm run validate
  - [ ] Ensure day-to-slug resolver loads this lesson in index.html → Update getDNALessonData to include this day or general resolver
  - [ ] Attach minimal avatar cues/moods per phase (optional) → Edit phased JSON: phases[].avatar.cues
  - [ ] Quick review of es/fr clones for obvious issues → data/electromagnetic-spectrum-beyond-visible-light.es|fr.phased.json
  - [ ] Enable prefetch of next-phase TTS during playback → Player optimization (once globally implemented)
  - [ ] QA in index.html: phase texts render, TTS plays, interactions flow → Open index.html?day=213

## Day 214 — Sustainable Innovation - Creating Without Destroying
- Learning objective: Practice sustainable design thinking while understanding how environmental considerations must guide technological development and economic systems.
- Slug: sustainable-innovation-creating-without-destroying
- Files:
  - Normalized: data/sustainable-innovation-creating-without-destroying_normalized.json
  - PhaseDNA: data/sustainable-innovation-creating-without-destroying.en.phased.json, data/sustainable-innovation-creating-without-destroying.es.phased.json, data/sustainable-innovation-creating-without-destroying.fr.phased.json
  - TTS jobs: data/tts_jobs/sustainable-innovation-creating-without-destroying.en.json, data/tts_jobs/sustainable-innovation-creating-without-destroying.es.json, data/tts_jobs/sustainable-innovation-creating-without-destroying.fr.json
- Subtasks:
  - [ ] Author normalized DNA source → data/sustainable-innovation-creating-without-destroying_normalized.json
  - [ ] Generate PhaseDNA v1 (en + clone es/fr) → data/sustainable-innovation-creating-without-destroying.en|es|fr.phased.json (cmd: node scripts/generate-phased-from-normalized.js --input data/sustainable-innovation-creating-without-destroying_normalized.json --outbase data/sustainable-innovation-creating-without-destroying --lang en --clone-es-fr)
  - [ ] Extract TTS jobs (per-phase narration) for en/es/fr → data/tts_jobs/sustainable-innovation-creating-without-destroying.en|es|fr.json (cmd: node scripts/extract-tts-jobs.js --slugs sustainable-innovation-creating-without-destroying --langs en,es,fr --in data --out data/tts_jobs)
  - [ ] Validate PhaseDNA shape and TTS jobs presence → npm run validate
  - [ ] Ensure day-to-slug resolver loads this lesson in index.html → Update getDNALessonData to include this day or general resolver
  - [ ] Attach minimal avatar cues/moods per phase (optional) → Edit phased JSON: phases[].avatar.cues
  - [ ] Quick review of es/fr clones for obvious issues → data/sustainable-innovation-creating-without-destroying.es|fr.phased.json
  - [ ] Enable prefetch of next-phase TTS during playback → Player optimization (once globally implemented)
  - [ ] QA in index.html: phase texts render, TTS plays, interactions flow → Open index.html?day=214

## Day 215 — Sensory Systems - How We Perceive the World
- Learning objective: Understand perception while exploring how sensory science informs accessibility technology, virtual reality, and human-computer interfaces.
- Slug: sensory-systems-how-we-perceive-the-world
- Files:
  - Normalized: data/sensory-systems-how-we-perceive-the-world_normalized.json
  - PhaseDNA: data/sensory-systems-how-we-perceive-the-world.en.phased.json, data/sensory-systems-how-we-perceive-the-world.es.phased.json, data/sensory-systems-how-we-perceive-the-world.fr.phased.json
  - TTS jobs: data/tts_jobs/sensory-systems-how-we-perceive-the-world.en.json, data/tts_jobs/sensory-systems-how-we-perceive-the-world.es.json, data/tts_jobs/sensory-systems-how-we-perceive-the-world.fr.json
- Subtasks:
  - [ ] Author normalized DNA source → data/sensory-systems-how-we-perceive-the-world_normalized.json
  - [ ] Generate PhaseDNA v1 (en + clone es/fr) → data/sensory-systems-how-we-perceive-the-world.en|es|fr.phased.json (cmd: node scripts/generate-phased-from-normalized.js --input data/sensory-systems-how-we-perceive-the-world_normalized.json --outbase data/sensory-systems-how-we-perceive-the-world --lang en --clone-es-fr)
  - [ ] Extract TTS jobs (per-phase narration) for en/es/fr → data/tts_jobs/sensory-systems-how-we-perceive-the-world.en|es|fr.json (cmd: node scripts/extract-tts-jobs.js --slugs sensory-systems-how-we-perceive-the-world --langs en,es,fr --in data --out data/tts_jobs)
  - [ ] Validate PhaseDNA shape and TTS jobs presence → npm run validate
  - [ ] Ensure day-to-slug resolver loads this lesson in index.html → Update getDNALessonData to include this day or general resolver
  - [ ] Attach minimal avatar cues/moods per phase (optional) → Edit phased JSON: phases[].avatar.cues
  - [ ] Quick review of es/fr clones for obvious issues → data/sensory-systems-how-we-perceive-the-world.es|fr.phased.json
  - [ ] Enable prefetch of next-phase TTS during playback → Player optimization (once globally implemented)
  - [ ] QA in index.html: phase texts render, TTS plays, interactions flow → Open index.html?day=215

## Day 216 — Calculus - The Mathematics of Change
- Learning objective: Master mathematical analysis while understanding how calculus enables engineering, economics, and scientific modeling of dynamic systems.
- Slug: calculus-the-mathematics-of-change
- Files:
  - Normalized: data/calculus-the-mathematics-of-change_normalized.json
  - PhaseDNA: data/calculus-the-mathematics-of-change.en.phased.json, data/calculus-the-mathematics-of-change.es.phased.json, data/calculus-the-mathematics-of-change.fr.phased.json
  - TTS jobs: data/tts_jobs/calculus-the-mathematics-of-change.en.json, data/tts_jobs/calculus-the-mathematics-of-change.es.json, data/tts_jobs/calculus-the-mathematics-of-change.fr.json
- Subtasks:
  - [ ] Author normalized DNA source → data/calculus-the-mathematics-of-change_normalized.json
  - [ ] Generate PhaseDNA v1 (en + clone es/fr) → data/calculus-the-mathematics-of-change.en|es|fr.phased.json (cmd: node scripts/generate-phased-from-normalized.js --input data/calculus-the-mathematics-of-change_normalized.json --outbase data/calculus-the-mathematics-of-change --lang en --clone-es-fr)
  - [ ] Extract TTS jobs (per-phase narration) for en/es/fr → data/tts_jobs/calculus-the-mathematics-of-change.en|es|fr.json (cmd: node scripts/extract-tts-jobs.js --slugs calculus-the-mathematics-of-change --langs en,es,fr --in data --out data/tts_jobs)
  - [ ] Validate PhaseDNA shape and TTS jobs presence → npm run validate
  - [ ] Ensure day-to-slug resolver loads this lesson in index.html → Update getDNALessonData to include this day or general resolver
  - [ ] Attach minimal avatar cues/moods per phase (optional) → Edit phased JSON: phases[].avatar.cues
  - [ ] Quick review of es/fr clones for obvious issues → data/calculus-the-mathematics-of-change.es|fr.phased.json
  - [ ] Enable prefetch of next-phase TTS during playback → Player optimization (once globally implemented)
  - [ ] QA in index.html: phase texts render, TTS plays, interactions flow → Open index.html?day=216

## Day 217 — Music Evolution - The Soundtrack of Civilization
- Learning objective: Explore musical development while understanding how cultural evolution reflects and shapes social values, technology, and global connections.
- Slug: music-evolution-the-soundtrack-of-civilization
- Files:
  - Normalized: data/music-evolution-the-soundtrack-of-civilization_normalized.json
  - PhaseDNA: data/music-evolution-the-soundtrack-of-civilization.en.phased.json, data/music-evolution-the-soundtrack-of-civilization.es.phased.json, data/music-evolution-the-soundtrack-of-civilization.fr.phased.json
  - TTS jobs: data/tts_jobs/music-evolution-the-soundtrack-of-civilization.en.json, data/tts_jobs/music-evolution-the-soundtrack-of-civilization.es.json, data/tts_jobs/music-evolution-the-soundtrack-of-civilization.fr.json
- Subtasks:
  - [ ] Author normalized DNA source → data/music-evolution-the-soundtrack-of-civilization_normalized.json
  - [ ] Generate PhaseDNA v1 (en + clone es/fr) → data/music-evolution-the-soundtrack-of-civilization.en|es|fr.phased.json (cmd: node scripts/generate-phased-from-normalized.js --input data/music-evolution-the-soundtrack-of-civilization_normalized.json --outbase data/music-evolution-the-soundtrack-of-civilization --lang en --clone-es-fr)
  - [ ] Extract TTS jobs (per-phase narration) for en/es/fr → data/tts_jobs/music-evolution-the-soundtrack-of-civilization.en|es|fr.json (cmd: node scripts/extract-tts-jobs.js --slugs music-evolution-the-soundtrack-of-civilization --langs en,es,fr --in data --out data/tts_jobs)
  - [ ] Validate PhaseDNA shape and TTS jobs presence → npm run validate
  - [ ] Ensure day-to-slug resolver loads this lesson in index.html → Update getDNALessonData to include this day or general resolver
  - [ ] Attach minimal avatar cues/moods per phase (optional) → Edit phased JSON: phases[].avatar.cues
  - [ ] Quick review of es/fr clones for obvious issues → data/music-evolution-the-soundtrack-of-civilization.es|fr.phased.json
  - [ ] Enable prefetch of next-phase TTS during playback → Player optimization (once globally implemented)
  - [ ] QA in index.html: phase texts render, TTS plays, interactions flow → Open index.html?day=217

## Day 218 — Writing Systems - Recording Human Thought
- Learning objective: Understand communication evolution while exploring how writing systems affect literacy, democracy, and cultural preservation.
- Slug: writing-systems-recording-human-thought
- Files:
  - Normalized: data/writing-systems-recording-human-thought_normalized.json
  - PhaseDNA: data/writing-systems-recording-human-thought.en.phased.json, data/writing-systems-recording-human-thought.es.phased.json, data/writing-systems-recording-human-thought.fr.phased.json
  - TTS jobs: data/tts_jobs/writing-systems-recording-human-thought.en.json, data/tts_jobs/writing-systems-recording-human-thought.es.json, data/tts_jobs/writing-systems-recording-human-thought.fr.json
- Subtasks:
  - [ ] Author normalized DNA source → data/writing-systems-recording-human-thought_normalized.json
  - [ ] Generate PhaseDNA v1 (en + clone es/fr) → data/writing-systems-recording-human-thought.en|es|fr.phased.json (cmd: node scripts/generate-phased-from-normalized.js --input data/writing-systems-recording-human-thought_normalized.json --outbase data/writing-systems-recording-human-thought --lang en --clone-es-fr)
  - [ ] Extract TTS jobs (per-phase narration) for en/es/fr → data/tts_jobs/writing-systems-recording-human-thought.en|es|fr.json (cmd: node scripts/extract-tts-jobs.js --slugs writing-systems-recording-human-thought --langs en,es,fr --in data --out data/tts_jobs)
  - [ ] Validate PhaseDNA shape and TTS jobs presence → npm run validate
  - [ ] Ensure day-to-slug resolver loads this lesson in index.html → Update getDNALessonData to include this day or general resolver
  - [ ] Attach minimal avatar cues/moods per phase (optional) → Edit phased JSON: phases[].avatar.cues
  - [ ] Quick review of es/fr clones for obvious issues → data/writing-systems-recording-human-thought.es|fr.phased.json
  - [ ] Enable prefetch of next-phase TTS during playback → Player optimization (once globally implemented)
  - [ ] QA in index.html: phase texts render, TTS plays, interactions flow → Open index.html?day=218

## Day 219 — Storytelling - The Ancient Art of Narrative
- Learning objective: Practice narrative skills while understanding how storytelling enables knowledge transmission, empathy building, and social cohesion.
- Slug: storytelling-the-ancient-art-of-narrative
- Files:
  - Normalized: data/storytelling-the-ancient-art-of-narrative_normalized.json
  - PhaseDNA: data/storytelling-the-ancient-art-of-narrative.en.phased.json, data/storytelling-the-ancient-art-of-narrative.es.phased.json, data/storytelling-the-ancient-art-of-narrative.fr.phased.json
  - TTS jobs: data/tts_jobs/storytelling-the-ancient-art-of-narrative.en.json, data/tts_jobs/storytelling-the-ancient-art-of-narrative.es.json, data/tts_jobs/storytelling-the-ancient-art-of-narrative.fr.json
- Subtasks:
  - [ ] Author normalized DNA source → data/storytelling-the-ancient-art-of-narrative_normalized.json
  - [ ] Generate PhaseDNA v1 (en + clone es/fr) → data/storytelling-the-ancient-art-of-narrative.en|es|fr.phased.json (cmd: node scripts/generate-phased-from-normalized.js --input data/storytelling-the-ancient-art-of-narrative_normalized.json --outbase data/storytelling-the-ancient-art-of-narrative --lang en --clone-es-fr)
  - [ ] Extract TTS jobs (per-phase narration) for en/es/fr → data/tts_jobs/storytelling-the-ancient-art-of-narrative.en|es|fr.json (cmd: node scripts/extract-tts-jobs.js --slugs storytelling-the-ancient-art-of-narrative --langs en,es,fr --in data --out data/tts_jobs)
  - [ ] Validate PhaseDNA shape and TTS jobs presence → npm run validate
  - [ ] Ensure day-to-slug resolver loads this lesson in index.html → Update getDNALessonData to include this day or general resolver
  - [ ] Attach minimal avatar cues/moods per phase (optional) → Edit phased JSON: phases[].avatar.cues
  - [ ] Quick review of es/fr clones for obvious issues → data/storytelling-the-ancient-art-of-narrative.es|fr.phased.json
  - [ ] Enable prefetch of next-phase TTS during playback → Player optimization (once globally implemented)
  - [ ] QA in index.html: phase texts render, TTS plays, interactions flow → Open index.html?day=219

## Day 220 — Radioactivity - Natural Nuclear Decay
- Learning objective: Understand nuclear physics while exploring how radiation science enables medical treatment, energy production, and geological dating.
- Slug: radioactivity-natural-nuclear-decay
- Files:
  - Normalized: data/radioactivity-natural-nuclear-decay_normalized.json
  - PhaseDNA: data/radioactivity-natural-nuclear-decay.en.phased.json, data/radioactivity-natural-nuclear-decay.es.phased.json, data/radioactivity-natural-nuclear-decay.fr.phased.json
  - TTS jobs: data/tts_jobs/radioactivity-natural-nuclear-decay.en.json, data/tts_jobs/radioactivity-natural-nuclear-decay.es.json, data/tts_jobs/radioactivity-natural-nuclear-decay.fr.json
- Subtasks:
  - [ ] Author normalized DNA source → data/radioactivity-natural-nuclear-decay_normalized.json
  - [ ] Generate PhaseDNA v1 (en + clone es/fr) → data/radioactivity-natural-nuclear-decay.en|es|fr.phased.json (cmd: node scripts/generate-phased-from-normalized.js --input data/radioactivity-natural-nuclear-decay_normalized.json --outbase data/radioactivity-natural-nuclear-decay --lang en --clone-es-fr)
  - [ ] Extract TTS jobs (per-phase narration) for en/es/fr → data/tts_jobs/radioactivity-natural-nuclear-decay.en|es|fr.json (cmd: node scripts/extract-tts-jobs.js --slugs radioactivity-natural-nuclear-decay --langs en,es,fr --in data --out data/tts_jobs)
  - [ ] Validate PhaseDNA shape and TTS jobs presence → npm run validate
  - [ ] Ensure day-to-slug resolver loads this lesson in index.html → Update getDNALessonData to include this day or general resolver
  - [ ] Attach minimal avatar cues/moods per phase (optional) → Edit phased JSON: phases[].avatar.cues
  - [ ] Quick review of es/fr clones for obvious issues → data/radioactivity-natural-nuclear-decay.es|fr.phased.json
  - [ ] Enable prefetch of next-phase TTS during playback → Player optimization (once globally implemented)
  - [ ] QA in index.html: phase texts render, TTS plays, interactions flow → Open index.html?day=220

## Day 221 — Digital Innovation - New Possibilities in the Digital Age
- Learning objective: Explore digital transformation while understanding how digital technology can either enhance or undermine democratic participation and human rights.
- Slug: digital-innovation-new-possibilities-in-the-digital-age
- Files:
  - Normalized: data/digital-innovation-new-possibilities-in-the-digital-age_normalized.json
  - PhaseDNA: data/digital-innovation-new-possibilities-in-the-digital-age.en.phased.json, data/digital-innovation-new-possibilities-in-the-digital-age.es.phased.json, data/digital-innovation-new-possibilities-in-the-digital-age.fr.phased.json
  - TTS jobs: data/tts_jobs/digital-innovation-new-possibilities-in-the-digital-age.en.json, data/tts_jobs/digital-innovation-new-possibilities-in-the-digital-age.es.json, data/tts_jobs/digital-innovation-new-possibilities-in-the-digital-age.fr.json
- Subtasks:
  - [ ] Author normalized DNA source → data/digital-innovation-new-possibilities-in-the-digital-age_normalized.json
  - [ ] Generate PhaseDNA v1 (en + clone es/fr) → data/digital-innovation-new-possibilities-in-the-digital-age.en|es|fr.phased.json (cmd: node scripts/generate-phased-from-normalized.js --input data/digital-innovation-new-possibilities-in-the-digital-age_normalized.json --outbase data/digital-innovation-new-possibilities-in-the-digital-age --lang en --clone-es-fr)
  - [ ] Extract TTS jobs (per-phase narration) for en/es/fr → data/tts_jobs/digital-innovation-new-possibilities-in-the-digital-age.en|es|fr.json (cmd: node scripts/extract-tts-jobs.js --slugs digital-innovation-new-possibilities-in-the-digital-age --langs en,es,fr --in data --out data/tts_jobs)
  - [ ] Validate PhaseDNA shape and TTS jobs presence → npm run validate
  - [ ] Ensure day-to-slug resolver loads this lesson in index.html → Update getDNALessonData to include this day or general resolver
  - [ ] Attach minimal avatar cues/moods per phase (optional) → Edit phased JSON: phases[].avatar.cues
  - [ ] Quick review of es/fr clones for obvious issues → data/digital-innovation-new-possibilities-in-the-digital-age.es|fr.phased.json
  - [ ] Enable prefetch of next-phase TTS during playback → Player optimization (once globally implemented)
  - [ ] QA in index.html: phase texts render, TTS plays, interactions flow → Open index.html?day=221

## Day 222 — Economic Systems - How Societies Organize Resources
- Learning objective: Understand economic structures while exploring how different economic models affect equity, sustainability, and democratic governance.
- Slug: economic-systems-how-societies-organize-resources
- Files:
  - Normalized: data/economic-systems-how-societies-organize-resources_normalized.json
  - PhaseDNA: data/economic-systems-how-societies-organize-resources.en.phased.json, data/economic-systems-how-societies-organize-resources.es.phased.json, data/economic-systems-how-societies-organize-resources.fr.phased.json
  - TTS jobs: data/tts_jobs/economic-systems-how-societies-organize-resources.en.json, data/tts_jobs/economic-systems-how-societies-organize-resources.es.json, data/tts_jobs/economic-systems-how-societies-organize-resources.fr.json
- Subtasks:
  - [ ] Author normalized DNA source → data/economic-systems-how-societies-organize-resources_normalized.json
  - [ ] Generate PhaseDNA v1 (en + clone es/fr) → data/economic-systems-how-societies-organize-resources.en|es|fr.phased.json (cmd: node scripts/generate-phased-from-normalized.js --input data/economic-systems-how-societies-organize-resources_normalized.json --outbase data/economic-systems-how-societies-organize-resources --lang en --clone-es-fr)
  - [ ] Extract TTS jobs (per-phase narration) for en/es/fr → data/tts_jobs/economic-systems-how-societies-organize-resources.en|es|fr.json (cmd: node scripts/extract-tts-jobs.js --slugs economic-systems-how-societies-organize-resources --langs en,es,fr --in data --out data/tts_jobs)
  - [ ] Validate PhaseDNA shape and TTS jobs presence → npm run validate
  - [ ] Ensure day-to-slug resolver loads this lesson in index.html → Update getDNALessonData to include this day or general resolver
  - [ ] Attach minimal avatar cues/moods per phase (optional) → Edit phased JSON: phases[].avatar.cues
  - [ ] Quick review of es/fr clones for obvious issues → data/economic-systems-how-societies-organize-resources.es|fr.phased.json
  - [ ] Enable prefetch of next-phase TTS during playback → Player optimization (once globally implemented)
  - [ ] QA in index.html: phase texts render, TTS plays, interactions flow → Open index.html?day=222

## Day 223 — Set Theory - The Mathematics of Collections
- Learning objective: Master foundational mathematics while understanding how set theory enables computer science, logic, and systematic thinking.
- Slug: set-theory-the-mathematics-of-collections
- Files:
  - Normalized: data/set-theory-the-mathematics-of-collections_normalized.json
  - PhaseDNA: data/set-theory-the-mathematics-of-collections.en.phased.json, data/set-theory-the-mathematics-of-collections.es.phased.json, data/set-theory-the-mathematics-of-collections.fr.phased.json
  - TTS jobs: data/tts_jobs/set-theory-the-mathematics-of-collections.en.json, data/tts_jobs/set-theory-the-mathematics-of-collections.es.json, data/tts_jobs/set-theory-the-mathematics-of-collections.fr.json
- Subtasks:
  - [ ] Author normalized DNA source → data/set-theory-the-mathematics-of-collections_normalized.json
  - [ ] Generate PhaseDNA v1 (en + clone es/fr) → data/set-theory-the-mathematics-of-collections.en|es|fr.phased.json (cmd: node scripts/generate-phased-from-normalized.js --input data/set-theory-the-mathematics-of-collections_normalized.json --outbase data/set-theory-the-mathematics-of-collections --lang en --clone-es-fr)
  - [ ] Extract TTS jobs (per-phase narration) for en/es/fr → data/tts_jobs/set-theory-the-mathematics-of-collections.en|es|fr.json (cmd: node scripts/extract-tts-jobs.js --slugs set-theory-the-mathematics-of-collections --langs en,es,fr --in data --out data/tts_jobs)
  - [ ] Validate PhaseDNA shape and TTS jobs presence → npm run validate
  - [ ] Ensure day-to-slug resolver loads this lesson in index.html → Update getDNALessonData to include this day or general resolver
  - [ ] Attach minimal avatar cues/moods per phase (optional) → Edit phased JSON: phases[].avatar.cues
  - [ ] Quick review of es/fr clones for obvious issues → data/set-theory-the-mathematics-of-collections.es|fr.phased.json
  - [ ] Enable prefetch of next-phase TTS during playback → Player optimization (once globally implemented)
  - [ ] QA in index.html: phase texts render, TTS plays, interactions flow → Open index.html?day=223

## Day 224 — Technological Revolutions - How Innovation Changes Life
- Learning objective: Analyze technological change while understanding how societies can shape technology development to serve human flourishing rather than exploitation.
- Slug: technological-revolutions-how-innovation-changes-life
- Files:
  - Normalized: data/technological-revolutions-how-innovation-changes-life_normalized.json
  - PhaseDNA: data/technological-revolutions-how-innovation-changes-life.en.phased.json, data/technological-revolutions-how-innovation-changes-life.es.phased.json, data/technological-revolutions-how-innovation-changes-life.fr.phased.json
  - TTS jobs: data/tts_jobs/technological-revolutions-how-innovation-changes-life.en.json, data/tts_jobs/technological-revolutions-how-innovation-changes-life.es.json, data/tts_jobs/technological-revolutions-how-innovation-changes-life.fr.json
- Subtasks:
  - [ ] Author normalized DNA source → data/technological-revolutions-how-innovation-changes-life_normalized.json
  - [ ] Generate PhaseDNA v1 (en + clone es/fr) → data/technological-revolutions-how-innovation-changes-life.en|es|fr.phased.json (cmd: node scripts/generate-phased-from-normalized.js --input data/technological-revolutions-how-innovation-changes-life_normalized.json --outbase data/technological-revolutions-how-innovation-changes-life --lang en --clone-es-fr)
  - [ ] Extract TTS jobs (per-phase narration) for en/es/fr → data/tts_jobs/technological-revolutions-how-innovation-changes-life.en|es|fr.json (cmd: node scripts/extract-tts-jobs.js --slugs technological-revolutions-how-innovation-changes-life --langs en,es,fr --in data --out data/tts_jobs)
  - [ ] Validate PhaseDNA shape and TTS jobs presence → npm run validate
  - [ ] Ensure day-to-slug resolver loads this lesson in index.html → Update getDNALessonData to include this day or general resolver
  - [ ] Attach minimal avatar cues/moods per phase (optional) → Edit phased JSON: phases[].avatar.cues
  - [ ] Quick review of es/fr clones for obvious issues → data/technological-revolutions-how-innovation-changes-life.es|fr.phased.json
  - [ ] Enable prefetch of next-phase TTS during playback → Player optimization (once globally implemented)
  - [ ] QA in index.html: phase texts render, TTS plays, interactions flow → Open index.html?day=224

## Day 225 — Environmental Movements - Protecting Our Planet
- Learning objective: Understand environmental activism while building skills for civic engagement, coalition building, and advocacy for sustainable policies.
- Slug: environmental-movements-protecting-our-planet
- Files:
  - Normalized: data/environmental-movements-protecting-our-planet_normalized.json
  - PhaseDNA: data/environmental-movements-protecting-our-planet.en.phased.json, data/environmental-movements-protecting-our-planet.es.phased.json, data/environmental-movements-protecting-our-planet.fr.phased.json
  - TTS jobs: data/tts_jobs/environmental-movements-protecting-our-planet.en.json, data/tts_jobs/environmental-movements-protecting-our-planet.es.json, data/tts_jobs/environmental-movements-protecting-our-planet.fr.json
- Subtasks:
  - [ ] Author normalized DNA source → data/environmental-movements-protecting-our-planet_normalized.json
  - [ ] Generate PhaseDNA v1 (en + clone es/fr) → data/environmental-movements-protecting-our-planet.en|es|fr.phased.json (cmd: node scripts/generate-phased-from-normalized.js --input data/environmental-movements-protecting-our-planet_normalized.json --outbase data/environmental-movements-protecting-our-planet --lang en --clone-es-fr)
  - [ ] Extract TTS jobs (per-phase narration) for en/es/fr → data/tts_jobs/environmental-movements-protecting-our-planet.en|es|fr.json (cmd: node scripts/extract-tts-jobs.js --slugs environmental-movements-protecting-our-planet --langs en,es,fr --in data --out data/tts_jobs)
  - [ ] Validate PhaseDNA shape and TTS jobs presence → npm run validate
  - [ ] Ensure day-to-slug resolver loads this lesson in index.html → Update getDNALessonData to include this day or general resolver
  - [ ] Attach minimal avatar cues/moods per phase (optional) → Edit phased JSON: phases[].avatar.cues
  - [ ] Quick review of es/fr clones for obvious issues → data/environmental-movements-protecting-our-planet.es|fr.phased.json
  - [ ] Enable prefetch of next-phase TTS during playback → Player optimization (once globally implemented)
  - [ ] QA in index.html: phase texts render, TTS plays, interactions flow → Open index.html?day=225

## Day 226 — Calligraphy - Beautiful Writing as Art
- Learning objective: Practice precision and beauty while understanding how calligraphy preserves cultural traditions and enables meditative focus.
- Slug: calligraphy-beautiful-writing-as-art
- Files:
  - Normalized: data/calligraphy-beautiful-writing-as-art_normalized.json
  - PhaseDNA: data/calligraphy-beautiful-writing-as-art.en.phased.json, data/calligraphy-beautiful-writing-as-art.es.phased.json, data/calligraphy-beautiful-writing-as-art.fr.phased.json
  - TTS jobs: data/tts_jobs/calligraphy-beautiful-writing-as-art.en.json, data/tts_jobs/calligraphy-beautiful-writing-as-art.es.json, data/tts_jobs/calligraphy-beautiful-writing-as-art.fr.json
- Subtasks:
  - [ ] Author normalized DNA source → data/calligraphy-beautiful-writing-as-art_normalized.json
  - [ ] Generate PhaseDNA v1 (en + clone es/fr) → data/calligraphy-beautiful-writing-as-art.en|es|fr.phased.json (cmd: node scripts/generate-phased-from-normalized.js --input data/calligraphy-beautiful-writing-as-art_normalized.json --outbase data/calligraphy-beautiful-writing-as-art --lang en --clone-es-fr)
  - [ ] Extract TTS jobs (per-phase narration) for en/es/fr → data/tts_jobs/calligraphy-beautiful-writing-as-art.en|es|fr.json (cmd: node scripts/extract-tts-jobs.js --slugs calligraphy-beautiful-writing-as-art --langs en,es,fr --in data --out data/tts_jobs)
  - [ ] Validate PhaseDNA shape and TTS jobs presence → npm run validate
  - [ ] Ensure day-to-slug resolver loads this lesson in index.html → Update getDNALessonData to include this day or general resolver
  - [ ] Attach minimal avatar cues/moods per phase (optional) → Edit phased JSON: phases[].avatar.cues
  - [ ] Quick review of es/fr clones for obvious issues → data/calligraphy-beautiful-writing-as-art.es|fr.phased.json
  - [ ] Enable prefetch of next-phase TTS during playback → Player optimization (once globally implemented)
  - [ ] QA in index.html: phase texts render, TTS plays, interactions flow → Open index.html?day=226

## Day 227 — Superconductivity - Electricity Without Resistance
- Learning objective: Explore advanced physics while understanding how superconductivity enables MRI technology, quantum computing, and efficient energy transmission.
- Slug: superconductivity-electricity-without-resistance
- Files:
  - Normalized: data/superconductivity-electricity-without-resistance_normalized.json
  - PhaseDNA: data/superconductivity-electricity-without-resistance.en.phased.json, data/superconductivity-electricity-without-resistance.es.phased.json, data/superconductivity-electricity-without-resistance.fr.phased.json
  - TTS jobs: data/tts_jobs/superconductivity-electricity-without-resistance.en.json, data/tts_jobs/superconductivity-electricity-without-resistance.es.json, data/tts_jobs/superconductivity-electricity-without-resistance.fr.json
- Subtasks:
  - [ ] Author normalized DNA source → data/superconductivity-electricity-without-resistance_normalized.json
  - [ ] Generate PhaseDNA v1 (en + clone es/fr) → data/superconductivity-electricity-without-resistance.en|es|fr.phased.json (cmd: node scripts/generate-phased-from-normalized.js --input data/superconductivity-electricity-without-resistance_normalized.json --outbase data/superconductivity-electricity-without-resistance --lang en --clone-es-fr)
  - [ ] Extract TTS jobs (per-phase narration) for en/es/fr → data/tts_jobs/superconductivity-electricity-without-resistance.en|es|fr.json (cmd: node scripts/extract-tts-jobs.js --slugs superconductivity-electricity-without-resistance --langs en,es,fr --in data --out data/tts_jobs)
  - [ ] Validate PhaseDNA shape and TTS jobs presence → npm run validate
  - [ ] Ensure day-to-slug resolver loads this lesson in index.html → Update getDNALessonData to include this day or general resolver
  - [ ] Attach minimal avatar cues/moods per phase (optional) → Edit phased JSON: phases[].avatar.cues
  - [ ] Quick review of es/fr clones for obvious issues → data/superconductivity-electricity-without-resistance.es|fr.phased.json
  - [ ] Enable prefetch of next-phase TTS during playback → Player optimization (once globally implemented)
  - [ ] QA in index.html: phase texts render, TTS plays, interactions flow → Open index.html?day=227

## Day 228 — Reverse Engineering - Learning by Taking Apart
- Learning objective: Practice analytical thinking while understanding how reverse engineering enables innovation, repair culture, and technological independence.
- Slug: reverse-engineering-learning-by-taking-apart
- Files:
  - Normalized: data/reverse-engineering-learning-by-taking-apart_normalized.json
  - PhaseDNA: data/reverse-engineering-learning-by-taking-apart.en.phased.json, data/reverse-engineering-learning-by-taking-apart.es.phased.json, data/reverse-engineering-learning-by-taking-apart.fr.phased.json
  - TTS jobs: data/tts_jobs/reverse-engineering-learning-by-taking-apart.en.json, data/tts_jobs/reverse-engineering-learning-by-taking-apart.es.json, data/tts_jobs/reverse-engineering-learning-by-taking-apart.fr.json
- Subtasks:
  - [ ] Author normalized DNA source → data/reverse-engineering-learning-by-taking-apart_normalized.json
  - [ ] Generate PhaseDNA v1 (en + clone es/fr) → data/reverse-engineering-learning-by-taking-apart.en|es|fr.phased.json (cmd: node scripts/generate-phased-from-normalized.js --input data/reverse-engineering-learning-by-taking-apart_normalized.json --outbase data/reverse-engineering-learning-by-taking-apart --lang en --clone-es-fr)
  - [ ] Extract TTS jobs (per-phase narration) for en/es/fr → data/tts_jobs/reverse-engineering-learning-by-taking-apart.en|es|fr.json (cmd: node scripts/extract-tts-jobs.js --slugs reverse-engineering-learning-by-taking-apart --langs en,es,fr --in data --out data/tts_jobs)
  - [ ] Validate PhaseDNA shape and TTS jobs presence → npm run validate
  - [ ] Ensure day-to-slug resolver loads this lesson in index.html → Update getDNALessonData to include this day or general resolver
  - [ ] Attach minimal avatar cues/moods per phase (optional) → Edit phased JSON: phases[].avatar.cues
  - [ ] Quick review of es/fr clones for obvious issues → data/reverse-engineering-learning-by-taking-apart.es|fr.phased.json
  - [ ] Enable prefetch of next-phase TTS during playback → Player optimization (once globally implemented)
  - [ ] QA in index.html: phase texts render, TTS plays, interactions flow → Open index.html?day=228

## Day 229 — Quantum Mechanics - The Physics of the Very Small
- Learning objective: Explore quantum physics while understanding how quantum mechanics enables computing, cryptography, and fundamental scientific discovery.
- Slug: quantum-mechanics-the-physics-of-the-very-small
- Files:
  - Normalized: data/quantum-mechanics-the-physics-of-the-very-small_normalized.json
  - PhaseDNA: data/quantum-mechanics-the-physics-of-the-very-small.en.phased.json, data/quantum-mechanics-the-physics-of-the-very-small.es.phased.json, data/quantum-mechanics-the-physics-of-the-very-small.fr.phased.json
  - TTS jobs: data/tts_jobs/quantum-mechanics-the-physics-of-the-very-small.en.json, data/tts_jobs/quantum-mechanics-the-physics-of-the-very-small.es.json, data/tts_jobs/quantum-mechanics-the-physics-of-the-very-small.fr.json
- Subtasks:
  - [ ] Author normalized DNA source → data/quantum-mechanics-the-physics-of-the-very-small_normalized.json
  - [ ] Generate PhaseDNA v1 (en + clone es/fr) → data/quantum-mechanics-the-physics-of-the-very-small.en|es|fr.phased.json (cmd: node scripts/generate-phased-from-normalized.js --input data/quantum-mechanics-the-physics-of-the-very-small_normalized.json --outbase data/quantum-mechanics-the-physics-of-the-very-small --lang en --clone-es-fr)
  - [ ] Extract TTS jobs (per-phase narration) for en/es/fr → data/tts_jobs/quantum-mechanics-the-physics-of-the-very-small.en|es|fr.json (cmd: node scripts/extract-tts-jobs.js --slugs quantum-mechanics-the-physics-of-the-very-small --langs en,es,fr --in data --out data/tts_jobs)
  - [ ] Validate PhaseDNA shape and TTS jobs presence → npm run validate
  - [ ] Ensure day-to-slug resolver loads this lesson in index.html → Update getDNALessonData to include this day or general resolver
  - [ ] Attach minimal avatar cues/moods per phase (optional) → Edit phased JSON: phases[].avatar.cues
  - [ ] Quick review of es/fr clones for obvious issues → data/quantum-mechanics-the-physics-of-the-very-small.es|fr.phased.json
  - [ ] Enable prefetch of next-phase TTS during playback → Player optimization (once globally implemented)
  - [ ] QA in index.html: phase texts render, TTS plays, interactions flow → Open index.html?day=229

## Day 230 — Social Psychology - Understanding Group Behavior
- Learning objective: Understand social dynamics while exploring how group psychology affects democracy, social movements, and collective decision-making.
- Slug: social-psychology-understanding-group-behavior
- Files:
  - Normalized: data/social-psychology-understanding-group-behavior_normalized.json
  - PhaseDNA: data/social-psychology-understanding-group-behavior.en.phased.json, data/social-psychology-understanding-group-behavior.es.phased.json, data/social-psychology-understanding-group-behavior.fr.phased.json
  - TTS jobs: data/tts_jobs/social-psychology-understanding-group-behavior.en.json, data/tts_jobs/social-psychology-understanding-group-behavior.es.json, data/tts_jobs/social-psychology-understanding-group-behavior.fr.json
- Subtasks:
  - [ ] Author normalized DNA source → data/social-psychology-understanding-group-behavior_normalized.json
  - [ ] Generate PhaseDNA v1 (en + clone es/fr) → data/social-psychology-understanding-group-behavior.en|es|fr.phased.json (cmd: node scripts/generate-phased-from-normalized.js --input data/social-psychology-understanding-group-behavior_normalized.json --outbase data/social-psychology-understanding-group-behavior --lang en --clone-es-fr)
  - [ ] Extract TTS jobs (per-phase narration) for en/es/fr → data/tts_jobs/social-psychology-understanding-group-behavior.en|es|fr.json (cmd: node scripts/extract-tts-jobs.js --slugs social-psychology-understanding-group-behavior --langs en,es,fr --in data --out data/tts_jobs)
  - [ ] Validate PhaseDNA shape and TTS jobs presence → npm run validate
  - [ ] Ensure day-to-slug resolver loads this lesson in index.html → Update getDNALessonData to include this day or general resolver
  - [ ] Attach minimal avatar cues/moods per phase (optional) → Edit phased JSON: phases[].avatar.cues
  - [ ] Quick review of es/fr clones for obvious issues → data/social-psychology-understanding-group-behavior.es|fr.phased.json
  - [ ] Enable prefetch of next-phase TTS during playback → Player optimization (once globally implemented)
  - [ ] QA in index.html: phase texts render, TTS plays, interactions flow → Open index.html?day=230

## Day 231 — Materials Science - Engineering the Future
- Learning objective: Explore material properties while understanding how materials science enables sustainable technology, medical devices, and energy solutions.
- Slug: materials-science-engineering-the-future
- Files:
  - Normalized: data/materials-science-engineering-the-future_normalized.json
  - PhaseDNA: data/materials-science-engineering-the-future.en.phased.json, data/materials-science-engineering-the-future.es.phased.json, data/materials-science-engineering-the-future.fr.phased.json
  - TTS jobs: data/tts_jobs/materials-science-engineering-the-future.en.json, data/tts_jobs/materials-science-engineering-the-future.es.json, data/tts_jobs/materials-science-engineering-the-future.fr.json
- Subtasks:
  - [ ] Author normalized DNA source → data/materials-science-engineering-the-future_normalized.json
  - [ ] Generate PhaseDNA v1 (en + clone es/fr) → data/materials-science-engineering-the-future.en|es|fr.phased.json (cmd: node scripts/generate-phased-from-normalized.js --input data/materials-science-engineering-the-future_normalized.json --outbase data/materials-science-engineering-the-future --lang en --clone-es-fr)
  - [ ] Extract TTS jobs (per-phase narration) for en/es/fr → data/tts_jobs/materials-science-engineering-the-future.en|es|fr.json (cmd: node scripts/extract-tts-jobs.js --slugs materials-science-engineering-the-future --langs en,es,fr --in data --out data/tts_jobs)
  - [ ] Validate PhaseDNA shape and TTS jobs presence → npm run validate
  - [ ] Ensure day-to-slug resolver loads this lesson in index.html → Update getDNALessonData to include this day or general resolver
  - [ ] Attach minimal avatar cues/moods per phase (optional) → Edit phased JSON: phases[].avatar.cues
  - [ ] Quick review of es/fr clones for obvious issues → data/materials-science-engineering-the-future.es|fr.phased.json
  - [ ] Enable prefetch of next-phase TTS during playback → Player optimization (once globally implemented)
  - [ ] QA in index.html: phase texts render, TTS plays, interactions flow → Open index.html?day=231

## Day 232 — Cognitive Science - How the Mind Works
- Learning objective: Understand mental processes while exploring how cognitive science informs education, artificial intelligence, and human-computer interaction.
- Slug: cognitive-science-how-the-mind-works
- Files:
  - Normalized: data/cognitive-science-how-the-mind-works_normalized.json
  - PhaseDNA: data/cognitive-science-how-the-mind-works.en.phased.json, data/cognitive-science-how-the-mind-works.es.phased.json, data/cognitive-science-how-the-mind-works.fr.phased.json
  - TTS jobs: data/tts_jobs/cognitive-science-how-the-mind-works.en.json, data/tts_jobs/cognitive-science-how-the-mind-works.es.json, data/tts_jobs/cognitive-science-how-the-mind-works.fr.json
- Subtasks:
  - [ ] Author normalized DNA source → data/cognitive-science-how-the-mind-works_normalized.json
  - [ ] Generate PhaseDNA v1 (en + clone es/fr) → data/cognitive-science-how-the-mind-works.en|es|fr.phased.json (cmd: node scripts/generate-phased-from-normalized.js --input data/cognitive-science-how-the-mind-works_normalized.json --outbase data/cognitive-science-how-the-mind-works --lang en --clone-es-fr)
  - [ ] Extract TTS jobs (per-phase narration) for en/es/fr → data/tts_jobs/cognitive-science-how-the-mind-works.en|es|fr.json (cmd: node scripts/extract-tts-jobs.js --slugs cognitive-science-how-the-mind-works --langs en,es,fr --in data --out data/tts_jobs)
  - [ ] Validate PhaseDNA shape and TTS jobs presence → npm run validate
  - [ ] Ensure day-to-slug resolver loads this lesson in index.html → Update getDNALessonData to include this day or general resolver
  - [ ] Attach minimal avatar cues/moods per phase (optional) → Edit phased JSON: phases[].avatar.cues
  - [ ] Quick review of es/fr clones for obvious issues → data/cognitive-science-how-the-mind-works.es|fr.phased.json
  - [ ] Enable prefetch of next-phase TTS during playback → Player optimization (once globally implemented)
  - [ ] QA in index.html: phase texts render, TTS plays, interactions flow → Open index.html?day=232

## Day 233 — Climate Science - Understanding Earth's Systems
- Learning objective: Understand climate dynamics while exploring how climate science informs policy, adaptation strategies, and global cooperation.
- Slug: climate-science-understanding-earths-systems
- Files:
  - Normalized: data/climate-science-understanding-earths-systems_normalized.json
  - PhaseDNA: data/climate-science-understanding-earths-systems.en.phased.json, data/climate-science-understanding-earths-systems.es.phased.json, data/climate-science-understanding-earths-systems.fr.phased.json
  - TTS jobs: data/tts_jobs/climate-science-understanding-earths-systems.en.json, data/tts_jobs/climate-science-understanding-earths-systems.es.json, data/tts_jobs/climate-science-understanding-earths-systems.fr.json
- Subtasks:
  - [ ] Author normalized DNA source → data/climate-science-understanding-earths-systems_normalized.json
  - [ ] Generate PhaseDNA v1 (en + clone es/fr) → data/climate-science-understanding-earths-systems.en|es|fr.phased.json (cmd: node scripts/generate-phased-from-normalized.js --input data/climate-science-understanding-earths-systems_normalized.json --outbase data/climate-science-understanding-earths-systems --lang en --clone-es-fr)
  - [ ] Extract TTS jobs (per-phase narration) for en/es/fr → data/tts_jobs/climate-science-understanding-earths-systems.en|es|fr.json (cmd: node scripts/extract-tts-jobs.js --slugs climate-science-understanding-earths-systems --langs en,es,fr --in data --out data/tts_jobs)
  - [ ] Validate PhaseDNA shape and TTS jobs presence → npm run validate
  - [ ] Ensure day-to-slug resolver loads this lesson in index.html → Update getDNALessonData to include this day or general resolver
  - [ ] Attach minimal avatar cues/moods per phase (optional) → Edit phased JSON: phases[].avatar.cues
  - [ ] Quick review of es/fr clones for obvious issues → data/climate-science-understanding-earths-systems.es|fr.phased.json
  - [ ] Enable prefetch of next-phase TTS during playback → Player optimization (once globally implemented)
  - [ ] QA in index.html: phase texts render, TTS plays, interactions flow → Open index.html?day=233

## Day 234 — Game Theory - Strategic Decision Making
- Learning objective: Practice strategic thinking while understanding how game theory enables economics, political science, and conflict resolution.
- Slug: game-theory-strategic-decision-making
- Files:
  - Normalized: data/game-theory-strategic-decision-making_normalized.json
  - PhaseDNA: data/game-theory-strategic-decision-making.en.phased.json, data/game-theory-strategic-decision-making.es.phased.json, data/game-theory-strategic-decision-making.fr.phased.json
  - TTS jobs: data/tts_jobs/game-theory-strategic-decision-making.en.json, data/tts_jobs/game-theory-strategic-decision-making.es.json, data/tts_jobs/game-theory-strategic-decision-making.fr.json
- Subtasks:
  - [ ] Author normalized DNA source → data/game-theory-strategic-decision-making_normalized.json
  - [ ] Generate PhaseDNA v1 (en + clone es/fr) → data/game-theory-strategic-decision-making.en|es|fr.phased.json (cmd: node scripts/generate-phased-from-normalized.js --input data/game-theory-strategic-decision-making_normalized.json --outbase data/game-theory-strategic-decision-making --lang en --clone-es-fr)
  - [ ] Extract TTS jobs (per-phase narration) for en/es/fr → data/tts_jobs/game-theory-strategic-decision-making.en|es|fr.json (cmd: node scripts/extract-tts-jobs.js --slugs game-theory-strategic-decision-making --langs en,es,fr --in data --out data/tts_jobs)
  - [ ] Validate PhaseDNA shape and TTS jobs presence → npm run validate
  - [ ] Ensure day-to-slug resolver loads this lesson in index.html → Update getDNALessonData to include this day or general resolver
  - [ ] Attach minimal avatar cues/moods per phase (optional) → Edit phased JSON: phases[].avatar.cues
  - [ ] Quick review of es/fr clones for obvious issues → data/game-theory-strategic-decision-making.es|fr.phased.json
  - [ ] Enable prefetch of next-phase TTS during playback → Player optimization (once globally implemented)
  - [ ] QA in index.html: phase texts render, TTS plays, interactions flow → Open index.html?day=234

## Day 235 — Nanotechnology - Engineering at the Molecular Scale
- Learning objective: Explore molecular engineering while understanding how nanotechnology enables medical breakthroughs, energy efficiency, and materials innovation.
- Slug: nanotechnology-engineering-at-the-molecular-scale
- Files:
  - Normalized: data/nanotechnology-engineering-at-the-molecular-scale_normalized.json
  - PhaseDNA: data/nanotechnology-engineering-at-the-molecular-scale.en.phased.json, data/nanotechnology-engineering-at-the-molecular-scale.es.phased.json, data/nanotechnology-engineering-at-the-molecular-scale.fr.phased.json
  - TTS jobs: data/tts_jobs/nanotechnology-engineering-at-the-molecular-scale.en.json, data/tts_jobs/nanotechnology-engineering-at-the-molecular-scale.es.json, data/tts_jobs/nanotechnology-engineering-at-the-molecular-scale.fr.json
- Subtasks:
  - [ ] Author normalized DNA source → data/nanotechnology-engineering-at-the-molecular-scale_normalized.json
  - [ ] Generate PhaseDNA v1 (en + clone es/fr) → data/nanotechnology-engineering-at-the-molecular-scale.en|es|fr.phased.json (cmd: node scripts/generate-phased-from-normalized.js --input data/nanotechnology-engineering-at-the-molecular-scale_normalized.json --outbase data/nanotechnology-engineering-at-the-molecular-scale --lang en --clone-es-fr)
  - [ ] Extract TTS jobs (per-phase narration) for en/es/fr → data/tts_jobs/nanotechnology-engineering-at-the-molecular-scale.en|es|fr.json (cmd: node scripts/extract-tts-jobs.js --slugs nanotechnology-engineering-at-the-molecular-scale --langs en,es,fr --in data --out data/tts_jobs)
  - [ ] Validate PhaseDNA shape and TTS jobs presence → npm run validate
  - [ ] Ensure day-to-slug resolver loads this lesson in index.html → Update getDNALessonData to include this day or general resolver
  - [ ] Attach minimal avatar cues/moods per phase (optional) → Edit phased JSON: phases[].avatar.cues
  - [ ] Quick review of es/fr clones for obvious issues → data/nanotechnology-engineering-at-the-molecular-scale.es|fr.phased.json
  - [ ] Enable prefetch of next-phase TTS during playback → Player optimization (once globally implemented)
  - [ ] QA in index.html: phase texts render, TTS plays, interactions flow → Open index.html?day=235

## Day 236 — Cultural Anthropology - Understanding Human Societies
- Learning objective: Understand cultural diversity while exploring how anthropology informs cross-cultural communication, development, and human rights.
- Slug: cultural-anthropology-understanding-human-societies
- Files:
  - Normalized: data/cultural-anthropology-understanding-human-societies_normalized.json
  - PhaseDNA: data/cultural-anthropology-understanding-human-societies.en.phased.json, data/cultural-anthropology-understanding-human-societies.es.phased.json, data/cultural-anthropology-understanding-human-societies.fr.phased.json
  - TTS jobs: data/tts_jobs/cultural-anthropology-understanding-human-societies.en.json, data/tts_jobs/cultural-anthropology-understanding-human-societies.es.json, data/tts_jobs/cultural-anthropology-understanding-human-societies.fr.json
- Subtasks:
  - [ ] Author normalized DNA source → data/cultural-anthropology-understanding-human-societies_normalized.json
  - [ ] Generate PhaseDNA v1 (en + clone es/fr) → data/cultural-anthropology-understanding-human-societies.en|es|fr.phased.json (cmd: node scripts/generate-phased-from-normalized.js --input data/cultural-anthropology-understanding-human-societies_normalized.json --outbase data/cultural-anthropology-understanding-human-societies --lang en --clone-es-fr)
  - [ ] Extract TTS jobs (per-phase narration) for en/es/fr → data/tts_jobs/cultural-anthropology-understanding-human-societies.en|es|fr.json (cmd: node scripts/extract-tts-jobs.js --slugs cultural-anthropology-understanding-human-societies --langs en,es,fr --in data --out data/tts_jobs)
  - [ ] Validate PhaseDNA shape and TTS jobs presence → npm run validate
  - [ ] Ensure day-to-slug resolver loads this lesson in index.html → Update getDNALessonData to include this day or general resolver
  - [ ] Attach minimal avatar cues/moods per phase (optional) → Edit phased JSON: phases[].avatar.cues
  - [ ] Quick review of es/fr clones for obvious issues → data/cultural-anthropology-understanding-human-societies.es|fr.phased.json
  - [ ] Enable prefetch of next-phase TTS during playback → Player optimization (once globally implemented)
  - [ ] QA in index.html: phase texts render, TTS plays, interactions flow → Open index.html?day=236

## Day 237 — Robotics - Machines That Think and Act
- Learning objective: Explore automation while understanding how robotics enables manufacturing, exploration, and assistance for people with disabilities.
- Slug: robotics-machines-that-think-and-act
- Files:
  - Normalized: data/robotics-machines-that-think-and-act_normalized.json
  - PhaseDNA: data/robotics-machines-that-think-and-act.en.phased.json, data/robotics-machines-that-think-and-act.es.phased.json, data/robotics-machines-that-think-and-act.fr.phased.json
  - TTS jobs: data/tts_jobs/robotics-machines-that-think-and-act.en.json, data/tts_jobs/robotics-machines-that-think-and-act.es.json, data/tts_jobs/robotics-machines-that-think-and-act.fr.json
- Subtasks:
  - [ ] Author normalized DNA source → data/robotics-machines-that-think-and-act_normalized.json
  - [ ] Generate PhaseDNA v1 (en + clone es/fr) → data/robotics-machines-that-think-and-act.en|es|fr.phased.json (cmd: node scripts/generate-phased-from-normalized.js --input data/robotics-machines-that-think-and-act_normalized.json --outbase data/robotics-machines-that-think-and-act --lang en --clone-es-fr)
  - [ ] Extract TTS jobs (per-phase narration) for en/es/fr → data/tts_jobs/robotics-machines-that-think-and-act.en|es|fr.json (cmd: node scripts/extract-tts-jobs.js --slugs robotics-machines-that-think-and-act --langs en,es,fr --in data --out data/tts_jobs)
  - [ ] Validate PhaseDNA shape and TTS jobs presence → npm run validate
  - [ ] Ensure day-to-slug resolver loads this lesson in index.html → Update getDNALessonData to include this day or general resolver
  - [ ] Attach minimal avatar cues/moods per phase (optional) → Edit phased JSON: phases[].avatar.cues
  - [ ] Quick review of es/fr clones for obvious issues → data/robotics-machines-that-think-and-act.es|fr.phased.json
  - [ ] Enable prefetch of next-phase TTS during playback → Player optimization (once globally implemented)
  - [ ] QA in index.html: phase texts render, TTS plays, interactions flow → Open index.html?day=237

## Day 238 — Linguistics - The Science of Language
- Learning objective: Understand language structure while exploring how linguistics enables translation technology, education, and cross-cultural communication.
- Slug: linguistics-the-science-of-language
- Files:
  - Normalized: data/linguistics-the-science-of-language_normalized.json
  - PhaseDNA: data/linguistics-the-science-of-language.en.phased.json, data/linguistics-the-science-of-language.es.phased.json, data/linguistics-the-science-of-language.fr.phased.json
  - TTS jobs: data/tts_jobs/linguistics-the-science-of-language.en.json, data/tts_jobs/linguistics-the-science-of-language.es.json, data/tts_jobs/linguistics-the-science-of-language.fr.json
- Subtasks:
  - [ ] Author normalized DNA source → data/linguistics-the-science-of-language_normalized.json
  - [ ] Generate PhaseDNA v1 (en + clone es/fr) → data/linguistics-the-science-of-language.en|es|fr.phased.json (cmd: node scripts/generate-phased-from-normalized.js --input data/linguistics-the-science-of-language_normalized.json --outbase data/linguistics-the-science-of-language --lang en --clone-es-fr)
  - [ ] Extract TTS jobs (per-phase narration) for en/es/fr → data/tts_jobs/linguistics-the-science-of-language.en|es|fr.json (cmd: node scripts/extract-tts-jobs.js --slugs linguistics-the-science-of-language --langs en,es,fr --in data --out data/tts_jobs)
  - [ ] Validate PhaseDNA shape and TTS jobs presence → npm run validate
  - [ ] Ensure day-to-slug resolver loads this lesson in index.html → Update getDNALessonData to include this day or general resolver
  - [ ] Attach minimal avatar cues/moods per phase (optional) → Edit phased JSON: phases[].avatar.cues
  - [ ] Quick review of es/fr clones for obvious issues → data/linguistics-the-science-of-language.es|fr.phased.json
  - [ ] Enable prefetch of next-phase TTS during playback → Player optimization (once globally implemented)
  - [ ] QA in index.html: phase texts render, TTS plays, interactions flow → Open index.html?day=238

## Day 239 — Space Exploration - Journeying Beyond Earth
- Learning objective: Explore space science while understanding how space exploration drives technological innovation and international cooperation.
- Slug: space-exploration-journeying-beyond-earth
- Files:
  - Normalized: data/space-exploration-journeying-beyond-earth_normalized.json
  - PhaseDNA: data/space-exploration-journeying-beyond-earth.en.phased.json, data/space-exploration-journeying-beyond-earth.es.phased.json, data/space-exploration-journeying-beyond-earth.fr.phased.json
  - TTS jobs: data/tts_jobs/space-exploration-journeying-beyond-earth.en.json, data/tts_jobs/space-exploration-journeying-beyond-earth.es.json, data/tts_jobs/space-exploration-journeying-beyond-earth.fr.json
- Subtasks:
  - [ ] Author normalized DNA source → data/space-exploration-journeying-beyond-earth_normalized.json
  - [ ] Generate PhaseDNA v1 (en + clone es/fr) → data/space-exploration-journeying-beyond-earth.en|es|fr.phased.json (cmd: node scripts/generate-phased-from-normalized.js --input data/space-exploration-journeying-beyond-earth_normalized.json --outbase data/space-exploration-journeying-beyond-earth --lang en --clone-es-fr)
  - [ ] Extract TTS jobs (per-phase narration) for en/es/fr → data/tts_jobs/space-exploration-journeying-beyond-earth.en|es|fr.json (cmd: node scripts/extract-tts-jobs.js --slugs space-exploration-journeying-beyond-earth --langs en,es,fr --in data --out data/tts_jobs)
  - [ ] Validate PhaseDNA shape and TTS jobs presence → npm run validate
  - [ ] Ensure day-to-slug resolver loads this lesson in index.html → Update getDNALessonData to include this day or general resolver
  - [ ] Attach minimal avatar cues/moods per phase (optional) → Edit phased JSON: phases[].avatar.cues
  - [ ] Quick review of es/fr clones for obvious issues → data/space-exploration-journeying-beyond-earth.es|fr.phased.json
  - [ ] Enable prefetch of next-phase TTS during playback → Player optimization (once globally implemented)
  - [ ] QA in index.html: phase texts render, TTS plays, interactions flow → Open index.html?day=239

## Day 240 — Data Science - Making Sense of Information
- Learning objective: Practice data analysis while understanding how data science enables evidence-based decision making, privacy protection, and democratic accountability.
- Slug: data-science-making-sense-of-information
- Files:
  - Normalized: data/data-science-making-sense-of-information_normalized.json
  - PhaseDNA: data/data-science-making-sense-of-information.en.phased.json, data/data-science-making-sense-of-information.es.phased.json, data/data-science-making-sense-of-information.fr.phased.json
  - TTS jobs: data/tts_jobs/data-science-making-sense-of-information.en.json, data/tts_jobs/data-science-making-sense-of-information.es.json, data/tts_jobs/data-science-making-sense-of-information.fr.json
- Subtasks:
  - [ ] Author normalized DNA source → data/data-science-making-sense-of-information_normalized.json
  - [ ] Generate PhaseDNA v1 (en + clone es/fr) → data/data-science-making-sense-of-information.en|es|fr.phased.json (cmd: node scripts/generate-phased-from-normalized.js --input data/data-science-making-sense-of-information_normalized.json --outbase data/data-science-making-sense-of-information --lang en --clone-es-fr)
  - [ ] Extract TTS jobs (per-phase narration) for en/es/fr → data/tts_jobs/data-science-making-sense-of-information.en|es|fr.json (cmd: node scripts/extract-tts-jobs.js --slugs data-science-making-sense-of-information --langs en,es,fr --in data --out data/tts_jobs)
  - [ ] Validate PhaseDNA shape and TTS jobs presence → npm run validate
  - [ ] Ensure day-to-slug resolver loads this lesson in index.html → Update getDNALessonData to include this day or general resolver
  - [ ] Attach minimal avatar cues/moods per phase (optional) → Edit phased JSON: phases[].avatar.cues
  - [ ] Quick review of es/fr clones for obvious issues → data/data-science-making-sense-of-information.es|fr.phased.json
  - [ ] Enable prefetch of next-phase TTS during playback → Player optimization (once globally implemented)
  - [ ] QA in index.html: phase texts render, TTS plays, interactions flow → Open index.html?day=240

## Day 241 — Evolutionary Psychology - How Our Minds Evolved
- Learning objective: Understand mental evolution while exploring how evolutionary psychology informs education, relationships, and social policy.
- Slug: evolutionary-psychology-how-our-minds-evolved
- Files:
  - Normalized: data/evolutionary-psychology-how-our-minds-evolved_normalized.json
  - PhaseDNA: data/evolutionary-psychology-how-our-minds-evolved.en.phased.json, data/evolutionary-psychology-how-our-minds-evolved.es.phased.json, data/evolutionary-psychology-how-our-minds-evolved.fr.phased.json
  - TTS jobs: data/tts_jobs/evolutionary-psychology-how-our-minds-evolved.en.json, data/tts_jobs/evolutionary-psychology-how-our-minds-evolved.es.json, data/tts_jobs/evolutionary-psychology-how-our-minds-evolved.fr.json
- Subtasks:
  - [ ] Author normalized DNA source → data/evolutionary-psychology-how-our-minds-evolved_normalized.json
  - [ ] Generate PhaseDNA v1 (en + clone es/fr) → data/evolutionary-psychology-how-our-minds-evolved.en|es|fr.phased.json (cmd: node scripts/generate-phased-from-normalized.js --input data/evolutionary-psychology-how-our-minds-evolved_normalized.json --outbase data/evolutionary-psychology-how-our-minds-evolved --lang en --clone-es-fr)
  - [ ] Extract TTS jobs (per-phase narration) for en/es/fr → data/tts_jobs/evolutionary-psychology-how-our-minds-evolved.en|es|fr.json (cmd: node scripts/extract-tts-jobs.js --slugs evolutionary-psychology-how-our-minds-evolved --langs en,es,fr --in data --out data/tts_jobs)
  - [ ] Validate PhaseDNA shape and TTS jobs presence → npm run validate
  - [ ] Ensure day-to-slug resolver loads this lesson in index.html → Update getDNALessonData to include this day or general resolver
  - [ ] Attach minimal avatar cues/moods per phase (optional) → Edit phased JSON: phases[].avatar.cues
  - [ ] Quick review of es/fr clones for obvious issues → data/evolutionary-psychology-how-our-minds-evolved.es|fr.phased.json
  - [ ] Enable prefetch of next-phase TTS during playback → Player optimization (once globally implemented)
  - [ ] QA in index.html: phase texts render, TTS plays, interactions flow → Open index.html?day=241

## Day 242 — Renewable Energy - Powering the Future
- Learning objective: Explore sustainable energy while understanding how renewable technology enables climate action, energy independence, and economic transformation.
- Slug: renewable-energy-powering-the-future
- Files:
  - Normalized: data/renewable-energy-powering-the-future_normalized.json
  - PhaseDNA: data/renewable-energy-powering-the-future.en.phased.json, data/renewable-energy-powering-the-future.es.phased.json, data/renewable-energy-powering-the-future.fr.phased.json
  - TTS jobs: data/tts_jobs/renewable-energy-powering-the-future.en.json, data/tts_jobs/renewable-energy-powering-the-future.es.json, data/tts_jobs/renewable-energy-powering-the-future.fr.json
- Subtasks:
  - [ ] Author normalized DNA source → data/renewable-energy-powering-the-future_normalized.json
  - [ ] Generate PhaseDNA v1 (en + clone es/fr) → data/renewable-energy-powering-the-future.en|es|fr.phased.json (cmd: node scripts/generate-phased-from-normalized.js --input data/renewable-energy-powering-the-future_normalized.json --outbase data/renewable-energy-powering-the-future --lang en --clone-es-fr)
  - [ ] Extract TTS jobs (per-phase narration) for en/es/fr → data/tts_jobs/renewable-energy-powering-the-future.en|es|fr.json (cmd: node scripts/extract-tts-jobs.js --slugs renewable-energy-powering-the-future --langs en,es,fr --in data --out data/tts_jobs)
  - [ ] Validate PhaseDNA shape and TTS jobs presence → npm run validate
  - [ ] Ensure day-to-slug resolver loads this lesson in index.html → Update getDNALessonData to include this day or general resolver
  - [ ] Attach minimal avatar cues/moods per phase (optional) → Edit phased JSON: phases[].avatar.cues
  - [ ] Quick review of es/fr clones for obvious issues → data/renewable-energy-powering-the-future.es|fr.phased.json
  - [ ] Enable prefetch of next-phase TTS during playback → Player optimization (once globally implemented)
  - [ ] QA in index.html: phase texts render, TTS plays, interactions flow → Open index.html?day=242

## Day 243 — Machine Learning - Teaching Computers to Learn
- Learning objective: Explore artificial intelligence while understanding how machine learning can enhance or replace human decision-making in various domains.
- Slug: machine-learning-teaching-computers-to-learn
- Files:
  - Normalized: data/machine-learning-teaching-computers-to-learn_normalized.json
  - PhaseDNA: data/machine-learning-teaching-computers-to-learn.en.phased.json, data/machine-learning-teaching-computers-to-learn.es.phased.json, data/machine-learning-teaching-computers-to-learn.fr.phased.json
  - TTS jobs: data/tts_jobs/machine-learning-teaching-computers-to-learn.en.json, data/tts_jobs/machine-learning-teaching-computers-to-learn.es.json, data/tts_jobs/machine-learning-teaching-computers-to-learn.fr.json
- Subtasks:
  - [ ] Author normalized DNA source → data/machine-learning-teaching-computers-to-learn_normalized.json
  - [ ] Generate PhaseDNA v1 (en + clone es/fr) → data/machine-learning-teaching-computers-to-learn.en|es|fr.phased.json (cmd: node scripts/generate-phased-from-normalized.js --input data/machine-learning-teaching-computers-to-learn_normalized.json --outbase data/machine-learning-teaching-computers-to-learn --lang en --clone-es-fr)
  - [ ] Extract TTS jobs (per-phase narration) for en/es/fr → data/tts_jobs/machine-learning-teaching-computers-to-learn.en|es|fr.json (cmd: node scripts/extract-tts-jobs.js --slugs machine-learning-teaching-computers-to-learn --langs en,es,fr --in data --out data/tts_jobs)
  - [ ] Validate PhaseDNA shape and TTS jobs presence → npm run validate
  - [ ] Ensure day-to-slug resolver loads this lesson in index.html → Update getDNALessonData to include this day or general resolver
  - [ ] Attach minimal avatar cues/moods per phase (optional) → Edit phased JSON: phases[].avatar.cues
  - [ ] Quick review of es/fr clones for obvious issues → data/machine-learning-teaching-computers-to-learn.es|fr.phased.json
  - [ ] Enable prefetch of next-phase TTS during playback → Player optimization (once globally implemented)
  - [ ] QA in index.html: phase texts render, TTS plays, interactions flow → Open index.html?day=243

## Day 244 — Bioinformatics - Computing with Biology
- Learning objective: Practice computational biology while understanding how bioinformatics enables medical research, drug discovery, and personalized medicine.
- Slug: bioinformatics-computing-with-biology
- Files:
  - Normalized: data/bioinformatics-computing-with-biology_normalized.json
  - PhaseDNA: data/bioinformatics-computing-with-biology.en.phased.json, data/bioinformatics-computing-with-biology.es.phased.json, data/bioinformatics-computing-with-biology.fr.phased.json
  - TTS jobs: data/tts_jobs/bioinformatics-computing-with-biology.en.json, data/tts_jobs/bioinformatics-computing-with-biology.es.json, data/tts_jobs/bioinformatics-computing-with-biology.fr.json
- Subtasks:
  - [ ] Author normalized DNA source → data/bioinformatics-computing-with-biology_normalized.json
  - [ ] Generate PhaseDNA v1 (en + clone es/fr) → data/bioinformatics-computing-with-biology.en|es|fr.phased.json (cmd: node scripts/generate-phased-from-normalized.js --input data/bioinformatics-computing-with-biology_normalized.json --outbase data/bioinformatics-computing-with-biology --lang en --clone-es-fr)
  - [ ] Extract TTS jobs (per-phase narration) for en/es/fr → data/tts_jobs/bioinformatics-computing-with-biology.en|es|fr.json (cmd: node scripts/extract-tts-jobs.js --slugs bioinformatics-computing-with-biology --langs en,es,fr --in data --out data/tts_jobs)
  - [ ] Validate PhaseDNA shape and TTS jobs presence → npm run validate
  - [ ] Ensure day-to-slug resolver loads this lesson in index.html → Update getDNALessonData to include this day or general resolver
  - [ ] Attach minimal avatar cues/moods per phase (optional) → Edit phased JSON: phases[].avatar.cues
  - [ ] Quick review of es/fr clones for obvious issues → data/bioinformatics-computing-with-biology.es|fr.phased.json
  - [ ] Enable prefetch of next-phase TTS during playback → Player optimization (once globally implemented)
  - [ ] QA in index.html: phase texts render, TTS plays, interactions flow → Open index.html?day=244

## Day 245 — Quantum Computing - Computing with Quantum Mechanics
- Learning objective: Explore quantum computation while understanding how quantum computing could revolutionize cryptography, drug discovery, and optimization.
- Slug: quantum-computing-computing-with-quantum-mechanics
- Files:
  - Normalized: data/quantum-computing-computing-with-quantum-mechanics_normalized.json
  - PhaseDNA: data/quantum-computing-computing-with-quantum-mechanics.en.phased.json, data/quantum-computing-computing-with-quantum-mechanics.es.phased.json, data/quantum-computing-computing-with-quantum-mechanics.fr.phased.json
  - TTS jobs: data/tts_jobs/quantum-computing-computing-with-quantum-mechanics.en.json, data/tts_jobs/quantum-computing-computing-with-quantum-mechanics.es.json, data/tts_jobs/quantum-computing-computing-with-quantum-mechanics.fr.json
- Subtasks:
  - [ ] Author normalized DNA source → data/quantum-computing-computing-with-quantum-mechanics_normalized.json
  - [ ] Generate PhaseDNA v1 (en + clone es/fr) → data/quantum-computing-computing-with-quantum-mechanics.en|es|fr.phased.json (cmd: node scripts/generate-phased-from-normalized.js --input data/quantum-computing-computing-with-quantum-mechanics_normalized.json --outbase data/quantum-computing-computing-with-quantum-mechanics --lang en --clone-es-fr)
  - [ ] Extract TTS jobs (per-phase narration) for en/es/fr → data/tts_jobs/quantum-computing-computing-with-quantum-mechanics.en|es|fr.json (cmd: node scripts/extract-tts-jobs.js --slugs quantum-computing-computing-with-quantum-mechanics --langs en,es,fr --in data --out data/tts_jobs)
  - [ ] Validate PhaseDNA shape and TTS jobs presence → npm run validate
  - [ ] Ensure day-to-slug resolver loads this lesson in index.html → Update getDNALessonData to include this day or general resolver
  - [ ] Attach minimal avatar cues/moods per phase (optional) → Edit phased JSON: phases[].avatar.cues
  - [ ] Quick review of es/fr clones for obvious issues → data/quantum-computing-computing-with-quantum-mechanics.es|fr.phased.json
  - [ ] Enable prefetch of next-phase TTS during playback → Player optimization (once globally implemented)
  - [ ] QA in index.html: phase texts render, TTS plays, interactions flow → Open index.html?day=245

## Day 246 — Crisis Management - Leading Through Uncertainty
- Learning objective: Practice emergency response while understanding how crisis management enables organizational resilience, public safety, and democratic governance.
- Slug: crisis-management-leading-through-uncertainty
- Files:
  - Normalized: data/crisis-management-leading-through-uncertainty_normalized.json
  - PhaseDNA: data/crisis-management-leading-through-uncertainty.en.phased.json, data/crisis-management-leading-through-uncertainty.es.phased.json, data/crisis-management-leading-through-uncertainty.fr.phased.json
  - TTS jobs: data/tts_jobs/crisis-management-leading-through-uncertainty.en.json, data/tts_jobs/crisis-management-leading-through-uncertainty.es.json, data/tts_jobs/crisis-management-leading-through-uncertainty.fr.json
- Subtasks:
  - [ ] Author normalized DNA source → data/crisis-management-leading-through-uncertainty_normalized.json
  - [ ] Generate PhaseDNA v1 (en + clone es/fr) → data/crisis-management-leading-through-uncertainty.en|es|fr.phased.json (cmd: node scripts/generate-phased-from-normalized.js --input data/crisis-management-leading-through-uncertainty_normalized.json --outbase data/crisis-management-leading-through-uncertainty --lang en --clone-es-fr)
  - [ ] Extract TTS jobs (per-phase narration) for en/es/fr → data/tts_jobs/crisis-management-leading-through-uncertainty.en|es|fr.json (cmd: node scripts/extract-tts-jobs.js --slugs crisis-management-leading-through-uncertainty --langs en,es,fr --in data --out data/tts_jobs)
  - [ ] Validate PhaseDNA shape and TTS jobs presence → npm run validate
  - [ ] Ensure day-to-slug resolver loads this lesson in index.html → Update getDNALessonData to include this day or general resolver
  - [ ] Attach minimal avatar cues/moods per phase (optional) → Edit phased JSON: phases[].avatar.cues
  - [ ] Quick review of es/fr clones for obvious issues → data/crisis-management-leading-through-uncertainty.es|fr.phased.json
  - [ ] Enable prefetch of next-phase TTS during playback → Player optimization (once globally implemented)
  - [ ] QA in index.html: phase texts render, TTS plays, interactions flow → Open index.html?day=246

## Day 247 — Genetic Counseling - Understanding Inherited Conditions
- Learning objective: Understand genetic medicine while exploring how genetic counseling enables informed healthcare decisions and family planning.
- Slug: genetic-counseling-understanding-inherited-conditions
- Files:
  - Normalized: data/genetic-counseling-understanding-inherited-conditions_normalized.json
  - PhaseDNA: data/genetic-counseling-understanding-inherited-conditions.en.phased.json, data/genetic-counseling-understanding-inherited-conditions.es.phased.json, data/genetic-counseling-understanding-inherited-conditions.fr.phased.json
  - TTS jobs: data/tts_jobs/genetic-counseling-understanding-inherited-conditions.en.json, data/tts_jobs/genetic-counseling-understanding-inherited-conditions.es.json, data/tts_jobs/genetic-counseling-understanding-inherited-conditions.fr.json
- Subtasks:
  - [ ] Author normalized DNA source → data/genetic-counseling-understanding-inherited-conditions_normalized.json
  - [ ] Generate PhaseDNA v1 (en + clone es/fr) → data/genetic-counseling-understanding-inherited-conditions.en|es|fr.phased.json (cmd: node scripts/generate-phased-from-normalized.js --input data/genetic-counseling-understanding-inherited-conditions_normalized.json --outbase data/genetic-counseling-understanding-inherited-conditions --lang en --clone-es-fr)
  - [ ] Extract TTS jobs (per-phase narration) for en/es/fr → data/tts_jobs/genetic-counseling-understanding-inherited-conditions.en|es|fr.json (cmd: node scripts/extract-tts-jobs.js --slugs genetic-counseling-understanding-inherited-conditions --langs en,es,fr --in data --out data/tts_jobs)
  - [ ] Validate PhaseDNA shape and TTS jobs presence → npm run validate
  - [ ] Ensure day-to-slug resolver loads this lesson in index.html → Update getDNALessonData to include this day or general resolver
  - [ ] Attach minimal avatar cues/moods per phase (optional) → Edit phased JSON: phases[].avatar.cues
  - [ ] Quick review of es/fr clones for obvious issues → data/genetic-counseling-understanding-inherited-conditions.es|fr.phased.json
  - [ ] Enable prefetch of next-phase TTS during playback → Player optimization (once globally implemented)
  - [ ] QA in index.html: phase texts render, TTS plays, interactions flow → Open index.html?day=247

## Day 248 — Digital Privacy - Protecting Information in the Digital Age
- Learning objective: Understand data protection while exploring how digital privacy affects democracy, human rights, and individual autonomy.
- Slug: digital-privacy-protecting-information-in-the-digital-age
- Files:
  - Normalized: data/digital-privacy-protecting-information-in-the-digital-age_normalized.json
  - PhaseDNA: data/digital-privacy-protecting-information-in-the-digital-age.en.phased.json, data/digital-privacy-protecting-information-in-the-digital-age.es.phased.json, data/digital-privacy-protecting-information-in-the-digital-age.fr.phased.json
  - TTS jobs: data/tts_jobs/digital-privacy-protecting-information-in-the-digital-age.en.json, data/tts_jobs/digital-privacy-protecting-information-in-the-digital-age.es.json, data/tts_jobs/digital-privacy-protecting-information-in-the-digital-age.fr.json
- Subtasks:
  - [ ] Author normalized DNA source → data/digital-privacy-protecting-information-in-the-digital-age_normalized.json
  - [ ] Generate PhaseDNA v1 (en + clone es/fr) → data/digital-privacy-protecting-information-in-the-digital-age.en|es|fr.phased.json (cmd: node scripts/generate-phased-from-normalized.js --input data/digital-privacy-protecting-information-in-the-digital-age_normalized.json --outbase data/digital-privacy-protecting-information-in-the-digital-age --lang en --clone-es-fr)
  - [ ] Extract TTS jobs (per-phase narration) for en/es/fr → data/tts_jobs/digital-privacy-protecting-information-in-the-digital-age.en|es|fr.json (cmd: node scripts/extract-tts-jobs.js --slugs digital-privacy-protecting-information-in-the-digital-age --langs en,es,fr --in data --out data/tts_jobs)
  - [ ] Validate PhaseDNA shape and TTS jobs presence → npm run validate
  - [ ] Ensure day-to-slug resolver loads this lesson in index.html → Update getDNALessonData to include this day or general resolver
  - [ ] Attach minimal avatar cues/moods per phase (optional) → Edit phased JSON: phases[].avatar.cues
  - [ ] Quick review of es/fr clones for obvious issues → data/digital-privacy-protecting-information-in-the-digital-age.es|fr.phased.json
  - [ ] Enable prefetch of next-phase TTS during playback → Player optimization (once globally implemented)
  - [ ] QA in index.html: phase texts render, TTS plays, interactions flow → Open index.html?day=248

## Day 249 — Sustainable Agriculture - Feeding the World Responsibly
- Learning objective: Practice ecological farming while understanding how sustainable agriculture enables food security, environmental protection, and rural development.
- Slug: sustainable-agriculture-feeding-the-world-responsibly
- Files:
  - Normalized: data/sustainable-agriculture-feeding-the-world-responsibly_normalized.json
  - PhaseDNA: data/sustainable-agriculture-feeding-the-world-responsibly.en.phased.json, data/sustainable-agriculture-feeding-the-world-responsibly.es.phased.json, data/sustainable-agriculture-feeding-the-world-responsibly.fr.phased.json
  - TTS jobs: data/tts_jobs/sustainable-agriculture-feeding-the-world-responsibly.en.json, data/tts_jobs/sustainable-agriculture-feeding-the-world-responsibly.es.json, data/tts_jobs/sustainable-agriculture-feeding-the-world-responsibly.fr.json
- Subtasks:
  - [ ] Author normalized DNA source → data/sustainable-agriculture-feeding-the-world-responsibly_normalized.json
  - [ ] Generate PhaseDNA v1 (en + clone es/fr) → data/sustainable-agriculture-feeding-the-world-responsibly.en|es|fr.phased.json (cmd: node scripts/generate-phased-from-normalized.js --input data/sustainable-agriculture-feeding-the-world-responsibly_normalized.json --outbase data/sustainable-agriculture-feeding-the-world-responsibly --lang en --clone-es-fr)
  - [ ] Extract TTS jobs (per-phase narration) for en/es/fr → data/tts_jobs/sustainable-agriculture-feeding-the-world-responsibly.en|es|fr.json (cmd: node scripts/extract-tts-jobs.js --slugs sustainable-agriculture-feeding-the-world-responsibly --langs en,es,fr --in data --out data/tts_jobs)
  - [ ] Validate PhaseDNA shape and TTS jobs presence → npm run validate
  - [ ] Ensure day-to-slug resolver loads this lesson in index.html → Update getDNALessonData to include this day or general resolver
  - [ ] Attach minimal avatar cues/moods per phase (optional) → Edit phased JSON: phases[].avatar.cues
  - [ ] Quick review of es/fr clones for obvious issues → data/sustainable-agriculture-feeding-the-world-responsibly.es|fr.phased.json
  - [ ] Enable prefetch of next-phase TTS during playback → Player optimization (once globally implemented)
  - [ ] QA in index.html: phase texts render, TTS plays, interactions flow → Open index.html?day=249

## Day 250 — Artificial Intelligence Ethics - Programming with Values
- Learning objective: Explore AI ethics while understanding how artificial intelligence development requires careful consideration of bias, transparency, and human welfare.
- Slug: artificial-intelligence-ethics-programming-with-values
- Files:
  - Normalized: data/artificial-intelligence-ethics-programming-with-values_normalized.json
  - PhaseDNA: data/artificial-intelligence-ethics-programming-with-values.en.phased.json, data/artificial-intelligence-ethics-programming-with-values.es.phased.json, data/artificial-intelligence-ethics-programming-with-values.fr.phased.json
  - TTS jobs: data/tts_jobs/artificial-intelligence-ethics-programming-with-values.en.json, data/tts_jobs/artificial-intelligence-ethics-programming-with-values.es.json, data/tts_jobs/artificial-intelligence-ethics-programming-with-values.fr.json
- Subtasks:
  - [ ] Author normalized DNA source → data/artificial-intelligence-ethics-programming-with-values_normalized.json
  - [ ] Generate PhaseDNA v1 (en + clone es/fr) → data/artificial-intelligence-ethics-programming-with-values.en|es|fr.phased.json (cmd: node scripts/generate-phased-from-normalized.js --input data/artificial-intelligence-ethics-programming-with-values_normalized.json --outbase data/artificial-intelligence-ethics-programming-with-values --lang en --clone-es-fr)
  - [ ] Extract TTS jobs (per-phase narration) for en/es/fr → data/tts_jobs/artificial-intelligence-ethics-programming-with-values.en|es|fr.json (cmd: node scripts/extract-tts-jobs.js --slugs artificial-intelligence-ethics-programming-with-values --langs en,es,fr --in data --out data/tts_jobs)
  - [ ] Validate PhaseDNA shape and TTS jobs presence → npm run validate
  - [ ] Ensure day-to-slug resolver loads this lesson in index.html → Update getDNALessonData to include this day or general resolver
  - [ ] Attach minimal avatar cues/moods per phase (optional) → Edit phased JSON: phases[].avatar.cues
  - [ ] Quick review of es/fr clones for obvious issues → data/artificial-intelligence-ethics-programming-with-values.es|fr.phased.json
  - [ ] Enable prefetch of next-phase TTS during playback → Player optimization (once globally implemented)
  - [ ] QA in index.html: phase texts render, TTS plays, interactions flow → Open index.html?day=250

## Day 251 — Neuroplasticity - How the Brain Changes
- Learning objective: Understand brain adaptation while exploring how neuroplasticity enables learning, recovery from injury, and cognitive enhancement.
- Slug: neuroplasticity-how-the-brain-changes
- Files:
  - Normalized: data/neuroplasticity-how-the-brain-changes_normalized.json
  - PhaseDNA: data/neuroplasticity-how-the-brain-changes.en.phased.json, data/neuroplasticity-how-the-brain-changes.es.phased.json, data/neuroplasticity-how-the-brain-changes.fr.phased.json
  - TTS jobs: data/tts_jobs/neuroplasticity-how-the-brain-changes.en.json, data/tts_jobs/neuroplasticity-how-the-brain-changes.es.json, data/tts_jobs/neuroplasticity-how-the-brain-changes.fr.json
- Subtasks:
  - [ ] Author normalized DNA source → data/neuroplasticity-how-the-brain-changes_normalized.json
  - [ ] Generate PhaseDNA v1 (en + clone es/fr) → data/neuroplasticity-how-the-brain-changes.en|es|fr.phased.json (cmd: node scripts/generate-phased-from-normalized.js --input data/neuroplasticity-how-the-brain-changes_normalized.json --outbase data/neuroplasticity-how-the-brain-changes --lang en --clone-es-fr)
  - [ ] Extract TTS jobs (per-phase narration) for en/es/fr → data/tts_jobs/neuroplasticity-how-the-brain-changes.en|es|fr.json (cmd: node scripts/extract-tts-jobs.js --slugs neuroplasticity-how-the-brain-changes --langs en,es,fr --in data --out data/tts_jobs)
  - [ ] Validate PhaseDNA shape and TTS jobs presence → npm run validate
  - [ ] Ensure day-to-slug resolver loads this lesson in index.html → Update getDNALessonData to include this day or general resolver
  - [ ] Attach minimal avatar cues/moods per phase (optional) → Edit phased JSON: phases[].avatar.cues
  - [ ] Quick review of es/fr clones for obvious issues → data/neuroplasticity-how-the-brain-changes.es|fr.phased.json
  - [ ] Enable prefetch of next-phase TTS during playback → Player optimization (once globally implemented)
  - [ ] QA in index.html: phase texts render, TTS plays, interactions flow → Open index.html?day=251

## Day 252 — Circular Economy - Waste Not, Want Not
- Learning objective: Practice sustainable design while understanding how circular economy principles enable resource efficiency, waste reduction, and economic resilience.
- Slug: circular-economy-waste-not-want-not
- Files:
  - Normalized: data/circular-economy-waste-not-want-not_normalized.json
  - PhaseDNA: data/circular-economy-waste-not-want-not.en.phased.json, data/circular-economy-waste-not-want-not.es.phased.json, data/circular-economy-waste-not-want-not.fr.phased.json
  - TTS jobs: data/tts_jobs/circular-economy-waste-not-want-not.en.json, data/tts_jobs/circular-economy-waste-not-want-not.es.json, data/tts_jobs/circular-economy-waste-not-want-not.fr.json
- Subtasks:
  - [ ] Author normalized DNA source → data/circular-economy-waste-not-want-not_normalized.json
  - [ ] Generate PhaseDNA v1 (en + clone es/fr) → data/circular-economy-waste-not-want-not.en|es|fr.phased.json (cmd: node scripts/generate-phased-from-normalized.js --input data/circular-economy-waste-not-want-not_normalized.json --outbase data/circular-economy-waste-not-want-not --lang en --clone-es-fr)
  - [ ] Extract TTS jobs (per-phase narration) for en/es/fr → data/tts_jobs/circular-economy-waste-not-want-not.en|es|fr.json (cmd: node scripts/extract-tts-jobs.js --slugs circular-economy-waste-not-want-not --langs en,es,fr --in data --out data/tts_jobs)
  - [ ] Validate PhaseDNA shape and TTS jobs presence → npm run validate
  - [ ] Ensure day-to-slug resolver loads this lesson in index.html → Update getDNALessonData to include this day or general resolver
  - [ ] Attach minimal avatar cues/moods per phase (optional) → Edit phased JSON: phases[].avatar.cues
  - [ ] Quick review of es/fr clones for obvious issues → data/circular-economy-waste-not-want-not.es|fr.phased.json
  - [ ] Enable prefetch of next-phase TTS during playback → Player optimization (once globally implemented)
  - [ ] QA in index.html: phase texts render, TTS plays, interactions flow → Open index.html?day=252

## Day 253 — Digital Democracy - Technology and Governance
- Learning objective: Explore digital governance while understanding how technology can enhance or undermine democratic participation and transparency.
- Slug: digital-democracy-technology-and-governance
- Files:
  - Normalized: data/digital-democracy-technology-and-governance_normalized.json
  - PhaseDNA: data/digital-democracy-technology-and-governance.en.phased.json, data/digital-democracy-technology-and-governance.es.phased.json, data/digital-democracy-technology-and-governance.fr.phased.json
  - TTS jobs: data/tts_jobs/digital-democracy-technology-and-governance.en.json, data/tts_jobs/digital-democracy-technology-and-governance.es.json, data/tts_jobs/digital-democracy-technology-and-governance.fr.json
- Subtasks:
  - [ ] Author normalized DNA source → data/digital-democracy-technology-and-governance_normalized.json
  - [ ] Generate PhaseDNA v1 (en + clone es/fr) → data/digital-democracy-technology-and-governance.en|es|fr.phased.json (cmd: node scripts/generate-phased-from-normalized.js --input data/digital-democracy-technology-and-governance_normalized.json --outbase data/digital-democracy-technology-and-governance --lang en --clone-es-fr)
  - [ ] Extract TTS jobs (per-phase narration) for en/es/fr → data/tts_jobs/digital-democracy-technology-and-governance.en|es|fr.json (cmd: node scripts/extract-tts-jobs.js --slugs digital-democracy-technology-and-governance --langs en,es,fr --in data --out data/tts_jobs)
  - [ ] Validate PhaseDNA shape and TTS jobs presence → npm run validate
  - [ ] Ensure day-to-slug resolver loads this lesson in index.html → Update getDNALessonData to include this day or general resolver
  - [ ] Attach minimal avatar cues/moods per phase (optional) → Edit phased JSON: phases[].avatar.cues
  - [ ] Quick review of es/fr clones for obvious issues → data/digital-democracy-technology-and-governance.es|fr.phased.json
  - [ ] Enable prefetch of next-phase TTS during playback → Player optimization (once globally implemented)
  - [ ] QA in index.html: phase texts render, TTS plays, interactions flow → Open index.html?day=253

## Day 254 — Precision Medicine - Personalized Healthcare
- Learning objective: Understand personalized medicine while exploring how precision medicine enables targeted treatment, prevention, and healthcare equity.
- Slug: precision-medicine-personalized-healthcare
- Files:
  - Normalized: data/precision-medicine-personalized-healthcare_normalized.json
  - PhaseDNA: data/precision-medicine-personalized-healthcare.en.phased.json, data/precision-medicine-personalized-healthcare.es.phased.json, data/precision-medicine-personalized-healthcare.fr.phased.json
  - TTS jobs: data/tts_jobs/precision-medicine-personalized-healthcare.en.json, data/tts_jobs/precision-medicine-personalized-healthcare.es.json, data/tts_jobs/precision-medicine-personalized-healthcare.fr.json
- Subtasks:
  - [ ] Author normalized DNA source → data/precision-medicine-personalized-healthcare_normalized.json
  - [ ] Generate PhaseDNA v1 (en + clone es/fr) → data/precision-medicine-personalized-healthcare.en|es|fr.phased.json (cmd: node scripts/generate-phased-from-normalized.js --input data/precision-medicine-personalized-healthcare_normalized.json --outbase data/precision-medicine-personalized-healthcare --lang en --clone-es-fr)
  - [ ] Extract TTS jobs (per-phase narration) for en/es/fr → data/tts_jobs/precision-medicine-personalized-healthcare.en|es|fr.json (cmd: node scripts/extract-tts-jobs.js --slugs precision-medicine-personalized-healthcare --langs en,es,fr --in data --out data/tts_jobs)
  - [ ] Validate PhaseDNA shape and TTS jobs presence → npm run validate
  - [ ] Ensure day-to-slug resolver loads this lesson in index.html → Update getDNALessonData to include this day or general resolver
  - [ ] Attach minimal avatar cues/moods per phase (optional) → Edit phased JSON: phases[].avatar.cues
  - [ ] Quick review of es/fr clones for obvious issues → data/precision-medicine-personalized-healthcare.es|fr.phased.json
  - [ ] Enable prefetch of next-phase TTS during playback → Player optimization (once globally implemented)
  - [ ] QA in index.html: phase texts render, TTS plays, interactions flow → Open index.html?day=254

## Day 255 — Smart Cities - Technology and Urban Life
- Learning objective: Explore urban technology while understanding how smart city systems can improve quality of life while raising privacy and equity concerns.
- Slug: smart-cities-technology-and-urban-life
- Files:
  - Normalized: data/smart-cities-technology-and-urban-life_normalized.json
  - PhaseDNA: data/smart-cities-technology-and-urban-life.en.phased.json, data/smart-cities-technology-and-urban-life.es.phased.json, data/smart-cities-technology-and-urban-life.fr.phased.json
  - TTS jobs: data/tts_jobs/smart-cities-technology-and-urban-life.en.json, data/tts_jobs/smart-cities-technology-and-urban-life.es.json, data/tts_jobs/smart-cities-technology-and-urban-life.fr.json
- Subtasks:
  - [ ] Author normalized DNA source → data/smart-cities-technology-and-urban-life_normalized.json
  - [ ] Generate PhaseDNA v1 (en + clone es/fr) → data/smart-cities-technology-and-urban-life.en|es|fr.phased.json (cmd: node scripts/generate-phased-from-normalized.js --input data/smart-cities-technology-and-urban-life_normalized.json --outbase data/smart-cities-technology-and-urban-life --lang en --clone-es-fr)
  - [ ] Extract TTS jobs (per-phase narration) for en/es/fr → data/tts_jobs/smart-cities-technology-and-urban-life.en|es|fr.json (cmd: node scripts/extract-tts-jobs.js --slugs smart-cities-technology-and-urban-life --langs en,es,fr --in data --out data/tts_jobs)
  - [ ] Validate PhaseDNA shape and TTS jobs presence → npm run validate
  - [ ] Ensure day-to-slug resolver loads this lesson in index.html → Update getDNALessonData to include this day or general resolver
  - [ ] Attach minimal avatar cues/moods per phase (optional) → Edit phased JSON: phases[].avatar.cues
  - [ ] Quick review of es/fr clones for obvious issues → data/smart-cities-technology-and-urban-life.es|fr.phased.json
  - [ ] Enable prefetch of next-phase TTS during playback → Player optimization (once globally implemented)
  - [ ] QA in index.html: phase texts render, TTS plays, interactions flow → Open index.html?day=255

## Day 256 — Blockchain Technology - Trust Without Intermediaries
- Learning objective: Understand distributed systems while exploring how blockchain enables secure transactions, digital identity, and decentralized governance.
- Slug: blockchain-technology-trust-without-intermediaries
- Files:
  - Normalized: data/blockchain-technology-trust-without-intermediaries_normalized.json
  - PhaseDNA: data/blockchain-technology-trust-without-intermediaries.en.phased.json, data/blockchain-technology-trust-without-intermediaries.es.phased.json, data/blockchain-technology-trust-without-intermediaries.fr.phased.json
  - TTS jobs: data/tts_jobs/blockchain-technology-trust-without-intermediaries.en.json, data/tts_jobs/blockchain-technology-trust-without-intermediaries.es.json, data/tts_jobs/blockchain-technology-trust-without-intermediaries.fr.json
- Subtasks:
  - [ ] Author normalized DNA source → data/blockchain-technology-trust-without-intermediaries_normalized.json
  - [ ] Generate PhaseDNA v1 (en + clone es/fr) → data/blockchain-technology-trust-without-intermediaries.en|es|fr.phased.json (cmd: node scripts/generate-phased-from-normalized.js --input data/blockchain-technology-trust-without-intermediaries_normalized.json --outbase data/blockchain-technology-trust-without-intermediaries --lang en --clone-es-fr)
  - [ ] Extract TTS jobs (per-phase narration) for en/es/fr → data/tts_jobs/blockchain-technology-trust-without-intermediaries.en|es|fr.json (cmd: node scripts/extract-tts-jobs.js --slugs blockchain-technology-trust-without-intermediaries --langs en,es,fr --in data --out data/tts_jobs)
  - [ ] Validate PhaseDNA shape and TTS jobs presence → npm run validate
  - [ ] Ensure day-to-slug resolver loads this lesson in index.html → Update getDNALessonData to include this day or general resolver
  - [ ] Attach minimal avatar cues/moods per phase (optional) → Edit phased JSON: phases[].avatar.cues
  - [ ] Quick review of es/fr clones for obvious issues → data/blockchain-technology-trust-without-intermediaries.es|fr.phased.json
  - [ ] Enable prefetch of next-phase TTS during playback → Player optimization (once globally implemented)
  - [ ] QA in index.html: phase texts render, TTS plays, interactions flow → Open index.html?day=256

## Day 257 — Synthetic Biology - Engineering Life
- Learning objective: Explore biological engineering while understanding how synthetic biology enables medical breakthroughs, sustainable materials, and ethical considerations.
- Slug: synthetic-biology-engineering-life
- Files:
  - Normalized: data/synthetic-biology-engineering-life_normalized.json
  - PhaseDNA: data/synthetic-biology-engineering-life.en.phased.json, data/synthetic-biology-engineering-life.es.phased.json, data/synthetic-biology-engineering-life.fr.phased.json
  - TTS jobs: data/tts_jobs/synthetic-biology-engineering-life.en.json, data/tts_jobs/synthetic-biology-engineering-life.es.json, data/tts_jobs/synthetic-biology-engineering-life.fr.json
- Subtasks:
  - [ ] Author normalized DNA source → data/synthetic-biology-engineering-life_normalized.json
  - [ ] Generate PhaseDNA v1 (en + clone es/fr) → data/synthetic-biology-engineering-life.en|es|fr.phased.json (cmd: node scripts/generate-phased-from-normalized.js --input data/synthetic-biology-engineering-life_normalized.json --outbase data/synthetic-biology-engineering-life --lang en --clone-es-fr)
  - [ ] Extract TTS jobs (per-phase narration) for en/es/fr → data/tts_jobs/synthetic-biology-engineering-life.en|es|fr.json (cmd: node scripts/extract-tts-jobs.js --slugs synthetic-biology-engineering-life --langs en,es,fr --in data --out data/tts_jobs)
  - [ ] Validate PhaseDNA shape and TTS jobs presence → npm run validate
  - [ ] Ensure day-to-slug resolver loads this lesson in index.html → Update getDNALessonData to include this day or general resolver
  - [ ] Attach minimal avatar cues/moods per phase (optional) → Edit phased JSON: phases[].avatar.cues
  - [ ] Quick review of es/fr clones for obvious issues → data/synthetic-biology-engineering-life.es|fr.phased.json
  - [ ] Enable prefetch of next-phase TTS during playback → Player optimization (once globally implemented)
  - [ ] QA in index.html: phase texts render, TTS plays, interactions flow → Open index.html?day=257

## Day 258 — Digital Literacy - Navigating the Information Age
- Learning objective: Practice critical thinking while understanding how digital literacy enables informed citizenship, media literacy, and online safety.
- Slug: digital-literacy-navigating-the-information-age
- Files:
  - Normalized: data/digital-literacy-navigating-the-information-age_normalized.json
  - PhaseDNA: data/digital-literacy-navigating-the-information-age.en.phased.json, data/digital-literacy-navigating-the-information-age.es.phased.json, data/digital-literacy-navigating-the-information-age.fr.phased.json
  - TTS jobs: data/tts_jobs/digital-literacy-navigating-the-information-age.en.json, data/tts_jobs/digital-literacy-navigating-the-information-age.es.json, data/tts_jobs/digital-literacy-navigating-the-information-age.fr.json
- Subtasks:
  - [ ] Author normalized DNA source → data/digital-literacy-navigating-the-information-age_normalized.json
  - [ ] Generate PhaseDNA v1 (en + clone es/fr) → data/digital-literacy-navigating-the-information-age.en|es|fr.phased.json (cmd: node scripts/generate-phased-from-normalized.js --input data/digital-literacy-navigating-the-information-age_normalized.json --outbase data/digital-literacy-navigating-the-information-age --lang en --clone-es-fr)
  - [ ] Extract TTS jobs (per-phase narration) for en/es/fr → data/tts_jobs/digital-literacy-navigating-the-information-age.en|es|fr.json (cmd: node scripts/extract-tts-jobs.js --slugs digital-literacy-navigating-the-information-age --langs en,es,fr --in data --out data/tts_jobs)
  - [ ] Validate PhaseDNA shape and TTS jobs presence → npm run validate
  - [ ] Ensure day-to-slug resolver loads this lesson in index.html → Update getDNALessonData to include this day or general resolver
  - [ ] Attach minimal avatar cues/moods per phase (optional) → Edit phased JSON: phases[].avatar.cues
  - [ ] Quick review of es/fr clones for obvious issues → data/digital-literacy-navigating-the-information-age.es|fr.phased.json
  - [ ] Enable prefetch of next-phase TTS during playback → Player optimization (once globally implemented)
  - [ ] QA in index.html: phase texts render, TTS plays, interactions flow → Open index.html?day=258

## Day 259 — Climate Adaptation - Living with Change
- Learning objective: Understand adaptation strategies while exploring how communities can prepare for and respond to climate change impacts.
- Slug: climate-adaptation-living-with-change
- Files:
  - Normalized: data/climate-adaptation-living-with-change_normalized.json
  - PhaseDNA: data/climate-adaptation-living-with-change.en.phased.json, data/climate-adaptation-living-with-change.es.phased.json, data/climate-adaptation-living-with-change.fr.phased.json
  - TTS jobs: data/tts_jobs/climate-adaptation-living-with-change.en.json, data/tts_jobs/climate-adaptation-living-with-change.es.json, data/tts_jobs/climate-adaptation-living-with-change.fr.json
- Subtasks:
  - [ ] Author normalized DNA source → data/climate-adaptation-living-with-change_normalized.json
  - [ ] Generate PhaseDNA v1 (en + clone es/fr) → data/climate-adaptation-living-with-change.en|es|fr.phased.json (cmd: node scripts/generate-phased-from-normalized.js --input data/climate-adaptation-living-with-change_normalized.json --outbase data/climate-adaptation-living-with-change --lang en --clone-es-fr)
  - [ ] Extract TTS jobs (per-phase narration) for en/es/fr → data/tts_jobs/climate-adaptation-living-with-change.en|es|fr.json (cmd: node scripts/extract-tts-jobs.js --slugs climate-adaptation-living-with-change --langs en,es,fr --in data --out data/tts_jobs)
  - [ ] Validate PhaseDNA shape and TTS jobs presence → npm run validate
  - [ ] Ensure day-to-slug resolver loads this lesson in index.html → Update getDNALessonData to include this day or general resolver
  - [ ] Attach minimal avatar cues/moods per phase (optional) → Edit phased JSON: phases[].avatar.cues
  - [ ] Quick review of es/fr clones for obvious issues → data/climate-adaptation-living-with-change.es|fr.phased.json
  - [ ] Enable prefetch of next-phase TTS during playback → Player optimization (once globally implemented)
  - [ ] QA in index.html: phase texts render, TTS plays, interactions flow → Open index.html?day=259

## Day 260 — Quantum Biology - Life at the Quantum Level
- Learning objective: Explore quantum life while understanding how quantum effects enable photosynthesis, navigation, and biological sensing.
- Slug: quantum-biology-life-at-the-quantum-level
- Files:
  - Normalized: data/quantum-biology-life-at-the-quantum-level_normalized.json
  - PhaseDNA: data/quantum-biology-life-at-the-quantum-level.en.phased.json, data/quantum-biology-life-at-the-quantum-level.es.phased.json, data/quantum-biology-life-at-the-quantum-level.fr.phased.json
  - TTS jobs: data/tts_jobs/quantum-biology-life-at-the-quantum-level.en.json, data/tts_jobs/quantum-biology-life-at-the-quantum-level.es.json, data/tts_jobs/quantum-biology-life-at-the-quantum-level.fr.json
- Subtasks:
  - [ ] Author normalized DNA source → data/quantum-biology-life-at-the-quantum-level_normalized.json
  - [ ] Generate PhaseDNA v1 (en + clone es/fr) → data/quantum-biology-life-at-the-quantum-level.en|es|fr.phased.json (cmd: node scripts/generate-phased-from-normalized.js --input data/quantum-biology-life-at-the-quantum-level_normalized.json --outbase data/quantum-biology-life-at-the-quantum-level --lang en --clone-es-fr)
  - [ ] Extract TTS jobs (per-phase narration) for en/es/fr → data/tts_jobs/quantum-biology-life-at-the-quantum-level.en|es|fr.json (cmd: node scripts/extract-tts-jobs.js --slugs quantum-biology-life-at-the-quantum-level --langs en,es,fr --in data --out data/tts_jobs)
  - [ ] Validate PhaseDNA shape and TTS jobs presence → npm run validate
  - [ ] Ensure day-to-slug resolver loads this lesson in index.html → Update getDNALessonData to include this day or general resolver
  - [ ] Attach minimal avatar cues/moods per phase (optional) → Edit phased JSON: phases[].avatar.cues
  - [ ] Quick review of es/fr clones for obvious issues → data/quantum-biology-life-at-the-quantum-level.es|fr.phased.json
  - [ ] Enable prefetch of next-phase TTS during playback → Player optimization (once globally implemented)
  - [ ] QA in index.html: phase texts render, TTS plays, interactions flow → Open index.html?day=260

## Day 261 — Social Innovation - Solving Problems Together
- Learning objective: Practice collaborative problem-solving while understanding how social innovation enables community development, equity, and democratic participation.
- Slug: social-innovation-solving-problems-together
- Files:
  - Normalized: data/social-innovation-solving-problems-together_normalized.json
  - PhaseDNA: data/social-innovation-solving-problems-together.en.phased.json, data/social-innovation-solving-problems-together.es.phased.json, data/social-innovation-solving-problems-together.fr.phased.json
  - TTS jobs: data/tts_jobs/social-innovation-solving-problems-together.en.json, data/tts_jobs/social-innovation-solving-problems-together.es.json, data/tts_jobs/social-innovation-solving-problems-together.fr.json
- Subtasks:
  - [ ] Author normalized DNA source → data/social-innovation-solving-problems-together_normalized.json
  - [ ] Generate PhaseDNA v1 (en + clone es/fr) → data/social-innovation-solving-problems-together.en|es|fr.phased.json (cmd: node scripts/generate-phased-from-normalized.js --input data/social-innovation-solving-problems-together_normalized.json --outbase data/social-innovation-solving-problems-together --lang en --clone-es-fr)
  - [ ] Extract TTS jobs (per-phase narration) for en/es/fr → data/tts_jobs/social-innovation-solving-problems-together.en|es|fr.json (cmd: node scripts/extract-tts-jobs.js --slugs social-innovation-solving-problems-together --langs en,es,fr --in data --out data/tts_jobs)
  - [ ] Validate PhaseDNA shape and TTS jobs presence → npm run validate
  - [ ] Ensure day-to-slug resolver loads this lesson in index.html → Update getDNALessonData to include this day or general resolver
  - [ ] Attach minimal avatar cues/moods per phase (optional) → Edit phased JSON: phases[].avatar.cues
  - [ ] Quick review of es/fr clones for obvious issues → data/social-innovation-solving-problems-together.es|fr.phased.json
  - [ ] Enable prefetch of next-phase TTS during playback → Player optimization (once globally implemented)
  - [ ] QA in index.html: phase texts render, TTS plays, interactions flow → Open index.html?day=261

## Day 262 — Digital Transformation - Technology and Organizational Change
- Learning objective: Understand organizational change while exploring how digital transformation affects work, leadership, and organizational culture.
- Slug: digital-transformation-technology-and-organizational-change
- Files:
  - Normalized: data/digital-transformation-technology-and-organizational-change_normalized.json
  - PhaseDNA: data/digital-transformation-technology-and-organizational-change.en.phased.json, data/digital-transformation-technology-and-organizational-change.es.phased.json, data/digital-transformation-technology-and-organizational-change.fr.phased.json
  - TTS jobs: data/tts_jobs/digital-transformation-technology-and-organizational-change.en.json, data/tts_jobs/digital-transformation-technology-and-organizational-change.es.json, data/tts_jobs/digital-transformation-technology-and-organizational-change.fr.json
- Subtasks:
  - [ ] Author normalized DNA source → data/digital-transformation-technology-and-organizational-change_normalized.json
  - [ ] Generate PhaseDNA v1 (en + clone es/fr) → data/digital-transformation-technology-and-organizational-change.en|es|fr.phased.json (cmd: node scripts/generate-phased-from-normalized.js --input data/digital-transformation-technology-and-organizational-change_normalized.json --outbase data/digital-transformation-technology-and-organizational-change --lang en --clone-es-fr)
  - [ ] Extract TTS jobs (per-phase narration) for en/es/fr → data/tts_jobs/digital-transformation-technology-and-organizational-change.en|es|fr.json (cmd: node scripts/extract-tts-jobs.js --slugs digital-transformation-technology-and-organizational-change --langs en,es,fr --in data --out data/tts_jobs)
  - [ ] Validate PhaseDNA shape and TTS jobs presence → npm run validate
  - [ ] Ensure day-to-slug resolver loads this lesson in index.html → Update getDNALessonData to include this day or general resolver
  - [ ] Attach minimal avatar cues/moods per phase (optional) → Edit phased JSON: phases[].avatar.cues
  - [ ] Quick review of es/fr clones for obvious issues → data/digital-transformation-technology-and-organizational-change.es|fr.phased.json
  - [ ] Enable prefetch of next-phase TTS during playback → Player optimization (once globally implemented)
  - [ ] QA in index.html: phase texts render, TTS plays, interactions flow → Open index.html?day=262

## Day 263 — Regenerative Medicine - Healing from Within
- Learning objective: Explore medical regeneration while understanding how regenerative medicine enables tissue repair, organ replacement, and personalized treatment.
- Slug: regenerative-medicine-healing-from-within
- Files:
  - Normalized: data/regenerative-medicine-healing-from-within_normalized.json
  - PhaseDNA: data/regenerative-medicine-healing-from-within.en.phased.json, data/regenerative-medicine-healing-from-within.es.phased.json, data/regenerative-medicine-healing-from-within.fr.phased.json
  - TTS jobs: data/tts_jobs/regenerative-medicine-healing-from-within.en.json, data/tts_jobs/regenerative-medicine-healing-from-within.es.json, data/tts_jobs/regenerative-medicine-healing-from-within.fr.json
- Subtasks:
  - [ ] Author normalized DNA source → data/regenerative-medicine-healing-from-within_normalized.json
  - [ ] Generate PhaseDNA v1 (en + clone es/fr) → data/regenerative-medicine-healing-from-within.en|es|fr.phased.json (cmd: node scripts/generate-phased-from-normalized.js --input data/regenerative-medicine-healing-from-within_normalized.json --outbase data/regenerative-medicine-healing-from-within --lang en --clone-es-fr)
  - [ ] Extract TTS jobs (per-phase narration) for en/es/fr → data/tts_jobs/regenerative-medicine-healing-from-within.en|es|fr.json (cmd: node scripts/extract-tts-jobs.js --slugs regenerative-medicine-healing-from-within --langs en,es,fr --in data --out data/tts_jobs)
  - [ ] Validate PhaseDNA shape and TTS jobs presence → npm run validate
  - [ ] Ensure day-to-slug resolver loads this lesson in index.html → Update getDNALessonData to include this day or general resolver
  - [ ] Attach minimal avatar cues/moods per phase (optional) → Edit phased JSON: phases[].avatar.cues
  - [ ] Quick review of es/fr clones for obvious issues → data/regenerative-medicine-healing-from-within.es|fr.phased.json
  - [ ] Enable prefetch of next-phase TTS during playback → Player optimization (once globally implemented)
  - [ ] QA in index.html: phase texts render, TTS plays, interactions flow → Open index.html?day=263

## Day 264 — Quantum Internet - Secure Communication of the Future
- Learning objective: Explore quantum communication while understanding how quantum internet enables unhackable communication and distributed quantum computing.
- Slug: quantum-internet-secure-communication-of-the-future
- Files:
  - Normalized: data/quantum-internet-secure-communication-of-the-future_normalized.json
  - PhaseDNA: data/quantum-internet-secure-communication-of-the-future.en.phased.json, data/quantum-internet-secure-communication-of-the-future.es.phased.json, data/quantum-internet-secure-communication-of-the-future.fr.phased.json
  - TTS jobs: data/tts_jobs/quantum-internet-secure-communication-of-the-future.en.json, data/tts_jobs/quantum-internet-secure-communication-of-the-future.es.json, data/tts_jobs/quantum-internet-secure-communication-of-the-future.fr.json
- Subtasks:
  - [ ] Author normalized DNA source → data/quantum-internet-secure-communication-of-the-future_normalized.json
  - [ ] Generate PhaseDNA v1 (en + clone es/fr) → data/quantum-internet-secure-communication-of-the-future.en|es|fr.phased.json (cmd: node scripts/generate-phased-from-normalized.js --input data/quantum-internet-secure-communication-of-the-future_normalized.json --outbase data/quantum-internet-secure-communication-of-the-future --lang en --clone-es-fr)
  - [ ] Extract TTS jobs (per-phase narration) for en/es/fr → data/tts_jobs/quantum-internet-secure-communication-of-the-future.en|es|fr.json (cmd: node scripts/extract-tts-jobs.js --slugs quantum-internet-secure-communication-of-the-future --langs en,es,fr --in data --out data/tts_jobs)
  - [ ] Validate PhaseDNA shape and TTS jobs presence → npm run validate
  - [ ] Ensure day-to-slug resolver loads this lesson in index.html → Update getDNALessonData to include this day or general resolver
  - [ ] Attach minimal avatar cues/moods per phase (optional) → Edit phased JSON: phases[].avatar.cues
  - [ ] Quick review of es/fr clones for obvious issues → data/quantum-internet-secure-communication-of-the-future.es|fr.phased.json
  - [ ] Enable prefetch of next-phase TTS during playback → Player optimization (once globally implemented)
  - [ ] QA in index.html: phase texts render, TTS plays, interactions flow → Open index.html?day=264

## Day 265 — Sustainable Transportation - Moving People and Goods
- Learning objective: Practice transportation planning while understanding how sustainable mobility enables climate action, public health, and urban livability.
- Slug: sustainable-transportation-moving-people-and-goods
- Files:
  - Normalized: data/sustainable-transportation-moving-people-and-goods_normalized.json
  - PhaseDNA: data/sustainable-transportation-moving-people-and-goods.en.phased.json, data/sustainable-transportation-moving-people-and-goods.es.phased.json, data/sustainable-transportation-moving-people-and-goods.fr.phased.json
  - TTS jobs: data/tts_jobs/sustainable-transportation-moving-people-and-goods.en.json, data/tts_jobs/sustainable-transportation-moving-people-and-goods.es.json, data/tts_jobs/sustainable-transportation-moving-people-and-goods.fr.json
- Subtasks:
  - [ ] Author normalized DNA source → data/sustainable-transportation-moving-people-and-goods_normalized.json
  - [ ] Generate PhaseDNA v1 (en + clone es/fr) → data/sustainable-transportation-moving-people-and-goods.en|es|fr.phased.json (cmd: node scripts/generate-phased-from-normalized.js --input data/sustainable-transportation-moving-people-and-goods_normalized.json --outbase data/sustainable-transportation-moving-people-and-goods --lang en --clone-es-fr)
  - [ ] Extract TTS jobs (per-phase narration) for en/es/fr → data/tts_jobs/sustainable-transportation-moving-people-and-goods.en|es|fr.json (cmd: node scripts/extract-tts-jobs.js --slugs sustainable-transportation-moving-people-and-goods --langs en,es,fr --in data --out data/tts_jobs)
  - [ ] Validate PhaseDNA shape and TTS jobs presence → npm run validate
  - [ ] Ensure day-to-slug resolver loads this lesson in index.html → Update getDNALessonData to include this day or general resolver
  - [ ] Attach minimal avatar cues/moods per phase (optional) → Edit phased JSON: phases[].avatar.cues
  - [ ] Quick review of es/fr clones for obvious issues → data/sustainable-transportation-moving-people-and-goods.es|fr.phased.json
  - [ ] Enable prefetch of next-phase TTS during playback → Player optimization (once globally implemented)
  - [ ] QA in index.html: phase texts render, TTS plays, interactions flow → Open index.html?day=265

## Day 266 — Digital Humanities - Technology and Culture
- Learning objective: Explore cultural technology while understanding how digital humanities enables cultural preservation, analysis, and public engagement.
- Slug: digital-humanities-technology-and-culture
- Files:
  - Normalized: data/digital-humanities-technology-and-culture_normalized.json
  - PhaseDNA: data/digital-humanities-technology-and-culture.en.phased.json, data/digital-humanities-technology-and-culture.es.phased.json, data/digital-humanities-technology-and-culture.fr.phased.json
  - TTS jobs: data/tts_jobs/digital-humanities-technology-and-culture.en.json, data/tts_jobs/digital-humanities-technology-and-culture.es.json, data/tts_jobs/digital-humanities-technology-and-culture.fr.json
- Subtasks:
  - [ ] Author normalized DNA source → data/digital-humanities-technology-and-culture_normalized.json
  - [ ] Generate PhaseDNA v1 (en + clone es/fr) → data/digital-humanities-technology-and-culture.en|es|fr.phased.json (cmd: node scripts/generate-phased-from-normalized.js --input data/digital-humanities-technology-and-culture_normalized.json --outbase data/digital-humanities-technology-and-culture --lang en --clone-es-fr)
  - [ ] Extract TTS jobs (per-phase narration) for en/es/fr → data/tts_jobs/digital-humanities-technology-and-culture.en|es|fr.json (cmd: node scripts/extract-tts-jobs.js --slugs digital-humanities-technology-and-culture --langs en,es,fr --in data --out data/tts_jobs)
  - [ ] Validate PhaseDNA shape and TTS jobs presence → npm run validate
  - [ ] Ensure day-to-slug resolver loads this lesson in index.html → Update getDNALessonData to include this day or general resolver
  - [ ] Attach minimal avatar cues/moods per phase (optional) → Edit phased JSON: phases[].avatar.cues
  - [ ] Quick review of es/fr clones for obvious issues → data/digital-humanities-technology-and-culture.es|fr.phased.json
  - [ ] Enable prefetch of next-phase TTS during playback → Player optimization (once globally implemented)
  - [ ] QA in index.html: phase texts render, TTS plays, interactions flow → Open index.html?day=266

## Day 267 — Quantum Sensing - Measuring the Impossible
- Learning objective: Explore quantum measurement while understanding how quantum sensing enables precise navigation, medical imaging, and scientific discovery.
- Slug: quantum-sensing-measuring-the-impossible
- Files:
  - Normalized: data/quantum-sensing-measuring-the-impossible_normalized.json
  - PhaseDNA: data/quantum-sensing-measuring-the-impossible.en.phased.json, data/quantum-sensing-measuring-the-impossible.es.phased.json, data/quantum-sensing-measuring-the-impossible.fr.phased.json
  - TTS jobs: data/tts_jobs/quantum-sensing-measuring-the-impossible.en.json, data/tts_jobs/quantum-sensing-measuring-the-impossible.es.json, data/tts_jobs/quantum-sensing-measuring-the-impossible.fr.json
- Subtasks:
  - [ ] Author normalized DNA source → data/quantum-sensing-measuring-the-impossible_normalized.json
  - [ ] Generate PhaseDNA v1 (en + clone es/fr) → data/quantum-sensing-measuring-the-impossible.en|es|fr.phased.json (cmd: node scripts/generate-phased-from-normalized.js --input data/quantum-sensing-measuring-the-impossible_normalized.json --outbase data/quantum-sensing-measuring-the-impossible --lang en --clone-es-fr)
  - [ ] Extract TTS jobs (per-phase narration) for en/es/fr → data/tts_jobs/quantum-sensing-measuring-the-impossible.en|es|fr.json (cmd: node scripts/extract-tts-jobs.js --slugs quantum-sensing-measuring-the-impossible --langs en,es,fr --in data --out data/tts_jobs)
  - [ ] Validate PhaseDNA shape and TTS jobs presence → npm run validate
  - [ ] Ensure day-to-slug resolver loads this lesson in index.html → Update getDNALessonData to include this day or general resolver
  - [ ] Attach minimal avatar cues/moods per phase (optional) → Edit phased JSON: phases[].avatar.cues
  - [ ] Quick review of es/fr clones for obvious issues → data/quantum-sensing-measuring-the-impossible.es|fr.phased.json
  - [ ] Enable prefetch of next-phase TTS during playback → Player optimization (once globally implemented)
  - [ ] QA in index.html: phase texts render, TTS plays, interactions flow → Open index.html?day=267

## Day 268 — Social Entrepreneurship - Business for Good
- Learning objective: Practice mission-driven business while understanding how social entrepreneurship enables sustainable development, community empowerment, and democratic innovation.
- Slug: social-entrepreneurship-business-for-good
- Files:
  - Normalized: data/social-entrepreneurship-business-for-good_normalized.json
  - PhaseDNA: data/social-entrepreneurship-business-for-good.en.phased.json, data/social-entrepreneurship-business-for-good.es.phased.json, data/social-entrepreneurship-business-for-good.fr.phased.json
  - TTS jobs: data/tts_jobs/social-entrepreneurship-business-for-good.en.json, data/tts_jobs/social-entrepreneurship-business-for-good.es.json, data/tts_jobs/social-entrepreneurship-business-for-good.fr.json
- Subtasks:
  - [ ] Author normalized DNA source → data/social-entrepreneurship-business-for-good_normalized.json
  - [ ] Generate PhaseDNA v1 (en + clone es/fr) → data/social-entrepreneurship-business-for-good.en|es|fr.phased.json (cmd: node scripts/generate-phased-from-normalized.js --input data/social-entrepreneurship-business-for-good_normalized.json --outbase data/social-entrepreneurship-business-for-good --lang en --clone-es-fr)
  - [ ] Extract TTS jobs (per-phase narration) for en/es/fr → data/tts_jobs/social-entrepreneurship-business-for-good.en|es|fr.json (cmd: node scripts/extract-tts-jobs.js --slugs social-entrepreneurship-business-for-good --langs en,es,fr --in data --out data/tts_jobs)
  - [ ] Validate PhaseDNA shape and TTS jobs presence → npm run validate
  - [ ] Ensure day-to-slug resolver loads this lesson in index.html → Update getDNALessonData to include this day or general resolver
  - [ ] Attach minimal avatar cues/moods per phase (optional) → Edit phased JSON: phases[].avatar.cues
  - [ ] Quick review of es/fr clones for obvious issues → data/social-entrepreneurship-business-for-good.es|fr.phased.json
  - [ ] Enable prefetch of next-phase TTS during playback → Player optimization (once globally implemented)
  - [ ] QA in index.html: phase texts render, TTS plays, interactions flow → Open index.html?day=268

## Day 269 — Digital Health - Technology and Wellness
- Learning objective: Explore health technology while understanding how digital health enables personalized care, remote monitoring, and healthcare accessibility.
- Slug: digital-health-technology-and-wellness
- Files:
  - Normalized: data/digital-health-technology-and-wellness_normalized.json
  - PhaseDNA: data/digital-health-technology-and-wellness.en.phased.json, data/digital-health-technology-and-wellness.es.phased.json, data/digital-health-technology-and-wellness.fr.phased.json
  - TTS jobs: data/tts_jobs/digital-health-technology-and-wellness.en.json, data/tts_jobs/digital-health-technology-and-wellness.es.json, data/tts_jobs/digital-health-technology-and-wellness.fr.json
- Subtasks:
  - [ ] Author normalized DNA source → data/digital-health-technology-and-wellness_normalized.json
  - [ ] Generate PhaseDNA v1 (en + clone es/fr) → data/digital-health-technology-and-wellness.en|es|fr.phased.json (cmd: node scripts/generate-phased-from-normalized.js --input data/digital-health-technology-and-wellness_normalized.json --outbase data/digital-health-technology-and-wellness --lang en --clone-es-fr)
  - [ ] Extract TTS jobs (per-phase narration) for en/es/fr → data/tts_jobs/digital-health-technology-and-wellness.en|es|fr.json (cmd: node scripts/extract-tts-jobs.js --slugs digital-health-technology-and-wellness --langs en,es,fr --in data --out data/tts_jobs)
  - [ ] Validate PhaseDNA shape and TTS jobs presence → npm run validate
  - [ ] Ensure day-to-slug resolver loads this lesson in index.html → Update getDNALessonData to include this day or general resolver
  - [ ] Attach minimal avatar cues/moods per phase (optional) → Edit phased JSON: phases[].avatar.cues
  - [ ] Quick review of es/fr clones for obvious issues → data/digital-health-technology-and-wellness.es|fr.phased.json
  - [ ] Enable prefetch of next-phase TTS during playback → Player optimization (once globally implemented)
  - [ ] QA in index.html: phase texts render, TTS plays, interactions flow → Open index.html?day=269

## Day 270 — Quantum Materials - Materials of the Future
- Learning objective: Explore quantum materials while understanding how quantum materials enable superconductivity, quantum computing, and energy efficiency.
- Slug: quantum-materials-materials-of-the-future
- Files:
  - Normalized: data/quantum-materials-materials-of-the-future_normalized.json
  - PhaseDNA: data/quantum-materials-materials-of-the-future.en.phased.json, data/quantum-materials-materials-of-the-future.es.phased.json, data/quantum-materials-materials-of-the-future.fr.phased.json
  - TTS jobs: data/tts_jobs/quantum-materials-materials-of-the-future.en.json, data/tts_jobs/quantum-materials-materials-of-the-future.es.json, data/tts_jobs/quantum-materials-materials-of-the-future.fr.json
- Subtasks:
  - [ ] Author normalized DNA source → data/quantum-materials-materials-of-the-future_normalized.json
  - [ ] Generate PhaseDNA v1 (en + clone es/fr) → data/quantum-materials-materials-of-the-future.en|es|fr.phased.json (cmd: node scripts/generate-phased-from-normalized.js --input data/quantum-materials-materials-of-the-future_normalized.json --outbase data/quantum-materials-materials-of-the-future --lang en --clone-es-fr)
  - [ ] Extract TTS jobs (per-phase narration) for en/es/fr → data/tts_jobs/quantum-materials-materials-of-the-future.en|es|fr.json (cmd: node scripts/extract-tts-jobs.js --slugs quantum-materials-materials-of-the-future --langs en,es,fr --in data --out data/tts_jobs)
  - [ ] Validate PhaseDNA shape and TTS jobs presence → npm run validate
  - [ ] Ensure day-to-slug resolver loads this lesson in index.html → Update getDNALessonData to include this day or general resolver
  - [ ] Attach minimal avatar cues/moods per phase (optional) → Edit phased JSON: phases[].avatar.cues
  - [ ] Quick review of es/fr clones for obvious issues → data/quantum-materials-materials-of-the-future.es|fr.phased.json
  - [ ] Enable prefetch of next-phase TTS during playback → Player optimization (once globally implemented)
  - [ ] QA in index.html: phase texts render, TTS plays, interactions flow → Open index.html?day=270

## Day 271 — Sustainable Finance - Money for a Better World
- Learning objective: Practice ethical finance while understanding how sustainable finance enables climate action, social equity, and democratic economic systems.
- Slug: sustainable-finance-money-for-a-better-world
- Files:
  - Normalized: data/sustainable-finance-money-for-a-better-world_normalized.json
  - PhaseDNA: data/sustainable-finance-money-for-a-better-world.en.phased.json, data/sustainable-finance-money-for-a-better-world.es.phased.json, data/sustainable-finance-money-for-a-better-world.fr.phased.json
  - TTS jobs: data/tts_jobs/sustainable-finance-money-for-a-better-world.en.json, data/tts_jobs/sustainable-finance-money-for-a-better-world.es.json, data/tts_jobs/sustainable-finance-money-for-a-better-world.fr.json
- Subtasks:
  - [ ] Author normalized DNA source → data/sustainable-finance-money-for-a-better-world_normalized.json
  - [ ] Generate PhaseDNA v1 (en + clone es/fr) → data/sustainable-finance-money-for-a-better-world.en|es|fr.phased.json (cmd: node scripts/generate-phased-from-normalized.js --input data/sustainable-finance-money-for-a-better-world_normalized.json --outbase data/sustainable-finance-money-for-a-better-world --lang en --clone-es-fr)
  - [ ] Extract TTS jobs (per-phase narration) for en/es/fr → data/tts_jobs/sustainable-finance-money-for-a-better-world.en|es|fr.json (cmd: node scripts/extract-tts-jobs.js --slugs sustainable-finance-money-for-a-better-world --langs en,es,fr --in data --out data/tts_jobs)
  - [ ] Validate PhaseDNA shape and TTS jobs presence → npm run validate
  - [ ] Ensure day-to-slug resolver loads this lesson in index.html → Update getDNALessonData to include this day or general resolver
  - [ ] Attach minimal avatar cues/moods per phase (optional) → Edit phased JSON: phases[].avatar.cues
  - [ ] Quick review of es/fr clones for obvious issues → data/sustainable-finance-money-for-a-better-world.es|fr.phased.json
  - [ ] Enable prefetch of next-phase TTS during playback → Player optimization (once globally implemented)
  - [ ] QA in index.html: phase texts render, TTS plays, interactions flow → Open index.html?day=271

## Day 272 — Digital Education - Learning in the Digital Age
- Learning objective: Explore educational technology while understanding how digital education enables personalized learning, global access, and lifelong education.
- Slug: digital-education-learning-in-the-digital-age
- Files:
  - Normalized: data/digital-education-learning-in-the-digital-age_normalized.json
  - PhaseDNA: data/digital-education-learning-in-the-digital-age.en.phased.json, data/digital-education-learning-in-the-digital-age.es.phased.json, data/digital-education-learning-in-the-digital-age.fr.phased.json
  - TTS jobs: data/tts_jobs/digital-education-learning-in-the-digital-age.en.json, data/tts_jobs/digital-education-learning-in-the-digital-age.es.json, data/tts_jobs/digital-education-learning-in-the-digital-age.fr.json
- Subtasks:
  - [ ] Author normalized DNA source → data/digital-education-learning-in-the-digital-age_normalized.json
  - [ ] Generate PhaseDNA v1 (en + clone es/fr) → data/digital-education-learning-in-the-digital-age.en|es|fr.phased.json (cmd: node scripts/generate-phased-from-normalized.js --input data/digital-education-learning-in-the-digital-age_normalized.json --outbase data/digital-education-learning-in-the-digital-age --lang en --clone-es-fr)
  - [ ] Extract TTS jobs (per-phase narration) for en/es/fr → data/tts_jobs/digital-education-learning-in-the-digital-age.en|es|fr.json (cmd: node scripts/extract-tts-jobs.js --slugs digital-education-learning-in-the-digital-age --langs en,es,fr --in data --out data/tts_jobs)
  - [ ] Validate PhaseDNA shape and TTS jobs presence → npm run validate
  - [ ] Ensure day-to-slug resolver loads this lesson in index.html → Update getDNALessonData to include this day or general resolver
  - [ ] Attach minimal avatar cues/moods per phase (optional) → Edit phased JSON: phases[].avatar.cues
  - [ ] Quick review of es/fr clones for obvious issues → data/digital-education-learning-in-the-digital-age.es|fr.phased.json
  - [ ] Enable prefetch of next-phase TTS during playback → Player optimization (once globally implemented)
  - [ ] QA in index.html: phase texts render, TTS plays, interactions flow → Open index.html?day=272

## Day 273 — Quantum Machine Learning - AI Meets Quantum Physics
- Learning objective: Explore quantum AI while understanding how quantum machine learning enables faster computation, better optimization, and scientific discovery.
- Slug: quantum-machine-learning-ai-meets-quantum-physics
- Files:
  - Normalized: data/quantum-machine-learning-ai-meets-quantum-physics_normalized.json
  - PhaseDNA: data/quantum-machine-learning-ai-meets-quantum-physics.en.phased.json, data/quantum-machine-learning-ai-meets-quantum-physics.es.phased.json, data/quantum-machine-learning-ai-meets-quantum-physics.fr.phased.json
  - TTS jobs: data/tts_jobs/quantum-machine-learning-ai-meets-quantum-physics.en.json, data/tts_jobs/quantum-machine-learning-ai-meets-quantum-physics.es.json, data/tts_jobs/quantum-machine-learning-ai-meets-quantum-physics.fr.json
- Subtasks:
  - [ ] Author normalized DNA source → data/quantum-machine-learning-ai-meets-quantum-physics_normalized.json
  - [ ] Generate PhaseDNA v1 (en + clone es/fr) → data/quantum-machine-learning-ai-meets-quantum-physics.en|es|fr.phased.json (cmd: node scripts/generate-phased-from-normalized.js --input data/quantum-machine-learning-ai-meets-quantum-physics_normalized.json --outbase data/quantum-machine-learning-ai-meets-quantum-physics --lang en --clone-es-fr)
  - [ ] Extract TTS jobs (per-phase narration) for en/es/fr → data/tts_jobs/quantum-machine-learning-ai-meets-quantum-physics.en|es|fr.json (cmd: node scripts/extract-tts-jobs.js --slugs quantum-machine-learning-ai-meets-quantum-physics --langs en,es,fr --in data --out data/tts_jobs)
  - [ ] Validate PhaseDNA shape and TTS jobs presence → npm run validate
  - [ ] Ensure day-to-slug resolver loads this lesson in index.html → Update getDNALessonData to include this day or general resolver
  - [ ] Attach minimal avatar cues/moods per phase (optional) → Edit phased JSON: phases[].avatar.cues
  - [ ] Quick review of es/fr clones for obvious issues → data/quantum-machine-learning-ai-meets-quantum-physics.es|fr.phased.json
  - [ ] Enable prefetch of next-phase TTS during playback → Player optimization (once globally implemented)
  - [ ] QA in index.html: phase texts render, TTS plays, interactions flow → Open index.html?day=273

## Day 274 — Sustainable Tourism - Traveling Responsibly
- Learning objective: Practice responsible travel while understanding how sustainable tourism enables cultural preservation, environmental protection, and local development.
- Slug: sustainable-tourism-traveling-responsibly
- Files:
  - Normalized: data/sustainable-tourism-traveling-responsibly_normalized.json
  - PhaseDNA: data/sustainable-tourism-traveling-responsibly.en.phased.json, data/sustainable-tourism-traveling-responsibly.es.phased.json, data/sustainable-tourism-traveling-responsibly.fr.phased.json
  - TTS jobs: data/tts_jobs/sustainable-tourism-traveling-responsibly.en.json, data/tts_jobs/sustainable-tourism-traveling-responsibly.es.json, data/tts_jobs/sustainable-tourism-traveling-responsibly.fr.json
- Subtasks:
  - [ ] Author normalized DNA source → data/sustainable-tourism-traveling-responsibly_normalized.json
  - [ ] Generate PhaseDNA v1 (en + clone es/fr) → data/sustainable-tourism-traveling-responsibly.en|es|fr.phased.json (cmd: node scripts/generate-phased-from-normalized.js --input data/sustainable-tourism-traveling-responsibly_normalized.json --outbase data/sustainable-tourism-traveling-responsibly --lang en --clone-es-fr)
  - [ ] Extract TTS jobs (per-phase narration) for en/es/fr → data/tts_jobs/sustainable-tourism-traveling-responsibly.en|es|fr.json (cmd: node scripts/extract-tts-jobs.js --slugs sustainable-tourism-traveling-responsibly --langs en,es,fr --in data --out data/tts_jobs)
  - [ ] Validate PhaseDNA shape and TTS jobs presence → npm run validate
  - [ ] Ensure day-to-slug resolver loads this lesson in index.html → Update getDNALessonData to include this day or general resolver
  - [ ] Attach minimal avatar cues/moods per phase (optional) → Edit phased JSON: phases[].avatar.cues
  - [ ] Quick review of es/fr clones for obvious issues → data/sustainable-tourism-traveling-responsibly.es|fr.phased.json
  - [ ] Enable prefetch of next-phase TTS during playback → Player optimization (once globally implemented)
  - [ ] QA in index.html: phase texts render, TTS plays, interactions flow → Open index.html?day=274

## Day 275 — Digital Art - Creativity in the Digital Age
- Learning objective: Practice digital creativity while understanding how digital art enables new forms of expression, cultural exchange, and artistic innovation.
- Slug: digital-art-creativity-in-the-digital-age
- Files:
  - Normalized: data/digital-art-creativity-in-the-digital-age_normalized.json
  - PhaseDNA: data/digital-art-creativity-in-the-digital-age.en.phased.json, data/digital-art-creativity-in-the-digital-age.es.phased.json, data/digital-art-creativity-in-the-digital-age.fr.phased.json
  - TTS jobs: data/tts_jobs/digital-art-creativity-in-the-digital-age.en.json, data/tts_jobs/digital-art-creativity-in-the-digital-age.es.json, data/tts_jobs/digital-art-creativity-in-the-digital-age.fr.json
- Subtasks:
  - [ ] Author normalized DNA source → data/digital-art-creativity-in-the-digital-age_normalized.json
  - [ ] Generate PhaseDNA v1 (en + clone es/fr) → data/digital-art-creativity-in-the-digital-age.en|es|fr.phased.json (cmd: node scripts/generate-phased-from-normalized.js --input data/digital-art-creativity-in-the-digital-age_normalized.json --outbase data/digital-art-creativity-in-the-digital-age --lang en --clone-es-fr)
  - [ ] Extract TTS jobs (per-phase narration) for en/es/fr → data/tts_jobs/digital-art-creativity-in-the-digital-age.en|es|fr.json (cmd: node scripts/extract-tts-jobs.js --slugs digital-art-creativity-in-the-digital-age --langs en,es,fr --in data --out data/tts_jobs)
  - [ ] Validate PhaseDNA shape and TTS jobs presence → npm run validate
  - [ ] Ensure day-to-slug resolver loads this lesson in index.html → Update getDNALessonData to include this day or general resolver
  - [ ] Attach minimal avatar cues/moods per phase (optional) → Edit phased JSON: phases[].avatar.cues
  - [ ] Quick review of es/fr clones for obvious issues → data/digital-art-creativity-in-the-digital-age.es|fr.phased.json
  - [ ] Enable prefetch of next-phase TTS during playback → Player optimization (once globally implemented)
  - [ ] QA in index.html: phase texts render, TTS plays, interactions flow → Open index.html?day=275

## Day 276 — Quantum Cryptography - Unhackable Communication
- Learning objective: Explore quantum security while understanding how quantum cryptography enables secure communication, digital identity, and privacy protection.
- Slug: quantum-cryptography-unhackable-communication
- Files:
  - Normalized: data/quantum-cryptography-unhackable-communication_normalized.json
  - PhaseDNA: data/quantum-cryptography-unhackable-communication.en.phased.json, data/quantum-cryptography-unhackable-communication.es.phased.json, data/quantum-cryptography-unhackable-communication.fr.phased.json
  - TTS jobs: data/tts_jobs/quantum-cryptography-unhackable-communication.en.json, data/tts_jobs/quantum-cryptography-unhackable-communication.es.json, data/tts_jobs/quantum-cryptography-unhackable-communication.fr.json
- Subtasks:
  - [ ] Author normalized DNA source → data/quantum-cryptography-unhackable-communication_normalized.json
  - [ ] Generate PhaseDNA v1 (en + clone es/fr) → data/quantum-cryptography-unhackable-communication.en|es|fr.phased.json (cmd: node scripts/generate-phased-from-normalized.js --input data/quantum-cryptography-unhackable-communication_normalized.json --outbase data/quantum-cryptography-unhackable-communication --lang en --clone-es-fr)
  - [ ] Extract TTS jobs (per-phase narration) for en/es/fr → data/tts_jobs/quantum-cryptography-unhackable-communication.en|es|fr.json (cmd: node scripts/extract-tts-jobs.js --slugs quantum-cryptography-unhackable-communication --langs en,es,fr --in data --out data/tts_jobs)
  - [ ] Validate PhaseDNA shape and TTS jobs presence → npm run validate
  - [ ] Ensure day-to-slug resolver loads this lesson in index.html → Update getDNALessonData to include this day or general resolver
  - [ ] Attach minimal avatar cues/moods per phase (optional) → Edit phased JSON: phases[].avatar.cues
  - [ ] Quick review of es/fr clones for obvious issues → data/quantum-cryptography-unhackable-communication.es|fr.phased.json
  - [ ] Enable prefetch of next-phase TTS during playback → Player optimization (once globally implemented)
  - [ ] QA in index.html: phase texts render, TTS plays, interactions flow → Open index.html?day=276

## Day 277 — Sustainable Fashion - Style with a Conscience
- Learning objective: Practice ethical fashion while understanding how sustainable fashion enables environmental protection, fair labor, and circular economy principles.
- Slug: sustainable-fashion-style-with-a-conscience
- Files:
  - Normalized: data/sustainable-fashion-style-with-a-conscience_normalized.json
  - PhaseDNA: data/sustainable-fashion-style-with-a-conscience.en.phased.json, data/sustainable-fashion-style-with-a-conscience.es.phased.json, data/sustainable-fashion-style-with-a-conscience.fr.phased.json
  - TTS jobs: data/tts_jobs/sustainable-fashion-style-with-a-conscience.en.json, data/tts_jobs/sustainable-fashion-style-with-a-conscience.es.json, data/tts_jobs/sustainable-fashion-style-with-a-conscience.fr.json
- Subtasks:
  - [ ] Author normalized DNA source → data/sustainable-fashion-style-with-a-conscience_normalized.json
  - [ ] Generate PhaseDNA v1 (en + clone es/fr) → data/sustainable-fashion-style-with-a-conscience.en|es|fr.phased.json (cmd: node scripts/generate-phased-from-normalized.js --input data/sustainable-fashion-style-with-a-conscience_normalized.json --outbase data/sustainable-fashion-style-with-a-conscience --lang en --clone-es-fr)
  - [ ] Extract TTS jobs (per-phase narration) for en/es/fr → data/tts_jobs/sustainable-fashion-style-with-a-conscience.en|es|fr.json (cmd: node scripts/extract-tts-jobs.js --slugs sustainable-fashion-style-with-a-conscience --langs en,es,fr --in data --out data/tts_jobs)
  - [ ] Validate PhaseDNA shape and TTS jobs presence → npm run validate
  - [ ] Ensure day-to-slug resolver loads this lesson in index.html → Update getDNALessonData to include this day or general resolver
  - [ ] Attach minimal avatar cues/moods per phase (optional) → Edit phased JSON: phases[].avatar.cues
  - [ ] Quick review of es/fr clones for obvious issues → data/sustainable-fashion-style-with-a-conscience.es|fr.phased.json
  - [ ] Enable prefetch of next-phase TTS during playback → Player optimization (once globally implemented)
  - [ ] QA in index.html: phase texts render, TTS plays, interactions flow → Open index.html?day=277

## Day 278 — Digital Archaeology - Technology and the Past
- Learning objective: Explore archaeological technology while understanding how digital archaeology enables cultural preservation, scientific discovery, and public education.
- Slug: digital-archaeology-technology-and-the-past
- Files:
  - Normalized: data/digital-archaeology-technology-and-the-past_normalized.json
  - PhaseDNA: data/digital-archaeology-technology-and-the-past.en.phased.json, data/digital-archaeology-technology-and-the-past.es.phased.json, data/digital-archaeology-technology-and-the-past.fr.phased.json
  - TTS jobs: data/tts_jobs/digital-archaeology-technology-and-the-past.en.json, data/tts_jobs/digital-archaeology-technology-and-the-past.es.json, data/tts_jobs/digital-archaeology-technology-and-the-past.fr.json
- Subtasks:
  - [ ] Author normalized DNA source → data/digital-archaeology-technology-and-the-past_normalized.json
  - [ ] Generate PhaseDNA v1 (en + clone es/fr) → data/digital-archaeology-technology-and-the-past.en|es|fr.phased.json (cmd: node scripts/generate-phased-from-normalized.js --input data/digital-archaeology-technology-and-the-past_normalized.json --outbase data/digital-archaeology-technology-and-the-past --lang en --clone-es-fr)
  - [ ] Extract TTS jobs (per-phase narration) for en/es/fr → data/tts_jobs/digital-archaeology-technology-and-the-past.en|es|fr.json (cmd: node scripts/extract-tts-jobs.js --slugs digital-archaeology-technology-and-the-past --langs en,es,fr --in data --out data/tts_jobs)
  - [ ] Validate PhaseDNA shape and TTS jobs presence → npm run validate
  - [ ] Ensure day-to-slug resolver loads this lesson in index.html → Update getDNALessonData to include this day or general resolver
  - [ ] Attach minimal avatar cues/moods per phase (optional) → Edit phased JSON: phases[].avatar.cues
  - [ ] Quick review of es/fr clones for obvious issues → data/digital-archaeology-technology-and-the-past.es|fr.phased.json
  - [ ] Enable prefetch of next-phase TTS during playback → Player optimization (once globally implemented)
  - [ ] QA in index.html: phase texts render, TTS plays, interactions flow → Open index.html?day=278

## Day 279 — Sustainable Architecture - Building for the Future
- Learning objective: Practice green building while understanding how sustainable architecture enables energy efficiency, environmental protection, and healthy living spaces.
- Slug: sustainable-architecture-building-for-the-future
- Files:
  - Normalized: data/sustainable-architecture-building-for-the-future_normalized.json
  - PhaseDNA: data/sustainable-architecture-building-for-the-future.en.phased.json, data/sustainable-architecture-building-for-the-future.es.phased.json, data/sustainable-architecture-building-for-the-future.fr.phased.json
  - TTS jobs: data/tts_jobs/sustainable-architecture-building-for-the-future.en.json, data/tts_jobs/sustainable-architecture-building-for-the-future.es.json, data/tts_jobs/sustainable-architecture-building-for-the-future.fr.json
- Subtasks:
  - [ ] Author normalized DNA source → data/sustainable-architecture-building-for-the-future_normalized.json
  - [ ] Generate PhaseDNA v1 (en + clone es/fr) → data/sustainable-architecture-building-for-the-future.en|es|fr.phased.json (cmd: node scripts/generate-phased-from-normalized.js --input data/sustainable-architecture-building-for-the-future_normalized.json --outbase data/sustainable-architecture-building-for-the-future --lang en --clone-es-fr)
  - [ ] Extract TTS jobs (per-phase narration) for en/es/fr → data/tts_jobs/sustainable-architecture-building-for-the-future.en|es|fr.json (cmd: node scripts/extract-tts-jobs.js --slugs sustainable-architecture-building-for-the-future --langs en,es,fr --in data --out data/tts_jobs)
  - [ ] Validate PhaseDNA shape and TTS jobs presence → npm run validate
  - [ ] Ensure day-to-slug resolver loads this lesson in index.html → Update getDNALessonData to include this day or general resolver
  - [ ] Attach minimal avatar cues/moods per phase (optional) → Edit phased JSON: phases[].avatar.cues
  - [ ] Quick review of es/fr clones for obvious issues → data/sustainable-architecture-building-for-the-future.es|fr.phased.json
  - [ ] Enable prefetch of next-phase TTS during playback → Player optimization (once globally implemented)
  - [ ] QA in index.html: phase texts render, TTS plays, interactions flow → Open index.html?day=279

## Day 280 — Digital Music - Sound in the Digital Age
- Learning objective: Explore digital audio while understanding how digital music enables new forms of expression, global collaboration, and musical innovation.
- Slug: digital-music-sound-in-the-digital-age
- Files:
  - Normalized: data/digital-music-sound-in-the-digital-age_normalized.json
  - PhaseDNA: data/digital-music-sound-in-the-digital-age.en.phased.json, data/digital-music-sound-in-the-digital-age.es.phased.json, data/digital-music-sound-in-the-digital-age.fr.phased.json
  - TTS jobs: data/tts_jobs/digital-music-sound-in-the-digital-age.en.json, data/tts_jobs/digital-music-sound-in-the-digital-age.es.json, data/tts_jobs/digital-music-sound-in-the-digital-age.fr.json
- Subtasks:
  - [ ] Author normalized DNA source → data/digital-music-sound-in-the-digital-age_normalized.json
  - [ ] Generate PhaseDNA v1 (en + clone es/fr) → data/digital-music-sound-in-the-digital-age.en|es|fr.phased.json (cmd: node scripts/generate-phased-from-normalized.js --input data/digital-music-sound-in-the-digital-age_normalized.json --outbase data/digital-music-sound-in-the-digital-age --lang en --clone-es-fr)
  - [ ] Extract TTS jobs (per-phase narration) for en/es/fr → data/tts_jobs/digital-music-sound-in-the-digital-age.en|es|fr.json (cmd: node scripts/extract-tts-jobs.js --slugs digital-music-sound-in-the-digital-age --langs en,es,fr --in data --out data/tts_jobs)
  - [ ] Validate PhaseDNA shape and TTS jobs presence → npm run validate
  - [ ] Ensure day-to-slug resolver loads this lesson in index.html → Update getDNALessonData to include this day or general resolver
  - [ ] Attach minimal avatar cues/moods per phase (optional) → Edit phased JSON: phases[].avatar.cues
  - [ ] Quick review of es/fr clones for obvious issues → data/digital-music-sound-in-the-digital-age.es|fr.phased.json
  - [ ] Enable prefetch of next-phase TTS during playback → Player optimization (once globally implemented)
  - [ ] QA in index.html: phase texts render, TTS plays, interactions flow → Open index.html?day=280

## Day 281 — Sustainable Food Systems - Feeding the World
- Learning objective: Practice food systems thinking while understanding how sustainable food systems enable nutrition, environmental protection, and social equity.
- Slug: sustainable-food-systems-feeding-the-world
- Files:
  - Normalized: data/sustainable-food-systems-feeding-the-world_normalized.json
  - PhaseDNA: data/sustainable-food-systems-feeding-the-world.en.phased.json, data/sustainable-food-systems-feeding-the-world.es.phased.json, data/sustainable-food-systems-feeding-the-world.fr.phased.json
  - TTS jobs: data/tts_jobs/sustainable-food-systems-feeding-the-world.en.json, data/tts_jobs/sustainable-food-systems-feeding-the-world.es.json, data/tts_jobs/sustainable-food-systems-feeding-the-world.fr.json
- Subtasks:
  - [ ] Author normalized DNA source → data/sustainable-food-systems-feeding-the-world_normalized.json
  - [ ] Generate PhaseDNA v1 (en + clone es/fr) → data/sustainable-food-systems-feeding-the-world.en|es|fr.phased.json (cmd: node scripts/generate-phased-from-normalized.js --input data/sustainable-food-systems-feeding-the-world_normalized.json --outbase data/sustainable-food-systems-feeding-the-world --lang en --clone-es-fr)
  - [ ] Extract TTS jobs (per-phase narration) for en/es/fr → data/tts_jobs/sustainable-food-systems-feeding-the-world.en|es|fr.json (cmd: node scripts/extract-tts-jobs.js --slugs sustainable-food-systems-feeding-the-world --langs en,es,fr --in data --out data/tts_jobs)
  - [ ] Validate PhaseDNA shape and TTS jobs presence → npm run validate
  - [ ] Ensure day-to-slug resolver loads this lesson in index.html → Update getDNALessonData to include this day or general resolver
  - [ ] Attach minimal avatar cues/moods per phase (optional) → Edit phased JSON: phases[].avatar.cues
  - [ ] Quick review of es/fr clones for obvious issues → data/sustainable-food-systems-feeding-the-world.es|fr.phased.json
  - [ ] Enable prefetch of next-phase TTS during playback → Player optimization (once globally implemented)
  - [ ] QA in index.html: phase texts render, TTS plays, interactions flow → Open index.html?day=281

## Day 282 — Digital Storytelling - Narratives in the Digital Age
- Learning objective: Practice digital narrative while understanding how digital storytelling enables cultural expression, education, and social change.
- Slug: digital-storytelling-narratives-in-the-digital-age
- Files:
  - Normalized: data/digital-storytelling-narratives-in-the-digital-age_normalized.json
  - PhaseDNA: data/digital-storytelling-narratives-in-the-digital-age.en.phased.json, data/digital-storytelling-narratives-in-the-digital-age.es.phased.json, data/digital-storytelling-narratives-in-the-digital-age.fr.phased.json
  - TTS jobs: data/tts_jobs/digital-storytelling-narratives-in-the-digital-age.en.json, data/tts_jobs/digital-storytelling-narratives-in-the-digital-age.es.json, data/tts_jobs/digital-storytelling-narratives-in-the-digital-age.fr.json
- Subtasks:
  - [ ] Author normalized DNA source → data/digital-storytelling-narratives-in-the-digital-age_normalized.json
  - [ ] Generate PhaseDNA v1 (en + clone es/fr) → data/digital-storytelling-narratives-in-the-digital-age.en|es|fr.phased.json (cmd: node scripts/generate-phased-from-normalized.js --input data/digital-storytelling-narratives-in-the-digital-age_normalized.json --outbase data/digital-storytelling-narratives-in-the-digital-age --lang en --clone-es-fr)
  - [ ] Extract TTS jobs (per-phase narration) for en/es/fr → data/tts_jobs/digital-storytelling-narratives-in-the-digital-age.en|es|fr.json (cmd: node scripts/extract-tts-jobs.js --slugs digital-storytelling-narratives-in-the-digital-age --langs en,es,fr --in data --out data/tts_jobs)
  - [ ] Validate PhaseDNA shape and TTS jobs presence → npm run validate
  - [ ] Ensure day-to-slug resolver loads this lesson in index.html → Update getDNALessonData to include this day or general resolver
  - [ ] Attach minimal avatar cues/moods per phase (optional) → Edit phased JSON: phases[].avatar.cues
  - [ ] Quick review of es/fr clones for obvious issues → data/digital-storytelling-narratives-in-the-digital-age.es|fr.phased.json
  - [ ] Enable prefetch of next-phase TTS during playback → Player optimization (once globally implemented)
  - [ ] QA in index.html: phase texts render, TTS plays, interactions flow → Open index.html?day=282

## Day 283 — Sustainable Energy - Powering the Future
- Learning objective: Explore renewable energy while understanding how sustainable energy enables climate action, energy independence, and economic transformation.
- Slug: sustainable-energy-powering-the-future
- Files:
  - Normalized: data/sustainable-energy-powering-the-future_normalized.json
  - PhaseDNA: data/sustainable-energy-powering-the-future.en.phased.json, data/sustainable-energy-powering-the-future.es.phased.json, data/sustainable-energy-powering-the-future.fr.phased.json
  - TTS jobs: data/tts_jobs/sustainable-energy-powering-the-future.en.json, data/tts_jobs/sustainable-energy-powering-the-future.es.json, data/tts_jobs/sustainable-energy-powering-the-future.fr.json
- Subtasks:
  - [ ] Author normalized DNA source → data/sustainable-energy-powering-the-future_normalized.json
  - [ ] Generate PhaseDNA v1 (en + clone es/fr) → data/sustainable-energy-powering-the-future.en|es|fr.phased.json (cmd: node scripts/generate-phased-from-normalized.js --input data/sustainable-energy-powering-the-future_normalized.json --outbase data/sustainable-energy-powering-the-future --lang en --clone-es-fr)
  - [ ] Extract TTS jobs (per-phase narration) for en/es/fr → data/tts_jobs/sustainable-energy-powering-the-future.en|es|fr.json (cmd: node scripts/extract-tts-jobs.js --slugs sustainable-energy-powering-the-future --langs en,es,fr --in data --out data/tts_jobs)
  - [ ] Validate PhaseDNA shape and TTS jobs presence → npm run validate
  - [ ] Ensure day-to-slug resolver loads this lesson in index.html → Update getDNALessonData to include this day or general resolver
  - [ ] Attach minimal avatar cues/moods per phase (optional) → Edit phased JSON: phases[].avatar.cues
  - [ ] Quick review of es/fr clones for obvious issues → data/sustainable-energy-powering-the-future.es|fr.phased.json
  - [ ] Enable prefetch of next-phase TTS during playback → Player optimization (once globally implemented)
  - [ ] QA in index.html: phase texts render, TTS plays, interactions flow → Open index.html?day=283

## Day 284 — Digital Photography - Capturing Light Digitally
- Learning objective: Practice digital imaging while understanding how digital photography enables artistic expression, documentation, and visual communication.
- Slug: digital-photography-capturing-light-digitally
- Files:
  - Normalized: data/digital-photography-capturing-light-digitally_normalized.json
  - PhaseDNA: data/digital-photography-capturing-light-digitally.en.phased.json, data/digital-photography-capturing-light-digitally.es.phased.json, data/digital-photography-capturing-light-digitally.fr.phased.json
  - TTS jobs: data/tts_jobs/digital-photography-capturing-light-digitally.en.json, data/tts_jobs/digital-photography-capturing-light-digitally.es.json, data/tts_jobs/digital-photography-capturing-light-digitally.fr.json
- Subtasks:
  - [ ] Author normalized DNA source → data/digital-photography-capturing-light-digitally_normalized.json
  - [ ] Generate PhaseDNA v1 (en + clone es/fr) → data/digital-photography-capturing-light-digitally.en|es|fr.phased.json (cmd: node scripts/generate-phased-from-normalized.js --input data/digital-photography-capturing-light-digitally_normalized.json --outbase data/digital-photography-capturing-light-digitally --lang en --clone-es-fr)
  - [ ] Extract TTS jobs (per-phase narration) for en/es/fr → data/tts_jobs/digital-photography-capturing-light-digitally.en|es|fr.json (cmd: node scripts/extract-tts-jobs.js --slugs digital-photography-capturing-light-digitally --langs en,es,fr --in data --out data/tts_jobs)
  - [ ] Validate PhaseDNA shape and TTS jobs presence → npm run validate
  - [ ] Ensure day-to-slug resolver loads this lesson in index.html → Update getDNALessonData to include this day or general resolver
  - [ ] Attach minimal avatar cues/moods per phase (optional) → Edit phased JSON: phases[].avatar.cues
  - [ ] Quick review of es/fr clones for obvious issues → data/digital-photography-capturing-light-digitally.es|fr.phased.json
  - [ ] Enable prefetch of next-phase TTS during playback → Player optimization (once globally implemented)
  - [ ] QA in index.html: phase texts render, TTS plays, interactions flow → Open index.html?day=284

## Day 285 — Sustainable Transportation - Moving People and Goods
- Learning objective: Practice transportation planning while understanding how sustainable mobility enables climate action, public health, and urban livability.
- Slug: sustainable-transportation-moving-people-and-goods
- Files:
  - Normalized: data/sustainable-transportation-moving-people-and-goods_normalized.json
  - PhaseDNA: data/sustainable-transportation-moving-people-and-goods.en.phased.json, data/sustainable-transportation-moving-people-and-goods.es.phased.json, data/sustainable-transportation-moving-people-and-goods.fr.phased.json
  - TTS jobs: data/tts_jobs/sustainable-transportation-moving-people-and-goods.en.json, data/tts_jobs/sustainable-transportation-moving-people-and-goods.es.json, data/tts_jobs/sustainable-transportation-moving-people-and-goods.fr.json
- Subtasks:
  - [ ] Author normalized DNA source → data/sustainable-transportation-moving-people-and-goods_normalized.json
  - [ ] Generate PhaseDNA v1 (en + clone es/fr) → data/sustainable-transportation-moving-people-and-goods.en|es|fr.phased.json (cmd: node scripts/generate-phased-from-normalized.js --input data/sustainable-transportation-moving-people-and-goods_normalized.json --outbase data/sustainable-transportation-moving-people-and-goods --lang en --clone-es-fr)
  - [ ] Extract TTS jobs (per-phase narration) for en/es/fr → data/tts_jobs/sustainable-transportation-moving-people-and-goods.en|es|fr.json (cmd: node scripts/extract-tts-jobs.js --slugs sustainable-transportation-moving-people-and-goods --langs en,es,fr --in data --out data/tts_jobs)
  - [ ] Validate PhaseDNA shape and TTS jobs presence → npm run validate
  - [ ] Ensure day-to-slug resolver loads this lesson in index.html → Update getDNALessonData to include this day or general resolver
  - [ ] Attach minimal avatar cues/moods per phase (optional) → Edit phased JSON: phases[].avatar.cues
  - [ ] Quick review of es/fr clones for obvious issues → data/sustainable-transportation-moving-people-and-goods.es|fr.phased.json
  - [ ] Enable prefetch of next-phase TTS during playback → Player optimization (once globally implemented)
  - [ ] QA in index.html: phase texts render, TTS plays, interactions flow → Open index.html?day=285

## Day 286 — Digital Design - Creating in the Digital Age
- Learning objective: Practice digital creation while understanding how digital design enables user experience, visual communication, and interactive media.
- Slug: digital-design-creating-in-the-digital-age
- Files:
  - Normalized: data/digital-design-creating-in-the-digital-age_normalized.json
  - PhaseDNA: data/digital-design-creating-in-the-digital-age.en.phased.json, data/digital-design-creating-in-the-digital-age.es.phased.json, data/digital-design-creating-in-the-digital-age.fr.phased.json
  - TTS jobs: data/tts_jobs/digital-design-creating-in-the-digital-age.en.json, data/tts_jobs/digital-design-creating-in-the-digital-age.es.json, data/tts_jobs/digital-design-creating-in-the-digital-age.fr.json
- Subtasks:
  - [ ] Author normalized DNA source → data/digital-design-creating-in-the-digital-age_normalized.json
  - [ ] Generate PhaseDNA v1 (en + clone es/fr) → data/digital-design-creating-in-the-digital-age.en|es|fr.phased.json (cmd: node scripts/generate-phased-from-normalized.js --input data/digital-design-creating-in-the-digital-age_normalized.json --outbase data/digital-design-creating-in-the-digital-age --lang en --clone-es-fr)
  - [ ] Extract TTS jobs (per-phase narration) for en/es/fr → data/tts_jobs/digital-design-creating-in-the-digital-age.en|es|fr.json (cmd: node scripts/extract-tts-jobs.js --slugs digital-design-creating-in-the-digital-age --langs en,es,fr --in data --out data/tts_jobs)
  - [ ] Validate PhaseDNA shape and TTS jobs presence → npm run validate
  - [ ] Ensure day-to-slug resolver loads this lesson in index.html → Update getDNALessonData to include this day or general resolver
  - [ ] Attach minimal avatar cues/moods per phase (optional) → Edit phased JSON: phases[].avatar.cues
  - [ ] Quick review of es/fr clones for obvious issues → data/digital-design-creating-in-the-digital-age.es|fr.phased.json
  - [ ] Enable prefetch of next-phase TTS during playback → Player optimization (once globally implemented)
  - [ ] QA in index.html: phase texts render, TTS plays, interactions flow → Open index.html?day=286

## Day 287 — Sustainable Cities - Urban Living for the Future
- Learning objective: Practice urban planning while understanding how sustainable cities enable quality of life, environmental protection, and social equity.
- Slug: sustainable-cities-urban-living-for-the-future
- Files:
  - Normalized: data/sustainable-cities-urban-living-for-the-future_normalized.json
  - PhaseDNA: data/sustainable-cities-urban-living-for-the-future.en.phased.json, data/sustainable-cities-urban-living-for-the-future.es.phased.json, data/sustainable-cities-urban-living-for-the-future.fr.phased.json
  - TTS jobs: data/tts_jobs/sustainable-cities-urban-living-for-the-future.en.json, data/tts_jobs/sustainable-cities-urban-living-for-the-future.es.json, data/tts_jobs/sustainable-cities-urban-living-for-the-future.fr.json
- Subtasks:
  - [ ] Author normalized DNA source → data/sustainable-cities-urban-living-for-the-future_normalized.json
  - [ ] Generate PhaseDNA v1 (en + clone es/fr) → data/sustainable-cities-urban-living-for-the-future.en|es|fr.phased.json (cmd: node scripts/generate-phased-from-normalized.js --input data/sustainable-cities-urban-living-for-the-future_normalized.json --outbase data/sustainable-cities-urban-living-for-the-future --lang en --clone-es-fr)
  - [ ] Extract TTS jobs (per-phase narration) for en/es/fr → data/tts_jobs/sustainable-cities-urban-living-for-the-future.en|es|fr.json (cmd: node scripts/extract-tts-jobs.js --slugs sustainable-cities-urban-living-for-the-future --langs en,es,fr --in data --out data/tts_jobs)
  - [ ] Validate PhaseDNA shape and TTS jobs presence → npm run validate
  - [ ] Ensure day-to-slug resolver loads this lesson in index.html → Update getDNALessonData to include this day or general resolver
  - [ ] Attach minimal avatar cues/moods per phase (optional) → Edit phased JSON: phases[].avatar.cues
  - [ ] Quick review of es/fr clones for obvious issues → data/sustainable-cities-urban-living-for-the-future.es|fr.phased.json
  - [ ] Enable prefetch of next-phase TTS during playback → Player optimization (once globally implemented)
  - [ ] QA in index.html: phase texts render, TTS plays, interactions flow → Open index.html?day=287

## Day 288 — Digital Marketing - Connecting in the Digital Age
- Learning objective: Practice digital communication while understanding how digital marketing enables business growth, customer engagement, and brand building.
- Slug: digital-marketing-connecting-in-the-digital-age
- Files:
  - Normalized: data/digital-marketing-connecting-in-the-digital-age_normalized.json
  - PhaseDNA: data/digital-marketing-connecting-in-the-digital-age.en.phased.json, data/digital-marketing-connecting-in-the-digital-age.es.phased.json, data/digital-marketing-connecting-in-the-digital-age.fr.phased.json
  - TTS jobs: data/tts_jobs/digital-marketing-connecting-in-the-digital-age.en.json, data/tts_jobs/digital-marketing-connecting-in-the-digital-age.es.json, data/tts_jobs/digital-marketing-connecting-in-the-digital-age.fr.json
- Subtasks:
  - [ ] Author normalized DNA source → data/digital-marketing-connecting-in-the-digital-age_normalized.json
  - [ ] Generate PhaseDNA v1 (en + clone es/fr) → data/digital-marketing-connecting-in-the-digital-age.en|es|fr.phased.json (cmd: node scripts/generate-phased-from-normalized.js --input data/digital-marketing-connecting-in-the-digital-age_normalized.json --outbase data/digital-marketing-connecting-in-the-digital-age --lang en --clone-es-fr)
  - [ ] Extract TTS jobs (per-phase narration) for en/es/fr → data/tts_jobs/digital-marketing-connecting-in-the-digital-age.en|es|fr.json (cmd: node scripts/extract-tts-jobs.js --slugs digital-marketing-connecting-in-the-digital-age --langs en,es,fr --in data --out data/tts_jobs)
  - [ ] Validate PhaseDNA shape and TTS jobs presence → npm run validate
  - [ ] Ensure day-to-slug resolver loads this lesson in index.html → Update getDNALessonData to include this day or general resolver
  - [ ] Attach minimal avatar cues/moods per phase (optional) → Edit phased JSON: phases[].avatar.cues
  - [ ] Quick review of es/fr clones for obvious issues → data/digital-marketing-connecting-in-the-digital-age.es|fr.phased.json
  - [ ] Enable prefetch of next-phase TTS during playback → Player optimization (once globally implemented)
  - [ ] QA in index.html: phase texts render, TTS plays, interactions flow → Open index.html?day=288

## Day 289 — Sustainable Business - Profit with Purpose
- Learning objective: Practice ethical business while understanding how sustainable business enables environmental protection, social equity, and long-term value creation.
- Slug: sustainable-business-profit-with-purpose
- Files:
  - Normalized: data/sustainable-business-profit-with-purpose_normalized.json
  - PhaseDNA: data/sustainable-business-profit-with-purpose.en.phased.json, data/sustainable-business-profit-with-purpose.es.phased.json, data/sustainable-business-profit-with-purpose.fr.phased.json
  - TTS jobs: data/tts_jobs/sustainable-business-profit-with-purpose.en.json, data/tts_jobs/sustainable-business-profit-with-purpose.es.json, data/tts_jobs/sustainable-business-profit-with-purpose.fr.json
- Subtasks:
  - [ ] Author normalized DNA source → data/sustainable-business-profit-with-purpose_normalized.json
  - [ ] Generate PhaseDNA v1 (en + clone es/fr) → data/sustainable-business-profit-with-purpose.en|es|fr.phased.json (cmd: node scripts/generate-phased-from-normalized.js --input data/sustainable-business-profit-with-purpose_normalized.json --outbase data/sustainable-business-profit-with-purpose --lang en --clone-es-fr)
  - [ ] Extract TTS jobs (per-phase narration) for en/es/fr → data/tts_jobs/sustainable-business-profit-with-purpose.en|es|fr.json (cmd: node scripts/extract-tts-jobs.js --slugs sustainable-business-profit-with-purpose --langs en,es,fr --in data --out data/tts_jobs)
  - [ ] Validate PhaseDNA shape and TTS jobs presence → npm run validate
  - [ ] Ensure day-to-slug resolver loads this lesson in index.html → Update getDNALessonData to include this day or general resolver
  - [ ] Attach minimal avatar cues/moods per phase (optional) → Edit phased JSON: phases[].avatar.cues
  - [ ] Quick review of es/fr clones for obvious issues → data/sustainable-business-profit-with-purpose.es|fr.phased.json
  - [ ] Enable prefetch of next-phase TTS during playback → Player optimization (once globally implemented)
  - [ ] QA in index.html: phase texts render, TTS plays, interactions flow → Open index.html?day=289

## Day 290 — Digital Journalism - News in the Digital Age
- Learning objective: Practice digital reporting while understanding how digital journalism enables information sharing, public accountability, and democratic discourse.
- Slug: digital-journalism-news-in-the-digital-age
- Files:
  - Normalized: data/digital-journalism-news-in-the-digital-age_normalized.json
  - PhaseDNA: data/digital-journalism-news-in-the-digital-age.en.phased.json, data/digital-journalism-news-in-the-digital-age.es.phased.json, data/digital-journalism-news-in-the-digital-age.fr.phased.json
  - TTS jobs: data/tts_jobs/digital-journalism-news-in-the-digital-age.en.json, data/tts_jobs/digital-journalism-news-in-the-digital-age.es.json, data/tts_jobs/digital-journalism-news-in-the-digital-age.fr.json
- Subtasks:
  - [ ] Author normalized DNA source → data/digital-journalism-news-in-the-digital-age_normalized.json
  - [ ] Generate PhaseDNA v1 (en + clone es/fr) → data/digital-journalism-news-in-the-digital-age.en|es|fr.phased.json (cmd: node scripts/generate-phased-from-normalized.js --input data/digital-journalism-news-in-the-digital-age_normalized.json --outbase data/digital-journalism-news-in-the-digital-age --lang en --clone-es-fr)
  - [ ] Extract TTS jobs (per-phase narration) for en/es/fr → data/tts_jobs/digital-journalism-news-in-the-digital-age.en|es|fr.json (cmd: node scripts/extract-tts-jobs.js --slugs digital-journalism-news-in-the-digital-age --langs en,es,fr --in data --out data/tts_jobs)
  - [ ] Validate PhaseDNA shape and TTS jobs presence → npm run validate
  - [ ] Ensure day-to-slug resolver loads this lesson in index.html → Update getDNALessonData to include this day or general resolver
  - [ ] Attach minimal avatar cues/moods per phase (optional) → Edit phased JSON: phases[].avatar.cues
  - [ ] Quick review of es/fr clones for obvious issues → data/digital-journalism-news-in-the-digital-age.es|fr.phased.json
  - [ ] Enable prefetch of next-phase TTS during playback → Player optimization (once globally implemented)
  - [ ] QA in index.html: phase texts render, TTS plays, interactions flow → Open index.html?day=290

## Day 291 — Sustainable Development - Meeting Today's Needs
- Learning objective: Practice development thinking while understanding how sustainable development enables human flourishing, environmental protection, and social equity.
- Slug: sustainable-development-meeting-todays-needs
- Files:
  - Normalized: data/sustainable-development-meeting-todays-needs_normalized.json
  - PhaseDNA: data/sustainable-development-meeting-todays-needs.en.phased.json, data/sustainable-development-meeting-todays-needs.es.phased.json, data/sustainable-development-meeting-todays-needs.fr.phased.json
  - TTS jobs: data/tts_jobs/sustainable-development-meeting-todays-needs.en.json, data/tts_jobs/sustainable-development-meeting-todays-needs.es.json, data/tts_jobs/sustainable-development-meeting-todays-needs.fr.json
- Subtasks:
  - [ ] Author normalized DNA source → data/sustainable-development-meeting-todays-needs_normalized.json
  - [ ] Generate PhaseDNA v1 (en + clone es/fr) → data/sustainable-development-meeting-todays-needs.en|es|fr.phased.json (cmd: node scripts/generate-phased-from-normalized.js --input data/sustainable-development-meeting-todays-needs_normalized.json --outbase data/sustainable-development-meeting-todays-needs --lang en --clone-es-fr)
  - [ ] Extract TTS jobs (per-phase narration) for en/es/fr → data/tts_jobs/sustainable-development-meeting-todays-needs.en|es|fr.json (cmd: node scripts/extract-tts-jobs.js --slugs sustainable-development-meeting-todays-needs --langs en,es,fr --in data --out data/tts_jobs)
  - [ ] Validate PhaseDNA shape and TTS jobs presence → npm run validate
  - [ ] Ensure day-to-slug resolver loads this lesson in index.html → Update getDNALessonData to include this day or general resolver
  - [ ] Attach minimal avatar cues/moods per phase (optional) → Edit phased JSON: phases[].avatar.cues
  - [ ] Quick review of es/fr clones for obvious issues → data/sustainable-development-meeting-todays-needs.es|fr.phased.json
  - [ ] Enable prefetch of next-phase TTS during playback → Player optimization (once globally implemented)
  - [ ] QA in index.html: phase texts render, TTS plays, interactions flow → Open index.html?day=291

## Day 292 — Digital Ethics - Values in the Digital Age
- Learning objective: Practice ethical technology while understanding how digital ethics enables responsible innovation, privacy protection, and democratic values.
- Slug: digital-ethics-values-in-the-digital-age
- Files:
  - Normalized: data/digital-ethics-values-in-the-digital-age_normalized.json
  - PhaseDNA: data/digital-ethics-values-in-the-digital-age.en.phased.json, data/digital-ethics-values-in-the-digital-age.es.phased.json, data/digital-ethics-values-in-the-digital-age.fr.phased.json
  - TTS jobs: data/tts_jobs/digital-ethics-values-in-the-digital-age.en.json, data/tts_jobs/digital-ethics-values-in-the-digital-age.es.json, data/tts_jobs/digital-ethics-values-in-the-digital-age.fr.json
- Subtasks:
  - [ ] Author normalized DNA source → data/digital-ethics-values-in-the-digital-age_normalized.json
  - [ ] Generate PhaseDNA v1 (en + clone es/fr) → data/digital-ethics-values-in-the-digital-age.en|es|fr.phased.json (cmd: node scripts/generate-phased-from-normalized.js --input data/digital-ethics-values-in-the-digital-age_normalized.json --outbase data/digital-ethics-values-in-the-digital-age --lang en --clone-es-fr)
  - [ ] Extract TTS jobs (per-phase narration) for en/es/fr → data/tts_jobs/digital-ethics-values-in-the-digital-age.en|es|fr.json (cmd: node scripts/extract-tts-jobs.js --slugs digital-ethics-values-in-the-digital-age --langs en,es,fr --in data --out data/tts_jobs)
  - [ ] Validate PhaseDNA shape and TTS jobs presence → npm run validate
  - [ ] Ensure day-to-slug resolver loads this lesson in index.html → Update getDNALessonData to include this day or general resolver
  - [ ] Attach minimal avatar cues/moods per phase (optional) → Edit phased JSON: phases[].avatar.cues
  - [ ] Quick review of es/fr clones for obvious issues → data/digital-ethics-values-in-the-digital-age.es|fr.phased.json
  - [ ] Enable prefetch of next-phase TTS during playback → Player optimization (once globally implemented)
  - [ ] QA in index.html: phase texts render, TTS plays, interactions flow → Open index.html?day=292

## Day 293 — Sustainable Innovation - Creating Without Destroying
- Learning objective: Practice sustainable design thinking while understanding how environmental considerations must guide technological development and economic systems.
- Slug: sustainable-innovation-creating-without-destroying
- Files:
  - Normalized: data/sustainable-innovation-creating-without-destroying_normalized.json
  - PhaseDNA: data/sustainable-innovation-creating-without-destroying.en.phased.json, data/sustainable-innovation-creating-without-destroying.es.phased.json, data/sustainable-innovation-creating-without-destroying.fr.phased.json
  - TTS jobs: data/tts_jobs/sustainable-innovation-creating-without-destroying.en.json, data/tts_jobs/sustainable-innovation-creating-without-destroying.es.json, data/tts_jobs/sustainable-innovation-creating-without-destroying.fr.json
- Subtasks:
  - [ ] Author normalized DNA source → data/sustainable-innovation-creating-without-destroying_normalized.json
  - [ ] Generate PhaseDNA v1 (en + clone es/fr) → data/sustainable-innovation-creating-without-destroying.en|es|fr.phased.json (cmd: node scripts/generate-phased-from-normalized.js --input data/sustainable-innovation-creating-without-destroying_normalized.json --outbase data/sustainable-innovation-creating-without-destroying --lang en --clone-es-fr)
  - [ ] Extract TTS jobs (per-phase narration) for en/es/fr → data/tts_jobs/sustainable-innovation-creating-without-destroying.en|es|fr.json (cmd: node scripts/extract-tts-jobs.js --slugs sustainable-innovation-creating-without-destroying --langs en,es,fr --in data --out data/tts_jobs)
  - [ ] Validate PhaseDNA shape and TTS jobs presence → npm run validate
  - [ ] Ensure day-to-slug resolver loads this lesson in index.html → Update getDNALessonData to include this day or general resolver
  - [ ] Attach minimal avatar cues/moods per phase (optional) → Edit phased JSON: phases[].avatar.cues
  - [ ] Quick review of es/fr clones for obvious issues → data/sustainable-innovation-creating-without-destroying.es|fr.phased.json
  - [ ] Enable prefetch of next-phase TTS during playback → Player optimization (once globally implemented)
  - [ ] QA in index.html: phase texts render, TTS plays, interactions flow → Open index.html?day=293

## Day 294 — Digital Literacy - Navigating the Information Age
- Learning objective: Practice critical thinking while understanding how digital literacy enables informed citizenship, media literacy, and online safety.
- Slug: digital-literacy-navigating-the-information-age
- Files:
  - Normalized: data/digital-literacy-navigating-the-information-age_normalized.json
  - PhaseDNA: data/digital-literacy-navigating-the-information-age.en.phased.json, data/digital-literacy-navigating-the-information-age.es.phased.json, data/digital-literacy-navigating-the-information-age.fr.phased.json
  - TTS jobs: data/tts_jobs/digital-literacy-navigating-the-information-age.en.json, data/tts_jobs/digital-literacy-navigating-the-information-age.es.json, data/tts_jobs/digital-literacy-navigating-the-information-age.fr.json
- Subtasks:
  - [ ] Author normalized DNA source → data/digital-literacy-navigating-the-information-age_normalized.json
  - [ ] Generate PhaseDNA v1 (en + clone es/fr) → data/digital-literacy-navigating-the-information-age.en|es|fr.phased.json (cmd: node scripts/generate-phased-from-normalized.js --input data/digital-literacy-navigating-the-information-age_normalized.json --outbase data/digital-literacy-navigating-the-information-age --lang en --clone-es-fr)
  - [ ] Extract TTS jobs (per-phase narration) for en/es/fr → data/tts_jobs/digital-literacy-navigating-the-information-age.en|es|fr.json (cmd: node scripts/extract-tts-jobs.js --slugs digital-literacy-navigating-the-information-age --langs en,es,fr --in data --out data/tts_jobs)
  - [ ] Validate PhaseDNA shape and TTS jobs presence → npm run validate
  - [ ] Ensure day-to-slug resolver loads this lesson in index.html → Update getDNALessonData to include this day or general resolver
  - [ ] Attach minimal avatar cues/moods per phase (optional) → Edit phased JSON: phases[].avatar.cues
  - [ ] Quick review of es/fr clones for obvious issues → data/digital-literacy-navigating-the-information-age.es|fr.phased.json
  - [ ] Enable prefetch of next-phase TTS during playback → Player optimization (once globally implemented)
  - [ ] QA in index.html: phase texts render, TTS plays, interactions flow → Open index.html?day=294

## Day 295 — Sustainable Finance - Money for a Better World
- Learning objective: Practice ethical finance while understanding how sustainable finance enables climate action, social equity, and democratic economic systems.
- Slug: sustainable-finance-money-for-a-better-world
- Files:
  - Normalized: data/sustainable-finance-money-for-a-better-world_normalized.json
  - PhaseDNA: data/sustainable-finance-money-for-a-better-world.en.phased.json, data/sustainable-finance-money-for-a-better-world.es.phased.json, data/sustainable-finance-money-for-a-better-world.fr.phased.json
  - TTS jobs: data/tts_jobs/sustainable-finance-money-for-a-better-world.en.json, data/tts_jobs/sustainable-finance-money-for-a-better-world.es.json, data/tts_jobs/sustainable-finance-money-for-a-better-world.fr.json
- Subtasks:
  - [ ] Author normalized DNA source → data/sustainable-finance-money-for-a-better-world_normalized.json
  - [ ] Generate PhaseDNA v1 (en + clone es/fr) → data/sustainable-finance-money-for-a-better-world.en|es|fr.phased.json (cmd: node scripts/generate-phased-from-normalized.js --input data/sustainable-finance-money-for-a-better-world_normalized.json --outbase data/sustainable-finance-money-for-a-better-world --lang en --clone-es-fr)
  - [ ] Extract TTS jobs (per-phase narration) for en/es/fr → data/tts_jobs/sustainable-finance-money-for-a-better-world.en|es|fr.json (cmd: node scripts/extract-tts-jobs.js --slugs sustainable-finance-money-for-a-better-world --langs en,es,fr --in data --out data/tts_jobs)
  - [ ] Validate PhaseDNA shape and TTS jobs presence → npm run validate
  - [ ] Ensure day-to-slug resolver loads this lesson in index.html → Update getDNALessonData to include this day or general resolver
  - [ ] Attach minimal avatar cues/moods per phase (optional) → Edit phased JSON: phases[].avatar.cues
  - [ ] Quick review of es/fr clones for obvious issues → data/sustainable-finance-money-for-a-better-world.es|fr.phased.json
  - [ ] Enable prefetch of next-phase TTS during playback → Player optimization (once globally implemented)
  - [ ] QA in index.html: phase texts render, TTS plays, interactions flow → Open index.html?day=295

## Day 296 — Digital Transformation - Technology and Organizational Change
- Learning objective: Understand organizational change while exploring how digital transformation affects work, leadership, and organizational culture.
- Slug: digital-transformation-technology-and-organizational-change
- Files:
  - Normalized: data/digital-transformation-technology-and-organizational-change_normalized.json
  - PhaseDNA: data/digital-transformation-technology-and-organizational-change.en.phased.json, data/digital-transformation-technology-and-organizational-change.es.phased.json, data/digital-transformation-technology-and-organizational-change.fr.phased.json
  - TTS jobs: data/tts_jobs/digital-transformation-technology-and-organizational-change.en.json, data/tts_jobs/digital-transformation-technology-and-organizational-change.es.json, data/tts_jobs/digital-transformation-technology-and-organizational-change.fr.json
- Subtasks:
  - [ ] Author normalized DNA source → data/digital-transformation-technology-and-organizational-change_normalized.json
  - [ ] Generate PhaseDNA v1 (en + clone es/fr) → data/digital-transformation-technology-and-organizational-change.en|es|fr.phased.json (cmd: node scripts/generate-phased-from-normalized.js --input data/digital-transformation-technology-and-organizational-change_normalized.json --outbase data/digital-transformation-technology-and-organizational-change --lang en --clone-es-fr)
  - [ ] Extract TTS jobs (per-phase narration) for en/es/fr → data/tts_jobs/digital-transformation-technology-and-organizational-change.en|es|fr.json (cmd: node scripts/extract-tts-jobs.js --slugs digital-transformation-technology-and-organizational-change --langs en,es,fr --in data --out data/tts_jobs)
  - [ ] Validate PhaseDNA shape and TTS jobs presence → npm run validate
  - [ ] Ensure day-to-slug resolver loads this lesson in index.html → Update getDNALessonData to include this day or general resolver
  - [ ] Attach minimal avatar cues/moods per phase (optional) → Edit phased JSON: phases[].avatar.cues
  - [ ] Quick review of es/fr clones for obvious issues → data/digital-transformation-technology-and-organizational-change.es|fr.phased.json
  - [ ] Enable prefetch of next-phase TTS during playback → Player optimization (once globally implemented)
  - [ ] QA in index.html: phase texts render, TTS plays, interactions flow → Open index.html?day=296

## Day 297 — Sustainable Tourism - Traveling Responsibly
- Learning objective: Practice responsible travel while understanding how sustainable tourism enables cultural preservation, environmental protection, and local development.
- Slug: sustainable-tourism-traveling-responsibly
- Files:
  - Normalized: data/sustainable-tourism-traveling-responsibly_normalized.json
  - PhaseDNA: data/sustainable-tourism-traveling-responsibly.en.phased.json, data/sustainable-tourism-traveling-responsibly.es.phased.json, data/sustainable-tourism-traveling-responsibly.fr.phased.json
  - TTS jobs: data/tts_jobs/sustainable-tourism-traveling-responsibly.en.json, data/tts_jobs/sustainable-tourism-traveling-responsibly.es.json, data/tts_jobs/sustainable-tourism-traveling-responsibly.fr.json
- Subtasks:
  - [ ] Author normalized DNA source → data/sustainable-tourism-traveling-responsibly_normalized.json
  - [ ] Generate PhaseDNA v1 (en + clone es/fr) → data/sustainable-tourism-traveling-responsibly.en|es|fr.phased.json (cmd: node scripts/generate-phased-from-normalized.js --input data/sustainable-tourism-traveling-responsibly_normalized.json --outbase data/sustainable-tourism-traveling-responsibly --lang en --clone-es-fr)
  - [ ] Extract TTS jobs (per-phase narration) for en/es/fr → data/tts_jobs/sustainable-tourism-traveling-responsibly.en|es|fr.json (cmd: node scripts/extract-tts-jobs.js --slugs sustainable-tourism-traveling-responsibly --langs en,es,fr --in data --out data/tts_jobs)
  - [ ] Validate PhaseDNA shape and TTS jobs presence → npm run validate
  - [ ] Ensure day-to-slug resolver loads this lesson in index.html → Update getDNALessonData to include this day or general resolver
  - [ ] Attach minimal avatar cues/moods per phase (optional) → Edit phased JSON: phases[].avatar.cues
  - [ ] Quick review of es/fr clones for obvious issues → data/sustainable-tourism-traveling-responsibly.es|fr.phased.json
  - [ ] Enable prefetch of next-phase TTS during playback → Player optimization (once globally implemented)
  - [ ] QA in index.html: phase texts render, TTS plays, interactions flow → Open index.html?day=297

## Day 298 — Digital Art - Creativity in the Digital Age
- Learning objective: Practice digital creativity while understanding how digital art enables new forms of expression, cultural exchange, and artistic innovation.
- Slug: digital-art-creativity-in-the-digital-age
- Files:
  - Normalized: data/digital-art-creativity-in-the-digital-age_normalized.json
  - PhaseDNA: data/digital-art-creativity-in-the-digital-age.en.phased.json, data/digital-art-creativity-in-the-digital-age.es.phased.json, data/digital-art-creativity-in-the-digital-age.fr.phased.json
  - TTS jobs: data/tts_jobs/digital-art-creativity-in-the-digital-age.en.json, data/tts_jobs/digital-art-creativity-in-the-digital-age.es.json, data/tts_jobs/digital-art-creativity-in-the-digital-age.fr.json
- Subtasks:
  - [ ] Author normalized DNA source → data/digital-art-creativity-in-the-digital-age_normalized.json
  - [ ] Generate PhaseDNA v1 (en + clone es/fr) → data/digital-art-creativity-in-the-digital-age.en|es|fr.phased.json (cmd: node scripts/generate-phased-from-normalized.js --input data/digital-art-creativity-in-the-digital-age_normalized.json --outbase data/digital-art-creativity-in-the-digital-age --lang en --clone-es-fr)
  - [ ] Extract TTS jobs (per-phase narration) for en/es/fr → data/tts_jobs/digital-art-creativity-in-the-digital-age.en|es|fr.json (cmd: node scripts/extract-tts-jobs.js --slugs digital-art-creativity-in-the-digital-age --langs en,es,fr --in data --out data/tts_jobs)
  - [ ] Validate PhaseDNA shape and TTS jobs presence → npm run validate
  - [ ] Ensure day-to-slug resolver loads this lesson in index.html → Update getDNALessonData to include this day or general resolver
  - [ ] Attach minimal avatar cues/moods per phase (optional) → Edit phased JSON: phases[].avatar.cues
  - [ ] Quick review of es/fr clones for obvious issues → data/digital-art-creativity-in-the-digital-age.es|fr.phased.json
  - [ ] Enable prefetch of next-phase TTS during playback → Player optimization (once globally implemented)
  - [ ] QA in index.html: phase texts render, TTS plays, interactions flow → Open index.html?day=298

## Day 299 — Sustainable Fashion - Style with a Conscience
- Learning objective: Practice ethical fashion while understanding how sustainable fashion enables environmental protection, fair labor, and circular economy principles.
- Slug: sustainable-fashion-style-with-a-conscience
- Files:
  - Normalized: data/sustainable-fashion-style-with-a-conscience_normalized.json
  - PhaseDNA: data/sustainable-fashion-style-with-a-conscience.en.phased.json, data/sustainable-fashion-style-with-a-conscience.es.phased.json, data/sustainable-fashion-style-with-a-conscience.fr.phased.json
  - TTS jobs: data/tts_jobs/sustainable-fashion-style-with-a-conscience.en.json, data/tts_jobs/sustainable-fashion-style-with-a-conscience.es.json, data/tts_jobs/sustainable-fashion-style-with-a-conscience.fr.json
- Subtasks:
  - [ ] Author normalized DNA source → data/sustainable-fashion-style-with-a-conscience_normalized.json
  - [ ] Generate PhaseDNA v1 (en + clone es/fr) → data/sustainable-fashion-style-with-a-conscience.en|es|fr.phased.json (cmd: node scripts/generate-phased-from-normalized.js --input data/sustainable-fashion-style-with-a-conscience_normalized.json --outbase data/sustainable-fashion-style-with-a-conscience --lang en --clone-es-fr)
  - [ ] Extract TTS jobs (per-phase narration) for en/es/fr → data/tts_jobs/sustainable-fashion-style-with-a-conscience.en|es|fr.json (cmd: node scripts/extract-tts-jobs.js --slugs sustainable-fashion-style-with-a-conscience --langs en,es,fr --in data --out data/tts_jobs)
  - [ ] Validate PhaseDNA shape and TTS jobs presence → npm run validate
  - [ ] Ensure day-to-slug resolver loads this lesson in index.html → Update getDNALessonData to include this day or general resolver
  - [ ] Attach minimal avatar cues/moods per phase (optional) → Edit phased JSON: phases[].avatar.cues
  - [ ] Quick review of es/fr clones for obvious issues → data/sustainable-fashion-style-with-a-conscience.es|fr.phased.json
  - [ ] Enable prefetch of next-phase TTS during playback → Player optimization (once globally implemented)
  - [ ] QA in index.html: phase texts render, TTS plays, interactions flow → Open index.html?day=299

## Day 300 — Digital Archaeology - Technology and the Past
- Learning objective: Explore archaeological technology while understanding how digital archaeology enables cultural preservation, scientific discovery, and public education.
- Slug: digital-archaeology-technology-and-the-past
- Files:
  - Normalized: data/digital-archaeology-technology-and-the-past_normalized.json
  - PhaseDNA: data/digital-archaeology-technology-and-the-past.en.phased.json, data/digital-archaeology-technology-and-the-past.es.phased.json, data/digital-archaeology-technology-and-the-past.fr.phased.json
  - TTS jobs: data/tts_jobs/digital-archaeology-technology-and-the-past.en.json, data/tts_jobs/digital-archaeology-technology-and-the-past.es.json, data/tts_jobs/digital-archaeology-technology-and-the-past.fr.json
- Subtasks:
  - [ ] Author normalized DNA source → data/digital-archaeology-technology-and-the-past_normalized.json
  - [ ] Generate PhaseDNA v1 (en + clone es/fr) → data/digital-archaeology-technology-and-the-past.en|es|fr.phased.json (cmd: node scripts/generate-phased-from-normalized.js --input data/digital-archaeology-technology-and-the-past_normalized.json --outbase data/digital-archaeology-technology-and-the-past --lang en --clone-es-fr)
  - [ ] Extract TTS jobs (per-phase narration) for en/es/fr → data/tts_jobs/digital-archaeology-technology-and-the-past.en|es|fr.json (cmd: node scripts/extract-tts-jobs.js --slugs digital-archaeology-technology-and-the-past --langs en,es,fr --in data --out data/tts_jobs)
  - [ ] Validate PhaseDNA shape and TTS jobs presence → npm run validate
  - [ ] Ensure day-to-slug resolver loads this lesson in index.html → Update getDNALessonData to include this day or general resolver
  - [ ] Attach minimal avatar cues/moods per phase (optional) → Edit phased JSON: phases[].avatar.cues
  - [ ] Quick review of es/fr clones for obvious issues → data/digital-archaeology-technology-and-the-past.es|fr.phased.json
  - [ ] Enable prefetch of next-phase TTS during playback → Player optimization (once globally implemented)
  - [ ] QA in index.html: phase texts render, TTS plays, interactions flow → Open index.html?day=300

## Day 301 — Sustainable Architecture - Building for the Future
- Learning objective: Practice green building while understanding how sustainable architecture enables energy efficiency, environmental protection, and healthy living spaces.
- Slug: sustainable-architecture-building-for-the-future
- Files:
  - Normalized: data/sustainable-architecture-building-for-the-future_normalized.json
  - PhaseDNA: data/sustainable-architecture-building-for-the-future.en.phased.json, data/sustainable-architecture-building-for-the-future.es.phased.json, data/sustainable-architecture-building-for-the-future.fr.phased.json
  - TTS jobs: data/tts_jobs/sustainable-architecture-building-for-the-future.en.json, data/tts_jobs/sustainable-architecture-building-for-the-future.es.json, data/tts_jobs/sustainable-architecture-building-for-the-future.fr.json
- Subtasks:
  - [ ] Author normalized DNA source → data/sustainable-architecture-building-for-the-future_normalized.json
  - [ ] Generate PhaseDNA v1 (en + clone es/fr) → data/sustainable-architecture-building-for-the-future.en|es|fr.phased.json (cmd: node scripts/generate-phased-from-normalized.js --input data/sustainable-architecture-building-for-the-future_normalized.json --outbase data/sustainable-architecture-building-for-the-future --lang en --clone-es-fr)
  - [ ] Extract TTS jobs (per-phase narration) for en/es/fr → data/tts_jobs/sustainable-architecture-building-for-the-future.en|es|fr.json (cmd: node scripts/extract-tts-jobs.js --slugs sustainable-architecture-building-for-the-future --langs en,es,fr --in data --out data/tts_jobs)
  - [ ] Validate PhaseDNA shape and TTS jobs presence → npm run validate
  - [ ] Ensure day-to-slug resolver loads this lesson in index.html → Update getDNALessonData to include this day or general resolver
  - [ ] Attach minimal avatar cues/moods per phase (optional) → Edit phased JSON: phases[].avatar.cues
  - [ ] Quick review of es/fr clones for obvious issues → data/sustainable-architecture-building-for-the-future.es|fr.phased.json
  - [ ] Enable prefetch of next-phase TTS during playback → Player optimization (once globally implemented)
  - [ ] QA in index.html: phase texts render, TTS plays, interactions flow → Open index.html?day=301

## Day 302 — Digital Music - Sound in the Digital Age
- Learning objective: Explore digital audio while understanding how digital music enables new forms of expression, global collaboration, and musical innovation.
- Slug: digital-music-sound-in-the-digital-age
- Files:
  - Normalized: data/digital-music-sound-in-the-digital-age_normalized.json
  - PhaseDNA: data/digital-music-sound-in-the-digital-age.en.phased.json, data/digital-music-sound-in-the-digital-age.es.phased.json, data/digital-music-sound-in-the-digital-age.fr.phased.json
  - TTS jobs: data/tts_jobs/digital-music-sound-in-the-digital-age.en.json, data/tts_jobs/digital-music-sound-in-the-digital-age.es.json, data/tts_jobs/digital-music-sound-in-the-digital-age.fr.json
- Subtasks:
  - [ ] Author normalized DNA source → data/digital-music-sound-in-the-digital-age_normalized.json
  - [ ] Generate PhaseDNA v1 (en + clone es/fr) → data/digital-music-sound-in-the-digital-age.en|es|fr.phased.json (cmd: node scripts/generate-phased-from-normalized.js --input data/digital-music-sound-in-the-digital-age_normalized.json --outbase data/digital-music-sound-in-the-digital-age --lang en --clone-es-fr)
  - [ ] Extract TTS jobs (per-phase narration) for en/es/fr → data/tts_jobs/digital-music-sound-in-the-digital-age.en|es|fr.json (cmd: node scripts/extract-tts-jobs.js --slugs digital-music-sound-in-the-digital-age --langs en,es,fr --in data --out data/tts_jobs)
  - [ ] Validate PhaseDNA shape and TTS jobs presence → npm run validate
  - [ ] Ensure day-to-slug resolver loads this lesson in index.html → Update getDNALessonData to include this day or general resolver
  - [ ] Attach minimal avatar cues/moods per phase (optional) → Edit phased JSON: phases[].avatar.cues
  - [ ] Quick review of es/fr clones for obvious issues → data/digital-music-sound-in-the-digital-age.es|fr.phased.json
  - [ ] Enable prefetch of next-phase TTS during playback → Player optimization (once globally implemented)
  - [ ] QA in index.html: phase texts render, TTS plays, interactions flow → Open index.html?day=302

## Day 303 — Sustainable Food Systems - Feeding the World
- Learning objective: Practice food systems thinking while understanding how sustainable food systems enable nutrition, environmental protection, and social equity.
- Slug: sustainable-food-systems-feeding-the-world
- Files:
  - Normalized: data/sustainable-food-systems-feeding-the-world_normalized.json
  - PhaseDNA: data/sustainable-food-systems-feeding-the-world.en.phased.json, data/sustainable-food-systems-feeding-the-world.es.phased.json, data/sustainable-food-systems-feeding-the-world.fr.phased.json
  - TTS jobs: data/tts_jobs/sustainable-food-systems-feeding-the-world.en.json, data/tts_jobs/sustainable-food-systems-feeding-the-world.es.json, data/tts_jobs/sustainable-food-systems-feeding-the-world.fr.json
- Subtasks:
  - [ ] Author normalized DNA source → data/sustainable-food-systems-feeding-the-world_normalized.json
  - [ ] Generate PhaseDNA v1 (en + clone es/fr) → data/sustainable-food-systems-feeding-the-world.en|es|fr.phased.json (cmd: node scripts/generate-phased-from-normalized.js --input data/sustainable-food-systems-feeding-the-world_normalized.json --outbase data/sustainable-food-systems-feeding-the-world --lang en --clone-es-fr)
  - [ ] Extract TTS jobs (per-phase narration) for en/es/fr → data/tts_jobs/sustainable-food-systems-feeding-the-world.en|es|fr.json (cmd: node scripts/extract-tts-jobs.js --slugs sustainable-food-systems-feeding-the-world --langs en,es,fr --in data --out data/tts_jobs)
  - [ ] Validate PhaseDNA shape and TTS jobs presence → npm run validate
  - [ ] Ensure day-to-slug resolver loads this lesson in index.html → Update getDNALessonData to include this day or general resolver
  - [ ] Attach minimal avatar cues/moods per phase (optional) → Edit phased JSON: phases[].avatar.cues
  - [ ] Quick review of es/fr clones for obvious issues → data/sustainable-food-systems-feeding-the-world.es|fr.phased.json
  - [ ] Enable prefetch of next-phase TTS during playback → Player optimization (once globally implemented)
  - [ ] QA in index.html: phase texts render, TTS plays, interactions flow → Open index.html?day=303

## Day 304 — Digital Storytelling - Narratives in the Digital Age
- Learning objective: Practice digital narrative while understanding how digital storytelling enables cultural expression, education, and social change.
- Slug: digital-storytelling-narratives-in-the-digital-age
- Files:
  - Normalized: data/digital-storytelling-narratives-in-the-digital-age_normalized.json
  - PhaseDNA: data/digital-storytelling-narratives-in-the-digital-age.en.phased.json, data/digital-storytelling-narratives-in-the-digital-age.es.phased.json, data/digital-storytelling-narratives-in-the-digital-age.fr.phased.json
  - TTS jobs: data/tts_jobs/digital-storytelling-narratives-in-the-digital-age.en.json, data/tts_jobs/digital-storytelling-narratives-in-the-digital-age.es.json, data/tts_jobs/digital-storytelling-narratives-in-the-digital-age.fr.json
- Subtasks:
  - [ ] Author normalized DNA source → data/digital-storytelling-narratives-in-the-digital-age_normalized.json
  - [ ] Generate PhaseDNA v1 (en + clone es/fr) → data/digital-storytelling-narratives-in-the-digital-age.en|es|fr.phased.json (cmd: node scripts/generate-phased-from-normalized.js --input data/digital-storytelling-narratives-in-the-digital-age_normalized.json --outbase data/digital-storytelling-narratives-in-the-digital-age --lang en --clone-es-fr)
  - [ ] Extract TTS jobs (per-phase narration) for en/es/fr → data/tts_jobs/digital-storytelling-narratives-in-the-digital-age.en|es|fr.json (cmd: node scripts/extract-tts-jobs.js --slugs digital-storytelling-narratives-in-the-digital-age --langs en,es,fr --in data --out data/tts_jobs)
  - [ ] Validate PhaseDNA shape and TTS jobs presence → npm run validate
  - [ ] Ensure day-to-slug resolver loads this lesson in index.html → Update getDNALessonData to include this day or general resolver
  - [ ] Attach minimal avatar cues/moods per phase (optional) → Edit phased JSON: phases[].avatar.cues
  - [ ] Quick review of es/fr clones for obvious issues → data/digital-storytelling-narratives-in-the-digital-age.es|fr.phased.json
  - [ ] Enable prefetch of next-phase TTS during playback → Player optimization (once globally implemented)
  - [ ] QA in index.html: phase texts render, TTS plays, interactions flow → Open index.html?day=304

## Day 305 — Sustainable Energy - Powering the Future
- Learning objective: Explore renewable energy while understanding how sustainable energy enables climate action, energy independence, and economic transformation.
- Slug: sustainable-energy-powering-the-future
- Files:
  - Normalized: data/sustainable-energy-powering-the-future_normalized.json
  - PhaseDNA: data/sustainable-energy-powering-the-future.en.phased.json, data/sustainable-energy-powering-the-future.es.phased.json, data/sustainable-energy-powering-the-future.fr.phased.json
  - TTS jobs: data/tts_jobs/sustainable-energy-powering-the-future.en.json, data/tts_jobs/sustainable-energy-powering-the-future.es.json, data/tts_jobs/sustainable-energy-powering-the-future.fr.json
- Subtasks:
  - [ ] Author normalized DNA source → data/sustainable-energy-powering-the-future_normalized.json
  - [ ] Generate PhaseDNA v1 (en + clone es/fr) → data/sustainable-energy-powering-the-future.en|es|fr.phased.json (cmd: node scripts/generate-phased-from-normalized.js --input data/sustainable-energy-powering-the-future_normalized.json --outbase data/sustainable-energy-powering-the-future --lang en --clone-es-fr)
  - [ ] Extract TTS jobs (per-phase narration) for en/es/fr → data/tts_jobs/sustainable-energy-powering-the-future.en|es|fr.json (cmd: node scripts/extract-tts-jobs.js --slugs sustainable-energy-powering-the-future --langs en,es,fr --in data --out data/tts_jobs)
  - [ ] Validate PhaseDNA shape and TTS jobs presence → npm run validate
  - [ ] Ensure day-to-slug resolver loads this lesson in index.html → Update getDNALessonData to include this day or general resolver
  - [ ] Attach minimal avatar cues/moods per phase (optional) → Edit phased JSON: phases[].avatar.cues
  - [ ] Quick review of es/fr clones for obvious issues → data/sustainable-energy-powering-the-future.es|fr.phased.json
  - [ ] Enable prefetch of next-phase TTS during playback → Player optimization (once globally implemented)
  - [ ] QA in index.html: phase texts render, TTS plays, interactions flow → Open index.html?day=305

## Day 306 — Digital Photography - Capturing Light Digitally
- Learning objective: Practice digital imaging while understanding how digital photography enables artistic expression, documentation, and visual communication.
- Slug: digital-photography-capturing-light-digitally
- Files:
  - Normalized: data/digital-photography-capturing-light-digitally_normalized.json
  - PhaseDNA: data/digital-photography-capturing-light-digitally.en.phased.json, data/digital-photography-capturing-light-digitally.es.phased.json, data/digital-photography-capturing-light-digitally.fr.phased.json
  - TTS jobs: data/tts_jobs/digital-photography-capturing-light-digitally.en.json, data/tts_jobs/digital-photography-capturing-light-digitally.es.json, data/tts_jobs/digital-photography-capturing-light-digitally.fr.json
- Subtasks:
  - [ ] Author normalized DNA source → data/digital-photography-capturing-light-digitally_normalized.json
  - [ ] Generate PhaseDNA v1 (en + clone es/fr) → data/digital-photography-capturing-light-digitally.en|es|fr.phased.json (cmd: node scripts/generate-phased-from-normalized.js --input data/digital-photography-capturing-light-digitally_normalized.json --outbase data/digital-photography-capturing-light-digitally --lang en --clone-es-fr)
  - [ ] Extract TTS jobs (per-phase narration) for en/es/fr → data/tts_jobs/digital-photography-capturing-light-digitally.en|es|fr.json (cmd: node scripts/extract-tts-jobs.js --slugs digital-photography-capturing-light-digitally --langs en,es,fr --in data --out data/tts_jobs)
  - [ ] Validate PhaseDNA shape and TTS jobs presence → npm run validate
  - [ ] Ensure day-to-slug resolver loads this lesson in index.html → Update getDNALessonData to include this day or general resolver
  - [ ] Attach minimal avatar cues/moods per phase (optional) → Edit phased JSON: phases[].avatar.cues
  - [ ] Quick review of es/fr clones for obvious issues → data/digital-photography-capturing-light-digitally.es|fr.phased.json
  - [ ] Enable prefetch of next-phase TTS during playback → Player optimization (once globally implemented)
  - [ ] QA in index.html: phase texts render, TTS plays, interactions flow → Open index.html?day=306

## Day 307 — Sustainable Transportation - Moving People and Goods
- Learning objective: Practice transportation planning while understanding how sustainable mobility enables climate action, public health, and urban livability.
- Slug: sustainable-transportation-moving-people-and-goods
- Files:
  - Normalized: data/sustainable-transportation-moving-people-and-goods_normalized.json
  - PhaseDNA: data/sustainable-transportation-moving-people-and-goods.en.phased.json, data/sustainable-transportation-moving-people-and-goods.es.phased.json, data/sustainable-transportation-moving-people-and-goods.fr.phased.json
  - TTS jobs: data/tts_jobs/sustainable-transportation-moving-people-and-goods.en.json, data/tts_jobs/sustainable-transportation-moving-people-and-goods.es.json, data/tts_jobs/sustainable-transportation-moving-people-and-goods.fr.json
- Subtasks:
  - [ ] Author normalized DNA source → data/sustainable-transportation-moving-people-and-goods_normalized.json
  - [ ] Generate PhaseDNA v1 (en + clone es/fr) → data/sustainable-transportation-moving-people-and-goods.en|es|fr.phased.json (cmd: node scripts/generate-phased-from-normalized.js --input data/sustainable-transportation-moving-people-and-goods_normalized.json --outbase data/sustainable-transportation-moving-people-and-goods --lang en --clone-es-fr)
  - [ ] Extract TTS jobs (per-phase narration) for en/es/fr → data/tts_jobs/sustainable-transportation-moving-people-and-goods.en|es|fr.json (cmd: node scripts/extract-tts-jobs.js --slugs sustainable-transportation-moving-people-and-goods --langs en,es,fr --in data --out data/tts_jobs)
  - [ ] Validate PhaseDNA shape and TTS jobs presence → npm run validate
  - [ ] Ensure day-to-slug resolver loads this lesson in index.html → Update getDNALessonData to include this day or general resolver
  - [ ] Attach minimal avatar cues/moods per phase (optional) → Edit phased JSON: phases[].avatar.cues
  - [ ] Quick review of es/fr clones for obvious issues → data/sustainable-transportation-moving-people-and-goods.es|fr.phased.json
  - [ ] Enable prefetch of next-phase TTS during playback → Player optimization (once globally implemented)
  - [ ] QA in index.html: phase texts render, TTS plays, interactions flow → Open index.html?day=307

## Day 308 — Digital Design - Creating in the Digital Age
- Learning objective: Practice digital creation while understanding how digital design enables user experience, visual communication, and interactive media.
- Slug: digital-design-creating-in-the-digital-age
- Files:
  - Normalized: data/digital-design-creating-in-the-digital-age_normalized.json
  - PhaseDNA: data/digital-design-creating-in-the-digital-age.en.phased.json, data/digital-design-creating-in-the-digital-age.es.phased.json, data/digital-design-creating-in-the-digital-age.fr.phased.json
  - TTS jobs: data/tts_jobs/digital-design-creating-in-the-digital-age.en.json, data/tts_jobs/digital-design-creating-in-the-digital-age.es.json, data/tts_jobs/digital-design-creating-in-the-digital-age.fr.json
- Subtasks:
  - [ ] Author normalized DNA source → data/digital-design-creating-in-the-digital-age_normalized.json
  - [ ] Generate PhaseDNA v1 (en + clone es/fr) → data/digital-design-creating-in-the-digital-age.en|es|fr.phased.json (cmd: node scripts/generate-phased-from-normalized.js --input data/digital-design-creating-in-the-digital-age_normalized.json --outbase data/digital-design-creating-in-the-digital-age --lang en --clone-es-fr)
  - [ ] Extract TTS jobs (per-phase narration) for en/es/fr → data/tts_jobs/digital-design-creating-in-the-digital-age.en|es|fr.json (cmd: node scripts/extract-tts-jobs.js --slugs digital-design-creating-in-the-digital-age --langs en,es,fr --in data --out data/tts_jobs)
  - [ ] Validate PhaseDNA shape and TTS jobs presence → npm run validate
  - [ ] Ensure day-to-slug resolver loads this lesson in index.html → Update getDNALessonData to include this day or general resolver
  - [ ] Attach minimal avatar cues/moods per phase (optional) → Edit phased JSON: phases[].avatar.cues
  - [ ] Quick review of es/fr clones for obvious issues → data/digital-design-creating-in-the-digital-age.es|fr.phased.json
  - [ ] Enable prefetch of next-phase TTS during playback → Player optimization (once globally implemented)
  - [ ] QA in index.html: phase texts render, TTS plays, interactions flow → Open index.html?day=308

## Day 309 — Sustainable Cities - Urban Living for the Future
- Learning objective: Practice urban planning while understanding how sustainable cities enable quality of life, environmental protection, and social equity.
- Slug: sustainable-cities-urban-living-for-the-future
- Files:
  - Normalized: data/sustainable-cities-urban-living-for-the-future_normalized.json
  - PhaseDNA: data/sustainable-cities-urban-living-for-the-future.en.phased.json, data/sustainable-cities-urban-living-for-the-future.es.phased.json, data/sustainable-cities-urban-living-for-the-future.fr.phased.json
  - TTS jobs: data/tts_jobs/sustainable-cities-urban-living-for-the-future.en.json, data/tts_jobs/sustainable-cities-urban-living-for-the-future.es.json, data/tts_jobs/sustainable-cities-urban-living-for-the-future.fr.json
- Subtasks:
  - [ ] Author normalized DNA source → data/sustainable-cities-urban-living-for-the-future_normalized.json
  - [ ] Generate PhaseDNA v1 (en + clone es/fr) → data/sustainable-cities-urban-living-for-the-future.en|es|fr.phased.json (cmd: node scripts/generate-phased-from-normalized.js --input data/sustainable-cities-urban-living-for-the-future_normalized.json --outbase data/sustainable-cities-urban-living-for-the-future --lang en --clone-es-fr)
  - [ ] Extract TTS jobs (per-phase narration) for en/es/fr → data/tts_jobs/sustainable-cities-urban-living-for-the-future.en|es|fr.json (cmd: node scripts/extract-tts-jobs.js --slugs sustainable-cities-urban-living-for-the-future --langs en,es,fr --in data --out data/tts_jobs)
  - [ ] Validate PhaseDNA shape and TTS jobs presence → npm run validate
  - [ ] Ensure day-to-slug resolver loads this lesson in index.html → Update getDNALessonData to include this day or general resolver
  - [ ] Attach minimal avatar cues/moods per phase (optional) → Edit phased JSON: phases[].avatar.cues
  - [ ] Quick review of es/fr clones for obvious issues → data/sustainable-cities-urban-living-for-the-future.es|fr.phased.json
  - [ ] Enable prefetch of next-phase TTS during playback → Player optimization (once globally implemented)
  - [ ] QA in index.html: phase texts render, TTS plays, interactions flow → Open index.html?day=309

## Day 310 — Digital Marketing - Connecting in the Digital Age
- Learning objective: Practice digital communication while understanding how digital marketing enables business growth, customer engagement, and brand building.
- Slug: digital-marketing-connecting-in-the-digital-age
- Files:
  - Normalized: data/digital-marketing-connecting-in-the-digital-age_normalized.json
  - PhaseDNA: data/digital-marketing-connecting-in-the-digital-age.en.phased.json, data/digital-marketing-connecting-in-the-digital-age.es.phased.json, data/digital-marketing-connecting-in-the-digital-age.fr.phased.json
  - TTS jobs: data/tts_jobs/digital-marketing-connecting-in-the-digital-age.en.json, data/tts_jobs/digital-marketing-connecting-in-the-digital-age.es.json, data/tts_jobs/digital-marketing-connecting-in-the-digital-age.fr.json
- Subtasks:
  - [ ] Author normalized DNA source → data/digital-marketing-connecting-in-the-digital-age_normalized.json
  - [ ] Generate PhaseDNA v1 (en + clone es/fr) → data/digital-marketing-connecting-in-the-digital-age.en|es|fr.phased.json (cmd: node scripts/generate-phased-from-normalized.js --input data/digital-marketing-connecting-in-the-digital-age_normalized.json --outbase data/digital-marketing-connecting-in-the-digital-age --lang en --clone-es-fr)
  - [ ] Extract TTS jobs (per-phase narration) for en/es/fr → data/tts_jobs/digital-marketing-connecting-in-the-digital-age.en|es|fr.json (cmd: node scripts/extract-tts-jobs.js --slugs digital-marketing-connecting-in-the-digital-age --langs en,es,fr --in data --out data/tts_jobs)
  - [ ] Validate PhaseDNA shape and TTS jobs presence → npm run validate
  - [ ] Ensure day-to-slug resolver loads this lesson in index.html → Update getDNALessonData to include this day or general resolver
  - [ ] Attach minimal avatar cues/moods per phase (optional) → Edit phased JSON: phases[].avatar.cues
  - [ ] Quick review of es/fr clones for obvious issues → data/digital-marketing-connecting-in-the-digital-age.es|fr.phased.json
  - [ ] Enable prefetch of next-phase TTS during playback → Player optimization (once globally implemented)
  - [ ] QA in index.html: phase texts render, TTS plays, interactions flow → Open index.html?day=310

## Day 311 — Sustainable Business - Profit with Purpose
- Learning objective: Practice ethical business while understanding how sustainable business enables environmental protection, social equity, and long-term value creation.
- Slug: sustainable-business-profit-with-purpose
- Files:
  - Normalized: data/sustainable-business-profit-with-purpose_normalized.json
  - PhaseDNA: data/sustainable-business-profit-with-purpose.en.phased.json, data/sustainable-business-profit-with-purpose.es.phased.json, data/sustainable-business-profit-with-purpose.fr.phased.json
  - TTS jobs: data/tts_jobs/sustainable-business-profit-with-purpose.en.json, data/tts_jobs/sustainable-business-profit-with-purpose.es.json, data/tts_jobs/sustainable-business-profit-with-purpose.fr.json
- Subtasks:
  - [ ] Author normalized DNA source → data/sustainable-business-profit-with-purpose_normalized.json
  - [ ] Generate PhaseDNA v1 (en + clone es/fr) → data/sustainable-business-profit-with-purpose.en|es|fr.phased.json (cmd: node scripts/generate-phased-from-normalized.js --input data/sustainable-business-profit-with-purpose_normalized.json --outbase data/sustainable-business-profit-with-purpose --lang en --clone-es-fr)
  - [ ] Extract TTS jobs (per-phase narration) for en/es/fr → data/tts_jobs/sustainable-business-profit-with-purpose.en|es|fr.json (cmd: node scripts/extract-tts-jobs.js --slugs sustainable-business-profit-with-purpose --langs en,es,fr --in data --out data/tts_jobs)
  - [ ] Validate PhaseDNA shape and TTS jobs presence → npm run validate
  - [ ] Ensure day-to-slug resolver loads this lesson in index.html → Update getDNALessonData to include this day or general resolver
  - [ ] Attach minimal avatar cues/moods per phase (optional) → Edit phased JSON: phases[].avatar.cues
  - [ ] Quick review of es/fr clones for obvious issues → data/sustainable-business-profit-with-purpose.es|fr.phased.json
  - [ ] Enable prefetch of next-phase TTS during playback → Player optimization (once globally implemented)
  - [ ] QA in index.html: phase texts render, TTS plays, interactions flow → Open index.html?day=311

## Day 312 — Digital Journalism - News in the Digital Age
- Learning objective: Practice digital reporting while understanding how digital journalism enables information sharing, public accountability, and democratic discourse.
- Slug: digital-journalism-news-in-the-digital-age
- Files:
  - Normalized: data/digital-journalism-news-in-the-digital-age_normalized.json
  - PhaseDNA: data/digital-journalism-news-in-the-digital-age.en.phased.json, data/digital-journalism-news-in-the-digital-age.es.phased.json, data/digital-journalism-news-in-the-digital-age.fr.phased.json
  - TTS jobs: data/tts_jobs/digital-journalism-news-in-the-digital-age.en.json, data/tts_jobs/digital-journalism-news-in-the-digital-age.es.json, data/tts_jobs/digital-journalism-news-in-the-digital-age.fr.json
- Subtasks:
  - [ ] Author normalized DNA source → data/digital-journalism-news-in-the-digital-age_normalized.json
  - [ ] Generate PhaseDNA v1 (en + clone es/fr) → data/digital-journalism-news-in-the-digital-age.en|es|fr.phased.json (cmd: node scripts/generate-phased-from-normalized.js --input data/digital-journalism-news-in-the-digital-age_normalized.json --outbase data/digital-journalism-news-in-the-digital-age --lang en --clone-es-fr)
  - [ ] Extract TTS jobs (per-phase narration) for en/es/fr → data/tts_jobs/digital-journalism-news-in-the-digital-age.en|es|fr.json (cmd: node scripts/extract-tts-jobs.js --slugs digital-journalism-news-in-the-digital-age --langs en,es,fr --in data --out data/tts_jobs)
  - [ ] Validate PhaseDNA shape and TTS jobs presence → npm run validate
  - [ ] Ensure day-to-slug resolver loads this lesson in index.html → Update getDNALessonData to include this day or general resolver
  - [ ] Attach minimal avatar cues/moods per phase (optional) → Edit phased JSON: phases[].avatar.cues
  - [ ] Quick review of es/fr clones for obvious issues → data/digital-journalism-news-in-the-digital-age.es|fr.phased.json
  - [ ] Enable prefetch of next-phase TTS during playback → Player optimization (once globally implemented)
  - [ ] QA in index.html: phase texts render, TTS plays, interactions flow → Open index.html?day=312

## Day 313 — Sustainable Development - Meeting Today's Needs
- Learning objective: Practice development thinking while understanding how sustainable development enables human flourishing, environmental protection, and social equity.
- Slug: sustainable-development-meeting-todays-needs
- Files:
  - Normalized: data/sustainable-development-meeting-todays-needs_normalized.json
  - PhaseDNA: data/sustainable-development-meeting-todays-needs.en.phased.json, data/sustainable-development-meeting-todays-needs.es.phased.json, data/sustainable-development-meeting-todays-needs.fr.phased.json
  - TTS jobs: data/tts_jobs/sustainable-development-meeting-todays-needs.en.json, data/tts_jobs/sustainable-development-meeting-todays-needs.es.json, data/tts_jobs/sustainable-development-meeting-todays-needs.fr.json
- Subtasks:
  - [ ] Author normalized DNA source → data/sustainable-development-meeting-todays-needs_normalized.json
  - [ ] Generate PhaseDNA v1 (en + clone es/fr) → data/sustainable-development-meeting-todays-needs.en|es|fr.phased.json (cmd: node scripts/generate-phased-from-normalized.js --input data/sustainable-development-meeting-todays-needs_normalized.json --outbase data/sustainable-development-meeting-todays-needs --lang en --clone-es-fr)
  - [ ] Extract TTS jobs (per-phase narration) for en/es/fr → data/tts_jobs/sustainable-development-meeting-todays-needs.en|es|fr.json (cmd: node scripts/extract-tts-jobs.js --slugs sustainable-development-meeting-todays-needs --langs en,es,fr --in data --out data/tts_jobs)
  - [ ] Validate PhaseDNA shape and TTS jobs presence → npm run validate
  - [ ] Ensure day-to-slug resolver loads this lesson in index.html → Update getDNALessonData to include this day or general resolver
  - [ ] Attach minimal avatar cues/moods per phase (optional) → Edit phased JSON: phases[].avatar.cues
  - [ ] Quick review of es/fr clones for obvious issues → data/sustainable-development-meeting-todays-needs.es|fr.phased.json
  - [ ] Enable prefetch of next-phase TTS during playback → Player optimization (once globally implemented)
  - [ ] QA in index.html: phase texts render, TTS plays, interactions flow → Open index.html?day=313

## Day 314 — Digital Ethics - Values in the Digital Age
- Learning objective: Practice ethical technology while understanding how digital ethics enables responsible innovation, privacy protection, and democratic values.
- Slug: digital-ethics-values-in-the-digital-age
- Files:
  - Normalized: data/digital-ethics-values-in-the-digital-age_normalized.json
  - PhaseDNA: data/digital-ethics-values-in-the-digital-age.en.phased.json, data/digital-ethics-values-in-the-digital-age.es.phased.json, data/digital-ethics-values-in-the-digital-age.fr.phased.json
  - TTS jobs: data/tts_jobs/digital-ethics-values-in-the-digital-age.en.json, data/tts_jobs/digital-ethics-values-in-the-digital-age.es.json, data/tts_jobs/digital-ethics-values-in-the-digital-age.fr.json
- Subtasks:
  - [ ] Author normalized DNA source → data/digital-ethics-values-in-the-digital-age_normalized.json
  - [ ] Generate PhaseDNA v1 (en + clone es/fr) → data/digital-ethics-values-in-the-digital-age.en|es|fr.phased.json (cmd: node scripts/generate-phased-from-normalized.js --input data/digital-ethics-values-in-the-digital-age_normalized.json --outbase data/digital-ethics-values-in-the-digital-age --lang en --clone-es-fr)
  - [ ] Extract TTS jobs (per-phase narration) for en/es/fr → data/tts_jobs/digital-ethics-values-in-the-digital-age.en|es|fr.json (cmd: node scripts/extract-tts-jobs.js --slugs digital-ethics-values-in-the-digital-age --langs en,es,fr --in data --out data/tts_jobs)
  - [ ] Validate PhaseDNA shape and TTS jobs presence → npm run validate
  - [ ] Ensure day-to-slug resolver loads this lesson in index.html → Update getDNALessonData to include this day or general resolver
  - [ ] Attach minimal avatar cues/moods per phase (optional) → Edit phased JSON: phases[].avatar.cues
  - [ ] Quick review of es/fr clones for obvious issues → data/digital-ethics-values-in-the-digital-age.es|fr.phased.json
  - [ ] Enable prefetch of next-phase TTS during playback → Player optimization (once globally implemented)
  - [ ] QA in index.html: phase texts render, TTS plays, interactions flow → Open index.html?day=314

## Day 315 — Sustainable Innovation - Creating Without Destroying
- Learning objective: Practice sustainable design thinking while understanding how environmental considerations must guide technological development and economic systems.
- Slug: sustainable-innovation-creating-without-destroying
- Files:
  - Normalized: data/sustainable-innovation-creating-without-destroying_normalized.json
  - PhaseDNA: data/sustainable-innovation-creating-without-destroying.en.phased.json, data/sustainable-innovation-creating-without-destroying.es.phased.json, data/sustainable-innovation-creating-without-destroying.fr.phased.json
  - TTS jobs: data/tts_jobs/sustainable-innovation-creating-without-destroying.en.json, data/tts_jobs/sustainable-innovation-creating-without-destroying.es.json, data/tts_jobs/sustainable-innovation-creating-without-destroying.fr.json
- Subtasks:
  - [ ] Author normalized DNA source → data/sustainable-innovation-creating-without-destroying_normalized.json
  - [ ] Generate PhaseDNA v1 (en + clone es/fr) → data/sustainable-innovation-creating-without-destroying.en|es|fr.phased.json (cmd: node scripts/generate-phased-from-normalized.js --input data/sustainable-innovation-creating-without-destroying_normalized.json --outbase data/sustainable-innovation-creating-without-destroying --lang en --clone-es-fr)
  - [ ] Extract TTS jobs (per-phase narration) for en/es/fr → data/tts_jobs/sustainable-innovation-creating-without-destroying.en|es|fr.json (cmd: node scripts/extract-tts-jobs.js --slugs sustainable-innovation-creating-without-destroying --langs en,es,fr --in data --out data/tts_jobs)
  - [ ] Validate PhaseDNA shape and TTS jobs presence → npm run validate
  - [ ] Ensure day-to-slug resolver loads this lesson in index.html → Update getDNALessonData to include this day or general resolver
  - [ ] Attach minimal avatar cues/moods per phase (optional) → Edit phased JSON: phases[].avatar.cues
  - [ ] Quick review of es/fr clones for obvious issues → data/sustainable-innovation-creating-without-destroying.es|fr.phased.json
  - [ ] Enable prefetch of next-phase TTS during playback → Player optimization (once globally implemented)
  - [ ] QA in index.html: phase texts render, TTS plays, interactions flow → Open index.html?day=315

## Day 316 — Digital Literacy - Navigating the Information Age
- Learning objective: Practice critical thinking while understanding how digital literacy enables informed citizenship, media literacy, and online safety.
- Slug: digital-literacy-navigating-the-information-age
- Files:
  - Normalized: data/digital-literacy-navigating-the-information-age_normalized.json
  - PhaseDNA: data/digital-literacy-navigating-the-information-age.en.phased.json, data/digital-literacy-navigating-the-information-age.es.phased.json, data/digital-literacy-navigating-the-information-age.fr.phased.json
  - TTS jobs: data/tts_jobs/digital-literacy-navigating-the-information-age.en.json, data/tts_jobs/digital-literacy-navigating-the-information-age.es.json, data/tts_jobs/digital-literacy-navigating-the-information-age.fr.json
- Subtasks:
  - [ ] Author normalized DNA source → data/digital-literacy-navigating-the-information-age_normalized.json
  - [ ] Generate PhaseDNA v1 (en + clone es/fr) → data/digital-literacy-navigating-the-information-age.en|es|fr.phased.json (cmd: node scripts/generate-phased-from-normalized.js --input data/digital-literacy-navigating-the-information-age_normalized.json --outbase data/digital-literacy-navigating-the-information-age --lang en --clone-es-fr)
  - [ ] Extract TTS jobs (per-phase narration) for en/es/fr → data/tts_jobs/digital-literacy-navigating-the-information-age.en|es|fr.json (cmd: node scripts/extract-tts-jobs.js --slugs digital-literacy-navigating-the-information-age --langs en,es,fr --in data --out data/tts_jobs)
  - [ ] Validate PhaseDNA shape and TTS jobs presence → npm run validate
  - [ ] Ensure day-to-slug resolver loads this lesson in index.html → Update getDNALessonData to include this day or general resolver
  - [ ] Attach minimal avatar cues/moods per phase (optional) → Edit phased JSON: phases[].avatar.cues
  - [ ] Quick review of es/fr clones for obvious issues → data/digital-literacy-navigating-the-information-age.es|fr.phased.json
  - [ ] Enable prefetch of next-phase TTS during playback → Player optimization (once globally implemented)
  - [ ] QA in index.html: phase texts render, TTS plays, interactions flow → Open index.html?day=316

## Day 317 — Sustainable Finance - Money for a Better World
- Learning objective: Practice ethical finance while understanding how sustainable finance enables climate action, social equity, and democratic economic systems.
- Slug: sustainable-finance-money-for-a-better-world
- Files:
  - Normalized: data/sustainable-finance-money-for-a-better-world_normalized.json
  - PhaseDNA: data/sustainable-finance-money-for-a-better-world.en.phased.json, data/sustainable-finance-money-for-a-better-world.es.phased.json, data/sustainable-finance-money-for-a-better-world.fr.phased.json
  - TTS jobs: data/tts_jobs/sustainable-finance-money-for-a-better-world.en.json, data/tts_jobs/sustainable-finance-money-for-a-better-world.es.json, data/tts_jobs/sustainable-finance-money-for-a-better-world.fr.json
- Subtasks:
  - [ ] Author normalized DNA source → data/sustainable-finance-money-for-a-better-world_normalized.json
  - [ ] Generate PhaseDNA v1 (en + clone es/fr) → data/sustainable-finance-money-for-a-better-world.en|es|fr.phased.json (cmd: node scripts/generate-phased-from-normalized.js --input data/sustainable-finance-money-for-a-better-world_normalized.json --outbase data/sustainable-finance-money-for-a-better-world --lang en --clone-es-fr)
  - [ ] Extract TTS jobs (per-phase narration) for en/es/fr → data/tts_jobs/sustainable-finance-money-for-a-better-world.en|es|fr.json (cmd: node scripts/extract-tts-jobs.js --slugs sustainable-finance-money-for-a-better-world --langs en,es,fr --in data --out data/tts_jobs)
  - [ ] Validate PhaseDNA shape and TTS jobs presence → npm run validate
  - [ ] Ensure day-to-slug resolver loads this lesson in index.html → Update getDNALessonData to include this day or general resolver
  - [ ] Attach minimal avatar cues/moods per phase (optional) → Edit phased JSON: phases[].avatar.cues
  - [ ] Quick review of es/fr clones for obvious issues → data/sustainable-finance-money-for-a-better-world.es|fr.phased.json
  - [ ] Enable prefetch of next-phase TTS during playback → Player optimization (once globally implemented)
  - [ ] QA in index.html: phase texts render, TTS plays, interactions flow → Open index.html?day=317

## Day 318 — Digital Transformation - Technology and Organizational Change
- Learning objective: Understand organizational change while exploring how digital transformation affects work, leadership, and organizational culture.
- Slug: digital-transformation-technology-and-organizational-change
- Files:
  - Normalized: data/digital-transformation-technology-and-organizational-change_normalized.json
  - PhaseDNA: data/digital-transformation-technology-and-organizational-change.en.phased.json, data/digital-transformation-technology-and-organizational-change.es.phased.json, data/digital-transformation-technology-and-organizational-change.fr.phased.json
  - TTS jobs: data/tts_jobs/digital-transformation-technology-and-organizational-change.en.json, data/tts_jobs/digital-transformation-technology-and-organizational-change.es.json, data/tts_jobs/digital-transformation-technology-and-organizational-change.fr.json
- Subtasks:
  - [ ] Author normalized DNA source → data/digital-transformation-technology-and-organizational-change_normalized.json
  - [ ] Generate PhaseDNA v1 (en + clone es/fr) → data/digital-transformation-technology-and-organizational-change.en|es|fr.phased.json (cmd: node scripts/generate-phased-from-normalized.js --input data/digital-transformation-technology-and-organizational-change_normalized.json --outbase data/digital-transformation-technology-and-organizational-change --lang en --clone-es-fr)
  - [ ] Extract TTS jobs (per-phase narration) for en/es/fr → data/tts_jobs/digital-transformation-technology-and-organizational-change.en|es|fr.json (cmd: node scripts/extract-tts-jobs.js --slugs digital-transformation-technology-and-organizational-change --langs en,es,fr --in data --out data/tts_jobs)
  - [ ] Validate PhaseDNA shape and TTS jobs presence → npm run validate
  - [ ] Ensure day-to-slug resolver loads this lesson in index.html → Update getDNALessonData to include this day or general resolver
  - [ ] Attach minimal avatar cues/moods per phase (optional) → Edit phased JSON: phases[].avatar.cues
  - [ ] Quick review of es/fr clones for obvious issues → data/digital-transformation-technology-and-organizational-change.es|fr.phased.json
  - [ ] Enable prefetch of next-phase TTS during playback → Player optimization (once globally implemented)
  - [ ] QA in index.html: phase texts render, TTS plays, interactions flow → Open index.html?day=318

## Day 319 — Sustainable Tourism - Traveling Responsibly
- Learning objective: Practice responsible travel while understanding how sustainable tourism enables cultural preservation, environmental protection, and local development.
- Slug: sustainable-tourism-traveling-responsibly
- Files:
  - Normalized: data/sustainable-tourism-traveling-responsibly_normalized.json
  - PhaseDNA: data/sustainable-tourism-traveling-responsibly.en.phased.json, data/sustainable-tourism-traveling-responsibly.es.phased.json, data/sustainable-tourism-traveling-responsibly.fr.phased.json
  - TTS jobs: data/tts_jobs/sustainable-tourism-traveling-responsibly.en.json, data/tts_jobs/sustainable-tourism-traveling-responsibly.es.json, data/tts_jobs/sustainable-tourism-traveling-responsibly.fr.json
- Subtasks:
  - [ ] Author normalized DNA source → data/sustainable-tourism-traveling-responsibly_normalized.json
  - [ ] Generate PhaseDNA v1 (en + clone es/fr) → data/sustainable-tourism-traveling-responsibly.en|es|fr.phased.json (cmd: node scripts/generate-phased-from-normalized.js --input data/sustainable-tourism-traveling-responsibly_normalized.json --outbase data/sustainable-tourism-traveling-responsibly --lang en --clone-es-fr)
  - [ ] Extract TTS jobs (per-phase narration) for en/es/fr → data/tts_jobs/sustainable-tourism-traveling-responsibly.en|es|fr.json (cmd: node scripts/extract-tts-jobs.js --slugs sustainable-tourism-traveling-responsibly --langs en,es,fr --in data --out data/tts_jobs)
  - [ ] Validate PhaseDNA shape and TTS jobs presence → npm run validate
  - [ ] Ensure day-to-slug resolver loads this lesson in index.html → Update getDNALessonData to include this day or general resolver
  - [ ] Attach minimal avatar cues/moods per phase (optional) → Edit phased JSON: phases[].avatar.cues
  - [ ] Quick review of es/fr clones for obvious issues → data/sustainable-tourism-traveling-responsibly.es|fr.phased.json
  - [ ] Enable prefetch of next-phase TTS during playback → Player optimization (once globally implemented)
  - [ ] QA in index.html: phase texts render, TTS plays, interactions flow → Open index.html?day=319

## Day 320 — Digital Art - Creativity in the Digital Age
- Learning objective: Practice digital creativity while understanding how digital art enables new forms of expression, cultural exchange, and artistic innovation.
- Slug: digital-art-creativity-in-the-digital-age
- Files:
  - Normalized: data/digital-art-creativity-in-the-digital-age_normalized.json
  - PhaseDNA: data/digital-art-creativity-in-the-digital-age.en.phased.json, data/digital-art-creativity-in-the-digital-age.es.phased.json, data/digital-art-creativity-in-the-digital-age.fr.phased.json
  - TTS jobs: data/tts_jobs/digital-art-creativity-in-the-digital-age.en.json, data/tts_jobs/digital-art-creativity-in-the-digital-age.es.json, data/tts_jobs/digital-art-creativity-in-the-digital-age.fr.json
- Subtasks:
  - [ ] Author normalized DNA source → data/digital-art-creativity-in-the-digital-age_normalized.json
  - [ ] Generate PhaseDNA v1 (en + clone es/fr) → data/digital-art-creativity-in-the-digital-age.en|es|fr.phased.json (cmd: node scripts/generate-phased-from-normalized.js --input data/digital-art-creativity-in-the-digital-age_normalized.json --outbase data/digital-art-creativity-in-the-digital-age --lang en --clone-es-fr)
  - [ ] Extract TTS jobs (per-phase narration) for en/es/fr → data/tts_jobs/digital-art-creativity-in-the-digital-age.en|es|fr.json (cmd: node scripts/extract-tts-jobs.js --slugs digital-art-creativity-in-the-digital-age --langs en,es,fr --in data --out data/tts_jobs)
  - [ ] Validate PhaseDNA shape and TTS jobs presence → npm run validate
  - [ ] Ensure day-to-slug resolver loads this lesson in index.html → Update getDNALessonData to include this day or general resolver
  - [ ] Attach minimal avatar cues/moods per phase (optional) → Edit phased JSON: phases[].avatar.cues
  - [ ] Quick review of es/fr clones for obvious issues → data/digital-art-creativity-in-the-digital-age.es|fr.phased.json
  - [ ] Enable prefetch of next-phase TTS during playback → Player optimization (once globally implemented)
  - [ ] QA in index.html: phase texts render, TTS plays, interactions flow → Open index.html?day=320

## Day 321 — Sustainable Fashion - Style with a Conscience
- Learning objective: Practice ethical fashion while understanding how sustainable fashion enables environmental protection, fair labor, and circular economy principles.
- Slug: sustainable-fashion-style-with-a-conscience
- Files:
  - Normalized: data/sustainable-fashion-style-with-a-conscience_normalized.json
  - PhaseDNA: data/sustainable-fashion-style-with-a-conscience.en.phased.json, data/sustainable-fashion-style-with-a-conscience.es.phased.json, data/sustainable-fashion-style-with-a-conscience.fr.phased.json
  - TTS jobs: data/tts_jobs/sustainable-fashion-style-with-a-conscience.en.json, data/tts_jobs/sustainable-fashion-style-with-a-conscience.es.json, data/tts_jobs/sustainable-fashion-style-with-a-conscience.fr.json
- Subtasks:
  - [ ] Author normalized DNA source → data/sustainable-fashion-style-with-a-conscience_normalized.json
  - [ ] Generate PhaseDNA v1 (en + clone es/fr) → data/sustainable-fashion-style-with-a-conscience.en|es|fr.phased.json (cmd: node scripts/generate-phased-from-normalized.js --input data/sustainable-fashion-style-with-a-conscience_normalized.json --outbase data/sustainable-fashion-style-with-a-conscience --lang en --clone-es-fr)
  - [ ] Extract TTS jobs (per-phase narration) for en/es/fr → data/tts_jobs/sustainable-fashion-style-with-a-conscience.en|es|fr.json (cmd: node scripts/extract-tts-jobs.js --slugs sustainable-fashion-style-with-a-conscience --langs en,es,fr --in data --out data/tts_jobs)
  - [ ] Validate PhaseDNA shape and TTS jobs presence → npm run validate
  - [ ] Ensure day-to-slug resolver loads this lesson in index.html → Update getDNALessonData to include this day or general resolver
  - [ ] Attach minimal avatar cues/moods per phase (optional) → Edit phased JSON: phases[].avatar.cues
  - [ ] Quick review of es/fr clones for obvious issues → data/sustainable-fashion-style-with-a-conscience.es|fr.phased.json
  - [ ] Enable prefetch of next-phase TTS during playback → Player optimization (once globally implemented)
  - [ ] QA in index.html: phase texts render, TTS plays, interactions flow → Open index.html?day=321

## Day 322 — Digital Archaeology - Technology and the Past
- Learning objective: Explore archaeological technology while understanding how digital archaeology enables cultural preservation, scientific discovery, and public education.
- Slug: digital-archaeology-technology-and-the-past
- Files:
  - Normalized: data/digital-archaeology-technology-and-the-past_normalized.json
  - PhaseDNA: data/digital-archaeology-technology-and-the-past.en.phased.json, data/digital-archaeology-technology-and-the-past.es.phased.json, data/digital-archaeology-technology-and-the-past.fr.phased.json
  - TTS jobs: data/tts_jobs/digital-archaeology-technology-and-the-past.en.json, data/tts_jobs/digital-archaeology-technology-and-the-past.es.json, data/tts_jobs/digital-archaeology-technology-and-the-past.fr.json
- Subtasks:
  - [ ] Author normalized DNA source → data/digital-archaeology-technology-and-the-past_normalized.json
  - [ ] Generate PhaseDNA v1 (en + clone es/fr) → data/digital-archaeology-technology-and-the-past.en|es|fr.phased.json (cmd: node scripts/generate-phased-from-normalized.js --input data/digital-archaeology-technology-and-the-past_normalized.json --outbase data/digital-archaeology-technology-and-the-past --lang en --clone-es-fr)
  - [ ] Extract TTS jobs (per-phase narration) for en/es/fr → data/tts_jobs/digital-archaeology-technology-and-the-past.en|es|fr.json (cmd: node scripts/extract-tts-jobs.js --slugs digital-archaeology-technology-and-the-past --langs en,es,fr --in data --out data/tts_jobs)
  - [ ] Validate PhaseDNA shape and TTS jobs presence → npm run validate
  - [ ] Ensure day-to-slug resolver loads this lesson in index.html → Update getDNALessonData to include this day or general resolver
  - [ ] Attach minimal avatar cues/moods per phase (optional) → Edit phased JSON: phases[].avatar.cues
  - [ ] Quick review of es/fr clones for obvious issues → data/digital-archaeology-technology-and-the-past.es|fr.phased.json
  - [ ] Enable prefetch of next-phase TTS during playback → Player optimization (once globally implemented)
  - [ ] QA in index.html: phase texts render, TTS plays, interactions flow → Open index.html?day=322

## Day 323 — Sustainable Architecture - Building for the Future
- Learning objective: Practice green building while understanding how sustainable architecture enables energy efficiency, environmental protection, and healthy living spaces.
- Slug: sustainable-architecture-building-for-the-future
- Files:
  - Normalized: data/sustainable-architecture-building-for-the-future_normalized.json
  - PhaseDNA: data/sustainable-architecture-building-for-the-future.en.phased.json, data/sustainable-architecture-building-for-the-future.es.phased.json, data/sustainable-architecture-building-for-the-future.fr.phased.json
  - TTS jobs: data/tts_jobs/sustainable-architecture-building-for-the-future.en.json, data/tts_jobs/sustainable-architecture-building-for-the-future.es.json, data/tts_jobs/sustainable-architecture-building-for-the-future.fr.json
- Subtasks:
  - [ ] Author normalized DNA source → data/sustainable-architecture-building-for-the-future_normalized.json
  - [ ] Generate PhaseDNA v1 (en + clone es/fr) → data/sustainable-architecture-building-for-the-future.en|es|fr.phased.json (cmd: node scripts/generate-phased-from-normalized.js --input data/sustainable-architecture-building-for-the-future_normalized.json --outbase data/sustainable-architecture-building-for-the-future --lang en --clone-es-fr)
  - [ ] Extract TTS jobs (per-phase narration) for en/es/fr → data/tts_jobs/sustainable-architecture-building-for-the-future.en|es|fr.json (cmd: node scripts/extract-tts-jobs.js --slugs sustainable-architecture-building-for-the-future --langs en,es,fr --in data --out data/tts_jobs)
  - [ ] Validate PhaseDNA shape and TTS jobs presence → npm run validate
  - [ ] Ensure day-to-slug resolver loads this lesson in index.html → Update getDNALessonData to include this day or general resolver
  - [ ] Attach minimal avatar cues/moods per phase (optional) → Edit phased JSON: phases[].avatar.cues
  - [ ] Quick review of es/fr clones for obvious issues → data/sustainable-architecture-building-for-the-future.es|fr.phased.json
  - [ ] Enable prefetch of next-phase TTS during playback → Player optimization (once globally implemented)
  - [ ] QA in index.html: phase texts render, TTS plays, interactions flow → Open index.html?day=323

## Day 324 — Digital Music - Sound in the Digital Age
- Learning objective: Explore digital audio while understanding how digital music enables new forms of expression, global collaboration, and musical innovation.
- Slug: digital-music-sound-in-the-digital-age
- Files:
  - Normalized: data/digital-music-sound-in-the-digital-age_normalized.json
  - PhaseDNA: data/digital-music-sound-in-the-digital-age.en.phased.json, data/digital-music-sound-in-the-digital-age.es.phased.json, data/digital-music-sound-in-the-digital-age.fr.phased.json
  - TTS jobs: data/tts_jobs/digital-music-sound-in-the-digital-age.en.json, data/tts_jobs/digital-music-sound-in-the-digital-age.es.json, data/tts_jobs/digital-music-sound-in-the-digital-age.fr.json
- Subtasks:
  - [ ] Author normalized DNA source → data/digital-music-sound-in-the-digital-age_normalized.json
  - [ ] Generate PhaseDNA v1 (en + clone es/fr) → data/digital-music-sound-in-the-digital-age.en|es|fr.phased.json (cmd: node scripts/generate-phased-from-normalized.js --input data/digital-music-sound-in-the-digital-age_normalized.json --outbase data/digital-music-sound-in-the-digital-age --lang en --clone-es-fr)
  - [ ] Extract TTS jobs (per-phase narration) for en/es/fr → data/tts_jobs/digital-music-sound-in-the-digital-age.en|es|fr.json (cmd: node scripts/extract-tts-jobs.js --slugs digital-music-sound-in-the-digital-age --langs en,es,fr --in data --out data/tts_jobs)
  - [ ] Validate PhaseDNA shape and TTS jobs presence → npm run validate
  - [ ] Ensure day-to-slug resolver loads this lesson in index.html → Update getDNALessonData to include this day or general resolver
  - [ ] Attach minimal avatar cues/moods per phase (optional) → Edit phased JSON: phases[].avatar.cues
  - [ ] Quick review of es/fr clones for obvious issues → data/digital-music-sound-in-the-digital-age.es|fr.phased.json
  - [ ] Enable prefetch of next-phase TTS during playback → Player optimization (once globally implemented)
  - [ ] QA in index.html: phase texts render, TTS plays, interactions flow → Open index.html?day=324

## Day 325 — Sustainable Food Systems - Feeding the World
- Learning objective: Practice food systems thinking while understanding how sustainable food systems enable nutrition, environmental protection, and social equity.
- Slug: sustainable-food-systems-feeding-the-world
- Files:
  - Normalized: data/sustainable-food-systems-feeding-the-world_normalized.json
  - PhaseDNA: data/sustainable-food-systems-feeding-the-world.en.phased.json, data/sustainable-food-systems-feeding-the-world.es.phased.json, data/sustainable-food-systems-feeding-the-world.fr.phased.json
  - TTS jobs: data/tts_jobs/sustainable-food-systems-feeding-the-world.en.json, data/tts_jobs/sustainable-food-systems-feeding-the-world.es.json, data/tts_jobs/sustainable-food-systems-feeding-the-world.fr.json
- Subtasks:
  - [ ] Author normalized DNA source → data/sustainable-food-systems-feeding-the-world_normalized.json
  - [ ] Generate PhaseDNA v1 (en + clone es/fr) → data/sustainable-food-systems-feeding-the-world.en|es|fr.phased.json (cmd: node scripts/generate-phased-from-normalized.js --input data/sustainable-food-systems-feeding-the-world_normalized.json --outbase data/sustainable-food-systems-feeding-the-world --lang en --clone-es-fr)
  - [ ] Extract TTS jobs (per-phase narration) for en/es/fr → data/tts_jobs/sustainable-food-systems-feeding-the-world.en|es|fr.json (cmd: node scripts/extract-tts-jobs.js --slugs sustainable-food-systems-feeding-the-world --langs en,es,fr --in data --out data/tts_jobs)
  - [ ] Validate PhaseDNA shape and TTS jobs presence → npm run validate
  - [ ] Ensure day-to-slug resolver loads this lesson in index.html → Update getDNALessonData to include this day or general resolver
  - [ ] Attach minimal avatar cues/moods per phase (optional) → Edit phased JSON: phases[].avatar.cues
  - [ ] Quick review of es/fr clones for obvious issues → data/sustainable-food-systems-feeding-the-world.es|fr.phased.json
  - [ ] Enable prefetch of next-phase TTS during playback → Player optimization (once globally implemented)
  - [ ] QA in index.html: phase texts render, TTS plays, interactions flow → Open index.html?day=325

## Day 326 — Digital Storytelling - Narratives in the Digital Age
- Learning objective: Practice digital narrative while understanding how digital storytelling enables cultural expression, education, and social change.
- Slug: digital-storytelling-narratives-in-the-digital-age
- Files:
  - Normalized: data/digital-storytelling-narratives-in-the-digital-age_normalized.json
  - PhaseDNA: data/digital-storytelling-narratives-in-the-digital-age.en.phased.json, data/digital-storytelling-narratives-in-the-digital-age.es.phased.json, data/digital-storytelling-narratives-in-the-digital-age.fr.phased.json
  - TTS jobs: data/tts_jobs/digital-storytelling-narratives-in-the-digital-age.en.json, data/tts_jobs/digital-storytelling-narratives-in-the-digital-age.es.json, data/tts_jobs/digital-storytelling-narratives-in-the-digital-age.fr.json
- Subtasks:
  - [ ] Author normalized DNA source → data/digital-storytelling-narratives-in-the-digital-age_normalized.json
  - [ ] Generate PhaseDNA v1 (en + clone es/fr) → data/digital-storytelling-narratives-in-the-digital-age.en|es|fr.phased.json (cmd: node scripts/generate-phased-from-normalized.js --input data/digital-storytelling-narratives-in-the-digital-age_normalized.json --outbase data/digital-storytelling-narratives-in-the-digital-age --lang en --clone-es-fr)
  - [ ] Extract TTS jobs (per-phase narration) for en/es/fr → data/tts_jobs/digital-storytelling-narratives-in-the-digital-age.en|es|fr.json (cmd: node scripts/extract-tts-jobs.js --slugs digital-storytelling-narratives-in-the-digital-age --langs en,es,fr --in data --out data/tts_jobs)
  - [ ] Validate PhaseDNA shape and TTS jobs presence → npm run validate
  - [ ] Ensure day-to-slug resolver loads this lesson in index.html → Update getDNALessonData to include this day or general resolver
  - [ ] Attach minimal avatar cues/moods per phase (optional) → Edit phased JSON: phases[].avatar.cues
  - [ ] Quick review of es/fr clones for obvious issues → data/digital-storytelling-narratives-in-the-digital-age.es|fr.phased.json
  - [ ] Enable prefetch of next-phase TTS during playback → Player optimization (once globally implemented)
  - [ ] QA in index.html: phase texts render, TTS plays, interactions flow → Open index.html?day=326

## Day 327 — Sustainable Energy - Powering the Future
- Learning objective: Explore renewable energy while understanding how sustainable energy enables climate action, energy independence, and economic transformation.
- Slug: sustainable-energy-powering-the-future
- Files:
  - Normalized: data/sustainable-energy-powering-the-future_normalized.json
  - PhaseDNA: data/sustainable-energy-powering-the-future.en.phased.json, data/sustainable-energy-powering-the-future.es.phased.json, data/sustainable-energy-powering-the-future.fr.phased.json
  - TTS jobs: data/tts_jobs/sustainable-energy-powering-the-future.en.json, data/tts_jobs/sustainable-energy-powering-the-future.es.json, data/tts_jobs/sustainable-energy-powering-the-future.fr.json
- Subtasks:
  - [ ] Author normalized DNA source → data/sustainable-energy-powering-the-future_normalized.json
  - [ ] Generate PhaseDNA v1 (en + clone es/fr) → data/sustainable-energy-powering-the-future.en|es|fr.phased.json (cmd: node scripts/generate-phased-from-normalized.js --input data/sustainable-energy-powering-the-future_normalized.json --outbase data/sustainable-energy-powering-the-future --lang en --clone-es-fr)
  - [ ] Extract TTS jobs (per-phase narration) for en/es/fr → data/tts_jobs/sustainable-energy-powering-the-future.en|es|fr.json (cmd: node scripts/extract-tts-jobs.js --slugs sustainable-energy-powering-the-future --langs en,es,fr --in data --out data/tts_jobs)
  - [ ] Validate PhaseDNA shape and TTS jobs presence → npm run validate
  - [ ] Ensure day-to-slug resolver loads this lesson in index.html → Update getDNALessonData to include this day or general resolver
  - [ ] Attach minimal avatar cues/moods per phase (optional) → Edit phased JSON: phases[].avatar.cues
  - [ ] Quick review of es/fr clones for obvious issues → data/sustainable-energy-powering-the-future.es|fr.phased.json
  - [ ] Enable prefetch of next-phase TTS during playback → Player optimization (once globally implemented)
  - [ ] QA in index.html: phase texts render, TTS plays, interactions flow → Open index.html?day=327

## Day 328 — Digital Photography - Capturing Light Digitally
- Learning objective: Practice digital imaging while understanding how digital photography enables artistic expression, documentation, and visual communication.
- Slug: digital-photography-capturing-light-digitally
- Files:
  - Normalized: data/digital-photography-capturing-light-digitally_normalized.json
  - PhaseDNA: data/digital-photography-capturing-light-digitally.en.phased.json, data/digital-photography-capturing-light-digitally.es.phased.json, data/digital-photography-capturing-light-digitally.fr.phased.json
  - TTS jobs: data/tts_jobs/digital-photography-capturing-light-digitally.en.json, data/tts_jobs/digital-photography-capturing-light-digitally.es.json, data/tts_jobs/digital-photography-capturing-light-digitally.fr.json
- Subtasks:
  - [ ] Author normalized DNA source → data/digital-photography-capturing-light-digitally_normalized.json
  - [ ] Generate PhaseDNA v1 (en + clone es/fr) → data/digital-photography-capturing-light-digitally.en|es|fr.phased.json (cmd: node scripts/generate-phased-from-normalized.js --input data/digital-photography-capturing-light-digitally_normalized.json --outbase data/digital-photography-capturing-light-digitally --lang en --clone-es-fr)
  - [ ] Extract TTS jobs (per-phase narration) for en/es/fr → data/tts_jobs/digital-photography-capturing-light-digitally.en|es|fr.json (cmd: node scripts/extract-tts-jobs.js --slugs digital-photography-capturing-light-digitally --langs en,es,fr --in data --out data/tts_jobs)
  - [ ] Validate PhaseDNA shape and TTS jobs presence → npm run validate
  - [ ] Ensure day-to-slug resolver loads this lesson in index.html → Update getDNALessonData to include this day or general resolver
  - [ ] Attach minimal avatar cues/moods per phase (optional) → Edit phased JSON: phases[].avatar.cues
  - [ ] Quick review of es/fr clones for obvious issues → data/digital-photography-capturing-light-digitally.es|fr.phased.json
  - [ ] Enable prefetch of next-phase TTS during playback → Player optimization (once globally implemented)
  - [ ] QA in index.html: phase texts render, TTS plays, interactions flow → Open index.html?day=328

## Day 329 — Sustainable Transportation - Moving People and Goods
- Learning objective: Practice transportation planning while understanding how sustainable mobility enables climate action, public health, and urban livability.
- Slug: sustainable-transportation-moving-people-and-goods
- Files:
  - Normalized: data/sustainable-transportation-moving-people-and-goods_normalized.json
  - PhaseDNA: data/sustainable-transportation-moving-people-and-goods.en.phased.json, data/sustainable-transportation-moving-people-and-goods.es.phased.json, data/sustainable-transportation-moving-people-and-goods.fr.phased.json
  - TTS jobs: data/tts_jobs/sustainable-transportation-moving-people-and-goods.en.json, data/tts_jobs/sustainable-transportation-moving-people-and-goods.es.json, data/tts_jobs/sustainable-transportation-moving-people-and-goods.fr.json
- Subtasks:
  - [ ] Author normalized DNA source → data/sustainable-transportation-moving-people-and-goods_normalized.json
  - [ ] Generate PhaseDNA v1 (en + clone es/fr) → data/sustainable-transportation-moving-people-and-goods.en|es|fr.phased.json (cmd: node scripts/generate-phased-from-normalized.js --input data/sustainable-transportation-moving-people-and-goods_normalized.json --outbase data/sustainable-transportation-moving-people-and-goods --lang en --clone-es-fr)
  - [ ] Extract TTS jobs (per-phase narration) for en/es/fr → data/tts_jobs/sustainable-transportation-moving-people-and-goods.en|es|fr.json (cmd: node scripts/extract-tts-jobs.js --slugs sustainable-transportation-moving-people-and-goods --langs en,es,fr --in data --out data/tts_jobs)
  - [ ] Validate PhaseDNA shape and TTS jobs presence → npm run validate
  - [ ] Ensure day-to-slug resolver loads this lesson in index.html → Update getDNALessonData to include this day or general resolver
  - [ ] Attach minimal avatar cues/moods per phase (optional) → Edit phased JSON: phases[].avatar.cues
  - [ ] Quick review of es/fr clones for obvious issues → data/sustainable-transportation-moving-people-and-goods.es|fr.phased.json
  - [ ] Enable prefetch of next-phase TTS during playback → Player optimization (once globally implemented)
  - [ ] QA in index.html: phase texts render, TTS plays, interactions flow → Open index.html?day=329

## Day 330 — Digital Design - Creating in the Digital Age
- Learning objective: Practice digital creation while understanding how digital design enables user experience, visual communication, and interactive media.
- Slug: digital-design-creating-in-the-digital-age
- Files:
  - Normalized: data/digital-design-creating-in-the-digital-age_normalized.json
  - PhaseDNA: data/digital-design-creating-in-the-digital-age.en.phased.json, data/digital-design-creating-in-the-digital-age.es.phased.json, data/digital-design-creating-in-the-digital-age.fr.phased.json
  - TTS jobs: data/tts_jobs/digital-design-creating-in-the-digital-age.en.json, data/tts_jobs/digital-design-creating-in-the-digital-age.es.json, data/tts_jobs/digital-design-creating-in-the-digital-age.fr.json
- Subtasks:
  - [ ] Author normalized DNA source → data/digital-design-creating-in-the-digital-age_normalized.json
  - [ ] Generate PhaseDNA v1 (en + clone es/fr) → data/digital-design-creating-in-the-digital-age.en|es|fr.phased.json (cmd: node scripts/generate-phased-from-normalized.js --input data/digital-design-creating-in-the-digital-age_normalized.json --outbase data/digital-design-creating-in-the-digital-age --lang en --clone-es-fr)
  - [ ] Extract TTS jobs (per-phase narration) for en/es/fr → data/tts_jobs/digital-design-creating-in-the-digital-age.en|es|fr.json (cmd: node scripts/extract-tts-jobs.js --slugs digital-design-creating-in-the-digital-age --langs en,es,fr --in data --out data/tts_jobs)
  - [ ] Validate PhaseDNA shape and TTS jobs presence → npm run validate
  - [ ] Ensure day-to-slug resolver loads this lesson in index.html → Update getDNALessonData to include this day or general resolver
  - [ ] Attach minimal avatar cues/moods per phase (optional) → Edit phased JSON: phases[].avatar.cues
  - [ ] Quick review of es/fr clones for obvious issues → data/digital-design-creating-in-the-digital-age.es|fr.phased.json
  - [ ] Enable prefetch of next-phase TTS during playback → Player optimization (once globally implemented)
  - [ ] QA in index.html: phase texts render, TTS plays, interactions flow → Open index.html?day=330

## Day 331 — Sustainable Cities - Urban Living for the Future
- Learning objective: Practice urban planning while understanding how sustainable cities enable quality of life, environmental protection, and social equity.
- Slug: sustainable-cities-urban-living-for-the-future
- Files:
  - Normalized: data/sustainable-cities-urban-living-for-the-future_normalized.json
  - PhaseDNA: data/sustainable-cities-urban-living-for-the-future.en.phased.json, data/sustainable-cities-urban-living-for-the-future.es.phased.json, data/sustainable-cities-urban-living-for-the-future.fr.phased.json
  - TTS jobs: data/tts_jobs/sustainable-cities-urban-living-for-the-future.en.json, data/tts_jobs/sustainable-cities-urban-living-for-the-future.es.json, data/tts_jobs/sustainable-cities-urban-living-for-the-future.fr.json
- Subtasks:
  - [ ] Author normalized DNA source → data/sustainable-cities-urban-living-for-the-future_normalized.json
  - [ ] Generate PhaseDNA v1 (en + clone es/fr) → data/sustainable-cities-urban-living-for-the-future.en|es|fr.phased.json (cmd: node scripts/generate-phased-from-normalized.js --input data/sustainable-cities-urban-living-for-the-future_normalized.json --outbase data/sustainable-cities-urban-living-for-the-future --lang en --clone-es-fr)
  - [ ] Extract TTS jobs (per-phase narration) for en/es/fr → data/tts_jobs/sustainable-cities-urban-living-for-the-future.en|es|fr.json (cmd: node scripts/extract-tts-jobs.js --slugs sustainable-cities-urban-living-for-the-future --langs en,es,fr --in data --out data/tts_jobs)
  - [ ] Validate PhaseDNA shape and TTS jobs presence → npm run validate
  - [ ] Ensure day-to-slug resolver loads this lesson in index.html → Update getDNALessonData to include this day or general resolver
  - [ ] Attach minimal avatar cues/moods per phase (optional) → Edit phased JSON: phases[].avatar.cues
  - [ ] Quick review of es/fr clones for obvious issues → data/sustainable-cities-urban-living-for-the-future.es|fr.phased.json
  - [ ] Enable prefetch of next-phase TTS during playback → Player optimization (once globally implemented)
  - [ ] QA in index.html: phase texts render, TTS plays, interactions flow → Open index.html?day=331

## Day 332 — Digital Marketing - Connecting in the Digital Age
- Learning objective: Practice digital communication while understanding how digital marketing enables business growth, customer engagement, and brand building.
- Slug: digital-marketing-connecting-in-the-digital-age
- Files:
  - Normalized: data/digital-marketing-connecting-in-the-digital-age_normalized.json
  - PhaseDNA: data/digital-marketing-connecting-in-the-digital-age.en.phased.json, data/digital-marketing-connecting-in-the-digital-age.es.phased.json, data/digital-marketing-connecting-in-the-digital-age.fr.phased.json
  - TTS jobs: data/tts_jobs/digital-marketing-connecting-in-the-digital-age.en.json, data/tts_jobs/digital-marketing-connecting-in-the-digital-age.es.json, data/tts_jobs/digital-marketing-connecting-in-the-digital-age.fr.json
- Subtasks:
  - [ ] Author normalized DNA source → data/digital-marketing-connecting-in-the-digital-age_normalized.json
  - [ ] Generate PhaseDNA v1 (en + clone es/fr) → data/digital-marketing-connecting-in-the-digital-age.en|es|fr.phased.json (cmd: node scripts/generate-phased-from-normalized.js --input data/digital-marketing-connecting-in-the-digital-age_normalized.json --outbase data/digital-marketing-connecting-in-the-digital-age --lang en --clone-es-fr)
  - [ ] Extract TTS jobs (per-phase narration) for en/es/fr → data/tts_jobs/digital-marketing-connecting-in-the-digital-age.en|es|fr.json (cmd: node scripts/extract-tts-jobs.js --slugs digital-marketing-connecting-in-the-digital-age --langs en,es,fr --in data --out data/tts_jobs)
  - [ ] Validate PhaseDNA shape and TTS jobs presence → npm run validate
  - [ ] Ensure day-to-slug resolver loads this lesson in index.html → Update getDNALessonData to include this day or general resolver
  - [ ] Attach minimal avatar cues/moods per phase (optional) → Edit phased JSON: phases[].avatar.cues
  - [ ] Quick review of es/fr clones for obvious issues → data/digital-marketing-connecting-in-the-digital-age.es|fr.phased.json
  - [ ] Enable prefetch of next-phase TTS during playback → Player optimization (once globally implemented)
  - [ ] QA in index.html: phase texts render, TTS plays, interactions flow → Open index.html?day=332

## Day 333 — Sustainable Business - Profit with Purpose
- Learning objective: Practice ethical business while understanding how sustainable business enables environmental protection, social equity, and long-term value creation.
- Slug: sustainable-business-profit-with-purpose
- Files:
  - Normalized: data/sustainable-business-profit-with-purpose_normalized.json
  - PhaseDNA: data/sustainable-business-profit-with-purpose.en.phased.json, data/sustainable-business-profit-with-purpose.es.phased.json, data/sustainable-business-profit-with-purpose.fr.phased.json
  - TTS jobs: data/tts_jobs/sustainable-business-profit-with-purpose.en.json, data/tts_jobs/sustainable-business-profit-with-purpose.es.json, data/tts_jobs/sustainable-business-profit-with-purpose.fr.json
- Subtasks:
  - [ ] Author normalized DNA source → data/sustainable-business-profit-with-purpose_normalized.json
  - [ ] Generate PhaseDNA v1 (en + clone es/fr) → data/sustainable-business-profit-with-purpose.en|es|fr.phased.json (cmd: node scripts/generate-phased-from-normalized.js --input data/sustainable-business-profit-with-purpose_normalized.json --outbase data/sustainable-business-profit-with-purpose --lang en --clone-es-fr)
  - [ ] Extract TTS jobs (per-phase narration) for en/es/fr → data/tts_jobs/sustainable-business-profit-with-purpose.en|es|fr.json (cmd: node scripts/extract-tts-jobs.js --slugs sustainable-business-profit-with-purpose --langs en,es,fr --in data --out data/tts_jobs)
  - [ ] Validate PhaseDNA shape and TTS jobs presence → npm run validate
  - [ ] Ensure day-to-slug resolver loads this lesson in index.html → Update getDNALessonData to include this day or general resolver
  - [ ] Attach minimal avatar cues/moods per phase (optional) → Edit phased JSON: phases[].avatar.cues
  - [ ] Quick review of es/fr clones for obvious issues → data/sustainable-business-profit-with-purpose.es|fr.phased.json
  - [ ] Enable prefetch of next-phase TTS during playback → Player optimization (once globally implemented)
  - [ ] QA in index.html: phase texts render, TTS plays, interactions flow → Open index.html?day=333

## Day 334 — Digital Journalism - News in the Digital Age
- Learning objective: Practice digital reporting while understanding how digital journalism enables information sharing, public accountability, and democratic discourse.
- Slug: digital-journalism-news-in-the-digital-age
- Files:
  - Normalized: data/digital-journalism-news-in-the-digital-age_normalized.json
  - PhaseDNA: data/digital-journalism-news-in-the-digital-age.en.phased.json, data/digital-journalism-news-in-the-digital-age.es.phased.json, data/digital-journalism-news-in-the-digital-age.fr.phased.json
  - TTS jobs: data/tts_jobs/digital-journalism-news-in-the-digital-age.en.json, data/tts_jobs/digital-journalism-news-in-the-digital-age.es.json, data/tts_jobs/digital-journalism-news-in-the-digital-age.fr.json
- Subtasks:
  - [ ] Author normalized DNA source → data/digital-journalism-news-in-the-digital-age_normalized.json
  - [ ] Generate PhaseDNA v1 (en + clone es/fr) → data/digital-journalism-news-in-the-digital-age.en|es|fr.phased.json (cmd: node scripts/generate-phased-from-normalized.js --input data/digital-journalism-news-in-the-digital-age_normalized.json --outbase data/digital-journalism-news-in-the-digital-age --lang en --clone-es-fr)
  - [ ] Extract TTS jobs (per-phase narration) for en/es/fr → data/tts_jobs/digital-journalism-news-in-the-digital-age.en|es|fr.json (cmd: node scripts/extract-tts-jobs.js --slugs digital-journalism-news-in-the-digital-age --langs en,es,fr --in data --out data/tts_jobs)
  - [ ] Validate PhaseDNA shape and TTS jobs presence → npm run validate
  - [ ] Ensure day-to-slug resolver loads this lesson in index.html → Update getDNALessonData to include this day or general resolver
  - [ ] Attach minimal avatar cues/moods per phase (optional) → Edit phased JSON: phases[].avatar.cues
  - [ ] Quick review of es/fr clones for obvious issues → data/digital-journalism-news-in-the-digital-age.es|fr.phased.json
  - [ ] Enable prefetch of next-phase TTS during playback → Player optimization (once globally implemented)
  - [ ] QA in index.html: phase texts render, TTS plays, interactions flow → Open index.html?day=334

## Day 335 — Sustainable Development - Meeting Today's Needs
- Learning objective: Practice development thinking while understanding how sustainable development enables human flourishing, environmental protection, and social equity.
- Slug: sustainable-development-meeting-todays-needs
- Files:
  - Normalized: data/sustainable-development-meeting-todays-needs_normalized.json
  - PhaseDNA: data/sustainable-development-meeting-todays-needs.en.phased.json, data/sustainable-development-meeting-todays-needs.es.phased.json, data/sustainable-development-meeting-todays-needs.fr.phased.json
  - TTS jobs: data/tts_jobs/sustainable-development-meeting-todays-needs.en.json, data/tts_jobs/sustainable-development-meeting-todays-needs.es.json, data/tts_jobs/sustainable-development-meeting-todays-needs.fr.json
- Subtasks:
  - [ ] Author normalized DNA source → data/sustainable-development-meeting-todays-needs_normalized.json
  - [ ] Generate PhaseDNA v1 (en + clone es/fr) → data/sustainable-development-meeting-todays-needs.en|es|fr.phased.json (cmd: node scripts/generate-phased-from-normalized.js --input data/sustainable-development-meeting-todays-needs_normalized.json --outbase data/sustainable-development-meeting-todays-needs --lang en --clone-es-fr)
  - [ ] Extract TTS jobs (per-phase narration) for en/es/fr → data/tts_jobs/sustainable-development-meeting-todays-needs.en|es|fr.json (cmd: node scripts/extract-tts-jobs.js --slugs sustainable-development-meeting-todays-needs --langs en,es,fr --in data --out data/tts_jobs)
  - [ ] Validate PhaseDNA shape and TTS jobs presence → npm run validate
  - [ ] Ensure day-to-slug resolver loads this lesson in index.html → Update getDNALessonData to include this day or general resolver
  - [ ] Attach minimal avatar cues/moods per phase (optional) → Edit phased JSON: phases[].avatar.cues
  - [ ] Quick review of es/fr clones for obvious issues → data/sustainable-development-meeting-todays-needs.es|fr.phased.json
  - [ ] Enable prefetch of next-phase TTS during playback → Player optimization (once globally implemented)
  - [ ] QA in index.html: phase texts render, TTS plays, interactions flow → Open index.html?day=335

## Day 336 — Digital Ethics - Values in the Digital Age
- Learning objective: Practice ethical technology while understanding how digital ethics enables responsible innovation, privacy protection, and democratic values.
- Slug: digital-ethics-values-in-the-digital-age
- Files:
  - Normalized: data/digital-ethics-values-in-the-digital-age_normalized.json
  - PhaseDNA: data/digital-ethics-values-in-the-digital-age.en.phased.json, data/digital-ethics-values-in-the-digital-age.es.phased.json, data/digital-ethics-values-in-the-digital-age.fr.phased.json
  - TTS jobs: data/tts_jobs/digital-ethics-values-in-the-digital-age.en.json, data/tts_jobs/digital-ethics-values-in-the-digital-age.es.json, data/tts_jobs/digital-ethics-values-in-the-digital-age.fr.json
- Subtasks:
  - [ ] Author normalized DNA source → data/digital-ethics-values-in-the-digital-age_normalized.json
  - [ ] Generate PhaseDNA v1 (en + clone es/fr) → data/digital-ethics-values-in-the-digital-age.en|es|fr.phased.json (cmd: node scripts/generate-phased-from-normalized.js --input data/digital-ethics-values-in-the-digital-age_normalized.json --outbase data/digital-ethics-values-in-the-digital-age --lang en --clone-es-fr)
  - [ ] Extract TTS jobs (per-phase narration) for en/es/fr → data/tts_jobs/digital-ethics-values-in-the-digital-age.en|es|fr.json (cmd: node scripts/extract-tts-jobs.js --slugs digital-ethics-values-in-the-digital-age --langs en,es,fr --in data --out data/tts_jobs)
  - [ ] Validate PhaseDNA shape and TTS jobs presence → npm run validate
  - [ ] Ensure day-to-slug resolver loads this lesson in index.html → Update getDNALessonData to include this day or general resolver
  - [ ] Attach minimal avatar cues/moods per phase (optional) → Edit phased JSON: phases[].avatar.cues
  - [ ] Quick review of es/fr clones for obvious issues → data/digital-ethics-values-in-the-digital-age.es|fr.phased.json
  - [ ] Enable prefetch of next-phase TTS during playback → Player optimization (once globally implemented)
  - [ ] QA in index.html: phase texts render, TTS plays, interactions flow → Open index.html?day=336

## Day 337 — Sustainable Innovation - Creating Without Destroying
- Learning objective: Practice sustainable design thinking while understanding how environmental considerations must guide technological development and economic systems.
- Slug: sustainable-innovation-creating-without-destroying
- Files:
  - Normalized: data/sustainable-innovation-creating-without-destroying_normalized.json
  - PhaseDNA: data/sustainable-innovation-creating-without-destroying.en.phased.json, data/sustainable-innovation-creating-without-destroying.es.phased.json, data/sustainable-innovation-creating-without-destroying.fr.phased.json
  - TTS jobs: data/tts_jobs/sustainable-innovation-creating-without-destroying.en.json, data/tts_jobs/sustainable-innovation-creating-without-destroying.es.json, data/tts_jobs/sustainable-innovation-creating-without-destroying.fr.json
- Subtasks:
  - [ ] Author normalized DNA source → data/sustainable-innovation-creating-without-destroying_normalized.json
  - [ ] Generate PhaseDNA v1 (en + clone es/fr) → data/sustainable-innovation-creating-without-destroying.en|es|fr.phased.json (cmd: node scripts/generate-phased-from-normalized.js --input data/sustainable-innovation-creating-without-destroying_normalized.json --outbase data/sustainable-innovation-creating-without-destroying --lang en --clone-es-fr)
  - [ ] Extract TTS jobs (per-phase narration) for en/es/fr → data/tts_jobs/sustainable-innovation-creating-without-destroying.en|es|fr.json (cmd: node scripts/extract-tts-jobs.js --slugs sustainable-innovation-creating-without-destroying --langs en,es,fr --in data --out data/tts_jobs)
  - [ ] Validate PhaseDNA shape and TTS jobs presence → npm run validate
  - [ ] Ensure day-to-slug resolver loads this lesson in index.html → Update getDNALessonData to include this day or general resolver
  - [ ] Attach minimal avatar cues/moods per phase (optional) → Edit phased JSON: phases[].avatar.cues
  - [ ] Quick review of es/fr clones for obvious issues → data/sustainable-innovation-creating-without-destroying.es|fr.phased.json
  - [ ] Enable prefetch of next-phase TTS during playback → Player optimization (once globally implemented)
  - [ ] QA in index.html: phase texts render, TTS plays, interactions flow → Open index.html?day=337

## Day 338 — Digital Literacy - Navigating the Information Age
- Learning objective: Practice critical thinking while understanding how digital literacy enables informed citizenship, media literacy, and online safety.
- Slug: digital-literacy-navigating-the-information-age
- Files:
  - Normalized: data/digital-literacy-navigating-the-information-age_normalized.json
  - PhaseDNA: data/digital-literacy-navigating-the-information-age.en.phased.json, data/digital-literacy-navigating-the-information-age.es.phased.json, data/digital-literacy-navigating-the-information-age.fr.phased.json
  - TTS jobs: data/tts_jobs/digital-literacy-navigating-the-information-age.en.json, data/tts_jobs/digital-literacy-navigating-the-information-age.es.json, data/tts_jobs/digital-literacy-navigating-the-information-age.fr.json
- Subtasks:
  - [ ] Author normalized DNA source → data/digital-literacy-navigating-the-information-age_normalized.json
  - [ ] Generate PhaseDNA v1 (en + clone es/fr) → data/digital-literacy-navigating-the-information-age.en|es|fr.phased.json (cmd: node scripts/generate-phased-from-normalized.js --input data/digital-literacy-navigating-the-information-age_normalized.json --outbase data/digital-literacy-navigating-the-information-age --lang en --clone-es-fr)
  - [ ] Extract TTS jobs (per-phase narration) for en/es/fr → data/tts_jobs/digital-literacy-navigating-the-information-age.en|es|fr.json (cmd: node scripts/extract-tts-jobs.js --slugs digital-literacy-navigating-the-information-age --langs en,es,fr --in data --out data/tts_jobs)
  - [ ] Validate PhaseDNA shape and TTS jobs presence → npm run validate
  - [ ] Ensure day-to-slug resolver loads this lesson in index.html → Update getDNALessonData to include this day or general resolver
  - [ ] Attach minimal avatar cues/moods per phase (optional) → Edit phased JSON: phases[].avatar.cues
  - [ ] Quick review of es/fr clones for obvious issues → data/digital-literacy-navigating-the-information-age.es|fr.phased.json
  - [ ] Enable prefetch of next-phase TTS during playback → Player optimization (once globally implemented)
  - [ ] QA in index.html: phase texts render, TTS plays, interactions flow → Open index.html?day=338

## Day 339 — Sustainable Finance - Money for a Better World
- Learning objective: Practice ethical finance while understanding how sustainable finance enables climate action, social equity, and democratic economic systems.
- Slug: sustainable-finance-money-for-a-better-world
- Files:
  - Normalized: data/sustainable-finance-money-for-a-better-world_normalized.json
  - PhaseDNA: data/sustainable-finance-money-for-a-better-world.en.phased.json, data/sustainable-finance-money-for-a-better-world.es.phased.json, data/sustainable-finance-money-for-a-better-world.fr.phased.json
  - TTS jobs: data/tts_jobs/sustainable-finance-money-for-a-better-world.en.json, data/tts_jobs/sustainable-finance-money-for-a-better-world.es.json, data/tts_jobs/sustainable-finance-money-for-a-better-world.fr.json
- Subtasks:
  - [ ] Author normalized DNA source → data/sustainable-finance-money-for-a-better-world_normalized.json
  - [ ] Generate PhaseDNA v1 (en + clone es/fr) → data/sustainable-finance-money-for-a-better-world.en|es|fr.phased.json (cmd: node scripts/generate-phased-from-normalized.js --input data/sustainable-finance-money-for-a-better-world_normalized.json --outbase data/sustainable-finance-money-for-a-better-world --lang en --clone-es-fr)
  - [ ] Extract TTS jobs (per-phase narration) for en/es/fr → data/tts_jobs/sustainable-finance-money-for-a-better-world.en|es|fr.json (cmd: node scripts/extract-tts-jobs.js --slugs sustainable-finance-money-for-a-better-world --langs en,es,fr --in data --out data/tts_jobs)
  - [ ] Validate PhaseDNA shape and TTS jobs presence → npm run validate
  - [ ] Ensure day-to-slug resolver loads this lesson in index.html → Update getDNALessonData to include this day or general resolver
  - [ ] Attach minimal avatar cues/moods per phase (optional) → Edit phased JSON: phases[].avatar.cues
  - [ ] Quick review of es/fr clones for obvious issues → data/sustainable-finance-money-for-a-better-world.es|fr.phased.json
  - [ ] Enable prefetch of next-phase TTS during playback → Player optimization (once globally implemented)
  - [ ] QA in index.html: phase texts render, TTS plays, interactions flow → Open index.html?day=339

## Day 340 — Digital Transformation - Technology and Organizational Change
- Learning objective: Understand organizational change while exploring how digital transformation affects work, leadership, and organizational culture.
- Slug: digital-transformation-technology-and-organizational-change
- Files:
  - Normalized: data/digital-transformation-technology-and-organizational-change_normalized.json
  - PhaseDNA: data/digital-transformation-technology-and-organizational-change.en.phased.json, data/digital-transformation-technology-and-organizational-change.es.phased.json, data/digital-transformation-technology-and-organizational-change.fr.phased.json
  - TTS jobs: data/tts_jobs/digital-transformation-technology-and-organizational-change.en.json, data/tts_jobs/digital-transformation-technology-and-organizational-change.es.json, data/tts_jobs/digital-transformation-technology-and-organizational-change.fr.json
- Subtasks:
  - [ ] Author normalized DNA source → data/digital-transformation-technology-and-organizational-change_normalized.json
  - [ ] Generate PhaseDNA v1 (en + clone es/fr) → data/digital-transformation-technology-and-organizational-change.en|es|fr.phased.json (cmd: node scripts/generate-phased-from-normalized.js --input data/digital-transformation-technology-and-organizational-change_normalized.json --outbase data/digital-transformation-technology-and-organizational-change --lang en --clone-es-fr)
  - [ ] Extract TTS jobs (per-phase narration) for en/es/fr → data/tts_jobs/digital-transformation-technology-and-organizational-change.en|es|fr.json (cmd: node scripts/extract-tts-jobs.js --slugs digital-transformation-technology-and-organizational-change --langs en,es,fr --in data --out data/tts_jobs)
  - [ ] Validate PhaseDNA shape and TTS jobs presence → npm run validate
  - [ ] Ensure day-to-slug resolver loads this lesson in index.html → Update getDNALessonData to include this day or general resolver
  - [ ] Attach minimal avatar cues/moods per phase (optional) → Edit phased JSON: phases[].avatar.cues
  - [ ] Quick review of es/fr clones for obvious issues → data/digital-transformation-technology-and-organizational-change.es|fr.phased.json
  - [ ] Enable prefetch of next-phase TTS during playback → Player optimization (once globally implemented)
  - [ ] QA in index.html: phase texts render, TTS plays, interactions flow → Open index.html?day=340

## Day 341 — Sustainable Tourism - Traveling Responsibly
- Learning objective: Practice responsible travel while understanding how sustainable tourism enables cultural preservation, environmental protection, and local development.
- Slug: sustainable-tourism-traveling-responsibly
- Files:
  - Normalized: data/sustainable-tourism-traveling-responsibly_normalized.json
  - PhaseDNA: data/sustainable-tourism-traveling-responsibly.en.phased.json, data/sustainable-tourism-traveling-responsibly.es.phased.json, data/sustainable-tourism-traveling-responsibly.fr.phased.json
  - TTS jobs: data/tts_jobs/sustainable-tourism-traveling-responsibly.en.json, data/tts_jobs/sustainable-tourism-traveling-responsibly.es.json, data/tts_jobs/sustainable-tourism-traveling-responsibly.fr.json
- Subtasks:
  - [ ] Author normalized DNA source → data/sustainable-tourism-traveling-responsibly_normalized.json
  - [ ] Generate PhaseDNA v1 (en + clone es/fr) → data/sustainable-tourism-traveling-responsibly.en|es|fr.phased.json (cmd: node scripts/generate-phased-from-normalized.js --input data/sustainable-tourism-traveling-responsibly_normalized.json --outbase data/sustainable-tourism-traveling-responsibly --lang en --clone-es-fr)
  - [ ] Extract TTS jobs (per-phase narration) for en/es/fr → data/tts_jobs/sustainable-tourism-traveling-responsibly.en|es|fr.json (cmd: node scripts/extract-tts-jobs.js --slugs sustainable-tourism-traveling-responsibly --langs en,es,fr --in data --out data/tts_jobs)
  - [ ] Validate PhaseDNA shape and TTS jobs presence → npm run validate
  - [ ] Ensure day-to-slug resolver loads this lesson in index.html → Update getDNALessonData to include this day or general resolver
  - [ ] Attach minimal avatar cues/moods per phase (optional) → Edit phased JSON: phases[].avatar.cues
  - [ ] Quick review of es/fr clones for obvious issues → data/sustainable-tourism-traveling-responsibly.es|fr.phased.json
  - [ ] Enable prefetch of next-phase TTS during playback → Player optimization (once globally implemented)
  - [ ] QA in index.html: phase texts render, TTS plays, interactions flow → Open index.html?day=341

## Day 342 — Digital Art - Creativity in the Digital Age
- Learning objective: Practice digital creativity while understanding how digital art enables new forms of expression, cultural exchange, and artistic innovation.
- Slug: digital-art-creativity-in-the-digital-age
- Files:
  - Normalized: data/digital-art-creativity-in-the-digital-age_normalized.json
  - PhaseDNA: data/digital-art-creativity-in-the-digital-age.en.phased.json, data/digital-art-creativity-in-the-digital-age.es.phased.json, data/digital-art-creativity-in-the-digital-age.fr.phased.json
  - TTS jobs: data/tts_jobs/digital-art-creativity-in-the-digital-age.en.json, data/tts_jobs/digital-art-creativity-in-the-digital-age.es.json, data/tts_jobs/digital-art-creativity-in-the-digital-age.fr.json
- Subtasks:
  - [ ] Author normalized DNA source → data/digital-art-creativity-in-the-digital-age_normalized.json
  - [ ] Generate PhaseDNA v1 (en + clone es/fr) → data/digital-art-creativity-in-the-digital-age.en|es|fr.phased.json (cmd: node scripts/generate-phased-from-normalized.js --input data/digital-art-creativity-in-the-digital-age_normalized.json --outbase data/digital-art-creativity-in-the-digital-age --lang en --clone-es-fr)
  - [ ] Extract TTS jobs (per-phase narration) for en/es/fr → data/tts_jobs/digital-art-creativity-in-the-digital-age.en|es|fr.json (cmd: node scripts/extract-tts-jobs.js --slugs digital-art-creativity-in-the-digital-age --langs en,es,fr --in data --out data/tts_jobs)
  - [ ] Validate PhaseDNA shape and TTS jobs presence → npm run validate
  - [ ] Ensure day-to-slug resolver loads this lesson in index.html → Update getDNALessonData to include this day or general resolver
  - [ ] Attach minimal avatar cues/moods per phase (optional) → Edit phased JSON: phases[].avatar.cues
  - [ ] Quick review of es/fr clones for obvious issues → data/digital-art-creativity-in-the-digital-age.es|fr.phased.json
  - [ ] Enable prefetch of next-phase TTS during playback → Player optimization (once globally implemented)
  - [ ] QA in index.html: phase texts render, TTS plays, interactions flow → Open index.html?day=342

## Day 343 — Sustainable Fashion - Style with a Conscience
- Learning objective: Practice ethical fashion while understanding how sustainable fashion enables environmental protection, fair labor, and circular economy principles.
- Slug: sustainable-fashion-style-with-a-conscience
- Files:
  - Normalized: data/sustainable-fashion-style-with-a-conscience_normalized.json
  - PhaseDNA: data/sustainable-fashion-style-with-a-conscience.en.phased.json, data/sustainable-fashion-style-with-a-conscience.es.phased.json, data/sustainable-fashion-style-with-a-conscience.fr.phased.json
  - TTS jobs: data/tts_jobs/sustainable-fashion-style-with-a-conscience.en.json, data/tts_jobs/sustainable-fashion-style-with-a-conscience.es.json, data/tts_jobs/sustainable-fashion-style-with-a-conscience.fr.json
- Subtasks:
  - [ ] Author normalized DNA source → data/sustainable-fashion-style-with-a-conscience_normalized.json
  - [ ] Generate PhaseDNA v1 (en + clone es/fr) → data/sustainable-fashion-style-with-a-conscience.en|es|fr.phased.json (cmd: node scripts/generate-phased-from-normalized.js --input data/sustainable-fashion-style-with-a-conscience_normalized.json --outbase data/sustainable-fashion-style-with-a-conscience --lang en --clone-es-fr)
  - [ ] Extract TTS jobs (per-phase narration) for en/es/fr → data/tts_jobs/sustainable-fashion-style-with-a-conscience.en|es|fr.json (cmd: node scripts/extract-tts-jobs.js --slugs sustainable-fashion-style-with-a-conscience --langs en,es,fr --in data --out data/tts_jobs)
  - [ ] Validate PhaseDNA shape and TTS jobs presence → npm run validate
  - [ ] Ensure day-to-slug resolver loads this lesson in index.html → Update getDNALessonData to include this day or general resolver
  - [ ] Attach minimal avatar cues/moods per phase (optional) → Edit phased JSON: phases[].avatar.cues
  - [ ] Quick review of es/fr clones for obvious issues → data/sustainable-fashion-style-with-a-conscience.es|fr.phased.json
  - [ ] Enable prefetch of next-phase TTS during playback → Player optimization (once globally implemented)
  - [ ] QA in index.html: phase texts render, TTS plays, interactions flow → Open index.html?day=343

## Day 344 — Digital Archaeology - Technology and the Past
- Learning objective: Explore archaeological technology while understanding how digital archaeology enables cultural preservation, scientific discovery, and public education.
- Slug: digital-archaeology-technology-and-the-past
- Files:
  - Normalized: data/digital-archaeology-technology-and-the-past_normalized.json
  - PhaseDNA: data/digital-archaeology-technology-and-the-past.en.phased.json, data/digital-archaeology-technology-and-the-past.es.phased.json, data/digital-archaeology-technology-and-the-past.fr.phased.json
  - TTS jobs: data/tts_jobs/digital-archaeology-technology-and-the-past.en.json, data/tts_jobs/digital-archaeology-technology-and-the-past.es.json, data/tts_jobs/digital-archaeology-technology-and-the-past.fr.json
- Subtasks:
  - [ ] Author normalized DNA source → data/digital-archaeology-technology-and-the-past_normalized.json
  - [ ] Generate PhaseDNA v1 (en + clone es/fr) → data/digital-archaeology-technology-and-the-past.en|es|fr.phased.json (cmd: node scripts/generate-phased-from-normalized.js --input data/digital-archaeology-technology-and-the-past_normalized.json --outbase data/digital-archaeology-technology-and-the-past --lang en --clone-es-fr)
  - [ ] Extract TTS jobs (per-phase narration) for en/es/fr → data/tts_jobs/digital-archaeology-technology-and-the-past.en|es|fr.json (cmd: node scripts/extract-tts-jobs.js --slugs digital-archaeology-technology-and-the-past --langs en,es,fr --in data --out data/tts_jobs)
  - [ ] Validate PhaseDNA shape and TTS jobs presence → npm run validate
  - [ ] Ensure day-to-slug resolver loads this lesson in index.html → Update getDNALessonData to include this day or general resolver
  - [ ] Attach minimal avatar cues/moods per phase (optional) → Edit phased JSON: phases[].avatar.cues
  - [ ] Quick review of es/fr clones for obvious issues → data/digital-archaeology-technology-and-the-past.es|fr.phased.json
  - [ ] Enable prefetch of next-phase TTS during playback → Player optimization (once globally implemented)
  - [ ] QA in index.html: phase texts render, TTS plays, interactions flow → Open index.html?day=344

## Day 345 — Sustainable Architecture - Building for the Future
- Learning objective: Practice green building while understanding how sustainable architecture enables energy efficiency, environmental protection, and healthy living spaces.
- Slug: sustainable-architecture-building-for-the-future
- Files:
  - Normalized: data/sustainable-architecture-building-for-the-future_normalized.json
  - PhaseDNA: data/sustainable-architecture-building-for-the-future.en.phased.json, data/sustainable-architecture-building-for-the-future.es.phased.json, data/sustainable-architecture-building-for-the-future.fr.phased.json
  - TTS jobs: data/tts_jobs/sustainable-architecture-building-for-the-future.en.json, data/tts_jobs/sustainable-architecture-building-for-the-future.es.json, data/tts_jobs/sustainable-architecture-building-for-the-future.fr.json
- Subtasks:
  - [ ] Author normalized DNA source → data/sustainable-architecture-building-for-the-future_normalized.json
  - [ ] Generate PhaseDNA v1 (en + clone es/fr) → data/sustainable-architecture-building-for-the-future.en|es|fr.phased.json (cmd: node scripts/generate-phased-from-normalized.js --input data/sustainable-architecture-building-for-the-future_normalized.json --outbase data/sustainable-architecture-building-for-the-future --lang en --clone-es-fr)
  - [ ] Extract TTS jobs (per-phase narration) for en/es/fr → data/tts_jobs/sustainable-architecture-building-for-the-future.en|es|fr.json (cmd: node scripts/extract-tts-jobs.js --slugs sustainable-architecture-building-for-the-future --langs en,es,fr --in data --out data/tts_jobs)
  - [ ] Validate PhaseDNA shape and TTS jobs presence → npm run validate
  - [ ] Ensure day-to-slug resolver loads this lesson in index.html → Update getDNALessonData to include this day or general resolver
  - [ ] Attach minimal avatar cues/moods per phase (optional) → Edit phased JSON: phases[].avatar.cues
  - [ ] Quick review of es/fr clones for obvious issues → data/sustainable-architecture-building-for-the-future.es|fr.phased.json
  - [ ] Enable prefetch of next-phase TTS during playback → Player optimization (once globally implemented)
  - [ ] QA in index.html: phase texts render, TTS plays, interactions flow → Open index.html?day=345

## Day 346 — Digital Music - Sound in the Digital Age
- Learning objective: Explore digital audio while understanding how digital music enables new forms of expression, global collaboration, and musical innovation.
- Slug: digital-music-sound-in-the-digital-age
- Files:
  - Normalized: data/digital-music-sound-in-the-digital-age_normalized.json
  - PhaseDNA: data/digital-music-sound-in-the-digital-age.en.phased.json, data/digital-music-sound-in-the-digital-age.es.phased.json, data/digital-music-sound-in-the-digital-age.fr.phased.json
  - TTS jobs: data/tts_jobs/digital-music-sound-in-the-digital-age.en.json, data/tts_jobs/digital-music-sound-in-the-digital-age.es.json, data/tts_jobs/digital-music-sound-in-the-digital-age.fr.json
- Subtasks:
  - [ ] Author normalized DNA source → data/digital-music-sound-in-the-digital-age_normalized.json
  - [ ] Generate PhaseDNA v1 (en + clone es/fr) → data/digital-music-sound-in-the-digital-age.en|es|fr.phased.json (cmd: node scripts/generate-phased-from-normalized.js --input data/digital-music-sound-in-the-digital-age_normalized.json --outbase data/digital-music-sound-in-the-digital-age --lang en --clone-es-fr)
  - [ ] Extract TTS jobs (per-phase narration) for en/es/fr → data/tts_jobs/digital-music-sound-in-the-digital-age.en|es|fr.json (cmd: node scripts/extract-tts-jobs.js --slugs digital-music-sound-in-the-digital-age --langs en,es,fr --in data --out data/tts_jobs)
  - [ ] Validate PhaseDNA shape and TTS jobs presence → npm run validate
  - [ ] Ensure day-to-slug resolver loads this lesson in index.html → Update getDNALessonData to include this day or general resolver
  - [ ] Attach minimal avatar cues/moods per phase (optional) → Edit phased JSON: phases[].avatar.cues
  - [ ] Quick review of es/fr clones for obvious issues → data/digital-music-sound-in-the-digital-age.es|fr.phased.json
  - [ ] Enable prefetch of next-phase TTS during playback → Player optimization (once globally implemented)
  - [ ] QA in index.html: phase texts render, TTS plays, interactions flow → Open index.html?day=346

## Day 347 — Sustainable Food Systems - Feeding the World
- Learning objective: Practice food systems thinking while understanding how sustainable food systems enable nutrition, environmental protection, and social equity.
- Slug: sustainable-food-systems-feeding-the-world
- Files:
  - Normalized: data/sustainable-food-systems-feeding-the-world_normalized.json
  - PhaseDNA: data/sustainable-food-systems-feeding-the-world.en.phased.json, data/sustainable-food-systems-feeding-the-world.es.phased.json, data/sustainable-food-systems-feeding-the-world.fr.phased.json
  - TTS jobs: data/tts_jobs/sustainable-food-systems-feeding-the-world.en.json, data/tts_jobs/sustainable-food-systems-feeding-the-world.es.json, data/tts_jobs/sustainable-food-systems-feeding-the-world.fr.json
- Subtasks:
  - [ ] Author normalized DNA source → data/sustainable-food-systems-feeding-the-world_normalized.json
  - [ ] Generate PhaseDNA v1 (en + clone es/fr) → data/sustainable-food-systems-feeding-the-world.en|es|fr.phased.json (cmd: node scripts/generate-phased-from-normalized.js --input data/sustainable-food-systems-feeding-the-world_normalized.json --outbase data/sustainable-food-systems-feeding-the-world --lang en --clone-es-fr)
  - [ ] Extract TTS jobs (per-phase narration) for en/es/fr → data/tts_jobs/sustainable-food-systems-feeding-the-world.en|es|fr.json (cmd: node scripts/extract-tts-jobs.js --slugs sustainable-food-systems-feeding-the-world --langs en,es,fr --in data --out data/tts_jobs)
  - [ ] Validate PhaseDNA shape and TTS jobs presence → npm run validate
  - [ ] Ensure day-to-slug resolver loads this lesson in index.html → Update getDNALessonData to include this day or general resolver
  - [ ] Attach minimal avatar cues/moods per phase (optional) → Edit phased JSON: phases[].avatar.cues
  - [ ] Quick review of es/fr clones for obvious issues → data/sustainable-food-systems-feeding-the-world.es|fr.phased.json
  - [ ] Enable prefetch of next-phase TTS during playback → Player optimization (once globally implemented)
  - [ ] QA in index.html: phase texts render, TTS plays, interactions flow → Open index.html?day=347

## Day 348 — Digital Storytelling - Narratives in the Digital Age
- Learning objective: Practice digital narrative while understanding how digital storytelling enables cultural expression, education, and social change.
- Slug: digital-storytelling-narratives-in-the-digital-age
- Files:
  - Normalized: data/digital-storytelling-narratives-in-the-digital-age_normalized.json
  - PhaseDNA: data/digital-storytelling-narratives-in-the-digital-age.en.phased.json, data/digital-storytelling-narratives-in-the-digital-age.es.phased.json, data/digital-storytelling-narratives-in-the-digital-age.fr.phased.json
  - TTS jobs: data/tts_jobs/digital-storytelling-narratives-in-the-digital-age.en.json, data/tts_jobs/digital-storytelling-narratives-in-the-digital-age.es.json, data/tts_jobs/digital-storytelling-narratives-in-the-digital-age.fr.json
- Subtasks:
  - [ ] Author normalized DNA source → data/digital-storytelling-narratives-in-the-digital-age_normalized.json
  - [ ] Generate PhaseDNA v1 (en + clone es/fr) → data/digital-storytelling-narratives-in-the-digital-age.en|es|fr.phased.json (cmd: node scripts/generate-phased-from-normalized.js --input data/digital-storytelling-narratives-in-the-digital-age_normalized.json --outbase data/digital-storytelling-narratives-in-the-digital-age --lang en --clone-es-fr)
  - [ ] Extract TTS jobs (per-phase narration) for en/es/fr → data/tts_jobs/digital-storytelling-narratives-in-the-digital-age.en|es|fr.json (cmd: node scripts/extract-tts-jobs.js --slugs digital-storytelling-narratives-in-the-digital-age --langs en,es,fr --in data --out data/tts_jobs)
  - [ ] Validate PhaseDNA shape and TTS jobs presence → npm run validate
  - [ ] Ensure day-to-slug resolver loads this lesson in index.html → Update getDNALessonData to include this day or general resolver
  - [ ] Attach minimal avatar cues/moods per phase (optional) → Edit phased JSON: phases[].avatar.cues
  - [ ] Quick review of es/fr clones for obvious issues → data/digital-storytelling-narratives-in-the-digital-age.es|fr.phased.json
  - [ ] Enable prefetch of next-phase TTS during playback → Player optimization (once globally implemented)
  - [ ] QA in index.html: phase texts render, TTS plays, interactions flow → Open index.html?day=348

## Day 349 — Sustainable Energy - Powering the Future
- Learning objective: Explore renewable energy while understanding how sustainable energy enables climate action, energy independence, and economic transformation.
- Slug: sustainable-energy-powering-the-future
- Files:
  - Normalized: data/sustainable-energy-powering-the-future_normalized.json
  - PhaseDNA: data/sustainable-energy-powering-the-future.en.phased.json, data/sustainable-energy-powering-the-future.es.phased.json, data/sustainable-energy-powering-the-future.fr.phased.json
  - TTS jobs: data/tts_jobs/sustainable-energy-powering-the-future.en.json, data/tts_jobs/sustainable-energy-powering-the-future.es.json, data/tts_jobs/sustainable-energy-powering-the-future.fr.json
- Subtasks:
  - [ ] Author normalized DNA source → data/sustainable-energy-powering-the-future_normalized.json
  - [ ] Generate PhaseDNA v1 (en + clone es/fr) → data/sustainable-energy-powering-the-future.en|es|fr.phased.json (cmd: node scripts/generate-phased-from-normalized.js --input data/sustainable-energy-powering-the-future_normalized.json --outbase data/sustainable-energy-powering-the-future --lang en --clone-es-fr)
  - [ ] Extract TTS jobs (per-phase narration) for en/es/fr → data/tts_jobs/sustainable-energy-powering-the-future.en|es|fr.json (cmd: node scripts/extract-tts-jobs.js --slugs sustainable-energy-powering-the-future --langs en,es,fr --in data --out data/tts_jobs)
  - [ ] Validate PhaseDNA shape and TTS jobs presence → npm run validate
  - [ ] Ensure day-to-slug resolver loads this lesson in index.html → Update getDNALessonData to include this day or general resolver
  - [ ] Attach minimal avatar cues/moods per phase (optional) → Edit phased JSON: phases[].avatar.cues
  - [ ] Quick review of es/fr clones for obvious issues → data/sustainable-energy-powering-the-future.es|fr.phased.json
  - [ ] Enable prefetch of next-phase TTS during playback → Player optimization (once globally implemented)
  - [ ] QA in index.html: phase texts render, TTS plays, interactions flow → Open index.html?day=349

## Day 350 — Digital Photography - Capturing Light Digitally
- Learning objective: Practice digital imaging while understanding how digital photography enables artistic expression, documentation, and visual communication.
- Slug: digital-photography-capturing-light-digitally
- Files:
  - Normalized: data/digital-photography-capturing-light-digitally_normalized.json
  - PhaseDNA: data/digital-photography-capturing-light-digitally.en.phased.json, data/digital-photography-capturing-light-digitally.es.phased.json, data/digital-photography-capturing-light-digitally.fr.phased.json
  - TTS jobs: data/tts_jobs/digital-photography-capturing-light-digitally.en.json, data/tts_jobs/digital-photography-capturing-light-digitally.es.json, data/tts_jobs/digital-photography-capturing-light-digitally.fr.json
- Subtasks:
  - [ ] Author normalized DNA source → data/digital-photography-capturing-light-digitally_normalized.json
  - [ ] Generate PhaseDNA v1 (en + clone es/fr) → data/digital-photography-capturing-light-digitally.en|es|fr.phased.json (cmd: node scripts/generate-phased-from-normalized.js --input data/digital-photography-capturing-light-digitally_normalized.json --outbase data/digital-photography-capturing-light-digitally --lang en --clone-es-fr)
  - [ ] Extract TTS jobs (per-phase narration) for en/es/fr → data/tts_jobs/digital-photography-capturing-light-digitally.en|es|fr.json (cmd: node scripts/extract-tts-jobs.js --slugs digital-photography-capturing-light-digitally --langs en,es,fr --in data --out data/tts_jobs)
  - [ ] Validate PhaseDNA shape and TTS jobs presence → npm run validate
  - [ ] Ensure day-to-slug resolver loads this lesson in index.html → Update getDNALessonData to include this day or general resolver
  - [ ] Attach minimal avatar cues/moods per phase (optional) → Edit phased JSON: phases[].avatar.cues
  - [ ] Quick review of es/fr clones for obvious issues → data/digital-photography-capturing-light-digitally.es|fr.phased.json
  - [ ] Enable prefetch of next-phase TTS during playback → Player optimization (once globally implemented)
  - [ ] QA in index.html: phase texts render, TTS plays, interactions flow → Open index.html?day=350

## Day 351 — Sustainable Transportation - Moving People and Goods
- Learning objective: Practice transportation planning while understanding how sustainable mobility enables climate action, public health, and urban livability.
- Slug: sustainable-transportation-moving-people-and-goods
- Files:
  - Normalized: data/sustainable-transportation-moving-people-and-goods_normalized.json
  - PhaseDNA: data/sustainable-transportation-moving-people-and-goods.en.phased.json, data/sustainable-transportation-moving-people-and-goods.es.phased.json, data/sustainable-transportation-moving-people-and-goods.fr.phased.json
  - TTS jobs: data/tts_jobs/sustainable-transportation-moving-people-and-goods.en.json, data/tts_jobs/sustainable-transportation-moving-people-and-goods.es.json, data/tts_jobs/sustainable-transportation-moving-people-and-goods.fr.json
- Subtasks:
  - [ ] Author normalized DNA source → data/sustainable-transportation-moving-people-and-goods_normalized.json
  - [ ] Generate PhaseDNA v1 (en + clone es/fr) → data/sustainable-transportation-moving-people-and-goods.en|es|fr.phased.json (cmd: node scripts/generate-phased-from-normalized.js --input data/sustainable-transportation-moving-people-and-goods_normalized.json --outbase data/sustainable-transportation-moving-people-and-goods --lang en --clone-es-fr)
  - [ ] Extract TTS jobs (per-phase narration) for en/es/fr → data/tts_jobs/sustainable-transportation-moving-people-and-goods.en|es|fr.json (cmd: node scripts/extract-tts-jobs.js --slugs sustainable-transportation-moving-people-and-goods --langs en,es,fr --in data --out data/tts_jobs)
  - [ ] Validate PhaseDNA shape and TTS jobs presence → npm run validate
  - [ ] Ensure day-to-slug resolver loads this lesson in index.html → Update getDNALessonData to include this day or general resolver
  - [ ] Attach minimal avatar cues/moods per phase (optional) → Edit phased JSON: phases[].avatar.cues
  - [ ] Quick review of es/fr clones for obvious issues → data/sustainable-transportation-moving-people-and-goods.es|fr.phased.json
  - [ ] Enable prefetch of next-phase TTS during playback → Player optimization (once globally implemented)
  - [ ] QA in index.html: phase texts render, TTS plays, interactions flow → Open index.html?day=351

## Day 352 — Digital Design - Creating in the Digital Age
- Learning objective: Practice digital creation while understanding how digital design enables user experience, visual communication, and interactive media.
- Slug: digital-design-creating-in-the-digital-age
- Files:
  - Normalized: data/digital-design-creating-in-the-digital-age_normalized.json
  - PhaseDNA: data/digital-design-creating-in-the-digital-age.en.phased.json, data/digital-design-creating-in-the-digital-age.es.phased.json, data/digital-design-creating-in-the-digital-age.fr.phased.json
  - TTS jobs: data/tts_jobs/digital-design-creating-in-the-digital-age.en.json, data/tts_jobs/digital-design-creating-in-the-digital-age.es.json, data/tts_jobs/digital-design-creating-in-the-digital-age.fr.json
- Subtasks:
  - [ ] Author normalized DNA source → data/digital-design-creating-in-the-digital-age_normalized.json
  - [ ] Generate PhaseDNA v1 (en + clone es/fr) → data/digital-design-creating-in-the-digital-age.en|es|fr.phased.json (cmd: node scripts/generate-phased-from-normalized.js --input data/digital-design-creating-in-the-digital-age_normalized.json --outbase data/digital-design-creating-in-the-digital-age --lang en --clone-es-fr)
  - [ ] Extract TTS jobs (per-phase narration) for en/es/fr → data/tts_jobs/digital-design-creating-in-the-digital-age.en|es|fr.json (cmd: node scripts/extract-tts-jobs.js --slugs digital-design-creating-in-the-digital-age --langs en,es,fr --in data --out data/tts_jobs)
  - [ ] Validate PhaseDNA shape and TTS jobs presence → npm run validate
  - [ ] Ensure day-to-slug resolver loads this lesson in index.html → Update getDNALessonData to include this day or general resolver
  - [ ] Attach minimal avatar cues/moods per phase (optional) → Edit phased JSON: phases[].avatar.cues
  - [ ] Quick review of es/fr clones for obvious issues → data/digital-design-creating-in-the-digital-age.es|fr.phased.json
  - [ ] Enable prefetch of next-phase TTS during playback → Player optimization (once globally implemented)
  - [ ] QA in index.html: phase texts render, TTS plays, interactions flow → Open index.html?day=352

## Day 353 — Sustainable Cities - Urban Living for the Future
- Learning objective: Practice urban planning while understanding how sustainable cities enable quality of life, environmental protection, and social equity.
- Slug: sustainable-cities-urban-living-for-the-future
- Files:
  - Normalized: data/sustainable-cities-urban-living-for-the-future_normalized.json
  - PhaseDNA: data/sustainable-cities-urban-living-for-the-future.en.phased.json, data/sustainable-cities-urban-living-for-the-future.es.phased.json, data/sustainable-cities-urban-living-for-the-future.fr.phased.json
  - TTS jobs: data/tts_jobs/sustainable-cities-urban-living-for-the-future.en.json, data/tts_jobs/sustainable-cities-urban-living-for-the-future.es.json, data/tts_jobs/sustainable-cities-urban-living-for-the-future.fr.json
- Subtasks:
  - [ ] Author normalized DNA source → data/sustainable-cities-urban-living-for-the-future_normalized.json
  - [ ] Generate PhaseDNA v1 (en + clone es/fr) → data/sustainable-cities-urban-living-for-the-future.en|es|fr.phased.json (cmd: node scripts/generate-phased-from-normalized.js --input data/sustainable-cities-urban-living-for-the-future_normalized.json --outbase data/sustainable-cities-urban-living-for-the-future --lang en --clone-es-fr)
  - [ ] Extract TTS jobs (per-phase narration) for en/es/fr → data/tts_jobs/sustainable-cities-urban-living-for-the-future.en|es|fr.json (cmd: node scripts/extract-tts-jobs.js --slugs sustainable-cities-urban-living-for-the-future --langs en,es,fr --in data --out data/tts_jobs)
  - [ ] Validate PhaseDNA shape and TTS jobs presence → npm run validate
  - [ ] Ensure day-to-slug resolver loads this lesson in index.html → Update getDNALessonData to include this day or general resolver
  - [ ] Attach minimal avatar cues/moods per phase (optional) → Edit phased JSON: phases[].avatar.cues
  - [ ] Quick review of es/fr clones for obvious issues → data/sustainable-cities-urban-living-for-the-future.es|fr.phased.json
  - [ ] Enable prefetch of next-phase TTS during playback → Player optimization (once globally implemented)
  - [ ] QA in index.html: phase texts render, TTS plays, interactions flow → Open index.html?day=353

## Day 354 — Digital Marketing - Connecting in the Digital Age
- Learning objective: Practice digital communication while understanding how digital marketing enables business growth, customer engagement, and brand building.
- Slug: digital-marketing-connecting-in-the-digital-age
- Files:
  - Normalized: data/digital-marketing-connecting-in-the-digital-age_normalized.json
  - PhaseDNA: data/digital-marketing-connecting-in-the-digital-age.en.phased.json, data/digital-marketing-connecting-in-the-digital-age.es.phased.json, data/digital-marketing-connecting-in-the-digital-age.fr.phased.json
  - TTS jobs: data/tts_jobs/digital-marketing-connecting-in-the-digital-age.en.json, data/tts_jobs/digital-marketing-connecting-in-the-digital-age.es.json, data/tts_jobs/digital-marketing-connecting-in-the-digital-age.fr.json
- Subtasks:
  - [ ] Author normalized DNA source → data/digital-marketing-connecting-in-the-digital-age_normalized.json
  - [ ] Generate PhaseDNA v1 (en + clone es/fr) → data/digital-marketing-connecting-in-the-digital-age.en|es|fr.phased.json (cmd: node scripts/generate-phased-from-normalized.js --input data/digital-marketing-connecting-in-the-digital-age_normalized.json --outbase data/digital-marketing-connecting-in-the-digital-age --lang en --clone-es-fr)
  - [ ] Extract TTS jobs (per-phase narration) for en/es/fr → data/tts_jobs/digital-marketing-connecting-in-the-digital-age.en|es|fr.json (cmd: node scripts/extract-tts-jobs.js --slugs digital-marketing-connecting-in-the-digital-age --langs en,es,fr --in data --out data/tts_jobs)
  - [ ] Validate PhaseDNA shape and TTS jobs presence → npm run validate
  - [ ] Ensure day-to-slug resolver loads this lesson in index.html → Update getDNALessonData to include this day or general resolver
  - [ ] Attach minimal avatar cues/moods per phase (optional) → Edit phased JSON: phases[].avatar.cues
  - [ ] Quick review of es/fr clones for obvious issues → data/digital-marketing-connecting-in-the-digital-age.es|fr.phased.json
  - [ ] Enable prefetch of next-phase TTS during playback → Player optimization (once globally implemented)
  - [ ] QA in index.html: phase texts render, TTS plays, interactions flow → Open index.html?day=354

## Day 355 — Sustainable Business - Profit with Purpose
- Learning objective: Practice ethical business while understanding how sustainable business enables environmental protection, social equity, and long-term value creation.
- Slug: sustainable-business-profit-with-purpose
- Files:
  - Normalized: data/sustainable-business-profit-with-purpose_normalized.json
  - PhaseDNA: data/sustainable-business-profit-with-purpose.en.phased.json, data/sustainable-business-profit-with-purpose.es.phased.json, data/sustainable-business-profit-with-purpose.fr.phased.json
  - TTS jobs: data/tts_jobs/sustainable-business-profit-with-purpose.en.json, data/tts_jobs/sustainable-business-profit-with-purpose.es.json, data/tts_jobs/sustainable-business-profit-with-purpose.fr.json
- Subtasks:
  - [ ] Author normalized DNA source → data/sustainable-business-profit-with-purpose_normalized.json
  - [ ] Generate PhaseDNA v1 (en + clone es/fr) → data/sustainable-business-profit-with-purpose.en|es|fr.phased.json (cmd: node scripts/generate-phased-from-normalized.js --input data/sustainable-business-profit-with-purpose_normalized.json --outbase data/sustainable-business-profit-with-purpose --lang en --clone-es-fr)
  - [ ] Extract TTS jobs (per-phase narration) for en/es/fr → data/tts_jobs/sustainable-business-profit-with-purpose.en|es|fr.json (cmd: node scripts/extract-tts-jobs.js --slugs sustainable-business-profit-with-purpose --langs en,es,fr --in data --out data/tts_jobs)
  - [ ] Validate PhaseDNA shape and TTS jobs presence → npm run validate
  - [ ] Ensure day-to-slug resolver loads this lesson in index.html → Update getDNALessonData to include this day or general resolver
  - [ ] Attach minimal avatar cues/moods per phase (optional) → Edit phased JSON: phases[].avatar.cues
  - [ ] Quick review of es/fr clones for obvious issues → data/sustainable-business-profit-with-purpose.es|fr.phased.json
  - [ ] Enable prefetch of next-phase TTS during playback → Player optimization (once globally implemented)
  - [ ] QA in index.html: phase texts render, TTS plays, interactions flow → Open index.html?day=355

## Day 356 — Digital Journalism - News in the Digital Age
- Learning objective: Practice digital reporting while understanding how digital journalism enables information sharing, public accountability, and democratic discourse.
- Slug: digital-journalism-news-in-the-digital-age
- Files:
  - Normalized: data/digital-journalism-news-in-the-digital-age_normalized.json
  - PhaseDNA: data/digital-journalism-news-in-the-digital-age.en.phased.json, data/digital-journalism-news-in-the-digital-age.es.phased.json, data/digital-journalism-news-in-the-digital-age.fr.phased.json
  - TTS jobs: data/tts_jobs/digital-journalism-news-in-the-digital-age.en.json, data/tts_jobs/digital-journalism-news-in-the-digital-age.es.json, data/tts_jobs/digital-journalism-news-in-the-digital-age.fr.json
- Subtasks:
  - [ ] Author normalized DNA source → data/digital-journalism-news-in-the-digital-age_normalized.json
  - [ ] Generate PhaseDNA v1 (en + clone es/fr) → data/digital-journalism-news-in-the-digital-age.en|es|fr.phased.json (cmd: node scripts/generate-phased-from-normalized.js --input data/digital-journalism-news-in-the-digital-age_normalized.json --outbase data/digital-journalism-news-in-the-digital-age --lang en --clone-es-fr)
  - [ ] Extract TTS jobs (per-phase narration) for en/es/fr → data/tts_jobs/digital-journalism-news-in-the-digital-age.en|es|fr.json (cmd: node scripts/extract-tts-jobs.js --slugs digital-journalism-news-in-the-digital-age --langs en,es,fr --in data --out data/tts_jobs)
  - [ ] Validate PhaseDNA shape and TTS jobs presence → npm run validate
  - [ ] Ensure day-to-slug resolver loads this lesson in index.html → Update getDNALessonData to include this day or general resolver
  - [ ] Attach minimal avatar cues/moods per phase (optional) → Edit phased JSON: phases[].avatar.cues
  - [ ] Quick review of es/fr clones for obvious issues → data/digital-journalism-news-in-the-digital-age.es|fr.phased.json
  - [ ] Enable prefetch of next-phase TTS during playback → Player optimization (once globally implemented)
  - [ ] QA in index.html: phase texts render, TTS plays, interactions flow → Open index.html?day=356

## Day 357 — Sustainable Development - Meeting Today's Needs
- Learning objective: Practice development thinking while understanding how sustainable development enables human flourishing, environmental protection, and social equity.
- Slug: sustainable-development-meeting-todays-needs
- Files:
  - Normalized: data/sustainable-development-meeting-todays-needs_normalized.json
  - PhaseDNA: data/sustainable-development-meeting-todays-needs.en.phased.json, data/sustainable-development-meeting-todays-needs.es.phased.json, data/sustainable-development-meeting-todays-needs.fr.phased.json
  - TTS jobs: data/tts_jobs/sustainable-development-meeting-todays-needs.en.json, data/tts_jobs/sustainable-development-meeting-todays-needs.es.json, data/tts_jobs/sustainable-development-meeting-todays-needs.fr.json
- Subtasks:
  - [ ] Author normalized DNA source → data/sustainable-development-meeting-todays-needs_normalized.json
  - [ ] Generate PhaseDNA v1 (en + clone es/fr) → data/sustainable-development-meeting-todays-needs.en|es|fr.phased.json (cmd: node scripts/generate-phased-from-normalized.js --input data/sustainable-development-meeting-todays-needs_normalized.json --outbase data/sustainable-development-meeting-todays-needs --lang en --clone-es-fr)
  - [ ] Extract TTS jobs (per-phase narration) for en/es/fr → data/tts_jobs/sustainable-development-meeting-todays-needs.en|es|fr.json (cmd: node scripts/extract-tts-jobs.js --slugs sustainable-development-meeting-todays-needs --langs en,es,fr --in data --out data/tts_jobs)
  - [ ] Validate PhaseDNA shape and TTS jobs presence → npm run validate
  - [ ] Ensure day-to-slug resolver loads this lesson in index.html → Update getDNALessonData to include this day or general resolver
  - [ ] Attach minimal avatar cues/moods per phase (optional) → Edit phased JSON: phases[].avatar.cues
  - [ ] Quick review of es/fr clones for obvious issues → data/sustainable-development-meeting-todays-needs.es|fr.phased.json
  - [ ] Enable prefetch of next-phase TTS during playback → Player optimization (once globally implemented)
  - [ ] QA in index.html: phase texts render, TTS plays, interactions flow → Open index.html?day=357

## Day 358 — Digital Ethics - Values in the Digital Age
- Learning objective: Practice ethical technology while understanding how digital ethics enables responsible innovation, privacy protection, and democratic values.
- Slug: digital-ethics-values-in-the-digital-age
- Files:
  - Normalized: data/digital-ethics-values-in-the-digital-age_normalized.json
  - PhaseDNA: data/digital-ethics-values-in-the-digital-age.en.phased.json, data/digital-ethics-values-in-the-digital-age.es.phased.json, data/digital-ethics-values-in-the-digital-age.fr.phased.json
  - TTS jobs: data/tts_jobs/digital-ethics-values-in-the-digital-age.en.json, data/tts_jobs/digital-ethics-values-in-the-digital-age.es.json, data/tts_jobs/digital-ethics-values-in-the-digital-age.fr.json
- Subtasks:
  - [ ] Author normalized DNA source → data/digital-ethics-values-in-the-digital-age_normalized.json
  - [ ] Generate PhaseDNA v1 (en + clone es/fr) → data/digital-ethics-values-in-the-digital-age.en|es|fr.phased.json (cmd: node scripts/generate-phased-from-normalized.js --input data/digital-ethics-values-in-the-digital-age_normalized.json --outbase data/digital-ethics-values-in-the-digital-age --lang en --clone-es-fr)
  - [ ] Extract TTS jobs (per-phase narration) for en/es/fr → data/tts_jobs/digital-ethics-values-in-the-digital-age.en|es|fr.json (cmd: node scripts/extract-tts-jobs.js --slugs digital-ethics-values-in-the-digital-age --langs en,es,fr --in data --out data/tts_jobs)
  - [ ] Validate PhaseDNA shape and TTS jobs presence → npm run validate
  - [ ] Ensure day-to-slug resolver loads this lesson in index.html → Update getDNALessonData to include this day or general resolver
  - [ ] Attach minimal avatar cues/moods per phase (optional) → Edit phased JSON: phases[].avatar.cues
  - [ ] Quick review of es/fr clones for obvious issues → data/digital-ethics-values-in-the-digital-age.es|fr.phased.json
  - [ ] Enable prefetch of next-phase TTS during playback → Player optimization (once globally implemented)
  - [ ] QA in index.html: phase texts render, TTS plays, interactions flow → Open index.html?day=358

## Day 359 — Sustainable Innovation - Creating Without Destroying
- Learning objective: Practice sustainable design thinking while understanding how environmental considerations must guide technological development and economic systems.
- Slug: sustainable-innovation-creating-without-destroying
- Files:
  - Normalized: data/sustainable-innovation-creating-without-destroying_normalized.json
  - PhaseDNA: data/sustainable-innovation-creating-without-destroying.en.phased.json, data/sustainable-innovation-creating-without-destroying.es.phased.json, data/sustainable-innovation-creating-without-destroying.fr.phased.json
  - TTS jobs: data/tts_jobs/sustainable-innovation-creating-without-destroying.en.json, data/tts_jobs/sustainable-innovation-creating-without-destroying.es.json, data/tts_jobs/sustainable-innovation-creating-without-destroying.fr.json
- Subtasks:
  - [ ] Author normalized DNA source → data/sustainable-innovation-creating-without-destroying_normalized.json
  - [ ] Generate PhaseDNA v1 (en + clone es/fr) → data/sustainable-innovation-creating-without-destroying.en|es|fr.phased.json (cmd: node scripts/generate-phased-from-normalized.js --input data/sustainable-innovation-creating-without-destroying_normalized.json --outbase data/sustainable-innovation-creating-without-destroying --lang en --clone-es-fr)
  - [ ] Extract TTS jobs (per-phase narration) for en/es/fr → data/tts_jobs/sustainable-innovation-creating-without-destroying.en|es|fr.json (cmd: node scripts/extract-tts-jobs.js --slugs sustainable-innovation-creating-without-destroying --langs en,es,fr --in data --out data/tts_jobs)
  - [ ] Validate PhaseDNA shape and TTS jobs presence → npm run validate
  - [ ] Ensure day-to-slug resolver loads this lesson in index.html → Update getDNALessonData to include this day or general resolver
  - [ ] Attach minimal avatar cues/moods per phase (optional) → Edit phased JSON: phases[].avatar.cues
  - [ ] Quick review of es/fr clones for obvious issues → data/sustainable-innovation-creating-without-destroying.es|fr.phased.json
  - [ ] Enable prefetch of next-phase TTS during playback → Player optimization (once globally implemented)
  - [ ] QA in index.html: phase texts render, TTS plays, interactions flow → Open index.html?day=359

## Day 360 — Digital Literacy - Navigating the Information Age
- Learning objective: Practice critical thinking while understanding how digital literacy enables informed citizenship, media literacy, and online safety.
- Slug: digital-literacy-navigating-the-information-age
- Files:
  - Normalized: data/digital-literacy-navigating-the-information-age_normalized.json
  - PhaseDNA: data/digital-literacy-navigating-the-information-age.en.phased.json, data/digital-literacy-navigating-the-information-age.es.phased.json, data/digital-literacy-navigating-the-information-age.fr.phased.json
  - TTS jobs: data/tts_jobs/digital-literacy-navigating-the-information-age.en.json, data/tts_jobs/digital-literacy-navigating-the-information-age.es.json, data/tts_jobs/digital-literacy-navigating-the-information-age.fr.json
- Subtasks:
  - [ ] Author normalized DNA source → data/digital-literacy-navigating-the-information-age_normalized.json
  - [ ] Generate PhaseDNA v1 (en + clone es/fr) → data/digital-literacy-navigating-the-information-age.en|es|fr.phased.json (cmd: node scripts/generate-phased-from-normalized.js --input data/digital-literacy-navigating-the-information-age_normalized.json --outbase data/digital-literacy-navigating-the-information-age --lang en --clone-es-fr)
  - [ ] Extract TTS jobs (per-phase narration) for en/es/fr → data/tts_jobs/digital-literacy-navigating-the-information-age.en|es|fr.json (cmd: node scripts/extract-tts-jobs.js --slugs digital-literacy-navigating-the-information-age --langs en,es,fr --in data --out data/tts_jobs)
  - [ ] Validate PhaseDNA shape and TTS jobs presence → npm run validate
  - [ ] Ensure day-to-slug resolver loads this lesson in index.html → Update getDNALessonData to include this day or general resolver
  - [ ] Attach minimal avatar cues/moods per phase (optional) → Edit phased JSON: phases[].avatar.cues
  - [ ] Quick review of es/fr clones for obvious issues → data/digital-literacy-navigating-the-information-age.es|fr.phased.json
  - [ ] Enable prefetch of next-phase TTS during playback → Player optimization (once globally implemented)
  - [ ] QA in index.html: phase texts render, TTS plays, interactions flow → Open index.html?day=360

## Day 361 — Sustainable Finance - Money for a Better World
- Learning objective: Practice ethical finance while understanding how sustainable finance enables climate action, social equity, and democratic economic systems.
- Slug: sustainable-finance-money-for-a-better-world
- Files:
  - Normalized: data/sustainable-finance-money-for-a-better-world_normalized.json
  - PhaseDNA: data/sustainable-finance-money-for-a-better-world.en.phased.json, data/sustainable-finance-money-for-a-better-world.es.phased.json, data/sustainable-finance-money-for-a-better-world.fr.phased.json
  - TTS jobs: data/tts_jobs/sustainable-finance-money-for-a-better-world.en.json, data/tts_jobs/sustainable-finance-money-for-a-better-world.es.json, data/tts_jobs/sustainable-finance-money-for-a-better-world.fr.json
- Subtasks:
  - [ ] Author normalized DNA source → data/sustainable-finance-money-for-a-better-world_normalized.json
  - [ ] Generate PhaseDNA v1 (en + clone es/fr) → data/sustainable-finance-money-for-a-better-world.en|es|fr.phased.json (cmd: node scripts/generate-phased-from-normalized.js --input data/sustainable-finance-money-for-a-better-world_normalized.json --outbase data/sustainable-finance-money-for-a-better-world --lang en --clone-es-fr)
  - [ ] Extract TTS jobs (per-phase narration) for en/es/fr → data/tts_jobs/sustainable-finance-money-for-a-better-world.en|es|fr.json (cmd: node scripts/extract-tts-jobs.js --slugs sustainable-finance-money-for-a-better-world --langs en,es,fr --in data --out data/tts_jobs)
  - [ ] Validate PhaseDNA shape and TTS jobs presence → npm run validate
  - [ ] Ensure day-to-slug resolver loads this lesson in index.html → Update getDNALessonData to include this day or general resolver
  - [ ] Attach minimal avatar cues/moods per phase (optional) → Edit phased JSON: phases[].avatar.cues
  - [ ] Quick review of es/fr clones for obvious issues → data/sustainable-finance-money-for-a-better-world.es|fr.phased.json
  - [ ] Enable prefetch of next-phase TTS during playback → Player optimization (once globally implemented)
  - [ ] QA in index.html: phase texts render, TTS plays, interactions flow → Open index.html?day=361

## Day 362 — Digital Transformation - Technology and Organizational Change
- Learning objective: Understand organizational change while exploring how digital transformation affects work, leadership, and organizational culture.
- Slug: digital-transformation-technology-and-organizational-change
- Files:
  - Normalized: data/digital-transformation-technology-and-organizational-change_normalized.json
  - PhaseDNA: data/digital-transformation-technology-and-organizational-change.en.phased.json, data/digital-transformation-technology-and-organizational-change.es.phased.json, data/digital-transformation-technology-and-organizational-change.fr.phased.json
  - TTS jobs: data/tts_jobs/digital-transformation-technology-and-organizational-change.en.json, data/tts_jobs/digital-transformation-technology-and-organizational-change.es.json, data/tts_jobs/digital-transformation-technology-and-organizational-change.fr.json
- Subtasks:
  - [ ] Author normalized DNA source → data/digital-transformation-technology-and-organizational-change_normalized.json
  - [ ] Generate PhaseDNA v1 (en + clone es/fr) → data/digital-transformation-technology-and-organizational-change.en|es|fr.phased.json (cmd: node scripts/generate-phased-from-normalized.js --input data/digital-transformation-technology-and-organizational-change_normalized.json --outbase data/digital-transformation-technology-and-organizational-change --lang en --clone-es-fr)
  - [ ] Extract TTS jobs (per-phase narration) for en/es/fr → data/tts_jobs/digital-transformation-technology-and-organizational-change.en|es|fr.json (cmd: node scripts/extract-tts-jobs.js --slugs digital-transformation-technology-and-organizational-change --langs en,es,fr --in data --out data/tts_jobs)
  - [ ] Validate PhaseDNA shape and TTS jobs presence → npm run validate
  - [ ] Ensure day-to-slug resolver loads this lesson in index.html → Update getDNALessonData to include this day or general resolver
  - [ ] Attach minimal avatar cues/moods per phase (optional) → Edit phased JSON: phases[].avatar.cues
  - [ ] Quick review of es/fr clones for obvious issues → data/digital-transformation-technology-and-organizational-change.es|fr.phased.json
  - [ ] Enable prefetch of next-phase TTS during playback → Player optimization (once globally implemented)
  - [ ] QA in index.html: phase texts render, TTS plays, interactions flow → Open index.html?day=362

## Day 363 — Sustainable Tourism - Traveling Responsibly
- Learning objective: Practice responsible travel while understanding how sustainable tourism enables cultural preservation, environmental protection, and local development.
- Slug: sustainable-tourism-traveling-responsibly
- Files:
  - Normalized: data/sustainable-tourism-traveling-responsibly_normalized.json
  - PhaseDNA: data/sustainable-tourism-traveling-responsibly.en.phased.json, data/sustainable-tourism-traveling-responsibly.es.phased.json, data/sustainable-tourism-traveling-responsibly.fr.phased.json
  - TTS jobs: data/tts_jobs/sustainable-tourism-traveling-responsibly.en.json, data/tts_jobs/sustainable-tourism-traveling-responsibly.es.json, data/tts_jobs/sustainable-tourism-traveling-responsibly.fr.json
- Subtasks:
  - [ ] Author normalized DNA source → data/sustainable-tourism-traveling-responsibly_normalized.json
  - [ ] Generate PhaseDNA v1 (en + clone es/fr) → data/sustainable-tourism-traveling-responsibly.en|es|fr.phased.json (cmd: node scripts/generate-phased-from-normalized.js --input data/sustainable-tourism-traveling-responsibly_normalized.json --outbase data/sustainable-tourism-traveling-responsibly --lang en --clone-es-fr)
  - [ ] Extract TTS jobs (per-phase narration) for en/es/fr → data/tts_jobs/sustainable-tourism-traveling-responsibly.en|es|fr.json (cmd: node scripts/extract-tts-jobs.js --slugs sustainable-tourism-traveling-responsibly --langs en,es,fr --in data --out data/tts_jobs)
  - [ ] Validate PhaseDNA shape and TTS jobs presence → npm run validate
  - [ ] Ensure day-to-slug resolver loads this lesson in index.html → Update getDNALessonData to include this day or general resolver
  - [ ] Attach minimal avatar cues/moods per phase (optional) → Edit phased JSON: phases[].avatar.cues
  - [ ] Quick review of es/fr clones for obvious issues → data/sustainable-tourism-traveling-responsibly.es|fr.phased.json
  - [ ] Enable prefetch of next-phase TTS during playback → Player optimization (once globally implemented)
  - [ ] QA in index.html: phase texts render, TTS plays, interactions flow → Open index.html?day=363

## Day 364 — Digital Art - Creativity in the Digital Age
- Learning objective: Practice digital creativity while understanding how digital art enables new forms of expression, cultural exchange, and artistic innovation.
- Slug: digital-art-creativity-in-the-digital-age
- Files:
  - Normalized: data/digital-art-creativity-in-the-digital-age_normalized.json
  - PhaseDNA: data/digital-art-creativity-in-the-digital-age.en.phased.json, data/digital-art-creativity-in-the-digital-age.es.phased.json, data/digital-art-creativity-in-the-digital-age.fr.phased.json
  - TTS jobs: data/tts_jobs/digital-art-creativity-in-the-digital-age.en.json, data/tts_jobs/digital-art-creativity-in-the-digital-age.es.json, data/tts_jobs/digital-art-creativity-in-the-digital-age.fr.json
- Subtasks:
  - [ ] Author normalized DNA source → data/digital-art-creativity-in-the-digital-age_normalized.json
  - [ ] Generate PhaseDNA v1 (en + clone es/fr) → data/digital-art-creativity-in-the-digital-age.en|es|fr.phased.json (cmd: node scripts/generate-phased-from-normalized.js --input data/digital-art-creativity-in-the-digital-age_normalized.json --outbase data/digital-art-creativity-in-the-digital-age --lang en --clone-es-fr)
  - [ ] Extract TTS jobs (per-phase narration) for en/es/fr → data/tts_jobs/digital-art-creativity-in-the-digital-age.en|es|fr.json (cmd: node scripts/extract-tts-jobs.js --slugs digital-art-creativity-in-the-digital-age --langs en,es,fr --in data --out data/tts_jobs)
  - [ ] Validate PhaseDNA shape and TTS jobs presence → npm run validate
  - [ ] Ensure day-to-slug resolver loads this lesson in index.html → Update getDNALessonData to include this day or general resolver
  - [ ] Attach minimal avatar cues/moods per phase (optional) → Edit phased JSON: phases[].avatar.cues
  - [ ] Quick review of es/fr clones for obvious issues → data/digital-art-creativity-in-the-digital-age.es|fr.phased.json
  - [ ] Enable prefetch of next-phase TTS during playback → Player optimization (once globally implemented)
  - [ ] QA in index.html: phase texts render, TTS plays, interactions flow → Open index.html?day=364

## Day 365 — Sustainable Fashion - Style with a Conscience
- Learning objective: Practice ethical fashion while understanding how sustainable fashion enables environmental protection, fair labor, and circular economy principles.
- Slug: sustainable-fashion-style-with-a-conscience
- Files:
  - Normalized: data/sustainable-fashion-style-with-a-conscience_normalized.json
  - PhaseDNA: data/sustainable-fashion-style-with-a-conscience.en.phased.json, data/sustainable-fashion-style-with-a-conscience.es.phased.json, data/sustainable-fashion-style-with-a-conscience.fr.phased.json
  - TTS jobs: data/tts_jobs/sustainable-fashion-style-with-a-conscience.en.json, data/tts_jobs/sustainable-fashion-style-with-a-conscience.es.json, data/tts_jobs/sustainable-fashion-style-with-a-conscience.fr.json
- Subtasks:
  - [ ] Author normalized DNA source → data/sustainable-fashion-style-with-a-conscience_normalized.json
  - [ ] Generate PhaseDNA v1 (en + clone es/fr) → data/sustainable-fashion-style-with-a-conscience.en|es|fr.phased.json (cmd: node scripts/generate-phased-from-normalized.js --input data/sustainable-fashion-style-with-a-conscience_normalized.json --outbase data/sustainable-fashion-style-with-a-conscience --lang en --clone-es-fr)
  - [ ] Extract TTS jobs (per-phase narration) for en/es/fr → data/tts_jobs/sustainable-fashion-style-with-a-conscience.en|es|fr.json (cmd: node scripts/extract-tts-jobs.js --slugs sustainable-fashion-style-with-a-conscience --langs en,es,fr --in data --out data/tts_jobs)
  - [ ] Validate PhaseDNA shape and TTS jobs presence → npm run validate
  - [ ] Ensure day-to-slug resolver loads this lesson in index.html → Update getDNALessonData to include this day or general resolver
  - [ ] Attach minimal avatar cues/moods per phase (optional) → Edit phased JSON: phases[].avatar.cues
  - [ ] Quick review of es/fr clones for obvious issues → data/sustainable-fashion-style-with-a-conscience.es|fr.phased.json
  - [ ] Enable prefetch of next-phase TTS during playback → Player optimization (once globally implemented)
  - [ ] QA in index.html: phase texts render, TTS plays, interactions flow → Open index.html?day=365

## Day 366 — Digital Archaeology - Technology and the Past
- Learning objective: Explore archaeological technology while understanding how digital archaeology enables cultural preservation, scientific discovery, and public education.
- Slug: digital-archaeology-technology-and-the-past
- Files:
  - Normalized: data/digital-archaeology-technology-and-the-past_normalized.json
  - PhaseDNA: data/digital-archaeology-technology-and-the-past.en.phased.json, data/digital-archaeology-technology-and-the-past.es.phased.json, data/digital-archaeology-technology-and-the-past.fr.phased.json
  - TTS jobs: data/tts_jobs/digital-archaeology-technology-and-the-past.en.json, data/tts_jobs/digital-archaeology-technology-and-the-past.es.json, data/tts_jobs/digital-archaeology-technology-and-the-past.fr.json
- Subtasks:
  - [ ] Author normalized DNA source → data/digital-archaeology-technology-and-the-past_normalized.json
  - [ ] Generate PhaseDNA v1 (en + clone es/fr) → data/digital-archaeology-technology-and-the-past.en|es|fr.phased.json (cmd: node scripts/generate-phased-from-normalized.js --input data/digital-archaeology-technology-and-the-past_normalized.json --outbase data/digital-archaeology-technology-and-the-past --lang en --clone-es-fr)
  - [ ] Extract TTS jobs (per-phase narration) for en/es/fr → data/tts_jobs/digital-archaeology-technology-and-the-past.en|es|fr.json (cmd: node scripts/extract-tts-jobs.js --slugs digital-archaeology-technology-and-the-past --langs en,es,fr --in data --out data/tts_jobs)
  - [ ] Validate PhaseDNA shape and TTS jobs presence → npm run validate
  - [ ] Ensure day-to-slug resolver loads this lesson in index.html → Update getDNALessonData to include this day or general resolver
  - [ ] Attach minimal avatar cues/moods per phase (optional) → Edit phased JSON: phases[].avatar.cues
  - [ ] Quick review of es/fr clones for obvious issues → data/digital-archaeology-technology-and-the-past.es|fr.phased.json
  - [ ] Enable prefetch of next-phase TTS during playback → Player optimization (once globally implemented)
  - [ ] QA in index.html: phase texts render, TTS plays, interactions flow → Open index.html?day=366
