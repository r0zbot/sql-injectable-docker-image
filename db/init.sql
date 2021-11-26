create table if not exists users
(
  username varchar not null
    constraint id
      primary key,
  password varchar,
  name     varchar
);

alter table users
  owner to postgres;


INSERT INTO "public"."users" ("username", "password", "name")
  VALUES ('admin', 'abc123', 'Alice');

INSERT INTO "public"."users" ("username", "password", "name")
  VALUES ('bob12', '7412369', 'Bob');

create table if not exists secret_notes
(
   note varchar not null
    constraint id2
      primary key
);

INSERT INTO "public"."secret_notes" ("note")
  VALUES ('This is a secret, do not expose this data');
