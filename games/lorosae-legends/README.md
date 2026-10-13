# Lorosae Legends | WebLorosae Games

Original English-language East Timorese-inspired triple-match puzzle. This standalone project is on the `feature/lorosae-legends-game` branch, separate from the live WebLorosae website.

## Contents
- `www/index.html`, `www/style.css`, `www/src/game.mjs`, `www/src/engine.mjs`: standalone browser game
- `src/engine.mjs`: puzzle engine source
- `tests/engine.test.mjs`: automated Node.js tests
- `capacitor.config.json`, `package.json`: Capacitor application scaffold

## Gameplay
50 deterministic campaign layouts, triple-collection mechanic, seven-slot tray, visually layered boards, daily challenge, hints, undo, shuffle, local save, and achievements. No third-party art or game assets bundled.

## Run
From this folder: `npm test`. To play, run `python3 -m http.server 8080 --directory www` and open http://localhost:8080. Native build prerequisites: `npm install`, `npx cap add android` or `npx cap add ios`, `npx cap sync`, and Android Studio or Xcode/macOS, with signing credentials.

## QA limitations
The four automated tests passed in the local working copy on 14 October 2026. The solver test uses undo, shuffle and occasional regenerated rescue seeds, and therefore is NOT a mathematical proof of guaranteed solvability. Browser/device smoke tests, performance QA, balancing and signed native builds have not been completed.

## Production safeguards
No modifications to `main`, GitHub Pages, the WebLorosae live website, app-store accounts or payments. Do not merge or publish until complete device QA and approval.
