alter table job
drop column working_hours;

alter table job_schedule
    add working_hours int not null;

