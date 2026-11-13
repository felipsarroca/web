# SPDX-License-Identifier: AGPL-3.0-or-later
"""Restore the preserved cotton chapter only after an explicit --aplica."""
from pathlib import Path
import hashlib,json,sys,shutil
snapshot=Path(__file__).resolve().parent
root=snapshot.parents[1]
assert (root/'js'/'nucli.js').is_file()
manifest=json.loads((snapshot/'manifest.json').read_text(encoding='utf-8'))['files']
files=['textil.html','js/textil.js','js/textil-models.js','js/textil-roda.js','js/reals.js','img/illustration-roda.webp','img/exploded-roda.webp']
for rel in files:
 source=snapshot/rel
 assert hashlib.sha256(source.read_bytes()).hexdigest()==manifest[rel],rel
 target=(root/rel).resolve()
 assert target.is_relative_to(root),rel
 print(rel)
if '--aplica' in sys.argv:
 for rel in files: shutil.copy2(snapshot/rel,root/rel)
 print('Restored locally. Commit and publication remain manual.')
else:
 print('Preview only. Use --aplica to restore these files.')
