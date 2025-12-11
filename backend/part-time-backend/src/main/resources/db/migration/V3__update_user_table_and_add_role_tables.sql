alter table user
drop column name;

alter table user
drop column address;

alter table user
drop column profile_picture;

alter table user
drop column nic;

alter table user
    add updated_at datetime null;

alter table user
drop column skills;

create table employee
(
    id                   bigint       not null
        primary key,
    company_name         varchar(255) not null,
    company_address      varchar(255) not null,
    contact_person_name  varchar(255) not null,
    contact_person_phone varchar(255) not null,
    logo                 varchar(255) not null,
    website              varchar(255) null,
    description          text         not null,
    registration_id      varchar(255) not null,
    industry             varchar(255) not null,
    constraint employee_user_id_fk
        foreign key (id) references user (id)
            on update cascade on delete cascade
);

create table job_seeker
(
    id              bigint       not null
        primary key,
    first_name      varchar(255) not null,
    last_name       varchar(255) not null,
    gender          varchar(255) not null,
    dtae_of_birth   date         not null,
    bio             text         not null,
    address         varchar(255) not null,
    profile_picture varchar(255) null,
    skills          text         null,
    nic             varchar(255) not null,
    constraint job_seeker_user_id_fk
        foreign key (id) references user (id)
            on update cascade on delete cascade
);

alter table job
drop foreign key Job_User_id_fk;

alter table job
    add constraint Job_User_id_fk
        foreign key (employee_id) references employee (id)
            on update cascade on delete cascade;



