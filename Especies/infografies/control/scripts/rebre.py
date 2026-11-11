"""Receptor local d'imatges generades a ChatGPT.

ChatGPT bloqueja fetch() cap a 127.0.0.1 (CSP connect-src), però no restringeix form-action:
la pàgina envia cada imatge amb un formulari multipart a aquest servidor, que la desa a DEST.
Ús: python rebre.py [carpeta_destí] [port]
"""
import os, sys
from email.parser import BytesParser
from email.policy import default
from http.server import BaseHTTPRequestHandler, HTTPServer

DEST = sys.argv[1] if len(sys.argv) > 1 else os.path.join(os.path.dirname(__file__), "..", "gen")
PORT = int(sys.argv[2]) if len(sys.argv) > 2 else 8765
os.makedirs(DEST, exist_ok=True)


class H(BaseHTTPRequestHandler):
    def log_message(self, *a):
        pass

    def do_GET(self):
        self.send_response(200); self.send_header("Content-Type", "text/html; charset=utf-8"); self.end_headers()
        self.wfile.write("<p>Receptor d'imatges actiu.</p>".encode())

    def do_POST(self):
        n = int(self.headers["Content-Length"])
        body = self.rfile.read(n)
        msg = BytesParser(policy=default).parsebytes(
            b"Content-Type: " + self.headers["Content-Type"].encode() + b"\r\n\r\n" + body)
        saved = []
        for part in msg.iter_parts():
            fn = part.get_filename()
            if fn:
                fn = os.path.basename(fn)
                data = part.get_payload(decode=True)
                with open(os.path.join(DEST, fn), "wb") as f:
                    f.write(data)
                saved.append(f"{fn} ({len(data)} bytes)")
        self.send_response(200); self.send_header("Content-Type", "text/html; charset=utf-8"); self.end_headers()
        self.wfile.write(("<p>Desat: " + ", ".join(saved) + "</p>").encode())
        print("desat", saved, flush=True)


HTTPServer(("127.0.0.1", PORT), H).serve_forever()
