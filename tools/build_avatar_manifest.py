#!/usr/bin/env python3
import json
import shutil
from pathlib import Path

BASE = Path('production-deploy/assets/avatars')
AVATARS = ['kelly','ken']
VISEMES = ['REST','A','E','I','O','MBP','FV','TH','DNTL','KG','S','WQ','R']

def find_first(paths):
    for p in paths:
        if p and p.exists():
            return p
    return None

def pick_files_for_avatar(avatar: str):
    root = BASE / avatar / '2d'
    full = root / 'full'
    manifest = {}
    # Heuristic sources
    mouth = {p.name.upper(): p for p in root.glob('mouth_*.png')}
    # sequential frames for fallbacks
    frames = sorted(full.glob(f'{avatar}_frame_*.png'))
    # Direct named O in repo
    direct_o = full / f'{avatar}_O.png'

    # REST
    rest_src = find_first([
        full / f'{avatar}_frame_0000.png',
        full / f'{avatar}_frame_0001.png',
        full / f'{avatar}_frame_0002.png',
        (root / f'{avatar}_neutral_default.png'),
    ] + frames)
    manifest['REST'] = str(rest_src) if rest_src else ''

    # Vowel visemes
    manifest['A'] = str(find_first([
        mouth.get('MOUTH_A_TEACH.PNG'), mouth.get('MOUTH_A_EMPHASIS.PNG'), mouth.get('MOUTH_A_HAPPY.PNG'),
        mouth.get('MOUTH_AY.PNG')
    ]) or rest_src)
    manifest['E'] = str(find_first([
        mouth.get('MOUTH_E_TEACH.PNG'), mouth.get('MOUTH_E_EMPHASIS.PNG')
    ]) or rest_src)
    manifest['I'] = str(find_first([
        mouth.get('MOUTH_I_TEACH.PNG'), mouth.get('MOUTH_I_EMPHASIS.PNG')
    ]) or rest_src)
    manifest['O'] = str(find_first([direct_o, mouth.get('MOUTH_OO.PNG')]) or rest_src)

    # Consonant groups
    manifest['MBP'] = str(find_first([
        mouth.get('MOUTH_MBP.PNG'), full / f'{avatar}_frame_0001.png'
    ]) or rest_src)
    manifest['FV'] = str(find_first([
        mouth.get('MOUTH_FV.PNG'), mouth.get('MOUTH_AY.PNG')
    ]) or rest_src)
    manifest['TH'] = str(find_first([
        mouth.get('MOUTH_TH.PNG')
    ]) or rest_src)
    manifest['DNTL'] = str(find_first([
        mouth.get('MOUTH_L.PNG'), mouth.get('MOUTH_D.PNG'), mouth.get('MOUTH_T.PNG')
    ]) or rest_src)
    manifest['KG'] = str(find_first([
        mouth.get('MOUTH_NG.PNG'), mouth.get('MOUTH_K.PNG'), mouth.get('MOUTH_G.PNG')
    ]) or rest_src)
    manifest['S'] = str(find_first([
        mouth.get('MOUTH_S.PNG'), mouth.get('MOUTH_SH.PNG')
    ]) or rest_src)
    manifest['WQ'] = str(find_first([
        mouth.get('MOUTH_OO.PNG'), mouth.get('MOUTH_W.PNG'), mouth.get('MOUTH_Q.PNG')
    ]) or rest_src)
    manifest['R'] = str(find_first([
        mouth.get('MOUTH_UH.PNG'), mouth.get('MOUTH_ER.PNG')
    ]) or rest_src)

    return manifest

def copy_flatten(manifest: dict, avatar: str):
    outdir = BASE / avatar / '2d' / 'visemes_flat'
    outdir.mkdir(parents=True, exist_ok=True)
    copied = {}
    for viseme, src in manifest.items():
        if not src:
            continue
        src_path = Path(src)
        if not src_path.exists():
            continue
        dst = outdir / f'{avatar}_{viseme}.png'
        shutil.copy2(src_path, dst)
        copied[viseme] = str(dst)
    return copied

def main():
    all_manifest = {}
    for avatar in AVATARS:
        m = pick_files_for_avatar(avatar)
        copied = copy_flatten(m, avatar)
        all_manifest[avatar] = {
            'selected_sources': m,
            'flattened': copied,
        }
    with open(BASE / 'manifest.json', 'w') as f:
        json.dump(all_manifest, f, indent=2)
    print(f"✅ Manifest written to {BASE/'manifest.json'}")

if __name__ == '__main__':
    main()


