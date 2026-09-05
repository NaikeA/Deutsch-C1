# Deutsch auf C1 – Android APK

This Android package embeds the complete `dist` website. It does not load or reveal the private hosted Site URL. Notes, answers and progress belong only to the person using that installation.

## One-time setup on Linux Mint

1. Install Android Studio **Otter 2025.2.1 or newer** from the official Android developer website.
2. Open Android Studio once and let it install the Android SDK and platform tools.
3. Install Node.js 22 or newer.
4. In a terminal, open this repository and run:

   ```bash
   npm install
   npm run android:init
   npm run android:sync
   npm run android:open
   ```

If the `android` folder already exists, skip `npm run android:init`.

## Test APK

Run:

```bash
npm run android:debug-apk
```

The test APK is created at:

```text
android/app/build/outputs/apk/debug/app-debug.apk
```

Android will show that this is a test build. Use it only for your own testing.

## Signed APK for friends

1. Run `npm run android:open`.
2. In Android Studio, select **Build → Generate Signed App Bundle or APK**.
3. Select **APK**, then create a new keystore when asked.
4. Store the keystore and its password safely. Every future update must be signed with the same key.
5. Choose the **release** build and finish the wizard.

Android Studio displays the location of the signed APK. Send only that APK to your friends—never send the keystore.

## Updating the APK after website changes

Run:

```bash
npm run android:sync
```

Then generate a new signed APK in Android Studio using the same keystore. Increase `versionCode` in `android/app/build.gradle` before distributing an update.

## Privacy and offline behaviour

- The private Site URL is not part of the Android configuration.
- All website files are bundled into the APK.
- Each installation starts with separate local storage.
- A friend's notes and answers remain on that friend's device.
- Test listening and pronunciation on at least one Android phone because available text-to-speech voices depend on the device.
- Test backup export/import before distributing the release APK; Android WebView may save exports through the device's normal download handling.
