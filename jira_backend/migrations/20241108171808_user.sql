-- migrate:up

create table users (
    clerk_user_id text unique not null,
    email varchar(255) unique not null,
    name  varchar(255),
    image_url text,
    id  uuid primary key default gen_random_uuid(),
    created_at timestamp without time zone default now(),
    updated_at timestamp without time zone default now()
)

-- migrate:down

drop table if exists users;



