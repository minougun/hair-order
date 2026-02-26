# Android App (WebView Wrapper)

This Android app wraps the production web app:

- URL: `https://minougun.github.io/hair-order/`
- Features: file upload (`<input type="file">`), geolocation permission handling

## Build (debug APK)

1. Install Android SDK packages (`platform-tools`, `platforms;android-34`, `build-tools;34.0.0`).
2. Set `sdk.dir` in `local.properties`.
3. Build:

```bash
cd android
./gradlew assembleDebug
```

APK output:

- `android/app/build/outputs/apk/debug/app-debug.apk`
