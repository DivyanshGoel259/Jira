-- migrate:up

create table sprint(
    id  uuid primary key default  gen_random_uuid(),
    name text unique not null,
    start_date  timestamp without time zone ,
    end_date timestamp without time zone,
    status varchar(9) not null default 'PLANNED',
    project_id uuid not null,
    created_at timestamp without time zone default now(),
    updated_at timestamp without time zone default now()

)

-- migrate:down

drop table if exists sprint;
