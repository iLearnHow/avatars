# MyNextLesson Talking Avatars System
## Product Requirements Document & Technical Architecture

### 1. PRODUCT OVERVIEW

**Objective**: Create real-time talking avatars (Ken & Kelly) that deliver educational content with perfect lip-sync and natural expressions, integrated into the MyNextLesson platform.

**Key Requirements**:
- Real-time avatar animation (not pre-rendered video)
- Perfect synchronization with custom PiperTTS voices
- Pre-generated animation data for performance optimization
- Consistent character representation across lessons
- Scalable asset pipeline for educational content

### 2. FUNCTIONAL REQUIREMENTS

#### 2.1 Avatar Specifications
- **Characters**: Ken (male) and Kelly (female) 
- **Base Assets**: 12 source images per character
- **Expressions**: Neutral, speaking, thinking, excited, concerned
- **Consistency**: Maintain character identity across all animations

#### 2.2 Animation Requirements
- **Lip-sync Accuracy**: Frame-perfect synchronization with PiperTTS audio
- **Natural Movement**: Subtle head movements, eye blinks, micro-expressions
- **Educational Context**: Professional, engaging, appropriate for learning
- **Performance**: 60fps real-time playback without stuttering

#### 2.3 Integration Requirements
- **Lesson Assets**: Pre-generated with other educational materials
- **Audio Pipeline**: Seamless integration with PiperTTS output
- **Platform**: Compatible with web-based delivery system
- **Scalability**: Batch processing for multiple lessons simultaneously

### 3. TECHNICAL ARCHITECTURE

#### 3.1 System Components

```
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│   CONTENT       │    │   ANIMATION      │    │   RUNTIME       │
│   PIPELINE      │───▶│   GENERATION     │───▶│   SYSTEM        │
└─────────────────┘    └──────────────────┘    └─────────────────┘
│                      │                        │
│ • Lesson Scripts     │ • Phoneme Analysis     │ • Real-time      │
│ • Audio Generation   │ • Facial Landmarks    │   Playback       │
│ • Asset Preparation  │ • Keyframe Generation  │ • Sync Engine    │
│                      │ • Data Optimization    │ • UI Integration │
```

#### 3.2 Data Flow Architecture

**Phase 1: Content Preparation**
```
Lesson Script → PiperTTS → Audio File (.wav)
     ↓
12 Base Images → Character Rig → Avatar Model
```

**Phase 2: Animation Generation**
```
Audio File → Phoneme Extraction → Viseme Mapping → Facial Keyframes
     ↓
Avatar Model + Keyframes → Animation Sequence → Optimized Data
```

**Phase 3: Runtime Delivery**
```
Animation Data + Audio → Synchronization Engine → Real-time Avatar
     ↓
Web Interface → Student Experience
```

#### 3.3 Technical Stack

**Animation Generation**:
- **SadTalker/EMO**: Facial animation from static images
- **Wav2Lip**: Audio-driven lip synchronization
- **MediaPipe**: Facial landmark detection
- **Custom Pipeline**: Lesson-optimized processing

**Data Format**:
- **Audio**: 44.1kHz WAV (PiperTTS output)
- **Animation**: JSON keyframes with timestamps
- **Images**: PNG sprite sheets for expressions
- **Metadata**: Lesson synchronization data

**Runtime System**:
- **WebGL Renderer**: Browser-based avatar display
- **Audio API**: Precise timing synchronization
- **Asset Loader**: Efficient data streaming
- **State Manager**: Lesson progression tracking

### 4. IMPLEMENTATION PLAN

#### PHASE 1: Foundation (Week 1-2)
**TODO 1.1**: Set up SadTalker/EMO training environment
**TODO 1.2**: Process Ken & Kelly's 12 base images
**TODO 1.3**: Create character rigs and facial landmarks
**TODO 1.4**: Test basic animation generation pipeline

#### PHASE 2: Audio Integration (Week 2-3)
**TODO 2.1**: Integrate PiperTTS audio processing
**TODO 2.2**: Implement phoneme → viseme mapping
**TODO 2.3**: Create audio-visual synchronization system
**TODO 2.4**: Generate test animations for sample lessons

#### PHASE 3: Optimization (Week 3-4)
**TODO 3.1**: Optimize animation data format for real-time playback
**TODO 3.2**: Create batch processing pipeline for lesson content
**TODO 3.3**: Implement compression and streaming optimizations
**TODO 3.4**: Performance testing and bottleneck identification

#### PHASE 4: Runtime System (Week 4-5)
**TODO 4.1**: Build WebGL avatar renderer
**TODO 4.2**: Implement precise audio-visual synchronization
**TODO 4.3**: Create lesson asset integration system
**TODO 4.4**: User interface and control systems

#### PHASE 5: Integration & Testing (Week 5-6)
**TODO 5.1**: Integrate with existing MyNextLesson platform
**TODO 5.2**: End-to-end testing with real lesson content
**TODO 5.3**: Performance optimization and bug fixes
**TODO 5.4**: User acceptance testing and feedback integration

### 5. TECHNICAL SPECIFICATIONS

#### 5.1 Performance Targets
- **Frame Rate**: 60fps consistent playback
- **Latency**: <50ms audio-visual sync tolerance
- **Memory**: <100MB animation data per 10-minute lesson
- **Loading**: <2s initial avatar load time

#### 5.2 Quality Metrics
- **Lip-sync Accuracy**: >95% phoneme-viseme matching
- **Natural Movement**: Smooth transitions, no uncanny valley
- **Character Consistency**: Recognizable Ken/Kelly across lessons
- **Educational Appropriateness**: Professional, engaging presentation

#### 5.3 Scalability Requirements
- **Batch Processing**: 100+ lessons per day generation capacity
- **Storage**: Efficient asset compression and delivery
- **Deployment**: Cross-platform web compatibility
- **Maintenance**: Automated pipeline monitoring and alerts

### 6. RISK MITIGATION

#### 6.1 Technical Risks
- **GPU Requirements**: Fallback to optimized pre-computed sequences
- **Browser Compatibility**: Progressive enhancement approach
- **Animation Quality**: Multiple model options (SadTalker, EMO, Live Portrait)
- **Performance Issues**: Adaptive quality and LOD systems

#### 6.2 Content Risks
- **Character Consistency**: Rigorous testing and approval workflow
- **Audio Sync Issues**: Multiple validation checkpoints
- **Educational Appropriateness**: Content review and feedback loops

### 7. SUCCESS METRICS

#### 7.1 Technical KPIs
- Animation generation time: <5 minutes per lesson
- Real-time playback performance: 60fps sustained
- Student engagement: Measured via platform analytics
- System reliability: 99.9% uptime target

#### 7.2 Business Impact
- Enhanced learning experience through engaging avatars
- Reduced content production costs via automation
- Scalable delivery of personalized educational content
- Competitive advantage in educational technology market

---

**Next Steps**: Begin Phase 1 implementation while PiperTTS training completes. Ken and Kelly's voices will be ready for integration by Phase 2.

---

## Living Checklist: Uncanny Valley Quality Gate (SadTalker + 3D Rig)

This is the single source of truth for day-to-day production. Keep this section current. Quality > speed.

### A. Non‑negotiables (ship gates)
- Lip‑sync objective: SyncNet or equivalent score ≥ target; AV drift: ≤ 20 ms (muxed), ≤ 60 ms (dual element) P95
- No frozen eyes > 2 s; blink rate 12–20/min; no mouth clipping/teeth smearing; no frame tearing
- Segment length: 8–15 s per line; regenerate or re‑segment rather than pushing long clips
- Human spot‑check required for all new “hero” scenes until automated metrics stabilize

### B. SadTalker inference settings (hero lines)
- Input
  - source image: 768×768 PNG, frontal, neutral, eyes open, consistent lighting per avatar
  - audio: WAV 44.1 kHz, mono, peak ≤ –1 dBFS, LUFS ≈ –16
- Model/config (recommended)
  - output size: 1280×720 (min 720p), fps: 30
  - face crop: bbox; crop size: 512; align: enabled; still mode: enabled for stability
  - expression scale: 0.9–1.1; pose scale: 0.3–0.5 (limit yaw/pitch extremes)
  - enhancer: GFPGAN (strength 0.35) or CodeFormer (weight 0.5) — pick one; avoid over‑enhance
  - eye re‑tracking: on (if available); mouth refine: on (if available)
  - seed: fixed per avatar (e.g., Kelly: 221133, Ken: 994411) for identity consistency
- Encoding
  - H.264 High, CRF 18–20, keyint 60, AAC 160 kbps, faststart/mp4 fragment for low TTFP
- CLI template (adjust to your runner)
  - python inference.py \
    --source_image /data/kelly_neutral_768.png \
    --driven_audio /audio/kelly_line_abc.wav \
    --result_dir /out/kelly/ \
    --size 720 --fps 30 --crop_size 512 --enhancer gfpgan --enhance_weight 0.35 \
    --expression_scale 1.0 --pose_scale 0.4 --still --seed 221133

### C. Viseme system (3D real‑time rig) – thresholds and curves
- Viseme set (12 morph targets in glTF): REST, MBP, FV, TH, DNTL, KG, S, WQ, R, A, E, I
- Per‑viseme amplitude cap: 0.85
- Sum‑of‑visemes normalization cap: 1.25 (scale down if exceeded)
- Cross‑fade envelope: 60–100 ms attack/decay; avoid hard switches
- Closures (MBP): enforce ≥ 70 ms at 0.7+ amplitude at word boundaries with /M B P/
- Long vowels (A/E/I/O/U groups): sustain above 0.5 when phoneme spans > 120 ms
- Blinks: 120–180 ms total, refractory ≥ 2.5 s; bias to sentence/phrase boundaries
- Eyes: micro‑saccades every 3–7 s (5–12 deg yaw/pitch), occasional target shifts at commas/periods
- Head: filtered low‑amp noise (≤ 3 deg), micro‑nods (< 5 deg) on stressed syllables
- AV drift targets (runtime): ≤ 20 ms P50, ≤ 60 ms P95 versus audio currentTime

### D. Player integration (unchanged UI)
- After audio URL is set, kick a talking‑head job; poll; crossfade at sentence boundary when video is ready
- Fallback always: if job fails or is slow, continue with 3D rig or static avatar; never block lesson flow
- Caching key: avatarId + textHash + voiceId; prefetch next segment while current plays

### E. QA automation
- Metrics per line
  - Lip‑sync score (SyncNet or equivalent) ≥ threshold
  - Blink rate in range; saccade interval distribution in range
  - Frame anomaly detector: flag mouth over‑open/teeth smear/clipping
  - AV drift telemetry from player
- Gates
  - Fail any metric → auto‑retry (alt seed, softer enhancer) up to N attempts; then fallback to 3D rig or re‑author

### F. Ops checklist
- Job API: POST /talking-head/jobs → {id}; GET /talking-head/jobs/:id → {status, videoUrl}
- Storage/CDN: versioned URLs; long TTL; lifecycle to purge superseded TTS variants
- Observability: job P50/P95 latency, failure modes, per‑device playback errors, MOS panel results

### G. Acceptance criteria by phase
- Phase 1 (seam + baseline)
  - 3D rig mounted in `#avatar-container`, 60/45 fps desktop/mobile
  - SadTalker pipeline returns valid hero clips for 10 lines; crossfade works without UI changes
- Phase 2 (quality)
  - MOS ≥ 4.3/5 on 30 lines; SyncNet threshold met; zero blocking regressions
- Phase 3 (scale)
  - 99% successful generation for hero lines; mobile FPS targets met; CDN hit‑rate ≥ 90% on repeats

### H. Quick runbook (triage)
1) Lip‑sync off → verify audio sample rate (44.1 kHz), re‑extract phonemes, reduce enhancer strength, retry seed
2) Teeth smear → lower enhancer strength (–0.1), reduce expression_scale (–0.1), re‑segment around plosives
3) Frozen eyes → enable eye re‑tracking; increase saccade density; ensure source eyes not occluded
4) Drift in dual playback → prefer muxed; else enable micro rate‑nudges (0.98–1.02) in player
