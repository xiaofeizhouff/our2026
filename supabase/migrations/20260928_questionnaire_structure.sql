-- V0.2 功能骨架：邀请页年度数据 + 问卷照片存储。
-- 在已经执行 20260924_shared_questionnaire.sql 的项目中运行本文件。

drop function if exists public.get_questionnaire_invite(uuid,uuid);
create function public.get_questionnaire_invite(p_questionnaire_id uuid,p_invite_token uuid)
returns table(
  id uuid,
  mode text,
  relationship_date date,
  creator_name text,
  partner_name text,
  creator_completed boolean,
  partner_completed boolean,
  created_at timestamptz,
  updated_at timestamptz,
  annual_data jsonb
)
language sql
security definer
set search_path=public
as $$
  select
    q.id,
    q.mode,
    q.relationship_date,
    q.creator_name,
    q.partner_name,
    q.creator_completed,
    q.partner_completed,
    q.created_at,
    q.updated_at,
    coalesce((
      select a.value
      from questionnaire_answers a
      where a.questionnaire_id=q.id
        and a.participant_role='creator'
        and a.question_id='annual_data'
    ),'{}'::jsonb)
  from questionnaires q
  where q.id=p_questionnaire_id and q.invite_token=p_invite_token;
$$;

grant execute on function public.get_questionnaire_invite(uuid,uuid) to anon;

insert into storage.buckets(id,name,public,file_size_limit,allowed_mime_types)
values('questionnaire-photos','questionnaire-photos',true,5242880,array['image/jpeg','image/png','image/webp','image/heic','image/heif'])
on conflict(id) do update set
  public=excluded.public,
  file_size_limit=excluded.file_size_limit,
  allowed_mime_types=excluded.allowed_mime_types;

drop policy if exists "questionnaire photos are publicly readable" on storage.objects;
create policy "questionnaire photos are publicly readable"
on storage.objects for select
to anon
using(bucket_id='questionnaire-photos');

drop policy if exists "anonymous questionnaire photo uploads" on storage.objects;
create policy "anonymous questionnaire photo uploads"
on storage.objects for insert
to anon
with check(bucket_id='questionnaire-photos' and (storage.foldername(name))[1]='uploads');
