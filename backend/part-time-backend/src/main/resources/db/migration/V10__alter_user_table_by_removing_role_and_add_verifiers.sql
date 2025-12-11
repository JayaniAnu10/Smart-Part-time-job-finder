alter table user
drop column role;

alter table user
    add is_employer boolean default false not null;

alter table user
    add is_jobseeker boolean default false not null;