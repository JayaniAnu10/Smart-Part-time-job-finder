alter table rate
    add job_id BIGINT not null;

alter table rate
    add constraint rate_job_id_fk
        foreign key (job_id) references job (id);

alter table attendance
    add status varchar(255) default 'PENDING' not null;
