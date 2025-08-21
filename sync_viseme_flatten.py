#!/usr/bin/env python3
import shutil
from pathlib import Path

BASE = Path('production-deploy/assets/avatars')
CATEGORIES = ['enhanced','emotional','contextual']
SPEAKERS = ['kelly','ken']

copied = []
for speaker in SPEAKERS:
    src_root = BASE / speaker / '2d' / 'visemes'
    dst_root = BASE / speaker / '2d'
    for cat in CATEGORIES:
        cat_dir = src_root / cat
        if not cat_dir.exists():
            continue
        for png in cat_dir.glob('mouth_*.png'):
            target = dst_root / png.name
            try:
                shutil.copy2(png, target)
                copied.append(str(target))
            except Exception as e:
                print(f"Failed to copy {png} -> {target}: {e}")

print(f"✅ Flattened {len(copied)} viseme files into 2d/ roots.")
