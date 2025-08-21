# 🔇 macOS Voice Fix - "Lesson Orientation" Removed

## ❌ The Problem
When visiting https://ilearnhow.com, users heard "lesson orientation" in a macOS robot voice before the real Ken/Kelly voices started.

## 🔍 Root Cause
1. **Placeholder Text**: The manifest files contained `"script_text": "Lesson orientation"` as placeholder text
2. **Auto-speak**: The HomegrownTTSSystem was automatically speaking this placeholder text on page load
3. **macOS Voices**: The system was using local macOS voices instead of Railway TTS

## ✅ The Fix (Deployed)

### 1. Created `block-placeholder-tts.js`
- Intercepts ALL TTS calls
- Blocks placeholder phrases like "lesson orientation", "vitamin cue", etc.
- Returns silence instead of speaking these phrases
- Loads BEFORE any TTS systems initialize

### 2. Disabled HomegrownTTSSystem
- Commented out the initialization code in index.html
- Prevents macOS voices from being used
- Forces system to use Railway TTS only

### 3. Railway TTS Takes Over
- All legitimate lesson content uses Railway TTS
- Real Ken/Kelly voices via Piper
- No more robot voices!

## 🧪 Testing

Visit: https://ilearnhow.com/?v=1755611792

### What You Should Experience:
- ✅ NO "lesson orientation" voice on page load
- ✅ When starting a lesson, hear natural Ken/Kelly voices
- ✅ All speech comes from Railway TTS
- ❌ No macOS robot voices

### If Issues Persist:
1. Hard refresh: Cmd+Shift+R
2. Clear browser cache
3. Wait 2-3 minutes for CDN propagation

## 📊 Technical Details

### Blocked Phrases:
- "lesson orientation"
- "vitamin cue" 
- "timing habit"
- "cloudy/indoor fixes"
- "close + plan"
- Any text containing "placeholder" or "script_text"

### Intercepted Functions:
- `window.speak()`
- `window.tts.generateAudio()`
- `window.tts.speak()`
- `SpeechSynthesisUtterance`
- `lessonPlayer.speak()`

## 🎯 Result

Users now have a professional experience:
1. Page loads silently
2. Clicking "Start Lesson" plays natural Ken/Kelly voices
3. No jarring robot voice interruptions
4. Smooth, professional narration throughout

---

**Deployment Time**: Aug 15, 2025
**Cache Bust URL**: https://ilearnhow.com/?v=1755611792
