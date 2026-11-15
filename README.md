# Photo Metadata Cleaner

A free, private web tool that removes hidden metadata from images, right in your browser. Nothing is uploaded anywhere.

## What it removes

- **EXIF**: camera make, model and serial number, lens, exposure, dates, GPS location
- **XMP and IPTC**: author, copyright, captions, keywords, edit history
- **AI-generator data**: Stable Diffusion / ComfyUI prompts and workflows, Midjourney / DALL·E / Firefly tags, the IPTC "digital source type" AI label
- **C2PA Content Credentials**: signed provenance manifests
- Comments, timestamps, embedded thumbnails and other private blocks

## What it keeps

- The image data, byte for byte. Nothing is re-encoded, so quality is unchanged.
- Optionally the ICC color profile (accurate colors) and the rotation flag (photos stay upright).

## Features

- JPG, PNG and WebP, including transparency and animation
- Shows every metadata field it finds before you save
- Re-checks each cleaned file to confirm nothing is left
- Batch processing with a single ZIP download
- Drag and drop, file picker or paste

## Limits

Some AI tools also embed an invisible watermark in the pixels themselves (for example Google SynthID). That is part of the image, not its metadata, so a lossless metadata cleaner cannot remove it. HEIC/AVIF files are not supported yet.

## Running it

It is a single static file. Open `index.html` in any modern browser, or host it on any static host such as GitHub Pages.
