# CCTV Verify — PWA

Forensisk tidstämpling för CCTV-dokumentation.

## Snabbstart — testa direkt på iPhone

### Alt 1: Netlify Drop (rekommenderas — 30 sekunder)

1. Gå till **https://app.netlify.com/drop**
2. Dra och släpp **hela mappen** `cctv-verify/` (inte zip-filen, utan den uppackade mappen) på sidan
3. Du får en URL som ser ut ungefär så här: `https://random-name-12345.netlify.app`
4. Öppna URL:en i **Safari** på iPhonen (inte Chrome)
5. Tryck **Starta kamera** → tillåt åtkomst

### Alt 2: Installera som hemskärms-app

När du öppnat sidan i Safari:

1. Tryck på **Dela-ikonen** (kvadraten med uppåtpil)
2. Bläddra ner och välj **"Lägg till på hemskärmen"**
3. Tryck **Lägg till** uppe till höger

Appen dyker upp på hemskärmen som "CCTV Verify" med egen ikon och körs i fullskärm utan Safari-UI.

## Filstruktur

```
cctv-verify/
├── index.html              # Huvudappen
├── manifest.webmanifest    # PWA-manifest
├── sw.js                   # Service worker (offline-cache)
├── icons/
│   ├── apple-touch-icon.png
│   ├── icon-192.png
│   ├── icon-512.png
│   ├── maskable-192.png
│   └── maskable-512.png
└── README.md
```

## Funktioner

- **Live kamerasökare** med tids-overlay (uppdateras 20 ggr/sek)
- **Tidsynk mot 3 oberoende källor** (Cloudflare, WorldTimeAPI, TimeAPI) med medianvärde
- **3 inbränningslägen:**
  - *Minimal*: bara verklig tid
  - *Standard*: verklig tid + datum + offset
  - *Full forensik*: verklig tid + datum + UTC + offset + osäkerhet + källor
- **CCTV-jämförelse**: snabb numpad-inmatning av CCTV-tid → beräknar differens → bränns in i bilden
- **Auto-resynk** var 5:e minut och vid återkomst från bakgrund
- **Manuell resynk** via knapp
- **Tap-to-focus** och **pinch-to-zoom** i sökaren
- **Offline-stöd** för app-skalet (tidsynk kräver internet)
- **Fungerar som hemskärms-app** på iOS

## Tekniska anteckningar

- HTTP-tidsynk har sekundupplösning från Date-header; cdn-cgi/trace ger sub-sekund. Verklig precision visas som ±RTT/2 ms.
- Tiden låses vid exakt tryckmoment (capture), inte vid render.
- Inbränd info finns i pixlarna — kan inte tas bort utan att det syns.
- Numpad-validering: tillåter bara giltiga tidsvärden (HH ≤ 23, MM ≤ 59, SS ≤ 59).

## Begränsningar

- Ingen kryptografisk signering ännu
- Ingen EXIF-injektion
- Ingen sessionslogg/JSONL-export
- HTTP-time har sekund-precision; för riktig ms-precision behövs dedikerad endpoint

## Nästa steg om du vill vidareutveckla

1. SHA-256-hash av bilden + manifest med metadata
2. EXIF-data: GPSTimeStamp, DateTimeOriginal med ms, UserComment med synkkällor
3. Egen tidsserver för ms-precision (t.ex. en liten Cloudflare Worker)
4. JSONL-sessionslogg som kan exporteras tillsammans med bilderna
5. Signering med privat nyckel för bevis-grade dokumentation
