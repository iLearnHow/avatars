// src/player.js - A clean, data-driven lesson player module.
// Safety redirect: if this legacy module is served at '/', redirect to hardened entry
try {
  if (typeof window !== 'undefined') {
    const p = window.location && window.location.pathname ? window.location.pathname : '/';
    const isRoot = (p === '/' || p === '/index.html');
    if (isRoot) {
      const cb = `cb=${Date.now()}`;
      window.location.replace(`/production-deploy/index.html?${cb}`);
    }
  }
} catch (e) {}

class UniversalLessonPlayer {
    constructor(lessonData, options = {}) {
        console.log("1. Player constructor called.");
        this.lesson = lessonData;
        this.options = options;
        this.state = {
            phase: 0,
            age: options.defaultAge || 'young_adult',
            tone: options.defaultTone || 'neutral',
            avatar: options.defaultAvatar || 'kelly',
            language: options.defaultLanguage || 'english',
            speed: options.defaultSpeed || 1.0
        };
        this.initialize();
    }

    // Defensive no-op to satisfy older initializers that expect this method
    _makeInspectorsDraggable() {
        // no-op; modern player wires inspectors differently
    }

    initialize() {
        console.log("2. Initializing player...");
        this.cacheDom();
        this.bindEvents();
        this.render();
        if (this.dom.loading) {
            this.dom.loading.style.display = 'none';
        }
        console.log("🚀 Player Initialized & First Render Complete");
    }

    cacheDom() {
        console.log("3. Caching DOM elements...");
        this.dom = {
            loading: document.getElementById('loading'),
            lessonTitle: document.getElementById('lesson-title'),
            lessonPreview: document.getElementById('lesson-preview'),
            phases: document.querySelectorAll('.phase'),
            avatarBackground: document.getElementById('avatar-background'),
            ageButtons: document.querySelectorAll('[data-age]'),
            toneButtons: document.querySelectorAll('[data-tone]'),
            avatarButtons: document.querySelectorAll('[data-avatar]'),
            choiceButtons: document.querySelectorAll('.choice-note'),
            nextBtn: document.getElementById('next-btn'),
            prevBtn: document.getElementById('prev-btn'),
            restartBtn: document.getElementById('restart-btn'),
            // Questions
            beginning: document.getElementById('beginning-phase'),
            middle: document.getElementById('middle-phase'),
            end: document.getElementById('end-phase'),
            wisdom: document.getElementById('wisdom-phase'),
            fortune: document.getElementById('daily-fortune'),
            // Inspectors
            stateInspector: document.getElementById('state-inspector'),
            contentInspector: document.getElementById('content-inspector'),
            codeInspector: document.getElementById('code-inspector'),
            stateInspectorToggle: document.getElementById('inspector-state-toggle'),
            contentInspectorToggle: document.getElementById('inspector-content-toggle'),
            codeInspectorToggle: document.getElementById('inspector-code-toggle'),
            inspectorCloseBtns: document.querySelectorAll('.inspector-close-btn'),
            // Read along
            readAlong: document.getElementById('read-along-player'),
            // Master flyout
            masterFlyoutContainer: document.querySelector('.master-flyout-container'),
            masterTrigger: document.getElementById('master-trigger'),
            // Right rail
            rail: document.getElementById('right-icon-rail'),
            iconLive: document.getElementById('icon-live'),
            iconFind: document.getElementById('icon-find'),
            iconSettings: document.getElementById('icon-settings'),
            iconCalendar: document.getElementById('icon-calendar'),
            iconModel: document.getElementById('icon-model'),
            iconTone: document.getElementById('icon-tone'),
            iconLanguage: document.getElementById('icon-language'),
            iconAge: document.getElementById('icon-age'),
            iconSpeed: document.getElementById('icon-speed'),
            iconControls: document.getElementById('icon-controls'),
            // Modals
            liveModal: document.getElementById('live-modal'),
            liveCountdown: document.getElementById('live-countdown'),
            startLiveNow: document.getElementById('start-live-now'),
            findModal: document.getElementById('find-modal'),
            findInput: document.getElementById('find-input'),
            findResults: document.getElementById('find-results'),
            settingsModal: document.getElementById('settings-modal'),
            calendarModal: document.getElementById('calendar-modal'),
            goYesterday: document.getElementById('go-yesterday'),
            goToday: document.getElementById('go-today'),
            goTomorrow: document.getElementById('go-tomorrow'),
            calendarResults: document.getElementById('calendar-results'),
            languageModal: document.getElementById('language-modal'),
            speedModal: document.getElementById('speed-modal'),
            controlsModal: document.getElementById('controls-modal'),
            modalCloseBtns: document.querySelectorAll('.modal-close'),
            // Media controls
            playPauseBtn: document.getElementById('play-pause'),
            volumeUpBtn: document.getElementById('volume-up'),
            volumeDownBtn: document.getElementById('volume-down'),
            saveProgressBtn: document.getElementById('save-progress'),
            loadProgressBtn: document.getElementById('load-progress'),
            // Progress steps labels
            progressLabels: document.querySelectorAll('.progress-label-group'),
            progressLineFill: document.getElementById('progress-line-fill'),
            // Audio
            ttsAudio: document.getElementById('tts-audio')
        };
    }

    bindEvents() {
        console.log("4. Binding events...");
        // State pickers
        this.dom.ageButtons.forEach(btn => {
            btn.addEventListener('click', (e) => this.setState({ age: e.currentTarget.dataset.age }));
        });
        this.dom.toneButtons.forEach(btn => {
            btn.addEventListener('click', (e) => this.setState({ tone: e.currentTarget.dataset.tone }));
        });
        this.dom.avatarButtons.forEach(btn => {
            btn.addEventListener('click', (e) => this.setAvatar(e.currentTarget.dataset.avatar));
        });
        // Phase nav
        this.dom.nextBtn.addEventListener('click', () => this.changePhase(1));
        this.dom.prevBtn.addEventListener('click', () => this.changePhase(-1));
        this.dom.restartBtn.addEventListener('click', () => this.setState({ phase: 0}));

        this.dom.choiceButtons.forEach(btn => {
            btn.addEventListener('click', () => this.handleChoiceClick(btn));
        });

        // Inspectors
        const toggle = (el) => el?.classList.toggle('visible');
        this.dom.stateInspectorToggle?.addEventListener('click', () => toggle(this.dom.stateInspector));
        this.dom.contentInspectorToggle?.addEventListener('click', () => toggle(this.dom.contentInspector));
        this.dom.codeInspectorToggle?.addEventListener('click', () => toggle(this.dom.codeInspector));
        this.dom.inspectorCloseBtns.forEach(btn => btn.addEventListener('click', (e) => {
            const id = e.currentTarget.dataset.inspector; document.getElementById(id)?.classList.remove('visible');
        }));

        // Master flyout
        this.dom.masterTrigger?.addEventListener('click', () => this.dom.masterFlyoutContainer?.classList.toggle('active'));

        // Right rail icons
        this.dom.iconLive?.addEventListener('click', () => this.openModal(this.dom.liveModal));
        this.dom.iconFind?.addEventListener('click', () => { this.openModal(this.dom.findModal); this.ensureCurriculumLoaded(); });
        this.dom.iconSettings?.addEventListener('click', () => this.openModal(this.dom.settingsModal));
        this.dom.iconCalendar?.addEventListener('click', () => { this.openModal(this.dom.calendarModal); this.renderCalendarQuickLinks(); });
        this.dom.iconModel?.addEventListener('click', () => this.dom.masterFlyoutContainer?.classList.add('active'));
        this.dom.iconTone?.addEventListener('click', () => this.dom.masterFlyoutContainer?.classList.add('active'));
        this.dom.iconLanguage?.addEventListener('click', () => this.openModal(this.dom.languageModal));
        this.dom.iconAge?.addEventListener('click', () => this.dom.masterFlyoutContainer?.classList.add('active'));
        this.dom.iconSpeed?.addEventListener('click', () => this.openModal(this.dom.speedModal));
        this.dom.iconControls?.addEventListener('click', () => this.openModal(this.dom.controlsModal));

        // Modals close
        this.dom.modalCloseBtns.forEach(btn => btn.addEventListener('click', (e) => {
            const id = e.currentTarget.dataset.close; document.getElementById(id)?.classList.remove('visible');
        }));

        // Live countdown
        this.dom.startLiveNow?.addEventListener('click', () => this.launchLive());
        this.startLiveCountdown();

        // Find search
        this.dom.findInput?.addEventListener('input', (e) => this.searchCurriculum(e.currentTarget.value));

        // Calendar quick links
        this.dom.goYesterday?.addEventListener('click', () => this.loadLessonByDateOffset(-1));
        this.dom.goToday?.addEventListener('click', () => this.loadLessonByDateOffset(0));
        this.dom.goTomorrow?.addEventListener('click', () => this.loadLessonByDateOffset(1));

        // Media controls
        this.dom.playPauseBtn?.addEventListener('click', () => this.togglePlay());
        this.dom.volumeUpBtn?.addEventListener('click', () => this.adjustVolume(0.1));
        this.dom.volumeDownBtn?.addEventListener('click', () => this.adjustVolume(-0.1));
        this.dom.saveProgressBtn?.addEventListener('click', () => this.saveProgress());
        this.dom.loadProgressBtn?.addEventListener('click', () => this.loadProgress());

        // Progress labels click to jump
        this.dom.progressLabels.forEach(lbl => lbl.addEventListener('click', () => {
            const idx = Number(lbl.dataset.phase); if (!Number.isNaN(idx)) this.setState({ phase: idx });
        }));
    }

    handleChoiceClick(clickedButton) {
        const teachingMoment = clickedButton.querySelector('.teaching-moment');
        if (teachingMoment && teachingMoment.style.display !== 'block') {
            teachingMoment.style.display = 'block';
            clickedButton.style.transform = 'scale(0.98)';
            setTimeout(() => clickedButton.style.transform = 'scale(1)', 150);
            
            // Auto-advance to next phase after showing teaching moment
            const text = teachingMoment.textContent || '';
            this.speak(text);
            setTimeout(() => this.changePhase(1), 2500);
        }
    }

    setState(newState) {
        this.state = { ...this.state, ...newState };
        this.render();
    }

    setAvatar(avatar) {
        if (this.dom.avatarBackground) {
            this.dom.avatarBackground.className = `avatar-background ${avatar}`;
        }
        this.dom.avatarButtons.forEach(btn => {
             btn.classList.toggle('active', btn.dataset.avatar === avatar);
        });
        this.state.avatar = avatar;
    }

    changePhase(direction) {
        const newPhase = this.state.phase + direction;
        if (newPhase >= 0 && newPhase < this.lesson.phases.length) {
            this.setState({ phase: newPhase });
        }
    }

    render() {
        console.log(`5. Rendering for state:`, this.state);

        this.dom.ageButtons.forEach(btn => btn.classList.toggle('active', btn.dataset.age === this.state.age));
        this.dom.toneButtons.forEach(btn => btn.classList.toggle('active', btn.dataset.tone === this.state.tone));

        this.dom.phases.forEach((phaseEl, index) => {
            phaseEl.classList.toggle('active', index === this.state.phase);
        });

        const currentPhaseData = this.lesson.phases[this.state.phase];
        if (!currentPhaseData) return;

        const { age, tone } = this.state;
        const type = currentPhaseData.type;
        
        // Hide all teaching moments before rendering the correct one
        this.dom.choiceButtons.forEach(btn => {
            const tm = btn.querySelector('.teaching-moment');
            if(tm) tm.style.display = 'none';
        });

        if (type === 'welcome') {
            if (this.dom.lessonTitle) this.dom.lessonTitle.textContent = this.lesson.title || this.lesson.lesson_metadata?.universal_concept || 'Lesson';
            const welcomeScript = (currentPhaseData.avatar_script?.[tone]?.[age]) || currentPhaseData.content?.lesson_preview || '';
            if (this.dom.lessonPreview) this.dom.lessonPreview.textContent = welcomeScript || "";
            this.speak(welcomeScript);
        } else if (['beginning', 'middle', 'end'].includes(type)) {
            const phaseRoot = document.getElementById(`${type}-phase`);
            const questionEl = phaseRoot?.querySelector('.question-text');
            const choiceAEl = phaseRoot?.querySelector('.choice-a');
            const choiceBEl = phaseRoot?.querySelector('.choice-b');

            if (questionEl) questionEl.textContent = currentPhaseData.question_text;

            if (choiceAEl) {
                choiceAEl.querySelector('.choice-text').textContent = currentPhaseData.choices.option_a.text;
                const tmA = currentPhaseData.choices.option_a.teaching_moment;
                const tmAText = tmA?.[tone]?.[age] || tmA?.voice_over_script || tmA?.text || '';
                choiceAEl.querySelector('.teaching-moment').textContent = tmAText;
            }
            if (choiceBEl) {
                choiceBEl.querySelector('.choice-text').textContent = currentPhaseData.choices.option_b.text;
                const tmB = currentPhaseData.choices.option_b.teaching_moment;
                const tmBText = tmB?.[tone]?.[age] || tmB?.voice_over_script || tmB?.text || '';
                choiceBEl.querySelector('.teaching-moment').textContent = tmBText;
            }

        } else if (type === 'wisdom') {
            const fortuneEl = document.getElementById('daily-fortune');
            const daily = currentPhaseData.content?.daily_fortune;
            const text = daily?.[tone]?.[age] || daily?.[tone]?.voice_over_script || daily?.voice_over_script || '';
            if (fortuneEl) fortuneEl.textContent = text;
            this.speak(text);
        }

        // Update progress line
        this.updateProgressUi();

        // Update inspectors
        this.updateInspectors();
    }

    updateProgressUi() {
        if (!this.dom.progressLineFill) return;
        const pct = (this.state.phase / Math.max(1, this.lesson.phases.length - 1)) * 100;
        this.dom.progressLineFill.style.height = `${pct}%`;
        this.dom.progressLabels.forEach((lbl, idx) => {
            lbl.classList.toggle('active', idx === this.state.phase);
            lbl.classList.toggle('completed', idx < this.state.phase);
        });
    }

    updateInspectors() {
        const statePre = document.getElementById('state-inspector-content');
        const contentPre = document.getElementById('content-inspector-content');
        const codePre = document.getElementById('code-inspector-content');
        if (statePre) statePre.textContent = JSON.stringify(this.state, null, 2);
        if (contentPre) contentPre.textContent = JSON.stringify(this.lesson?.phases?.[this.state.phase] || {}, null, 2);
        if (codePre) codePre.textContent = JSON.stringify(this.lesson, null, 2);
    }

    openModal(modalEl) { modalEl?.classList.add('visible'); }

    // Live countdown
    startLiveCountdown() {
        if (!this.dom.liveCountdown) return;
        const update = () => {
            const now = new Date();
            const nextHour = new Date(now);
            nextHour.setMinutes(60, 0, 0);
            const ms = nextHour - now;
            const m = Math.floor(ms / 60000);
            const s = Math.floor((ms % 60000) / 1000);
            this.dom.liveCountdown.textContent = `Starting in: ${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`;
            if (ms <= 0) {
                this.launchLive();
            }
        };
        update();
        this.liveTimer = setInterval(update, 1000);
    }

    launchLive() {
        try { window.open('/complete-working-lesson.html', '_blank'); } catch (e) { console.warn('Live launch failed', e); }
    }

    // Curriculum search & calendar
    async ensureCurriculumLoaded() {
        if (this.curriculumLoaded) return;
        const months = ['january','february','march','april','may','june','july','august','september','october','november','december'];
        this.allTopics = [];
        await Promise.all(months.map(async (m) => {
            try {
                const res = await fetch(`/data/${m}_curriculum.json`);
                if (!res.ok) return;
                const json = await res.json();
                json.days?.forEach(d => { this.allTopics.push({ month: json.month || m, day: d.day, title: d.title, learning_objective: d.learning_objective }); });
            } catch {}
        }));
        this.curriculumLoaded = true;
    }

    searchCurriculum(query) {
        if (!this.allTopics || !query) { this.dom.findResults.innerHTML = ''; return; }
        const q = query.toLowerCase();
        const matches = this.allTopics.filter(t => t.title.toLowerCase().includes(q)).slice(0, 20);
        this.dom.findResults.innerHTML = matches.map(m => `<div class="result-item" data-title="${encodeURIComponent(m.title)}">${m.title}<div style="font-size:12px;opacity:0.7;">${m.month} ${m.day}</div></div>`).join('');
        Array.from(this.dom.findResults.querySelectorAll('.result-item')).forEach(el => el.addEventListener('click', async () => {
            const title = decodeURIComponent(el.dataset.title);
            await this.loadLessonByTitle(title);
            this.dom.findModal.classList.remove('visible');
        }));
    }

    renderCalendarQuickLinks() {
        if (!this.dom.calendarResults) return;
        const today = new Date();
        const items = [ -1, 0, 1 ].map(offset => {
            const d = new Date(today); d.setDate(today.getDate() + offset);
            return `<span class="pill">${d.toDateString()}</span>`;
        }).join('');
        this.dom.calendarResults.innerHTML = items;
    }

    async loadLessonByDateOffset(offsetDays) {
        await this.ensureCurriculumLoaded();
        const target = new Date(); target.setDate(target.getDate() + offsetDays);
        // naive match by day number within month
        const monthNames = ['January','February','March','April','May','June','July','August','September','October','November','December'];
        const month = monthNames[target.getMonth()];
        const day = target.getDate();
        const match = (this.allTopics || []).find(t => t.month === month && t.day === day);
        if (match) { await this.loadLessonByTitle(match.title); this.dom.calendarModal?.classList.remove('visible'); }
    }

    slugify(title) { return title.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/(^-|-$)/g,''); }

    async loadLessonByTitle(title) {
        const slug = this.slugify(title);
        // Try precomputed DNA in /data
        const dnaUrl = `/data/${slug}.json`;
        try {
            const res = await fetch(dnaUrl);
            if (res.ok) {
                const dna = await res.json();
                const transformed = UniversalLessonPlayer.transformDnaToPhases(dna, this.state);
                this.replaceLesson(transformed);
                return;
            }
        } catch {}
        // Fallback: try backend day endpoint if title maps to COMPLETE_CURRICULUM (not available here). Otherwise alert.
        console.warn('No precomputed DNA found for', title);
        alert('This lesson is not precomputed. We can generate it on demand.');
    }

    replaceLesson(newLesson) {
        this.lesson = newLesson;
        this.state.phase = 0;
        this.render();
    }

    // Media / Audio
    togglePlay() {
        const a = this.dom.ttsAudio; if (!a) return;
        if (a.paused) a.play(); else a.pause();
    }
    adjustVolume(delta) { const a = this.dom.ttsAudio; if (!a) return; a.volume = Math.min(1, Math.max(0, a.volume + delta)); }

    speak(text) {
        if (!text) return;
        try {
            if (!window.ElevenLabsIntegration) return;
            this._eleven ||= new window.ElevenLabsIntegration();
            const avatar = this.state.avatar || 'kelly';
            Promise.resolve(this._eleven.generateAudio(text, avatar)).then((result) => {
                if (typeof result === 'string' && result.startsWith('blob:')) {
                    if (this.dom.ttsAudio) {
                        this.dom.ttsAudio.src = result;
                        this.dom.ttsAudio.playbackRate = this.state.speed || 1.0;
                        this.dom.ttsAudio.play().catch(()=>{});
                    }
                } else {
                    // fallback TTS already spoken, no audio URL
                }
            }).catch(()=>{});
        } catch (e) { console.warn('speak failed', e); }
    }

    saveProgress() {
        try {
            const lessonId = this.lesson.lesson_metadata?.lesson_id || this.lesson.title || 'current';
            localStorage.setItem(`ilearn_progress_${lessonId}`, JSON.stringify({ phase: this.state.phase, age: this.state.age, tone: this.state.tone, avatar: this.state.avatar }));
            alert('Progress saved');
        } catch {}
    }
    loadProgress() {
        try {
            const lessonId = this.lesson.lesson_metadata?.lesson_id || this.lesson.title || 'current';
            const raw = localStorage.getItem(`ilearn_progress_${lessonId}`);
            if (!raw) return;
            const obj = JSON.parse(raw);
            this.setState({ ...obj });
            alert('Progress loaded');
        } catch {}
    }

    static mapAgeCategoryToDnaAge(ageCat) {
        const mapping = {
            infant: '2', toddler: '5', early_childhood: '8', middle_childhood: '12', pre_teen: '16', teen: '16', young_adult: '25', adult: '40', middle_age: '60', senior: '80', elder: '102'
        };
        return mapping[ageCat] || '25';
    }

    static transformDnaToPhases(dna, state) {
        const tone = state?.tone || 'neutral';
        const ageCat = state?.age || 'young_adult';
        const dnaAge = UniversalLessonPlayer.mapAgeCategoryToDnaAge(ageCat);

        const getConcept = () => {
            const expr = dna.age_expressions?.[dnaAge]?.concept_name?.[tone];
            return {
                display_text: expr?.display_text || dna.lesson_metadata?.universal_concept || 'Lesson',
                voice_over_script: expr?.voice_over_script || expr?.display_text || ''
            };
        };

        const buildQuestionPhase = (qKey, label) => {
            const ages = dna.core_lesson_structure?.[qKey]?.ages || {};
            const block = ages[dnaAge] || {};
            const qText = block.question?.[tone]?.display_text || '';
            const optA = block.option_a?.display_text || '';
            const optB = block.option_b?.display_text || '';
            const tmA = block.teaching_moments?.option_a_response?.voice_over_script || block.teaching_moments?.option_a_response || '';
            const tmB = block.teaching_moments?.option_b_response?.voice_over_script || block.teaching_moments?.option_b_response || '';
            return {
                type: label,
                question_text: qText,
                choices: {
                    option_a: { text: optA, teaching_moment: { voice_over_script: tmA } },
                    option_b: { text: optB, teaching_moment: { voice_over_script: tmB } }
                }
            };
        };

        const concept = getConcept();
        const phases = [];
        phases.push({ type: 'welcome', content: { lesson_preview: concept.display_text }, avatar_script: { [tone]: { [ageCat]: concept.voice_over_script } } });
        phases.push(buildQuestionPhase('question_1', 'beginning'));
        if (dna.core_lesson_structure?.question_2) phases.push(buildQuestionPhase('question_2', 'middle')); else phases.push(buildQuestionPhase('question_1', 'middle'));
        if (dna.core_lesson_structure?.question_3) phases.push(buildQuestionPhase('question_3', 'end')); else phases.push(buildQuestionPhase('question_1', 'end'));
        const fortune = dna.wisdom_phase_content?.fortune?.[tone] || {};
        phases.push({ type: 'wisdom', content: { daily_fortune: { [tone]: { [ageCat]: fortune.voice_over_script || fortune.display_text || '' } } } });

        return { title: dna.lesson_metadata?.universal_concept || 'Lesson', lesson_metadata: dna.lesson_metadata, phases };
    }
}

// Initialize the player with dynamic source
function getQueryParam(name) { return new URLSearchParams(window.location.search).get(name); }

async function boot() {
    console.log('A. Starting lesson load fetch...');
    const lessonSlug = getQueryParam('lesson');
    const dayParam = getQueryParam('day');
    const sourceCandidates = [];
    if (lessonSlug) sourceCandidates.push(`/data/${lessonSlug}.json`);
    if (dayParam) sourceCandidates.push(`/api/lessons/${encodeURIComponent(dayParam)}`);
    // Default
    sourceCandidates.push('/lessons/puppies-lesson-final.json');

    let loaded = null;
    for (const url of sourceCandidates) {
        try {
            const res = await fetch(url);
            if (!res.ok) continue;
            const json = await res.json();
            loaded = { url, json };
            break;
        } catch {}
    }
    if (!loaded) {
        console.error('F. FATAL: Failed to load any lesson source');
        const loadingEl = document.getElementById('loading');
        if(loadingEl) loadingEl.innerHTML = `<p style="color:red; text-align:center; padding: 20px;"><b>Fatal Error:</b> Could not load lesson. Check console.</p>`;
        return;
    }

    let data = loaded.json;
    // If looks like DNA (has lesson_metadata and core_lesson_structure), transform
    if (!Array.isArray(data?.phases) && data?.lesson_metadata && data?.core_lesson_structure) {
        data = UniversalLessonPlayer.transformDnaToPhases(data, { age: 'young_adult', tone: 'neutral' });
    }

        if(data && data.phases && Array.isArray(data.phases)) {
        window.player = new UniversalLessonPlayer(data);
        } else {
            console.error("E. Lesson data is missing 'phases' array or is invalid.");
        }
}

// Wait for user to click Start Lesson to begin
document.addEventListener('DOMContentLoaded', () => {
    const startBtn = document.getElementById('start-lesson-btn');
    const startOverlay = document.getElementById('start-overlay');
    if (startBtn) {
        startBtn.addEventListener('click', async () => {
            try {
                if (startOverlay) startOverlay.style.display = 'none';
                await boot();
            } catch (e) {
                console.error('Boot failed:', e);
            }
        });
    } else {
        // Fallback: if no button found, boot automatically
        boot();
    }
    });

