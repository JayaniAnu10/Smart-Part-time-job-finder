SET FOREIGN_KEY_CHECKS = 0;

alter table job_application
drop foreign key Job_application_User_id_fk;

alter table job_application
drop foreign key Job_application_Job_id_fk;

alter table payment drop foreign key Payment_User_id_fk;
alter table payment drop foreign key Payment_User_id_fk_2;

alter table rate drop foreign key Rate_User_id_fk_2;
alter table rate drop foreign key Rate_User_id_fk;
alter table rate drop foreign key rate_job_id_fk;

alter table notification drop foreign key notification_user_id_fk;
alter table promotion drop foreign key promotion_job_id_fk;

alter table complaint
drop foreign key Complaint_Complaint_type_id_fk;

alter table complaint
drop foreign key Complaint_User_id_fk;

alter table complaint
drop foreign key Complaint_User_id_fk_2;

alter table attendance
drop foreign key Attendance_Job_id_fk;

alter table attendance
drop foreign key Attendance_User_id_fk;

alter table employee
drop foreign key employee_user_id_fk;


alter table job_seeker
drop foreign key job_seeker_user_id_fk;

alter table job
drop foreign key Job_User_id_fk;

alter table user
    modify id binary(16) default (uuid_to_bin(uuid())) not null;

alter table job
    modify id binary(16) default (uuid_to_bin(uuid())) not null;


alter table job_application
    change jobseeker_id user_id binary(16) not null;

alter table attendance
    modify id binary(16) default (uuid_to_bin(uuid())) not null;

alter table attendance
    modify user_id binary(16) not null;

alter table attendance
    modify job_id binary(16) not null;

alter table attendance
    add constraint attendance_job_id_fk
        foreign key (job_id) references job (id);

alter table attendance
    add constraint attendance_user_id_fk
        foreign key (user_id) references user (id);

alter table complaint
    modify id binary(16) default (uuid_to_bin(uuid())) not null;

alter table complaint
    modify reporter_id binary(16) not null;

alter table complaint
    modify target_id binary(16) not null;

alter table complaint
    alter column created_at set default ((current_timestamp()));

alter table complaint
    add constraint complaint_target_id_fk
        foreign key (target_id) references user (id);

alter table complaint
    add constraint complaint_reporter_id_fk
        foreign key (reporter_id) references user (id);

alter table complaint
    add constraint complaint_complaint_type_id_fk
        foreign key (type_id) references complaint_type (id);

alter table employee
    modify id binary(16) not null;

alter table employee
    add constraint employee_user_id_fk
        foreign key (id) references user (id);


alter table job
    modify employee_id binary(16) not null;

alter table job
    add constraint job_employee_id_fk
        foreign key (employee_id) references employee(id);

alter table job_application
    modify id binary(16) default (uuid_to_bin(uuid())) not null;

alter table job_application
    modify job_id binary(16) not null;

alter table job_application
    add constraint job_application_job_id_fk
        foreign key (job_id) references job (id);

alter table job_application
    add constraint job_application_user_id_fk
        foreign key (user_id) references user (id);

alter table job_seeker
    modify id binary(16) not null;

alter table job_seeker
    add constraint job_seeker_user_id_fk
        foreign key (id) references user (id);

alter table notification
    modify id binary(16) default (uuid_to_bin(uuid())) not null;

alter table notification
    modify user_id binary(16) not null;

alter table notification
    add constraint notification_user_id_fk
        foreign key (user_id) references user(id);

alter table notification
    alter column created_at set default ((current_timestamp()));

alter table payment
    modify id binary(16) default (uuid_to_bin(uuid())) not null;

alter table payment
    modify payer_id binary(16) not null;

alter table payment
    modify receiver_id binary(16) not null;

alter table payment
    add constraint payment_payer_id_fk
        foreign key (payer_id) references user(id);

alter table payment
    add constraint payment_receiver_id_fk
        foreign key (receiver_id) references user(id);

alter table promotion
    modify id binary(16) default (uuid_to_bin(uuid())) not null;

alter table promotion
    alter column promotion_category set default 'Free';

alter table promotion
    modify job_id binary(16) not null;


alter table promotion
    add constraint promotion_job_id_fk
        foreign key (job_id) references job(id);

alter table rate
    modify id binary(16) default (uuid_to_bin(uuid())) not null;

alter table rate
    modify rater_id binary(16) not null;

alter table rate
    change user_id rate_receiver_id binary(16) not null;

alter table rate
    modify rate_receiver_id binary(16) not null;

alter table rate
    modify job_id binary(16) not null;


alter table rate
    add constraint rate_rater_id_fk
        foreign key (rater_id) references user(id);

alter table rate
    add constraint rate_receiver_id_fk
        foreign key (rate_receiver_id) references user(id);

alter table rate
    add constraint rate_job_id_fk
        foreign key (job_id) references job(id);


alter table rate
    alter column created_date set default ((current_timestamp()));

SET FOREIGN_KEY_CHECKS = 1;
