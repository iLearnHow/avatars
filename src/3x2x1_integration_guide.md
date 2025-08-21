  "ElevenLabs Audio Prompt": {
    "prefix": "el-audio",
    "body": [
      "### **ElevenLabs Audio:**",
      "```",
      "KELLY_VOICE_PROFILE +",
      "CONTEXT: $1",
      "EMOTION: $2",
      "TEXT: \"$3\"",
      "EMPHASIS_TIMING: $4",
      "PAUSE_MARKERS: $5",
      "```"
    ]
  },
  
  "HeyGen Audio Sync": {
    "prefix": "heygen-audio",
    "body": [
      "### **HeyGen with Audio Sync:**",
      "```", 
      "KELLY_VISUAL_PERSONALITY +",
      "",
      "AUDIO_INPUT: $1",
      "AUDIO_DURATION: $2",
      "AUDIO_EMPHASIS_MARKERS: $3",
      "",
      "SCENE: $4",
      "VISUAL_EMOTION: $5",
      "",
      "GESTURE_COORDINATION:",
      "$6",
      "",
      "EXPRESSION_TIMING:",
      "$7",
      "```"
    ]
  },# Cursor Integration Guide: Universal Lesson Generator
## Engineering Documentation for AI-Assisted Lesson Production

---

## **OVERVIEW FOR CURSOR**

This template enables rapid generation of Kelly's 3x2x1 Universal Lessons using AI assistance. You'll be building educational content with synchronized voice, animation, and timing data for avatar-based learning experiences.

### **What This Template Produces:**
- 10 complete script segments with voice-over text
- Frame-by-frame micro-expression animation data
- Gesture coordination with speech timing
- Audio direction and emphasis markers
- On-screen text synchronization
- Production-ready lesson packages

---

## **FILE STRUCTURE**

```
/lesson-generator/
├── template.md                 # This template file
├── /output/
│   ├── lesson-[topic].md      # Generated lesson files
│   └── lesson-[date].json     # Structured data export
├── /examples/
│   └── faces-demo.md          # Reference implementation
└── /prompts/
    └── generation-prompts.md  # Cursor prompt library
```

---

## **CURSOR WORKFLOW**

### **Step 1: Initialize New Lesson**
```bash
# Create new lesson file
cp template.md output/lesson-[TOPIC_NAME].md

# Open in Cursor with template
cursor output/lesson-[TOPIC_NAME].md
```

### **Step 2: Use These Cursor Prompts**

#### **Prompt A: Generate Complete Lesson**
```
Using the Universal Lesson Template, generate a complete 3x2x1 lesson for:

TOPIC: [INSERT_TOPIC]
DATE: [INSERT_DATE]  
SUBJECT: [Science/Math/History/etc]
COMPLEXITY: [Foundation/Application/Advanced]

Fill in all 10 script segments with:
- Voice over text (natural, conversational Kelly style)
- Micro-expressions (specific facial animation data)
- Gestures (hand and body movements)
- Audio prompts (emphasis, timing, tone)
- On-screen text (visual support)

Make it educational, engaging, and true to Kelly's warm teaching personality.
```

#### **Prompt B: Refine Specific Segment**
```
Improve Script [NUMBER] for topic [TOPIC]:
- Make the voice-over more [conversational/technical/emotional]
- Adjust micro-expressions for better [authenticity/clarity/engagement]
- Enhance gestures to support [concept explanation/emotional connection]
- Refine audio prompts for [timing/emphasis/flow]

Current segment: [PASTE_CURRENT_CONTENT]
```

#### **Prompt C: Generate Animation Data Only**
```
For this voice-over text, generate detailed animation data:

[PASTE_VOICE_OVER_TEXT]

Provide:
- Micro-expressions with timing (0-30s segments)
- Gesture coordination with speech
- Audio emphasis markers
- Kelly's personality consistency checks
```

#### **Prompt D: Convert to Production Format**
```
Convert this lesson to JSON format for production pipeline:
- Extract all timing data
- Structure animation sequences
- Format audio cues
- Validate template compliance

Input lesson: [PASTE_LESSON_CONTENT]
```

#### **Prompt E: Generate ElevenLabs Audio Prompts**
```
Convert this lesson segment into ElevenLabs voice generation prompts:

SEGMENT: [PASTE_SEGMENT]

Create prompts that include:
- Clean speech text (no stage directions)
- Voice emotion and energy settings
- Pacing and emphasis markers
- Pause timing specifications
- Kelly's voice personality settings

Format for ElevenLabs API with timing data for HeyGen sync.
```

#### **Prompt F: Generate HeyGen Prompts with Audio Sync**
```
Convert this lesson segment into a HeyGen avatar generation prompt with pre-generated audio:

SEGMENT: [PASTE_SEGMENT]
AUDIO_FILE: [AUDIO_PATH]
AUDIO_DURATION: [DURATION]

Create a text-based prompt that includes:
- Kelly's visual personality and expressions
- Lip-sync coordination with existing audio
- Gesture timing aligned to audio markers
- Visual emphasis matching audio emphasis
- Technical parameters for audio import

Format for HeyGen API with audio file input.
```

---

## **TEMPLATE VARIABLES TO REPLACE**

When using Cursor, replace these variables in the template:

```markdown
LESSON_METADATA:
- {{TOPIC_NAME}} → Specific lesson topic
- {{SUBJECT_AREA}} → Science/Math/History/Arts/etc  
- {{DATE}} → Lesson date (YYYY-MM-DD)
- {{COMPLEXITY}} → Foundation/Application/Advanced
- {{DURATION}} → Estimated time (4-6 minutes)

CONTENT_VARIABLES:
- {{QUESTION_1_SETUP}} → First true/false question context
- {{QUESTION_1_STATEMENT}} → True/false statement  
- {{QUESTION_2_SETUP}} → Second question context
- {{QUESTION_2_STATEMENT}} → True/false statement
- {{QUESTION_3_SETUP}} → Third question context  
- {{QUESTION_3_STATEMENT}} → True/false statement
- {{FORTUNE_WISDOM}} → Daily fortune content
```

---

## **ELEVENLABS AUDIO GENERATION**

### **Kelly's Voice Profile Settings**
```yaml
VOICE_ID: "Kelly-Universal-Teacher"
VOICE_SETTINGS:
  stability: 0.75        # Consistent but natural variation
  similarity_boost: 0.85 # Strong personality preservation  
  style: 0.60           # Moderate style enhancement
  use_speaker_boost: true

EMOTIONAL_RANGE:
  base_warmth: 0.70     # Always warm and approachable
  enthusiasm_max: 0.85  # Genuine excitement, not overwhelming
  correction_gentleness: 0.80 # Patient, understanding tone
  wisdom_authority: 0.75 # Confident but not condescending
```

### **ElevenLabs Prompt Template**
```
VOICE_PERSONALITY: Kelly is a warm, intelligent teacher speaking one-on-one to a learner. Her voice is conversational, encouraging, and naturally expressive with authentic emotions.

SPEECH_TEXT: {{clean_speech_text}}

EMOTION_DIRECTION: {{emotional_state}}
ENERGY_LEVEL: {{energy_percentage}}
PACING: {{speech_pace}}

EMPHASIS_MARKERS:
{{emphasis_specifications}}

PAUSE_TIMING:
{{pause_specifications}}

TECHNICAL_SETTINGS:
- Sample_Rate: 44100Hz (for HeyGen compatibility)
- Format: WAV uncompressed  
- Normalize: true
- Remove_Silence: false (preserve natural pauses)
```

### **Audio-First Production Workflow**
```
1. Generate ElevenLabs audio with timing metadata
2. Extract audio timing markers and emphasis points
3. Create HeyGen prompts synchronized to audio timing
4. Generate avatar video with pre-recorded audio
5. Validate lip-sync and gesture coordination
```

---

## **UNIVERSAL LESSON TEMPLATE: 3x2x1 STRUCTURE**

### **LESSON METADATA**
```yaml
TOPIC: "{{TOPIC_NAME}}"
SUBJECT: {{SUBJECT_AREA}}
DATE: {{DATE}}
DURATION: 4-6 minutes
COMPLEXITY: {{COMPLEXITY}}
TARGET_AUDIENCE: Universal (8-80 years)
```

### **SCRIPT 1: INTRO + QUESTION 1**

**Voice Over:**
```
{{INTRO_HOOK}} {{TOPIC_INTRODUCTION}} {{QUESTION_1_SETUP}}

True or false: {{QUESTION_1_STATEMENT}}?
```

**On-Screen Text:**
```
TRUE or FALSE:
{{QUESTION_1_STATEMENT}}?
```

**Micro-Expressions:**
```markdown
OPENING (0-15s):
- smile: {{opening_smile_percentage}}
- eyes: {{opening_eye_expression}}
- eyebrows: {{opening_eyebrow_position}}
- head_tilt: {{opening_head_angle}}

DEMONSTRATION (15-30s):
- expression: {{demonstration_expression}}
- eyes: {{demonstration_eye_state}}
- gesture_sync: {{demonstration_coordination}}

QUESTION_DELIVERY (30-45s):
- expression: {{question_expression}}
- pause: {{question_pause_timing}}
- gesture: {{question_gesture_type}}
```

**Gestures:**
```markdown
OPENING:
- {{opening_gesture_description}}
- gesture_flow: {{opening_coordination}}

QUESTION:
- {{question_gesture_description}}
- timing: {{gesture_speech_sync}}
```

**Audio Prompts:**
```markdown
VOICE_DIRECTION: {{voice_tone_direction}}
EMPHASIS_WORDS: {{key_emphasis_words}}
PAUSE_TIMING: {{pause_specifications}}
TONE_SHIFT: {{emotional_transitions}}
```

**ElevenLabs Prompt:**
```
VOICE_PERSONALITY: Kelly - warm teacher, {{script_emotional_context}}
SPEECH_TEXT: "{{clean_speech_text_no_directions}}"
EMOTION: {{primary_emotion}} ({{energy_level}}/10)
PACING: {{speech_pace_specification}}
EMPHASIS: {{emphasis_word_list}}
PAUSES: {{pause_timing_markers}}
```

### **SCRIPT 2: QUESTION 1 - TRUE (INCORRECT)**

**Voice Over:**
```
Actually, that's false. {{CORRECTION_EXPLANATION}} {{EDUCATIONAL_INSIGHT}}
```

**On-Screen Text:**
```
ACTUALLY FALSE
{{CORRECTION_SUMMARY}}
```

**Micro-Expressions:**
```markdown
CORRECTION (0-5s):
- expression: gentle_teaching_correction
- tone: understanding_not_dismissive

EXPLANATION (5-25s):
- demonstration: {{correction_demo_sequence}}
- coordination: {{explanation_timing}}

INSIGHT (25-30s):
- expression: {{wisdom_sharing_expression}}
- conclusion: {{educational_reinforcement}}
```

### **SCRIPT 3: QUESTION 1 - FALSE (CORRECT)**

**Voice Over:**
```
False! Exactly right. {{VALIDATION_EXPLANATION}} {{CONCEPT_EXPANSION}}
```

**On-Screen Text:**
```
CORRECT!
{{VALIDATION_SUMMARY}}
```

**Micro-Expressions:**
```markdown
CELEBRATION (0-5s):
- expression: proud_teacher_validation
- energy: {{celebration_intensity}}

EXPANSION (5-30s):
- building: {{concept_building_sequence}}
- appreciation: {{complexity_appreciation}}
```

### **SCRIPT 4: QUESTION 2**

**Voice Over:**
```
{{TRANSITION_TO_QUESTION_2}} {{QUESTION_2_SETUP}}

True or false: {{QUESTION_2_STATEMENT}}?
```

**On-Screen Text:**
```
TRUE or FALSE:
{{QUESTION_2_STATEMENT}}?
```

### **SCRIPT 5: QUESTION 2 - TRUE (INCORRECT)**

**Voice Over:**
```
Actually, that's false. {{Q2_CORRECTION}} {{Q2_SCIENCE_EXPLANATION}}
```

### **SCRIPT 6: QUESTION 2 - FALSE (CORRECT)**

**Voice Over:**
```
False! {{Q2_VALIDATION}} {{Q2_DEEPER_INSIGHT}}
```

### **SCRIPT 7: QUESTION 3**

**Voice Over:**
```
{{TRANSITION_TO_ADVANCED_CONCEPT}} {{QUESTION_3_SETUP}}

True or false: {{QUESTION_3_STATEMENT}}?
```

### **SCRIPT 8: QUESTION 3 - TRUE (CORRECT)**

**Voice Over:**
```
True! {{Q3_VALIDATION}} {{Q3_PROFOUND_INSIGHT}}
```

### **SCRIPT 9: QUESTION 3 - FALSE (INCORRECT)**

**Voice Over:**
```
Actually, that's true. {{Q3_GENTLE_CORRECTION}} {{Q3_EMPATHY_CONNECTION}}
```

### **SCRIPT 10: DAILY FORTUNE**

**Voice Over:**
```
You just earned your daily fortune. {{PERSONALIZED_WISDOM}} {{EMPOWERING_IDENTITY}} {{PRACTICAL_APPLICATION}} {{ENCOURAGING_CONCLUSION}}
```

**On-Screen Text:**
```
YOUR DAILY FORTUNE
{{FORTUNE_SUMMARY}}
```

---

## **ELEVENLABS SCRIPT GENERATION**

### **Script 1: ElevenLabs Audio Prompt**
```
VOICE_PERSONALITY: Kelly - warm, welcoming teacher introducing new concept with playful curiosity

SPEECH_TEXT: "Welcome back! Today we're doing something different - we're learning how faces move while I move mine. You're going to watch my expressions change and learn the science behind what makes faces so expressive. Let's start with eyebrows - they're incredibly expressive and one of the first things people notice. True or false: When I raise my eyebrows, it always means I'm surprised?"

EMOTION: Curious enthusiasm (7/10)
PACING: Conversational, building anticipation
EMPHASIS: "different", "move", "expressive", "eyebrows", "True or false"
PAUSES: [2s after "True or false"]

TECHNICAL_OUTPUT:
- Generate timing markers for gesture sync
- Mark emphasis points for visual coordination  
- Preserve natural speech rhythm
- Export with metadata for HeyGen import
```

### **Complete ElevenLabs Prompt Set**

#### **Script 1 Audio:**
```
KELLY_VOICE_PROFILE + 
CONTEXT: Lesson introduction with self-demonstration
EMOTION: Playful curiosity (7/10)
TEXT: "Welcome back! Today we're doing something different - we're learning how faces move while I move mine. You're going to watch my expressions change and learn the science behind what makes faces so expressive. Let's start with eyebrows - they're incredibly expressive and one of the first things people notice. True or false: When I raise my eyebrows, it always means I'm surprised?"
EMPHASIS_TIMING: different[0:12], move[0:15], expressive[0:35], eyebrows[0:42], True_or_false[0:58]
PAUSE_MARKERS: [0:60, 2.0s]
```

#### **Script 2 Audio (Incorrect Response):**
```
KELLY_VOICE_PROFILE +
CONTEXT: Gentle correction with demonstration
EMOTION: Patient teaching (6/10)
TEXT: "Actually, that's false. Watch this - I can raise them when questioning something, showing skepticism, giving a quick greeting, or emphasizing a point. Context and other facial muscles determine the real meaning, not just the eyebrow position alone."
EMPHASIS_TIMING: false[0:02], Watch_this[0:04], questioning[0:09], skeptical[0:12], context[0:20]
DEMONSTRATION_PAUSES: [0:09, 0.5s], [0:12, 0.5s], [0:15, 0.5s], [0:18, 0.5s]
```

#### **Script 3 Audio (Correct Response):**
```
KELLY_VOICE_PROFILE +
CONTEXT: Celebrating correct understanding
EMOTION: Proud validation (8/10)
TEXT: "False! Exactly right. Eyebrows work with eyes, mouth, and head position to create incredibly nuanced communication. A raised eyebrow with a smile means something completely different than a raised eyebrow with a frown or head tilt."
EMPHASIS_TIMING: False[0:00], exactly[0:01], nuanced[0:12], completely_different[0:20]
CELEBRATION_PAUSE: [0:01, 0.8s]
```

---

## **HEYGEN PROMPT GENERATION WITH AUDIO SYNC**

### **Audio-Synchronized HeyGen Template**
```
KELLY_VISUAL_PERSONALITY + 

AUDIO_INPUT: {{audio_file_path}}
AUDIO_DURATION: {{total_duration}}
AUDIO_EMPHASIS_MARKERS: {{emphasis_timing_array}}
AUDIO_PAUSE_MARKERS: {{pause_timing_array}}

SCENE: {{scene_description}}
VISUAL_EMOTION: {{visual_emotion_to_match_audio}}

LIP_SYNC_SETTINGS:
- Precision: High
- Audio_offset: 0ms
- Expression_lead_time: 100ms (expressions slightly before audio)

GESTURE_COORDINATION:
{{gesture_timing_aligned_to_audio_markers}}

VISUAL_EMPHASIS_SYNC:
{{visual_emphasis_coordinated_with_audio_emphasis}}

EXPRESSION_TIMING:
{{micro_expression_timing_synced_to_audio_flow}}
```

### **Script 1: HeyGen with Audio Sync**
```
KELLY_VISUAL_PERSONALITY +

AUDIO_INPUT: script1_kelly_intro.wav
AUDIO_DURATION: 60s
AUDIO_EMPHASIS_MARKERS: [12s:"different", 15s:"move", 35s:"expressive", 42s:"eyebrows", 58s:"True_or_false"]
AUDIO_PAUSE_MARKERS: [60s:2.0s]

SCENE: Lesson introduction with self-referential demonstration
VISUAL_EMOTION: Playful curiosity matching audio energy

LIP_SYNC_SETTINGS:
- Precision: High  
- Expression_lead_time: 100ms

GESTURE_COORDINATION:
- [8s] Point to own face during "faces move while I move mine"
- [15s] Frame face with both hands during "move mine"
- [25s] Demonstrate eyebrow raise during "expressive"
- [42s] Look up toward own eyebrows during "eyebrows"
- [58s] Open palm binary choice gesture during "True or false"

VISUAL_EMPHASIS_SYNC:
- [12s] Slight head lean forward on "different"
- [35s] Animated expression on "expressive"  
- [42s] Eyebrow demonstration on "eyebrows"
- [58s] Questioning head tilt on "True or false"

EXPRESSION_TIMING:
- [0-8s] Warm welcome smile (70%)
- [8-25s] Building curiosity, eyebrow activity
- [25-42s] Demonstrative expressions
- [42-60s] Questioning, expectant expression
```

---

## **CURSOR CODE GENERATION PATTERNS**

### **Pattern 1: Voice-Over Generation**
```javascript
function generateVoiceOver(segment, tone, emphasis_words) {
  return {
    text: "Natural conversational text...",
    tone: tone,
    emphasis: emphasis_words,
    timing: calculateTiming(text.length),
    pauses: identifyNaturalPauses(text)
  };
}
```

### **Pattern 2: Micro-Expression Timing**
```javascript
const microExpressions = {
  "0-5s": {
    smile: "percentage (0-100%)",
    eyes: "descriptive_state",
    eyebrows: "position_and_movement", 
    head_tilt: "degrees_and_direction"
  },
  "5-10s": {
    // Next animation state
  }
};
```

### **Pattern 3: ElevenLabs Audio Generation**
```javascript
function generateElevenLabsPrompt(script_data) {
  return {
    voice_personality: KELLY_VOICE_PROFILE,
    speech_text: cleanSpeechText(script_data.voice_over),
    emotion_settings: script_data.emotion_data,
    emphasis_markers: extractEmphasisWords(script_data.audio_prompts),
    pause_timing: extractPauseData(script_data.audio_prompts),
    technical_settings: ELEVENLABS_TECHNICAL_CONFIG
  };
}
```

### **Pattern 4: Audio-Synced HeyGen Export**
```javascript
function generateHeyGenWithAudio(script_data, audio_file) {
  return {
    visual_personality: KELLY_VISUAL_PROFILE,
    audio_input: audio_file.path,
    audio_duration: audio_file.duration,
    audio_markers: audio_file.timing_data,
    gesture_sync: alignGesturesToAudio(script_data.gestures, audio_file),
    expression_sync: alignExpressionsToAudio(script_data.micro_expressions, audio_file)
  };
}
```

---

## **QUALITY VALIDATION PROMPTS**

### **Validation A: Kelly's Voice Consistency**
```
Review this lesson for Kelly's authentic teaching voice:
- Is the tone warm and conversational?
- Are explanations clear without being condescending?
- Does it feel like one-on-one teaching?
- Is enthusiasm genuine, not performative?

Flag any segments that don't match Kelly's personality.
```

### **Validation B: Educational Effectiveness**
```
Analyze this lesson for learning effectiveness:
- Do questions build in complexity?
- Are true/false statements clear and educational?
- Does feedback provide genuine learning?
- Is the fortune meaningful and empowering?

Suggest improvements for educational impact.
```

### **Validation C: Animation Feasibility**
```
Check animation specifications for production viability:
- Are micro-expressions achievable with avatar tech?
- Do gestures coordinate naturally with speech?
- Are timing specifications realistic?
- Is the emotional arc authentic?

Identify any animation challenges.
```

### **Validation D: Audio-Visual Sync Quality**
```
Check audio-visual synchronization for production quality:
- Do ElevenLabs prompts preserve Kelly's authentic voice?
- Are emphasis markers properly timed for visual coordination?
- Do pause specifications allow for natural gesture completion?
- Are audio technical settings compatible with HeyGen import?
- Is lip-sync timing properly calculated with expression lead-time?

Identify any sync issues and suggest corrections.
```

### **Validation E: HeyGen Production Readiness**
```
Verify lesson is ready for HeyGen avatar generation:
- Are all audio files generated and properly formatted?
- Do HeyGen prompts include audio file references?
- Are gesture timings synchronized to audio emphasis markers?
- Do visual expressions coordinate with audio emotional peaks?
- Are technical parameters set for optimal lip-sync?

Generate any missing audio-synced HeyGen prompts.
```

---

## **CURSOR SHORTCUTS AND SNIPPETS**

### **Custom Snippets** (Add to Cursor settings)
```json
{
  "Universal Lesson Header": {
    "prefix": "ul-header",
    "body": [
      "# Universal Lesson Template: 3x2x1 Structure",
      "## Complete Production Markdown for Avatar Lessons",
      "",
      "---",
      "",
      "## **LESSON METADATA**",
      "```yaml",
      "TOPIC: \"$1\"",
      "SUBJECT: $2",
      "DATE: $3",
      "DURATION: 4-6 minutes",
      "COMPLEXITY: $4",
      "TARGET_AUDIENCE: Universal (8-80 years)",
      "```"
    ]
  },
  
  "Script Segment": {
    "prefix": "ul-script",
    "body": [
      "## **SCRIPT $1: $2**",
      "",
      "### **Voice Over:**",
      "```",
      "$3",
      "```",
      "",
      "### **On-Screen Text:**",
      "```",
      "$4",
      "```",
      "",
      "### **Micro-Expressions:**",
      "```markdown",
      "$5",
      "```",
      "",
      "### **Gestures:**",
      "```markdown",
      "$6",
      "```",
      "",
      "### **Audio Prompts:**",
      "```markdown",
      "$7",
      "```"
    ]
  },
  
  "HeyGen Prompt": {
    "prefix": "heygen-prompt",
    "body": [
      "### **HeyGen Prompt:**",
      "```",
      "KELLY BASE PERSONALITY +",
      "",
      "SCENE: $1",
      "EMOTION: $2", 
      "DURATION: $3",
      "",
      "SPEECH TEXT:",
      "\"$4\"",
      "",
      "SPECIFIC DIRECTION:",
      "$5",
      "",
      "TIMING CUES:",
      "$6",
      "```"
    ]
  }
}
```

### **Cursor Commands**
```bash
# Generate lesson from topic
Cmd+K: "Generate complete universal lesson for [TOPIC] using the template"

# Generate audio prompts
Cmd+K: "Create ElevenLabs audio prompts for all 10 scripts with Kelly's voice profile"

# Sync audio to video
Cmd+K: "Generate HeyGen prompts synchronized to the ElevenLabs audio timing"

# Refine animation
Cmd+K: "Improve micro-expressions for Script [X] to sync with audio emphasis"

# Check consistency  
Cmd+K: "Validate Kelly's voice consistency across audio and visual elements"

# Export complete package
Cmd+K: "Export lesson with ElevenLabs + HeyGen prompts for production pipeline"
```

---

## **PRODUCTION PIPELINE INTEGRATION**

### **Production Pipeline with Audio-First Workflow**
```javascript
// Complete production pipeline
async function generateUniversalLesson(topic, date) {
  // 1. Generate lesson content
  const lesson_content = await generateLessonMarkdown(topic, date);
  
  // 2. Generate ElevenLabs audio for all scripts
  const audio_files = await Promise.all(
    lesson_content.scripts.map(script => 
      generateElevenLabsAudio(script.elevenlabs_prompt)
    )
  );
  
  // 3. Extract audio timing data
  const audio_timing = audio_files.map(audio => 
    extractTimingMarkers(audio)
  );
  
  // 4. Generate HeyGen prompts with audio sync
  const heygen_prompts = lesson_content.scripts.map((script, index) => 
    generateHeyGenWithAudioSync(script, audio_files[index], audio_timing[index])
  );
  
  // 5. Generate avatar videos
  const video_segments = await Promise.all(
    heygen_prompts.map(prompt => generateHeyGenVideo(prompt))
  );
  
  // 6. Assemble final lesson
  return assembleFinalLesson(video_segments, lesson_content.metadata);
}
```

### **JSON Export Structure with Audio**
```javascript
{
  "lesson_id": "topic-date",
  "metadata": {
    "topic": "string",
    "duration": "number",
    "complexity": "string"
  },
  "scripts": [
    {
      "script_id": "1",
      "voice_over": "string",
      "on_screen_text": "string",
      "elevenlabs_prompt": "string",
      "audio_file": "path/to/audio.wav",
      "audio_timing": {
        "duration": 45.2,
        "emphasis_markers": [{"word": "different", "time": 12.1}],
        "pause_markers": [{"time": 60.0, "duration": 2.0}]
      },
      "heygen_prompt": "string",
      "timing": {
        "start": 0,
        "end": 45,
        "micro_expressions": {},
        "gestures": {},
        "audio_sync": {}
      }
    }
  ],
  "production_files": {
    "audio_directory": "audio/",
    "video_directory": "video/", 
    "final_output": "lesson-complete.mp4"
  }
}
```

### **File Management**
```bash
# Naming convention
lesson-[YYYY-MM-DD]-[topic-slug].md
lesson-2025-07-04-facial-expressions.md

# Git workflow
git checkout -b lesson/[topic-name]
git add output/lesson-*.md
git commit -m "Generated lesson: [TOPIC] for [DATE]"
```

---

## **TROUBLESHOOTING GUIDE**

### **Common Issues and Solutions**

**Issue: Voice doesn't sound like Kelly**
```
Cursor Fix: "Rewrite this segment in Kelly's authentic voice - warm, conversational, 
never condescending, genuine enthusiasm"
```

**Issue: Animation timing misaligned**
```
Cursor Fix: "Synchronize micro-expressions with speech timing for this segment"
```

**Issue: Audio-visual sync problems**
```
Cursor Fix: "Align gesture timing with ElevenLabs audio emphasis markers 
for this script segment. Audio file: [PATH]"
```

**Issue: ElevenLabs voice doesn't match Kelly**
```
Cursor Fix: "Adjust ElevenLabs prompt to better capture Kelly's warm, 
conversational teaching voice for this segment"
```

**Issue: HeyGen lip-sync issues**
```
Cursor Fix: "Generate HeyGen prompt optimized for lip-sync with pre-recorded 
ElevenLabs audio. Include expression lead-time calculations"
```

**Issue: Educational progression unclear**
```
Cursor Fix: "Redesign these questions to build from recognition to application 
to synthesis for [TOPIC]"
```

---

## **SUCCESS METRICS**

### **Quality Indicators**
- Voice-over reads naturally (90%+ comprehension)
- Animation timing syncs with speech (±100ms tolerance)  
- Educational progression maintains engagement
- Kelly's personality preserved throughout
- HeyGen prompts generate consistent avatar performance
- Production pipeline compatibility (100%)

### **Efficiency Gains with Audio-First Workflow**
- **Lesson generation:** 15 minutes (vs 2 hours manual)
- **ElevenLabs audio generation:** 5 minutes for all 10 scripts (vs 60 minutes manual)
- **Audio timing extraction:** 2 minutes automated (vs 30 minutes manual)
- **HeyGen prompt creation with sync:** 5 minutes (vs 45 minutes manual)
- **Quality validation:** 3 minutes (vs 20 minutes manual)
- **Perfect lip-sync achievement:** 95%+ success rate (vs 60% without audio-first)

### **Audio-Visual Quality Metrics**
- **Lip-sync accuracy:** ±50ms tolerance (ElevenLabs → HeyGen pipeline)
- **Gesture coordination:** ±100ms with audio emphasis points
- **Expression timing:** 100ms lead-time before audio emotional peaks  
- **Kelly's voice consistency:** 95%+ recognition across all audio segments
- **Visual-audio emotional alignment:** Coordinated energy levels throughout

---

This guide enables rapid, high-quality Universal Lesson generation using Cursor while maintaining Kelly's authentic teaching methodology and ensuring production readiness for avatar-based learning experiences.