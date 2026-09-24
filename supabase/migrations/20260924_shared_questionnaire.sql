create extension if not exists pgcrypto;

create table if not exists public.questionnaires (
  id uuid primary key default gen_random_uuid(), mode text not null default 'couple', relationship_date date not null,
  creator_name text not null, partner_name text, creator_completed boolean not null default false, partner_completed boolean not null default false,
  creator_token uuid not null unique default gen_random_uuid(), invite_token uuid not null unique default gen_random_uuid(),
  created_at timestamptz not null default now(), updated_at timestamptz not null default now()
);
create table if not exists public.questionnaire_answers (
  id uuid primary key default gen_random_uuid(), questionnaire_id uuid not null references public.questionnaires(id) on delete cascade,
  participant_role text not null check (participant_role in ('creator','partner')), question_id text not null, value jsonb not null,
  created_at timestamptz not null default now(), unique(questionnaire_id, participant_role, question_id)
);
alter table public.questionnaires enable row level security;
alter table public.questionnaire_answers enable row level security;

create or replace function public.create_questionnaire(p_mode text,p_creator_name text,p_relationship_date date,p_answers jsonb)
returns table(questionnaire_id uuid, creator_token uuid, invite_token uuid) language plpgsql security definer set search_path=public as $$
declare q public.questionnaires; begin
  insert into questionnaires(mode,creator_name,relationship_date,creator_completed) values(p_mode,trim(p_creator_name),p_relationship_date,true) returning * into q;
  insert into questionnaire_answers(questionnaire_id,participant_role,question_id,value)
  select q.id,'creator',key,value from jsonb_each(p_answers);
  return query select q.id,q.creator_token,q.invite_token;
end $$;
create or replace function public.get_questionnaire_invite(p_questionnaire_id uuid,p_invite_token uuid)
returns table(id uuid,mode text,relationship_date date,creator_name text,partner_name text,creator_completed boolean,partner_completed boolean,created_at timestamptz,updated_at timestamptz)
language sql security definer set search_path=public as $$ select q.id,q.mode,q.relationship_date,q.creator_name,q.partner_name,q.creator_completed,q.partner_completed,q.created_at,q.updated_at from questionnaires q where q.id=p_questionnaire_id and q.invite_token=p_invite_token $$;
create or replace function public.get_creator_status(p_questionnaire_id uuid,p_creator_token uuid)
returns table(id uuid,mode text,relationship_date date,creator_name text,partner_name text,creator_completed boolean,partner_completed boolean,created_at timestamptz,updated_at timestamptz,invite_token uuid)
language sql security definer set search_path=public as $$ select q.id,q.mode,q.relationship_date,q.creator_name,q.partner_name,q.creator_completed,q.partner_completed,q.created_at,q.updated_at,q.invite_token from questionnaires q where q.id=p_questionnaire_id and q.creator_token=p_creator_token $$;
create or replace function public.submit_partner_answers(p_questionnaire_id uuid,p_invite_token uuid,p_partner_name text,p_answers jsonb)
returns void language plpgsql security definer set search_path=public as $$ begin
  if not exists(select 1 from questionnaires where id=p_questionnaire_id and invite_token=p_invite_token) then raise exception 'Invalid invitation'; end if;
  delete from questionnaire_answers where questionnaire_id=p_questionnaire_id and participant_role='partner';
  insert into questionnaire_answers(questionnaire_id,participant_role,question_id,value) select p_questionnaire_id,'partner',key,value from jsonb_each(p_answers);
  update questionnaires set partner_name=trim(p_partner_name),partner_completed=true,updated_at=now() where id=p_questionnaire_id;
end $$;
create or replace function public.get_questionnaire_report(p_questionnaire_id uuid,p_access_token uuid)
returns jsonb language plpgsql security definer set search_path=public as $$ declare q public.questionnaires; begin
  select * into q from questionnaires where id=p_questionnaire_id and (creator_token=p_access_token or invite_token=p_access_token);
  if q.id is null then raise exception 'Invalid access'; end if;
  if not q.creator_completed or not q.partner_completed then raise exception 'Report is locked'; end if;
  return jsonb_build_object('questionnaire',jsonb_build_object('id',q.id,'mode',q.mode,'relationship_date',q.relationship_date,'creator_name',q.creator_name,'partner_name',q.partner_name,'creator_completed',q.creator_completed,'partner_completed',q.partner_completed,'created_at',q.created_at,'updated_at',q.updated_at),'creator_answers',(select coalesce(jsonb_object_agg(question_id,value),'{}') from questionnaire_answers where questionnaire_id=q.id and participant_role='creator'),'partner_answers',(select coalesce(jsonb_object_agg(question_id,value),'{}') from questionnaire_answers where questionnaire_id=q.id and participant_role='partner'));
end $$;
grant execute on function public.create_questionnaire(text,text,date,jsonb), public.get_questionnaire_invite(uuid,uuid), public.get_creator_status(uuid,uuid), public.submit_partner_answers(uuid,uuid,text,jsonb), public.get_questionnaire_report(uuid,uuid) to anon;
