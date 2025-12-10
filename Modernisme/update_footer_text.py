import os
import re

def update_footer(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    modified = False
    
    # 1. Update "Recurs educatiu..."
    # Pattern: "Recurs educatiu per descobrir" -> "Recurs educatiu de l'escola Ramon Pont per descobrir"
    # Check if already updated to avoid duplication
    if "Recurs educatiu de l'escola Ramon Pont" not in content:
        if "Recurs educatiu per descobrir" in content:
            content = content.replace("Recurs educatiu per descobrir", "Recurs educatiu de l'escola Ramon Pont per descobrir")
            modified = True
            print(f"Updated description in {os.path.basename(filepath)}")

    # 2. Update Copyright/Footer Bottom
    # Old pattern usually: <p style="..."> Web didàctica © 2024 </p>
    # We want to replace it with the new distinct block.
    
    new_footer_block = """<div style="margin-top: 2rem; font-size: 0.85rem; opacity: 0.8;">
            <p style="margin-bottom: 0.5rem;">Web creada per <a href="https://ja.cat/felipsarroca" target="_blank" style="color: inherit; text-decoration: underline;">Felip Sarroca</a> amb l'assistència de la IA.</p>
            <p><a href="https://creativecommons.org/licenses/by-nc-sa/4.0/deed.ca" target="_blank" rel="license" style="color: inherit; text-decoration: underline;">Obra sota llicència CC BY-NC-SA 4.0</a></p>
        </div>"""

    # Flexible regex to find the old copyright paragraph
    # It might look like: <p style="margin-top: 2rem; font-size: 0.85rem; opacity: 0.6;">\n            Web didàctica © 2024\n        </p>
    copyright_regex = re.compile(r'<p[^>]*style="[^"]*margin-top:\s*2rem[^"]*"[^>]*>\s*Web didàctica © 2024\s*</p>', re.DOTALL | re.IGNORECASE)
    
    if "ja.cat/felipsarroca" not in content:
        match = copyright_regex.search(content)
        if match:
            content = content.replace(match.group(0), new_footer_block)
            modified = True
            print(f"Updated copyright in {os.path.basename(filepath)}")
        else:
            # Fallback: maybe just "Web didàctica..." text replacement if regex fails due to attributes
            if "Web didàctica © 2024" in content:
                # Try to find the container p manually or just replace the text?
                # Replacing the whole p is better for structure.
                # Let's try a simpler regex
                simple_regex = re.compile(r'<p\s+style="[^"]+">\s*Web didàctica © 2024\s*</p>', re.DOTALL)
                match2 = simple_regex.search(content)
                if match2:
                    content = content.replace(match2.group(0), new_footer_block)
                    modified = True
                    print(f"Updated copyright (fallback) in {os.path.basename(filepath)}")
                else:
                    print(f"Copyright pattern not found in {os.path.basename(filepath)}")

    if modified:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)

# Run on all HTML files
directory = r"c:\Users\Felip Sarroca i Gil\Desktop\Modernisme"
for filename in os.listdir(directory):
    if filename.endswith(".html"):
        update_footer(os.path.join(directory, filename))
