#!/usr/bin/env python3
"""Generate QR code PNGs for puzzle URLs.

Usage:
    python generate-qr.py <urls-file> <output-dir>

<urls-file> is a text file with one URL per line, formatted as:
    <puzzle-id> <url>

Generates one PNG per line in <output-dir>/<puzzle-id>.png
Requires: pip install qrcode[pil]
"""

import sys
from pathlib import Path

try:
    import qrcode
except ImportError:
    print("Install qrcode: pip install qrcode[pil]", file=sys.stderr)
    sys.exit(1)


def main():
    if len(sys.argv) != 3:
        print(f"Usage: {sys.argv[0]} <urls-file> <output-dir>")
        sys.exit(1)

    urls_file = Path(sys.argv[1])
    output_dir = Path(sys.argv[2])
    output_dir.mkdir(parents=True, exist_ok=True)

    for line in urls_file.read_text().strip().splitlines():
        line = line.strip()
        if not line or line.startswith("#"):
            continue
        puzzle_id, url = line.split(None, 1)
        img = qrcode.make(url, error_correction=qrcode.constants.ERROR_CORRECT_M)
        out_path = output_dir / f"{puzzle_id}.png"
        img.save(str(out_path))
        print(f"  {out_path}")


if __name__ == "__main__":
    main()
