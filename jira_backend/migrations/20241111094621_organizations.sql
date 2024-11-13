-- migrate:up

create table organizationss(
    id uuid primary key default gen_random_uuid(),
    name text not null,
    slug text not null,
    logo_url text,
    created_at timestamp without time zone default now(),
    updated_at timestamp without time zone default now() 
)

-- migrate:down

drop table if exists organizationss;

