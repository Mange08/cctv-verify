# CCTV Verify — PWA v1.1

Forensisk tidstämpling för CCTV-dokumentation. Manuell CCTV-tidsinmatning (ingen automatisk OCR).

## Vad är nytt i v1.1

Den automatiska OCR-läsningen (Tesseract) är borttagen — på CCTV-displayer var träffsäkerheten 20–60 % och man behövde ändå alltid kontrollera siffrorna manuellt. Att läsa av tiden själv och skriva in via numpad tar 2–3 sekunder och är 100 % korrekt.

Borttaget:
- Tesseract OCR-pipeline (ROI-detektion, multi-pass, Otsu thresholding)
- "Läser tid från bilden…"-statusen
- Tesseract CDN-skriptet (`tesseract.min.js`)

Bevarat och oförändrat:
- Live kamerasökare med tids-overlay (uppdateras 20 ggr/sek)
- Tidssynk mot 3 oberoende källor med medianvärde
- Auto-resynk var 5:e minut och vid återkomst från bakgrund
- Tap-to-focus och pinch-to-zoom
- Standard- och Full forensik-lägen
- Manuell CCTV-tidsinmatning via numpad — tryck i fält för att redigera
- Inbränd CCTV-jämförelse direkt i bilden
- Dela/spara till Foton
- Offline-stöd för app-skalet

## Uppgradering från v1.0

Service worker-cachen heter `cctv-verify-v1.1` (var `cctv-verify-v1.0`). När den nya appen laddas första gången raderas den gamla cachen automatiskt och Tesseract-skriptet försvinner från enheten.

Om du har v1.0 installerad på hemskärmen behöver du **inte** avinstallera den — uppgraderingen sker tyst nästa gång du öppnar appen. Om du redan har bytt URL helt kan du ta bort den gamla hemskärmsikonen och installera om från den nya URL:en.

## Deployment

Alla sökvägar är **relativa** (`icons/...`, `manifest.webmanifest`, etc.) så appen fungerar lika bra på Netlify, GitHub Pages och lokalt utan ändringar.

### Alternativ 1: Netlify Drop (snabbast)

1. Gå till **https://app.netlify.com/drop**
2. Dra och släpp **hela mappen** `cctv-verify/`
3. Öppna URL:en i Safari på iPhonen

### Alternativ 2: GitHub Pages

1. Skapa ett nytt repo, t.ex. `cctv-verify`
2. Pusha innehållet i denna mapp till `main`-branchen
3. **Settings → Pages → Source: Deploy from a branch → main → /(root) → Save**
4. Vänta 1–2 min, sedan finns appen på `https://[ditt-användarnamn].github.io/cctv-verify/`

`.nojekyll`-filen är inkluderad så att GitHub Pages inte kör Jekyll-bearbetning.

### Installera som hemskärms-app

I Safari: **Dela-ikonen** → **"Lägg till på hemskärmen"** → **Lägg till**

## Filstruktur

```
cctv-verify/
├── .nojekyll               # Stänger av Jekyll på GitHub Pages
├── index.html              # Huvudappen (inline CSS + JS)
├── manifest.webmanifest    # PWA-manifest
├── sw.js                   # Service worker
├── README.md
└── icons/
    ├── apple-touch-icon.png
    ├── icon-192.png
    ├── icon-512.png
    ├── maskable-192.png
    └── maskable-512.png
```
