# Build Deutsch auf C1 for iPhone and iPad

The repository is prepared as a Capacitor 8 project for Android and iOS.

## Requirements

The final iPhone application must be built on macOS. Install:

- Xcode from the Mac App Store
- Xcode Command Line Tools
- Node.js and npm
- An Apple ID
- An Apple Developer Program membership for App Store/TestFlight distribution

## Create the iOS project (first build only)

```bash
cd /path/to/Deutsch-C1-main
npm install
npm run ios:init
npm run ios:open
```

If the `ios` directory already exists, do not run `ios:init` again. Use:

```bash
npm run ios:sync
npm run ios:open
```

## Configure signing in Xcode

1. Select the **App** project.
2. Open **Signing & Capabilities**.
3. Select your Apple development team.
4. Keep the bundle identifier `de.amit.deutschaufc1`, or change it to another globally unique identifier before the first release.
5. Enable automatic signing.

## Test on an iPhone

Connect the iPhone to the Mac, select it as the run destination and press **Run**. A free Apple ID can be used for temporary personal-device testing, but the signing normally expires after seven days.

## Create a distributable build

For TestFlight or the App Store:

1. Select **Any iOS Device (arm64)** as the destination.
2. Choose **Product → Archive**.
3. In Organizer, choose **Distribute App**.
4. Select **App Store Connect** for TestFlight/App Store, or an available ad-hoc/development method for permitted test devices.

Xcode produces and signs the archive. When the selected distribution method supports export, it creates the `.ipa`.

## Updating the iOS app after website changes

```bash
cd /path/to/Deutsch-C1-main
git pull
npm install
npm run ios:sync
npm run ios:open
```

Then build/archive again in Xcode. The same offline website data and local progress storage are bundled into the iOS app.

## Important

An Android APK cannot be converted directly into an IPA. Android and iOS packages are separate native containers. Never commit Apple signing certificates, private keys, provisioning profiles, or passwords to GitHub.
