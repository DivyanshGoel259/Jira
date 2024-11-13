-- migrate:up

create table organization_member(
    id uuid primary key default gen_random_uuid(),
    organization_id uuid not null,
    member_id uuid not null,
    role text not null,
    created_at timestamp without time zone default now(),
    updated_at timestamp without time zone default now() 
)

-- migrate:down

drop table if exists organization_member
