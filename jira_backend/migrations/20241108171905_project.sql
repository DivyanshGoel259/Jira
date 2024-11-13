-- migrate:up

create table project (
    id  uuid primary key default  gen_random_uuid(),
    name varchar(255) not null,
    key text not null,
    description text ,
    organization_id uuid not null,
    created_at timestamp without time zone default now(),
    updated_at timestamp without time zone default now() 

)
-- migrate:down

drop table if exists project;

