-- Prevent vocabulary entries from exposing content attached to unpublished articles.
drop policy if exists "published vocabulary readable" on public.vocabulary;

create policy "published vocabulary readable" on public.vocabulary
for select using (
  status = 'published'
  and (
    article_id is null
    or exists (
      select 1
      from public.dawn_articles as parent
      where parent.id = article_id
        and parent.status = 'published'
    )
  )
);
