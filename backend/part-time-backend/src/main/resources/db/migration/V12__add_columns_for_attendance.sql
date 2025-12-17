alter table job_schedule
    add required_workers int not null;

alter table job_application
    add schedule_id binary(16)  null;

alter table job_application
    add constraint job_application_job_schedule_id_fk
        foreign key (schedule_id) references job_schedule (id)
            on update cascade on delete cascade;

alter table attendance
    add schedule_id binary(16) null;

alter table attendance
    add constraint attendance_job_schedule_id_fk
        foreign key (schedule_id) references job_schedule (id)
            on update cascade on delete set null;

