-- Pak-Prep: nationwide past-paper and study content schema
create extension if not exists pgcrypto;
create type public.pk_region as enum ('Federal','Punjab','Sindh','Khyber Pakhtunkhwa','Balochistan','Azad Jammu & Kashmir','Gilgit-Baltistan');
create type public.content_status as enum ('draft','review','published','rejected');
create type public.rights_status as enum ('public_domain','licensed','user_authorized','link_only','pending_review');
create type public.verification_status as enum ('unverified','metadata_checked','paper_checked','answer_key_verified');

create table public.recruiting_bodies (
 id uuid primary key default gen_random_uuid(), name text not null, region public.pk_region not null,
 website_url text, body_type text, created_at timestamptz not null default now(), unique(name,region)
);
create table public.departments (
 id uuid primary key default gen_random_uuid(), name text not null, region public.pk_region not null,
 website_url text, created_at timestamptz not null default now(), unique(name,region)
);
create table public.job_posts (
 id uuid primary key default gen_random_uuid(), recruiter_id uuid references public.recruiting_bodies(id),
 department_id uuid references public.departments(id), region public.pk_region not null,
 title text not null, bps smallint not null check (bps between 5 and 22),
 job_family text, created_at timestamptz not null default now()
);
create table public.past_papers (
 id uuid primary key default gen_random_uuid(), job_post_id uuid not null references public.job_posts(id) on delete cascade,
 exam_year smallint not null check (exam_year between 1990 and 2100), exam_date date,
 title text not null, paper_language text, paper_url text, source_url text not null,
 answer_key_url text, rights public.rights_status not null default 'pending_review',
 rights_evidence text, verification public.verification_status not null default 'unverified',
 status public.content_status not null default 'draft', created_at timestamptz not null default now(),
 unique(job_post_id,exam_year,title)
);
create table public.subjects (
 id uuid primary key default gen_random_uuid(), name text not null unique, description text
);
create table public.mcqs (
 id uuid primary key default gen_random_uuid(), subject_id uuid not null references public.subjects(id),
 question text not null, options jsonb not null check (jsonb_typeof(options)='array' and jsonb_array_length(options)>=2),
 answer_index smallint not null check (answer_index>=0), explanation text,
 source_url text, rights public.rights_status not null default 'user_authorized',
 status public.content_status not null default 'draft', created_at timestamptz not null default now()
);
create table public.dawn_articles (
 id uuid primary key default gen_random_uuid(), title text not null, author text, published_on date,
 article_url text not null unique, summary text, status public.content_status not null default 'draft'
);
create table public.vocabulary (
 id uuid primary key default gen_random_uuid(), article_id uuid references public.dawn_articles(id) on delete cascade,
 word text not null, urdu_meaning text not null, synonyms text[] not null default '{}',
 antonyms text[] not null default '{}', essay_example text, status public.content_status not null default 'draft'
);
create table public.user_progress (
 user_id uuid not null references auth.users(id) on delete cascade,
 item_type text not null, item_id uuid not null, completed_at timestamptz,
 primary key(user_id,item_type,item_id)
);

-- Public users may read only approved records. Writes are restricted to trusted service-role/admin workflows.
alter table public.recruiting_bodies enable row level security;
alter table public.departments enable row level security;
alter table public.job_posts enable row level security;
alter table public.past_papers enable row level security;
alter table public.subjects enable row level security;
alter table public.mcqs enable row level security;
alter table public.dawn_articles enable row level security;
alter table public.vocabulary enable row level security;
alter table public.user_progress enable row level security;

create policy "published recruiters readable" on public.recruiting_bodies for select using (true);
create policy "published departments readable" on public.departments for select using (true);
create policy "published job posts readable" on public.job_posts for select using (true);
create policy "published papers readable" on public.past_papers for select using (status='published' and rights in ('public_domain','licensed','user_authorized','link_only') and verification in ('metadata_checked','paper_checked','answer_key_verified'));
create policy "published subjects readable" on public.subjects for select using (true);
create policy "published mcqs readable" on public.mcqs for select using (status='published' and rights in ('public_domain','licensed','user_authorized'));
create policy "published articles readable" on public.dawn_articles for select using (status='published');
create policy "published vocabulary readable" on public.vocabulary for select using (
 status='published' and (
  article_id is null or exists (
   select 1 from public.dawn_articles as parent
   where parent.id=article_id and parent.status='published'
  )
 )
);
create policy "users read own progress" on public.user_progress for select using (auth.uid()=user_id);
create policy "users insert own progress" on public.user_progress for insert with check (auth.uid()=user_id);
create policy "users update own progress" on public.user_progress for update using (auth.uid()=user_id) with check (auth.uid()=user_id);
create policy "users delete own progress" on public.user_progress for delete using (auth.uid()=user_id);

create index job_posts_region_bps_idx on public.job_posts(region,bps);
create index past_papers_year_idx on public.past_papers(exam_year desc);
create index mcqs_subject_idx on public.mcqs(subject_id);
create index vocabulary_article_idx on public.vocabulary(article_id);
