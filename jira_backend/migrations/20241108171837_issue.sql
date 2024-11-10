-- migrate:up

create table issue(
    id  uuid primary key default  gen_random_uuid(),
    title text not null,
    description text ,
    status varchar(12) not null,
    "order" integer not null,
    priority varchar(6) not null,
    asignee_id uuid not null,
    reporter_id uuid not null,
    project_id uuid not null,
    sprint_id uuid,
    created_at timestamp without time zone default now(),
    updated_at timestamp without time zone default now()

)



-- migrate:down

drop table if exists issue;