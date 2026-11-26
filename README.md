# Pak-Prep

Pakistan-wide government-job preparation for **BPS-5 to BPS-22** across Federal, Punjab, Sindh, Khyber Pakhtunkhwa, Balochistan, AJK and Gilgit-Baltistan.

## Current repository contents
- Expo / React Native mobile app for Android and iOS.
- Home, nationwide job directory, subject catalogue, practice quiz, Dawn vocabulary and saved-material screens.
- Individual post listings under job families and official recruiting-body links.
- Original sample practice questions clearly labelled as practice, not official past papers.
- 62 General Knowledge practice MCQs are currently present; the requested 3,000-question sourced bank is not yet complete or independently imported/verified.
- Device-local bookmarks and quiz completion using AsyncStorage.
- Optional Supabase client scaffold and relational SQL migration with row-level security.
- CSV template and validation script for authorized past-paper imports.
- Content sourcing policy, privacy draft, store listing draft and release configuration.

## Run the app
1. Install Node.js LTS.
2. Copy `.env.example` to `.env` if configuring Supabase; values are optional for the local starter app.
3. Run `npm install`.
4. Run `npx expo start`.
5. Open with Expo Go or an Android/iOS simulator.

## Scripts
- `npm start` — start Expo.
- `npm run typecheck` — TypeScript check.
- `npm run validate` — validate the past-paper CSV structure.

## Supabase setup (optional backend)
1. Create a Supabase project.
2. Run `supabase/migrations/0001_initial_schema.sql` in the Supabase SQL editor.
3. Run `supabase/seed.sql` for the initial recruiting-body and subject catalogue.
4. Copy the project URL and anon/public key into `.env` using `.env.example`.
5. Never put the Supabase service-role key in the mobile app. Use a protected admin server/Edge Function for imports and moderation.

The current mobile app still uses local storage for progress; cloud authentication, sync and admin moderation are not yet wired into screens.

## Nationwide recruitment index
Federal: FPSC and National Jobs Portal. Punjab: PPSC and departments. Sindh: SPSC and STS. KPK: KPPSC and ETEA. Balochistan: BPSC. AJK: AJKPSC. Include GB and additional departmental/testing bodies as their official source records are verified.

Job families include clerical, police, education, health, engineering, IT, accounts/audit, revenue, agriculture, judiciary, administration and competitive examinations. Each exact post is intended to have its own papers and answer keys, with BPS, year, exam date and source metadata.

## Content accuracy and copyright
A category listing is not proof that its historical papers have been collected. Do not label any paper as available until it is imported, provenance-checked and answer-verified. Import complete third-party papers only where public-domain status, a reuse licence or written authorization is documented. For TestPoint and other third-party repositories, link to the source unless reuse rights are established. Dawn article text is not republished; use original article links and independently written vocabulary notes. See [CONTENT_POLICY.md](docs/CONTENT_POLICY.md).

## Build artifacts
- Android installable APK: `eas build --platform android --profile preview`.
- Google Play Android App Bundle: `eas build --platform android --profile production`.
- iOS App Store build: `eas build --platform ios --profile production`.

Expo Build requires an Expo account and a linked EAS project. Set the actual EAS project ID in `app.json` and configure signing credentials. AAB is the Google Play upload format; APK is for direct installation/testing. iOS uses a separately signed IPA. Expo's current documentation explains the [APK profile](https://docs.expo.dev/build-reference/apk/) and [store submission process](https://docs.expo.dev/deploy/submit-to-app-stores/).

## Store release prerequisites
Google Play Console, Apple Developer Program/App Store Connect and any additional store accounts must be owned/authorized by the publisher. Complete signing, screenshots, privacy disclosures, support contact, age/content rating and store review. Build completion does not equal store approval or publication.

## Known unfinished work
- Full authorized past-paper collection and verified answer keys.
- Expand the General Knowledge bank from 62 to the 3,000-question target using the authorized source material, with deduplication and answer verification.
- Admin dashboard and protected content moderation/import workflow.
- Connect app screens to Supabase and add authentication/cloud sync.
- Full question banks for every subject and each job-specific paper collection.
- PDF viewer, offline paper downloads, timed exam modes and progress analytics.
- Final QA, signed binaries and app-store submissions.

## Validation
- `npm run typecheck` — TypeScript compile-time checks.
- `npm run validate` — checks the past-paper import CSV structure.
- `npm run validate:mcqs` — checks MCQ IDs, option counts, answer indexes and required fields.
