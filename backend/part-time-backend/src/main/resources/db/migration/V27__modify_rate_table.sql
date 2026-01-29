alter table rate
    modify job_id binary(16) null;

alter table rate
drop foreign key rate_job_id_fk;

alter table rate
    add constraint rate_job_id_fk
        foreign key (job_id) references job (id)
            on delete set null;