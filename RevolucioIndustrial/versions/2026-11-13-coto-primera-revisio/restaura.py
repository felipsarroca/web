# SPDX-License-Identifier: AGPL-3.0-or-later
"""Restore the first cotton revision locally, only with --aplica."""
from pathlib import Path
import hashlib,json,shutil,sys
snapshot=Path(__file__).resolve().parent
root=snapshot.parents[1]
assert (root/'js'/'nucli.js').is_file()
manifest=json.loads((snapshot/'manifest.json').read_text(encoding='utf-8'))['files']
files=['textil.html','js/textil.js','js/textil-models.js','js/textil-roda.js','js/textil-estats.js']
for name in files:
 source=snapshot/name
 assert hashlib.sha256(source.read_bytes()).hexdigest()==manifest[name],name
 assert (root/name).resolve().is_relative_to(root),name
 print(name)
if '--aplica' in sys.argv:
 for name in files:shutil.copy2(snapshot/name,root/name)
 print('Restored locally. Commit and publication remain manual.')
else:
 print('Preview only. Use --aplica to restore these files.')
