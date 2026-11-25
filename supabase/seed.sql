-- Initial public directory data only; no historical paper records are fabricated.
insert into public.recruiting_bodies(name,region,website_url,body_type) values
 ('FPSC','Federal','https://www.fpsc.gov.pk/','Public Service Commission'),
 ('National Jobs Portal','Federal','https://njp.gov.pk/','Government jobs portal'),
 ('PPSC','Punjab','https://www.ppsc.gop.pk/','Public Service Commission'),
 ('SPSC','Sindh','https://www.spsc.gov.pk/','Public Service Commission'),
 ('STS','Sindh','https://www.sts.net.pk/','Testing service'),
 ('KPPSC','Khyber Pakhtunkhwa','https://www.kppsc.gov.pk/','Public Service Commission'),
 ('ETEA','Khyber Pakhtunkhwa','https://etea.edu.pk/','Testing service'),
 ('BPSC','Balochistan','https://www.bpsc.gob.pk/','Public Service Commission'),
 ('AJKPSC','Azad Jammu & Kashmir','https://ajkpsc.gov.pk/','Public Service Commission'),
 ('NTS','Federal','https://www.nts.org.pk/','Testing service'),
 ('PTS','Federal','https://pts.org.pk/','Testing service'),
 ('OTS','Federal','https://ots.org.pk/','Testing service')
on conflict(name,region) do nothing;

insert into public.subjects(name,description) values
 ('English','Grammar, vocabulary, synonyms and antonyms'),
 ('General Knowledge','Pakistan and world general knowledge'),
 ('Pakistan Studies','History, constitution and geography'),
 ('Islamic Studies','Seerat, Quran, Hadith and Islamic history'),
 ('Everyday Science','Basic science and daily applications'),
 ('Mathematics','Arithmetic, algebra and quantitative skills'),
 ('Computer Science','IT fundamentals and office applications'),
 ('Current Affairs','Pakistan and international developments'),
 ('Urdu','Urdu grammar, literature and vocabulary'),
 ('Pedagogy','Teaching methods and education'),
 ('Analytical Reasoning','Logic, patterns and problem solving'),
 ('Geography','Pakistan and world geography')
on conflict(name) do nothing;

-- Official source-linked paper record. PDF remains hosted on KPPSC; no third-party rehosting.
insert into public.recruiting_bodies(name,region,website_url,body_type)
values ('KPPSC','Khyber Pakhtunkhwa','https://www.kppsc.gov.pk/','Public Service Commission')
on conflict(name,region) do nothing;

insert into public.job_posts(recruiter_id,region,title,bps,job_family)
select id,'Khyber Pakhtunkhwa','Provincial Planning Service Officer',17,'Management & Administration'
from public.recruiting_bodies where name='KPPSC' and region='Khyber Pakhtunkhwa'
on conflict do nothing;

insert into public.past_papers(job_post_id,exam_year,title,paper_language,paper_url,source_url,rights,rights_evidence,verification,status)
select id,2024,'Provincial Planning Service Officer BPS-17 (2024) — Islamiat','English and Urdu',
 'https://www.kppsc.gov.pk/public/assets/past_papers/PAST_PAPERS/PPS_2024/PPS_2024.pdf','https://www.kppsc.gov.pk/past_papers',
 'link_only','Official PDF hosted on kppsc.gov.pk; Pak-Prep links to source, does not rehost the PDF.',
 'metadata_checked','published'
from public.job_posts
where title='Provincial Planning Service Officer' and region='Khyber Pakhtunkhwa' and bps=17
on conflict(job_post_id,exam_year,title) do nothing;
