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
