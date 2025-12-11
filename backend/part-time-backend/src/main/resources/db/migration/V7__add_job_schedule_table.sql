create table job_schedule
(
    id             binary(16) default (UUID_TO_BIN(UUID())) not null
        primary key,
    job_id         binary(16) not null,
    start_datetime datetime                                 not null,
    end_datetime   datetime                                 not null,
    constraint job_schedule_job_id_fk
        foreign key (job_id) references job (id)
            on update cascade on delete cascade
);