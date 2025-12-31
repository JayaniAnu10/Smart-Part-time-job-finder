alter table job
    add required_gender varchar(25) not null;

alter table user
drop foreign key User_Language_id_fk;

alter table user
drop column language_id;

drop table language;

