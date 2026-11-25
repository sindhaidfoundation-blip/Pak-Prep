# Past-paper import workflow

1. Obtain a paper from an official recruiting body or a source with documented reuse permission.
2. Confirm the exact recruiting body, department, post title, BPS (5–22), year and exam date.
3. Add a row to `data/past-paper-import-template.csv`; keep the original source URL and answer-key URL.
4. Set `rights` accurately. Use `pending_review` until a reviewer records public-domain status, licence or written authorization.
5. Run `npm run validate` to catch basic CSV metadata errors.
6. A reviewer checks the PDF/file, duplicate status, answer key and question numbering.
7. Insert into Supabase using a protected admin process, set verification and status to `published` only after review.

The validation script checks structure and metadata only. It does not validate answer correctness, copyright status or whether a source URL is authentic. Never put Supabase service-role credentials in a CSV, mobile app or public repository.
