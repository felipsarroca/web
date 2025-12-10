import os
import re
import urllib.request

def update_footer_in_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # 1. Update text "Recurs educatiu..."
    # Match the specific phrase to avoid partial replacements if run multiple times (check if already done)
    if "Recurs educatiu de l'escola Ramon Pont" not in content:
        content = content.replace("Recurs educatiu per descobrir", "Recurs educatiu de l'escola Ramon Pont per descobrir")
        print(f"Updated text in {os.path.basename(filepath)}")
    else:
        print(f"Text already updated in {os.path.basename(filepath)}")

    # 2. Update Copyright section
    # We look for the <p> containing "Web didàctica © 2024"
    # Regex to capture the tag: <p ...> ... Web didàctica © 2024 ... </p>
    copyright_regex = re.compile(r'<p[^>]*style="[^"]*margin-top:\s*2rem[^"]*"[^>]*>\s*Web didàctica © 2024\s*</p>', re.DOTALL | re.IGNORECASE)
    
    new_copyright = """<div style="margin-top: 2rem; font-size: 0.85rem; opacity: 0.8;">
            <p style="margin-bottom: 0.5rem;">Web creada per <a href="https://ja.cat/felipsarroca" target="_blank" style="color: inherit; text-decoration: underline;">Felip Sarroca</a> amb l'assistència de la IA.</p>
            <p><a href="https://creativecommons.org/licenses/by-nc-sa/4.0/deed.ca" target="_blank" rel="license" style="color: inherit; text-decoration: underline;">Obra sota llicència CC BY-NC-SA 4.0</a></p>
        </div>"""
    
    if "Web creada per <a href" not in content:
        match = copyright_regex.search(content)
        if match:
            content = content.replace(match.group(0), new_copyright)
            print(f"Updated copyright in {os.path.basename(filepath)}")
        else:
            print(f"Copyright pattern not found in {os.path.basename(filepath)}")
    else:
        print(f"Copyright already updated in {os.path.basename(filepath)}")

    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)

def download_codorniu():
    url = "https://upload.wikimedia.org/wikipedia/commons/1/15/Ramon_Casas_-_cartell_publicitari_Codorniu_%281897%29_-_102220.jpg"
    dest = r"c:\Users\Felip Sarroca i Gil\Desktop\Modernisme\img\cartell-codorniu.jpg"
    
    print(f"Attempting download of {url}...")
    try:
        req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'})
        with urllib.request.urlopen(req, timeout=10) as response, open(dest, 'wb') as out_file:
            data = response.read()
            out_file.write(data)
        print("Successfully downloaded Codorniu image.")
    except Exception as e:
        print(f"Failed to download Codorniu image: {e}")

# Process all HTML files
directory = r"c:\Users\Felip Sarroca i Gil\Desktop\Modernisme"
for filename in os.listdir(directory):
    if filename.endswith(".html"):
        filepath = os.path.join(directory, filename)
        try:
            update_footer_in_file(filepath)
        except Exception as e:
            print(f"Error processing {filename}: {e}")

# Try download
download_codorniu()
