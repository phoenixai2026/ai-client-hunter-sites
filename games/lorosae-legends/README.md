# Lorosae Legends | WebLorosae Games

Original East Timorese-inspired **Mahjong solitaire**, with two-tile pair matching and English-language UI. This game is independent from the main WebLorosae website.

## Gameplay revision (14 October 2026)
- Tap two identical **free** tiles to remove the pair immediately.
- A tile is free only when no tile above covers its position and either its left or right edge is unblocked.
- No seven-slot tray and no triple-matching.
- 50 deterministic layered campaign puzzles, generated with known winning pair-removal routes.
- Hint, Undo, Shuffle, local progress, daily challenge and achievements.
- Original symbol vocabulary and sunrise, coastal and Tais-inspired styling.
- The save key is versioned, because previous triple-match progress is not compatible.

## Test
`npm test` runs engine tests, including verifying winning paths through all 50 levels. A passing suite establishes a known solution for each generated board, **not** guaranteed success for every possible player decision. Native builds and user-experience testing remain separate.

## Play locally
`python3 -m http.server 8080 --directory www` then visit http://localhost:8080.

## Android test build
GitHub Actions workflow `.github/workflows/lorosae-android-debug.yml` builds a debug APK on commits to `feature/lorosae-legends-game`. Download the successful build artifact from the Actions page. Native installation and gameplay need testing on a real device.

## Release controls
This is a draft development branch. Nothing has been merged into `main` or published to the live site or app stores. Artwork, interaction polish, multiple-device testing, level balancing and iPhone builds remain to be completed.
