# Pak-Prep

A Pakistan-wide competitive exam preparation app for **BPS-5 to BPS-22** government recruitment.

## App modules
- **Job-wise past papers:** one section per exact post, separated by recruiting body, department, province/region, BPS, year and exam date. A job page is reserved for that post's past papers and verified answer keys.
- **Subject practice:** English, General Knowledge, Pakistan Studies, Islamic Studies, Everyday Science, Mathematics, Computer, Current Affairs, Urdu, Pedagogy, Analytical Reasoning and Geography.
- **Dawn English:** links to original Dawn articles and provides independent study notes: Urdu meanings, synonyms, antonyms and essay-ready example sentences. Dawn article text is not republished.
- Planned: saved questions, timed mock tests, offline packs, progress sync and content-management dashboard.

## Pakistan-wide recruitment directory
Coverage is designed for:
- Federal: FPSC, National Jobs Portal and federal departments.
- Punjab: PPSC and provincial departments.
- Sindh: SPSC, STS and provincial departments.
- Khyber Pakhtunkhwa: KPPSC, ETEA and provincial departments.
- Balochistan: BPSC and provincial departments.
- AJK and Gilgit-Baltistan recruitment bodies and departments.
- National testing services and public-sector recruiting organizations where relevant.

Job-family index includes clerical/office, police/law enforcement, education, health, engineering/technical, IT, accounts/audit, revenue/land, agriculture/environment, judiciary/court staff, management/administration and competitive examinations.

**Important:** A directory category is not evidence that every past paper has already been sourced. Individual paper records must be collected, provenance-checked, deduplicated, and answer-verified before being marked available. The current UI is a starter directory and external source index, not a complete imported past-paper database.

## Content sourcing and rights
TestPoint.pk and other public sources may be used to discover relevant topics and source links. Store only public-domain content, content licensed for reuse, or content the user has permission to provide. Do not mirror a complete third-party MCQ database or copy Dawn article text. Keep source URL, recruiting body, post, BPS, exam date, and rights/provenance metadata with every imported paper.

## Tech stack
- Expo + React Native + TypeScript
- Android and iOS from one codebase
- EAS Build profiles: preview APK, production Android App Bundle (AAB), production iOS store build

## Run locally
1. Install Node.js LTS.
2. Run `npm install`.
3. Run `npx expo start`.
4. Scan the QR code with Expo Go, or press `a` for Android emulator / `i` for iOS simulator.

## Build profiles
- `eas build --platform android --profile preview` — internal-install APK.
- `eas build --platform android --profile production` — Google Play AAB.
- `eas build --platform ios --profile production` — iOS App Store distribution build.

An Android APK and iOS IPA are separate platform artifacts. Apple App Store, Google Play, Samsung Galaxy Store, Huawei AppGallery and other stores have different developer-account, signing, review and submission requirements. A successful build does not mean an app has been approved or published.

## Release prerequisites
- Expo account and EAS project linked to this repository.
- Apple Developer Program membership and App Store Connect app record for iOS.
- Google Play Console developer account and app record for Android.
- Store-specific developer accounts and package requirements for additional stores.
- Final app icon, screenshots, privacy policy URL, support contact, age/content rating and store listing metadata.
- User-owned signing credentials configured privately in EAS; never commit certificates, API keys or service-account files.

## Current status
The app UI and nationwide BPS-5+ directory are committed. Full paper ingestion, backend/admin tooling, persistent user data, offline mode, production testing, store credentials, signed release artifacts and store publication remain to be completed.
