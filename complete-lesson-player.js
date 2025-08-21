/**
 * Universal Lesson Player for iLearnHow
 * Handles 366 daily lessons with 5 phases, 10 age groups, 3 tones, 12 languages, 2 avatars
 * Generates 3x3x3x3 variants (81 variants per lesson)
 * Universal learning for humanity
 */

class UniversalLessonPlayer {
    constructor() {
        // Universal scope configuration
        this.lessonPhases = ['welcome', 'beginning', 'middle', 'end', 'wisdom'];
        this.ageGroups = ['age_2', 'age_5', 'age_8', 'age_12', 'age_16', 'age_25', 'age_40', 'age_60', 'age_80', 'age_102'];
        this.tones = ['grandmother', 'fun', 'neutral'];
        this.languages = ['english', 'spanish', 'french', 'german', 'chinese', 'japanese', 'portuguese', 'italian', 'russian', 'arabic', 'hindi', 'korean'];
        this.avatars = ['kelly', 'ken'];
        
        // Current state
        this.currentPhase = 0;
        this.currentLesson = null;
        this.currentDNA = null;
        this.isPlaying = false;
        this.currentTime = 0;
        this.duration = 0;
        this.playbackSpeed = 1;
        this.volume = 0.5;
        this.autoplay = false;
        
        // Audio system
        this.audioElement = null;
        this.elevenLabs = null;
        // Pre-synthesized audio cache (text -> blob URL)
        this.preSynthCache = new Map();
        
        // Variant system
        this.currentVariant = {
            age: 'age_25',
            tone: 'neutral',
            language: 'english',
            avatar: 'kelly'
        };
        
        // Calendar system
        this.currentYear = 2025;
        this.currentDay = this.getCurrentDayOfYear();
        this.selectedDay = this.currentDay;
        
        // Flask integration
        this.useFlaskProgress = false;
        this.flaskIntegration = null;
        
        // Initialize universal systems
        this.initializeUniversalPlayer();
        this.setupEventListeners();
        this.loadUniversalCurriculum();
    }

    /**
     * Return phase object from current PhaseDNA v1 by id
     */
    getPhaseDataFromDNA(phaseId) {
        try {
            if (!this.currentDNA || this.currentDNA?.metadata?.version !== 'phase_v1') return null;
            return (this.currentDNA.phases || []).find(p => p.id === phaseId) || null;
        } catch { return null; }
    }

    /**
     * Evaluate current DNA for structure completeness and question A/B presence.
     * Returns an object suitable for logging or UI summary.
     */
    evaluateCurrentDNA() {
        const summary = { lessonId: this.currentDNA?.lesson_metadata?.lesson_id || this.currentDNA?.metadata?.lessonId || 'unknown', warnings: [], phases: {} };
        try {
            summary.warnings = this.validatePhaseDNA(this.currentDNA) || [];
            const ids = ['welcome','beginning','middle','end','wisdom'];
            ids.forEach(id => {
                const p = this.getPhaseDataFromDNA(id) || {};
                const q = p.question || {};
                const choices = Array.isArray(q.choices) ? q.choices : [];
                const a = choices.find(c=>c.id==='a');
                const b = choices.find(c=>c.id==='b');
                summary.phases[id] = {
                    hasVO: !!(p.narration && p.narration.voiceOver),
                    hasOnNoChoice: !!(p.narration && p.narration.onNoChoice),
                    hasQuestion: !!q.text,
                    hasA: !!a && !!a.text,
                    hasB: !!b && !!b.text,
                    hasTM: !!(q.teachingMoments && (q.teachingMoments.a || q.teachingMoments.b)),
                    correct: q.correct || null
                };
            });
        } catch (e) { summary.warnings.push('evaluator_error'); }
        return summary;
    }

    /** Map phase id to legacy content labels for renderer compatibility */
    mapPhaseForContent(phase) {
        try {
            const direct = ['welcome','beginning','middle','end','wisdom'];
            if (direct.includes(phase)) return phase;
            const alias = {
                opening: 'welcome',
                question_1: 'beginning',
                question_2: 'middle',
                question_3: 'end',
                closing: 'wisdom',
                fortune: 'wisdom'
            };
            return alias[phase] || phase;
        } catch { return phase; }
    }

    runPhaseFromDNA(phaseId) {
        const dna = this.currentDNA;
        const phase = dna?.phases?.find(p => p.id === phaseId);
        if (!phase) { console.warn('No PhaseDNA for', phaseId); return; }

        // Speak narration
        const vo = phase?.narration?.voiceOver || '';
        if (vo) this.speak(vo, this.currentVariant.avatar);

        // Apply avatar cue at start
        try {
            const startCue = phase?.avatar?.cues?.find(c => c.at === 'start');
            if (startCue?.expression) this.updateAvatar(this.currentVariant.avatar, startCue.expression);
        } catch {}

        // Structured render into universal overlay containers
        const lessonContentOverlay = document.getElementById('lesson-content-overlay');
        const lessonContent = document.getElementById('lesson-content');
        const lessonText = document.getElementById('lesson-text');
        const phaseLabelEl = document.querySelector('#lesson-content .current-phase-label');
        const qSection = document.querySelector('#lesson-content .question-content');
        const qChoices = document.querySelector('#lesson-content .choices-container');
        const qLabel = document.querySelector('#lesson-content .question-label');
        const feedback = document.querySelector('#lesson-content .choice-feedback');
        if (lessonContentOverlay) lessonContentOverlay.style.display = 'block';
        if (lessonContent) lessonContent.style.display = 'block';
        if (lessonText) lessonText.innerHTML = '';
        if (feedback) { feedback.classList.add('hidden'); feedback.innerHTML = ''; }
        if (phaseLabelEl) {
            const labels = { welcome:'Welcome', beginning:'Beginning', middle:'Middle', end:'End', wisdom:'Wisdom' };
            phaseLabelEl.textContent = labels[phaseId] || phaseId;
        }

        const appendNode = (html) => { if (lessonText) lessonText.innerHTML += html; };
        const showUnits = (units=[]) => {
            units.forEach(u => {
                if (u.type === 'text') appendNode(`<div class=\"content-text\">${u.text||''}</div>`);
                if (u.type === 'fortune') appendNode(`<div class=\"content-text\"><strong>${u.text||''}</strong></div>`);
                if (u.type === 'hint') appendNode(`<div class=\"content-text\" style=\"opacity:.9;\">${u.text||''}</div>`);
            });
        };

        try {
            const startStep = phase?.screen?.steps?.filter(s => s.at === 'start');
            startStep?.forEach(s => showUnits(s.show || []));
        } catch {}

        // Question rendering
        if (['beginning','middle','end'].includes(phaseId)) {
            try {
                if (qSection) qSection.classList.remove('hidden');
                if (qLabel) qLabel.textContent = phase?.question?.text || '';
                if (qChoices) {
                    qChoices.innerHTML = '';
                    const aText = phase?.question?.choices?.find(c=>c.id==='a')?.text || '';
                    const bText = phase?.question?.choices?.find(c=>c.id==='b')?.text || '';
                    const mk = (id, txt) => { const btn = document.createElement('button'); btn.className = `choice-btn choice-${id}`; btn.dataset.choice = id; btn.textContent = txt; btn.addEventListener('click', ()=> this.onPhaseChoice(phaseId, phase, id)); return btn; };
                    qChoices.appendChild(mk('a', aText));
                    qChoices.appendChild(mk('b', bText));
                }
            } catch {}
            this.questionAnswered = false;
            const t = phase?.timing; const ms = Math.max(6000, (t?.maxWait || 12) * 1000);
            clearTimeout(this.phaseTimers.noChoice);
            this.phaseTimers.noChoice = setTimeout(() => {
                if (!this.questionAnswered) this.onPhaseNoChoice(phaseId, phase);
            }, ms);
        } else {
            if (qSection) qSection.classList.add('hidden');
        }

        // Auto-advance after a generic duration for non-questions
        if (!['beginning','middle','end'].includes(phaseId)) {
            const dur = Math.max(6000, (phase?.timing?.minListen || 6) * 1000);
            setTimeout(() => this.nextPhase(), dur);
        }
    }

    onPhaseChoice(phaseId, phase, choiceId) {
        this.questionAnswered = true; clearTimeout(this.phaseTimers.noChoice);
        const correctId = phase?.question?.correct || 'b';
        const correct = String(choiceId).toLowerCase() === String(correctId).toLowerCase();
        const tm = phase?.question?.teachingMoments || {};
        const msg = correct ? (tm[correctId] || '') : (tm[choiceId] || 'Great thinking!');
        this.updateAvatar(this.currentVariant.avatar, correct ? 'happy_celebrating' : 'concerned_thinking');
        this.speak(msg, this.currentVariant.avatar);

        // Structured feedback in overlay
        try {
            const feedback = document.querySelector('#lesson-content .choice-feedback');
            if (feedback) {
                feedback.innerHTML = `<div class=\"feedback-message\">${msg}</div>`;
                feedback.classList.remove('hidden');
            }
        } catch {}

        const after = Math.max(1500, (phase?.timing?.autoAdvanceAfterFeedback || 3) * 1000);
        setTimeout(() => this.nextPhase(), after);
    }

    onPhaseNoChoice(phaseId, phase) {
        if (this.questionAnswered) return;
        const vo = phase?.narration?.onNoChoice || 'Let me point you to the key detail here.';
        this.speak(vo, this.currentVariant.avatar);
        const correctId = phase?.question?.correct || 'b';
        this.onPhaseChoice(phaseId, phase, correctId);
    }

    /**
     * Initialize universal lesson player
     */
    initializeUniversalPlayer() {
        console.log('🌍 Initializing Universal Lesson Player for Humanity...');
        
        // Initialize audio system
        this.audioElement = new Audio();
        this.setupAudioEvents();
        this.setVolume(this.volume);
        
        // Initialize ElevenLabs integration
        if (typeof ElevenLabsIntegration !== 'undefined') {
            this.elevenLabs = new ElevenLabsIntegration();
            console.log('✅ ElevenLabs integration ready');
        }
        
        // Initialize Flask integration
        if (window.flaskIntegration) {
            this.flaskIntegration = window.flaskIntegration;
            this.useFlaskProgress = true;
            console.log('✅ Flask integration ready');
        }
        
        // Load persisted variant preferences
        this.loadPreferencesFromStorage();

        // IMMEDIATELY show avatar first (core product experience)
        try { this.ensureAvatarVisible(); } catch {}
        
        console.log('✅ Universal Lesson Player initialized');

        // Read-along setup
        this.readAlong = {
            el: document.getElementById('read-along-player'),
            timer: null,
            words: [],
            index: 0,
            paused: false,
            spans: []
        };

        // Interactive pacing helpers
        this.phaseTimers = { noChoice: null };
        this.questionAnswered = false;

        // Inspectors auto-refresh
        try { if (this.inspectorTimer) clearInterval(this.inspectorTimer); } catch {}
        this.inspectorTimer = setInterval(() => this.updateInspectors(), 500);

        // Enable draggable inspectors (no-op if headers not present)
        this._makeInspectorsDraggable();

        // Autorun override via URL param (?autorun=1|0|true|false)
        try {
            const url = new URL(window.location.href);
            const p = url.searchParams.get('autorun');
            if (p !== null) {
                this.autoplay = (p === '1' || p === 'true');
                console.log(`⚙️ Autorun param detected → autoplay=${this.autoplay}`);
            }
        } catch {}
    }

    /**
     * Make inspector panels draggable by their headers
     */
    _makeInspectorsDraggable() {
        try {
            const panels = document.querySelectorAll('.inspector-panel');
            panels.forEach(panel => {
                const header = panel.querySelector('.inspector-header');
                if (!header) return;
                let isDragging = false;
                let startX = 0, startY = 0, startLeft = 0, startTop = 0;
                const onMouseDown = (e) => {
                    isDragging = true;
                    startX = e.clientX; startY = e.clientY;
                    const rect = panel.getBoundingClientRect();
                    startLeft = rect.left; startTop = rect.top;
                    document.addEventListener('mousemove', onMouseMove);
                    document.addEventListener('mouseup', onMouseUp);
                };
                const onMouseMove = (e) => {
                    if (!isDragging) return;
                    const dx = e.clientX - startX;
                    const dy = e.clientY - startY;
                    panel.style.left = `${Math.max(0, startLeft + dx)}px`;
                    panel.style.top = `${Math.max(0, startTop + dy)}px`;
                    panel.style.right = 'auto';
                    panel.style.bottom = 'auto';
                    panel.style.position = 'absolute';
                };
                const onMouseUp = () => {
                    isDragging = false;
                    document.removeEventListener('mousemove', onMouseMove);
                    document.removeEventListener('mouseup', onMouseUp);
                };
                header.addEventListener('mousedown', onMouseDown);
            });
        } catch {}
    }

    /**
     * Load user variant preferences from localStorage
     */
    loadPreferencesFromStorage() {
        try {
            const avatar = localStorage.getItem('variant_avatar');
            const tone = localStorage.getItem('variant_tone');
            const language = localStorage.getItem('variant_language');
            const age = localStorage.getItem('variant_age');
            if (avatar) this.currentVariant.avatar = avatar;
            if (tone) this.currentVariant.tone = tone;
            if (language) this.currentVariant.language = language;
            if (age) this.currentVariant.age = age;
        } catch {}
    }

    /**
     * Ensure avatar is always visible - CORE PRODUCT EXPERIENCE
     */
    ensureAvatarVisible() {
        console.log('🎭 Ensuring avatar is visible...');
        
        const avatarContainer = document.getElementById('avatar-container');
        if (!avatarContainer) {
            console.error('❌ Avatar container not found');
            return;
        }
        
        // Force avatar to be visible and prominent
        avatarContainer.style.display = 'block';
        avatarContainer.style.visibility = 'visible';
        avatarContainer.style.opacity = '1';
        avatarContainer.style.zIndex = '1';
        
        // Set default avatar (Kelly) immediately
        this.updateAvatar('kelly', 'neutral_default');
        this.preloadAvatarAssets('kelly');
        
        console.log('✅ Avatar visibility ensured');
    }

    /**
     * Load universal curriculum (366 days)
     */
    async loadUniversalCurriculum() {
        console.log('📚 Loading universal curriculum for 366 days...');
        
        const months = [
            'january', 'february', 'march', 'april', 'may', 'june',
            'july', 'august', 'september', 'october', 'november', 'december'
        ];
        
        try {
            this.universalCurriculum = {};
            
            for (const month of months) {
                const response = await fetch(`data/${month}_curriculum.json`);
                if (response.ok) {
                    this.universalCurriculum[month] = await response.json();
                    console.log(`✅ Loaded ${month} curriculum`);
                } else {
                    console.error(`❌ Failed to load ${month} curriculum`);
                }
            }
            
            console.log('✅ Universal curriculum loaded');
            this.generateUniversalCalendar();
            this.loadCurrentLesson();
            
        } catch (error) {
            console.error('❌ Error loading universal curriculum:', error);
            this.showError('Failed to load universal curriculum');
        }
    }

    /**
     * Generate universal calendar for all 366 days
     */
    generateUniversalCalendar() {
        console.log('📅 Generating universal calendar for 366 days...');
        
        const calendarContainer = document.getElementById('calendar-overlay');
        const calendarGrid = document.getElementById('calendar-grid');
        
        if (!calendarGrid) {
            console.error('❌ Calendar grid not found');
            return;
        }
        
        // Clear existing calendar
        calendarGrid.innerHTML = '';
        
        // Create month navigation
        const monthNavigation = document.createElement('div');
        monthNavigation.className = 'month-navigation';
        monthNavigation.innerHTML = `
            <button onclick="lessonPlayer.previousMonth()">◀</button>
            <span id="current-month">January</span>
            <button onclick="lessonPlayer.nextMonth()">▶</button>
        `;
        calendarContainer.insertBefore(monthNavigation, calendarGrid);
        
        // Generate current month calendar
        this.generateMonthCalendar(this.getCurrentMonth());
    }

    /**
     * Generate calendar for specific month
     */
    generateMonthCalendar(month) {
        const calendarGrid = document.getElementById('calendar-grid');
        const currentMonthElement = document.getElementById('current-month');
        
        if (!calendarGrid) return;
        
        // Update month display
        if (currentMonthElement) {
            currentMonthElement.textContent = this.getMonthName(month);
        }
        
        // Clear grid
        calendarGrid.innerHTML = '';
        
        // Get days in month
        const daysInMonth = this.getDaysInMonth(month);
        
        // Generate day buttons
        for (let day = 1; day <= daysInMonth; day++) {
            const dayOfYear = this.getDayOfYear(month, day);
            const isToday = dayOfYear === this.currentDay;
            const isSelected = dayOfYear === this.selectedDay;
            
            const dayButton = document.createElement('button');
            dayButton.className = 'calendar-day';
            dayButton.textContent = day;
            
            if (isToday) dayButton.classList.add('today');
            if (isSelected) dayButton.classList.add('selected');
            if (dayOfYear <= 366) dayButton.classList.add('available');
            
            dayButton.onclick = () => this.selectDay(dayOfYear);
            calendarGrid.appendChild(dayButton);
        }
    }

    /**
     * Load lesson for specific day
     */
    async loadLessonByDay(day) {
        console.log(`📚 Loading lesson for day ${day}...`);
        
        try {
            // Get lesson data from curriculum
            const lessonData = this.getLessonDataForDay(day);
            if (!lessonData) {
                throw new Error(`No lesson data for day ${day}`);
            }
            
            // Load DNA data if available
            await this.loadDNALesson(day);
            
            // Set current lesson
            this.currentLesson = lessonData;
            this.selectedDay = day;
            
            // Update display
            this.updateLessonInfo(lessonData);
            this.updateCalendarSelection(day);
            
            console.log(`✅ Lesson loaded for day ${day}: ${lessonData.title}`);
            try { window.dispatchEvent(new CustomEvent('ml:lesson_loaded', { detail: { day } })); } catch {}
            
        } catch (error) {
            console.error(`❌ Failed to load lesson for day ${day}:`, error);
            this.showError(`Failed to load lesson for day ${day}`);
        }
    }

    /**
     * Load DNA lesson data
     */
    async loadDNALesson(day) {
        try {
            // Prefer app-provided DNA resolver (can return PhaseDNA v1)
            if (typeof window.getDNALessonData === 'function') {
                const dna = await window.getDNALessonData(day);
                if (dna) {
                    this.currentDNA = dna;
                    console.log(`✅ DNA (app resolver) loaded for day ${day}`);
                    // Validate PhaseDNA if applicable
                    this.dnaWarnings = this.validatePhaseDNA(this.currentDNA);
                    if (this.dnaWarnings?.length) {
                        console.warn('⚠️ PhaseDNA warnings:', this.dnaWarnings);
                    }
                    // Prewarm first narration for low-latency playback
                    this.prewarmFirstVoice();
                    return;
                }
            }
            // Skip legacy dna_files fetch to avoid 404 noise; rely on app resolver and fallbacks only
            // Fallback
            const fallbackResponse = await fetch('data/the-moon.json');
            if (fallbackResponse.ok) {
                this.currentDNA = await fallbackResponse.json();
                console.log(`✅ Using fallback (moon) DNA for day ${day}`);
                this.dnaWarnings = this.validatePhaseDNA(this.currentDNA);
                this.prewarmFirstVoice();
            }
        } catch (error) {
            console.warn(`⚠️ No DNA data available for day ${day}, using fallback`);
        }
    }

    /**
     * Validate PhaseDNA v1 structure and return warnings array
     */
    validatePhaseDNA(dna) {
        const warnings = [];
        try {
            if (!dna || dna.metadata?.version !== 'phase_v1') return warnings;
            const requiredPhases = ['welcome','beginning','middle','end','wisdom'];
            const phaseById = Object.fromEntries((dna.phases||[]).map(p=>[p.id,p]));
            requiredPhases.forEach(id=>{ if (!phaseById[id]) warnings.push(`Missing phase: ${id}`); });
            ['beginning','middle','end'].forEach(id=>{
                const p = phaseById[id]; if (!p) return;
                if (!p.narration?.voiceOver) warnings.push(`${id}: missing narration.voiceOver`);
                if (!p.question?.text) warnings.push(`${id}: missing question.text`);
                const choices = p.question?.choices || [];
                const hasA = choices.some(c=>c.id==='a'); const hasB = choices.some(c=>c.id==='b');
                if (!hasA || !hasB) warnings.push(`${id}: choices must include ids 'a' and 'b'`);
                if (!p.question?.correct) warnings.push(`${id}: missing question.correct`);
                const tm = p.question?.teachingMoments || {};
                if (!tm.a || !tm.b) warnings.push(`${id}: missing teachingMoments for both 'a' and 'b'`);
                if (!p.timing) warnings.push(`${id}: missing timing`);
            });
            const w = phaseById['welcome'];
            if (w && !w.narration?.voiceOver) warnings.push('welcome: missing narration.voiceOver');
            const z = phaseById['wisdom'];
            if (z && !z.narration?.voiceOver) warnings.push('wisdom: missing narration.voiceOver');
        } catch(e) { warnings.push('Validator error'); }
        return warnings;
    }

    /**
     * Pre-generate audio for the first narration (typically Welcome) for snappy start
     */
    async prewarmFirstVoice() {
        try {
            if (!this.elevenLabs) return;
            if (!this.currentDNA || this.currentDNA?.metadata?.version !== 'phase_v1') return;
            const welcome = (this.currentDNA.phases || []).find(p => p.id === 'welcome');
            const vo = welcome?.narration?.voiceOver;
            if (!vo || this.preSynthCache.has(vo)) return;
            const avatar = this.currentVariant.avatar || 'kelly';
            const url = await this.elevenLabs.generateAudio(vo, avatar);
            if (typeof url === 'string' && url.startsWith('blob:')) {
                this.preSynthCache.set(vo, url);
                console.log('⚡ Prewarmed first VO clip');
            }
        } catch (e) { console.warn('Prewarm failed', e); }
    }

    /**
     * Start universal lesson with 5 phases
     */
    async startUniversalLesson() {
        if (!this.currentLesson) {
            this.showError('No lesson loaded');
            return;
        }

        console.log('🚀 Starting universal lesson with 5 phases...');
        // Hide start overlay if present
        const startOverlay = document.getElementById('start-overlay');
        if (startOverlay) startOverlay.style.display = 'none';
        
        // Reset to first phase
        this.currentPhase = 0;
        // Ensure lesson is considered playing so content renders even if audio autoplay is blocked
        this.isPlaying = true;
        this.updatePlayButton();
        
        // Generate personalized content for current variant
        await this.generateUniversalContent();
        
        // Start first phase
        this.playCurrentPhase();
    }

    /**
     * Generate universal content based on current variant
     */
    async generateUniversalContent() {
        console.log('🎨 Generating universal content for variant:', this.currentVariant);
        try {
            // PhaseDNA v1 direct path
            if (this.currentDNA && this.currentDNA?.metadata?.version === 'phase_v1') {
                this.universalContent = this.buildContentFromPhaseDNA(this.currentDNA);
                console.log('✅ PhaseDNA v1 content resolved');
                return;
            }
            // Prefer DNA-driven variant generation
            if (!this.variantGen && typeof CorrectedVariantGeneratorV2 !== 'undefined') {
                this.variantGen = new CorrectedVariantGeneratorV2();
            }
            if (this.variantGen && this.currentDNA && this.hasRichDNASchema(this.currentDNA)) {
                // Keep generator preferences in sync
                this.variantGen.currentPreferences = { ...this.currentVariant };
                const generated = await this.variantGen.generatePersonalizedContent(this.currentVariant);
                // Adapt to universalContent shape expected by player
                const questions = (generated.questions || []).map(q => ({
                    question: q.text || q.question || '',
                    choices: Array.isArray(q.choices) ? q.choices.map(c => (typeof c === 'string' ? c : (c.text || ''))) : []
                }));
                this.universalContent = {
                    introduction: generated.opening || generated.openingText || 'Welcome to today\'s lesson!',
                    questions,
                    conclusion: generated.fortune || generated.conclusion || '',
                    fortune: generated.fortune || ''
                };
                console.log('✅ DNA variant content generated');
                return;
            }
            // If we have DNA but not the rich schema, transform simple DNA
            if (this.currentDNA) {
                const uc = this.transformSimpleDNA(this.currentDNA, this.currentVariant);
                if (uc) { this.universalContent = uc; console.log('✅ Simple DNA transformed to universal content'); return; }
            }
        } catch (e) {
            console.warn('Variant generation failed, using fallback', e);
        }
        // Fallback content
        const dummyLesson = { title: this.currentLesson?.title || 'Learning', learning_objective: this.currentLesson?.learning_objective || '' };
        this.universalContent = this.generateFallbackUniversalContent(dummyLesson);
        console.log('✅ Fallback lesson content generated');
    }

    buildContentFromPhaseDNA(phaseDNA){
        // Reduce 5 phases into current player’s content interface while we migrate UI fully
        const getQ = (id) => {
            const p = phaseDNA.phases.find(x=>x.id===id);
            if (!p) return null;
            const q = p.question?.text || '';
            const a = p.question?.choices?.find(c=>c.id==='a')?.text || '';
            const b = p.question?.choices?.find(c=>c.id==='b')?.text || '';
            return { question: q, choices: [a,b].filter(Boolean) };
        };
        return {
            introduction: phaseDNA.phases.find(x=>x.id==='welcome')?.narration?.voiceOver || '',
            questions: [ getQ('beginning'), getQ('middle'), getQ('end') ].filter(Boolean),
            conclusion: phaseDNA.phases.find(x=>x.id==='wisdom')?.narration?.voiceOver || '',
            fortune: phaseDNA.phases.find(x=>x.id==='wisdom')?.screen?.steps?.find(s=>s.show?.some(u=>u.type==='fortune'))?.show?.find(u=>u.type==='fortune')?.text || ''
        };
    }

    hasRichDNASchema(dna) {
        return !!(dna && dna.tone_delivery_dna && dna.language_translations);
    }

    mapAgeVariantToNumeric(ageVariant) {
        const map = { age_2: '2', age_5: '5', age_8: '8', age_12: '12', age_16: '16', age_25: '25', age_40: '40', age_60: '60', age_80: '80', age_102: '102' };
        return map[ageVariant] || '25';
    }

    transformSimpleDNA(dna, variant) {
        try {
            const tone = variant.tone || 'neutral';
            const dnaAge = this.mapAgeVariantToNumeric(variant.age || 'age_25');
            const concept = dna.age_expressions?.[dnaAge]?.concept_name?.[tone] || dna.age_expressions?.[dnaAge]?.concept_name?.neutral;
            const intro = (concept?.voice_over_script || concept?.display_text || dna.lesson_metadata?.universal_concept || '').toString();

            const q = (idx) => {
                const block = dna.core_lesson_structure?.[`question_${idx}`]?.ages?.[dnaAge];
                if (!block) return null;
                // question text can be string or {tone:{display_text}}
                const qt = block.question || {};
                const qtext = (
                    qt?.[tone]?.display_text || qt?.[tone]?.voice_over_script ||
                    qt?.neutral?.display_text || qt?.neutral?.voice_over_script ||
                    qt?.display_text || qt?.voice_over_script || ''
                ).toString();
                const a = (block.option_a?.display_text || block.option_a?.voice_over_script || '').toString();
                const b = (block.option_b?.display_text || block.option_b?.voice_over_script || '').toString();
                return { question: qtext, choices: [a, b].filter(x=>x && x.trim().length>0) };
            };

            const questions = [q(1), q(2) || q(1), q(3) || q(1)].filter(Boolean);
            const fortune = (
                dna.wisdom_phase_content?.fortune?.[tone]?.voice_over_script ||
                dna.wisdom_phase_content?.fortune?.[tone]?.display_text ||
                dna.wisdom_phase_content?.fortune?.neutral?.voice_over_script ||
                dna.wisdom_phase_content?.fortune?.neutral?.display_text || ''
            ).toString();
            return { introduction: intro, questions, conclusion: fortune, fortune };
        } catch (e) { console.warn('Simple DNA transform failed', e); return null; }
    }

    /**
     * Play current lesson phase
     */
    async playCurrentPhase() {
        if (this.currentPhase >= this.lessonPhases.length) {
            this.onLessonComplete();
            return;
        }

        const phase = this.lessonPhases[this.currentPhase];
        const mappedPhase = this.mapPhaseForContent(phase);
        const phaseNumber = this.currentPhase + 1;
        console.log(`🎵 Playing phase ${phaseNumber}/5: ${phase}`);
        
        // Update phase display (label/progress). Content rendering is suppressed for PhaseDNA path to avoid duplication.
        this.updatePhaseDisplay(phase, phaseNumber);

        // Update Flask progress for phase start
        if (this.useFlaskProgress && this.flaskIntegration && this.flaskIntegration.isAuthenticated) {
            try {
                // Save phase start (not completed yet)
                await this.flaskIntegration.updateLessonProgress(
                    this.currentDay,
                    phaseNumber,
                    false,
                    [],
                    0
                );
                console.log(`✅ Phase ${phaseNumber} start saved to Flask`);
            } catch (error) {
                console.warn('⚠️ Failed to save phase start to Flask:', error);
            }
        }

        // Update avatar for current phase
        this.updateAvatarForPhase(phase);

        // If PhaseDNA v1, run direct PhaseRunner and return. Do NOT invoke legacy renderer.
        if (this.currentDNA?.metadata?.version === 'phase_v1') {
            try {
                const lessonText = document.getElementById('lesson-text');
                if (lessonText) lessonText.innerHTML = '';
                const overlay = document.getElementById('lesson-content-overlay');
                const content = document.getElementById('lesson-content');
                if (overlay) overlay.style.display = 'block';
                if (content) content.style.display = 'block';
            } catch {}
            this.runPhaseFromDNA(phase);
            return;
        }

        // Legacy display/content path
        this.showPhaseContent(mappedPhase);
        await this.generateAndPlayPhaseAudio(mappedPhase);
        const phaseDuration = this.getPhaseDuration(mappedPhase);
        setTimeout(() => { this.nextPhase(); }, phaseDuration * 1000);

        // Question phases: arm gentle no-interaction hint
        if (['beginning','middle','end'].includes(mappedPhase)) {
            this.questionAnswered = false;
            const t = this.getPhaseTimingFromPhaseDNA(mappedPhase);
            const ms = Math.max(6000, (t?.maxWait || 12) * 1000);
            clearTimeout(this.phaseTimers.noChoice);
            this.phaseTimers.noChoice = setTimeout(() => {
                if (!this.questionAnswered) this.handleNoChoiceTimeout(mappedPhase);
            }, ms);
        } else {
            this.questionAnswered = true;
            clearTimeout(this.phaseTimers.noChoice);
        }
    }

    /**
     * Update phase display with new visual structure
     */
    updatePhaseDisplay(phase, phaseNumber) {
        // Update phase label
        const phaseLabels = {
            'welcome': 'Welcome',
            'beginning': 'Beginning', 
            'middle': 'Middle',
            'end': 'End',
            'wisdom': 'Wisdom'
        };
        
        // Update current phase in UI
        const phaseLabel = document.querySelector('.current-phase-label');
        if (phaseLabel) {
            phaseLabel.textContent = phaseLabels[phase] || phase;
        }
        
        // Sync left progress rail
        this.updateProgressRail();

        // Show/hide appropriate content sections
        this.showPhaseSpecificContent(phase, phaseNumber);
    }

    /**
     * Update left progress labels and line fill
     */
    updateProgressRail() {
        try {
            const groups = document.querySelectorAll('.progress-label-group');
            groups.forEach((g, idx) => {
                g.classList.toggle('active', idx === this.currentPhase);
                g.classList.toggle('completed', idx < this.currentPhase);
            });
            const fill = document.getElementById('progress-line-fill');
            if (fill) {
                const pct = (this.currentPhase / Math.max(1, this.lessonPhases.length - 1)) * 100;
                fill.style.height = `${pct}%`;
            }
        } catch {}
    }

    /**
     * Show content specific to each phase
     */
    showPhaseSpecificContent(phase, phaseNumber) {
        // If PhaseDNA v1 is active, PhaseRunner handles structured overlay content
        if (this.currentDNA?.metadata?.version === 'phase_v1') {
            try {
                const lessonContentOverlay = document.getElementById('lesson-content-overlay');
                const lessonContent = document.getElementById('lesson-content');
                const lessonText = document.getElementById('lesson-text');
                const qSection = document.querySelector('#lesson-content .question-content');
                const qChoices = document.querySelector('#lesson-content .choices-container');
                const qLabel = document.querySelector('#lesson-content .question-label');
                const feedback = document.querySelector('#lesson-content .choice-feedback');
                if (lessonContentOverlay) lessonContentOverlay.style.display = 'block';
                if (lessonContent) lessonContent.style.display = 'block';
                if (lessonText) lessonText.innerHTML = '';
                if (qSection) qSection.classList.add('hidden');
                if (qChoices) qChoices.innerHTML = '';
                if (qLabel) qLabel.textContent = '';
                if (feedback) { feedback.classList.add('hidden'); feedback.innerHTML = ''; }
            } catch {}
            return;
        }
        // Clear legacy phase content
        document.querySelectorAll('.phase-content').forEach(el => el.classList.add('hidden'));
        
        switch(phase) {
            case 'welcome':
                this.showWelcomeContent();
                break;
            case 'beginning':
                this.showQuestionContent(1, 'Q1');
                break;
            case 'middle':
                this.showQuestionContent(2, 'Q2');
                break;
            case 'end':
                this.showQuestionContent(3, 'Q3');
                break;
            case 'wisdom':
                this.showWisdomContent();
                break;
        }
    }

    /**
     * Show welcome phase content with date/time
     */
    showWelcomeContent() {
        const welcomeSection = document.querySelector('.welcome-content');
        if (welcomeSection) {
            welcomeSection.classList.remove('hidden');
            
            // Update welcome note with current date/time
            const welcomeNote = welcomeSection.querySelector('.welcome-note');
            if (welcomeNote) {
                const now = new Date();
                const dateStr = now.toLocaleDateString('en-US', { 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                });
                const timeStr = now.toLocaleTimeString('en-US', { 
                    hour: 'numeric', 
                    minute: '2-digit',
                    hour12: true 
                });
                
                welcomeNote.innerHTML = `
                    <p>Today is ${dateStr}</p>
                    <p>Your local time is ${timeStr}</p>
                    <p>Today's lesson is all about <strong>${this.currentLesson?.title || 'Learning'}</strong>!</p>
                `;
            }
        }
    }

    /**
     * Show question content with A/B choices
     */
    showQuestionContent(questionNumber, questionLabel) {
        const questionSection = document.querySelector('.question-content');
        if (questionSection) {
            questionSection.classList.remove('hidden');
            
            // Update question label
            const qLabel = questionSection.querySelector('.question-label');
            if (qLabel) {
                qLabel.textContent = questionLabel;
            }
            
            // Show A/B choice buttons
            const choicesContainer = questionSection.querySelector('.choices-container');
            if (choicesContainer) {
                // Pull content for this question
                const qKey = ['question_1','question_2','question_3'][questionNumber-1] || 'question_1';
                const age = this.currentVariant.age || 'age_25';
                const dnaAge = this.mapAgeVariantToNumeric(age);
                const blk = this.currentDNA?.core_lesson_structure?.[qKey]?.ages?.[dnaAge];
                const aText = blk?.option_a?.display_text || this.universalContent?.questions?.[questionNumber-1]?.choices?.[0] || 'Option A';
                const bText = blk?.option_b?.display_text || this.universalContent?.questions?.[questionNumber-1]?.choices?.[1] || 'Option B';
                choicesContainer.innerHTML = `
                    <button class="choice-btn choice-a" data-choice="a">${aText}</button>
                    <button class="choice-btn choice-b" data-choice="b">${bText}</button>
                `;
                
                // Add click handlers
                choicesContainer.querySelectorAll('.choice-btn').forEach(btn => {
                    btn.addEventListener('click', (e) => {
                        const choice = e.target.dataset.choice;
                        this.handleQuestionChoice(questionNumber, choice);
                    });
                });
            }
        }
    }

    /**
     * Show wisdom phase content
     */
    showWisdomContent() {
        const wisdomSection = document.querySelector('.wisdom-content');
        if (wisdomSection) {
            wisdomSection.classList.remove('hidden');
            
            // Show three wisdom sections
            const wisdomSections = wisdomSection.querySelectorAll('.wisdom-section');
            wisdomSections.forEach((section, index) => {
                section.classList.remove('hidden');
                // Add wisdom content based on lesson completion
                section.innerHTML = `<div class="wisdom-placeholder">Wisdom ${index + 1}</div>`;
            });
        }
    }

    /**
     * Handle question choice selection
     */
    handleQuestionChoice(questionNumber, choice) {
        console.log(`Question ${questionNumber} answered: ${choice}`);
        
        // Store answer
        if (!this.userAnswers) this.userAnswers = [];
        this.userAnswers[questionNumber - 1] = choice;
        
        // Provide immediate feedback
        this.showChoiceFeedback(questionNumber, choice);
        
        // Auto-advance after feedback
        setTimeout(() => {
            this.nextPhase();
        }, 2000);
    }

    /**
     * Show feedback for user choice
     */
    showChoiceFeedback(questionNumber, choice) {
        const feedbackContainer = document.querySelector('.choice-feedback');
        if (!feedbackContainer) return;
        feedbackContainer.classList.remove('hidden');

        const idx = questionNumber - 1;
        const correct = this.isSelectedCorrect(idx, choice);
        const message = this.getQuestionFeedback(idx, choice);
        feedbackContainer.innerHTML = `
            <div class="feedback-message">
                <p>You chose option ${String(choice).toUpperCase()}.</p>
                <p>${message}</p>
            </div>
        `;
        this.updateAvatar(this.currentVariant.avatar, correct ? 'happy_celebrating' : 'concerned_thinking');
    }

    /**
     * Update avatar for specific phase
     */
    updateAvatarForPhase(phase) {
        const avatar = this.currentVariant.avatar;
        const tone = this.currentVariant.tone;
        
        // Use test data if available, otherwise fallback
        let expression = 'neutral_default';
        
        if (this.universalContent?.testData?.avatarExpressions) {
            const phaseIndex = this.lessonPhases.indexOf(phase);
            expression = this.universalContent.testData.avatarExpressions[phaseIndex] || 'neutral_default';
            console.log(`🎭 TEST: Setting avatar expression to '${expression}' for phase '${phase}'`);
        } else {
            // Fallback logic
            switch (phase) {
                case 'welcome':
                    expression = tone === 'grandmother' ? 'welcoming_engaging' : 
                               tone === 'fun' ? 'excited_celebrating' : 'teaching_explaining';
                    break;
                case 'beginning':
                case 'middle':
                case 'end':
                    expression = 'question_curious';
                    break;
                case 'wisdom':
                    expression = tone === 'grandmother' ? 'happy_celebrating' : 
                               tone === 'fun' ? 'excited_celebrating' : 'teaching_explaining';
                    break;
            }
        }
        
        this.updateAvatar(avatar, expression);
        console.log(`✅ Avatar updated: ${avatar} with expression: ${expression}`);
    }

    /**
     * Show content for specific phase
     */
    showPhaseContent(phase) {
        console.log(`📝 Showing content for phase: ${phase}`);
        
        const lessonContentOverlay = document.getElementById('lesson-content-overlay');
        const lessonContent = document.getElementById('lesson-content');
        const lessonText = document.getElementById('lesson-text');
        
        // Get phase-specific content
        const phaseContent = this.getPhaseContent(phase);
        
        // Show overlay when there is content
        if (phaseContent && phaseContent !== 'Content not available') {
            // Show the overlay
            if (lessonContentOverlay) {
                lessonContentOverlay.style.display = 'block';
            }
            
            if (!lessonContent || !lessonText) {
                console.error('❌ Lesson content elements not found');
                return;
            }

            // Format and display content
                lessonText.innerHTML = this.formatPhaseContent(phaseContent, phase);
            
            // Show with animation
            lessonContent.style.display = 'block';
            lessonContent.style.opacity = '0';
            lessonContent.style.transform = 'translateY(20px)';
            
            setTimeout(() => {
                lessonContent.style.opacity = '1';
                lessonContent.style.transform = 'translateY(0)';
            }, 100);
        } else {
            // Hide overlay if no content
            if (lessonContentOverlay) {
                lessonContentOverlay.style.display = 'none';
            }
            console.log('📝 No content for phase, keeping overlay hidden');
        }
    }

    /**
     * Get content for specific phase
     */
    getPhaseContent(phase) {
        // Generate content if not available
        if (!this.universalContent) {
            this.generateUniversalContent();
        }
        
        // Use the dummy content from universalContent
        if (this.universalContent) {
            switch (phase) {
                case 'welcome':
                    return this.universalContent.introduction || '';
                case 'beginning':
                    return this.universalContent.questions?.[0] || '';
                case 'middle':
                    return this.universalContent.questions?.[1] || '';
                case 'end':
                    return this.universalContent.questions?.[2] || '';
                case 'wisdom':
                    return this.universalContent.conclusion || '';
                default:
                    return 'Phase content not available';
            }
        }
        
        // Fallback
        return 'Welcome to today\'s lesson!';
    }

    /**
     * Format phase content appropriately
     */
    formatPhaseContent(content, phase) {
        if (['beginning','middle','end'].includes(phase)) {
            return this.formatQuestionContent(content);
        } else {
            return this.formatTextContent(content, phase);
        }
    }

    /**
     * Format question content
     */
    formatQuestionContent(questionData) {
        if (!questionData || typeof questionData === 'string') {
            return `<div class="content-text">${questionData || 'Question content not available'}</div>`;
        }
        
        let html = `<div class="question-container">`;
        html += `<h3 class="question-text">${questionData.question || 'Question'}</h3>`;
        
        if (questionData.choices && questionData.choices.length > 0) {
            html += `<div class="choices-container">`;
            questionData.choices.forEach((choice, index) => {
                html += `
                    <button class="choice-btn" data-choice="${index}" onclick="window.lessonPlayer.handleQuestionAnswer(${this.currentPhase - 1}, ${index})">
                        ${choice}
                    </button>
                `;
            });
            html += `</div>`;
        }
        
        html += `</div>`;
        return html;
    }

    /**
     * Format text content
     */
    formatTextContent(text, phase) {
        let formatted = text.replace(/\n/g, '<br>');
        
        // Add emphasis for important points
        if (phase === 'opening') {
            formatted = formatted.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
        }
        
        return `<div class="content-text ${phase}-text">${formatted}</div>`;
    }

    /**
     * Generate and play audio for phase
     */
    async generateAndPlayPhaseAudio(phase) {
        try {
            const content = this.getPhaseContent(phase);
            const avatar = this.currentVariant.avatar;
            const vo = this.getVoiceOverForPhase(phase, content);
            await this.speak(vo, avatar);
        } catch (error) {
            console.error('❌ Audio generation error:', error);
            this.useFallbackAudio(phase);
        }
    }

    getVoiceOverForPhase(phase, content){
        try {
            const tone = this.currentVariant.tone || 'neutral';
            const ageVariant = this.currentVariant.age || 'age_25';
            const age = this.mapAgeVariantToNumeric(ageVariant);
            if (this.currentDNA?.metadata?.version === 'phase_v1') {
                const p = this.currentDNA?.phases?.find(x=>x.id===phase);
                if (p?.narration?.voiceOver) return p.narration.voiceOver;
            }
            if (phase === 'welcome') {
                const vo = this.currentDNA?.age_expressions?.[age]?.concept_name?.[tone]?.voice_over_script || '';
                if (vo) return vo;
                return (typeof content === 'string') ? content : (content?.question || 'Welcome');
            }
            if (['beginning','middle','end'].includes(phase)) {
                const idx = {beginning:1, middle:2, end:3}[phase];
                const qKey = ['question_1','question_2','question_3'][idx-1];
                const blk = this.currentDNA?.core_lesson_structure?.[qKey]?.ages?.[age];
                const qText = blk?.question?.[tone]?.display_text || blk?.question?.neutral?.display_text || content?.question || '';
                const aText = blk?.option_a?.display_text || (content?.choices?.[0] || '');
                const bText = blk?.option_b?.display_text || (content?.choices?.[1] || '');
                return `Question ${idx}. ${qText}. Option A: ${aText}. Option B: ${bText}. Choose when you are ready.`;
            }
            if (phase === 'wisdom') {
                if (this.currentDNA?.metadata?.version === 'phase_v1') {
                    const p = this.currentDNA?.phases?.find(x=>x.id==='wisdom');
                    if (p?.narration?.voiceOver) return p.narration.voiceOver;
                }
                const fortune = this.currentDNA?.wisdom_phase_content?.fortune?.[tone]?.voice_over_script || this.universalContent?.conclusion || '';
                return fortune || 'Well done today.';
            }
        } catch {}
        return (typeof content === 'string') ? content : (content?.question || '');
    }

    startReadAlong(text){
        const ra = this.readAlong; if (!ra || !ra.el) return;
        clearInterval(ra.timer); ra.timer = null; ra.index = 0; ra.paused = false;
        const words = String(text||'').split(/\s+/).filter(Boolean);
        ra.words = words;
        ra.el.innerHTML = words.map((w,i)=>`<span data-w="${i}">${w}</span>`).join(' ');
        const spans = ra.el.querySelectorAll('span'); ra.spans = spans;
        const wps = 180/60 * (this.playbackSpeed || 1.0);
        const intervalMs = Math.max(80, Math.floor(1000 / wps));
        ra.timer = setInterval(()=>{
            if (ra.index>0 && spans[ra.index-1]) spans[ra.index-1].style.background='transparent';
            if (ra.index<spans.length) {
                spans[ra.index].style.background='rgba(0,122,255,0.18)';
                spans[ra.index].style.borderRadius='6px';
                ra.index++;
            } else { clearInterval(ra.timer); ra.timer=null; }
        }, intervalMs);
    }

    resumeReadAlong(){
        const ra = this.readAlong; if (!ra || !ra.el || ra.paused === false) return;
        const spans = ra.spans && ra.spans.length ? ra.spans : ra.el.querySelectorAll('span');
        const wps = 180/60 * (this.playbackSpeed || 1.0);
        const intervalMs = Math.max(80, Math.floor(1000 / wps));
        clearInterval(ra.timer); ra.timer = setInterval(()=>{
            if (ra.index>0 && spans[ra.index-1]) spans[ra.index-1].style.background='transparent';
            if (ra.index<spans.length) {
                spans[ra.index].style.background='rgba(0,122,255,0.18)';
                spans[ra.index].style.borderRadius='6px';
                ra.index++;
            } else { clearInterval(ra.timer); ra.timer=null; }
        }, intervalMs);
        ra.paused = false;
    }

    /**
     * Use fallback audio system
     */
    useFallbackAudio(phase) {
        const duration = this.getPhaseDuration(phase);
        
        // Simulate audio playback
        setTimeout(() => {
            this.nextPhase();
        }, duration * 1000);
        
        console.log('🔊 Using fallback audio simulation for phase:', phase);
    }

    getPhaseTimingFromPhaseDNA(phaseId) {
        try { return this.currentDNA?.phases?.find(p => p.id === phaseId)?.timing || null; } catch { return null; }
    }

    handleNoChoiceTimeout(phaseId) {
        try {
            if (this.questionAnswered) return;
            let vo = '';
            if (this.currentDNA?.metadata?.version === 'phase_v1') {
                const p = this.currentDNA.phases.find(x => x.id === phaseId);
                vo = p?.narration?.onNoChoice || 'Let me show you how to think about this.';
            } else {
                vo = 'Let me walk you through it—notice the key detail that points to the answer.';
            }
            this.speak(vo, this.currentVariant.avatar);
            // Visual hint prompt if present
            try {
                const lessonText = document.getElementById('lesson-text');
                if (lessonText && this.currentDNA?.metadata?.version === 'phase_v1') {
                    const atKey = 'on_incorrect';
                    const p = this.currentDNA.phases.find(x => x.id === phaseId);
                    const steps = (p?.screen?.steps || []).filter(s => s.at === atKey);
                    steps.forEach(s => {
                        (s.show || []).forEach(u => { if (u.type === 'hint') { const div = document.createElement('div'); div.id = u.id||''; div.className = 'content-text'; div.style.opacity='0.9'; div.textContent = u.text || ''; lessonText.appendChild(div); } });
                    });
                }
            } catch {}
        } catch {}
        const idx = { beginning: 0, middle: 1, end: 2 }[phaseId] ?? 0;
        const sel = this.getCorrectChoiceForIndex(idx);
        this.showQuestionFeedback(idx, sel);
    }

    getCorrectChoiceForIndex(questionIndex) {
        try {
            const qKey = ['question_1','question_2','question_3'][questionIndex] || 'question_1';
            const age = this.currentVariant.age || 'age_25';
            const dnaAge = this.mapAgeVariantToNumeric(age);
            const blk = this.currentDNA?.core_lesson_structure?.[qKey]?.ages?.[dnaAge];
            const correct = (blk && blk.correct_option) ? blk.correct_option.toLowerCase() : 'b';
            return correct;
        } catch { return 'b'; }
    }

    previousPhase() {
        if (this.currentPhase <= 0) return;
        this.currentPhase -= 1;
        this.playCurrentPhase();
    }

    restartLesson() {
        this.currentPhase = 0;
        this.playCurrentPhase();
    }

    /**
     * Get duration for phase
     */
    getPhaseDuration(phase) {
        // Use test data if available for comprehensive testing
        if (this.universalContent?.testData?.phaseDurations) {
            const phaseIndex = this.lessonPhases.indexOf(phase);
            const duration = this.universalContent.testData.phaseDurations[phaseIndex] || 5;
            console.log(`⏱️ TEST: Phase '${phase}' duration: ${duration} seconds`);
            return duration;
        }
        
        // Fallback to age-appropriate durations
        const age = this.currentVariant.age;
        
        // Age-appropriate durations
        const durations = {
            age_2: { opening: 30, question: 45, closing: 30 },
            age_5: { opening: 45, question: 60, closing: 45 },
            age_8: { opening: 60, question: 90, closing: 60 },
            age_12: { opening: 75, question: 120, closing: 75 },
            age_16: { opening: 90, question: 150, closing: 90 },
            age_25: { opening: 90, question: 150, closing: 90 },
            age_40: { opening: 90, question: 150, closing: 90 },
            age_60: { opening: 90, question: 150, closing: 90 },
            age_80: { opening: 90, question: 150, closing: 90 },
            age_102: { opening: 90, question: 150, closing: 90 }
        };
        
        const ageDurations = durations[age] || durations.age_25;
        
        if (phase === 'opening') return ageDurations.opening;
        if (phase.includes('question')) return ageDurations.question;
        if (phase === 'closing') return ageDurations.closing;
        
        return 90; // Default duration
    }

    /**
     * Move to next phase
     */
    nextPhase() {
        this.currentPhase++;
        if (this.currentPhase < this.lessonPhases.length) {
            this.playCurrentPhase();
        } else {
            this.onLessonComplete();
        }
    }

    /**
     * Handle lesson completion
     */
    async onLessonComplete() {
        console.log('🎉 Universal lesson completed!');
        this.isPlaying = false;
        this.updatePlayButton();
        
        // Update Flask progress for lesson completion
        if (this.useFlaskProgress && this.flaskIntegration && this.flaskIntegration.isAuthenticated) {
            try {
                // Save phase 5 (daily fortune) completion
                await this.flaskIntegration.updateLessonProgress(
                    this.currentDay,
                    5,
                    true,
                    [],
                    this.getPhaseDuration(5) * 1000
                );
                console.log(`✅ Lesson completion saved to Flask for day ${this.currentDay}`);
                
                // Get habit status to show streak
                const habitStatus = await this.flaskIntegration.getHabitStatus();
                if (habitStatus) {
                    console.log(`🔥 Current streak: ${habitStatus.streak_days} days`);
                }
            } catch (error) {
                console.warn('⚠️ Failed to save lesson completion to Flask:', error);
            }
        }
        
        // Show completion message
        this.showPhaseContent('closing');
        
        // Show daily fortune
        setTimeout(() => {
            this.showDailyFortune();
        }, 3000);
    }

    /**
     * Show daily fortune
     */
    showDailyFortune() {
        if (this.universalContent && this.universalContent.fortune) {
            this.showPhaseContent('fortune');
        }
    }

    /**
     * Handle question answer
     */
    async handleQuestionAnswer(questionIndex, selectedOption) {
        console.log(`✅ Question ${questionIndex + 1} answered: ${selectedOption}`);
        
        // Update Flask progress if available
        if (this.useFlaskProgress && this.flaskIntegration && this.flaskIntegration.isAuthenticated) {
            try {
                const phase = questionIndex + 2; // Phase 2, 3, 4 for questions
                await this.flaskIntegration.updateLessonProgress(
                    this.currentDay,
                    phase,
                    true,
                    [selectedOption],
                    this.getPhaseDuration(phase) * 1000
                );
                console.log(`✅ Progress saved to Flask for phase ${phase}`);
            } catch (error) {
                console.warn('⚠️ Failed to save progress to Flask:', error);
            }
        }
        
        // Show feedback
        this.showQuestionFeedback(questionIndex, selectedOption);
        
        // Advance to next phase after delay
        setTimeout(() => {
            this.nextPhase();
        }, 3000);
    }

    /**
     * Show question feedback
     */
    showQuestionFeedback(questionIndex, selectedOption) {
        const lessonText = document.getElementById('lesson-text');
        if (!lessonText) return;
        
        const feedback = this.getQuestionFeedback(questionIndex, selectedOption);
        
        lessonText.innerHTML = `
            <div class="feedback-container">
                <h3>Great thinking!</h3>
                <p>${feedback}</p>
            </div>
        `;
        // Avatar + speak feedback
        const correct = this.isSelectedCorrect(questionIndex, selectedOption);
        this.updateAvatar(this.currentVariant.avatar, correct ? 'happy_celebrating' : 'concerned_thinking');
        this.speak(feedback, this.currentVariant.avatar);
        this.questionAnswered = true;
        clearTimeout(this.phaseTimers.noChoice);
    }

    /**
     * Get feedback for question answer
     */
    getQuestionFeedback(questionIndex, selectedOption) {
        try {
            const qKey = ['question_1','question_2','question_3'][questionIndex] || 'question_1';
            const age = this.currentVariant.age || 'age_25';
            const dnaAge = this.mapAgeVariantToNumeric(age);
            const blk = this.currentDNA?.core_lesson_structure?.[qKey]?.ages?.[dnaAge];
            if (blk && blk.teaching_moments) {
                const correct = this.isSelectedCorrect(questionIndex, selectedOption);
                return (correct ? blk.teaching_moments.option_b_response : blk.teaching_moments.option_a_response) || "Great thinking!";
            }
        } catch {}
        return "You're thinking about this in a wonderful way! This understanding will help you in many areas of life.";
    }

    isSelectedCorrect(questionIndex, selectedOption) {
        try {
            const qKey = ['question_1','question_2','question_3'][questionIndex] || 'question_1';
            const age = this.currentVariant.age || 'age_25';
            const dnaAge = this.mapAgeVariantToNumeric(age);
            const blk = this.currentDNA?.core_lesson_structure?.[qKey]?.ages?.[dnaAge];
            const correct = (blk && blk.correct_option) ? blk.correct_option.toLowerCase() : 'b';
            const sel = (String(selectedOption).toLowerCase() === 'a' || selectedOption === 0) ? 'a' : 'b';
            return sel === correct;
        } catch { return false; }
    }

    /**
     * Update avatar
     */
    updateAvatar(avatar, expression) {
        const avatarContainer = document.getElementById('avatar-container');
        if (!avatarContainer) return;
        
        // Update avatar container class
        avatarContainer.className = `avatar-container ${avatar}-active`;
        
        // Map expressions to correct image paths
        let imagePath;
        switch (expression) {
            case 'teaching_explaining':
            case 'question_curious':
                imagePath = `/production-deploy/assets/avatars/${avatar}/lesson-sequence/${avatar}_${expression}.png`;
                break;
            case 'concerned_thinking':
            case 'happy_celebrating':
                imagePath = `/production-deploy/assets/avatars/${avatar}/emotional-expressions/${avatar}_${expression}.png`;
                break;
            default:
                imagePath = `/production-deploy/assets/avatars/${avatar}/${avatar}_neutral_default.png`;
        }
        
        avatarContainer.style.backgroundImage = `url('${imagePath}')`;
        
        console.log(`🎭 Avatar updated: ${avatar} with expression: ${expression} using path: ${imagePath}`);
    }

    /**
     * Update lesson info display
     */
    updateLessonInfo(lessonData) {
        console.log('📝 Updating lesson info:', lessonData);
        
        // Update the lesson info overlay in index.html
        const lessonInfoTitle = document.getElementById('lesson-info-title');
        const lessonInfoObjective = document.getElementById('lesson-info-objective');
        
        if (lessonInfoTitle) {
            lessonInfoTitle.textContent = lessonData.title;
        }
        
        if (lessonInfoObjective) {
            lessonInfoObjective.textContent = lessonData.learning_objective;
        }
        
        // Lesson content overlay title doesn't exist, so we skip that
        
        console.log('✅ Lesson info updated with:', lessonData.title);
    }

    /**
     * Update calendar selection
     */
    updateCalendarSelection(selectedDay) {
        // Remove previous selection
        document.querySelectorAll('.calendar-day.selected').forEach(day => {
            day.classList.remove('selected');
        });
        
        // Add new selection
        const selectedDayElement = document.querySelector(`[onclick*="${selectedDay}"]`);
        if (selectedDayElement) {
            selectedDayElement.classList.add('selected');
        }
    }

    /**
     * Get current day of year
     */
    getCurrentDayOfYear() {
        const now = new Date();
        const start = new Date(now.getFullYear(), 0, 0);
        const diff = now - start;
        const oneDay = 1000 * 60 * 60 * 24;
        return Math.floor(diff / oneDay);
    }

    /**
     * Get current month (1-12)
     */
    getCurrentMonth() {
        return new Date().getMonth() + 1;
    }

    /**
     * Get month name
     */
    getMonthName(month) {
        const months = [
            'January', 'February', 'March', 'April', 'May', 'June',
            'July', 'August', 'September', 'October', 'November', 'December'
        ];
        return months[month - 1] || 'Unknown';
    }

    /**
     * Get days in month
     */
    getDaysInMonth(month) {
        const daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        return daysInMonth[month - 1] || 31;
    }

    /**
     * Get day of year for month and day
     */
    getDayOfYear(month, day) {
        const daysInMonth = [0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        let dayOfYear = day;
        
        for (let i = 1; i < month; i++) {
            dayOfYear += daysInMonth[i];
        }
        
        return dayOfYear;
    }

    /**
     * Get lesson data for day
     */
    getLessonDataForDay(day) {
        // Use the complete curriculum with 366 daily topics
        if (window.COMPLETE_CURRICULUM && window.COMPLETE_CURRICULUM[day]) {
            const lessonData = window.COMPLETE_CURRICULUM[day];
            console.log(`✅ Found lesson for day ${day}: ${lessonData.title}`);
            return lessonData;
        }
        
        // Fallback to current day if specific day not found
        const currentDay = this.getCurrentDayOfYear();
        if (window.COMPLETE_CURRICULUM && window.COMPLETE_CURRICULUM[currentDay]) {
            console.log(`⚠️ Day ${day} not found, using current day ${currentDay}`);
            return window.COMPLETE_CURRICULUM[currentDay];
        }
        
        console.warn(`❌ No lesson data available for day ${day}`);
        return null;
    }

    /**
     * Load current lesson
     */
    async loadCurrentLesson() {
        console.log(`📚 Loading current lesson for day ${this.currentDay}...`);
        await this.loadLessonByDay(this.currentDay);
        // Prefer a real PhaseDNA demo if today's lesson lacks PhaseDNA
        try {
            const isPhaseDNA = this.currentDNA && this.currentDNA.metadata && this.currentDNA.metadata.version === 'phase_v1';
            if (!isPhaseDNA) {
                console.log('ℹ️ Today\'s topic lacks PhaseDNA. Loading Sun (day 1) demo.');
                await this.loadLessonByDay(1);
            }
        } catch {}
        if (this.autoplay) {
            console.log('▶️ Autorun enabled. Starting lesson automatically.');
            this.startUniversalLesson();
        } else {
            console.log('⏳ Lesson loaded and ready. Waiting for Start.');
        }
    }

    /**
     * Select day
     */
    selectDay(day) {
        console.log(`📅 Selected day ${day}`);
        this.loadLessonByDay(day);
    }

    /**
     * Previous month
     */
    previousMonth() {
        let currentMonth = this.getCurrentMonth();
        currentMonth = currentMonth > 1 ? currentMonth - 1 : 12;
        this.generateMonthCalendar(currentMonth);
    }

    /**
     * Next month
     */
    nextMonth() {
        let currentMonth = this.getCurrentMonth();
        currentMonth = currentMonth < 12 ? currentMonth + 1 : 1;
        this.generateMonthCalendar(currentMonth);
    }

    /**
     * Setup event listeners
     */
    setupEventListeners() {
        // Start lesson button
        document.addEventListener('click', (e) => {
            if (e.target.id === 'start-lesson-btn') {
                this.startUniversalLesson();
            }
        });

        // Variant control event listeners
        this.setupVariantEventListeners();

        // Audio controls
        const volumeSlider = document.getElementById('volume-slider');
        if (volumeSlider) {
            volumeSlider.addEventListener('input', (e) => {
                this.setVolume(e.target.value / 100);
            });
        }

        // Play controls
        const playButton = document.getElementById('play-btn');
        if (playButton) {
            playButton.addEventListener('click', () => {
                this.togglePlayback();
            });
        }

        // Navigation - REMOVED to avoid conflicts with existing onclick handlers
        // The existing system has onclick handlers that should work

        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            this.handleKeyboardShortcuts(e);
        });
    }

    /**
     * Setup variant event listeners
     */
    setupVariantEventListeners() {
        // Avatar selection
        const avatarSelect = document.getElementById('avatar-select');
        if (avatarSelect) {
            avatarSelect.addEventListener('change', (e) => {
                this.onAvatarChange(e.target.value);
            });
        }

        // Tone selection
        const toneSelect = document.getElementById('tone-select');
        if (toneSelect) {
            toneSelect.addEventListener('change', (e) => {
                this.onToneChange(e.target.value);
            });
        }

        // Language selection
        const languageSelect = document.getElementById('language-select');
        if (languageSelect) {
            languageSelect.addEventListener('change', (e) => {
                this.onLanguageChange(e.target.value);
            });
        }

        // Age selection
        const ageSelect = document.getElementById('age-select');
        if (ageSelect) {
            ageSelect.addEventListener('change', (e) => {
                this.onAgeChange(e.target.value);
            });
        }
    }

    /**
     * Handle avatar change
     */
    onAvatarChange(newAvatar) {
        console.log('🎭 Avatar changed to:', newAvatar);
        this.currentVariant.avatar = newAvatar;
        try { localStorage.setItem('variant_avatar', newAvatar); } catch {}
        
        // Update avatar display immediately
        this.updateAvatar(newAvatar, this.getAvatarExpression(this.currentVariant.tone));
        this.preloadAvatarAssets(newAvatar);
        
        // Regenerate content and update display if lesson is active
        if (this.isPlaying) {
            this.generateUniversalContent();
            // Update current phase content immediately
            const currentPhase = this.lessonPhases[this.currentPhase];
            this.showPhaseContent(currentPhase);
        }
    }

    /**
     * Handle tone change
     */
    onToneChange(newTone) {
        console.log('🎨 Tone changed to:', newTone);
        this.currentVariant.tone = newTone;
        try { localStorage.setItem('variant_tone', newTone); } catch {}
        
        // Update avatar expression
        this.updateAvatar(this.currentVariant.avatar, this.getAvatarExpression(newTone));
        
        // Regenerate content and update display if lesson is active
        if (this.isPlaying) {
            this.generateUniversalContent();
            // Update current phase content immediately
            const currentPhase = this.lessonPhases[this.currentPhase];
            this.showPhaseContent(currentPhase);
        }
    }

    /**
     * Handle language change
     */
    onLanguageChange(newLanguage) {
        console.log('🌍 Language changed to:', newLanguage);
        this.currentVariant.language = newLanguage;
        try { localStorage.setItem('variant_language', newLanguage); } catch {}
        
        // Reload DNA for current day so language-specific files are used
        const day = this.selectedDay || this.currentDay;
        this.loadDNALesson(day).then(()=>{
            if (this.isPlaying) {
                this.generateUniversalContent();
                const currentPhase = this.lessonPhases[this.currentPhase];
                if (this.currentDNA?.metadata?.version === 'phase_v1') {
                    this.playCurrentPhase();
                } else {
                    this.showPhaseContent(currentPhase);
                }
            }
        });
    }

    /**
     * Handle age change
     */
    onAgeChange(newAge) {
        console.log('👶 Age changed to:', newAge);
        this.currentVariant.age = newAge;
        try { localStorage.setItem('variant_age', newAge); } catch {}
        
        // Regenerate content and update display if lesson is active
        if (this.isPlaying) {
            this.generateUniversalContent();
            // Update current phase content immediately
            const currentPhase = this.lessonPhases[this.currentPhase];
            this.showPhaseContent(currentPhase);
        }
    }

    /**
     * Get avatar expression for tone
     */
    getAvatarExpression(tone) {
        const expressions = {
            grandmother: 'welcoming_engaging',
            fun: 'excited_celebrating',
            neutral: 'teaching_explaining'
        };
        return expressions[tone] || 'neutral_default';
    }

    /**
     * Setup audio events
     */
    setupAudioEvents() {
        this.audioElement.addEventListener('loadedmetadata', () => {
            this.duration = this.audioElement.duration;
            this.updateProgressBar();
        });

        this.audioElement.addEventListener('timeupdate', () => {
            this.currentTime = this.audioElement.currentTime;
            this.updateProgressBar();
        });

        this.audioElement.addEventListener('ended', () => {
            this.nextPhase();
        });

        this.audioElement.addEventListener('pause', () => {
            const ra = this.readAlong; if (!ra) return;
            ra.paused = true; if (ra.timer) { clearInterval(ra.timer); ra.timer = null; }
        });
        this.audioElement.addEventListener('play', () => {
            const ra = this.readAlong; if (!ra) return; ra.paused = false; this.resumeReadAlong();
        });

        this.audioElement.addEventListener('error', (e) => {
            console.error('Audio error:', e);
            this.showError('Audio playback failed');
        });
    }

    /**
     * Toggle playback
     */
    togglePlayback() {
        if (this.isPlaying) {
            this.pauseLesson();
        } else {
            this.resumeLesson();
        }
    }

    /**
     * Pause lesson
     */
    pauseLesson() {
        this.isPlaying = false;
        this.audioElement.pause();
        this.updatePlayButton();
    }

    /**
     * Resume lesson
     */
    resumeLesson() {
        this.isPlaying = true;
        this.audioElement.play();
        this.updatePlayButton();
    }

    /**
     * Update play button
     */
    updatePlayButton() {
        const playBtn = document.getElementById('play-btn');
        if (playBtn) {
            playBtn.textContent = this.isPlaying ? '⏸️' : '▶️';
        }
    }

    /**
     * Update progress bar
     */
    updateProgressBar() {
        const progressFill = document.getElementById('progress-fill');
        if (progressFill && this.duration > 0) {
            const progress = (this.currentTime / this.duration) * 100;
            progressFill.style.width = `${progress}%`;
        }
    }

    /**
     * Set volume
     */
    setVolume(volume) {
        this.volume = Math.max(0, Math.min(1, volume));
        if (this.audioElement) {
            this.audioElement.volume = this.volume;
        }
        console.log(`🔊 Volume set to ${this.volume}`);
    }

    /**
     * Set playback speed
     */
    setSpeed(speed) {
        this.playbackSpeed = Math.max(0.5, Math.min(2.0, speed));
        if (this.audioElement) {
            this.audioElement.playbackRate = this.playbackSpeed;
        }
        console.log(`⚡ Speed set to ${this.playbackSpeed}x`);
        if (this.isPlaying && this.readAlong) {
            this.resumeReadAlong();
        }
    }

    /**
     * Pause lesson
     */
    pauseLesson() {
        this.isPlaying = false;
        if (this.audioElement) {
            this.audioElement.pause();
        }
        console.log('⏸️ Lesson paused');
    }

    /**
     * Resume lesson
     */
    resumeLesson() {
        this.isPlaying = true;
        if (this.audioElement) {
            this.audioElement.play();
        }
        console.log('▶️ Lesson resumed');
    }

    /**
     * Repeat current phase
     */
    repeatCurrentPhase() {
        console.log('🔄 Repeating current phase');
        this.playCurrentPhase();
    }

    /**
     * Handle navigation
     */
    handleNavigation(section) {
        switch (section) {
            case 'calendar':
                this.toggleCalendar();
                break;
            case 'variants':
                this.toggleVariantControls();
                break;
            case 'tone':
                this.toggleToneControls();
                break;
            case 'avatar':
                this.toggleAvatarControls();
                break;
            case 'language':
                this.toggleLanguageControls();
                break;
            case 'age':
                this.toggleAgeControls();
                break;
            default:
                console.log('Navigation:', section);
        }
    }

    /**
     * Toggle calendar
     */
    toggleCalendar() {
        const overlay = document.getElementById('calendar-overlay');
        if (overlay) {
            overlay.style.display = overlay.style.display === 'none' ? 'block' : 'none';
        }
    }

    /**
     * Toggle variant controls
     */
    toggleVariantControls() {
        console.log('📋 Variant controls toggled');
    }

    /**
     * Toggle tone controls
     */
    toggleToneControls() {
        const overlay = document.getElementById('tone-overlay');
        if (overlay) {
            overlay.style.display = overlay.style.display === 'none' ? 'block' : 'none';
        }
    }

    /**
     * Toggle avatar controls
     */
    toggleAvatarControls() {
        const overlay = document.getElementById('avatar-overlay');
        if (overlay) {
            overlay.style.display = overlay.style.display === 'none' ? 'block' : 'none';
        }
    }

    /**
     * Toggle language controls
     */
    toggleLanguageControls() {
        const overlay = document.getElementById('language-overlay');
        if (overlay) {
            overlay.style.display = overlay.style.display === 'none' ? 'block' : 'none';
        }
    }

    /**
     * Toggle age controls
     */
    toggleAgeControls() {
        const overlay = document.getElementById('age-overlay');
        if (overlay) {
            overlay.style.display = overlay.style.display === 'none' ? 'block' : 'none';
        }
    }

    /**
     * Handle keyboard shortcuts
     */
    handleKeyboardShortcuts(e) {
        switch (e.key) {
            case ' ':
                e.preventDefault();
                this.togglePlayback();
                break;
            case 'ArrowLeft':
                e.preventDefault();
                this.previousMonth();
                break;
            case 'ArrowRight':
                e.preventDefault();
                this.nextMonth();
                break;
            case 'Escape':
                this.closeAllOverlays();
                break;
        }
    }

    /**
     * Close all overlays
     */
    closeAllOverlays() {
        const overlays = [
            'calendar-overlay',
            'tone-overlay',
            'avatar-overlay',
            'language-overlay',
            'age-overlay'
        ];
        
        overlays.forEach(overlayId => {
            const overlay = document.getElementById(overlayId);
            if (overlay) {
                overlay.style.display = 'none';
            }
        });
    }

    /**
     * Generate fallback universal content
     */
    generateFallbackUniversalContent(lessonData = null) {
        const lesson = lessonData || this.currentLesson;
        const title = lesson?.title || 'Universal Learning System';
        const objective = lesson?.learning_objective || 'testing all system interactions';
        
        // COMPREHENSIVE DUMMY LESSON THAT TESTS EVERYTHING
        return {
            introduction: `🎯 Welcome to the Universal Learning System Test! 

This is a comprehensive test of all system interactions. You'll see:
• Avatar expressions changing per phase
• Interactive questions with choices
• Audio generation (if available)
• Variant controls working
• Progress tracking
• All controls responding

Let's begin our journey through the 5-phase lesson system!`,

            questions: [
                {
                    question: "🎭 PHASE 1 TEST: Avatar Expression Change",
                    choices: [
                        "✅ Kelly should look curious/thinking now",
                        "❌ Avatar expression didn't change",
                        "❌ No avatar visible"
                    ],
                    feedback: "Correct! Kelly's expression should have changed to 'question_curious' for this phase."
                },
                {
                    question: "🎵 PHASE 2 TEST: Audio Generation",
                    choices: [
                        "✅ Audio is playing for this question",
                        "❌ Audio failed to generate",
                        "❌ No audio system available"
                    ],
                    feedback: "The system should attempt to generate audio for each phase using ElevenLabs."
                },
                {
                    question: "🎛️ PHASE 3 TEST: Variant Controls",
                    choices: [
                        "✅ I can change avatar/tone/language/age",
                        "❌ Variant controls don't work",
                        "❌ Controls are not visible"
                    ],
                    feedback: "Try changing the dropdowns in the top-right to see content adapt."
                }
            ],
            
            conclusion: `🎉 CONGRATULATIONS! You've completed the Universal Learning System test!

✅ What worked:
• Lesson progression through 5 phases
• Avatar expression changes
• Interactive question display
• Content formatting
• System responsiveness

🔧 What to test next:
• Audio generation with ElevenLabs
• Variant control interactions
• Calendar lesson selection
• Left-side playback controls
• Progress tracking

The system is ready for real curriculum integration!`,

            fortune: "🌟 Your dedication to testing shows excellent attention to detail. This system will help millions learn!",

            // ADDITIONAL TEST DATA
            testData: {
                avatarExpressions: ['teaching_explaining', 'question_curious', 'question_curious', 'question_curious', 'happy_celebrating'],
                phaseDurations: [5, 8, 8, 8, 5], // seconds per phase
                audioScripts: [
                    "Welcome to the Universal Learning System test. Let's explore all the features together.",
                    "Question one: How is the avatar expression working?",
                    "Question two: Is the audio generation functioning?",
                    "Question three: Can you change the variants?",
                    "Excellent work! You've completed the comprehensive system test."
                ],
                variantTests: {
                    avatar: ['kelly', 'ken'],
                    tone: ['grandmother', 'fun', 'neutral'],
                    language: ['english', 'spanish', 'french'],
                    age: ['age_8', 'age_16', 'age_25', 'age_40']
                }
            }
        };
    }

    /**
     * Show error message
     */
    showError(message) {
        console.error('❌ Error:', message);
        // Could implement toast notification here
    }

    /**
     * Speak text via ElevenLabs if available; fallback otherwise. Also starts read‑along.
     */
    async speak(text, avatar = null) {
        const narration = String(text || '').trim();
        if (!narration) return;
        try { this.startReadAlong(narration); } catch {}
        const chosenAvatar = avatar || this.currentVariant.avatar || 'kelly';
        // Use pre-synthesized cache if available
        try {
            const cached = this.preSynthCache.get(narration);
            if (cached) {
                this.audioElement.src = cached;
                this.audioElement.playbackRate = this.playbackSpeed;
                try { await this.audioElement.play(); } catch {}
                this.isPlaying = true; this.updatePlayButton();
                return;
            }
        } catch {}
        try {
            if (this.elevenLabs) {
                const result = await this.elevenLabs.generateAudio(narration, chosenAvatar);
                if (typeof result === 'string' && result.startsWith('blob:')) {
                    try { this.preSynthCache.set(narration, result); } catch {}
                    this.audioElement.src = result;
                    this.audioElement.playbackRate = this.playbackSpeed;
                    try {
                        await this.audioElement.play();
                    } catch (err) {
                        // Autoplay may be blocked; retry after first user gesture
                        await new Promise(resolve => {
                            const retry = () => { document.removeEventListener('click', retry); resolve(); };
                            document.addEventListener('click', retry, { once: true });
                        });
                        try { await this.audioElement.play(); } catch(_) {}
                    }
                    this.isPlaying = true;
                    this.updatePlayButton();
                    return;
                }
                return;
            }
        } catch (err) {
            console.warn('speak() ElevenLabs path failed; falling back', err);
        }
        try {
            this.isPlaying = true; this.updatePlayButton();
            const approxMs = Math.min(15000, Math.max(2000, narration.split(/\s+/).length * 300));
            setTimeout(()=>{ this.isPlaying = false; this.updatePlayButton(); }, approxMs);
        } catch {}
    }

    /**
     * Update inspector panels with live state, content, and DNA
     */
    updateInspectors() {
        try {
            const stateTarget = document.getElementById('state-inspector-content');
            const contentTarget = document.getElementById('content-inspector-content');
            const codeTarget = document.getElementById('code-inspector-content');

            if (stateTarget) {
                const state = {
                    day: this.selectedDay || this.currentDay,
                    phaseIndex: this.currentPhase,
                    phaseId: this.lessonPhases[this.currentPhase] || null,
                    isPlaying: this.isPlaying,
                    playbackSpeed: this.playbackSpeed,
                    volume: this.volume,
                    variant: { ...this.currentVariant },
                    timers: { hasNoChoiceTimer: !!this.phaseTimers?.noChoice },
                    answers: this.userAnswers || []
                };
                stateTarget.textContent = JSON.stringify(state, null, 2);
            }

            if (contentTarget) {
                const preview = {
                    introduction: this.universalContent?.introduction || null,
                    questions: (this.universalContent?.questions || []).map(q => ({
                        question: typeof q === 'string' ? q : q?.question,
                        choices: typeof q === 'string' ? [] : q?.choices
                    })),
                    conclusion: this.universalContent?.conclusion || null,
                    fortune: this.universalContent?.fortune || null
                };
                contentTarget.textContent = JSON.stringify(preview, null, 2);
            }

            if (codeTarget) {
                const dnaView = this.currentDNA ? (
                    this.currentDNA.metadata?.version === 'phase_v1' ? this.currentDNA : { schema: 'legacy_or_normalized', sample: this.currentDNA?.lesson_metadata || this.currentDNA?.metadata || {} }
                ) : { info: 'No DNA loaded yet' };
                const payload = { dna: dnaView, warnings: this.dnaWarnings || [] };
                codeTarget.textContent = JSON.stringify(payload, null, 2);
            }
        } catch {}
    }

    /**
     * Preload avatar assets to reduce flicker
     */
    preloadAvatarAssets(avatar) {
        try {
            const base = `/production-deploy/assets/avatars/${avatar}`;
            const paths = [
                `${base}/${avatar}_neutral_default.png`,
                `${base}/lesson-sequence/${avatar}_teaching_explaining.png`,
                `${base}/lesson-sequence/${avatar}_question_curious.png`,
                `${base}/emotional-expressions/${avatar}_concerned_thinking.png`,
                `${base}/emotional-expressions/${avatar}_happy_celebrating.png`
            ];
            paths.forEach(p => { const img = new Image(); img.src = p; });
        } catch {}
    }

    /**
     * Show loading
     */
    showLoading() {
        console.log('⏳ Loading...');
    }

    /**
     * Hide loading
     */
    hideLoading() {
        console.log('✅ Loading complete');
    }
}

// Lesson player will be initialized by index.html to avoid double initialization 