-- Align Supabase MCQ records with the four-option format used by the mobile quiz.
alter table public.mcqs
  add constraint mcqs_options_exactly_four
  check (jsonb_typeof(options) = 'array' and jsonb_array_length(options) = 4);

alter table public.mcqs
  add constraint mcqs_answer_index_valid
  check (answer_index between 0 and 3);

insert into public.subjects(name, description)
values ('Sindhi', 'Sindhi grammar, literature and vocabulary')
on conflict (name) do nothing;
