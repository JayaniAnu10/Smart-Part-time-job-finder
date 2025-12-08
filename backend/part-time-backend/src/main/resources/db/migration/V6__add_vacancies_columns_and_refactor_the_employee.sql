alter table job
    change employee_id employer_id binary(16) not null;

alter table job
    add total_vacancies bigint not null;

alter table job
    add available_vacancies bigint not null;

alter table employee
drop foreign key employee_user_id_fk;

rename table employee to employer;

alter table employer
    add constraint employer_user_id_fk
        foreign key (id) references user (id);