# Avatar Inventory System

This directory contains the Ken & Kelly avatar inventory system for iLearn How.

## Overview

The avatar inventory consists of:
- **Kelly**: 413 assets (446.72 MB)
- **Ken**: 395 assets (508.18 MB)
- **Total**: 808 files (954.9 MB)

## Viewing the Inventory

1. **Local Access**: Open `inventory.html` in a web browser
2. **Production**: Deploy to `ilearnhow.com/inventory`

## Asset Structure

```
avatars/
├── kelly/
│   ├── kelly_neutral_default.png (main default)
│   ├── base-states/
│   ├── emotional-expressions/
│   │   ├── kelly_concerned_thinking.png
│   │   └── kelly_happy_celebrating.png
│   ├── lesson-sequence/
│   │   ├── kelly_question_curious.png
│   │   └── kelly_teaching_explaining.png
│   ├── 2d/
│   │   ├── full/ (366 frames: kelly_frame_0000-0364.png)
│   │   ├── visemes_flat/ (13 viseme files)
│   │   └── mouth_*.png (30 phoneme files)
│   └── optimized/
└── ken/
    ├── ken_neutral_default.png (main default)
    ├── base-states/
    ├── emotional-expressions/
    │   ├── ken_concerned_thinking.png
    │   └── ken_happy_celebrating.png
    ├── lesson-sequence/
    │   ├── ken_question_curious.png
    │   └── ken_teaching_explaining.png
    ├── 2d/
    │   ├── full/ (348 frames: ken_frame_0000-0346.png)
    │   ├── visemes_flat/ (13 viseme files)
    │   └── mouth_*.png (30 phoneme files)
    ├── tone-specific/
    │   ├── fun/
    │   ├── grandmother/
    │   └── neutral/
    └── optimized/
```

## Features

The inventory page (`inventory.html`) provides:
- Visual gallery of all avatar assets
- Frame name display for easy reference
- Availability status (checks local files)
- R2 connection status check
- Filter controls (All/Available/Missing)
- Comprehensive statistics

## Verification Script

Run the verification script to check asset completeness:
```bash
node scripts/verify-avatar-inventory.js
```

This will:
- Check all expected files
- Report missing assets
- Calculate total sizes
- Generate R2 sync commands if needed
- Save detailed report to `inventory-report.json`

## Cloudflare R2 Integration

The system is designed to work with Cloudflare R2 for production deployment:
- Base URL: `https://ilearnhow.com/assets/avatars`
- Assets should be uploaded maintaining the same directory structure
- The inventory page checks R2 availability in real-time

## Asset Categories

1. **Base States**: Default neutral expressions
2. **Emotional Expressions**: Happy, concerned reactions
3. **Lesson Sequence**: Teaching and questioning states
4. **Mouth Phonemes**: Individual mouth shapes for animation
5. **Visemes**: Lip sync positions (A, E, I, O, etc.)
6. **Frame Sequences**: Full animation frames
7. **Tone Specific**: Variations for different teaching styles

## Notes

- All images are PNG format
- Kelly has 366 animation frames (0-364 + special)
- Ken has 348 animation frames (0-346 + special)
- Visemes follow standard phoneme mapping
- Assets optimized for real-time lesson playback
