# Pak-Prep

A mobile-first competitive exam preparation app for FPSC, PPSC and SPSC.

## Main modules
- Job-wise past-paper preparation: each post/job has its own section containing past papers only.
- Subject-wise MCQs: English, General Knowledge, Pakistan Studies, Islamic Studies, Everyday Science, Mathematics, Computer and other subjects.
- Dawn English learning: link to Dawn articles with original Urdu summaries/meanings, antonyms, synonyms and essay vocabulary notes.
- Quiz stages, favourites, last-seen and progress tracking.

## Content policy
TestPoint.pk is used as a discovery/reference source. Store only content that is licensed, public domain, or supplied/authorized by the user. Link to original TestPoint pages where needed; do not mirror its full question bank or copy Dawn article text. Dawn articles should open at Dawn; Pak-Prep stores learner-created notes, vocabulary and short original Urdu explanations.

## Initial implementation
This repository is currently being initialized. The next implementation step is an Expo React Native app with a PakMcqs-inspired green-and-white visual language, original branding, searchable content, local bookmarks and offline-ready question data.


## Expanded nationwide scope (requested)
Pak-Prep is intended for **BPS-5 and above (BPS-5 to BPS-22)** across Pakistan, not only FPSC/PPSC/SPSC.

### Coverage directory
- Federal recruitment: FPSC, federal ministries, divisions, attached departments, autonomous and statutory bodies.
- Punjab: PPSC and Punjab departmental / testing-service recruitments.
- Sindh: SPSC and Sindh departmental recruitments.
- Khyber Pakhtunkhwa: KPPSC and provincial departmental recruitments.
- Balochistan: BPSC and provincial departmental recruitments.
- AJK and Gilgit-Baltistan: their public service commissions and departmental recruitments.
- Other public-sector recruitment/testing bodies where their notices and papers are publicly available and reusable.

### Job-wise past-paper taxonomy
Every post gets its own page and paper collection, with filters for province/region, recruiting body, department, exact post title, BPS/pay scale, year, paper date, subject and source. The job page should contain past papers and their answer keys/solutions only; general subject learning remains in the separate Subjects module.

Examples of job families to index (not a claim that every paper is already imported): clerical and data-entry posts, assistants, inspectors, investigation/enforcement, police and law-enforcement, educators/lecturers/subject specialists, health and allied health, engineering/technical, IT, accounts/audit, revenue/land administration, agriculture, local government, judiciary/court staff, and management/administration.

### Publication targets
- Android: signed release **AAB** for Google Play; signed **APK** for direct installation/testing if requested.
- iOS: App Store Connect distribution build (IPA handled by the iOS signing/distribution pipeline).
- Additional stores: assess each store's package/signing and policy requirements separately.

A file named `apk-release.app` is not a standard combined Android/iOS deliverable. Android APK/AAB and iOS IPA are separate artifacts.

### Data quality and legal requirements
Only ingest papers and question sets that are public-domain, licensed for reuse, or supplied/authorized by the user. Preserve source, exam date, recruiting body and provenance. Do not claim full Pakistan-wide coverage until each category has been sourced, imported and checked. Add an editorial/admin workflow for corrections, duplicates and answer verification.


## Run locally

1. Install Node.js LTS.
2. Run `npm install`.
3. Run `npx expo start`.
4. Scan the QR code with Expo Go, or press `a` for Android emulator / `i` for iOS simulator.

