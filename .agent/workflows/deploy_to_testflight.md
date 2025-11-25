---
description: Deploy the app to Apple TestFlight using EAS Build
---

# Deploy to TestFlight

This workflow guides you through building your app for iOS and submitting it to TestFlight using Expo Application Services (EAS).

## Prerequisites
- You must have a paid Apple Developer Account.
- You must be logged in to your Expo account.

## Steps

1.  **Install EAS CLI** (if not already installed)
    ```bash
    npm install -g eas-cli
    ```

2.  **Login to EAS**
    ```bash
    eas login
    ```

3.  **Configure the Project**
    This will generate an `eas.json` file if one doesn't exist.
    ```bash
    eas build:configure
    ```
    - Select **iOS** when prompted.

4.  **Run the Build**
    This command triggers a cloud build. You will be asked to log in to your Apple ID to generate certificates and provisioning profiles automatically.
    ```bash
    eas build --platform ios
    ```
    - **Note:** If this is your first time, you may need to set up an App Store Connect API Key or provide your Apple ID credentials interactively.

5.  **Submit to TestFlight**
    Once the build is complete, you can submit it directly to TestFlight.
    ```bash
    eas submit -p ios
    ```
    - Alternatively, you can configure `eas.json` to auto-submit by adding `"autoSubmit": true` to your build profile.

## Troubleshooting
- **Build Fails?** Check the logs provided in the Expo dashboard link.
- **Certificate Issues?** Run `eas credentials` to manage your Apple certificates manually if auto-generation fails.
