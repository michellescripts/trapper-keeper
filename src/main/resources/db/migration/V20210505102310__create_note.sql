create table note
(
    id     UUID primary key,
    title  varchar(255),
    data   varchar(255),
    type   varchar(255) not null,
    pinned boolean default false,
    created_at timestamp not null
)
