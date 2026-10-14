# Lorosae Legends | Gameplay Reference Analysis (14 October 2026)

Reference: user-supplied 76-second portrait screen recording of Vita Mahjong, 512x1110.

## Observed facts
- Tall portrait playfield, compact header with back control left, IQ/status text centred, menu right.
- Top green outlined selection/holding strip containing tile faces during gameplay. **Do not assume this strip is an ordinary seven-slot tray or a pair-selection UI without interaction verification.**
- Dense layered multi-height board occupies most of the screen below the strip, not a tiny grid inside a web card.
- Large legible rectangular ivory tiles with pronounced shadows and decorative backs on upper layers.
- Some tiles overlap other tiles; match animations include bright particles, fragments, light pulses.
- Bottom-aligned circular booster controls (shuffle, hint, undo) with small availability badges.
- Green, subtly patterned background; more screen space allocated to board than typography.
- Progress/level and a separate UI are partly visible at the beginning, but recording is mostly active gameplay.

## Implementation priorities
1. Verify actual selection/collection/match rules frame-by-frame against the user video before committing another gameplay-engine direction. Earlier two-tile Mahjong-solitaire interpretation may be incorrect: visible top selection strip changes after touches. This must be resolved.
2. Reframe the browser view to a real device-height app shell. Remove title, decorative stats panels, and footers from in-game view.
3. Green status strip near top, portrait board that scales by available screen height, and three anchored booster buttons.
4. Layered tile positions with overlap and true occlusion, readable symbols, optional subtle original East Timorese backs and illustrations. Avoid copying Vita visuals, assets, trademarks, and level data.
5. Instrument animation events, selection transitions, blocked inputs, hint choice and undo correctness; test on Android.
6. Keep English and an original Lorosae Legends brand/menu separate from the playfield.

## Acceptance
- Game UI must remain readable on 360px-wide Android phones.
- No horizontal scroll or clipped boost controls with safe-area insets.
- The generated board must have a verified clear path.
- Recorded rules must agree with the implemented rules, including top strip and booster action.
- No change to live website or main branch. Do not merge prior to physical-device approval.

## Status
Reference analysis only; not a claim that the redesigned interface or correct gameplay mechanics are implemented.

## Implementation note
Portrait-first redesign now committed in `www/index.html`, `www/style.css` and `www/src/game.mjs` (14 October 2026). Pair-matching engine is retained provisionally. The selection strip's original reference-game behaviour remains unverified, as does native-device appearance; do not treat the interface as a finished match to the video. Android CI should be checked for the newest workflow run before downloading a new APK.
