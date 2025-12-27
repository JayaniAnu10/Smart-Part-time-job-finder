alter table job
    change salary min_salary decimal(10, 2) not null;

alter table job
    add max_salary decimal(10, 2) not null after min_salary;

alter table job
    change skills requirements text not null;

alter table job
    add accommodation varchar(255) null after requirements;