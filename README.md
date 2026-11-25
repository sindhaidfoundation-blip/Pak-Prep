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

## Run locally

1. Install Node.js LTS.
2. Run `npm install`.
3. Run `npx expo start`.
4. Scan the QR code with Expo Go, or press `a` for Android emulator / `i` for iOS simulator.

## Current starter scope
The first commit provides navigation between Home, job-wise Past Papers, Subject MCQs and Dawn English. Past-paper buttons link to the relevant TestPoint source collection. Dawn study cards link to the original Dawn article and include short original Urdu vocabulary notes. A full content import pipeline, persistent database, offline sync, admin authentication and verified individual past-paper records remain follow-up work.
