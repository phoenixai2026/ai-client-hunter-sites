# Lorosae Legends | WebLorosae Games

Independent East Timorese-inspired triple-match puzzle game, developed separately from the WebLorosae site. All copy in English.

## Development snapshot
The initial full project source and automated tests are packaged as a downloadable archive in the development handoff. Source includes 50 deterministic level configurations, layered tiles, seven-slot collection tray, hint, undo, shuffle, saved progress, achievements, daily challenges, and Capacitor configuration.

## Safety
This game is **not** deployed or linked from the main website. The new development branch is isolated from `main`. No stores or production services have been changed.

## Next integration
Copy the verified project archive contents into this directory on this development branch before opening a pull request. Browser and native-device QA are required prior to release. Do not mark this branch as production-ready.

## Testing
`npm test`, then serve the directory through a static local server. Native packaging needs Android SDK/Android Studio or Xcode with macOS and signing credentials.
